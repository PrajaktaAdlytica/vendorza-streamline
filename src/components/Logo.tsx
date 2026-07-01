export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 256 256" className="h-7 w-7" aria-hidden>
        <path d="M20 20H76L132 152L104 216L20 20Z" fill="currentColor" />
        <path d="M236 20H180L124 152L152 216L236 20Z" className="text-accent" fill="currentColor" />
        <path d="M104 216H152L128 264L104 216Z" fill="currentColor" />
      </svg>
      <span className="text-[1.25rem] font-semibold tracking-tight text-primary">
        Vendorza
      </span>
    </div>
  );
}
