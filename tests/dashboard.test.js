import { describe, expect, it } from "vitest";
import { aggregateByCity, aggregateByMonth, average, filterReadings, getMetrics } from "../src/utils/dashboard";

const sample = [
  { city: "Hyderabad", month: "Jan", aqi: 40, pm25: 12, pm10: 20 },
  { city: "Delhi", month: "Jan", aqi: 80, pm25: 30, pm10: 50 },
  { city: "Hyderabad", month: "Feb", aqi: 50, pm25: 15, pm10: 25 },
];

describe("dashboard data utilities", () => {
  it("filters by city and month", () => {
    expect(filterReadings(sample, "Hyderabad", "Jan")).toHaveLength(1);
  });

  it("returns all rows when filters are set to All", () => {
    expect(filterReadings(sample, "All cities", "All months")).toHaveLength(3);
  });

  it("calculates averages safely", () => {
    expect(average([10, 20, 30])).toBe(20);
    expect(average([])).toBe(0);
  });

  it("calculates dashboard metrics", () => {
    expect(getMetrics(sample)).toEqual({
      averageAqi: 56.666666666666664,
      averagePm25: 19,
      averagePm10: 31.666666666666668,
      readingCount: 3
    });
  });

  it("aggregates monthly values", () => {
    expect(aggregateByMonth(sample)).toEqual([
      { month: "Jan", aqi: 60, pm25: 21 },
      { month: "Feb", aqi: 50, pm25: 15 }
    ]);
  });

  it("sorts city comparison from highest AQI", () => {
    expect(aggregateByCity(sample).map((row) => row.city)).toEqual(["Delhi", "Hyderabad"]);
  });
});
