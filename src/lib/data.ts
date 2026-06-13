export const siteConfig = {
  name: "Nexora AI Solutions",
  tagline: "Kerala's #1 AI Automation Company",
  description:
    "Kerala's leading AI automation company. We build AI agents for websites, lead nurturing, SEO, sales, recruitment and customer support.",
  url: "https://nexora-ai-solutions.vercel.app",
  email: "nexoraaisolution@gmail.com",
  phone: "88911 29111",
  phoneRaw: "8891129111",
  whatsapp: "918891129111",
  address: {
    building: "Jogeo Building, 3rd Floor",
    area: "Chembumukki",
    city: "Kochi",
    state: "Kerala",
    pincode: "682030",
  },
};

export const navLinks = [
  { label: "Solutions", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Work", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    id: "01",
    title: "AI Website Development",
    tagline: "Live in 24 hours.",
    description:
      "We generate, build, and deploy fully functional, SEO-optimised AI websites for your business within 24 hours.",
    outcomes: [
      "Production-ready website in 24 hours",
      "AI-powered SEO built-in from day one",
      "Continuous automatic content updates",
    ],
    color: "#00D4FF",
    slug: "ai-website-development",
  },
  {
    id: "02",
    title: "AI Lead Nurturing",
    tagline: "Converts while you sleep.",
    description:
      "WhatsApp AI that greets, qualifies, and converts every incoming lead — 24 hours a day, 7 days a week.",
    outcomes: [
      "Automated lead qualification on WhatsApp",
      "Instant response to every incoming inquiry",
      "Up to 3× increase in conversion rate",
    ],
    color: "#00FFB2",
    slug: "ai-lead-nurturing",
  },
  {
    id: "03",
    title: "SEO Automation",
    tagline: "Rank without the effort.",
    description:
      "AI-powered keyword research, content creation, and technical SEO that drives consistent organic growth.",
    outcomes: [
      "Automated keyword targeting and ranking",
      "AI-generated SEO content every week",
      "Full technical SEO audit and fixes",
    ],
    color: "#6E44FF",
    slug: "seo-automation",
  },
  {
    id: "04",
    title: "Custom AI Agents",
    tagline: "Built for your business.",
    description:
      "Bespoke AI employees trained on your workflows, data, and processes to handle any business task autonomously.",
    outcomes: [
      "AI trained on your specific business data",
      "Integrates with your existing tools",
      "Scales to handle unlimited volume",
    ],
    color: "#00D4FF",
    slug: "custom-ai-agents",
  },
  {
    id: "05",
    title: "AI Sales Agent",
    tagline: "Your best salesperson, automated.",
    description:
      "An AI that qualifies leads, books appointments, follows up, and closes deals — without human intervention.",
    outcomes: [
      "Automated discovery calls and qualification",
      "Smart follow-up sequences that convert",
      "Real-time sales pipeline visibility",
    ],
    color: "#FF6B35",
    slug: "ai-sales-agent",
  },
  {
    id: "06",
    title: "AI Recruitment Agent",
    tagline: "Hire smarter, not harder.",
    description:
      "AI that screens CVs, conducts initial interviews, ranks candidates, and schedules final interviews automatically.",
    outcomes: [
      "CV screening done in seconds, not days",
      "Automated candidate communication",
      "80% reduction in hiring admin work",
    ],
    color: "#FF44AA",
    slug: "ai-recruitment-agent",
  },
  {
    id: "07",
    title: "Customer Support AI",
    tagline: "24/7. Zero waiting.",
    description:
      "Intelligent support automation that answers queries, resolves tickets, and escalates complex issues instantly.",
    outcomes: [
      "Instant response at any hour",
      "Resolves 80% of queries without human help",
      "Full integration with your existing helpdesk",
    ],
    color: "#4488FF",
    slug: "customer-support-ai",
  },
];

export const workSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We analyze your business, identify automation opportunities, and map existing workflows.",
    icon: "search",
  },
  {
    id: "02",
    title: "AI Architecture",
    description:
      "We design your custom AI agent system. Every agent built for your exact business needs.",
    icon: "blueprint",
  },
  {
    id: "03",
    title: "Development",
    description:
      "We build and train your AI agents from scratch with integration to your existing tools.",
    icon: "code",
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Your AI workforce goes live with full monitoring, support, and performance tracking.",
    icon: "rocket",
  },
  {
    id: "05",
    title: "Optimization",
    description:
      "Continuous improvement. Agents learn from data and get smarter over time automatically.",
    icon: "chart",
  },
];

export const industries = [
  "Healthcare",
  "Education",
  "Real Estate",
  "Salons",
  "Restaurants",
  "Construction",
  "Finance",
  "Automotive",
  "E-commerce",
  "Tourism",
];

export const metrics = [
  { display: "80%", value: 80, suffix: "%", label: "Cost", sublabel: "Down" },
  { display: "24/7", value: null, suffix: "", label: "Always", sublabel: "On" },
  { display: "3×", value: 3, suffix: "×", label: "More", sublabel: "Output" },
  { display: "5×", value: 5, suffix: "×", label: "Faster", sublabel: "Response" },
];

export const caseStudies = [
  {
    id: 1,
    company: "Brew & Bloom Coffee",
    location: "Kochi",
    service: "AI Website + Lead Nurturing",
    headline: "Website live in 24 hours. WhatsApp leads tripled.",
    story:
      "Brew & Bloom needed an online presence and a way to capture walk-in and delivery leads through WhatsApp. Nexora deployed a full AI website and integrated WhatsApp automation within one day.",
    keyMetric: { value: "3×", label: "Lead Increase" },
    secondMetric: { value: "24h", label: "Go Live" },
    color: "#00D4FF",
  },
  {
    id: 2,
    company: "Future Optima IT Solutions",
    location: "Kochi",
    service: "AI Lead Classification + NOVA Agent",
    headline: "200+ leads processed. Admissions up 40%.",
    story:
      "Future Optima was manually sorting hundreds of student inquiries daily. NOVA classified leads, responded with course details, and booked discovery calls — all automatically.",
    keyMetric: { value: "200+", label: "Leads Automated" },
    secondMetric: { value: "40%", label: "More Conversions" },
    color: "#00FFB2",
  },
  {
    id: 3,
    company: "IPB Kochi",
    location: "Banking Institute",
    service: "AI Marketing + Student Management",
    headline: "Instagram reach 5×. Manual work cut by 80%.",
    story:
      "IPB struggled with student communication and social media reach. Nexora deployed AI-driven content scheduling and an automated student management agent.",
    keyMetric: { value: "5×", label: "Instagram Reach" },
    secondMetric: { value: "80%", label: "Work Reduced" },
    color: "#6E44FF",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Nexora's AI lead system changed everything. We went from manually chasing 200 leads a day to watching the AI qualify and book appointments while we focused on closing deals. Conversion tripled in six weeks.",
    name: "Arun Menon",
    company: "Horizon Real Estate, Kochi",
  },
  {
    id: 2,
    quote:
      "Our clinic used to miss patient queries after hours. Now the AI responds instantly at any time, books appointments, and sends reminders. Patient satisfaction scores went through the roof.",
    name: "Dr. Priya Nair",
    company: "MedFirst Health Clinic, Thrissur",
  },
  {
    id: 3,
    quote:
      "I was skeptical. But Nexora delivered a full website in one day and had our WhatsApp AI live by evening. Within a month, our digital bookings were up 180%. This team is genuinely from the future.",
    name: "Rajan Thomas",
    company: "Spice Route Restaurants, Kerala",
  },
];

export const faqs = [
  {
    id: 1,
    question: "What exactly is an AI employee?",
    answer:
      "An AI employee is a software agent trained to perform specific business tasks autonomously — responding to leads, booking appointments, answering support queries, or generating content. It operates 24/7 with zero fatigue and zero salary.",
  },
  {
    id: 2,
    question: "How long does deployment take?",
    answer:
      "AI websites: 24 hours. Custom AI agents: 5 to 14 days depending on complexity. We move fast without compromising quality.",
  },
  {
    id: 3,
    question: "Do I need any technical knowledge?",
    answer:
      "None at all. We handle everything — design, development, training, integration, and handover. You get a fully working system with a simple dashboard.",
  },
  {
    id: 4,
    question: "What businesses benefit most?",
    answer:
      "Any business handling leads, customer queries, bookings, hiring, or marketing. We serve healthcare, real estate, restaurants, education, salons, finance, and more.",
  },
  {
    id: 5,
    question: "How does the WhatsApp AI work?",
    answer:
      "We connect to your WhatsApp Business number via the official Meta API. The AI greets leads, asks qualifying questions, shares pricing, books appointments, and follows up — all automatically.",
  },
  {
    id: 6,
    question: "Is my data secure?",
    answer:
      "Yes. All data flows through encrypted channels. We follow strict privacy protocols and never store sensitive information beyond operational necessity.",
  },
  {
    id: 7,
    question: "What does the AI website service include?",
    answer:
      "A fully designed, SEO-optimised, mobile-responsive website deployed to production within 24 hours — including analytics setup, domain configuration, and performance optimisation.",
  },
  {
    id: 8,
    question: "How do I get started?",
    answer:
      "Book a free 30-minute discovery call. We study your business, identify the highest-impact automation opportunity, and propose a tailored solution. No commitment required.",
  },
];

export const networkNodes = [
  "Sales",
  "Marketing",
  "Support",
  "HR",
  "Finance",
  "Operations",
  "Legal",
  "Logistics",
  "Analytics",
  "CRM",
  "Inventory",
  "Compliance",
];

export const tickerItems = [
  "AI WEBSITE DEVELOPMENT",
  "LEAD NURTURING",
  "SEO AUTOMATION",
  "SALES AGENT",
  "RECRUITMENT AI",
  "CUSTOMER SUPPORT",
  "24/7 OPERATIONS",
];

export const cinematicLines = [
  "I am NOVA.",
  "Your AI Employee.",
  "I generate websites.",
  "I nurture leads.",
  "I automate sales.",
  "I never sleep.",
  "Let me show you what I can do.",
];
