import { createFileRoute } from "@tanstack/react-router";
import { FileText, Users, Zap, ClipboardList, Workflow, FolderCheck } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/products/onboard")({
  head: () => ({
    meta: [
      { title: "VendorXa Onboard — Structured vendor onboarding" },
      { name: "description", content: "Accelerate vendor onboarding with intelligent intake, document collection and multi-team approvals." },
      { property: "og:title", content: "VendorXa Onboard — Structured vendor onboarding" },
      { property: "og:description", content: "Accelerate vendor onboarding with intelligent intake, document collection and multi-team approvals." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Onboard"
      chip="bg-emerald-500"
      accentText="text-emerald-600"
      title="Vendor Onboarding."
      editorial="Structured."
      description="Replace scattered intake forms and email chains with intelligent, auditable workflows. VendorXa Onboard collects the right documents, from the right vendor, at the right time."
      rightPanel={<OnboardChecklist />}
      features={[
        { icon: <ClipboardList className="h-5 w-5" />, t: "Intelligent intake", d: "Dynamic forms that adapt to vendor type, tier and jurisdiction." },
        { icon: <FolderCheck className="h-5 w-5" />, t: "Document collection", d: "Central document requests with reminders and versioning." },
        { icon: <Users className="h-5 w-5" />, t: "Multi-team approvals", d: "Security, legal and finance sign off in one coordinated workflow." },
        { icon: <Workflow className="h-5 w-5" />, t: "Workflow automation", d: "No-code rules route work automatically based on risk and geography." },
        { icon: <FileText className="h-5 w-5" />, t: "Full audit trail", d: "Every action, every approval, every document — captured forever." },
        { icon: <Zap className="h-5 w-5" />, t: "Vendor self-service", d: "A polished vendor portal keeps them moving without extra emails." },
      ]}
      benefits={[
        "Cut onboarding cycle time by up to 60%",
        "Standardise intake across all business units",
        "Eliminate spreadsheet-based tracking",
        "Reduce compliance risk from missing documents",
        "Give vendors a first-class experience",
        "Free procurement teams from admin work",
      ]}
      faq={[
        { q: "How long does onboarding typically take?", a: "Most customers reduce onboarding cycles from weeks to under a week — often to just a few days for lower-risk vendors." },
        { q: "Can we customise our intake forms?", a: "Yes — form logic, required fields and document requests are fully configurable per vendor category." },
        { q: "Do vendors need an account?", a: "Vendors receive a secure link to a lightweight portal — no account or licence required." },
      ]}
    />
  ),
});

function OnboardChecklist() {
  const items = [
    "Company profile",
    "Beneficial ownership",
    "Security questionnaire",
    "Insurance certificate",
    "Contract signature",
  ];
  return (
    <div className="surface-card p-6 max-w-md ml-auto">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor Checklist</div>
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded-full px-2 py-0.5">In Progress</span>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((it, i) => (
          <motion.div
            key={it}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border bg-background/50"
          >
            <span className={`h-5 w-5 rounded-md flex items-center justify-center ${i < 3 ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"}`}>
              {i < 3 && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className={`text-sm ${i < 3 ? "text-primary/60 line-through" : "text-primary"}`}>{it}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
