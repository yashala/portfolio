import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const isLinked = Boolean(project.github);
  const Icon = project.icon;

  const baseClass = `group relative rounded-2xl border border-border-dim bg-surface-1/40 transition-all duration-300 ${
    isLinked ? "hover:border-accent/40 cursor-pointer" : ""
  } ${featured ? "p-8 md:p-10" : "p-6"}`;

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className={`rounded-xl bg-surface-2 flex items-center justify-center text-text-dim ${featured ? "w-12 h-12" : "w-10 h-10"}`}>
          <Icon className={featured ? "w-6 h-6" : "w-5 h-5"} />
        </div>
        {isLinked ? (
          <ArrowUpRight className="w-5 h-5 text-text-faint opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300" />
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{project.githubNote}</span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className={`font-display font-bold text-text-main ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {project.title}
        </h3>
        <span className="font-mono text-xs text-text-faint shrink-0">{project.year}</span>
      </div>

      <p className={`text-text-dim leading-relaxed mt-3 ${featured ? "text-base" : "text-sm"}`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded border border-border-dim text-text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return isLinked ? (
    <motion.a
      href={project.github!}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className={baseClass}
    >
      {content}
    </motion.a>
  ) : (
    <div className={baseClass}>{content}</div>
  );
}

export function Projects() {
  const [featured, secondary, ...rest] = projects;

  return (
    <section id="projects" className="py-24 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-label text-accent"
        >
          Projects
        </motion.h2>

        {/* flex+gap, not space-y — this build's compiled CSS has zero space-y-*
            rules (verified via stylesheet inspection), which silently zeroed
            the gap and let cards overlap. gap is layout-native and doesn't
            depend on a separate margin utility being generated correctly. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="mt-8 flex flex-col gap-5"
        >
          <ProjectCard project={featured} featured />
          <ProjectCard project={secondary} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
