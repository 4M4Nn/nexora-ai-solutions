"use client";

const ITEMS = [
  "AI Website Development",
  "Lead Nurturing",
  "SEO Automation",
  "Custom AI Agents",
  "Sales Automation",
  "Recruitment AI",
  "Customer Support",
  "24/7 Operations",
  "WhatsApp Automation",
  "Enterprise AI",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative py-5 bg-[#050816] overflow-hidden border-y border-white/[0.04]" style={{ transform: "skewY(-1deg)" }}>
      <div className="ticker-track gap-0" style={{ transform: "skewY(0deg)" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-0 shrink-0">
            <span
              className="text-sm sm:text-base font-heading font-semibold tracking-wide px-6 whitespace-nowrap"
              style={{ color: i % 3 === 0 ? "#00D4FF" : i % 3 === 1 ? "#ffffff" : "#B7C0D1" }}
            >
              {item}
            </span>
            <span className="text-[#00D4FF]/40 text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
