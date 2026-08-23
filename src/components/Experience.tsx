import { motion } from "motion/react";
import { experience } from "../data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-label text-accent"
        >
          Experience
        </motion.h2>

        <div className="mt-8 flex flex-col gap-14">
          {experience.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-bold text-text-main">
                  {role.title} <span className="text-text-dim font-normal">— {role.company}</span>
                </h3>
                <span className="font-mono text-xs text-text-dim shrink-0">{role.dates}</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-label text-text-faint mt-1">
                {role.location}
              </p>

              <ul className="mt-4 flex flex-col gap-2.5">
                {role.points.map((point) => (
                  <li key={point} className="text-sm md:text-base text-text-dim leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-border-strong" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-5">
                {role.environment.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded border border-border-dim text-text-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
