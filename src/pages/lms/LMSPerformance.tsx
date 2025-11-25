import { MarksChart } from "@/components/marks/MarksChart";
import { MarksTable } from "@/components/marks/MarksTable";
import { ComparisonCard } from "@/components/marks/ComparisonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import marksData from "@/data/marks.json";

const LMSPerformance = () => {
  const studentId = "std-001"; // Mock student ID
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  
  const scores = studentMarks.map(m => m.score);
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  // Group marks by category
  const marksByCategory = studentMarks.reduce((acc, mark) => {
    if (!acc[mark.type]) {
      acc[mark.type] = [];
    }
    acc[mark.type].push(mark);
    return acc;
  }, {} as Record<string, typeof studentMarks>);

  const categories = Object.keys(marksByCategory);

  const getCategoryStats = (category: string) => {
    const categoryMarks = marksByCategory[category];
    const categoryScores = categoryMarks.map(m => m.score);
    return {
      highest: Math.max(...categoryScores),
      lowest: Math.min(...categoryScores),
      average: Math.round(categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length),
      count: categoryMarks.length
    };
  };

  const formatCategoryName = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Performance</h1>
        <p className="text-muted-foreground">Track your academic progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <ComparisonCard 
          title="Highest Score" 
          value={highestScore}
          trend="up"
          subtitle="Best performance"
        />
        <ComparisonCard 
          title="Average Score" 
          value={averageScore}
          trend="neutral"
          subtitle="Overall performance"
        />
        <ComparisonCard 
          title="Lowest Score" 
          value={lowestScore}
          trend="down"
          subtitle="Needs improvement"
        />
      </div>

      {/* Performance by Category */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Papers</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {formatCategoryName(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <MarksChart 
            marks={studentMarks}
            chartType="line"
            title="Overall Performance Trend"
          />
          <MarksTable marks={studentMarks} />
        </TabsContent>

        {categories.map(category => {
          const categoryMarks = marksByCategory[category];
          const stats = getCategoryStats(category);
          
          return (
            <TabsContent key={category} value={category} className="space-y-6">
              {/* Category Statistics */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Papers Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.count}</div>
                  </CardContent>
                </Card>

                <ComparisonCard 
                  title="Highest Score" 
                  value={stats.highest}
                  trend="up"
                  subtitle="Best in category"
                />
                <ComparisonCard 
                  title="Average Score" 
                  value={stats.average}
                  trend="neutral"
                  subtitle="Category average"
                />
                <ComparisonCard 
                  title="Lowest Score" 
                  value={stats.lowest}
                  trend="down"
                  subtitle="Needs improvement"
                />
              </div>

              {/* Category Chart */}
              <MarksChart 
                marks={categoryMarks}
                chartType="line"
                title={`${formatCategoryName(category)} Performance`}
              />

              {/* Category Table */}
              <Card>
                <CardHeader>
                  <CardTitle>{formatCategoryName(category)} History</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarksTable marks={categoryMarks} />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LMSPerformance;
