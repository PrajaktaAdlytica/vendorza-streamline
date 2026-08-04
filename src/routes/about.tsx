import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { SectionHeader, Eyebrow } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { ButtonLink } from "@/components/Button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VendorXa" },
      {
        name: "description",
        content:
          "VendorXa is building the vendor governance layer for modern European organisations.",
      },
      { property: "og:title", content: "About — VendorXa" },
      {
        property: "og:description",
        content:
          "VendorXa is building the vendor governance layer for modern European organisations.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Shell>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16">
        <Eyebrow>About VendorXa</Eyebrow>
        <h1 className="mt-4 text-5xl lg:text-6xl font-semibold text-primary tracking-tight leading-[1.02] text-balance">
          Vendor governance, built for the way modern teams actually work.
        </h1>
        <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
          VendorXa was founded in Warsaw by a team of procurement, legal and security operators who
          spent years chasing vendor data across a dozen tools. We built the platform we always
          wished existed — one workspace where onboarding, risk and renewals finally live together.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/request-demo" variant="primary" size="lg">
            Request Demo <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink to="/products/onboard" variant="outline" size="lg">
            Explore Products
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="credibility-record-title" className="mx-auto max-w-7xl px-6 py-10">
        <div className="surface-card p-7 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow>Company record</Eyebrow>
              <h2
                id="credibility-record-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-primary"
              >
                Backed by Dlabs <span className="font-editorial text-accent">· $495K funding</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Announced <time dateTime="2026-01-28">Jan 28, 2026</time>
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              {[
                { label: "Dlabs portfolio", href: "https://d-labs-site.vercel.app/companies" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/vendorxa/" },
                { label: "Crunchbase", href: "https://www.crunchbase.com/organization/vendorxa" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-md text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Our mission",
              d: "Give every organisation a single, trustworthy source of truth for their vendor ecosystem.",
            },
            {
              t: "Where we're based",
              d: "Headquartered in Warsaw, with team members across Amsterdam and London serving customers across Europe.",
            },
            {
              t: "How we build",
              d: "Editorial software craftsmanship. Fewer, sharper features that our customers actually use every day.",
            },
          ].map((c) => (
            <div key={c.t} className="surface-card card-hover p-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                {c.t}
              </div>
              <p className="mt-3 text-[15px] text-primary/85 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Values"
          title="What we believe."
          description="A short list — the principles behind every design decision we make."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Clarity", d: "Governance software should reduce noise, not add to it." },
            { t: "Rigour", d: "Auditability is a feature, not an afterthought." },
            { t: "Craft", d: "Great software feels handcrafted — not templated." },
            { t: "Trust", d: "EU-hosted, SOC 2 aligned, GDPR compliant. Always." },
          ].map((v) => (
            <div key={v.t} className="surface-card card-hover p-6">
              <div className="text-sm font-semibold text-primary">{v.t}</div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </Shell>
  );
}
