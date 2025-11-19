import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Security system online. How can I assist with threat detection and analysis today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("security-chat", {
        body: { 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        },
      });

      if (error) {
        if (error.message.includes("429") || error.message.includes("rate limit")) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (error.message.includes("402") || error.message.includes("payment")) {
          toast.error("AI service credits depleted. Please add funds to continue.");
        } else {
          toast.error("Failed to get response from security AI");
        }
        throw error;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden shadow-[var(--glow-shadow)]">
      <div className="bg-secondary border-b border-border p-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
          Security Analysis Terminal
        </h2>
        <p className="text-sm text-muted-foreground mt-1">AI-Powered Threat Detection System</p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground shadow-[var(--glow-shadow)]"
                    : "bg-secondary text-secondary-foreground border border-border"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {message.role === "user" ? "User" : "Security AI"}
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground border border-border rounded-lg p-4">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4 bg-secondary">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter security query or threat description..."
            disabled={isLoading}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--glow-shadow)]"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
