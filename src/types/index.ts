export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  color: string;
  slug: string;
}

export interface WorkStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Metric {
  display: string;
  value: number | null;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface CaseStudy {
  id: number;
  company: string;
  location: string;
  service: string;
  headline: string;
  story: string;
  keyMetric: { value: string; label: string };
  secondMetric: { value: string; label: string };
  color: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}
