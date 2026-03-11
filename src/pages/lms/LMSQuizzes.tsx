import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, Sparkles, Lock, ArrowRight, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } }
};

const quizzes = [
  { id: 1, title: "Physics - Motion & Forces", questions: 20, duration: "30 min", difficulty: "Medium", status: "available", bestScore: null },
  { id: 2, title: "Chemistry - Periodic Table", questions: 15, duration: "20 min", difficulty: "Easy", status: "completed", bestScore: 85 },
  { id: 3, title: "Biology - Cell Structure", questions: 25, duration: "40 min", difficulty: "Hard", status: "available", bestScore: null },
  { id: 4, title: "Physics - Light & Sound", questions: 18, duration: "25 min", difficulty: "Medium", status: "locked", bestScore: null },
  { id: 5, title: "Chemistry - Chemical Reactions", questions: 20, duration: "30 min", difficulty: "Hard", status: "completed", bestScore: 92 },
  { id: 6, title: "Biology - Human Body Systems", questions: 22, duration: "35 min", difficulty: "Medium", status: "locked", bestScore: null },
];

const getDifficultyColor = (d: string) => {
  if (d === "Easy") return "bg-success/10 text-success border-success/20";
  if (d === "Medium") return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
};

const LMSQuizzes = () => {
  const completed = quizzes.filter(q => q.status === "completed").length;
  const available = quizzes.filter(q => q.status === "available").length;

  return (
    <motion.div className="space-y-4 md:space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent">
            <CheckSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-display">Quizzes</h1>
            <p className="text-muted-foreground text-xs md:text-sm">Test your knowledge and track progress</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 md:gap-4">
        <Card className="border-border/50">
          <CardContent className="p-3 md:p-5 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-success" />
            </div>
            <div className="text-xl md:text-2xl font-bold font-display">{completed}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 md:p-5 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="text-xl md:text-2xl font-bold font-display">{available}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 md:p-5 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-warning" />
            </div>
            <div className="text-xl md:text-2xl font-bold font-display">
              {quizzes.filter(q => q.bestScore).length > 0 
                ? Math.round(quizzes.filter(q => q.bestScore).reduce((a, q) => a + (q.bestScore || 0), 0) / quizzes.filter(q => q.bestScore).length) + '%'
                : '-'}
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz List */}
      <motion.div variants={itemVariants} className="grid gap-3 md:gap-4">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border-border/50 overflow-hidden transition-all ${quiz.status === 'locked' ? 'opacity-60' : 'hover:shadow-md'}`}>
              <CardContent className="p-3 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    quiz.status === 'completed' ? 'bg-success/10' : quiz.status === 'locked' ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    {quiz.status === 'locked' 
                      ? <Lock className="w-5 h-5 text-muted-foreground" />
                      : quiz.status === 'completed'
                        ? <CheckSquare className="w-5 h-5 text-success" />
                        : <Zap className="w-5 h-5 text-primary" />
                    }
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base truncate">{quiz.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                        <CheckSquare className="w-3 h-3" /> {quiz.questions} questions
                      </span>
                      <span className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {quiz.duration}
                      </span>
                      <Badge variant="outline" className={`text-[10px] md:text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {quiz.bestScore && (
                      <div className="text-right">
                        <div className="text-lg md:text-xl font-bold text-success">{quiz.bestScore}%</div>
                        <div className="text-[10px] text-muted-foreground">Best Score</div>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      disabled={quiz.status === 'locked'}
                      variant={quiz.status === 'completed' ? 'outline' : 'default'}
                      className="text-xs md:text-sm shrink-0"
                    >
                      {quiz.status === 'completed' ? 'Retry' : quiz.status === 'locked' ? 'Locked' : 'Start'}
                      {quiz.status !== 'locked' && <ArrowRight className="w-3 h-3 ml-1" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LMSQuizzes;
