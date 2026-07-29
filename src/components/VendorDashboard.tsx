import { useMemo, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Status = "good" | "fair" | "poor" | "pending" | "approved" | "review" | "risk" | "active";
type Risk = "Low" | "Medium" | "High";
type VendorStatus = "active" | "review" | "risk";
type StatusFilter = "all" | VendorStatus;
type DetailTab = "overview" | "reviews" | "documents" | "activity";

type VendorRow = {
  vendor: string;
  owner: string;
  sec: Status;
  fin: Status;
  legal: Status;
  date: string;
  risk: Risk;
  status: VendorStatus;
};

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

const initialRows: VendorRow[] = [
  {
    vendor: "TechWave Solutions",
    owner: "Anna Kowalska",
    sec: "good",
    fin: "approved",
    legal: "approved",
    date: "12 Jun 2026",
    risk: "Low",
    status: "active",
  },
  {
    vendor: "DataSecure Sp. z o.o.",
    owner: "Piotr Nowak",
    sec: "good",
    fin: "approved",
    legal: "approved",
    date: "28 Aug 2026",
    risk: "Low",
    status: "active",
  },
  {
    vendor: "CloudFlex LTD",
    owner: "Marta Wiśniewska",
    sec: "fair",
    fin: "pending",
    legal: "approved",
    date: "15 Jul 2026",
    risk: "Medium",
    status: "review",
  },
  {
    vendor: "LogiTrans S.A.",
    owner: "Jakub Zieliński",
    sec: "poor",
    fin: "pending",
    legal: "pending",
    date: "03 May 2026",
    risk: "High",
    status: "risk",
  },
  {
    vendor: "GreenPack Europe",
    owner: "Katarzyna Lewandowska",
    sec: "good",
    fin: "approved",
    legal: "approved",
    date: "21 Oct 2026",
    risk: "Low",
    status: "active",
  },
  {
    vendor: "Nordic Cyber AB",
    owner: "Erik Lindqvist",
    sec: "good",
    fin: "approved",
    legal: "approved",
    date: "06 Feb 2027",
    risk: "Low",
    status: "active",
  },
];

const statusFilterLabels: Record<StatusFilter, string> = {
  all: "All Vendors",
  active: "Active",
  review: "In Review",
  risk: "At Risk",
};

const detailTabs: { value: DetailTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "reviews", label: "Reviews" },
  { value: "documents", label: "Documents" },
  { value: "activity", label: "Activity" },
];

export function VendorDashboard() {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [riskFilters, setRiskFilters] = useState<Risk[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<VendorRow | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const [addVendorOpen, setAddVendorOpen] = useState(false);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [row.vendor, row.owner, row.risk, row.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      const matchesRisk = riskFilters.length === 0 || riskFilters.includes(row.risk);

      return matchesQuery && matchesStatus && matchesRisk;
    });
  }, [query, riskFilters, rows, statusFilter]);

  const exportHref = useMemo(() => {
    const headings = [
      "Vendor",
      "Owner",
      "Security",
      "Finance",
      "Legal",
      "Renewal",
      "Risk",
      "Status",
    ];
    const values = filteredRows.map((row) => [
      row.vendor,
      row.owner,
      row.sec,
      row.fin,
      row.legal,
      row.date,
      row.risk,
      row.status,
    ]);
    const csv = [headings, ...values]
      .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  }, [filteredRows]);

  function toggleRiskFilter(risk: Risk) {
    setRiskFilters((current) =>
      current.includes(risk) ? current.filter((item) => item !== risk) : [...current, risk],
    );
  }

  function openVendor(row: VendorRow) {
    setDetailTab("overview");
    setSelectedVendor(row);
  }

  function addVendor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const risk = String(formData.get("risk")) as Risk;
    const newRow: VendorRow = {
      vendor: String(formData.get("vendor")),
      owner: String(formData.get("owner")),
      sec: risk === "High" ? "poor" : risk === "Medium" ? "fair" : "good",
      fin: "pending",
      legal: "pending",
      date: String(formData.get("renewal")),
      risk,
      status: risk === "High" ? "risk" : "review",
    };

    setRows((current) => [newRow, ...current]);
    setStatusFilter("all");
    setRiskFilters([]);
    setQuery("");
    setAddVendorOpen(false);
    form.reset();
  }

  return (
    <>
      <div className="surface-card overflow-hidden shadow-[0_30px_80px_-40px_rgba(11,18,32,0.25)]">
        {/* Toolbar */}
        <div className="flex flex-col items-stretch justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <div className="relative min-w-44 max-w-xs flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search vendors"
                placeholder="Search vendors..."
                className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-3 text-xs text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 rounded-md border border-border bg-background px-3 text-xs text-primary/80 transition-all hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98]">
                  {statusFilterLabels[statusFilter]}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuLabel>Vendor status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  <DropdownMenuRadioItem value="all">All Vendors</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="review">In Review</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="risk">At Risk</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs text-primary/80 transition-all hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98]">
                  <Filter className="h-3 w-3" /> Filters
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuLabel>Risk level</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(["Low", "Medium", "High"] as Risk[]).map((risk) => (
                  <DropdownMenuCheckboxItem
                    key={risk}
                    checked={riskFilters.includes(risk)}
                    onCheckedChange={() => toggleRiskFilter(risk)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {risk}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2">
            <a
              href={exportHref}
              download="vendorxa-vendors.csv"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs text-primary/80 transition-all hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98]"
            >
              <Download className="h-3 w-3" /> Export
            </a>
            <button
              type="button"
              onClick={() => setAddVendorOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-accent px-3 text-xs font-medium text-accent-foreground transition-all hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98]"
            >
              <Plus className="h-3 w-3" /> Add Vendor
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Vendor workspace table"
          tabIndex={0}
        >
          <table className="w-full min-w-[960px] text-xs">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                {[
                  "Vendor",
                  "Owner",
                  "Security",
                  "Finance",
                  "Legal",
                  "Renewal",
                  "Risk",
                  "Status",
                ].map((h) => (
                  <th key={h} className="font-medium px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, i) => (
                <tr
                  key={r.vendor}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/60 ${i % 2 ? "bg-background/40" : ""}`}
                >
                  <td className="px-4 py-3.5 font-medium text-primary whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => openVendor(r)}
                      className="appearance-none rounded-sm bg-transparent p-0 text-left font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                      {r.vendor}
                    </button>
                  </td>
                  <td className="px-4 py-3.5 text-primary/70 whitespace-nowrap">{r.owner}</td>
                  <td className="px-4 py-3.5">
                    <Badge s={r.sec} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge s={r.fin} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge s={r.legal} />
                  </td>
                  <td className="px-4 py-3.5 text-primary/70 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3.5">
                    <RiskChip risk={r.risk} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge s={r.status} />
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    No vendors match this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={selectedVendor !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedVendor(null);
        }}
      >
        {selectedVendor && (
          <DialogContent className="max-h-[90vh] w-[calc(100%_-_2rem)] max-w-3xl gap-0 overflow-y-auto p-0">
            <DialogHeader className="border-b border-border px-6 py-5 pr-12">
              <div className="flex flex-wrap items-center gap-3">
                <DialogTitle>{selectedVendor.vendor}</DialogTitle>
                <Badge s={selectedVendor.status} />
              </div>
              <DialogDescription>
                Owned by {selectedVendor.owner} · Renewal {selectedVendor.date}
              </DialogDescription>
            </DialogHeader>

            <div className="border-b border-border px-6">
              <div className="flex gap-6 overflow-x-auto">
                {detailTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setDetailTab(tab.value)}
                    className={`border-b-2 py-3 text-xs font-medium transition-colors ${
                      detailTab === tab.value
                        ? "border-accent text-primary"
                        : "border-transparent text-muted-foreground hover:text-primary"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-80 p-6">
              <VendorDetailPanel tab={detailTab} vendor={selectedVendor} />
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={addVendorOpen} onOpenChange={setAddVendorOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100%_-_2rem)] overflow-y-auto sm:max-w-lg">
          <form onSubmit={addVendor}>
            <DialogHeader>
              <DialogTitle>Add vendor</DialogTitle>
              <DialogDescription>
                Create a vendor record and route it into the review workflow.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormField label="Vendor name">
                <input
                  name="vendor"
                  required
                  placeholder="Acme Europe"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-primary outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                />
              </FormField>
              <FormField label="Owner">
                <input
                  name="owner"
                  required
                  placeholder="Marta Kowalska"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-primary outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                />
              </FormField>
              <FormField label="Renewal date">
                <input
                  name="renewal"
                  required
                  placeholder="18 Nov 2026"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-primary outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                />
              </FormField>
              <FormField label="Initial risk">
                <select
                  name="risk"
                  defaultValue="Low"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-primary outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </FormField>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={() => setAddVendorOpen(false)}
                className="h-10 rounded-md border border-border bg-background px-4 text-sm font-medium text-primary transition-all hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98]"
              >
                Add vendor
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function VendorDetailPanel({ tab, vendor }: { tab: DetailTab; vendor: VendorRow }) {
  if (tab === "reviews") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        <ReviewCard label="Security" status={vendor.sec} icon={ShieldCheck} />
        <ReviewCard label="Finance" status={vendor.fin} icon={CheckCircle2} />
        <ReviewCard label="Legal" status={vendor.legal} icon={FileText} />
      </div>
    );
  }

  if (tab === "documents") {
    const documents = [
      { name: "Security questionnaire", status: vendor.sec === "good" ? "Complete" : "In review" },
      { name: "Insurance certificate", status: "Complete" },
      {
        name: "MSA & data processing agreement",
        status: vendor.legal === "approved" ? "Complete" : "Pending",
      },
    ];

    return (
      <div className="divide-y divide-border rounded-lg border border-border">
        {documents.map((document) => (
          <div key={document.name} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate text-sm font-medium text-primary">{document.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{document.status}</span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "activity") {
    return (
      <div className="space-y-5">
        {[
          ["Security review updated", "Today, 09:42"],
          ["Finance approval requested", "Yesterday, 15:18"],
          ["Vendor documents received", "24 Jul 2026"],
          ["Vendor record created", "22 Jul 2026"],
        ].map(([event, time]) => (
          <div key={event} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div>
              <div className="text-sm font-medium text-primary">{event}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{time}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-border p-4">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Risk profile
        </div>
        <div className="mt-3 flex items-center justify-between">
          <RiskChip risk={vendor.risk} />
          <span className="text-xs text-muted-foreground">Continuously monitored</span>
        </div>
      </div>
      <div className="rounded-lg border border-border p-4">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Next renewal
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
          <Clock3 className="h-4 w-4 text-accent" />
          {vendor.date}
        </div>
      </div>
      <div className="rounded-lg border border-border p-4 sm:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Review progress
            </div>
            <div className="mt-1 text-sm text-primary">Security, finance and legal assessment</div>
          </div>
          <span className="text-sm font-semibold text-primary">
            {
              [vendor.sec, vendor.fin, vendor.legal].filter((status) =>
                ["good", "approved"].includes(status),
              ).length
            }
            /3
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{
              width: `${([vendor.sec, vendor.fin, vendor.legal].filter((status) => ["good", "approved"].includes(status)).length / 3) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  icon: Icon,
  label,
  status,
}: {
  icon: typeof ShieldCheck;
  label: string;
  status: Status;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <Icon className="h-5 w-5 text-accent" />
      <div className="mt-4 text-sm font-semibold text-primary">{label}</div>
      <div className="mt-2">
        <Badge s={status} />
      </div>
    </div>
  );
}

function FormField({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-primary">{label}</span>
      {children}
    </label>
  );
}

function Badge({ s }: { s: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ${badge[s]}`}
    >
      {s}
    </span>
  );
}
function RiskChip({ risk }: { risk: Risk }) {
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
