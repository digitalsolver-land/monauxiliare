import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const botResponses = [
  "Bonjour ! Comment puis-je vous aider avec votre déménagement ?",
  "Merci pour votre message. Nos services incluent le déménagement résidentiel, d'entreprise, l'emballage et le stockage. Que recherchez-vous précisément ?",
  "Pour un devis personnalisé, je vous invite à utiliser notre formulaire interactif en cliquant sur 'Devis Gratuit'. C'est rapide et pratique !",
  "Nos équipes sont disponibles du lundi au samedi de 8h à 18h. Vous pouvez nous joindre au 06 61 20 69 29 pour toute urgence.",
  "Un conseiller vous recontactera dans les plus brefs délais. Y a-t-il autre chose que je puisse vous expliquer sur nos services ?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant virtuel Mon Auxiliaire. Comment puis-je vous aider avec votre déménagement ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [messageId, setMessageId] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

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

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: messageId + 1,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setMessageId((prev) => prev + 2);
    }, 1000);
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
            <h4 className="font-bold">Assistant Mon Auxiliaire</h4>
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
            >
              <Send className="h-4 w-4" />
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
