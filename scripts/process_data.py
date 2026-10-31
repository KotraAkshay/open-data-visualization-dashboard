"""Clean the source CSV and export a frontend-friendly JSON file."""
from pathlib import Path
import json
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
INPUT_FILE = ROOT / "data" / "air_quality_demo.csv"
OUTPUT_FILE = ROOT / "public" / "data" / "air_quality.json"
REQUIRED_COLUMNS = {"city", "date", "aqi", "pm25", "pm10"}

def clean_data(frame: pd.DataFrame) -> pd.DataFrame:
    missing = REQUIRED_COLUMNS - set(frame.columns)
    if missing:
        raise ValueError(f"Missing required columns: {', '.join(sorted(missing))}")

    cleaned = frame.copy()
    cleaned["city"] = cleaned["city"].astype("string").str.strip()
    cleaned["date"] = pd.to_datetime(cleaned["date"], errors="coerce")
    for column in ("aqi", "pm25", "pm10"):
        cleaned[column] = pd.to_numeric(cleaned[column], errors="coerce")

    cleaned = cleaned.dropna(subset=["city", "date", "aqi", "pm25", "pm10"])
    cleaned = cleaned[cleaned["city"] != ""]
    cleaned = cleaned[(cleaned[["aqi", "pm25", "pm10"]] >= 0).all(axis=1)]
    cleaned = cleaned.drop_duplicates(subset=["city", "date"])
    cleaned["date"] = cleaned["date"].dt.strftime("%Y-%m-%d")
    cleaned["month"] = pd.to_datetime(cleaned["date"]).dt.strftime("%b")
    cleaned["year"] = pd.to_datetime(cleaned["date"]).dt.year
    return cleaned.sort_values(["date", "city"]).reset_index(drop=True)

def main() -> None:
    frame = pd.read_csv(INPUT_FILE)
    cleaned = clean_data(frame)
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(cleaned.to_dict(orient="records"), indent=2),
        encoding="utf-8"
    )
    print(f"Processed {len(cleaned)} records -> {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
