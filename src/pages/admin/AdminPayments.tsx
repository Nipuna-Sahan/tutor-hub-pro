import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, Calendar, CreditCard, ArrowUpRight } from "lucide-react";
import studentsData from "@/data/students.json";
import { cn } from "@/lib/utils";

const AdminPayments = () => {
  // Mock payment data
  const totalRevenue = 125000;
  const monthlyRevenue = 45000;
  const pendingPayments = 8;
  const paidStudents = studentsData.length - pendingPayments;

  const recentPayments = [
    { id: 1, student: "Kavinda Silva", amount: 2500, date: "2024-01-15", status: "paid" },
    { id: 2, student: "Nethmi Fernando", amount: 2500, date: "2024-01-14", status: "paid" },
    { id: 3, student: "Ashan Perera", amount: 2500, date: "2024-01-13", status: "pending" },
    { id: 4, student: "Dilini Jayawardena", amount: 2500, date: "2024-01-12", status: "paid" },
    { id: 5, student: "Ravindu Bandara", amount: 2500, date: "2024-01-11", status: "pending" },
  ];

  const stats = [
    { 
      title: "Total Revenue", 
      value: `Rs. ${totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+12%"
    },
    { 
      title: "Monthly Revenue", 
      value: `Rs. ${monthlyRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+8%"
    },
    { 
      title: "Paid Students", 
      value: paidStudents, 
      icon: Users, 
      color: "text-info",
      bgColor: "bg-info/10",
      change: `${Math.round((paidStudents / studentsData.length) * 100)}%`
    },
    { 
      title: "Pending", 
      value: pendingPayments, 
      icon: Calendar, 
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: "Due"
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold font-display">Payments</h1>
        <p className="text-sm text-muted-foreground">Track student payments and revenue</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 overflow-hidden">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-xl", stat.bgColor)}>
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-lg md:text-2xl font-bold truncate">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Payments */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Recent Payments
            </CardTitle>
            <Button variant="outline" size="sm" className="text-xs">
              View All
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div 
                key={payment.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-xs md:text-sm font-bold text-primary">{payment.student.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{payment.student}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold">Rs. {payment.amount.toLocaleString()}</span>
                  <Badge 
                    variant={payment.status === "paid" ? "default" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Payment Integration Coming Soon</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Full payment tracking with online payment gateway integration, automated reminders, and detailed financial reports will be available soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;