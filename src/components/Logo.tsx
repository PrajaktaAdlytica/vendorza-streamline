export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 44 44" className="h-8 w-8 shrink-0" aria-hidden>
        <rect x="3" y="3" width="38" height="38" rx="10" fill="#0B1220" />
        <path
          d="M13 13.75C13 12.78 13.78 12 14.75 12H24.25C25.22 12 26 12.78 26 13.75V23.25C26 24.22 25.22 25 24.25 25H14.75C13.78 25 13 24.22 13 23.25V13.75Z"
          fill="#F8FAFC"
        />
        <path
          d="M18 20.75C18 19.78 18.78 19 19.75 19H29.25C30.22 19 31 19.78 31 20.75V30.25C31 31.22 30.22 32 29.25 32H19.75C18.78 32 18 31.22 18 30.25V20.75Z"
          fill="#14B8A6"
        />
        <path
          d="M14.5 14.5L29.5 29.5M29.5 14.5L14.5 29.5"
          stroke="#0B1220"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M13.9 14.1L20.8 21M30.1 29.9L23.2 23"
          stroke="#F8FAFC"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <circle cx="14.5" cy="14.5" r="2.6" fill="#F8FAFC" stroke="#0B1220" strokeWidth="1.5" />
        <circle cx="29.5" cy="14.5" r="2.6" fill="#F8FAFC" stroke="#0B1220" strokeWidth="1.5" />
        <circle cx="14.5" cy="29.5" r="2.6" fill="#F8FAFC" stroke="#0B1220" strokeWidth="1.5" />
        <circle cx="29.5" cy="29.5" r="2.6" fill="#14B8A6" stroke="#0B1220" strokeWidth="1.5" />
      </svg>
      <span className="text-[1.25rem] font-semibold tracking-tight text-primary">VendorXa</span>
    </div>
  );
}
