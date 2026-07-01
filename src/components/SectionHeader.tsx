import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1 w-1 rounded-full bg-accent" />
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] font-semibold text-primary text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
