import { useState } from "react";
import {
  BadgeEuro,
  Check,
  FileCheck2,
  Landmark,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

type RoleKey = "procurement" | "legal" | "finance" | "security" | "compliance";

type RoleSolution = {
  key: RoleKey;
  label: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  metric: string;
  metricLabel: string;
  queue: { label: string; value: string; tone: string }[];
};

const roleSolutions: RoleSolution[] = [
  {
    key: "procurement",
    label: "Procurement",
    icon: ShoppingCart,
    eyebrow: "Move requests forward",
    title: "Own the process without chasing every team.",
    description:
      "Give requesters a structured intake, route reviews automatically and keep every vendor owner accountable from first request to renewal.",
    outcomes: [
      "Standardised intake across business units",
      "One view of blockers and accountable owners",
      "Faster vendor activation with less admin",
    ],
    metric: "4.2d",
    metricLabel: "Average onboarding cycle",
    queue: [
      { label: "New requests", value: "12", tone: "bg-indigo-50 text-indigo-700" },
      { label: "Waiting on vendor", value: "4", tone: "bg-amber-50 text-amber-700" },
      { label: "Ready to approve", value: "7", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  {
    key: "legal",
    label: "Legal",
    icon: Scale,
    eyebrow: "Review with context",
    title: "See contracts, risk and ownership before you approve.",
    description:
      "Keep contract terms, privacy requirements, exceptions and approval history connected to the same vendor record.",
    outcomes: [
      "Key clauses and obligations in one workspace",
      "Risk-tiered legal and privacy reviews",
      "Auditable exceptions and approval conditions",
    ],
    metric: "68%",
    metricLabel: "Fewer follow-up emails",
    queue: [
      { label: "Contracts in review", value: "9", tone: "bg-indigo-50 text-indigo-700" },
      { label: "Privacy exceptions", value: "2", tone: "bg-amber-50 text-amber-700" },
      { label: "Approved this week", value: "14", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    icon: Landmark,
    eyebrow: "Control spend and exposure",
    title: "Connect vendor decisions to budget and financial risk.",
    description:
      "Understand annual commitments, financial health, concentration risk and savings opportunities before money is committed.",
    outcomes: [
      "Budget approval tied to the vendor record",
      "Early visibility into renewal commitments",
      "Financial health and concentration signals",
    ],
    metric: "€1.4m",
    metricLabel: "Spend under review",
    queue: [
      { label: "Budget approvals", value: "6", tone: "bg-indigo-50 text-indigo-700" },
      { label: "Renewal exposure", value: "€248k", tone: "bg-amber-50 text-amber-700" },
      { label: "Savings identified", value: "€36k", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  {
    key: "security",
    label: "Security",
    icon: ShieldCheck,
    eyebrow: "Prioritise real risk",
    title: "Spend time on findings—not questionnaire administration.",
    description:
      "Tier vendors by criticality, collect the right evidence and monitor material risk changes after approval.",
    outcomes: [
      "Adaptive questionnaires based on exposure",
      "Evidence, controls and findings together",
      "Continuous monitoring with accountable actions",
    ],
    metric: "23",
    metricLabel: "Critical vendors monitored",
    queue: [
      { label: "Assessments open", value: "8", tone: "bg-indigo-50 text-indigo-700" },
      { label: "Material findings", value: "3", tone: "bg-amber-50 text-amber-700" },
      { label: "Controls verified", value: "92%", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
  {
    key: "compliance",
    label: "Compliance",
    icon: FileCheck2,
    eyebrow: "Stay audit-ready",
    title: "Turn vendor evidence into a defensible control record.",
    description:
      "Map owners, evidence, approvals, exceptions and review cadence to the supplier controls your programme requires.",
    outcomes: [
      "Complete decision and evidence history",
      "DORA, NIS2 and GDPR-supporting workflows",
      "Exportable oversight and review records",
    ],
    metric: "96%",
    metricLabel: "Records audit-ready",
    queue: [
      { label: "Evidence expiring", value: "5", tone: "bg-indigo-50 text-indigo-700" },
      { label: "Exceptions open", value: "2", tone: "bg-amber-50 text-amber-700" },
      { label: "Reviews current", value: "96%", tone: "bg-emerald-50 text-emerald-700" },
    ],
  },
];

export function RoleSolutions() {
  const [activeRole, setActiveRole] = useState<RoleKey>("procurement");
  const role = roleSolutions.find((item) => item.key === activeRole) ?? roleSolutions[0];
  const RoleIcon = role.icon;

  return (
    <section id="solutions" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          Solutions by team
        </div>
        <h2 className="mx-auto mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] text-primary sm:text-4xl lg:text-[44px]">
          One vendor record.{" "}
          <span className="font-editorial text-accent">Every team’s context.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          See how VendorXa gives each function the decisions, evidence and next actions it needs.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto pb-1">
        <div
          className="mx-auto flex min-w-max justify-center gap-2"
          role="tablist"
          aria-label="Solutions by team"
        >
          {roleSolutions.map((item) => {
            const Icon = item.icon;
            const isActive = activeRole === item.key;

            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="role-solution-panel"
                onClick={() => setActiveRole(item.key)}
                className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98] ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground shadow-[0_10px_25px_-15px_color-mix(in_oklab,var(--accent)_70%,transparent)]"
                    : "border-border bg-surface text-primary/75 hover:border-accent/40 hover:text-primary"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="role-solution-panel"
        role="tabpanel"
        className="surface-card mt-6 overflow-hidden"
        aria-live="polite"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 md:p-10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <RoleIcon className="h-5 w-5" />
            </span>
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              {role.eyebrow}
            </div>
            <h3 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-primary md:text-3xl">
              {role.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {role.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {role.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 text-xs leading-relaxed text-primary/80"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border bg-background/45 p-6 md:p-8 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {role.label} workspace
                </div>
                <div className="mt-1 text-sm font-semibold text-primary">
                  Today’s control centre
                </div>
              </div>
              <Users className="h-5 w-5 text-accent" />
            </div>

            <div className="mt-5 rounded-lg border border-border bg-surface p-5">
              <div className="text-4xl font-semibold tracking-tight text-primary">
                {role.metric}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{role.metricLabel}</div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {role.queue.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-left"
                >
                  <span className="text-xs text-primary/75">{item.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.tone}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
              <BadgeEuro className="h-3.5 w-3.5 text-accent" />
              Shared data, role-specific decisions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
