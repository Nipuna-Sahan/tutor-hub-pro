import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BarChart3, 
  Trophy,
  Flame,
  Star,
  Calendar,
  BookOpen
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import marksData from "@/data/marks.json";
import { cn } from "@/lib/utils";

const LMSPerformance = () => {
  const studentId = "std-001";
  const studentMarks = marksData.filter(m => m.studentId === studentId);
  
  const scores = studentMarks.map(m => m.score);
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const totalPapers = studentMarks.length;

  // Calculate grade distribution
  const gradeDistribution = {
    A: studentMarks.filter(m => m.score >= 75).length,
    B: studentMarks.filter(m => m.score >= 65 && m.score < 75).length,
    C: studentMarks.filter(m => m.score >= 50 && m.score < 65).length,
    S: studentMarks.filter(m => m.score < 50).length,
  };

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

  // Radar chart data for category comparison
  const radarData = categories.map(cat => ({
    category: formatCategoryName(cat),
    score: getCategoryStats(cat).average,
    fullMark: 100
  }));

  // Trend data for area chart
  const trendData = studentMarks.map((mark, index) => ({
    name: mark.paperName.substring(0, 15),
    score: mark.score,
    average: averageScore,
    trend: index > 0 ? mark.score - studentMarks[index - 1].score : 0
  }));

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 65) return "text-info";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getGradeBadge = (percentage: number) => {
    if (percentage >= 75) return <Badge className="bg-success/20 text-success border-success/30">A</Badge>;
    if (percentage >= 65) return <Badge className="bg-info/20 text-info border-info/30">B</Badge>;
    if (percentage >= 50) return <Badge className="bg-warning/20 text-warning border-warning/30">C</Badge>;
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30">S</Badge>;
  };

  // Calculate streak
  const recentScores = studentMarks.slice(-5);
  const improvingStreak = recentScores.every((mark, i) => 
    i === 0 || mark.score >= recentScores[i - 1].score
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-primary to-accent">
            <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">My Performance</h1>
            <p className="text-muted-foreground text-sm md:text-base">Track your academic progress and achievements</p>
          </div>
        </div>
        {improvingStreak && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20">
            <Flame className="w-5 h-5 text-success animate-pulse" />
            <span className="text-sm font-medium text-success">On a Streak!</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-5 h-5 text-success" />
              <Badge variant="outline" className="text-success border-success/30 text-xs">Best</Badge>
            </div>
            <div className="text-2xl md:text-3xl font-bold">{highestScore}%</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Highest Score</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="text-primary border-primary/30 text-xs">Avg</Badge>
            </div>
            <div className="text-2xl md:text-3xl font-bold">{averageScore}%</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Average Score</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingDown className="w-5 h-5 text-warning" />
              <Badge variant="outline" className="text-warning border-warning/30 text-xs">Low</Badge>
            </div>
            <div className="text-2xl md:text-3xl font-bold">{lowestScore}%</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Lowest Score</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <Badge variant="outline" className="text-accent border-accent/30 text-xs">Total</Badge>
            </div>
            <div className="text-2xl md:text-3xl font-bold">{totalPapers}</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Papers Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution & Performance Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Award className="w-5 h-5 text-primary" />
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(gradeDistribution).map(([grade, count]) => {
              const percentage = Math.round((count / totalPapers) * 100);
              const colors: Record<string, string> = {
                A: "bg-success",
                B: "bg-info",
                C: "bg-warning",
                S: "bg-destructive"
              };
              return (
                <div key={grade} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Grade {grade}</span>
                    <span className="text-muted-foreground">{count} papers ({percentage}%)</span>
                  </div>
                  <Progress value={percentage} className={`h-2 [&>div]:${colors[grade]}`} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Category Radar */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Star className="w-5 h-5 text-primary" />
              Performance by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg text-xs md:text-sm">All Papers</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="rounded-lg text-xs md:text-sm">
              {formatCategoryName(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Area Chart for Trend */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="url(#scoreGradient)" strokeWidth={2} />
                  <Line type="monotone" dataKey="average" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Marks History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 md:p-4 text-xs md:text-sm font-semibold">Paper Name</th>
                      <th className="text-left p-3 md:p-4 text-xs md:text-sm font-semibold hidden sm:table-cell">Type</th>
                      <th className="text-left p-3 md:p-4 text-xs md:text-sm font-semibold hidden md:table-cell">Date</th>
                      <th className="text-center p-3 md:p-4 text-xs md:text-sm font-semibold">Score</th>
                      <th className="text-center p-3 md:p-4 text-xs md:text-sm font-semibold">Grade</th>
                      <th className="text-center p-3 md:p-4 text-xs md:text-sm font-semibold">Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {studentMarks.map((mark, index) => (
                      <tr key={mark.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 md:p-4">
                          <div className="font-medium text-sm">{mark.paperName}</div>
                          <div className="text-xs text-muted-foreground sm:hidden">{formatCategoryName(mark.type)}</div>
                        </td>
                        <td className="p-3 md:p-4 hidden sm:table-cell">
                          <Badge variant="outline" className="text-xs">{formatCategoryName(mark.type)}</Badge>
                        </td>
                        <td className="p-3 md:p-4 text-sm text-muted-foreground hidden md:table-cell">
                          {new Date(mark.date).toLocaleDateString()}
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          <span className={cn("font-bold", getScoreColor(mark.score))}>
                            {mark.score}/{mark.totalMarks}
                          </span>
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          {getGradeBadge(mark.score)}
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          <div className={cn(
                            "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                            mark.rank <= 3 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          )}>
                            {mark.rank <= 3 && <Trophy className="w-3 h-3 mr-0.5" />}
                            {mark.rank}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {categories.map(category => {
          const categoryMarks = marksByCategory[category];
          const stats = getCategoryStats(category);
          
          const categoryChartData = categoryMarks.map(mark => ({
            name: mark.paperName.substring(0, 12),
            score: mark.score
          }));
          
          return (
            <TabsContent key={category} value={category} className="space-y-6">
              {/* Category Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">Papers Done</div>
                    <div className="text-2xl font-bold">{stats.count}</div>
                  </CardContent>
                </Card>
                <Card className="border-success/30 bg-success/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">Highest</div>
                    <div className="text-2xl font-bold text-success">{stats.highest}%</div>
                  </CardContent>
                </Card>
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">Average</div>
                    <div className="text-2xl font-bold text-primary">{stats.average}%</div>
                  </CardContent>
                </Card>
                <Card className="border-warning/30 bg-warning/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">Lowest</div>
                    <div className="text-2xl font-bold text-warning">{stats.lowest}%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Category Chart */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">{formatCategoryName(category)} Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Table */}
              <Card className="border-border/50 overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base md:text-lg">{formatCategoryName(category)} History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 text-xs font-semibold">Paper Name</th>
                          <th className="text-left p-3 text-xs font-semibold hidden sm:table-cell">Date</th>
                          <th className="text-center p-3 text-xs font-semibold">Score</th>
                          <th className="text-center p-3 text-xs font-semibold">Grade</th>
                          <th className="text-center p-3 text-xs font-semibold">Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {categoryMarks.map((mark) => (
                          <tr key={mark.id} className="hover:bg-muted/30">
                            <td className="p-3 font-medium text-sm">{mark.paperName}</td>
                            <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">
                              {new Date(mark.date).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-center">
                              <span className={cn("font-bold", getScoreColor(mark.score))}>
                                {mark.score}%
                              </span>
                            </td>
                            <td className="p-3 text-center">{getGradeBadge(mark.score)}</td>
                            <td className="p-3 text-center font-medium">{mark.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
