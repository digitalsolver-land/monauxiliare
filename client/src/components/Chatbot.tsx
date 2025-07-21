import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant commercial Mon Auxiliaire, expert en déménagement. Comment puis-je vous aider avec votre projet de déménagement ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [messageId, setMessageId] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: messageId,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setMessageId((prev) => prev + 1);
    setIsLoading(true);

    try {
      // Send message to AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          conversation: messages,
        }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: messageId + 1,
        text: data.success ? data.response : data.response || "Désolé, je rencontre un problème. Contactez-nous au 06 61 20 69 29.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setMessageId((prev) => prev + 2);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: messageId + 1,
        text: "Désolé, je rencontre un problème technique. Vous pouvez nous contacter au 06 61 20 69 29 ou utiliser notre formulaire de devis gratuit.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setMessageId((prev) => prev + 2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <Card className={`chatbot-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="p-4 border-b bg-brand-orange text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">Assistant Mon Auxiliaire</h4>
              <p className="text-xs opacity-90">Expert en déménagement • En ligne</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4 max-h-80">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-brand-orange text-white"
                    : "bg-white dark:bg-gray-700 text-foreground border"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-white dark:bg-gray-700 text-foreground border">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Assistant Mon Auxiliaire répond...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-brand-green"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}
