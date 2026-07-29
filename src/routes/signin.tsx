import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { motion } from "motion/react";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — VendorXa" },
      { name: "description", content: "Sign in to your VendorXa workspace." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden lg:flex flex-col bg-primary text-primary-foreground p-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <Link
          to="/"
          className="relative text-primary-foreground [&_span]:text-white [&_svg]:text-white"
        >
          <Logo />
        </Link>
        <div className="relative mt-auto max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight text-balance leading-[1.05]">
            Sign in to your <span className="font-editorial text-accent">VendorXa</span> workspace.
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Vendor governance for procurement, legal, finance and security teams — unified in one
            intelligent platform.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/60">
            <span className="h-1 w-1 rounded-full bg-accent" /> EU-hosted · SOC 2 aligned · GDPR
            compliant
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-14 bg-dotted">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <h1 className="text-3xl font-semibold text-primary tracking-tight">Sign In</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Welcome back. Enter your details below.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Email">
              <input type="email" placeholder="you@company.com" className="input" />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-primary/70">
                <input type="checkbox" className="rounded border-border" /> Remember me
              </label>
              <a href="#" className="text-accent hover:text-accent/80">
                Forgot password?
              </a>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            New to VendorXa?{" "}
            <Link to="/request-demo" className="text-accent hover:text-accent/80 font-medium">
              Request a demo
            </Link>
          </div>
        </motion.div>
      </div>
      <style>{`
        .input {
          width: 100%; height: 44px; padding: 0 0.875rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem; background: var(--surface);
          color: var(--foreground); font-size: 0.875rem;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .input:focus { outline: none; border-color: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 20%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-primary">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
