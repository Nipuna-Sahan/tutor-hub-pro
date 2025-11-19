import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Mark {
  paperName: string;
  date: string;
  score: number;
  totalMarks: number;
  rank: number;
}

interface MarksTableProps {
  marks: Mark[];
  title?: string;
}

const getGradeBadge = (percentage: number) => {
  if (percentage >= 75) return <Badge className="bg-success">A</Badge>;
  if (percentage >= 65) return <Badge className="bg-info">B</Badge>;
  if (percentage >= 50) return <Badge className="bg-warning">C</Badge>;
  return <Badge variant="destructive">S</Badge>;
};

export const MarksTable = ({ marks, title = "Marks History" }: MarksTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paper Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-center">Grade</TableHead>
              <TableHead className="text-center">Rank</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marks.map((mark, index) => {
              const percentage = (mark.score / mark.totalMarks) * 100;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{mark.paperName}</TableCell>
                  <TableCell>{new Date(mark.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {mark.score}/{mark.totalMarks}
                  </TableCell>
                  <TableCell className="text-center">{getGradeBadge(percentage)}</TableCell>
                  <TableCell className="text-center">{mark.rank}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
