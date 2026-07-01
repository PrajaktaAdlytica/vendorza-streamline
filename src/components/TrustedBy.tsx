const logos = [
  "ORLEN", "Żabka", "Allegro", "Bank Polski", "PZU", "Deloitte", "ING", "KGHM", "EY", "Santander", "Play", "Lotos",
];

export function TrustedBy() {
  return (
    <section className="py-14 border-y border-border bg-dotted">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by leading organisations across Europe
        </p>
        <div className="mt-8 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-16 animate-marquee w-max">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="text-2xl font-semibold text-primary/40 hover:text-primary/70 transition-colors tracking-tight shrink-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
