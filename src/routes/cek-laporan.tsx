import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowLeft, Printer } from "lucide-react";
import { Badge, Button, Field, GlassCard, Input, SectionTitle, Select } from "@/components/kit";

export const Route = createFileRoute("/cek-laporan")({
  head: () => ({
    meta: [
      { title: "Cek Laporan Anak — Rapor Pondok Ma'ahid Kudus" },
      {
        name: "description",
        content:
          "Wali santri dapat melihat rapor bulanan anaknya dengan memasukkan nomor WhatsApp yang terdaftar di pondok.",
      },
      { property: "og:title", content: "Cek Laporan Anak — Rapor Pondok" },
      {
        property: "og:description",
        content: "Lihat rapor bulanan anak dengan nomor WhatsApp terdaftar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CekLaporan,
});

const RINCIAN: [string, string][] = [
  ["Hafalan", "Al-Mulk ayat 30 (Juz 29)"],
  ["Halaqoh & KBM", "Sakit 1 · Izin 0 · Alpa 0"],
  ["Ibadah", "Tahajjud 18 · Dhuha 20 · Qobliyah 22 · Puasa 4"],
  ["Kesehatan", "Luka di kaki (11/08) — dibersihkan & diperban"],
  ["Pelanggaran", "Tidak mengikuti halaqoh subuh 3 kali (Sedang)"],
  ["Pembayaran", "Tunggakan Rp750.000 (SPP Des–Feb & ujian)"],
];

function CekLaporan() {
  const [tampil, setTampil] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="orb -left-20 -top-24 size-[400px] bg-primary/25" />
        <div className="orb -right-24 bottom-10 size-[420px] bg-accent/50" style={{ animationDelay: "-7s" }} />
      </div>

      <div className="relative mx-auto max-w-2xl space-y-5">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Kembali ke halaman masuk
        </Link>

        <GlassCard className="p-6">
          <h1 className="font-display text-2xl font-bold">Cek Laporan Anak</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Masukkan nomor WhatsApp yang terdaftar di pondok, lalu pilih bulan laporan.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_170px]">
            <Field label="Nomor WhatsApp wali">
              <Input placeholder="08xxxxxxxxxx" defaultValue="081234567801" />
            </Field>
            <Field label="Bulan laporan">
              <Select options={["Agustus 2025", "Juli 2025", "Juni 2025"]} />
            </Field>
          </div>
          <Button variant="hero" className="mt-4 w-full" onClick={() => setTampil(true)}>
            <Search className="size-4" /> Lihat laporan
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Hanya bulan yang sudah dipublikasikan pondok yang dapat dilihat.
          </p>
        </GlassCard>

        {tampil ? (
          <GlassCard className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <SectionTitle hint="Agustus 2025">Rapor Abdullah Fauzi</SectionTitle>
                <p className="-mt-2 text-sm text-muted-foreground">
                  MA X-A · Musyrif: Ust. Hasan Basri
                </p>
              </div>
              <Button size="sm" variant="outline">
                <Printer className="size-3.5" /> Cetak
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {RINCIAN.map(([k, v]) => (
                <div key={k} className="glass-soft rounded-2xl px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</p>
                  <p className="mt-0.5 text-sm">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="success">Data lengkap</Badge>
              <Badge tone="muted">Dipublikasikan 5 September 2025</Badge>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-6 text-center text-sm text-muted-foreground">
            Laporan akan muncul di sini setelah nomor WhatsApp dicocokkan.
          </GlassCard>
        )}
      </div>
    </div>
  );
}
