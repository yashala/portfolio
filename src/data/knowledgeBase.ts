// Corpus + retrieval for the profile chat widget. No external API, no LLM
// call, no cost — real BM25 ranking over a small hand-built chunk set
// distilled from the same data the rest of the site renders from, then an
// extractive (not generative) answer: the highest-scoring chunk's own text,
// verbatim, with its source labeled. Nothing here is synthesized text that
// could drift from fact — every answer is something already on the page.

import { certifications } from "./certifications";
import { experience } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";

export interface KnowledgeChunk {
  id: string;
  category: "About" | "Experience" | "Project" | "Skills" | "Certification" | "Contact";
  label: string; // shown as the citation, e.g. "Experience — EITACIES Inc."
  text: string;
}

function buildCorpus(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "about",
    category: "About",
    label: "About",
    text:
      "Yaswanth Ala is an AI Engineer with 4 years of experience across software, data, and ML " +
      "engineering, about 2 years of that building production LLM and agentic systems. He started " +
      "as a full-stack developer, building systems that served 50,000+ users at Nspira, then moved " +
      "into data engineering — migrating warehouses and building PySpark pipelines at Infosys. " +
      "Since 2024 he's focused on production LLM and agentic systems: a RAG assistant at Thomson " +
      "Reuters, and the RFP GenAI platform he built end to end at EITACIES. He owns the full path " +
      "from retrieval and evaluation design through FastAPI services and containerized deployment " +
      "on Azure and AWS.",
  });

  chunks.push({
    id: "contact",
    category: "Contact",
    label: "Contact",
    text:
      "Yaswanth lives in and is based in Dallas, TX, and is open to relocation. He can be reached " +
      "by email at alayaswanth007@gmail.com, on LinkedIn, or on GitHub at github.com/yashala. His " +
      "resume is downloadable directly from this site.",
  });

  for (const role of experience) {
    chunks.push({
      id: `experience-${role.company}`,
      category: "Experience",
      label: `Experience — ${role.company}`,
      text:
        `${role.title} at ${role.company} (${role.location}), ${role.dates}. ` +
        role.points.join(" ") +
        ` Environment: ${role.environment.join(", ")}.`,
    });
  }

  for (const project of projects) {
    chunks.push({
      id: `project-${project.id}`,
      category: "Project",
      label: `Project — ${project.title}`,
      text: `${project.title} (${project.year}). ${project.description} Built with: ${project.tags.join(", ")}.`,
    });
  }

  for (const group of skillGroups) {
    chunks.push({
      id: `skills-${group.label}`,
      category: "Skills",
      label: `Skills — ${group.label}`,
      text: `Technologies and tools, ${group.label}: ${group.skills.join(", ")}.`,
    });
  }

  for (const cert of certifications) {
    chunks.push({
      id: `cert-${cert.title}`,
      category: "Certification",
      label: `Certification — ${cert.title}`,
      text: `Certification: ${cert.title}, issued by ${cert.issuer}${cert.date ? ` (${cert.date})` : ""}.`,
    });
  }

  return chunks;
}

export const knowledgeBase: KnowledgeChunk[] = buildCorpus();

// ─── BM25 retrieval ─────────────────────────────────────────────────────

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "i", "you", "he", "she", "it", "they", "we", "his", "her", "him", "them",
  "what", "when", "where", "who", "whom", "which", "why", "how",
  "do", "does", "did", "doing", "can", "could", "will", "would", "should",
  "about", "tell", "me", "please", "and", "or", "but", "if", "so",
  "in", "on", "at", "to", "of", "for", "with", "as", "by", "from",
  "this", "that", "these", "those", "there", "here", "have", "has", "had",
  "many", "much", "some", "any", "get", "got",
]);

// Deliberately light-touch — not a real Porter stemmer, just enough suffix
// stripping to unify the plural/verb-form mismatches that actually showed up
// in testing ("certifications" vs "Certification", "projects" vs "Project").
// Verified empirically against a query set below, not tuned blind.
function stem(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  // Deliberately no generic "-es" rule: it looks right for "boxes"->"box"
  // but silently breaks "lives"->"liv" (should be "live") since it can't
  // tell "-Ces" (needs -2) from "-ves"/"-ses" where the root already ends
  // in "e" (needs -1). Found via testing "Where does he live?" returning
  // zero matches even though the corpus says "lives in Dallas" — plain "s"
  // stripping below covers the cases this corpus actually needs without
  // that failure mode.
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  if (word.endsWith("ing") && word.length > 5) return word.slice(0, -3);
  if (word.endsWith("ed") && word.length > 4) return word.slice(0, -2);
  return word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

interface BM25Index {
  docTokens: string[][];
  docFreq: Map<string, number>; // term -> number of chunks containing it
  avgDocLength: number;
  n: number;
}

function buildIndex(chunks: KnowledgeChunk[]): BM25Index {
  const docTokens = chunks.map((c) => tokenize(c.text + " " + c.label));
  const docFreq = new Map<string, number>();
  for (const tokens of docTokens) {
    for (const term of new Set(tokens)) {
      docFreq.set(term, (docFreq.get(term) ?? 0) + 1);
    }
  }
  const avgDocLength = docTokens.reduce((sum, t) => sum + t.length, 0) / docTokens.length;
  return { docTokens, docFreq, avgDocLength, n: chunks.length };
}

const index = buildIndex(knowledgeBase);

const K1 = 1.5;
const B = 0.75;

function bm25Score(queryTerms: string[], docIndex: number): { score: number; matched: number } {
  const docTokens = index.docTokens[docIndex];
  const docLength = docTokens.length;
  const termCounts = new Map<string, number>();
  for (const t of docTokens) termCounts.set(t, (termCounts.get(t) ?? 0) + 1);

  let score = 0;
  let matched = 0;
  for (const term of queryTerms) {
    const tf = termCounts.get(term) ?? 0;
    if (tf === 0) continue;
    matched += 1;
    const df = index.docFreq.get(term)!;
    const idf = Math.log((index.n - df + 0.5) / (df + 0.5) + 1);
    const denom = tf + K1 * (1 - B + (B * docLength) / index.avgDocLength);
    score += idf * ((tf * (K1 + 1)) / denom);
  }
  return { score, matched };
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  /** Fraction of distinct query terms found in this chunk (0-1). A single
   * rare-word coincidence (e.g. a nonsense query happening to contain
   * "random", which only matches because "Random Forest" is a project tag)
   * can out-score a genuinely relevant chunk on raw BM25 score alone in a
   * corpus this small — coverage is what actually distinguishes them. */
  coverage: number;
}

export function retrieve(query: string, topK = 3): RetrievalResult[] {
  const queryTermsRaw = tokenize(query);
  const queryTerms = Array.from(new Set(queryTermsRaw));
  if (queryTerms.length === 0) return [];

  const scored = knowledgeBase.map((chunk, i) => {
    const { score, matched } = bm25Score(queryTerms, i);
    return { chunk, score, coverage: matched / queryTerms.length };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// Both gates matter: score alone isn't reliable at this corpus size (a
// single rare-term coincidence can score higher than a genuine multi-term
// match — verified empirically), so a confident answer requires a real
// score AND that the query's terms were substantially covered, not just one
// lucky hit.
export const SCORE_THRESHOLD = 0.8;
export const COVERAGE_THRESHOLD = 0.5;

export function isConfident(result: RetrievalResult): boolean {
  return result.score >= SCORE_THRESHOLD && result.coverage >= COVERAGE_THRESHOLD;
}
