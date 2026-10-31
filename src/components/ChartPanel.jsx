import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

export function MonthlyTrend({ data }) {
  return (
    <section className="panel h-100">
      <div className="panel-heading">
        <div><h2>Monthly air quality trend</h2><p>Average AQI and PM2.5 by month</p></div>
      </div>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="aqi" name="AQI" stroke="#2563eb" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="pm25" name="PM2.5" stroke="#0f9f82" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function CityComparison({ data }) {
  return (
    <section className="panel h-100">
      <div className="panel-heading">
        <div><h2>City comparison</h2><p>Average AQI by city</p></div>
      </div>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="city" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="aqi" name="Average AQI" fill="#2563eb" radius={[7,7,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function PollutantComparison({ data }) {
  return (
    <section className="panel h-100">
      <div className="panel-heading">
        <div><h2>Pollutant comparison</h2><p>Average PM2.5 and PM10 by city (µg/m³)</p></div>
      </div>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="city" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="pm25" name="PM2.5" fill="#0f9f82" radius={[5,5,0,0]} />
            <Bar dataKey="pm10" name="PM10" fill="#f59e0b" radius={[5,5,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
