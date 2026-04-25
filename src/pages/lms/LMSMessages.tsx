import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, Sparkles, CheckCheck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useConversations, useSendMessage, useTutor } from "@/hooks/api";
import { LoadingState, ErrorState } from "@/components/QueryState";

const LMSMessages = () => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations = [], isLoading, error } = useConversations();
  const { data: tutorData } = useTutor();
  const sendMessage = useSendMessage();

  const conversation = conversations[0];
  const messages = conversation?.messages || [];
  const [newMessage, setNewMessage] = useState("");

  const tutorName = tutorData?.name || "Your Teacher";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;
    try {
      await sendMessage.mutateAsync({
        conversationId: conversation.id,
        text: newMessage,
      });
      setNewMessage("");
      toast({ title: "Message sent", description: "Your message has been sent to the teacher." });
    } catch (err) {
      toast({ title: "Failed to send", description: (err as Error).message, variant: "destructive" });
    }
  };

  if (isLoading) return <LoadingState message="Loading messages..." />;
  if (error) return <ErrorState message={(error as Error).message} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-background p-8 border border-border/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Messages</h1>
            <p className="text-muted-foreground">Chat with your teacher and get help</p>
          </div>
        </div>
      </div>

      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                    {tutorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-card" />
              </div>
              <div>
                <h3 className="font-bold font-display">{tutorName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Science Tutor</span>
                  <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-muted/20 to-transparent">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold font-display text-lg mb-2">Start a Conversation</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Ask questions, get help with your studies, or discuss your progress.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`flex items-end gap-2 max-w-[75%] ${msg.sender === "student" ? "flex-row-reverse" : ""}`}>
                    {msg.sender !== "student" && (
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                          {tutorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-2xl p-4 ${
                        msg.sender === "student"
                          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                          : "bg-card border border-border/50 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-2 text-xs ${
                        msg.sender === "student" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                      }`}>
                        <Clock className="w-3 h-3" />
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.sender === "student" && msg.read && (
                          <CheckCheck className="w-3 h-3 ml-1" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/50 bg-card">
            <div className="flex gap-3">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] max-h-[120px] resize-none rounded-xl border-border/50 focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-[60px] w-[60px] rounded-xl shrink-0 shadow-md hover:shadow-lg transition-all"
                disabled={!newMessage.trim() || sendMessage.isPending}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSMessages;
