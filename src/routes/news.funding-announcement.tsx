import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import { Shell } from "@/components/Shell";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/SectionHeader";

const DLABS_PORTFOLIO_URL = "https://d-labs-site.vercel.app/companies";
const LINKEDIN_URL = "https://www.linkedin.com/company/vendorxa/";
const CRUNCHBASE_URL = "https://www.crunchbase.com/organization/vendorxa";
const TITLE = "Vendorxa secures $495K in funding from Dlabs.";
const DESCRIPTION =
  "Vendorxa is part of Dlabs’ global portfolio of companies building vendor risk for complex operating environments.";

export const Route = createFileRoute("/news/funding-announcement")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Vendorxa` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-01-28" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://vendorxa.com/news/funding-announcement" }],
  }),
  component: FundingArticle,
});

function FundingArticle() {
  return (
    <Shell>
      <article>
        <header className="mx-auto max-w-4xl px-6 pb-14 pt-16 sm:pt-20 lg:pb-20 lg:pt-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Vendorxa
          </Link>
          <div className="mt-12">
            <Eyebrow>Funding announcement</Eyebrow>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
              <time dateTime="2026-01-28">Jan 28, 2026</time>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-primary text-balance sm:text-5xl lg:text-6xl">
              Vendorxa secures <span className="font-editorial text-accent">$495K</span> in funding
              from Dlabs.
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              {DESCRIPTION}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 pb-20 lg:pb-28">
          <div className="surface-card p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Funding
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-primary">$495K</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Investor
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-primary">Dlabs</p>
              </div>
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <p className="max-w-2xl text-[15px] leading-relaxed text-primary/85">
                Vendorxa has secured $495K in funding from Dlabs.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href={DLABS_PORTFOLIO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="primary"
                  size="md"
                >
                  View Dlabs portfolio <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                {[
                  { label: "LinkedIn", href: LINKEDIN_URL },
                  { label: "Crunchbase", href: CRUNCHBASE_URL },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Shell>
  );
}
