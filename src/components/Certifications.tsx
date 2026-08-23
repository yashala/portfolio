import { motion } from "motion/react";
import { certifications } from "../data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-label text-accent"
        >
          Certifications
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -2, borderColor: "rgba(45,212,221,0.4)" }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="p-5 rounded-xl border border-border-dim"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-text-main leading-snug">{cert.title}</h3>
                {cert.date && (
                  <span className="font-mono text-[10px] text-text-faint shrink-0">{cert.date}</span>
                )}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-label text-text-dim mt-2">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
