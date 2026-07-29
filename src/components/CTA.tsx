import { ButtonLink } from "./Button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="surface-card relative overflow-hidden p-10 md:p-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight text-balance">
              Ready to modernise your vendor governance?
            </h3>
            <p className="mt-4 text-[15px] text-muted-foreground max-w-md">
              See how VendorXa helps your teams onboard, assess and manage vendors across the entire
              lifecycle — with confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/request-demo" variant="primary" size="lg">
                Request Demo <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink to="/products/onboard" variant="outline" size="lg">
                Explore Products
              </ButtonLink>
            </div>
          </div>
          <div className="hidden md:block">
            <MiniPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniPreview() {
  return (
    <div className="relative">
      <div className="surface-card p-4 space-y-2">
        {["TechWave Solutions", "DataSecure Sp. z o.o.", "GreenPack Europe"].map((v, i) => (
          <div
            key={v}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/70 bg-background/50"
          >
            <div className="text-xs font-medium text-primary">{v}</div>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded ${i === 1 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
            >
              {i === 1 ? "Review" : "Active"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
