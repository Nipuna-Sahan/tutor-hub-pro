import { cn } from "@/lib/utils";
import { 
  Trophy, Star, Flame, Target, Zap, Award, 
  BookOpen, Clock, TrendingUp, Crown, Medal, Sparkles,
  CheckCircle2, GraduationCap, Heart
} from "lucide-react";
import { useState } from "react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AchievementBadgesProps {
  testsCompleted: number;
  averageScore: number;
  attendance: number;
  hasAGrade: boolean;
  perfectScores: number;
  streakDays: number;
  className?: string;
}

const rarityStyles = {
  common: {
    border: "border-slate-400/50",
    glow: "",
    label: "Common",
    labelBg: "bg-slate-500/20 text-slate-600 dark:text-slate-400"
  },
  rare: {
    border: "border-info/50",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    label: "Rare",
    labelBg: "bg-info/20 text-info"
  },
  epic: {
    border: "border-accent/50",
    glow: "shadow-[0_0_25px_rgba(139,92,246,0.4)]",
    label: "Epic",
    labelBg: "bg-accent/20 text-accent"
  },
  legendary: {
    border: "border-warning/50",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse-glow-gold",
    label: "Legendary",
    labelBg: "bg-gradient-to-r from-warning/30 to-orange-500/30 text-warning"
  }
};

export const AchievementBadges = ({
  testsCompleted,
  averageScore,
  attendance,
  hasAGrade,
  perfectScores,
  streakDays,
  className
}: AchievementBadgesProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: "first-test",
      name: "First Steps",
      description: "Complete your first test",
      icon: CheckCircle2,
      color: "text-success",
      bgGradient: "from-success/20 to-emerald-500/20",
      unlocked: testsCompleted >= 1,
      rarity: "common"
    },
    {
      id: "five-tests",
      name: "Getting Started",
      description: "Complete 5 tests",
      icon: Target,
      color: "text-info",
      bgGradient: "from-info/20 to-blue-500/20",
      unlocked: testsCompleted >= 5,
      progress: testsCompleted,
      maxProgress: 5,
      rarity: "common"
    },
    {
      id: "ten-tests",
      name: "Dedicated Learner",
      description: "Complete 10 tests",
      icon: BookOpen,
      color: "text-accent",
      bgGradient: "from-accent/20 to-purple-500/20",
      unlocked: testsCompleted >= 10,
      progress: testsCompleted,
      maxProgress: 10,
      rarity: "rare"
    },
    {
      id: "first-a",
      name: "A-mazing!",
      description: "Score your first A grade (≥80%)",
      icon: Star,
      color: "text-warning",
      bgGradient: "from-warning/20 to-amber-500/20",
      unlocked: hasAGrade,
      rarity: "rare"
    },
    {
      id: "high-scorer",
      name: "High Achiever",
      description: "Maintain 75%+ average",
      icon: TrendingUp,
      color: "text-success",
      bgGradient: "from-success/20 to-teal-500/20",
      unlocked: averageScore >= 75,
      rarity: "rare"
    },
    {
      id: "perfect-score",
      name: "Perfectionist",
      description: "Score 100% on any test",
      icon: Crown,
      color: "text-warning",
      bgGradient: "from-warning/20 to-yellow-500/20",
      unlocked: perfectScores >= 1,
      rarity: "epic"
    },
    {
      id: "attendance-90",
      name: "Always Present",
      description: "Maintain 90%+ attendance",
      icon: Clock,
      color: "text-info",
      bgGradient: "from-info/20 to-cyan-500/20",
      unlocked: attendance >= 90,
      rarity: "common"
    },
    {
      id: "perfect-attendance",
      name: "Perfect Attendance",
      description: "Achieve 100% monthly attendance",
      icon: Medal,
      color: "text-accent",
      bgGradient: "from-accent/20 to-violet-500/20",
      unlocked: attendance >= 100,
      rarity: "epic"
    },
    {
      id: "streak-7",
      name: "On Fire!",
      description: "7-day learning streak",
      icon: Flame,
      color: "text-destructive",
      bgGradient: "from-destructive/20 to-red-500/20",
      unlocked: streakDays >= 7,
      progress: streakDays,
      maxProgress: 7,
      rarity: "rare"
    },
    {
      id: "elite",
      name: "Elite Scholar",
      description: "Score 90%+ average with 10+ tests",
      icon: GraduationCap,
      color: "text-primary",
      bgGradient: "from-primary/20 to-blue-600/20",
      unlocked: averageScore >= 90 && testsCompleted >= 10,
      rarity: "legendary"
    },
    {
      id: "champion",
      name: "Science Champion",
      description: "All achievements unlocked",
      icon: Trophy,
      color: "text-warning",
      bgGradient: "from-warning/30 to-orange-500/30",
      unlocked: false, // Calculated below
      rarity: "legendary"
    },
    {
      id: "dedicated",
      name: "Dedicated Heart",
      description: "Show consistent improvement",
      icon: Heart,
      color: "text-pink-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      unlocked: testsCompleted >= 3 && averageScore >= 60,
      rarity: "common"
    }
  ];

  // Calculate champion badge
  const unlockedCount = achievements.filter(a => a.id !== "champion" && a.unlocked).length;
  const championIndex = achievements.findIndex(a => a.id === "champion");
  if (championIndex !== -1) {
    achievements[championIndex].unlocked = unlockedCount === achievements.length - 1;
    achievements[championIndex].progress = unlockedCount;
    achievements[championIndex].maxProgress = achievements.length - 1;
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-warning/20 to-orange-500/20 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-warning" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-xl font-bold font-display truncate">Achievements</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {unlockedAchievements.length}/{achievements.length} unlocked
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-warning animate-pulse" />
          <span className="text-xs md:text-sm font-semibold text-warning">
            {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-warning rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Unlocked Badges */}
      {unlockedAchievements.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning" />
            Unlocked
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {unlockedAchievements.map((achievement, index) => (
              <BadgeCard 
                key={achievement.id}
                achievement={achievement}
                onClick={() => setSelectedBadge(achievement)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Locked
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {lockedAchievements.map((achievement) => (
              <BadgeCard 
                key={achievement.id}
                achievement={achievement}
                onClick={() => setSelectedBadge(achievement)}
                locked
              />
            ))}
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className={cn(
              "relative w-full max-w-sm mx-4 p-6 rounded-3xl border-2 bg-card animate-scale-in",
              rarityStyles[selectedBadge.rarity].border,
              selectedBadge.unlocked && rarityStyles[selectedBadge.rarity].glow
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <div className={cn(
                "w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br flex items-center justify-center",
                selectedBadge.bgGradient,
                !selectedBadge.unlocked && "grayscale opacity-50"
              )}>
                <selectedBadge.icon className={cn(
                  "w-12 h-12",
                  selectedBadge.unlocked ? selectedBadge.color : "text-muted-foreground"
                )} />
              </div>
              
              <div className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                rarityStyles[selectedBadge.rarity].labelBg
              )}>
                {rarityStyles[selectedBadge.rarity].label}
              </div>

              <h3 className="text-2xl font-bold font-display">{selectedBadge.name}</h3>
              <p className="text-muted-foreground">{selectedBadge.description}</p>

              {selectedBadge.progress !== undefined && selectedBadge.maxProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {Math.min(selectedBadge.progress, selectedBadge.maxProgress)}/{selectedBadge.maxProgress}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        selectedBadge.unlocked ? "bg-gradient-to-r from-primary to-accent" : "bg-muted-foreground/50"
                      )}
                      style={{ width: `${Math.min((selectedBadge.progress / selectedBadge.maxProgress) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {selectedBadge.unlocked ? (
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Unlocked!</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Keep going to unlock this achievement!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface BadgeCardProps {
  achievement: Achievement;
  onClick: () => void;
  locked?: boolean;
  delay?: number;
}

const BadgeCard = ({ achievement, onClick, locked, delay = 0 }: BadgeCardProps) => {
  const Icon = achievement.icon;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-3 rounded-2xl border-2 transition-all duration-300 group",
        "hover:scale-110 hover:-translate-y-1",
        locked ? [
          "border-border bg-muted/50 grayscale",
          "hover:grayscale-0 hover:border-border/80"
        ] : [
          rarityStyles[achievement.rarity].border,
          rarityStyles[achievement.rarity].glow,
          "bg-gradient-to-br",
          achievement.bgGradient
        ]
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Shine effect for unlocked */}
      {!locked && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}
      
      <div className="relative flex flex-col items-center gap-2">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300",
          !locked && "group-hover:rotate-12 group-hover:scale-110"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            locked ? "text-muted-foreground" : achievement.color
          )} />
        </div>
        <span className={cn(
          "text-[10px] font-semibold text-center leading-tight line-clamp-2",
          locked ? "text-muted-foreground" : "text-foreground"
        )}>
          {achievement.name}
        </span>
      </div>

      {/* Rarity indicator */}
      {!locked && achievement.rarity !== "common" && (
        <div className="absolute -top-1 -right-1">
          <div className={cn(
            "w-3 h-3 rounded-full",
            achievement.rarity === "rare" && "bg-info",
            achievement.rarity === "epic" && "bg-accent",
            achievement.rarity === "legendary" && "bg-warning animate-pulse"
          )} />
        </div>
      )}
    </button>
  );
};

export default AchievementBadges;
