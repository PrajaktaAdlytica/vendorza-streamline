import { Check } from "lucide-react";
import { ButtonLink } from "./Button";

const plans = [
  {
    name: "Essentials",
    price: "€79",
    desc: "For small teams getting started with vendor management.",
    features: ["Up to 25 vendors", "Standard workflows", "Document storage (5GB)", "Email support"],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "€179",
    desc: "For growing teams that need advanced workflows and insights.",
    features: ["Up to 250 vendors", "Advanced workflows", "Risk monitoring", "Priority support"],
    cta: "Get Started",
  },
  {
    name: "Business",
    price: "€349",
    desc: "For mid-sized organisations that need scale and automation.",
    features: ["Up to 1,000 vendors", "Advanced risk & compliance", "ESG tracking", "SSO & role permissions"],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organisations with complex requirements.",
    features: ["Unlimited vendors", "Custom integrations", "Dedicated success manager", "SLA & premium support"],
    cta: "Contact Sales",
  },
];

export function Pricing() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`surface-card card-hover p-6 flex flex-col relative ${
            p.featured ? "ring-2 ring-accent shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--accent)_50%,transparent)]" : ""
          }`}
        >
          {p.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[11px] font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}
          <div className="text-sm font-semibold text-primary">{p.name}</div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed min-h-[42px]">{p.desc}</p>
          <div className="mt-5">
            <span className="text-4xl font-semibold text-primary tracking-tight">{p.price}</span>
            {p.price !== "Custom" && <span className="text-sm text-muted-foreground ml-1">/month</span>}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            {p.price === "Custom" ? "Contact us for pricing" : "Billed annually"}
          </div>
          <ul className="mt-6 space-y-2.5 text-sm text-primary/80 flex-1">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <ButtonLink
              to="/request-demo"
              variant={p.featured ? "primary" : "outline"}
              size="md"
              className="w-full"
            >
              {p.cta}
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  );
}
