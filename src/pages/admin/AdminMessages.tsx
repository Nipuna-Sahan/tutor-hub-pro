import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import messagesData from "@/data/messages.json";

const AdminMessages = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState(messagesData);
  const [selectedConversation, setSelectedConversation] = useState<typeof messagesData[0] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = (conv: typeof messagesData[0]) => {
    setSelectedConversation(conv);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: `m${selectedConversation.messages.length + 1}`,
      sender: "teacher",
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessageTime: message.timestamp
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessageTime: message.timestamp
    });
    setNewMessage("");

    toast({
      title: "Message sent",
      description: "Your message has been sent to the student.",
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold font-display">Messages</h1>
        <p className="text-sm text-muted-foreground">Chat with your students</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="p-4 col-span-1 border-border/50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            Conversations
          </h3>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "p-3 rounded-xl cursor-pointer transition-all duration-200",
                  selectedConversation?.id === conv.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={selectedConversation?.id === conv.id ? "bg-primary-foreground/20 text-primary-foreground" : ""}>
                        {conv.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{conv.studentName}</p>
                      <p className={cn(
                        "text-xs truncate",
                        selectedConversation?.id === conv.id ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {conv.messages[conv.messages.length - 1]?.text}
                      </p>
                    </div>
                  </div>
                  {conv.unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {conv.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="p-4 md:p-6 col-span-2 border-border/50">
          {selectedConversation ? (
            <div className="flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b shrink-0">
                <Avatar>
                  <AvatarFallback>
                    {selectedConversation.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConversation.studentName}</h3>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex", msg.sender === "teacher" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl p-3",
                        msg.sender === "teacher"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        msg.sender === "teacher" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2 pt-4 border-t shrink-0">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon" className="h-[60px] w-[60px]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        {!showChat ? (
          /* Conversations List */
          <Card className="p-4 border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Conversations
            </h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-muted active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {conv.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{conv.studentName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {conv.messages[conv.messages.length - 1]?.text}
                        </p>
                      </div>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          /* Chat View */
          <Card className="border-border/50 overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
              <Button variant="ghost" size="icon" className="shrink-0" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {selectedConversation?.studentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{selectedConversation?.studentName}</h3>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[50vh] overflow-y-auto p-4 space-y-3">
              {selectedConversation?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex", msg.sender === "teacher" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3",
                      msg.sender === "teacher"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      msg.sender === "teacher" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2 p-4 border-t bg-background">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[50px] max-h-[100px] resize-none"
                rows={1}
              />
              <Button onClick={handleSendMessage} size="icon" className="h-[50px] w-[50px] shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;