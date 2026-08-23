import { motion } from "motion/react";
import { skillGroups } from "../data/skills";

const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

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
              variants={groupVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: gi * 0.04 }}
            >
              <h3 className="font-display text-sm font-bold text-text-main mb-3">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-md border border-border-dim text-text-dim hover:border-accent/40 hover:text-text-main transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
