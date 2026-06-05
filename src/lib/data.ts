import type {
  Service,
  Industry,
  WorkStep,
  PortfolioItem,
  Metric,
  Testimonial,
  FAQItem,
  NavLink,
  ContactInfo,
} from "@/types";

export const siteConfig = {
  name: "Nexora AI Solutions",
  tagline: "AI Employees for Modern Businesses",
  description:
    "Nexora AI Solutions builds AI-powered business automation systems, custom AI agents, AI websites, lead nurturing systems, SEO automation, sales automation, customer support agents, and enterprise AI solutions.",
  url: "https://nexora-ai-solutions.vercel.app",
};

export const contactInfo: ContactInfo = {
  phone: "8891129111",
  email: "nexoraaisolution@gmail.com",
  whatsapp: "8891129111",
  address: "Jogeo Building, 3rd Floor, Chembumukki",
  city: "Kochi",
  state: "Kerala",
  pincode: "682030",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Why Nexora", href: "/why-nexora" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    id: "ai-website",
    title: "AI Website Development",
    description:
      "Get a fully designed, SEO-optimized, and deployed website powered by AI within 24 hours. No waiting weeks for agencies.",
    features: [
      "Deployed within 24 hours",
      "SEO-optimized structure",
      "Mobile-first responsive design",
      "Performance score 95+",
      "AI-generated content",
    ],
    icon: "Globe",
    color: "#00D4FF",
  },
  {
    id: "ai-lead-nurturing",
    title: "AI Lead Nurturing",
    description:
      "Deploy a WhatsApp AI agent that qualifies, nurtures, and converts your leads into paying customers automatically — 24/7.",
    features: [
      "WhatsApp AI integration",
      "Automated follow-ups",
      "Lead scoring & qualification",
      "CRM sync",
      "Multi-language support",
    ],
    icon: "MessageSquare",
    color: "#6E44FF",
  },
  {
    id: "seo-automation",
    title: "SEO Automation",
    description:
      "AI-powered SEO that researches keywords, creates optimized content, builds backlinks, and tracks rankings — on autopilot.",
    features: [
      "AI keyword research",
      "Automated content creation",
      "Technical SEO audits",
      "Backlink monitoring",
      "Rank tracking dashboard",
    ],
    icon: "TrendingUp",
    color: "#00FFB2",
  },
  {
    id: "custom-ai-agents",
    title: "Custom AI Agents",
    description:
      "Build bespoke AI employees tailored to your unique business workflows — from data processing to client communication.",
    features: [
      "Fully custom-built agents",
      "API & tool integrations",
      "Memory & context retention",
      "Multi-agent orchestration",
      "Continuous learning",
    ],
    icon: "Bot",
    color: "#00D4FF",
  },
  {
    id: "ai-sales-agent",
    title: "AI Sales Agent",
    description:
      "An AI salesperson that qualifies prospects, handles objections, books demos, and follows up — without human intervention.",
    features: [
      "Automated prospect qualification",
      "Intelligent objection handling",
      "Calendar booking integration",
      "Pipeline management",
      "Revenue analytics",
    ],
    icon: "Zap",
    color: "#6E44FF",
  },
  {
    id: "ai-recruitment-agent",
    title: "AI Recruitment Agent",
    description:
      "Streamline your hiring with an AI that screens resumes, conducts initial interviews, and manages candidates end-to-end.",
    features: [
      "Automated resume screening",
      "AI-driven initial interviews",
      "Candidate ranking & scoring",
      "Interview scheduling",
      "Offer letter automation",
    ],
    icon: "Users",
    color: "#00FFB2",
  },
  {
    id: "ai-customer-support",
    title: "AI Customer Support Agent",
    description:
      "Deliver instant, accurate, and empathetic customer support across all channels with AI that never sleeps.",
    features: [
      "24/7 instant responses",
      "Multi-channel deployment",
      "Human handoff escalation",
      "Knowledge base training",
      "Sentiment analysis",
    ],
    icon: "HeadphonesIcon",
    color: "#00D4FF",
  },
];

export const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "AI agents for patient support, appointment booking, and medical record automation.",
    icon: "Heart",
    solutions: ["Patient support bot", "Appointment scheduling", "Medical FAQ agent"],
  },
  {
    id: "education",
    name: "Education",
    description: "AI tutors, admission agents, and course recommendation systems for EdTech.",
    icon: "BookOpen",
    solutions: ["Student support AI", "Admission automation", "Learning assistant"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property inquiry agents, lead nurturing, and virtual property tour automation.",
    icon: "Building2",
    solutions: ["Property inquiry bot", "Lead qualification", "Virtual tour AI"],
  },
  {
    id: "salons",
    name: "Salons & Spa",
    description: "Appointment booking AI, service recommendation, and customer re-engagement automation.",
    icon: "Scissors",
    solutions: ["Booking automation", "Service recommendations", "Review collection"],
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description: "AI for table reservations, menu queries, online orders, and customer feedback loops.",
    icon: "UtensilsCrossed",
    solutions: ["Reservation AI", "Menu inquiry bot", "Feedback automation"],
  },
  {
    id: "construction",
    name: "Construction",
    description: "Project inquiry handling, contractor coordination, and client update automation.",
    icon: "HardHat",
    solutions: ["Project inquiry agent", "Tender notifications", "Progress updates"],
  },
  {
    id: "finance",
    name: "Finance & BFSI",
    description: "Loan inquiry agents, KYC automation, investment advisory bots, and compliance AI.",
    icon: "TrendingUp",
    solutions: ["Loan inquiry AI", "KYC automation", "Investment advisory bot"],
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Test drive booking, service reminders, and car inventory inquiry automation.",
    icon: "Car",
    solutions: ["Test drive booking", "Service reminders", "Inventory AI"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "AI for product recommendations, order tracking, returns handling, and upselling.",
    icon: "ShoppingCart",
    solutions: ["Product recommendation AI", "Order tracking bot", "Returns automation"],
  },
  {
    id: "tourism",
    name: "Tourism & Travel",
    description: "Travel inquiry agents, itinerary builders, and booking automation for travel businesses.",
    icon: "Plane",
    solutions: ["Travel inquiry AI", "Itinerary builder", "Booking automation"],
  },
];

export const workSteps: WorkStep[] = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We analyze your business goals, workflows, pain points, and growth targets. A dedicated AI architect maps out your automation opportunities.",
    icon: "Search",
  },
  {
    step: 2,
    title: "AI Architecture",
    description:
      "Our team designs the AI system blueprint — selecting the right models, tools, integrations, and data flows for your specific use case.",
    icon: "Brain",
  },
  {
    step: 3,
    title: "Development",
    description:
      "We build your custom AI agents, websites, and automation pipelines using cutting-edge LLMs and enterprise-grade infrastructure.",
    icon: "Code2",
  },
  {
    step: 4,
    title: "Deployment",
    description:
      "Your AI system goes live with zero downtime. We handle all technical setup, integrations, testing, and staff onboarding.",
    icon: "Rocket",
  },
  {
    step: 5,
    title: "Optimization",
    description:
      "We monitor performance, gather feedback, and continuously improve your AI systems — so they get smarter and more effective over time.",
    icon: "BarChart3",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "kochi-realty-ai",
    client: "Kochi Realty Group",
    industry: "Real Estate",
    challenge:
      "The sales team was overwhelmed with 300+ daily WhatsApp inquiries about properties. 70% of leads went cold due to delayed responses.",
    solution:
      "We deployed a WhatsApp AI lead nurturing agent that instantly responds, qualifies buyers based on budget and preferences, and books site visits automatically.",
    results: [
      "92% reduction in response time (instant vs 4 hours)",
      "3.2x increase in qualified site visits",
      "58% increase in conversions within 90 days",
      "Saved 40 hours/week of sales team time",
    ],
    tags: ["WhatsApp AI", "Lead Nurturing", "Real Estate"],
  },
  {
    id: "medcare-clinic",
    client: "MedCare Wellness Clinic",
    industry: "Healthcare",
    challenge:
      "Patients couldn't get appointment slots quickly. Front desk staff spent 5+ hours daily just answering repetitive phone calls and booking appointments.",
    solution:
      "Built a 24/7 AI patient support agent integrated with their booking system that handles queries, books appointments, sends reminders, and answers medical FAQs.",
    results: [
      "80% of appointments now booked without staff intervention",
      "Patient satisfaction score improved from 3.2 to 4.7/5",
      "Staff time saved: 4.5 hours per day",
      "Zero missed appointments with AI reminders",
    ],
    tags: ["Healthcare AI", "Appointment Booking", "Patient Support"],
  },
  {
    id: "spice-garden-restaurant",
    client: "Spice Garden Restaurant Chain",
    industry: "Restaurants",
    challenge:
      "Table reservation calls were being missed during peak hours. Online ordering was fragmented across 4 platforms with no unified customer communication.",
    solution:
      "Deployed an AI reservation and ordering agent across WhatsApp and their website, integrated with their POS system for real-time table management and order tracking.",
    results: [
      "100% reservation inquiries handled automatically",
      "35% increase in repeat customers through AI follow-ups",
      "Average order value increased by 22% via AI upselling",
      "Negative reviews reduced by 60% through proactive resolution",
    ],
    tags: ["Restaurant AI", "Reservation Bot", "Customer Engagement"],
  },
  {
    id: "stylehub-ecommerce",
    client: "StyleHub Fashion",
    industry: "E-commerce",
    challenge:
      "High cart abandonment rate of 78% and a customer support team struggling with 500+ daily queries about orders, returns, and product availability.",
    solution:
      "Integrated an AI sales and support agent on their website and WhatsApp that recovers abandoned carts, handles all support queries, and provides personalized product recommendations.",
    results: [
      "Cart abandonment reduced from 78% to 41%",
      "Support ticket volume reduced by 73%",
      "Product recommendation AI drove 28% revenue uplift",
      "Customer support cost reduced by 65%",
    ],
    tags: ["E-commerce AI", "Cart Recovery", "Product Recommendations"],
  },
];

export const metrics: Metric[] = [
  {
    value: "80%",
    label: "Cost Reduction",
    description: "Average operational cost savings our clients achieve within 6 months",
    icon: "TrendingDown",
  },
  {
    value: "24/7",
    label: "Operations",
    description: "Your AI employees work around the clock — no breaks, no sick days",
    icon: "Clock",
  },
  {
    value: "3x",
    label: "Productivity Boost",
    description: "Teams using our AI agents complete 3x more work in the same time",
    icon: "Zap",
  },
  {
    value: "5x",
    label: "Faster Response",
    description: "AI responds to customers 5 times faster than human agents on average",
    icon: "Timer",
  },
  {
    value: "∞",
    label: "Scalability",
    description: "Handle 1 or 100,000 customers simultaneously — without adding headcount",
    icon: "Infinity",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Menon",
    role: "Managing Director",
    company: "Kochi Realty Group",
    content:
      "Nexora transformed how we handle leads. Our WhatsApp AI agent now qualifies 300+ inquiries daily automatically. In 3 months, our conversion rate tripled and our sales team can now focus on closing, not chasing.",
    rating: 5,
    industry: "Real Estate",
  },
  {
    id: "t2",
    name: "Dr. Priya Nair",
    role: "Chief Operations Officer",
    company: "MedCare Wellness Clinic",
    content:
      "The AI patient support agent has been a game-changer. Our front desk team was drowning in calls. Now 80% of bookings happen automatically and patients are happier than ever. Nexora delivered exactly what they promised.",
    rating: 5,
    industry: "Healthcare",
  },
  {
    id: "t3",
    name: "Anand Krishnan",
    role: "Founder",
    company: "StyleHub Fashion",
    content:
      "We were losing customers to cart abandonment daily. Nexora's AI agent started recovering carts within the first week. Revenue is up 28% and our support costs dropped by 65%. The ROI was visible within 30 days.",
    rating: 5,
    industry: "E-commerce",
  },
  {
    id: "t4",
    name: "Fatima Al-Hassan",
    role: "CEO",
    company: "Spice Garden Restaurant Group",
    content:
      "Not a single reservation call goes unanswered now. The AI handles everything — bookings, menu queries, feedback collection. Our team can focus on serving guests, not answering phones. Absolutely worth every rupee.",
    rating: 5,
    industry: "Restaurants",
  },
  {
    id: "t5",
    name: "Suresh Pillai",
    role: "HR Director",
    company: "Techbridge Global",
    content:
      "Recruitment used to take us 6 weeks per hire. With Nexora's AI recruitment agent, we screen 200 resumes overnight, run initial interviews automatically, and our hiring time is down to 12 days. Incredible technology.",
    rating: 5,
    industry: "Technology",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What exactly is an AI Agent?",
    answer:
      "An AI agent is a software system powered by large language models (LLMs) that can understand natural language, take actions, use tools, and complete tasks autonomously. Think of it as a digital employee that works 24/7, never makes repetitive mistakes, and can handle thousands of tasks simultaneously.",
  },
  {
    question: "How long does it take to deploy an AI system?",
    answer:
      "Timelines depend on complexity. An AI website can be deployed in 24 hours. A WhatsApp AI lead nurturing agent typically takes 5–7 business days. Custom AI agents with complex integrations can take 2–4 weeks. We always provide a clear timeline before starting.",
  },
  {
    question: "Do I need technical knowledge to use your AI systems?",
    answer:
      "Absolutely not. Our AI systems are built to be used by anyone. We handle all technical setup, integration, and training. You simply interact with your AI agent through familiar interfaces like WhatsApp, a web dashboard, or your existing tools.",
  },
  {
    question: "How secure is my business data?",
    answer:
      "Security is our top priority. All data is encrypted in transit and at rest. We use enterprise-grade cloud infrastructure. Your business data is never used to train third-party models. We comply with data protection regulations and can sign NDAs upon request.",
  },
  {
    question: "Can AI agents integrate with my existing software?",
    answer:
      "Yes. Our AI agents integrate with 500+ tools including CRMs (Salesforce, HubSpot, Zoho), messaging platforms (WhatsApp, Telegram, Slack), booking systems, payment gateways, ERPs, and custom APIs. If you use it, we can likely connect to it.",
  },
  {
    question: "What languages can the AI agents support?",
    answer:
      "Our AI agents support 50+ languages including English, Hindi, Malayalam, Tamil, Arabic, and more. Multi-language support is included by default for most deployments at no extra cost.",
  },
  {
    question: "What happens if the AI makes a mistake?",
    answer:
      "Every AI system we deploy includes human handoff protocols — when the AI is uncertain, it escalates to a human agent. We also run continuous monitoring and feedback loops so the AI improves over time. Most client systems achieve 95%+ accuracy within the first month.",
  },
  {
    question: "What is the pricing model?",
    answer:
      "Pricing depends on the type of AI system, complexity, and scale. We offer one-time project pricing for websites and standard agents, and monthly retainer plans for ongoing AI operations. Contact us for a free discovery call and custom quote tailored to your business.",
  },
  {
    question: "Do you serve clients outside Kerala?",
    answer:
      "Yes. While we are headquartered in Kochi, Kerala, we serve clients across India and internationally. All our services are delivered remotely with full support. We have active clients in Mumbai, Bangalore, Dubai, and beyond.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply reach out via our contact form, email, or WhatsApp. We'll schedule a free 30-minute discovery call to understand your business needs and propose the best AI solution. No commitment required for the initial consultation.",
  },
];

export const whyNexoraPoints = [
  {
    title: "Built for Indian Businesses",
    description: "We understand the nuances of Indian markets, languages, and customer behavior — our AI is optimized for local context.",
    icon: "MapPin",
  },
  {
    title: "End-to-End Ownership",
    description: "From strategy to deployment to optimization, we own the entire AI journey so you don't have to manage multiple vendors.",
    icon: "Shield",
  },
  {
    title: "Results Before Revenue",
    description: "We tie our success to yours. We measure ourselves on your KPIs — leads generated, costs saved, revenue grown.",
    icon: "Target",
  },
  {
    title: "Enterprise-Grade Technology",
    description: "Powered by the latest LLMs from OpenAI, Anthropic, and Google — the same technology Fortune 500 companies use.",
    icon: "Cpu",
  },
  {
    title: "Rapid Deployment",
    description: "No 6-month implementation timelines. Our AI systems go live in days, not months — so you see ROI faster.",
    icon: "Rocket",
  },
  {
    title: "Dedicated AI Team",
    description: "You get a dedicated AI architect, developer, and account manager — not a ticket queue.",
    icon: "Users",
  },
];
