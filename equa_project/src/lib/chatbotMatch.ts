// src/lib/chatbotMatch.ts
import { faqData, FALLBACK, CHAT_LINK, BOOK_LINK } from "@/data/chatbotData";

const PRICE_WORDS = new Set(["price", "cost", "rate", "charge", "fee", "much", "kitna", "kitne", "qeemat", "keemat", "qimat", "paisay", "paise", "budget"]);
const BOOK_WORDS = new Set(["book", "booking", "appointment", "reserve", "slot"]);

function stem(w: string): string {
  if (w.length <= 3) return w;
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (/(sh|ch|x|ss)es$/.test(w)) return w.slice(0, -2);
  return /[^s]s$/.test(w) ? w.slice(0, -1) : w;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(stem);
}

function distance(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0]!;
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j]!;
      prev[j] = Math.min(prev[j]! + 1, prev[j - 1]! + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length]!;
}

// Typo tolerance only for longer words, so short words never match by accident.
function sameWord(a: string, b: string): boolean {
  if (a === b) return true;
  const len = Math.min(a.length, b.length);
  return len >= 6 && distance(a, b) <= (len >= 8 ? 2 : 1);
}

function containsPhrase(query: string[], phrase: string[]): boolean {
  for (let i = 0; i + phrase.length <= query.length; i++) {
    if (phrase.every((w, j) => sameWord(query[i + j]!, w))) return true;
  }
  return false;
}

const compiled = faqData.map((entry) => ({
  entry,
  phrases: entry.keywords.map(tokenize).filter((p) => p.length > 0),
}));

export function getAnswer(rawQuery: string): string {
  const query = tokenize(rawQuery);
  if (query.length === 0) return "Please type a question so I can help you.";

  let best: (typeof compiled)[number] | null = null;
  let bestScore = 0;

  for (const item of compiled) {
    let longest = 0;
    let hits = 0;
    for (const phrase of item.phrases) {
      if (containsPhrase(query, phrase)) {
        hits++;
        longest = Math.max(longest, phrase.length);
      }
    }
    if (hits === 0) continue;
    // Longer phrases are more specific; treatments beat generic price/booking words.
    const score = longest + (item.entry.service ? 2 : 0) + (item.entry.boost ?? 0) + 0.1 * (hits - 1);
    // Strict ">" keeps the earlier entry on ties, so entry order is the tie-break.
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  if (!best) return FALLBACK;

  const { answer, service } = best.entry;
  let text = typeof answer === "function" ? answer() : answer;

  if (service) {
    if (query.some((w) => PRICE_WORDS.has(w))) {
      text += `\n\nFor the exact price of this treatment, message us on WhatsApp: ${CHAT_LINK}`;
    }
    if (query.some((w) => BOOK_WORDS.has(w))) {
      text += `\n\nReady to book? ${BOOK_LINK}`;
    }
  }
  return text;
}