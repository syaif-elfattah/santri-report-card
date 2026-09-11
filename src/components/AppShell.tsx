import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  TriangleAlert,
  BookOpen,
  ScrollText,
  HandHeart,
  Stethoscope,
  Wallet,
  Send,
  Printer,
  MessageSquare,
  Settings,
  BarChart3,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  CalendarDays,
  BookMarked,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BULAN_LAPORAN } from "@/lib/mock";

const MAIN = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/pelanggaran", label: "Pelanggaran", icon: TriangleAlert },
  { to: "/halaqoh", label: "Absen Halaqoh & KBM", icon: BookOpen },
  { to: "/hafalan", label: "Hafalan Santri", icon: ScrollText },
  { to: "/ibadah", label: "Ibadah Santri", icon: HandHeart },
  { to: "/kesehatan", label: "Kesehatan Santri", icon: Stethoscope },
  { to: "/pembayaran", label: "Pembayaran", icon: Wallet },
  { to: "/laporan-wali", label: "Laporan Wali Santri", icon: Send },
  { to: "/template-cetak", label: "Template Cetak & Excel", icon: Printer },
  { to: "/masukan", label: "Masukan & Saran", icon: MessageSquare },
] as const;

const BANTUAN = [
  { to: "/panduan", label: "Panduan", icon: BookMarked },
  { to: "/akun", label: "Akun Saya", icon: UserCog },
] as const;

const ADMIN = [
  { to: "/admin/manajemen", label: "Manajemen", icon: Settings, dot: false },
  { to: "/admin/monitoring", label: "Monitoring Laporan", icon: BarChart3, dot: true },
] as const;

const ICON_TONE = [
  "bg-tone-1/15 text-tone-1",
  "bg-tone-2/15 text-tone-2",
  "bg-tone-3/15 text-tone-3",
  "bg-tone-4/18 text-tone-4",
  "bg-tone-5/15 text-tone-5",
  "bg-tone-6/15 text-tone-6",
] as const;

function toneFor(seed: string) {
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) n = (n + seed.charCodeAt(i)) % 6;
  return n;
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const item = (
    to: string,
    label: string,
    Icon: typeof Home,
    dot?: boolean,
  ) => {
    const active = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm transition-colors",
          active
            ? "gradient-primary font-medium text-primary-foreground shadow-[var(--shadow-lift)]"
            : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
        )}
      >
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg transition-colors",
            active ? "bg-primary-foreground/20 text-primary-foreground" : ICON_TONE[toneFor(label)],
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 truncate">{label}</span>
        {dot ? <span className="ml-auto size-2 shrink-0 rounded-full bg-destructive" /> : null}
      </Link>
    );
  };

  return (
    <nav className="space-y-1">
      {MAIN.map((m) => item(m.to, m.label, m.icon))}
      <div className="my-2 h-px bg-sidebar-border" />
      <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Admin
      </p>
      {ADMIN.map((m) => item(m.to, m.label, m.icon, m.dot))}
      <div className="my-2 h-px bg-sidebar-border" />
      <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Bantuan
      </p>
      {BANTUAN.map((m) => item(m.to, m.label, m.icon))}
    </nav>
  );
}

function UserFooter() {
  const [dark, setDark] = useState(false);
  const toggle = () => {
    setDark((v) => {
      document.documentElement.classList.toggle("dark", !v);
      return !v;
    });
  };
  return (
    <div className="mt-auto flex items-center gap-2 rounded-2xl glass-soft p-2">
      <div className="grid size-9 shrink-0 place-items-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
        HB
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium">Ust. Hasan Basri</p>
        <p className="text-[11px] text-muted-foreground">Musyrif</p>
      </div>
      <button
        onClick={toggle}
        aria-label="Ganti tema"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-card/70 text-muted-foreground hover:text-foreground"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <Link
        to="/login"
        aria-label="Keluar"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-card/70 text-muted-foreground hover:text-destructive"
      >
        <LogOut className="size-4" />
      </Link>
    </div>
  );
}

const QUICK = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/pelanggaran", label: "Pelanggaran", icon: TriangleAlert },
  { to: "/halaqoh", label: "Absen", icon: BookOpen },
  { to: "/laporan-wali", label: "Laporan", icon: Send },
] as const;

function BottomNav({ onMore }: { onMore: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-1 rounded-2xl p-1.5 lg:hidden">
      {QUICK.map((q) => {
        const active = pathname === q.to;
        return (
          <Link
            key={q.to}
            to={q.to}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors",
              active
                ? "gradient-primary text-primary-foreground"
                : cn("text-muted-foreground", ICON_TONE[toneFor(q.label)].split(" ")[1]),
            )}
          >
            <q.icon className="size-[18px]" />
            <span className="w-full truncate text-center">{q.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onMore}
        className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium text-muted-foreground"
      >
        <Menu className="size-[18px]" />
        <span>Menu</span>
      </button>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb -left-24 -top-24 size-[420px] bg-primary/25" />
        <div className="orb -right-32 top-56 size-[460px] bg-primary-glow/25" style={{ animationDelay: "-5s" }} />
        <div className="orb -bottom-40 left-1/3 size-[420px] bg-accent/50" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="relative mx-auto flex max-w-[1360px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        {/* Sidebar desktop */}
        <aside className="glass sticky top-6 hidden h-[calc(100vh-3rem)] w-[252px] shrink-0 flex-col rounded-3xl p-4 lg:flex">
          <Link to="/" className="mb-4 flex items-center gap-3 px-1">
            <div className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary font-display text-sm font-bold text-primary-foreground">
              RP
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold leading-tight">
                Rapor Pondok
              </p>
              <p className="text-[11px] text-muted-foreground">Ma'ahid Kudus</p>
            </div>
          </Link>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <NavList />
          </div>
          <UserFooter />
        </aside>

        {/* Drawer mobile */}
        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
            />
            <aside className="glass absolute inset-y-0 left-0 flex w-[280px] flex-col rounded-r-3xl p-4 animate-in slide-in-from-left">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary font-display text-sm font-bold text-primary-foreground">
                  RP
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] font-semibold leading-tight">
                    Rapor Pondok
                  </p>
                  <p className="text-[11px] text-muted-foreground">Ma'ahid Kudus</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Tutup"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-card/70"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <NavList onNavigate={() => setOpen(false)} />
              </div>
              <UserFooter />
            </aside>
          </div>
        ) : null}

        {/* Konten */}
        <main className="min-w-0 flex-1 space-y-4 pb-24 sm:space-y-5 lg:pb-0">
          <div className="glass sticky top-2 z-30 flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 lg:static">
            <button
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-card/70 lg:hidden"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold sm:text-base">
                Pondok Pesantren Ma'ahid Kudus
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Bulan laporan aktif: <span className="font-medium text-foreground">{BULAN_LAPORAN}</span>
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-medium text-warning-foreground ring-1 ring-warning/35 sm:inline-flex">
              <CalendarDays className="size-3.5" /> Masa wajar · sebelum tgl 15
            </span>
          </div>
          {children}
        </main>
      </div>

      {/* Navigasi bawah khusus HP */}
      <BottomNav onMore={() => setOpen(true)} />
    </div>
  );
}
