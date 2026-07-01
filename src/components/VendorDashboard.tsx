import { Search, Filter, Download, Plus } from "lucide-react";

type Status = "good" | "fair" | "poor" | "pending" | "approved" | "review" | "risk" | "active";

const badge: Record<Status, string> = {
  good: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  fair: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  review: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  poor: "bg-red-50 text-red-700 ring-1 ring-red-200",
  risk: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const rows = [
  { vendor: "TechWave Solutions", owner: "Anna Kowalska", sec: "good", fin: "approved", legal: "approved", date: "12 Jun 2026", risk: "Low", status: "active" },
  { vendor: "DataSecure Sp. z o.o.", owner: "Piotr Nowak", sec: "good", fin: "approved", legal: "approved", date: "28 Aug 2026", risk: "Low", status: "active" },
  { vendor: "CloudFlex LTD", owner: "Marta Wiśniewska", sec: "fair", fin: "pending", legal: "approved", date: "15 Jul 2026", risk: "Medium", status: "review" },
  { vendor: "LogiTrans S.A.", owner: "Jakub Zieliński", sec: "poor", fin: "pending", legal: "pending", date: "03 May 2026", risk: "High", status: "risk" },
  { vendor: "GreenPack Europe", owner: "Katarzyna Lewandowska", sec: "good", fin: "approved", legal: "approved", date: "21 Oct 2026", risk: "Low", status: "active" },
  { vendor: "Nordic Cyber AB", owner: "Erik Lindqvist", sec: "good", fin: "approved", legal: "approved", date: "06 Feb 2027", risk: "Low", status: "active" },
] as const;

export function VendorDashboard() {
  return (
    <div className="surface-card overflow-hidden shadow-[0_30px_80px_-40px_rgba(11,18,32,0.25)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 bg-surface">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              readOnly
              placeholder="Search vendors..."
              className="w-full h-9 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-primary placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <button className="h-9 px-3 rounded-md border border-border bg-background text-xs text-primary/80 hover:border-primary/30 transition-colors">
            All Vendors
          </button>
          <button className="h-9 px-3 rounded-md border border-border bg-background text-xs text-primary/80 hover:border-primary/30 inline-flex items-center gap-1.5">
            <Filter className="h-3 w-3" /> Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-md border border-border bg-background text-xs text-primary/80 hover:border-primary/30 inline-flex items-center gap-1.5">
            <Download className="h-3 w-3" /> Export
          </button>
          <button className="h-9 px-3 rounded-md bg-accent text-accent-foreground text-xs font-medium inline-flex items-center gap-1.5 hover:bg-accent/90">
            <Plus className="h-3 w-3" /> Add Vendor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              {["Vendor", "Owner", "Security", "Finance", "Legal", "Renewal", "Risk", "Status"].map((h) => (
                <th key={h} className="font-medium px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.vendor}
                className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/60 ${i % 2 ? "bg-background/40" : ""}`}
              >
                <td className="px-4 py-3.5 font-medium text-primary whitespace-nowrap">{r.vendor}</td>
                <td className="px-4 py-3.5 text-primary/70 whitespace-nowrap">{r.owner}</td>
                <td className="px-4 py-3.5"><Badge s={r.sec as Status} /></td>
                <td className="px-4 py-3.5"><Badge s={r.fin as Status} /></td>
                <td className="px-4 py-3.5"><Badge s={r.legal as Status} /></td>
                <td className="px-4 py-3.5 text-primary/70 whitespace-nowrap">{r.date}</td>
                <td className="px-4 py-3.5"><RiskChip risk={r.risk as "Low" | "Medium" | "High"} /></td>
                <td className="px-4 py-3.5"><Badge s={r.status as Status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ s }: { s: Status }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ${badge[s]}`}>
      {s}
    </span>
  );
}
function RiskChip({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const map = {
    Low: "text-emerald-700",
    Medium: "text-amber-700",
    High: "text-red-700",
  };
  const dot = { Low: "bg-emerald-500", Medium: "bg-amber-500", High: "bg-red-500" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${map[risk]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[risk]}`} /> {risk}
    </span>
  );
}
