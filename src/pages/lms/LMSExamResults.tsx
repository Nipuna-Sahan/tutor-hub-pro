import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMarks, useStudents, usePapers } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  GraduationCap,
  Building2,
  Globe2,
  Target,
  TrendingUp,
  Calendar,
  Sparkles,
} from "lucide-react";
import type { Mark } from "@/api/types";

const gradeFor = (pct: number) => {
  if (pct >= 75) return { label: "A", tone: "from-emerald-500 to-green-500", text: "text-emerald-500" };
  if (pct >= 65) return { label: "B", tone: "from-sky-500 to-blue-500", text: "text-sky-500" };
  if (pct >= 50) return { label: "C", tone: "from-amber-500 to-orange-500", text: "text-amber-500" };
  if (pct >= 35) return { label: "S", tone: "from-orange-500 to-rose-500", text: "text-orange-500" };
  return { label: "W", tone: "from-rose-500 to-red-500", text: "text-rose-500" };
};

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const RankPill = ({
  icon: Icon,
  label,
  rank,
  total,
  gradient,
}: {
  icon: typeof Trophy;
  label: string;
  rank: number;
  total: number;
  gradient: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 group hover:border-primary/40 transition-all">
    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
    <div className="relative flex items-start gap-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <p className="text-3xl font-bold font-display mt-1 leading-none">{ordinal(rank)}</p>
        <p className="text-sm text-muted-foreground mt-1">out of {total} students</p>
      </div>
    </div>
  </div>
);

const LMSExamResults = () => {
  const { user } = useAuth();
  const studentId = user?.id ?? "";

  const { data: students = [], isLoading: sl, error: se } = useStudents();
  const { data: allMarks = [], isLoading: ml, error: me } = useMarks();
  const { data: papers = [], isLoading: pl } = usePapers();

  const [selectedPaperId, setSelectedPaperId] = useState<string>("");

  const me_ = useMemo(() => students.find((s) => s.id === studentId), [students, studentId]);

  const myMarks = useMemo<Mark[]>(
    () => allMarks.filter((m) => m.studentId === studentId),
    [allMarks, studentId]
  );

  const sortedMyMarks = useMemo(
    () => [...myMarks].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [myMarks]
  );

  // default-select latest paper
  const activePaperId =
    selectedPaperId || sortedMyMarks[0]?.paperId || "";

  const activeMark = useMemo(
    () => myMarks.find((m) => m.paperId === activePaperId),
    [myMarks, activePaperId]
  );

  const { classRank, classTotal, islandRank, islandTotal } = useMemo(() => {
    if (!activeMark || !me_) {
      return { classRank: 0, classTotal: 0, islandRank: 0, islandTotal: 0 };
    }
    const paperMarks = allMarks.filter((m) => m.paperId === activeMark.paperId);
    const byScoreDesc = [...paperMarks].sort((a, b) => b.score - a.score);
    const island = byScoreDesc.findIndex((m) => m.studentId === studentId) + 1;

    const sameClassIds = new Set(
      students.filter((s) => s.class === me_.class).map((s) => s.id)
    );
    const classMarks = byScoreDesc.filter((m) => sameClassIds.has(m.studentId));
    const cRank = classMarks.findIndex((m) => m.studentId === studentId) + 1;

    return {
      classRank: cRank,
      classTotal: classMarks.length,
      islandRank: island,
      islandTotal: byScoreDesc.length,
    };
  }, [activeMark, allMarks, students, me_, studentId]);

  if (sl || ml || pl) return <LoadingState />;
  if (se || me) return <ErrorState message="Failed to load exam results" />;
  if (!me_) return <ErrorState message="Student record not found" />;

  if (myMarks.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Exam Results</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your scores, exam center and island-wide ranking
          </p>
        </div>
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            No exam results available yet. Check back after your next paper.
          </CardContent>
        </Card>
      </div>
    );
  }

  const pct = activeMark
    ? Math.round((activeMark.score / activeMark.totalMarks) * 100)
    : 0;
  const grade = gradeFor(pct);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Official Exam Result
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display">
            Exam Results
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your scores, exam center and island-wide ranking
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Select value={activePaperId} onValueChange={setSelectedPaperId}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select an exam" />
            </SelectTrigger>
            <SelectContent>
              {sortedMyMarks.map((m) => (
                <SelectItem key={m.id} value={m.paperId}>
                  {m.paperName || m.paperTitle || "Exam"} —{" "}
                  {new Date(m.date).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hero result card */}
      {activeMark && (
        <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card via-card to-primary/5">
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <CardContent className="relative p-6 md:p-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              {/* Student + paper info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                    {me_.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student</p>
                    <h2 className="text-2xl font-bold font-display">{me_.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {me_.grade} • ID {me_.id}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur border border-border/50">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Exam Center</p>
                      <p className="font-semibold">{me_.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur border border-border/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Exam Date</p>
                      <p className="font-semibold">
                        {new Date(activeMark.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur border border-border/50 sm:col-span-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Paper</p>
                      <p className="font-semibold truncate">
                        {activeMark.paperName || activeMark.paperTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score circle */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-44 h-44">
                  <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      className="stroke-muted"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      className="stroke-primary transition-all duration-1000"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${(pct / 100) * 276.46} 276.46`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold font-display gradient-text">
                      {pct}%
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">
                      {activeMark.score} / {activeMark.totalMarks}
                    </span>
                  </div>
                </div>
                <Badge
                  className={`bg-gradient-to-r ${grade.tone} text-white border-0 px-4 py-1 text-sm`}
                >
                  Grade {grade.label}
                </Badge>
              </div>
            </div>

            {/* Score progress bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-semibold">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rank cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <RankPill
          icon={Building2}
          label="Class / Center Rank"
          rank={classRank}
          total={classTotal}
          gradient="from-primary to-accent"
        />
        <RankPill
          icon={Globe2}
          label="Island-wide Rank (All Institutes)"
          rank={islandRank}
          total={islandTotal}
          gradient="from-fuchsia-500 to-violet-500"
        />
      </div>

      {/* History */}
      <Card>
        <CardContent className="p-0">
          <div className="p-5 border-b border-border/60 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg font-display">Exam History</h3>
          </div>
          <div className="divide-y divide-border/60">
            {sortedMyMarks.map((m) => {
              const p = Math.round((m.score / m.totalMarks) * 100);
              const g = gradeFor(p);
              const isActive = m.paperId === activePaperId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedPaperId(m.paperId)}
                  className={`w-full text-left p-4 md:p-5 flex items-center gap-4 hover:bg-muted/40 transition ${
                    isActive ? "bg-primary/5" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.tone} text-white flex items-center justify-center font-bold shadow`}
                  >
                    {g.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {m.paperName || m.paperTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(m.date).toLocaleDateString()} • {m.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {m.score}/{m.totalMarks}
                    </p>
                    <p className={`text-xs font-semibold ${g.text}`}>{p}%</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted">
                    {m.rank <= 3 ? (
                      m.rank === 1 ? (
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      ) : m.rank === 2 ? (
                        <Medal className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Award className="w-3.5 h-3.5 text-orange-500" />
                      )
                    ) : (
                      <Target className="w-3.5 h-3.5" />
                    )}
                    Rank {m.rank}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSExamResults;
