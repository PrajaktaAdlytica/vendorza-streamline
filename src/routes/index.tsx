import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Eye,
  Layers3,
  MousePointer2,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { Shell } from "@/components/Shell";
import { ButtonLink } from "@/components/Button";
import { HeroWorkflow } from "@/components/HeroWorkflow";
import { TrustedBy } from "@/components/TrustedBy";
import { DisconnectedDocs } from "@/components/DisconnectedDocs";
import { VendorDashboard } from "@/components/VendorDashboard";
import { SectionHeader, Eyebrow } from "@/components/SectionHeader";
import { CountUp, Reveal } from "@/components/Motion";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { RoleSolutions } from "@/components/RoleSolutions";
import { GuidedTour } from "@/components/GuidedTour";
import { CinematicIntro } from "@/components/CinematicIntro";
import { FundingAnnouncement } from "@/components/FundingAnnouncement";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VendorXa — Vendor Lifecycle Governance. Finally in One Place." },
      {
        name: "description",
        content:
          "Centralise vendor onboarding, third-party risk and contract renewals into one intelligent workspace.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [introActive, setIntroActive] = useState(true);

  return (
    <>
      <CinematicIntro onDismissed={() => setIntroActive(false)} />
      <div
        id="vendorxa-site"
        tabIndex={-1}
        aria-hidden={introActive || undefined}
        inert={introActive || undefined}
      >
        <Shell>
          {/* HERO */}
          <section className="relative">
            <div className="mx-auto max-w-7xl px-6 pt-14 md:pt-20 pb-20 md:pb-28 min-h-[82vh] flex items-center">
              <div className="grid lg:grid-cols-2 gap-14 items-center w-full">
                <div>
                  <Eyebrow>Vendor Lifecycle Platform</Eyebrow>
                  <h1 className="mt-4 text-[44px] sm:text-6xl lg:text-[72px] leading-[0.98] font-semibold text-primary tracking-tight text-balance">
                    Vendor Lifecycle Governance.
                    <br />
                    Finally in <span className="font-editorial text-accent">One Place.</span>
                  </h1>
                  <p className="mt-6 max-w-lg text-[17px] text-muted-foreground leading-relaxed">
                    VendorXa centralises onboarding, vendor risk and contract renewals into one
                    intelligent workspace for modern organisations.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink to="/request-demo" variant="primary" size="lg">
                      Request Demo <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                    <ButtonLink href="#platform" variant="outline" size="lg">
                      View Platform
                    </ButtonLink>
                  </div>
                  <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" /> SOC 2 ready
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" /> GDPR compliant
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" /> EU-hosted
                    </div>
                  </div>
                </div>
                <div>
                  <HeroWorkflow />
                </div>
              </div>
            </div>
          </section>

          <TrustedBy />

          <FundingAnnouncement />

          {/* PROBLEM */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <Eyebrow>The Challenge</Eyebrow>
                <h2 className="mt-3 text-4xl lg:text-5xl font-semibold text-primary tracking-tight text-balance leading-[1.05]">
                  Vendor data lives everywhere. Work gets stuck.
                </h2>
                <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                  Contracts, security reviews, ESG documents and financial assessments are scattered
                  across email, spreadsheets and disconnected tools — leaving teams without
                  visibility and vendors without answers.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-primary/80">
                  {[
                    "Onboarding takes weeks — not hours",
                    "Renewals slip through the cracks",
                    "Risk assessments live in personal inboxes",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <DisconnectedDocs />
            </div>
          </section>

          {/* SOLUTION / PRODUCTS — colourful cards */}
          <section id="products" className="mx-auto max-w-7xl px-6 py-24">
            <SectionHeader
              eyebrow="Our Products"
              title={
                <>
                  Three products.{" "}
                  <span className="font-editorial text-accent">One connected platform.</span>
                </>
              }
              description="A modular suite covering the full vendor lifecycle — from first intake to renewal, with continuous monitoring in between."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <ProductCard
                tone="emerald"
                eyebrow="Onboard"
                title="VendorXa Onboard"
                desc="Accelerate vendor onboarding with structured workflows and automation."
                bullets={[
                  "Intelligent intake forms",
                  "Document collection",
                  "Multi-team approvals",
                  "Automated workflows",
                ]}
                to="/products/onboard"
                cta="Explore Onboard"
              />
              <ProductCard
                tone="amber"
                eyebrow="Risk"
                title="VendorXa Risk"
                desc="Continuously assess vendor risk and strengthen your third-party ecosystem."
                bullets={[
                  "Risk scoring",
                  "Security monitoring",
                  "Compliance tracking",
                  "ESG & financial insights",
                ]}
                to="/products/risk"
                cta="Explore Risk"
              />
              <ProductCard
                tone="indigo"
                eyebrow="Renew"
                title="VendorXa Renew"
                desc="Never miss a renewal. Stay ahead of contracts and commitments."
                bullets={[
                  "Renewal calendar",
                  "Obligations tracking",
                  "Approval scheduling",
                  "Renewal automation",
                ]}
                to="/products/renew"
                cta="Explore Renew"
              />
            </div>
          </section>

          {/* PLATFORM */}
          <section id="platform" className="mx-auto max-w-7xl px-6 py-24">
            <SectionHeader
              eyebrow="The Platform"
              title={
                <>
                  One workspace for complete{" "}
                  <span className="font-editorial text-accent">vendor visibility.</span>
                </>
              }
              description="Every vendor. Every status. Every renewal. In one always-current view your teams can trust."
            />
            <div className="mt-9 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted-foreground shadow-sm">
                <MousePointer2 className="h-3.5 w-3.5 text-accent" />
                Interactive preview — search, filter, add or open any vendor
              </div>
            </div>
            <div className="mt-4">
              <Reveal>
                <VendorDashboard />
              </Reveal>
            </div>
          </section>

          <RoleSolutions />

          <GuidedTour />

          {/* BENEFITS */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <SectionHeader eyebrow="Why VendorXa" title="Built for modern governance teams." />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  icon: TrendingDown,
                  t: "Faster Onboarding",
                  d: "Reduce onboarding time by up to 60% with structured workflows.",
                },
                {
                  icon: ShieldCheck,
                  t: "Lower Risk",
                  d: "Continuously monitor risk and ensure ongoing compliance.",
                },
                {
                  icon: Eye,
                  t: "Complete Visibility",
                  d: "One source of truth across security, finance, legal and procurement.",
                },
                {
                  icon: ClipboardCheck,
                  t: "Stronger Compliance",
                  d: "Stay audit-ready with centralised documents and approvals.",
                },
                {
                  icon: Layers3,
                  t: "Scalable Platform",
                  d: "Enterprise-grade security and scalability for every organisation.",
                },
              ].map((b) => (
                <div key={b.t} className="surface-card card-hover p-6">
                  <div className="h-10 w-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-primary">{b.t}</div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{b.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
            <SectionHeader
              eyebrow="Pricing"
              title="Simple, transparent pricing."
              description="Choose the plan that fits your team today — scale as your programme grows."
            />
            <div className="mt-14">
              <Pricing />
            </div>
          </section>

          {/* STATISTICS */}
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="surface-card p-10 md:p-14">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
                Trusted by our customers
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { n: 250, s: "+", l: "Organisations" },
                  { n: 35, s: "k+", l: "Vendors managed" },
                  { n: 60, s: "%", l: "Faster onboarding" },
                  { n: 98, s: "%", l: "Customer satisfaction" },
                ].map((k) => (
                  <div key={k.l}>
                    <div className="text-4xl md:text-5xl font-semibold text-primary tracking-tight">
                      <CountUp to={k.n} suffix={k.s} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{k.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="mx-auto max-w-7xl px-6 pb-24">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  q: "VendorXa transformed the way we manage third-party risk. Our teams save hours every week and we have full visibility across the entire vendor lifecycle.",
                  n: "Agnieszka Nowak",
                  r: "Head of Procurement",
                  c: "Enterprise Retail",
                },
                {
                  q: "The onboarding module alone cut our new-vendor cycle from three weeks to four days. It quietly became the backbone of our governance programme.",
                  n: "Marek Zawadzki",
                  r: "CISO",
                  c: "Financial Services",
                },
                {
                  q: "Renewals used to be firefighting. With VendorXa Renew, we're planning ahead — with contract, risk and finance context in one view.",
                  n: "Julia Bergström",
                  r: "Head of Legal Operations",
                  c: "Manufacturing",
                },
              ].map((t) => (
                <div key={t.n} className="surface-card card-hover p-7 flex flex-col">
                  <div className="text-accent text-4xl leading-none font-editorial">"</div>
                  <p className="mt-2 text-[15px] text-primary/90 leading-relaxed flex-1">{t.q}</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-sm font-semibold text-primary">{t.n}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.r} · {t.c}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader eyebrow="FAQ" title="Frequently asked questions." />
            <div className="mt-12">
              <FAQ
                items={[
                  {
                    q: "What is VendorXa?",
                    a: "VendorXa is a vendor lifecycle management platform that unifies onboarding, third-party risk monitoring and renewal management for procurement, legal, finance and security teams.",
                  },
                  {
                    q: "Who is VendorXa for?",
                    a: "Mid-market and enterprise organisations in Europe that need consistent, auditable vendor governance across multiple business functions.",
                  },
                  {
                    q: "How does pricing work?",
                    a: "We offer four plans — Essentials, Professional, Business and Enterprise — priced per active vendor with annual billing and no per-seat fees.",
                  },
                  {
                    q: "Is my data secure?",
                    a: "Yes. VendorXa is EU-hosted with encryption at rest and in transit, role-based access control, SSO, audit logs and SOC 2 aligned controls.",
                  },
                  {
                    q: "Can VendorXa integrate with our existing tools?",
                    a: "Yes — VendorXa integrates with common ERP, procurement, SSO/IdP and document systems, with an API and webhook layer for custom workflows.",
                  },
                ]}
              />
            </div>
          </section>

          <CTA />
        </Shell>
      </div>
    </>
  );
}

function ProductCard({
  tone,
  eyebrow,
  title,
  desc,
  bullets,
  to,
  cta,
}: {
  tone: "emerald" | "amber" | "indigo";
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  to: string;
  cta: string;
}) {
  const tones = {
    emerald: {
      chip: "bg-emerald-500 text-white",
      ring: "before:from-emerald-400/40",
      text: "text-emerald-700",
      check: "text-emerald-500",
    },
    amber: {
      chip: "bg-amber-500 text-white",
      ring: "before:from-amber-400/40",
      text: "text-amber-700",
      check: "text-amber-500",
    },
    indigo: {
      chip: "bg-indigo-500 text-white",
      ring: "before:from-indigo-400/40",
      text: "text-indigo-700",
      check: "text-indigo-500",
    },
  }[tone];
  return (
    <div className="surface-card card-hover p-7 relative overflow-hidden flex flex-col">
      <div className={`absolute inset-x-0 top-0 h-1 ${tones.chip.split(" ")[0]}`} />
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tones.chip}`}
        >
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-primary tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <ul className="mt-5 space-y-2 text-sm text-primary/80 flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tones.check}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <ButtonLink to={to} variant="link" size="sm" className={`mt-6 ${tones.text} self-start`}>
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </ButtonLink>
    </div>
  );
}
