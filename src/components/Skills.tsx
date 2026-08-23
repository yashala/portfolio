import { motion } from "motion/react";
import { skillGroups } from "../data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-label text-accent"
        >
          Skills
        </motion.h2>

        <div className="mt-8 flex flex-col gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05, duration: 0.5 }}
            >
              <h3 className="font-display text-sm font-bold text-text-main mb-3">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-md border border-border-dim text-text-dim"
                  >
                    {skill}
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
