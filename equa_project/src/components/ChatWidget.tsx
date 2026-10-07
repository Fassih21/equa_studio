import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnswer } from "@/lib/chatbotMatch";
import { STUDIO } from "@/lib/studio";

type Message = { role: "bot" | "user"; text: string };

const GREETING = `Hi! I'm Equà Studio's assistant. Ask me about our services, timings, or location.`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 400;
    setTimeout(() => {
      const answer = getAnswer(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-80 h-96 bg-background border rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3 font-medium">
            {STUDIO.name} Assistant
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  m.role === "bot"
                    ? "bg-muted text-foreground self-start"
                    : "bg-primary text-primary-foreground self-end ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-muted text-foreground max-w-[60%] px-3 py-2 rounded-lg text-sm flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.15s]">.</span>
                <span className="animate-bounce [animation-delay:0.3s]">.</span>
              </div>
            )}
          </div>

          <div className="border-t p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 text-sm px-3 py-2 rounded-md border bg-background outline-none"
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}