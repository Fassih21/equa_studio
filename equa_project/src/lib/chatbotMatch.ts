
import Fuse from "fuse.js";
import { faqData, type FaqEntry } from "@/data/chatbotData";

type ScoredFaq = {
  item: FaqEntry;
  score: number;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "will",
  "me",
  "my",
  "your",
  "you",
  "i",
  "we",
  "our",
  "us",
  "please",
  "tell",
  "show",
  "give",
  "about",
  "for",
  "to",
  "of",
  "in",
  "on",
  "at",
  "what",
  "which",
  "how",
  "where",
  "when",
  "who",
  "much",
  "many"
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 0 && !STOP_WORDS.has(word));
}

function tokenSimilarity(query: string, keyword: string): number {
  const queryTokens = getTokens(query);
  const keywordTokens = getTokens(keyword);

  if (queryTokens.length === 0 || keywordTokens.length === 0) {
    return 0;
  }

  const matchedTokens = queryTokens.filter((queryToken) =>
    keywordTokens.some(
      (keywordToken) =>
        queryToken === keywordToken ||
        (queryToken.length >= 4 &&
          keywordToken.length >= 4 &&
          (queryToken.startsWith(keywordToken) ||
            keywordToken.startsWith(queryToken)))
    )
  );

  // Measure how much of the user's meaningful query was matched.
  const queryCoverage = matchedTokens.length / queryTokens.length;
  const keywordCoverage = matchedTokens.length / keywordTokens.length;

  // Penalize matches that cover only a small part of the query.
  return (
    (2 * queryCoverage * keywordCoverage) /
    (queryCoverage + keywordCoverage || 1)
  );
}

const exactKeywordMap = new Map<string, FaqEntry>();

for (const entry of faqData) {
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalize(keyword);

    // Keep the first entry for duplicate keywords.
    if (!exactKeywordMap.has(normalizedKeyword)) {
      exactKeywordMap.set(normalizedKeyword, entry);
    }
  }
}

const fuse = new Fuse(faqData, {
  keys: ["keywords"],
  threshold: 0.25,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true
});

const MIN_MATCH_SCORE = 0.72;
const MIN_SCORE_GAP = 0.08;

const FALLBACK_ANSWER =
  "Sorry, I couldn't find a reliable answer to that question. " +
  "Please contact us on WhatsApp at 0329 256 0000 for assistance.";

export function getAnswer(query: string): string {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return "Please enter a question so I can help you.";
  }

  // 1. Exact match: highest confidence.
  const exactMatch = exactKeywordMap.get(normalizedQuery);

  if (exactMatch) {
    return exactMatch.answer;
  }

  // 2. Match a complete keyword phrase inside a longer question.
  const phraseMatches: ScoredFaq[] = [];

  for (const entry of faqData) {
    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);

      if (
        normalizedKeyword.length >= 3 &&
        normalizedQuery.includes(normalizedKeyword)
      ) {
        phraseMatches.push({
          item: entry,
          score: normalizedKeyword.length / normalizedQuery.length
        });
      }
    }
  }

  if (phraseMatches.length > 0) {
    phraseMatches.sort((a, b) => b.score - a.score);

    const best = phraseMatches[0];

    if (!best) {
      return FALLBACK_ANSWER;
    }

    const second = phraseMatches.find(
      (match) => match.item !== best.item
    );

    // Prefer the most specific phrase, but reject ambiguous matches.
    if (!second || best.score - second.score >= 0.08) {
      return best.item.answer;
    }

    if (best.score >= 0.65) {
      return best.item.answer;
    }
  }

  // 3. Fuzzy matching: accept only strong, relevant matches.
  const fuzzyResults = fuse.search(query.trim());

  const scoredResults: ScoredFaq[] = fuzzyResults
    .map(({ item, score }) => {
      const bestKeywordScore = Math.max(
        ...item.keywords.map((keyword) =>
          tokenSimilarity(query, keyword)
        )
      );

      // Fuse score alone is not enough; semantic token overlap is
      // also required to reduce unrelated answers.
      const fuseConfidence = 1 - (score ?? 1);

      return {
        item,
        score: Math.min(fuseConfidence, bestKeywordScore)
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = scoredResults[0];

  if (!best || best.score < MIN_MATCH_SCORE) {
    return FALLBACK_ANSWER;
  }

  const second = scoredResults.find(
    (result) => result.item !== best.item
  );

  // If two different FAQ entries are similarly relevant, do not guess.
  if (second && best.score - second.score < MIN_SCORE_GAP) {
    return FALLBACK_ANSWER;
  }

  return best.item.answer;
}
