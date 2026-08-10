import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Bot,
  ArrowUpRight,
  Zap,
  Award,
  ShieldCheck,
  Stethoscope,
  Car,
  GlassWater,
  Terminal,
  HeartPulse,
  Users,
  MapPin,
} from "lucide-react";
import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const cyclingPhrases = [
  "I build AI that doesn't hallucinate.",
  "I ship agentic systems that scale.",
  "I reduce entropy for a living.",
  "I align LLMs to reality, not hype.",
  "I make RAG pipelines that actually work.",
];

const projects = [
  {
    id: 1,
    num: "01",
    title: "Agentic RAG Assistant",
    description:
      "Most RAG systems retrieve. This one reasons. Built on LangChain + FAISS with GPU-accelerated retrieval and Groq inference — domain-specific context grounding that stays honest under pressure.",
    tags: ["FAISS", "Groq", "LangChain"],
    icon: <Bot className="w-1/2 h-1/2" />,
    color: "from-blue-600/20 to-indigo-600/20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/yashala/intelli-doc",
  },
  {
    id: 2,
    num: "02",
    title: "Neurological MRI Detection",
    description:
      "Radiology is too important for human error alone. Automated brain tumor detection via Fine KNN + CNNs, with GridDB handling high-throughput image metadata. Built because accuracy matters.",
    tags: ["Healthcare", "GridDB", "Computer Vision"],
    icon: <Stethoscope className="w-1/2 h-1/2" />,
    color: "from-red-600/20 to-purple-600/20",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/yashala/Brain-Tumor-detection",
  },
  {
    id: 3,
    num: "03",
    title: "Healthy Fight",
    description:
      "Fitness is more fun when it's social. Built a real-time health app where friends and family track, share, and compete on their wellness journeys — because accountability works.",
    tags: ["Fitness", "Social", "Real-time"],
    icon: <HeartPulse className="w-1/2 h-1/2" />,
    color: "from-green-600/20 to-teal-600/20",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/yashala/Healthy-Fight",
  },
  {
    id: 4,
    num: "04",
    title: "Driver Fatigue Monitor",
    description:
      "People fall asleep at the wheel. This system doesn't let them. Real-time Eye Aspect Ratio detection via OpenCV + dlib on a Raspberry Pi — embedded safety that runs on $35 hardware.",
    tags: ["Embedded", "OpenCV", "Python"],
    icon: <Car className="w-1/2 h-1/2" />,
    color: "from-emerald-600/20 to-teal-600/20",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/yashala/Drowsiness-detection-system-",
  },
  {
    id: 5,
    num: "05",
    title: "Wine Quality Analytics",
    description:
      "Turns out, great wine has a formula. A physicochemical analysis pipeline using Random Forest that identifies alcohol and volatile acidity as the real quality drivers. Cheers to interpretability.",
    tags: ["Scikit-learn", "Analytics", "RF"],
    icon: <GlassWater className="w-1/2 h-1/2" />,
    color: "from-yellow-600/20 to-orange-600/20",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/yashala/Wine-Quality-prediction",
  },
];

const skillGroups = [
  {
    label: "AI & Machine Learning",
    tag: "What I'm known for",
    borderColor: "rgba(99,102,241,0.25)",
    accentColor: "#818cf8",
    bgAccent: "rgba(99,102,241,0.08)",
    skills: ["LLM Alignment", "Agentic RAG", "LangGraph", "PyTorch / TF", "LangChain / Llama", "Scikit-learn", "HuggingFace", "OpenCV (CV)"],
  },
  {
    label: "Data & Backend",
    tag: "Where the real work lives",
    borderColor: "rgba(16,185,129,0.2)",
    accentColor: "#34d399",
    bgAccent: "rgba(16,185,129,0.07)",
    skills: ["Python Expert", "FastAPI", "Flask / Django", "Spark & Dask", "PostgreSQL", "MongoDB", "GraphQL"],
  },
  {
    label: "Full Stack",
    tag: "Yes, I do frontends too",
    borderColor: "rgba(245,158,11,0.2)",
    accentColor: "#fbbf24",
    bgAccent: "rgba(245,158,11,0.07)",
    skills: ["React / Next.js", "TypeScript & JS", "Node.js / Express", "Tailwind UI/UX", "Java & Go-Lang"],
  },
  {
    label: "Cloud & DevOps",
    tag: "Shipping to prod, not just localhost",
    borderColor: "rgba(139,92,246,0.2)",
    accentColor: "#a78bfa",
    bgAccent: "rgba(139,92,246,0.07)",
    skills: ["AWS ML Ops", "Azure ML", "GCP AI", "Docker & K8s", "Terraform", "Git & CI/CD"],
  },
];

const personalityTraits = [
  {
    title: "No Hallucinations, Please",
    desc: "I obsess over factual grounding. If a model I ship lies, that's on me — and I take that seriously.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: "Systems Thinker",
    desc: "I don't just tune models. I architect the pipelines, evals, and infrastructure around them.",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    title: "Perpetually Curious",
    desc: "I read papers on weekends. Not because I have to — because I genuinely can't stop.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Direct Communicator",
    desc: "I'll tell you when something won't work. Honest feedback beats comfortable silence every time.",
    icon: <Users className="w-5 h-5" />,
  },
];

const certifications = [
  { title: "Foundry & AIP Builder Foundations", issuer: "Palantir Technologies", date: "Oct 2025", id: "9utnnvy6u8qi" },
  { title: "AWS Certified Data Engineer – Associate", issuer: "Amazon Web Services", date: "Nov 2024", id: "Renewable 2027" },
  { title: "Azure AI Engineer Associate", issuer: "Microsoft", date: "Mar 2024", id: "20238CCCC340C6F6" },
  { title: "Azure AI Fundamentals", issuer: "Microsoft", date: "Jan 2024", id: "FD674748D571037C" },
  { title: "Prompt Engineering for Generative AI", issuer: "LinkedIn Learning", date: "Jan 2024", id: "Verified" },
];

const interests = [
  "📷 Photography", "🎬 Videography", "✂️ Video Editing", "🌿 Open Source",
  "🥾 Hiking", "🚴 Cycling", "🏋️ Gym", "🤖 AI Research",
  "📷 Photography", "🎬 Videography", "✂️ Video Editing", "🌿 Open Source",
  "🥾 Hiking", "🚴 Cycling", "🏋️ Gym", "🤖 AI Research",
];

const navLinks = ["About", "Skills", "Projects", "Certifications", "Contact"];

const heroStats = [
  { value: "05+", label: "Years in the field" },
  { value: "26+", label: "Tools I actually use" },
  { value: "05", label: "Certs (with receipts)" },
  { value: "10+", label: "Projects shipped" },
];

// Stagger variants for the hero stats row — one deliberate list reveal
const statsContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.1 } },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ─── PHOTO FRAME ───────────────────────────────────────────────────────────────
//
// No npm packages. No API keys. No downloads for visitors. Just a PNG + canvas.
//
// ONE-TIME SETUP (takes ~60 seconds):
//   1. Go to https://remove.bg  — free, no account needed for the first image
//      Other free options: Adobe Express, Canva, Pixlr
//   2. Upload yaswanth.png  →  download the result as  yaswanth-nobg.png
//   3. Save it to  /public/yaswanth-nobg.png  in your project
//   4. Deploy — done forever. Every visitor gets it instantly from your CDN.
//
// How this component works for visitors:
//   • Loads the transparent PNG (background already removed by the tool above)
//   • Fills a <canvas> with your exact portfolio bg colour (#09090b)
//   • Draws the transparent PNG on top — body edges are pixel-perfect,
//     transparent pixels become the portfolio colour with zero visible seam
//   • Applies a radial gradient over the canvas so shoulders fade out softly
//   • Total draw time: ~2 ms — renders before the user even notices it loaded

function PhotoFrame({
  src,
  bgColor = "#0f0f12",
}: {
  src: string;
  bgColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // ① Exact portfolio background — transparent PNG pixels show this colour
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ② Draw the person — edges are already pixel-perfect from remove.bg
      ctx.drawImage(img, 0, 0);

      // ③ Radial vignette centred on the face
      //    Inner radius: face stays completely sharp
      //    Outer radius: shoulders dissolve into the page colour naturally
      const cx = canvas.width  / 2;
      const cy = canvas.height * 0.36;
      const rr = parseInt(bgColor.slice(1, 3), 16);
      const gg = parseInt(bgColor.slice(3, 5), 16);
      const bb = parseInt(bgColor.slice(5, 7), 16);

      const grad = ctx.createRadialGradient(
        cx, cy, canvas.width * 0.22,   // inner — keep face sharp
        cx, cy, canvas.width * 0.70    // outer — full fade
      );
      grad.addColorStop(0,    `rgba(${rr},${gg},${bb},0)`);
      grad.addColorStop(0.50, `rgba(${rr},${gg},${bb},0.08)`);
      grad.addColorStop(1,    `rgba(${rr},${gg},${bb},0.96)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setReady(true);
    };

    // On error: canvas stays invisible, no broken-image icon shown
    img.onerror = () => setReady(true);
    img.src = src;
  }, [src, bgColor]);

  return (
    <div
      role="img"
      aria-label="Portrait of Yaswanth Ala, ML/AI engineer"
      className="relative w-[400px] h-[480px] mx-auto"
    >
      {/* The one deliberate glow moment for this element — everything else stays flat */}
      <div
        className="absolute -inset-8 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 52% at 50% 34%, rgba(99,102,241,0.18) 0%, transparent 70%)",
          filter: "blur(36px)",
        }}
      />

      {/* Frame plate — thin low-opacity border, canvas blends into its exact surface tone */}
      <div className="relative w-full h-full rounded-[2rem] border border-border-strong/60 bg-surface-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />

        {/* Soft key-light sheen, upper-left — lighting cue without a literal light source */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 26% 16%, rgba(255,255,255,0.30), transparent 62%)",
          }}
        />

        {/* Glass-edge highlight — 1px inner border catching the ambient glow */}
        <div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
        />
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 0.9, 1], ["0%", "-85.7%", "-85.7%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % cyclingPhrases.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Magnetic tilt on the hero portrait — springs back to rest on mouse leave,
  // fully inert when the visitor has requested reduced motion.
  const prefersReducedMotion = useReducedMotion();
  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const photoRotateX = useSpring(useTransform(photoY, [-0.5, 0.5], [7, -7]), springConfig);
  const photoRotateY = useSpring(useTransform(photoX, [-0.5, 0.5], [-7, 7]), springConfig);
  const photoTranslateX = useSpring(useTransform(photoX, [-0.5, 0.5], [-12, 12]), springConfig);
  const photoTranslateY = useSpring(useTransform(photoY, [-0.5, 0.5], [-12, 12]), springConfig);

  const handlePhotoMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    photoX.set((e.clientX - rect.left) / rect.width - 0.5);
    photoY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePhotoMouseLeave = () => {
    photoX.set(0);
    photoY.set(0);
  };

  return (
    <div className="min-h-screen bg-bg text-text-main selection:bg-accent/30">
      {/* Ambient cursor glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{ background: "radial-gradient(700px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.07), transparent 70%)" }}
      />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-bg/80 backdrop-blur-2xl border-b border-border-dim py-4" : "bg-transparent py-7"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">Y</div>
            <span className="font-display font-black tracking-tighter text-lg hidden sm:block">YASWANTH ALA</span>
          </motion.div>

          <div className="hidden md:flex gap-10">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="text-[11px] font-black uppercase tracking-label text-text-dim hover:text-accent transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="https://linkedin.com/in/yaswanth-a-a21aa9148/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.96 }}
            className="bg-text-main text-bg px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500"
          >
            Let's Talk
          </motion.a>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section id="about" className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,transparent_40%,#0A0A0B_100%)] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border-dim bg-card-bg/80 backdrop-blur-xl text-[11px] font-black uppercase tracking-label text-text-dim mb-12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dallas, TX · Open to the right opportunity
            </motion.div>

            {/* Two-column hero */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px] gap-0 items-stretch mb-16">

              {/* LEFT */}
              <div className="flex flex-col justify-between gap-10 pr-0 lg:pr-12 pb-4">
                <div>
                  <div className="overflow-hidden mb-1">
                    <motion.p
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      className="text-xl md:text-2xl font-light tracking-wide text-text-dim"
                    >
                      Hello, I am
                    </motion.p>
                  </div>

                  <div className="overflow-hidden">
                    <motion.h1
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                      className="font-display text-[clamp(3rem,7vw,7rem)] font-black tracking-display leading-[0.88] uppercase"
                    >
                      YASWANTH
                      <br />
                      <span className="text-accent italic">ALA</span>
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="mt-5 flex items-center gap-4"
                  >
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-[11px] font-black uppercase tracking-label-loose text-text-dim">ML / AI Engineer</span>
                  </motion.div>

                  {/* Cycling phrase */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-6 h-8 flex items-center"
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={phraseIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="text-text-dim/70 text-sm font-medium tracking-wide"
                      >
                        <span className="text-accent mr-2">→</span>
                        {cyclingPhrases[phraseIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 max-w-md"
                >
                  <p className="text-text-dim text-base leading-[1.85]">
                    Most AI demos are impressive. Most AI in production is a mess.{" "}
                    <span className="text-text-main font-semibold">I live in the gap</span> — building
                    systems grounded in{" "}
                    <span className="text-text-main font-semibold">Agentic Workflows</span> and{" "}
                    <span className="text-text-main font-semibold">LLM Alignment</span> that
                    actually survive contact with reality.
                  </p>
                  <p className="text-text-dim/45 text-sm italic leading-relaxed border-l-2 border-accent/30 pl-4">
                    "Engineering is the art of reducing entropy." — how I think about everything.
                  </p>
                  <div className="flex gap-3 pt-1">
                    {[
                      { href: "mailto:alayaswanth007@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
                      { href: "https://github.com/alayaswanth007", icon: <Github className="w-4 h-4" />, label: "GitHub" },
                      { href: "https://linkedin.com/in/yaswanth-a-a21aa9148/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                    ].map(({ href, icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12, y: -3 }}
                        whileTap={{ scale: 0.94 }}
                        className="w-10 h-10 rounded-xl border border-border-dim flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/40 transition-all duration-300"
                        title={label}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── RIGHT — photo ────────────────────────────────────────────────
                  PhotoFrame loads a pre-processed transparent PNG and composites
                  it onto a canvas filled with the frame plate's surface colour.
                  Zero library. Zero model download. ~2 ms render for every visitor.

                  src → /public/yaswanth-nobg.png (your bg-removed photo)
                  The outer motion.div tilts toward the cursor for a subtle
                  magnetic feel; it's inert under prefers-reduced-motion.
              ──────────────────────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:flex items-center justify-center"
              >
                <motion.div
                  onMouseMove={prefersReducedMotion ? undefined : handlePhotoMouseMove}
                  onMouseLeave={prefersReducedMotion ? undefined : handlePhotoMouseLeave}
                  style={{
                    rotateX: photoRotateX,
                    rotateY: photoRotateY,
                    x: photoTranslateX,
                    y: photoTranslateY,
                    transformPerspective: 900,
                  }}
                >
                  <PhotoFrame src="/y-removebg-preview.png" />
                </motion.div>
              </motion.div>
            </div>

            {/* Stats bar — staggered reveal, one cell after another */}
            <motion.div
              variants={statsContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-dim rounded-3xl overflow-hidden"
            >
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statItemVariants}
                  className="bg-bg px-8 py-7 hover:bg-surface-2 transition-colors duration-500 group cursor-default"
                >
                  <div className="font-display text-4xl md:text-5xl font-black tracking-tighter text-accent group-hover:scale-105 transition-transform duration-500 origin-left">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-label text-text-dim/40 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW I'M WIRED ───────────────────────────────────────── */}
        <section className="py-24 px-6 border-y border-border-dim bg-card-bg/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[280px]"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">01 /</span>
                <h2 className="text-5xl font-black tracking-tighter uppercase mt-2 leading-tight">
                  How I'm
                  <br />
                  <span className="text-accent italic font-light">Wired.</span>
                </h2>
                <p className="text-text-dim text-sm leading-relaxed mt-5">
                  Not a list of buzzwords. These are the actual principles I operate by —
                  the ones that get me out of bed at 6am to read a new paper.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalityTraits.map((trait, i) => (
                  <motion.div
                    key={trait.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.35)", backgroundColor: "rgba(99,102,241,0.03)" }}
                    className="flex gap-5 p-6 rounded-2xl border border-border-dim bg-bg/40 transition-all duration-400 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      {trait.icon}
                    </div>
                    <div>
                      <div className="font-black text-[11px] uppercase tracking-widest mb-1.5">{trait.title}</div>
                      <p className="text-text-dim text-xs leading-relaxed">{trait.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── THE TOOLBOX ─────────────────────────────────────────── */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-black uppercase tracking-[0.4em] text-accent"
                >
                  02 /
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-5xl md:text-8xl font-black tracking-tighter uppercase mt-2 leading-none"
                >
                  The
                  <br />
                  <span className="text-accent italic font-light">Toolbox</span>
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-12 md:pb-4"
              >
                <div>
                  <span className="text-5xl font-black tracking-tighter text-accent">05+</span>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim/40 mt-1.5">Yrs deep in it</div>
                </div>
                <div className="w-px bg-border-dim self-stretch" />
                <div>
                  <span className="text-5xl font-black tracking-tighter text-accent">98%</span>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim/40 mt-1.5">RAG Accuracy</div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1, duration: 0.7 }}
                  className="p-7 rounded-3xl border bg-card-bg/30 transition-all duration-500"
                  style={{ borderColor: group.borderColor }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = group.bgAccent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(20,20,22,0.3)"; }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="font-black text-base">{group.label}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-text-dim/35 mt-0.5 italic">{group.tag}</div>
                    </div>
                    <div
                      className="text-[10px] font-black px-3 py-1.5 rounded-full border uppercase tracking-widest"
                      style={{ color: group.accentColor, borderColor: group.borderColor, backgroundColor: group.bgAccent }}
                    >
                      {group.skills.length} Skills
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.08 + si * 0.04 }}
                        className="text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-xl border border-border-dim bg-bg text-text-dim hover:text-text-main hover:border-border-dim/80 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 text-text-dim/50 text-sm leading-relaxed max-w-2xl"
            >
              SFT, RLHF, GRPO — I've done the fine-tuning work, not just the prompting.
              I know the difference between a HuggingFace tutorial and production-grade model ops.
            </motion.p>
          </div>
        </section>

        {/* ── PROJECTS (Horizontal Scroll) ─────────────────────────── */}
        <section id="projects" ref={projectsRef} className="relative h-[700vh] bg-bg">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-border-dim/20 z-20">
              <motion.div style={{ scaleX: smoothProgress }} className="h-full bg-accent origin-left" />
            </div>

            <div className="absolute top-8 left-6 md:left-12 z-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim/30">
                03 / Things I've actually built
              </span>
            </div>

            <motion.div style={{ x }} className="flex gap-[5vw] md:gap-[7vw] px-0 items-center will-change-transform">
              {/* Intro slide */}
              <div className="flex flex-col justify-center w-screen flex-shrink-0 items-center text-center px-8 md:px-24">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  <h2 className="text-[clamp(4rem,12vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase">
                    Stuff I
                    <br />
                    <span className="text-accent">Built</span>
                  </h2>
                  <p className="mt-8 text-base md:text-2xl text-text-dim font-light max-w-xl mx-auto leading-relaxed">
                    Not demos. Not tutorials. Real problems, real constraints,
                    real solutions. Scroll and judge for yourself.
                  </p>
                  <div className="mt-14 text-[10px] font-black uppercase tracking-[0.55em] text-text-dim/20">
                    ← Scroll to explore
                  </div>
                </motion.div>
              </div>

              {/* Project cards */}
              {projects.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-[65vh] md:h-[75vh] w-[85vw] md:w-[65vw] flex-shrink-0 bg-card-bg border border-border-dim rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 hover:border-accent/30 shadow-2xl shadow-black/50"
                  whileHover={{ scale: 1.008 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-25 group-hover:scale-[1.04] transition-transform duration-[2.5s] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 right-8 md:top-10 md:right-10 text-[10px] font-black uppercase tracking-widest text-text-dim/25 font-mono">
                    {project.num} / 05
                  </div>
                  <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end bg-gradient-to-t from-bg/96 via-bg/15 to-transparent">
                    <div className="relative z-20">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-accent/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-accent/20 group-hover:scale-110 group-hover:border-accent/50 transition-all duration-500 text-accent">
                        {project.icon}
                      </div>
                      <h3 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-none flex items-start gap-4">
                        {project.title}
                        <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 flex-shrink-0" />
                      </h3>
                      <p className="text-sm md:text-xl text-text-dim mb-8 leading-relaxed font-light max-w-2xl">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-[0.28em] font-black px-5 py-2.5 rounded-full border border-border-dim bg-bg/60 backdrop-blur-xl text-text-dim group-hover:border-accent/30 group-hover:text-accent transition-all duration-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* End slide */}
              <div className="flex flex-col justify-center w-screen flex-shrink-0 items-center text-center px-8 md:px-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="space-y-7"
                >
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                    There's
                    <br />
                    always
                    <br />
                    <span className="text-accent italic font-light">a next one.</span>
                  </h2>
                  <p className="text-sm text-text-dim/50 font-light max-w-xs mx-auto leading-relaxed">
                    I don't stop shipping when I run out of ideas. I run out of sleep.
                  </p>
                  <motion.a
                    href="https://github.com/alayaswanth007"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.5)" }}
                    className="inline-flex items-center gap-3 mt-2 px-8 py-4 rounded-2xl border border-border-dim text-text-dim hover:text-accent transition-all duration-400 text-[11px] font-black uppercase tracking-widest"
                  >
                    <Github className="w-4 h-4" />
                    See the rest on GitHub
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ──────────────────────────────────────── */}
        <section id="certifications" className="py-32 px-6 bg-card-bg/20 border-t border-border-dim">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[11px] font-black uppercase tracking-[0.4em] text-accent"
              >
                04 /
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase mt-2 leading-none"
              >
                The Official
                <br />
                <span className="text-accent italic font-light">Receipts</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-text-dim/50 text-sm mt-4 max-w-sm leading-relaxed"
              >
                Because "trust me, I know this stuff" only gets you so far.
                Here's the paper trail.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.35)" }}
                  className="group p-7 rounded-3xl bg-bg border border-border-dim flex flex-col justify-between transition-all duration-500 min-h-[200px]"
                >
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-dim/35">{cert.date}</span>
                    </div>
                    <h3 className="font-bold text-base leading-snug group-hover:text-accent transition-colors duration-400 mb-2">{cert.title}</h3>
                    <p className="text-[11px] uppercase tracking-widest text-text-dim/45 font-bold">{cert.issuer}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-border-dim flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-wider text-text-dim/25">ID: {cert.id}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400/40 group-hover:bg-emerald-400 transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHEN THE LAPTOP CLOSES ───────────────────────────────── */}
        <section className="py-32 px-6 border-t border-border-dim overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-black uppercase tracking-[0.4em] text-accent"
                >
                  05 /
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-black tracking-tighter uppercase mt-2 leading-none"
                >
                  When the
                  <br />
                  <span className="text-accent italic font-light">Laptop Closes</span>
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="space-y-4"
              >
                <p className="text-text-dim text-lg md:text-xl leading-[1.8]">
                  I pick up a camera, hit a trail, or spend an embarrassing amount
                  of time editing footage nobody asked for.
                </p>
                <p className="text-text-dim/55 text-base leading-[1.8]">
                  It keeps me human. The best system-design ideas always seem to
                  arrive halfway up a hill where there's zero cell signal.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden py-3"
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="flex gap-5 w-max"
              >
                {interests.map((item, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 px-7 py-3.5 rounded-full border text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                      i % 4 === 0 ? "border-accent/30 bg-accent/5 text-accent/70" : "border-border-dim bg-card-bg text-text-dim"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────── */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-accent rounded-[4rem] p-12 md:p-24 text-center overflow-hidden shadow-[0_48px_140px_rgba(99,102,241,0.3)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.18),transparent_65%)]" />
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-black uppercase tracking-[0.4em] text-white/35"
                >
                  06 / Let's talk
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.9 }}
                  className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter leading-[0.85] text-white uppercase mt-4 mb-6"
                >
                  Think we'd
                  <br />
                  <span className="opacity-35 italic font-light">click?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="text-white/65 text-base md:text-xl max-w-xl mx-auto mb-4 font-light leading-relaxed"
                >
                  I'm looking for teams building things that actually matter — not AI for the sake of AI.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="text-white/35 text-sm max-w-sm mx-auto mb-14 italic"
                >
                  Real problems, real conversations. Cold pitches are welcome; empty hype is not.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="flex flex-wrap justify-center gap-5"
                >
                  <motion.a
                    href="mailto:alayaswanth007@gmail.com"
                    whileHover={{ scale: 1.04, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-white text-accent px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:shadow-2xl transition-all duration-400 text-sm"
                  >
                    Start a conversation →
                  </motion.a>
                  <div className="flex gap-4">
                    {[
                      { href: "https://github.com/alayaswanth007", icon: <Github className="w-6 h-6" />, label: "GitHub" },
                      { href: "https://linkedin.com/in/yaswanth-a-a21aa9148/", icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn" },
                    ].map(({ href, icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -6 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-2xl border-2 border-white/20 flex items-center justify-center text-white/55 hover:text-white hover:border-white/50 transition-all duration-400"
                        title={label}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 border-t border-border-dim/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-black tracking-tighter uppercase">YASWANTH ALA</div>
            <div className="text-[11px] text-text-dim/30 font-bold uppercase tracking-widest mt-1.5">
              © 2025 · Built with purpose, not just frameworks.
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-text-dim/45">
            <a href="https://linkedin.com/in/yaswanth-a-a21aa9148/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-400">LinkedIn</a>
            <a href="https://github.com/alayaswanth007" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-400">GitHub</a>
            <a href="mailto:alayaswanth007@gmail.com" className="hover:text-accent transition-colors duration-400">Email</a>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-dim/20 uppercase tracking-[0.5em] font-black">
            <MapPin className="w-3 h-3" />
            Dallas, TX
          </div>
        </div>
      </footer>
    </div>
  );
}
