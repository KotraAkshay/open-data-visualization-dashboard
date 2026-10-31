# ClearView – Open Data Visualization Dashboard

A beginner-friendly, responsive dashboard for exploring air-quality indicators across four Indian cities. The project uses React, Recharts, Bootstrap 5 and a Python/pandas data-cleaning step.

> **Important data note:** The included CSV contains illustrative demonstration values created for this learning project. They are **not official measurements**, are not taken from CPCB or another monitoring authority, and must not be presented as real-world air-quality evidence. Replace the CSV with a properly licensed, cited public dataset before making real-world claims.

## Features

- KPI cards for average AQI, PM2.5, PM10 and record count
- City and month filters with a reset button
- Monthly AQI and PM2.5 line chart
- Average AQI comparison by city
- PM2.5 vs PM10 comparison
- Underlying filtered-record table
- Responsive layout for desktop, tablet and mobile
- Python data cleaning and JSON export
- JavaScript and Python unit tests

## Technology

- React 18 and Vite
- Recharts for charts
- Bootstrap 5 and custom CSS
- Python 3.10+ and pandas
- Vitest for JavaScript tests
- Python `unittest` for data-processing tests

## Folder structure

```text
open-data-visualization-dashboard/
├── data/
│   └── air_quality_demo.csv
├── docs/
│   └── LEARNING_GUIDE.md
├── public/
│   └── data/air_quality.json
├── scripts/
│   └── process_data.py
├── src/
│   ├── components/
│   │   ├── ChartPanel.jsx
│   │   └── MetricCard.jsx
│   ├── utils/dashboard.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── tests/
│   ├── dashboard.test.js
│   ├── setup.js
│   └── test_process_data.py
├── index.html
├── package.json
├── requirements.txt
└── vite.config.js
```

## Requirements

Install:
- Node.js 18 or newer (Node.js 20 LTS recommended)
- npm (included with Node.js)
- Python 3.10 or newer

Check your installations:

```bash
node --version
npm --version
python --version
```

## Run the project

Open a terminal in this project folder.

**1. Create and activate a Python environment (recommended)**

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**2. Install Python dependency**

```bash
python -m pip install -r requirements.txt
```

**3. Process the CSV into JSON**

Windows:

```powershell
py scripts/process_data.py
```

macOS/Linux:

```bash
python scripts/process_data.py
```

**4. Install frontend dependencies and start Vite**

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Run tests

Frontend utility tests:

```bash
npm test
```

Python data-cleaning tests:

```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

Production build:

```bash
npm run build
npm run preview
```

## Data format

CSV columns:

| Column | Meaning | Example |
|---|---|---|
| `city` | City name | Hyderabad |
| `date` | Observation date, YYYY-MM-DD | 2025-01-15 |
| `aqi` | AQI numeric value | 42 |
| `pm25` | PM2.5 concentration | 78.0 |
| `pm10` | PM10 concentration | 125.0 |

The Python script validates required columns, converts date and numeric fields, removes incomplete/negative records, removes duplicate city-date rows, derives month/year fields and writes `public/data/air_quality.json`.

## How to use real public data

1. Find a dataset from a trusted source such as India's Central Pollution Control Board (CPCB) or an official open-data portal.
2. Read its licence, field definitions, units, time zone and quality notes.
3. Map its fields to this project's schema. Do not assume all AQI datasets use the same calculation or units.
4. Keep source attribution and retrieval date in the README.
5. Replace the demo CSV, run the Python processor, then test the dashboard.
6. Never label illustrative values as official observations.

## Screenshots

The `screenshots/` folder is intentionally not populated with mock screenshots. After starting the app, capture genuine screenshots from your browser and save them as:
- `screenshots/dashboard-desktop.png`
- `screenshots/dashboard-mobile.png`

Then add them here:

```markdown
![Dashboard desktop](screenshots/dashboard-desktop.png)
![Dashboard mobile](screenshots/dashboard-mobile.png)
```

## Publish to GitHub

1. Sign in to GitHub and create a new **public** repository named `open-data-visualization-dashboard`.
2. Do not initialize it with a README if you already have this project README.
3. Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Build open data visualization dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/open-data-visualization-dashboard.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not share a GitHub password or personal access token in chat.

## Deploy with GitHub Pages (optional)

The app is a Vite static site. For GitHub Pages, configure the Vite `base` setting to `/open-data-visualization-dashboard/`, build the app, and publish the `dist` folder using GitHub Actions or the repository Pages settings. If the repository name changes, update the base path accordingly.

## Limitations and next improvements

- This learning version loads a local JSON file; it does not use a live API or backend database.
- AQI is shown as a numeric indicator without assigning health categories.
- The dataset is illustrative and should be replaced before portfolio claims about actual pollution.
- Useful next improvements: real source integration, date-range selection, downloadable CSV, accessibility review and automated deployment.
