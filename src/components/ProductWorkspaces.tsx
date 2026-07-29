import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  Leaf,
  ShieldCheck,
  Users,
} from "lucide-react";

type Tone = "emerald" | "amber" | "indigo";

const toneStyles: Record<Tone, { chip: string; soft: string; text: string }> = {
  emerald: {
    chip: "bg-emerald-500 text-white",
    soft: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    text: "text-emerald-700",
  },
  amber: {
    chip: "bg-amber-500 text-white",
    soft: "bg-amber-50 text-amber-700 ring-amber-200",
    text: "text-amber-700",
  },
  indigo: {
    chip: "bg-indigo-500 text-white",
    soft: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    text: "text-indigo-700",
  },
};

const onboardStages = [
  {
    name: "Intake",
    label: "01",
    title: "Vendor request",
    description: "Capture the business need, owner and criticality before work begins.",
    fields: [
      ["Business owner", "Anna Kowalska"],
      ["Vendor category", "Cloud infrastructure"],
      ["Service criticality", "Important"],
      ["Data access", "Customer personal data"],
    ],
  },
  {
    name: "Documents",
    label: "02",
    title: "Evidence collection",
    description: "Request only the documents required for this vendor’s risk tier.",
    fields: [
      ["Security questionnaire", "Received"],
      ["DPA & subprocessors", "Received"],
      ["Insurance certificate", "Pending"],
      ["Financial statements", "Not required"],
    ],
  },
  {
    name: "Reviews",
    label: "03",
    title: "Cross-team review",
    description: "Give security, legal and finance a shared decision workspace.",
    fields: [
      ["Security", "Approved"],
      ["Privacy", "In review"],
      ["Legal", "Approved"],
      ["Finance", "Approved"],
    ],
  },
  {
    name: "Approvals",
    label: "04",
    title: "Final approval",
    description: "Route exceptions and conditions to the accountable approvers.",
    fields: [
      ["Procurement lead", "Approved"],
      ["CISO exception", "Not required"],
      ["Budget owner", "Approved"],
      ["Contract signature", "Pending"],
    ],
  },
  {
    name: "Ready",
    label: "05",
    title: "Vendor activated",
    description: "Create the monitoring plan, renewal date and complete audit trail.",
    fields: [
      ["Vendor status", "Active"],
      ["Monitoring cadence", "Quarterly"],
      ["Renewal date", "12 Jun 2027"],
      ["Record completeness", "96%"],
    ],
  },
] as const;

export function OnboardWorkspace() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = onboardStages[activeStage];

  return (
    <WorkspaceFrame
      tone="emerald"
      label="Live onboarding"
      title="TechWave Solutions"
      description="New vendor · Cloud infrastructure · Important service"
    >
      <div className="grid min-h-[430px] lg:grid-cols-[210px_1fr_240px]">
        <aside className="border-b border-border bg-background/40 p-4 lg:border-b-0 lg:border-r">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Onboarding stages
          </div>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-5 lg:grid-cols-1">
            {onboardStages.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveStage(index)}
                aria-pressed={activeStage === index}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 ${
                  activeStage === index
                    ? "bg-surface text-primary shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:bg-surface hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                    index < activeStage
                      ? "bg-emerald-500 text-white"
                      : activeStage === index
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index < activeStage ? <Check className="h-3.5 w-3.5" /> : item.label}
                </span>
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="p-5 md:p-7" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Step {activeStage + 1} of {onboardStages.length}
              </div>
              <h3 className="mt-1.5 text-xl font-semibold text-primary">{stage.title}</h3>
              <p className="mt-1 max-w-lg text-xs leading-relaxed text-muted-foreground">
                {stage.description}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              {activeStage === onboardStages.length - 1 ? "Complete" : "In progress"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {stage.fields.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-background/60 p-4 text-left"
              >
                <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
                <span className="mt-1.5 flex items-center justify-between gap-3 text-sm font-medium text-primary">
                  {value}
                  {["Received", "Approved", "Active"].includes(value) ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-border bg-background/40 p-5 lg:border-l lg:border-t-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Workflow health
          </div>
          <div className="mt-4">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight text-primary">
                {Math.round(((activeStage + 1) / onboardStages.length) * 100)}%
              </span>
              <span className="text-[10px] text-muted-foreground">Complete</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-500"
                style={{ width: `${((activeStage + 1) / onboardStages.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <SummaryLine icon={<Users className="h-4 w-4" />} label="4 reviewers" />
            <SummaryLine icon={<FileCheck2 className="h-4 w-4" />} label="7 documents" />
            <SummaryLine icon={<Clock3 className="h-4 w-4" />} label="2.4 days elapsed" />
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveStage((current) => Math.min(current + 1, onboardStages.length - 1))
            }
            disabled={activeStage === onboardStages.length - 1}
            className="mt-7 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-3 text-xs font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50"
          >
            Continue workflow <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </aside>
      </div>
    </WorkspaceFrame>
  );
}

const riskVendors = [
  {
    name: "TechWave Solutions",
    score: 72,
    level: "Moderate",
    change: "+4 this month",
    signals: [
      ["Security posture", "82", "Healthy"],
      ["Financial stability", "74", "Stable"],
      ["Legal & privacy", "61", "Review"],
      ["ESG evidence", "48", "Attention"],
    ],
  },
  {
    name: "LogiTrans S.A.",
    score: 41,
    level: "High",
    change: "-12 this month",
    signals: [
      ["Security posture", "58", "Review"],
      ["Financial stability", "39", "Attention"],
      ["Legal & privacy", "66", "Stable"],
      ["ESG evidence", "35", "Attention"],
    ],
  },
  {
    name: "Nordic Cyber AB",
    score: 89,
    level: "Low",
    change: "+2 this month",
    signals: [
      ["Security posture", "94", "Healthy"],
      ["Financial stability", "81", "Stable"],
      ["Legal & privacy", "91", "Healthy"],
      ["ESG evidence", "73", "Stable"],
    ],
  },
] as const;

type RiskView = "overview" | "findings" | "monitoring";

export function RiskWorkspace() {
  const [vendorIndex, setVendorIndex] = useState(0);
  const [view, setView] = useState<RiskView>("overview");
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null);
  const vendor = riskVendors[vendorIndex];

  return (
    <WorkspaceFrame
      tone="amber"
      label="Continuous monitoring"
      title="Third-party risk centre"
      description="Live security, financial, legal and ESG signals"
    >
      <div className="grid min-h-[430px] lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-border bg-background/40 p-4 lg:border-b-0 lg:border-r">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Monitored vendors
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {riskVendors.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setVendorIndex(index);
                  setView("overview");
                  setSelectedFinding(null);
                }}
                aria-pressed={vendorIndex === index}
                className={`rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
                  vendorIndex === index
                    ? "border-amber-200 bg-amber-50/60"
                    : "border-border bg-surface hover:border-amber-200"
                }`}
              >
                <span className="block truncate text-xs font-medium text-primary">{item.name}</span>
                <span className="mt-2 flex items-end justify-between">
                  <span className="text-2xl font-semibold tracking-tight text-primary">
                    {item.score}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{item.level}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
            <div className="flex gap-2">
              <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <div className="text-xs font-medium text-amber-900">2 signals changed</div>
                <p className="mt-1 text-[10px] leading-relaxed text-amber-800/75">
                  Financial and ESG evidence need review.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="p-5 md:p-7" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-primary">{vendor.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{vendor.change}</p>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-primary">
                {vendor.score}
              </span>
              <span className="mb-1 text-xs text-muted-foreground">/100 · {vendor.level}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-5 border-b border-border">
            {(["overview", "findings", "monitoring"] as RiskView[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`border-b-2 pb-2.5 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
                  view === item
                    ? "border-amber-500 text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {view === "overview" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {vendor.signals.map(([label, value, state]) => (
                <div key={label} className="rounded-lg border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-primary">{label}</span>
                    <span className="text-lg font-semibold text-primary">{value}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${
                        Number(value) >= 75
                          ? "bg-emerald-500"
                          : Number(value) >= 55
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-muted-foreground">{state}</div>
                </div>
              ))}
            </div>
          ) : null}

          {view === "findings" ? (
            <div className="mt-5 divide-y divide-border rounded-lg border border-border">
              <Finding
                icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
                title="Updated financial statement required"
                meta="Medium · Due in 7 days"
                details="Finance requested the latest audited statements after a material score change."
                expanded={selectedFinding === "financial"}
                onToggle={() =>
                  setSelectedFinding((current) => (current === "financial" ? null : "financial"))
                }
              />
              <Finding
                icon={<Leaf className="h-4 w-4 text-amber-600" />}
                title="ESG evidence expires next month"
                meta="Medium · Owner: Procurement"
                details="The current emissions disclosure expires on 31 August and a replacement is pending."
                expanded={selectedFinding === "esg"}
                onToggle={() => setSelectedFinding((current) => (current === "esg" ? null : "esg"))}
              />
              <Finding
                icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                title="Security controls reviewed"
                meta="Resolved · 26 Jul 2026"
                details="Security verified the remediation evidence and closed the control review."
                expanded={selectedFinding === "security"}
                onToggle={() =>
                  setSelectedFinding((current) => (current === "security" ? null : "security"))
                }
              />
            </div>
          ) : null}

          {view === "monitoring" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Signals watched" value="28" detail="Across 6 sources" />
              <MetricCard label="Review cadence" value="90d" detail="Next: 12 Oct" />
              <MetricCard label="Open actions" value="2" detail="Both medium priority" />
            </div>
          ) : null}
        </div>
      </div>
    </WorkspaceFrame>
  );
}

const renewals = [
  {
    vendor: "TechWave Solutions",
    date: "12 Aug 2026",
    days: 14,
    spend: "€84,000",
    owner: "Anna Kowalska",
    risk: "Low",
  },
  {
    vendor: "DataSecure Sp. z o.o.",
    date: "03 Sep 2026",
    days: 36,
    spend: "€46,500",
    owner: "Piotr Nowak",
    risk: "Medium",
  },
  {
    vendor: "GreenPack Europe",
    date: "21 Oct 2026",
    days: 84,
    spend: "€118,000",
    owner: "Katarzyna Lewandowska",
    risk: "Low",
  },
] as const;

type RenewalView = "timeline" | "commercial" | "risk";
type RenewalDecision = "Renew" | "Renegotiate" | "Exit";

export function RenewWorkspace() {
  const [renewalIndex, setRenewalIndex] = useState(0);
  const [view, setView] = useState<RenewalView>("timeline");
  const [decision, setDecision] = useState<RenewalDecision>("Renegotiate");
  const renewal = renewals[renewalIndex];

  return (
    <WorkspaceFrame
      tone="indigo"
      label="Renewal workspace"
      title="Upcoming decisions"
      description="Contract, risk and finance context in one place"
    >
      <div className="grid min-h-[430px] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border bg-background/40 p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Next 90 days
            </span>
            <span className="text-[10px] text-indigo-700">3 renewals</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {renewals.map((item, index) => (
              <button
                key={item.vendor}
                type="button"
                onClick={() => setRenewalIndex(index)}
                aria-pressed={renewalIndex === index}
                className={`rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                  renewalIndex === index
                    ? "border-indigo-200 bg-indigo-50/60"
                    : "border-border bg-surface hover:border-indigo-200"
                }`}
              >
                <span className="block truncate text-xs font-medium text-primary">
                  {item.vendor}
                </span>
                <span className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-700">
                    {item.days}d
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="p-5 md:p-7" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-700">
                Decision due in {renewal.days} days
              </div>
              <h3 className="mt-1.5 text-xl font-semibold text-primary">{renewal.vendor}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Owner: {renewal.owner} · Annual spend {renewal.spend}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              {renewal.risk} risk
            </span>
          </div>

          <div className="mt-5 flex gap-5 border-b border-border">
            {(["timeline", "commercial", "risk"] as RenewalView[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`border-b-2 pb-2.5 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                  view === item
                    ? "border-indigo-500 text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {view === "timeline" ? (
            <div className="mt-5 space-y-3">
              <TimelineItem
                icon={<FileText className="h-4 w-4" />}
                title="Contract terms extracted"
                meta="Completed · 16 Jul"
              />
              <TimelineItem
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Risk review complete"
                meta="Low risk · 22 Jul"
              />
              <TimelineItem
                icon={<CircleDollarSign className="h-4 w-4" />}
                title="Budget owner review"
                meta="Due tomorrow"
              />
              <TimelineItem
                icon={<BadgeCheck className="h-4 w-4" />}
                title="Renewal decision"
                meta={`Due ${renewal.date}`}
              />
            </div>
          ) : null}

          {view === "commercial" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Annual spend" value={renewal.spend} detail="Current term" />
              <MetricCard label="Utilisation" value="78%" detail="+6% quarter over quarter" />
              <MetricCard label="Savings opportunity" value="€12k" detail="Benchmark estimate" />
            </div>
          ) : null}

          {view === "risk" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-medium text-primary">Current risk</div>
                <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-primary">
                  84 <span className="text-xs font-normal text-emerald-700">Low</span>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-medium text-primary">Open findings</div>
                <div className="mt-3 text-2xl font-semibold text-primary">0</div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 rounded-lg border border-border bg-background/50 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Recommended decision
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["Renew", "Renegotiate", "Exit"] as RenewalDecision[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDecision(item)}
                  aria-pressed={decision === item}
                  className={`h-9 rounded-md border text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:scale-[0.98] ${
                    decision === item
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-border bg-surface text-primary hover:border-indigo-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceFrame>
  );
}

function WorkspaceFrame({
  children,
  description,
  label,
  title,
  tone,
}: {
  children: ReactNode;
  description: string;
  label: string;
  title: string;
  tone: Tone;
}) {
  const styles = toneStyles[tone];

  return (
    <div className="surface-card overflow-hidden shadow-[0_30px_80px_-40px_rgba(11,18,32,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-primary">{title}</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">{description}</div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ring-1 ${styles.soft}`}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function SummaryLine({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-primary/75">
      <span className="text-emerald-600">{icon}</span>
      {label}
    </div>
  );
}

function Finding({
  details,
  expanded,
  icon,
  meta,
  onToggle,
  title,
}: {
  details: string;
  expanded: boolean;
  icon: ReactNode;
  meta: string;
  onToggle: () => void;
  title: string;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
      >
        {icon}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-primary">{title}</span>
          <span className="mt-0.5 block text-[10px] text-muted-foreground">{meta}</span>
        </span>
        <ArrowRight
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
        />
      </button>
      {expanded ? (
        <div className="bg-secondary/35 px-11 py-3 text-[10px] leading-relaxed text-muted-foreground">
          {details}
        </div>
      ) : null}
    </div>
  );
}

function MetricCard({ detail, label, value }: { detail: string; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-4">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-primary">{value}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">{detail}</div>
    </div>
  );
}

function TimelineItem({ icon, meta, title }: { icon: ReactNode; meta: string; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="truncate text-xs font-medium text-primary">{title}</div>
        <div className="mt-0.5 text-[10px] text-muted-foreground">{meta}</div>
      </div>
    </div>
  );
}
