import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Mark {
  paperName: string;
  date: string;
  score: number;
  totalMarks: number;
}

interface MarksChartProps {
  marks: Mark[];
  chartType?: "bar" | "line";
  title?: string;
}

export const MarksChart = ({ marks, chartType = "bar", title = "Performance Trend" }: MarksChartProps) => {
  const chartData = marks.map(mark => ({
    name: mark.paperName,
    score: mark.score,
    percentage: ((mark.score / mark.totalMarks) * 100).toFixed(1)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "bar" ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="hsl(var(--primary))" name="Score" />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" name="Score" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
