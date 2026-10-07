import Fuse from "fuse.js";
import { faqData, type FaqEntry } from "@/data/chatbotData";

const fuse = new Fuse(faqData, {
  keys: ["keywords"],
  threshold: 0.4,
  ignoreLocation: true,
});

export function getAnswer(query: string): string {
  const results = fuse.search(query.toLowerCase().trim());

  if (results.length === 0) {
    return "Sorry, I couldn't find that. You can WhatsApp us at 0329 256 0000 for more details.";
  }

  return results[0].item.answer;
}