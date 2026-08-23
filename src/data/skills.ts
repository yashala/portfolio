// Mirrors the resume's Technical Skills section exactly — same 7 categories,
// same items, in the same order. No additions, no rewording.

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "JavaScript/TypeScript", "Bash"],
  },
  {
    label: "Agentic AI & LLM Apps",
    skills: [
      "LangGraph",
      "LangChain",
      "MCP (Model Context Protocol)",
      "Multi-Agent Orchestration",
      "Tool/Function Calling (I/O Schemas, Guardrails, Structured Outputs)",
      "RAG",
      "Hybrid Search (BM25 + Dense)",
      "Vector DBs (pgvector, Pinecone)",
    ],
  },
  {
    label: "LLMs & Fine-Tuning",
    skills: [
      "PyTorch",
      "HuggingFace Transformers",
      "OpenAI",
      "Anthropic",
      "Google Gemini",
      "Llama",
      "Mistral",
      "Prompt Engineering",
      "LoRA/QLoRA",
      "Eval Datasets",
    ],
  },
  {
    label: "LLM Evaluation & Reliability",
    skills: [
      "Golden Datasets",
      "Regression Tests",
      "LLM-as-Judge Scoring",
      "Scoring Rubrics",
      "Quality Thresholds",
      "Non-Deterministic Output Eval",
      "Rate Limiting",
      "Retries/Backoff",
      "Idempotency",
      "Replay/Backfill",
    ],
  },
  {
    label: "ML, CV & Data Science",
    skills: [
      "scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "OpenCV",
      "TensorFlow/TensorFlow Lite",
      "CNNs",
      "Facial-Landmark Detection",
      "Edge Deployment (Raspberry Pi)",
      "Vision-Model OCR",
      "Feature Engineering",
      "Anomaly Detection",
      "NLP",
      "Text Embeddings",
    ],
  },
  {
    label: "Data & Backend",
    skills: [
      "PySpark/SparkSQL",
      "ETL/ELT",
      "Data Modeling",
      "Star Schemas",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "FastAPI",
      "Django",
      "Flask",
      "React",
      "REST APIs",
      "JWT/OAuth 2.0",
      "RBAC",
    ],
  },
  {
    label: "Cloud & Ops",
    skills: [
      "Azure (Azure OpenAI, Azure ML, Blob Storage)",
      "AWS (Redshift, EMR, Glue, Lambda, S3, EC2)",
      "Docker",
      "Docker Compose",
      "Nginx",
      "GitHub Actions",
      "MLflow",
      "Weights & Biases",
      "Structured Logging",
      "Token/Cost Tracking",
    ],
  },
];
