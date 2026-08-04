import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Linkedin } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      { label: "VendorXa Onboard", to: "/products/onboard" },
      { label: "VendorXa Risk", to: "/products/risk" },
      { label: "VendorXa Renew", to: "/products/renew" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Procurement", href: "/#solutions" },
      { label: "Legal", href: "/#solutions" },
      { label: "Finance", href: "/#solutions" },
      { label: "Security", href: "/#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Funding announcement", to: "/news/funding-announcement" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Processing", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-dotted border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Vendor governance for procurement, legal, finance and security teams across Europe.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="https://www.linkedin.com/company/vendorxa/"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg border border-border hover:border-accent/60 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) =>
                  "to" in l ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-primary/80 hover:text-accent transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-primary/80 hover:text-accent transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 VendorXa sp. z o.o. — vendorxa.com</div>
          <div>Warsaw · Amsterdam · London</div>
        </div>
      </div>
    </footer>
  );
}
