import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Activity, TrendingUp, Leaf, Radar, Fingerprint } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";
import { motion } from "motion/react";

export const Route = createFileRoute("/products/risk")({
  head: () => ({
    meta: [
      { title: "Vendorza Risk — Continuous third-party monitoring" },
      { name: "description", content: "Continuously assess vendor risk across security, financial, ESG and compliance dimensions." },
      { property: "og:title", content: "Vendorza Risk — Continuous third-party monitoring" },
      { property: "og:description", content: "Continuously assess vendor risk across security, financial, ESG and compliance dimensions." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Risk"
      chip="bg-amber-500"
      accentText="text-amber-600"
      title="Third-party Risk."
      editorial="Continuous."
      description="Move beyond point-in-time assessments. Vendorza Risk continuously monitors your vendor ecosystem for security, financial, ESG and compliance signals."
      rightPanel={<RiskPanel />}
      features={[
        { icon: <ShieldAlert className="h-5 w-5" />, t: "Risk scoring", d: "Composite scores across security, financial, legal and ESG signals." },
        { icon: <Radar className="h-5 w-5" />, t: "Continuous monitoring", d: "Automated re-assessments and alerts when risk profiles change." },
        { icon: <Activity className="h-5 w-5" />, t: "Security posture", d: "Track questionnaires, controls and evidence in one live view." },
        { icon: <Leaf className="h-5 w-5" />, t: "ESG tracking", d: "Capture, verify and report ESG data against your framework of choice." },
        { icon: <TrendingUp className="h-5 w-5" />, t: "Financial health", d: "Ongoing insight into vendor financial stability and concentration." },
        { icon: <Fingerprint className="h-5 w-5" />, t: "Ownership visibility", d: "Beneficial ownership and sanctions screening built in." },
      ]}
      benefits={[
        "Detect risk changes before they become incidents",
        "Consolidate risk scoring across all vendors",
        "Meet regulator expectations for third-party oversight",
        "Reduce reliance on annual questionnaires",
        "Prioritise remediation with clear signals",
        "Report risk posture confidently to the board",
      ]}
      faq={[
        { q: "What data sources power the risk scores?", a: "Vendorza combines internal signals (questionnaires, contracts, incidents) with external monitoring feeds and financial data providers." },
        { q: "Can we bring our own risk framework?", a: "Yes — scoring weights, tiering and control libraries are configurable to match your existing methodology." },
        { q: "How are alerts delivered?", a: "In-app, email, Slack and via webhook — with severity thresholds you control per team." },
      ]}
    />
  ),
});

function RiskPanel() {
  const bars = [
    { l: "Security", v: 82, c: "bg-emerald-500" },
    { l: "Financial", v: 74, c: "bg-emerald-500" },
    { l: "Legal & Contract", v: 61, c: "bg-amber-500" },
    { l: "ESG", v: 48, c: "bg-amber-500" },
    { l: "Concentration", v: 91, c: "bg-emerald-500" },
  ];
  return (
    <div className="surface-card p-6 max-w-md ml-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">TechWave Solutions</div>
          <div className="mt-1 text-sm font-semibold text-primary">Risk Score</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold text-primary tracking-tight">72<span className="text-base text-muted-foreground">/100</span></div>
          <div className="text-[11px] font-medium text-amber-700">Moderate</div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {bars.map((b, i) => (
          <div key={b.l}>
            <div className="flex justify-between text-[11px] text-primary/70">
              <span>{b.l}</span><span className="tabular-nums">{b.v}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${b.v}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${b.c}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
