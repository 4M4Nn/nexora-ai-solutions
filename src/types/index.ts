export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  solutions: string[];
}

export interface WorkStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

export interface Metric {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  industry: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
