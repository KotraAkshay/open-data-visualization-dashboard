# Beginner Learning Guide

## 1. What are we building?

This is a small data-visualization web application. The Python script prepares the data. React displays it. Recharts turns the data into charts. The browser loads the processed JSON file.

```text
air_quality_demo.csv
         |
         v
  Python + pandas
   clean / validate
         |
         v
  air_quality.json
         |
         v
    React App
   /    |     \
  KPI  Filters  Charts + Table
```

## 2. Understand the data first

Open `data/air_quality_demo.csv`. Each row is one city's illustrative reading on one date.

- `city`: which city the row describes
- `date`: when the reading is assigned
- `aqi`: demonstration AQI number
- `pm25`: demonstration PM2.5 number
- `pm10`: demonstration PM10 number

These values are sample data only. They are not live readings.

## 3. Why do we need Python?

A dashboard should not have to clean messy source files every time a user opens it. The Python script prepares the data once and exports JSON.

In `scripts/process_data.py`:
- `pd.read_csv()` reads the CSV into a pandas DataFrame.
- `REQUIRED_COLUMNS` lists fields the program needs.
- `pd.to_datetime()` converts date text into dates.
- `pd.to_numeric()` converts number-like text into numbers.
- `dropna()` removes rows missing required values.
- the non-negative check removes invalid negative measurements.
- `drop_duplicates()` keeps one record per city and date.
- `to_dict(orient="records")` converts rows into dictionaries.
- `json.dumps()` writes those dictionaries as JSON text.

Run it with `python scripts/process_data.py`.

## 4. Why JSON?

JSON is a text format that JavaScript can read easily. The frontend requests `/data/air_quality.json`, then stores the response in React state.

## 5. Understand React files

- `src/main.jsx`: the entry point. It loads Bootstrap, custom CSS and the App component.
- `src/App.jsx`: the main page. It loads data, stores filter choices, calculates derived values and arranges sections.
- `src/components/MetricCard.jsx`: reusable card for one KPI.
- `src/components/ChartPanel.jsx`: reusable chart sections.
- `src/utils/dashboard.js`: plain JavaScript functions for filtering and aggregation.
- `src/styles.css`: page layout, colours, spacing and mobile adjustments.

## 6. React concepts used here

**Component:** A reusable piece of the interface. `MetricCard` is a component.

**Props:** Values passed from a parent component to a child. For example, `label` and `value` are props of `MetricCard`.

**State:** Data React remembers between renders. `useState` stores the loaded readings, selected city, selected month and any error.

**useEffect:** Runs a side effect. Here it fetches the JSON file after the component is mounted.

**useMemo:** Caches derived calculations until their input values change. Here it avoids recalculating filters and chart data unnecessarily.

**Event handler:** A function called after an action. The select's `onChange` updates the selected filter.

## 7. How filtering works

`filterReadings(readings, city, month)` checks each row:
1. If city is `All cities`, every city passes; otherwise the row city must match.
2. If month is `All months`, every month passes; otherwise the row month must match.
3. A row is returned only when both checks pass.

All KPI cards, charts and the table use this filtered array. This is important: one filter selection updates the entire dashboard consistently.

## 8. How averages work

Average = sum of values / number of values.

Example: AQI values 40, 50 and 80:

`Average AQI = (40 + 50 + 80) / 3 = 56.67`

`getMetrics()` applies the same calculation to AQI, PM2.5 and PM10.

## 9. How charts work

Recharts receives arrays of JavaScript objects. For example:

```js
[
  { month: "Jan", aqi: 60, pm25: 21 },
  { month: "Feb", aqi: 50, pm25: 15 }
]
```

`LineChart` uses `month` for the horizontal axis and plots `aqi` and `pm25`. `BarChart` compares city values. `ResponsiveContainer` makes charts resize with their panel.

## 10. Practice tasks

1. Add one more city to the CSV and run the Python processor.
2. Change a sample value and observe the KPI and chart updates.
3. Add a new metric card for the maximum AQI.
4. Add a new filter for year if you later include multiple years.
5. Replace the demo data with an official dataset after checking its licence and data definitions.

## 11. Interview explanation

"I built a responsive air-quality data dashboard using React, Recharts and Bootstrap. A Python pandas script validates and cleans the source CSV, removes incomplete and duplicate records, derives month fields and exports JSON. The React application loads that JSON, applies city and month filters, calculates summary metrics and displays trends and comparisons through interactive charts. I also wrote unit tests for the data transformation utilities and Python cleaning logic."

Only describe this as your own completed work after you have personally run it, tested it and understood the implementation.
