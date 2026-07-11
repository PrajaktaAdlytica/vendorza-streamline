import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

const products = [
  { to: "/products/onboard", name: "VendorXa Onboard", desc: "Structured vendor onboarding" },
  { to: "/products/risk", name: "VendorXa Risk", desc: "Continuous third-party monitoring" },
  { to: "/products/renew", name: "VendorXa Renew", desc: "Renewal & contract lifecycle" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm">
          <NavLink to="/">Home</NavLink>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-primary/80 hover:text-primary transition-colors">
              Products <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full pt-2 w-[320px]">
                <div className="surface-card p-2 shadow-xl">
                  {products.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors"
                    >
                      <div className="text-sm font-medium text-primary">{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavAnchor href="/#solutions">Solutions</NavAnchor>
          <NavAnchor href="/#pricing">Pricing</NavAnchor>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ButtonLink to="/signin" variant="ghost" size="sm">Sign In</ButtonLink>
          <ButtonLink to="/request-demo" variant="primary" size="sm">Request Demo</ButtonLink>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 space-y-1">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            {products.map((p) => (
              <MobileLink key={p.to} to={p.to} onClick={() => setOpen(false)}>
                {p.name}
              </MobileLink>
            ))}
            <a href="/#solutions" onClick={() => setOpen(false)} className="block py-2.5 text-primary">Solutions</a>
            <a href="/#pricing" onClick={() => setOpen(false)} className="block py-2.5 text-primary">Pricing</a>
            <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
            <div className="pt-3 flex gap-2">
              <ButtonLink to="/signin" variant="outline" size="sm" className="flex-1">Sign In</ButtonLink>
              <ButtonLink to="/request-demo" variant="primary" size="sm" className="flex-1">Request Demo</ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md text-primary/80 hover:text-primary transition-colors"
      activeProps={{ className: "text-primary font-medium" }}
    >
      {children}
    </Link>
  );
}
function NavAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-3 py-2 rounded-md text-primary/80 hover:text-primary transition-colors">
      {children}
    </a>
  );
}
function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick} className="block py-2.5 text-primary">
      {children}
    </Link>
  );
}
