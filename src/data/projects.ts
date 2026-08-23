import type { LucideIcon } from "lucide-react";
import { Bot, Car, GlassWater, HeartPulse, Smartphone, Stethoscope } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  github: string | null;
  /** Shown in place of a link when github is null (e.g. private repo). */
  githubNote?: string;
  /** Reserved for a future deep writeup. Unused today — no refactor needed when it lands. */
  caseStudy?: string;
}

export const projects: Project[] = [
  {
    id: "fitnova",
    title: "FitNova",
    year: "2026",
    description:
      "Solo-shipped a cross-platform health app to Google Play from one React 19/TypeScript codebase via Capacitor. AI ingredient-label scanning through Gemini Vision with a human-in-the-loop review step, Health Connect integration, and a Cloudflare Worker proxy keeping the API key out of the client entirely.",
    tags: ["React 19", "TypeScript", "Capacitor", "Firebase", "Gemini Vision", "Cloudflare Workers"],
    icon: Smartphone,
    github: null,
    githubNote: "repo is private — link added once it's public",
  },
  {
    id: "intelli-doc",
    title: "Intelligent Document Assistant (intelli-doc)",
    year: "2025 – 2026",
    description:
      "Browser-native document Q&A — client-side PDF parsing with pdfjs-dist, in-memory retrieval, and grounded answering via the Gemini API, with zero server-side document storage. A FastAPI + LangGraph + pgvector backend is in progress to support larger corpora and cross-encoder re-ranking.",
    tags: ["React 19", "TypeScript", "Vite", "Google Gemini", "pdfjs-dist"],
    icon: Bot,
    github: null,
    githubNote: "repo is private — link added once it's public",
  },
  {
    id: "drowsiness-detection",
    title: "Real-Time Drowsiness Detection System",
    year: "2020",
    description:
      "Real-time driver drowsiness detection combining facial-landmark detection with a CNN classifier, reaching 92% detection accuracy. Cut false alarms 35% by scoring sustained closure patterns across frames instead of firing on single-frame predictions, optimized with TensorFlow Lite for real-time inference on a Raspberry Pi.",
    tags: ["Python", "OpenCV", "TensorFlow Lite", "CNNs", "Raspberry Pi", "IoT"],
    icon: Car,
    github: "https://github.com/yashala/Drowsiness-detection-system-",
  },
  {
    id: "brain-tumor-detection",
    title: "Neurological MRI Detection",
    year: "2023",
    description:
      "Automated brain tumor detection via Fine KNN + CNNs, with GridDB handling high-throughput image metadata.",
    tags: ["Healthcare", "GridDB", "Computer Vision"],
    icon: Stethoscope,
    github: "https://github.com/yashala/Brain-Tumor-detection",
  },
  {
    id: "healthy-fight",
    title: "Healthy Fight",
    year: "2023",
    description:
      "A real-time health app where friends and family track, share, and compete on their wellness journeys.",
    tags: ["Fitness", "Social", "Real-time"],
    icon: HeartPulse,
    github: "https://github.com/yashala/Healthy-Fight",
  },
  {
    id: "wine-quality",
    title: "Wine Quality Analytics",
    year: "2022",
    description:
      "A physicochemical analysis pipeline using Random Forest that identifies alcohol and volatile acidity as the strongest quality drivers.",
    tags: ["Scikit-learn", "Analytics", "Random Forest"],
    icon: GlassWater,
    github: "https://github.com/yashala/Wine-Quality-prediction",
  },
];
