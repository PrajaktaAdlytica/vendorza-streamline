import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-sm tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_20px_-10px_color-mix(in_oklab,var(--accent)_60%,transparent)]",
        secondary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-surface text-primary hover:border-primary/40 hover:bg-secondary",
        ghost:
          "text-primary hover:bg-secondary",
        link:
          "text-accent hover:text-accent/80 underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof buttonStyles> & { className?: string; children: ReactNode };

export const Button = forwardRef<HTMLButtonElement, BaseProps & ComponentPropsWithoutRef<"button">>(
  ({ variant, size, className, children, ...props }, ref) => (
    <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export function ButtonLink({
  to,
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: BaseProps & { to?: string; href?: string } & Record<string, unknown>) {
  const classes = cn(buttonStyles({ variant, size }), className);
  if (to) {
    return (
      <Link to={to} className={classes} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...(rest as Record<string, unknown>)}>
      {children}
    </a>
  );
}
