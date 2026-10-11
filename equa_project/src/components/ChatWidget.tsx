import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnswer } from "@/lib/chatbotMatch";
import { STUDIO } from "@/lib/studio";

type Message = { role: "bot" | "user"; text: string };

const GREETING = `Hi! I'm Equà Studio's assistant. Ask me about our services, timings, or location.`;

// Automatically detect URLs and render them as clickable links
function renderMessage(text: string) {
  const urlRegex = /https?:\/\/[^\s<>"']+/g;
  const parts = text.split(urlRegex);
  const urls = text.match(urlRegex) ?? [];

  return parts.map((part, index) => {
    const rawUrl = urls[index];

    if (!rawUrl) {
      return <span key={index}>{part}</span>;
    }

    // Remove punctuation accidentally included at the end of a URL
    const url = rawUrl.replace(/[.,!?;:]+$/, "");
    const trailingText = rawUrl.slice(url.length);

    return (
      <span key={index}>
        {part}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all hover:text-blue-800"
        >
          {url}
        </a>
        {trailingText}
      </span>
    );
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
    ]);

    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 400;

    setTimeout(() => {
      const answer = getAnswer(trimmed);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: answer },
      ]);

      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-xl border bg-background shadow-xl">
          {/* Header */}
          <div className="bg-primary px-4 py-3 font-medium text-primary-foreground">
            {STUDIO.name} Assistant
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-2 overflow-y-auto p-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "bot"
                    ? "self-start bg-muted text-foreground"
                    : "ml-auto self-end bg-primary text-primary-foreground"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {renderMessage(m.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex max-w-[60%] gap-1 rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.15s]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:0.3s]">
                  .
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none"
            />

            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Chat toggle button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}