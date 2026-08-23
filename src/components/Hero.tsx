import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { type MouseEvent as ReactMouseEvent } from "react";
import { PhotoFrame } from "./PhotoFrame";

export function Hero() {
  // Magnetic tilt on the portrait — springs back to rest on mouse leave,
  // fully inert when the visitor has requested reduced motion.
  const prefersReducedMotion = useReducedMotion();
  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const photoRotateX = useSpring(useTransform(photoY, [-0.5, 0.5], [6, -6]), springConfig);
  const photoRotateY = useSpring(useTransform(photoX, [-0.5, 0.5], [-6, 6]), springConfig);

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-0 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs uppercase tracking-label text-text-dim mb-6"
            >
              Dallas, TX — open to relocation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold tracking-display leading-[0.95]"
            >
              Yaswanth <span className="text-accent">Ala</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg md:text-xl text-text-dim max-w-xl leading-relaxed"
            >
              AI Engineer — 4 years across software, data, and ML engineering, ~2 building
              production LLM and agentic systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mt-9"
            >
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-text-main text-bg px-6 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-label hover:bg-accent transition-colors duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
              {[
                { href: "mailto:alayaswanth007@gmail.com", icon: Mail, label: "Email" },
                { href: "https://github.com/yashala", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/yaswanth-a-a21aa9148/", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  title={label}
                  className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              onMouseMove={prefersReducedMotion ? undefined : handlePhotoMouseMove}
              onMouseLeave={prefersReducedMotion ? undefined : handlePhotoMouseLeave}
              style={{ rotateX: photoRotateX, rotateY: photoRotateY, transformPerspective: 900 }}
            >
              <PhotoFrame src={`${import.meta.env.BASE_URL}y-removebg-preview.png`} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
