import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Check,
  ClipboardList,
  FileSearch,
  Pause,
  Play,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const TOUR_STEP_SECONDS = 12;

type TourStep = {
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  eyebrow: string;
  primary: string;
  secondary: string;
  rows: { label: string; value: string; state: "done" | "active" | "next" }[];
};

const tourSteps: TourStep[] = [
  {
    label: "Request",
    title: "Start with one structured vendor request.",
    description:
      "The requester provides the business need, owner, spend and data access so VendorXa can determine the right path.",
    icon: <ClipboardList className="h-5 w-5" />,
    eyebrow: "Vendor request",
    primary: "Cloud infrastructure",
    secondary: "Requested by Product Operations",
    rows: [
      { label: "Business owner", value: "Anna Kowalska", state: "done" },
      { label: "Estimated spend", value: "€84,000 / year", state: "done" },
      { label: "Data access", value: "Customer personal data", state: "active" },
    ],
  },
  {
    label: "Assess",
    title: "Adapt the assessment to the vendor’s exposure.",
    description:
      "Criticality, jurisdiction and data access determine which evidence and reviews are required—without a one-size-fits-all questionnaire.",
    icon: <FileSearch className="h-5 w-5" />,
    eyebrow: "Adaptive assessment",
    primary: "Important service",
    secondary: "Security, privacy, finance and legal",
    rows: [
      { label: "Security questionnaire", value: "Received", state: "done" },
      { label: "DPA & subprocessors", value: "In review", state: "active" },
      { label: "Financial assessment", value: "Queued", state: "next" },
    ],
  },
  {
    label: "Approve",
    title: "Bring every decision into one approval record.",
    description:
      "Reviewers see the same evidence, resolve conditions and leave a complete history of who approved what and why.",
    icon: <BadgeCheck className="h-5 w-5" />,
    eyebrow: "Decision workflow",
    primary: "3 of 4 approvals complete",
    secondary: "One condition remains",
    rows: [
      { label: "Security", value: "Approved", state: "done" },
      { label: "Legal", value: "Approved", state: "done" },
      { label: "Budget owner", value: "Awaiting decision", state: "active" },
    ],
  },
  {
    label: "Monitor",
    title: "Keep the vendor record current after approval.",
    description:
      "VendorXa watches material changes, expiring evidence and review cadence so static assessments become continuous oversight.",
    icon: <BellRing className="h-5 w-5" />,
    eyebrow: "Continuous monitoring",
    primary: "Risk score 72 / 100",
    secondary: "Two signals changed this month",
    rows: [
      { label: "Security posture", value: "Healthy", state: "done" },
      { label: "Financial stability", value: "Review required", state: "active" },
      { label: "ESG evidence", value: "Expires in 28 days", state: "next" },
    ],
  },
  {
    label: "Renew",
    title: "Make the renewal decision with full context.",
    description:
      "Contract terms, utilisation, commercial exposure and current risk arrive together before the notice window closes.",
    icon: <RefreshCcw className="h-5 w-5" />,
    eyebrow: "Renewal decision",
    primary: "14 days until notice deadline",
    secondary: "Recommended: Renegotiate",
    rows: [
      { label: "Annual spend", value: "€84,000", state: "done" },
      { label: "Savings opportunity", value: "€12,000", state: "active" },
      { label: "Open risk findings", value: "0", state: "done" },
    ],
  },
];

export function GuidedTour() {
  const [activeStep, setActiveStep] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(TOUR_STEP_SECONDS);
  const [playing, setPlaying] = useState(false);
  const step = tourSteps[activeStep];
  const elapsedSeconds = activeStep * TOUR_STEP_SECONDS + (TOUR_STEP_SECONDS - secondsRemaining);
  const progress = Math.min(100, (elapsedSeconds / (tourSteps.length * TOUR_STEP_SECONDS)) * 100);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing || secondsRemaining > 0) return;

    if (activeStep === tourSteps.length - 1) {
      setPlaying(false);
      setSecondsRemaining(TOUR_STEP_SECONDS);
      return;
    }

    setActiveStep((current) => current + 1);
    setSecondsRemaining(TOUR_STEP_SECONDS);
  }, [activeStep, playing, secondsRemaining]);

  function selectStep(index: number) {
    setActiveStep(index);
    setSecondsRemaining(TOUR_STEP_SECONDS);
  }

  function startOrPause() {
    if (!playing && activeStep === tourSteps.length - 1 && secondsRemaining === TOUR_STEP_SECONDS) {
      setActiveStep(0);
    }
    setPlaying((current) => !current);
  }

  function nextStep() {
    setActiveStep((current) => (current + 1) % tourSteps.length);
    setSecondsRemaining(TOUR_STEP_SECONDS);
  }

  return (
    <section id="tour" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          60-second product tour
        </div>
        <h2 className="mx-auto mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] text-primary sm:text-4xl lg:text-[44px]">
          Follow one vendor from{" "}
          <span className="font-editorial text-accent">request to renewal.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Five connected decisions, one complete vendor record.
        </p>
      </div>

      <div className="surface-card mt-10 overflow-hidden">
        <div className="border-b border-border bg-surface px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startOrPause}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3.5 text-xs font-medium text-accent-foreground transition-all hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98]"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? "Pause tour" : "Start tour"}
              </button>
              <span className="text-[10px] text-muted-foreground">
                Step {activeStep + 1} of {tourSteps.length} · 00:
                {String(secondsRemaining).padStart(2, "0")}
              </span>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3.5 text-xs font-medium text-primary transition-all hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98]"
            >
              Next step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr]">
          <div
            className="flex overflow-x-auto border-b border-border bg-background/40 p-3 lg:block lg:border-b-0 lg:border-r lg:p-4"
            role="tablist"
            aria-label="Vendor lifecycle tour steps"
          >
            {tourSteps.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="guided-tour-panel"
                onClick={() => selectStep(index)}
                className={`flex min-w-36 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 lg:min-w-0 lg:w-full ${
                  activeStep === index
                    ? "bg-surface text-primary shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:bg-surface hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                    index < activeStep
                      ? "bg-accent text-white"
                      : activeStep === index
                        ? "bg-accent-soft text-accent"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index < activeStep ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div id="guided-tour-panel" role="tabpanel" className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 md:p-8 lg:p-10" aria-live="polite">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                {step.icon}
              </span>
              <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {step.label}
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-primary">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 text-[10px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                Every action is added to the audit trail
              </div>
            </div>

            <div className="border-t border-border bg-background/45 p-5 md:border-l md:border-t-0 md:p-7">
              <div className="rounded-xl border border-border bg-surface shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {step.eyebrow}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-primary">
                      TechWave Solutions
                    </div>
                  </div>
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-medium text-accent">
                    Live record
                  </span>
                </div>
                <div className="p-4">
                  <div className="rounded-lg bg-primary p-4 text-primary-foreground">
                    <div className="text-lg font-semibold">{step.primary}</div>
                    <div className="mt-1 text-[10px] text-primary-foreground/65">
                      {step.secondary}
                    </div>
                  </div>
                  <div className="mt-3 divide-y divide-border rounded-lg border border-border">
                    {step.rows.map((row) => (
                      <div key={row.label} className="flex items-center gap-3 px-3 py-3">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                            row.state === "done"
                              ? "bg-emerald-50 text-emerald-600"
                              : row.state === "active"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {row.state === "done" ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : row.state === "active" ? (
                            <BellRing className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] text-muted-foreground">{row.label}</div>
                          <div className="mt-0.5 truncate text-xs font-medium text-primary">
                            {row.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
