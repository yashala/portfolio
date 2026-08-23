import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-28 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-label text-accent">Contact</span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="font-display text-3xl md:text-4xl font-bold text-text-main mt-4"
        >
          Let's talk.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
        >
          {[
            { href: "mailto:alayaswanth007@gmail.com", icon: Mail, label: "Email" },
            { href: "https://www.linkedin.com/in/yaswanth-a-a21aa9148/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/yashala", icon: Github, label: "GitHub" },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 border border-border-dim px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-label text-text-dim hover:text-accent hover:border-accent/40 transition-colors duration-300"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
