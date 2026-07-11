import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Bell, FileSignature, RefreshCcw, Users, Layers } from "lucide-react";
import { ProductPage } from "@/components/ProductPage";
import { motion } from "motion/react";

export const Route = createFileRoute("/products/renew")({
  head: () => ({
    meta: [
      { title: "VendorXa Renew — Contract renewal management" },
      { name: "description", content: "Stay ahead of every renewal with a proactive calendar, obligations tracking and approval scheduling." },
      { property: "og:title", content: "VendorXa Renew — Contract renewal management" },
      { property: "og:description", content: "Stay ahead of every renewal with a proactive calendar, obligations tracking and approval scheduling." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Renew"
      chip="bg-indigo-500"
      accentText="text-indigo-600"
      title="Contract Renewals."
      editorial="Effortless."
      description="Never miss a renewal, opt-out window or obligation. VendorXa Renew connects contract data, risk and finance into a single proactive calendar."
      rightPanel={<RenewTimeline />}
      features={[
        { icon: <CalendarClock className="h-5 w-5" />, t: "Renewal calendar", d: "A rolling 12-month view of every upcoming renewal and notice window." },
        { icon: <Bell className="h-5 w-5" />, t: "Smart reminders", d: "Alerts tuned to your notice periods, escalation paths and owners." },
        { icon: <FileSignature className="h-5 w-5" />, t: "Obligations tracking", d: "Track SLAs, deliverables and commercial commitments over time." },
        { icon: <RefreshCcw className="h-5 w-5" />, t: "Renewal automation", d: "Trigger reviews, questionnaires and approvals automatically." },
        { icon: <Users className="h-5 w-5" />, t: "Stakeholder alignment", d: "Owners, finance and legal collaborate in one shared workspace." },
        { icon: <Layers className="h-5 w-5" />, t: "Contract intelligence", d: "Extract key clauses, dates and terms across your portfolio." },
      ]}
      benefits={[
        "Prevent auto-renewals of unwanted contracts",
        "Recover budget with proactive renegotiations",
        "Align risk and finance ahead of every renewal",
        "Eliminate surprises with a shared calendar",
        "Standardise renewal decisions across teams",
        "Report on portfolio commitments with clarity",
      ]}
      faq={[
        { q: "Can VendorXa extract terms from our existing contracts?", a: "Yes — VendorXa uses AI-assisted extraction to surface key dates, obligations and clauses for review." },
        { q: "How early do we get renewal alerts?", a: "Alert cadences are configurable per vendor tier — many customers use 180/90/30-day cadences." },
        { q: "Does it integrate with our e-signature tool?", a: "Yes — VendorXa connects with the major e-signature and CLM systems to keep contract data in sync." },
      ]}
    />
  ),
});

function RenewTimeline() {
  const items = [
    { m: "Aug", d: "12", v: "TechWave Solutions", s: "Renew", tone: "text-emerald-600 bg-emerald-50 ring-emerald-200" },
    { m: "Sep", d: "03", v: "DataSecure Sp. z o.o.", s: "Review", tone: "text-amber-700 bg-amber-50 ring-amber-200" },
    { m: "Oct", d: "21", v: "GreenPack Europe", s: "Auto-renew", tone: "text-indigo-700 bg-indigo-50 ring-indigo-200" },
    { m: "Nov", d: "07", v: "Nordic Cyber AB", s: "Renegotiate", tone: "text-amber-700 bg-amber-50 ring-amber-200" },
  ];
  return (
    <div className="surface-card p-6 max-w-md ml-auto">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming Renewals</div>
      <div className="mt-4 space-y-2.5">
        {items.map((it, i) => (
          <motion.div
            key={it.v}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50"
          >
            <div className="flex flex-col items-center justify-center h-10 w-10 rounded-md bg-secondary text-primary">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{it.m}</span>
              <span className="text-sm font-semibold leading-none">{it.d}</span>
            </div>
            <div className="flex-1 text-sm font-medium text-primary">{it.v}</div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${it.tone}`}>{it.s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
