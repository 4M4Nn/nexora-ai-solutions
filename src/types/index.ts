export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export interface WorkStep {
  id: string;
  title: string;
  description: string;
}

export interface Metric {
  display: string;
  value: number | null;
  suffix: string;
  label: string;
  sublabel: string;
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
