import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import messagesData from "@/data/messages.json";
import studentsData from "@/data/students.json";

const LMSMessages = () => {
  const { toast } = useToast();
  const studentId = "std-001"; // Mock student ID
  const student = studentsData.find(s => s.id === studentId);
  const conversationData = messagesData.find(c => c.studentId === studentId);
  
  const [messages, setMessages] = useState(conversationData?.messages || []);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `m${messages.length + 1}`,
      sender: "student",
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages([...messages, message]);
    setNewMessage("");

    toast({
      title: "Message sent",
      description: "Your message has been sent to the teacher.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Chat with your teacher</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <Avatar>
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Mr. Saman Perera</h3>
              <p className="text-sm text-muted-foreground">Science Tutor</p>
            </div>
          </div>

          <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "student"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "student"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} size="icon" className="h-[80px]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LMSMessages;
