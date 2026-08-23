export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border-dim">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-mono text-[11px] text-text-faint">Yaswanth Ala © {new Date().getFullYear()}</span>
        <span className="font-mono text-[11px] text-text-faint">Dallas, TX</span>
      </div>
    </footer>
  );
}
