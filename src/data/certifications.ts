// Every entry, title, issuer, and date here is sourced directly from the
// resume. No ID numbers — the resume doesn't list any, so neither do we.

export interface Certification {
  title: string;
  issuer: string;
  /** Omitted (not guessed) when the resume doesn't state one. */
  date?: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Data Engineer – Associate",
    issuer: "Amazon Web Services",
    date: "Nov 2024",
  },
  {
    title: "Azure AI Engineer Associate (AI-102)",
    issuer: "Microsoft",
    date: "Apr 2024",
  },
  {
    title: "Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    date: "Feb 2024",
  },
  {
    title: "Palantir Foundry & AIP Builder Foundations",
    issuer: "Palantir Technologies",
    // The resume itself leaves this date as "[Date]" — unfilled. Not
    // inventing one; the UI must omit the date row entirely when absent.
  },
];
