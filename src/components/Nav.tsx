import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = ["About", "Experience", "Skills", "Projects", "Certifications", "Contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavPanelRef = useRef<HTMLDivElement>(null);
  const mobileNavToggleRef = useRef<HTMLButtonElement>(null);

  // Reading-progress bar — tracks page scroll, spring-smoothed rather than
  // stepping 1:1 with the scroll event so it settles fluidly instead of
  // jittering. Pure transform (scaleX), so it's compositor-only — no layout
  // cost regardless of page length.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile panel is open, restore it on close.
  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  // Escape closes it; Tab is trapped between the toggle and the panel links.
  useEffect(() => {
    if (!mobileNavOpen) return;

    const panel = mobileNavPanelRef.current;
    const focusableSelector = "a[href], button:not([disabled])";
    const panelFocusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)) : [];
    const toggle = mobileNavToggleRef.current;
    const focusables = toggle ? [toggle, ...panelFocusables] : panelFocusables;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileNavOpen(false);
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
      mobileNavToggleRef.current?.focus();
    };
  }, [mobileNavOpen]);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-bg/85 backdrop-blur-2xl border-b border-border-dim py-4" : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="font-display font-bold tracking-tight text-base">
            Yaswanth Ala
          </a>

          <div className="hidden md:flex gap-9">
            {navLinks.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial="rest"
                whileHover="hover"
                className="font-mono text-[11px] uppercase tracking-label text-text-dim hover:text-accent transition-colors duration-300 relative"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1.5 left-0 w-full h-px bg-accent origin-left"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 border border-border-dim px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-label text-text-dim hover:text-accent hover:border-accent/40 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>

            <button
              ref={mobileNavToggleRef}
              type="button"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-10 h-10 rounded-xl border border-border-dim flex items-center justify-center text-text-main hover:text-accent hover:border-accent/40 transition-all duration-300"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            id="mobile-nav-panel"
            ref={mobileNavPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-1"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileNavOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.03 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl font-bold text-text-main hover:text-accent transition-colors duration-200 py-3"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
