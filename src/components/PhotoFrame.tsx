import { useEffect, useRef, useState } from "react";

// ─── PHOTO FRAME ───────────────────────────────────────────────────────────
//
// No npm packages. No API keys. No downloads for visitors. Just a PNG + canvas.
//
// ONE-TIME SETUP (takes ~60 seconds):
//   1. Go to https://remove.bg — free, no account needed for the first image
//      Other free options: Adobe Express, Canva, Pixlr
//   2. Upload your source photo → download the result as a transparent PNG
//   3. Save it to /public/y-removebg-preview.png in your project
//   4. Deploy — done forever. Every visitor gets it instantly from your CDN.
//
// How this component works for visitors:
//   • Loads the transparent PNG (background already removed by the tool above)
//   • Draws it onto a canvas that stays genuinely transparent everywhere else —
//     no bg-colour fill, so whatever sits behind it (page bg, glow) shows
//     through with zero seam, and it never needs to match a hex value
//   • Erases (not paints) a radial falloff around the shoulders via
//     destination-out compositing, so edges feather into true transparency
//   • Total draw time: ~2 ms — renders before the user even notices it loaded

export function PhotoFrame({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // ① Draw the person — background is already transparent from remove.bg
      ctx.drawImage(img, 0, 0);

      // ② Feather the shoulders into transparency via destination-out: the
      //    gradient's alpha controls how much gets erased, not painted —
      //    face stays fully opaque, edges fade to true alpha 0.
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.36;

      const grad = ctx.createRadialGradient(
        cx, cy, canvas.width * 0.22, // inner — keep face sharp
        cx, cy, canvas.width * 0.70  // outer — fully erased
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.50, "rgba(0,0,0,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,1)");

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      setReady(true);
    };

    // On error: canvas stays invisible, no broken-image icon shown
    img.onerror = () => setReady(true);
    img.src = src;
  }, [src]);

  return (
    <div
      role="img"
      aria-label="Portrait of Yaswanth Ala, AI Engineer"
      className="relative w-[460px] aspect-[432/577] mx-auto"
    >
      {/* The one deliberate glow moment for this element — everything else stays flat */}
      <div
        className="absolute -inset-10 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 56% 50% at 50% 32%, rgba(45,212,221,0.14) 0%, transparent 70%)",
          filter: "blur(44px)",
        }}
      />

      {/* No frame, no border — the canvas is genuinely transparent outside the
          feathered silhouette, so it blends into whatever sits behind it */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      />
    </div>
  );
}
