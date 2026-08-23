import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-label text-accent"
        >
          About
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-text-main leading-relaxed"
        >
          I started as a full-stack developer, building systems that served 50,000+ users at
          Nspira, then moved into data engineering — migrating warehouses and building PySpark
          pipelines at Infosys. Since 2024 I've focused on production LLM and agentic systems: a
          RAG assistant at Thomson Reuters, and the RFP GenAI platform I built end to end at
          EITACIES. I own the full path from retrieval and evaluation design through FastAPI
          services and containerized deployment on Azure and AWS.
        </motion.p>
      </div>
    </section>
  );
}
