import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { ButtonLink } from "./Button";
import { Eyebrow } from "./SectionHeader";
import { Reveal } from "./Motion";

const DLABS_PORTFOLIO_URL = "https://d-labs-site.vercel.app/companies";

export function FundingAnnouncement() {
  return (
    <section
      aria-labelledby="funding-announcement-title"
      className="mx-auto max-w-7xl px-6 py-20 md:py-24"
    >
      <Reveal>
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-border bg-secondary/55 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
              <Eyebrow>Funding announcement</Eyebrow>
              <div className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
                <time dateTime="2026-01-28">Jan 28, 2026</time>
              </div>
              <div className="mt-10 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Company record
                </p>
                <p className="mt-2 text-sm font-medium text-primary">Backed by Dlabs</p>
                <p className="mt-1 text-sm text-muted-foreground">$495K funding</p>
              </div>
            </div>

            <div className="p-7 sm:p-9 lg:p-12">
              <h2
                id="funding-announcement-title"
                className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-4xl lg:text-[46px]"
              >
                Vendorxa secures <span className="font-editorial text-accent">$495K</span> in
                funding from Dlabs.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Vendorxa is part of Dlabs’ global portfolio of companies building vendor risk for
                complex operating environments.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={DLABS_PORTFOLIO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="primary"
                  size="md"
                >
                  View Dlabs portfolio <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <Link
                  to="/news/funding-announcement"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  Read announcement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
