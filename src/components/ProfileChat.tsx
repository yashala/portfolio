import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { isConfident, retrieve, type KnowledgeChunk } from "../data/knowledgeBase";

const STARTER_QUESTIONS = [
  "What's his AI/ML experience?",
  "What projects has he built?",
  "What certifications does he have?",
  "Is he open to relocation?",
];

const CATEGORY_SECTION: Record<KnowledgeChunk["category"], string> = {
  About: "about",
  Experience: "experience",
  Project: "projects",
  Skills: "skills",
  Certification: "certifications",
  Contact: "contact",
};

const REFUSAL =
  "I don't have specific information about that in Yaswanth's profile. Try asking about his " +
  "experience, projects, skills, or certifications — or reach out directly via the Contact section.";

interface Message {
  role: "user" | "assistant";
  text: string;
  citations?: { label: string; sectionId: string }[];
}

function answerQuery(query: string): Message {
  const results = retrieve(query, 3);
  const top = results[0];

  if (!top || !isConfident(top)) {
    return { role: "assistant", text: REFUSAL };
  }

  // Close ties in the same category (e.g. a broad "what projects" question)
  // surface together instead of picking one arbitrarily.
  const group = results.filter(
    (r) => r.chunk.category === top.chunk.category && r.score >= top.score * 0.85
  ).slice(0, 2);

  return {
    role: "assistant",
    text: group.map((r) => r.chunk.text).join("\n\n"),
    citations: group.map((r) => ({
      label: r.chunk.label,
      sectionId: CATEGORY_SECTION[r.chunk.category],
    })),
  };
}

export function ProfileChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Escape closes it; Tab is trapped between the panel's own focusables.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusableSelector = "a[href], button:not([disabled]), input:not([disabled])";
    const focusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)) : [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      toggleRef.current?.focus();
    };
  }, [open]);

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const answer = answerQuery(trimmed);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }, answer]);
    setInput("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const jumpTo = (sectionId: string) => {
    setOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="profile-chat-panel"
        aria-label={open ? "Close profile assistant" : "Ask about Yaswanth's profile"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-text-main text-bg flex items-center justify-center shadow-lg hover:bg-accent transition-colors duration-300"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="profile-chat-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Ask about Yaswanth's profile"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-30 w-[calc(100vw-3rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl border border-border-dim bg-bg shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border-dim">
              <h2 className="font-display font-bold text-sm text-text-main">Ask about my profile</h2>
              <p className="font-mono text-[10px] uppercase tracking-label text-text-faint mt-1">
                Retrieval only — no external API
              </p>
            </div>

            <div
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[200px]"
            >
              {messages.length === 0 && (
                <div>
                  <p className="text-sm text-text-dim leading-relaxed">
                    Ask a question about Yaswanth's experience, projects, skills, or certifications.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="text-left text-xs px-3 py-2 rounded-lg border border-border-dim text-text-dim hover:border-accent/40 hover:text-text-main transition-colors duration-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-xl rounded-br-sm bg-surface-2 px-3.5 py-2.5 text-sm text-text-main"
                        : "max-w-[90%] rounded-xl rounded-bl-sm border border-border-dim px-3.5 py-2.5"
                    }
                  >
                    <p className="text-sm text-text-dim whitespace-pre-line leading-relaxed">{m.text}</p>
                    {m.citations && m.citations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {m.citations.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            onClick={() => jumpTo(c.sectionId)}
                            className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded border border-border-dim text-accent hover:border-accent/50 transition-colors duration-200"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border-dim">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Ask a question about Yaswanth's profile"
                className="flex-1 bg-transparent text-sm text-text-main placeholder:text-text-faint outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="w-8 h-8 rounded-full flex items-center justify-center text-text-dim hover:text-accent disabled:opacity-30 disabled:hover:text-text-dim transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
