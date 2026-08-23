// Condensed from the resume's Professional Experience bullets — same facts,
// fewer words. No repo links: all four roles are employer codebases.

export interface ExperienceRole {
  title: string;
  company: string;
  location: string;
  dates: string;
  points: string[];
  environment: string[];
}

export const experience: ExperienceRole[] = [
  {
    title: "AI/ML Engineer",
    company: "EITACIES Inc.",
    location: "Remote",
    dates: "Dec 2024 – Present",
    points: [
      "Built and deployed the RFP GenAI platform end to end — a production system that scrapes, normalizes, scores, and tracks solicitations from 55+ government and enterprise procurement portals, cutting manual bid review time by ~70%.",
      "Engineered a deterministic two-tier relevance scoring engine — weighted dimensions and category rules — chosen over model inference so every categorization stays explainable and auditable.",
      "Built the concurrent scraping engine (asyncio + Playwright) and idempotent PostgreSQL ingestion, then shipped the operator dashboard and deployed via Docker Compose on DigitalOcean.",
    ],
    environment: [
      "Python",
      "FastAPI",
      "uvicorn",
      "Alpine.js",
      "PostgreSQL/Supabase",
      "asyncio",
      "Playwright",
      "Docker Compose",
      "DigitalOcean",
      "Nginx",
    ],
  },
  {
    title: "AI Engineer Intern",
    company: "Thomson Reuters",
    location: "Remote",
    dates: "May 2024 – Aug 2024",
    points: [
      "Built the ONESOURCE Intelligent Assistant, a RAG chatbot answering customer queries about Thomson Reuters tax products, grounding every response in product documentation with inline source citations.",
      "Developed the document-type-aware chunking and ingestion pipeline across a heterogeneous corpus of manuals and knowledge-base articles, and served the assistant through a FastAPI layer over Azure OpenAI with refusal handling and prompt versioning.",
      "Established a golden Q&A evaluation set with product and support stakeholders to catch retrieval regressions before release.",
    ],
    environment: ["Python", "FastAPI", "Azure OpenAI", "RAG/Vector Retrieval", "Document Chunking", "Prompt Versioning", "Docker"],
  },
  {
    title: "Systems Engineer",
    company: "Infosys",
    location: "India",
    dates: "Jun 2021 – Jan 2022",
    points: [
      "Led an end-to-end legacy database migration to AWS Redshift and EMR, building scalable data warehouse solutions and models supporting analytics and downstream ML workloads.",
      "Designed PySpark ETL pipelines on EMR processing TB-scale datasets, applying partitioning and join optimizations to cut job runtimes and cluster costs.",
      "Built automated data validation frameworks with statistical anomaly detection, and engineered star-schema data models in Redshift for analyst self-service.",
    ],
    environment: ["Python", "PySpark", "SQL", "AWS Redshift", "EMR", "S3", "Glue", "Lambda", "scikit-learn", "Star-Schema Modeling"],
  },
  {
    title: "Full Stack Developer",
    company: "Nspira Management Services",
    location: "India",
    dates: "Jul 2019 – Jun 2021",
    points: [
      "Developed full-stack online course platforms in Django, React, and MongoDB serving 50,000+ active learners, with personalized recommendations from collaborative filtering and content-based models.",
      "Built scalable REST APIs on AWS EC2 handling high concurrent load across enrollment, streaming, and assessment services, with multi-tier Redis/CloudFront caching.",
      "Secured the platform with JWT, OAuth 2.0, and RBAC, and established Jenkins/Docker CI/CD reducing release cycles from weeks to days.",
    ],
    environment: ["Python", "Django", "React", "MongoDB", "Redis", "AWS EC2/S3/CloudFront", "Nginx", "Gunicorn", "Jenkins", "Docker"],
  },
];
