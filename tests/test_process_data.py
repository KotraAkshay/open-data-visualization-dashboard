import sys
import unittest
from pathlib import Path
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from process_data import clean_data

class CleanDataTests(unittest.TestCase):
    def test_removes_invalid_rows_and_duplicates(self):
        frame = pd.DataFrame([
            {"city": " Hyderabad ", "date": "2025-01-15", "aqi": "42", "pm25": "10", "pm10": "20"},
            {"city": "Hyderabad", "date": "2025-01-15", "aqi": "42", "pm25": "10", "pm10": "20"},
            {"city": "Delhi", "date": "bad-date", "aqi": "80", "pm25": "30", "pm10": "50"},
            {"city": "Mumbai", "date": "2025-02-15", "aqi": "-1", "pm25": "10", "pm10": "20"},
        ])
        result = clean_data(frame)
        self.assertEqual(len(result), 1)
        self.assertEqual(result.iloc[0]["city"], "Hyderabad")
        self.assertEqual(result.iloc[0]["month"], "Jan")

    def test_missing_column_raises_error(self):
        frame = pd.DataFrame([{"city": "Hyderabad"}])
        with self.assertRaises(ValueError):
            clean_data(frame)

if __name__ == "__main__":
    unittest.main()
