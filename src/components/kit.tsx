import { useState, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BULAN_URUT = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** Geser bulan (panah kiri/kanan) — dipakai di modul rekap bulanan & laporan wali. */
export function MonthNav({ start, className }: { start: string; className?: string }) {
  const parts = start.split(" ");
  const [i, setI] = useState(Math.max(0, BULAN_URUT.indexOf(parts[0] ?? "")));
  const [tahun, setTahun] = useState(Number(parts[1] ?? new Date().getFullYear()));
  const geser = (d: number) => {
    let n = i + d;
    let t = tahun;
    if (n < 0) {
      n = 11;
      t -= 1;
    }
    if (n > 11) {
      n = 0;
      t += 1;
    }
    setI(n);
    setTahun(t);
  };
  const aktif = `${BULAN_URUT[i]} ${tahun}`;
  const sama = aktif === start;

  return (
    <div className={cn("glass-soft flex items-center gap-1 rounded-xl p-1", className)}>
      <button
        type="button"
        onClick={() => geser(-1)}
        aria-label="Bulan sebelumnya"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
      </button>
      <div className="min-w-0 flex-1 px-1 text-center">
        <p className="truncate text-sm font-medium">{aktif}</p>
        <p className="truncate text-[10px] text-muted-foreground">
          {sama ? "Bulan laporan aktif" : "Bulan lain — bisa dilihat & diedit"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => geser(1)}
        aria-label="Bulan berikutnya"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

/** Pengatur urutan baris santri: pegangan geser + tombol naik/turun. */
export function RowOrder({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <GripVertical className="size-4 cursor-grab opacity-60" aria-hidden />
      <span className="w-5 text-xs tabular-nums">{index + 1}</span>
      <div className="flex flex-col">
        <button
          type="button"
          aria-label="Naikkan urutan"
          className="grid size-4 place-items-center rounded hover:bg-secondary hover:text-foreground"
        >
          <ArrowUp className="size-3" />
        </button>
        <button
          type="button"
          aria-label="Turunkan urutan"
          className="grid size-4 place-items-center rounded hover:bg-secondary hover:text-foreground"
        >
          <ArrowDown className="size-3" />
        </button>
      </div>
    </div>
  );
}

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <section className={cn("glass rounded-3xl", className)}>{children}</section>;
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate font-display text-xl font-semibold sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-base font-semibold">{children}</h2>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

const toneClass = {
  primary: "bg-primary/12 text-primary ring-primary/25",
  success: "bg-success/15 text-success ring-success/30",
  warning: "bg-warning/18 text-warning-foreground ring-warning/40",
  danger: "bg-destructive/12 text-destructive ring-destructive/30",
  muted: "bg-muted text-muted-foreground ring-border",
} as const;

export function Badge({
  tone = "muted",
  children,
  className,
}: {
  tone?: keyof typeof toneClass;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const sev = {
  Ringan: "bg-sev-1/15 text-sev-1 ring-sev-1/30",
  Sedang: "bg-sev-2/18 text-sev-2 ring-sev-2/35",
  Berat: "bg-sev-3/18 text-sev-3 ring-sev-3/40",
  "Sangat Berat": "bg-sev-4 text-primary-foreground ring-sev-4 shadow-sm",
} as const;

export function SeverityBadge({ level }: { level: keyof typeof sev }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
        sev[level],
      )}
    >
      {level}
    </span>
  );
}

export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "hero" | "warning" | "wa";
  size?: "sm" | "md";
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    hero: "gradient-primary text-primary-foreground shadow-[var(--shadow-lift)] hover:opacity-95",
    outline: "glass-soft text-foreground hover:bg-card",
    ghost: "text-muted-foreground hover:bg-secondary",
    warning: "bg-warning text-warning-foreground hover:opacity-90",
    wa: "bg-success text-success-foreground hover:opacity-90",
  } as const;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all",
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const controlCls =
  "w-full rounded-xl glass-soft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50";

export function Select({
  options,
  className,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select className={cn(controlCls, "appearance-none", className)} {...rest}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlCls, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlCls, "min-h-24 resize-y", props.className)} />;
}

export function SearchInput({
  placeholder = "Cari nama santri…",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input placeholder={placeholder} className={cn(controlCls, "pl-9")} />
    </div>
  );
}

/** Dropdown yang bisa diketik — dipakai untuk memilih santri / musyrif. */
export function SearchableSelect({
  options,
  placeholder = "Ketik untuk mencari…",
  value,
  onChange,
}: {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(value ?? "");
  const list = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(controlCls, "flex items-center justify-between gap-2 text-left")}
      >
        <span className={cn("truncate", !selected && "text-muted-foreground")}>
          {selected || placeholder}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </button>
      {open ? (
        <div className="glass absolute z-30 mt-1 w-full rounded-xl p-1.5">
          <div className="relative mb-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik nama…"
              className="w-full rounded-lg bg-secondary/60 py-1.5 pl-8 pr-2 text-sm outline-none"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {list.length === 0 ? (
              <li className="px-2 py-2 text-sm text-muted-foreground">Tidak ditemukan</li>
            ) : (
              list.map((o) => (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(o);
                      onChange?.(o);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary"
                  >
                    <span className="truncate">{o}</span>
                    {selected === o ? <Check className="size-3.5 text-primary" /> : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="glass-soft inline-flex rounded-2xl p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
            active === t
              ? "gradient-primary text-primary-foreground shadow-[var(--shadow-lift)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function DateRangePresets({ presets }: { presets: string[] }) {
  const [active, setActive] = useState(presets[0]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {presets.map((p) => (
        <button
          key={p}
          onClick={() => setActive(p)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors",
            active === p
              ? "bg-primary/12 text-primary ring-primary/30"
              : "glass-soft text-muted-foreground ring-transparent hover:text-foreground",
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export function DataTable({
  head,
  children,
  className,
}: {
  head: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            {head}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">{children}</tbody>
      </table>
    </div>
  );
}

export function Th({
  children,
  align = "left",
  sortable,
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
  sortable?: boolean;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-3 py-2.5 font-semibold",
        align === "right" && "text-right",
        align === "center" && "text-center",
        sortable && "cursor-pointer select-none hover:text-foreground",
      )}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable ? <ChevronDown className="size-3 opacity-50" /> : null}
      </span>
    </th>
  );
}

export function Td({
  children,
  align = "left",
  className,
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      className={cn(
        "whitespace-nowrap px-3 py-2.5",
        align === "right" && "text-right tabular-nums",
        align === "center" && "text-center tabular-nums",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function NumCell({ value }: { value: number | null }) {
  return (
    <input
      defaultValue={value ?? ""}
      inputMode="numeric"
      className="w-16 rounded-lg glass-soft px-2 py-1 text-center text-sm tabular-nums outline-none focus:ring-2 focus:ring-ring/50"
    />
  );
}

export function Banner({
  tone = "warning",
  title,
  children,
  action,
}: {
  tone?: "warning" | "danger" | "success" | "primary";
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const tones = {
    warning: "bg-warning/12 ring-warning/35 text-warning-foreground",
    danger: "bg-destructive/10 ring-destructive/35 text-destructive",
    success: "bg-success/12 ring-success/30 text-success",
    primary: "bg-primary/10 ring-primary/25 text-primary",
  } as const;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1",
        tones[tone],
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {children ? <p className="mt-0.5 text-xs opacity-80">{children}</p> : null}
      </div>
      {action}
    </div>
  );
}

const TONE_TEXT = [
  "text-tone-1",
  "text-tone-2",
  "text-tone-3",
  "text-tone-4",
  "text-tone-5",
  "text-tone-6",
] as const;
const TONE_BAR = [
  "from-tone-1 to-tone-2",
  "from-tone-2 to-tone-3",
  "from-tone-3 to-tone-6",
  "from-tone-4 to-tone-5",
  "from-tone-5 to-tone-6",
  "from-tone-6 to-tone-1",
] as const;

/** Warna aksen stabil berdasarkan teks label — supaya tampilan berwarna-warni. */
export function toneIndex(seed: string) {
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) n = (n + seed.charCodeAt(i)) % 6;
  return n;
}

export function Stat({
  label,
  value,
  hint,
  hintTone = "muted",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  hintTone?: "muted" | "warning" | "success" | "danger";
}) {
  const tones = {
    muted: "text-muted-foreground",
    warning: "text-warning-foreground",
    success: "text-success",
    danger: "text-destructive",
  } as const;
  const t = toneIndex(label);
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-3 sm:p-4">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          TONE_BAR[t],
        )}
      />
      <p className="text-[11px] text-muted-foreground sm:text-xs">{label}</p>
      <p className={cn("mt-1 font-display text-2xl font-bold sm:text-3xl", TONE_TEXT[t])}>
        {value}
      </p>
      {hint ? <p className={cn("mt-1 text-[11px] sm:text-xs", tones[hintTone])}>{hint}</p> : null}
    </div>
  );
}
