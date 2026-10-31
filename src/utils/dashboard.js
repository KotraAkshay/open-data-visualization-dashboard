export function filterReadings(readings, city, month) {
  return readings.filter((item) => {
    const cityMatches = city === "All cities" || item.city === city;
    const monthMatches = month === "All months" || item.month === month;
    return cityMatches && monthMatches;
  });
}

export function average(values) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + Number(value), 0) / values.length;
}

export function getMetrics(readings) {
  return {
    averageAqi: average(readings.map((item) => item.aqi)),
    averagePm25: average(readings.map((item) => item.pm25)),
    averagePm10: average(readings.map((item) => item.pm10)),
    readingCount: readings.length,
  };
}

export function aggregateByMonth(readings) {
  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return monthOrder
    .map((month) => {
      const matching = readings.filter((item) => item.month === month);
      if (!matching.length) return null;
      return {
        month,
        aqi: Number(average(matching.map((item) => item.aqi)).toFixed(1)),
        pm25: Number(average(matching.map((item) => item.pm25)).toFixed(1)),
      };
    })
    .filter(Boolean);
}

export function aggregateByCity(readings) {
  const cities = [...new Set(readings.map((item) => item.city))];
  return cities.map((city) => {
    const matching = readings.filter((item) => item.city === city);
    return {
      city,
      aqi: Number(average(matching.map((item) => item.aqi)).toFixed(1)),
      pm25: Number(average(matching.map((item) => item.pm25)).toFixed(1)),
    };
  }).sort((a, b) => b.aqi - a.aqi);
}
