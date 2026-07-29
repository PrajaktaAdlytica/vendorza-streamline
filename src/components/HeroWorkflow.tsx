import { motion } from "motion/react";
import { Check, FileText, ShieldCheck, Scale, Wallet, BadgeCheck } from "lucide-react";

const steps = [
  { icon: FileText, label: "New Vendor", sub: "Information collected", state: "current" as const },
  { icon: ShieldCheck, label: "Security Review", sub: "Completed", state: "done" as const },
  { icon: Scale, label: "Legal Review", sub: "Completed", state: "done" as const },
  { icon: Wallet, label: "Finance Approval", sub: "Completed", state: "done" as const },
  {
    icon: BadgeCheck,
    label: "Vendor Approved",
    sub: "Onboarding complete",
    state: "final" as const,
  },
];

export function HeroWorkflow() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-6 rounded-3xl bg-accent/5 blur-3xl -z-10" />
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.label} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`surface-card card-hover flex items-center gap-3 p-3.5 pr-4 ${
                s.state === "final"
                  ? "ring-1 ring-accent/50 shadow-[0_20px_60px_-25px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                  : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  s.state === "done"
                    ? "bg-accent-soft text-accent"
                    : s.state === "final"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-primary"
                }`}
              >
                {s.state === "done" || s.state === "final" ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.55 + i * 0.35,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </motion.span>
                ) : (
                  <s.icon className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-primary">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
              {s.state === "done" && (
                <span className="text-[10px] font-medium uppercase tracking-wider text-success/80">
                  Complete
                </span>
              )}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="ml-9 h-4 flex justify-start">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.3 }}
                  style={{ transformOrigin: "top" }}
                  className="w-px h-4 bg-border"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
