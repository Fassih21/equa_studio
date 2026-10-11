// src/components/ChatWidget.tsx
import { useState, useRef, useEffect, type ReactNode } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnswer } from "@/lib/chatbotMatch";
import { GREETING, QUICK_REPLIES } from "@/data/chatbotData";
import { STUDIO } from "@/lib/studio";

type Message = { role: "bot" | "user"; text: string };

// Renders [label](https://...) and [label](tel:...) as clickable links.
const LINK = /\[([^\]]+)\]\(((?:https?:|tel:)[^)\s]+)\)/g;

function renderMessage(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const url = m[2]!;
    out.push(
      <a
        key={i}
        href={url}
        target={url.startsWith("tel:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2 break-words hover:opacity-80"
      >
        {m[1]}
      </a>,
    );
    last = i + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function send(text: string) {
    const question = text.trim();
    if (!question || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsTyping(true);
    timer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getAnswer(question) }]);
      setIsTyping(false);
    }, 450 + Math.random() * 300);
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50"
      onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label={`${STUDIO.name} assistant`}
          className="mb-3 flex h-[min(32rem,75vh)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border bg-background shadow-xl"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-medium">{STUDIO.name} Assistant</span>
            <a
              href={`https://wa.me/${STUDIO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline underline-offset-2 hover:opacity-80"
            >
              WhatsApp us
            </a>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex flex-1 flex-col gap-2 overflow-y-auto p-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                  m.role === "bot"
                    ? "self-start bg-muted text-foreground"
                    : "self-end bg-primary text-primary-foreground"
                }`}
              >
                {m.role === "bot" ? renderMessage(m.text) : m.text}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1 self-start rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.15s]">.</span>
                <span className="animate-bounce [animation-delay:0.3s]">.</span>
              </div>
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-t px-2 pt-2">
            {QUICK_REPLIES.map((label) => (
              <button
                key={label}
                type="button"
                disabled={isTyping}
                onClick={() => send(label)}
                className="shrink-0 rounded-full border px-3 py-1 text-xs text-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={200}
              placeholder="Type your question..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}