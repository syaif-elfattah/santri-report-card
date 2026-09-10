import { createFileRoute } from "@tanstack/react-router";
import { Printer, FileSpreadsheet, Download } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Button,
  DateRangePresets,
  Field,
  GlassCard,
  PageHeader,
  SectionTitle,
  Select,
} from "@/components/kit";
import { KELAS, PRESET_TANGGAL } from "@/lib/mock";

export const Route = createFileRoute("/template-cetak")({
  head: () => ({
    meta: [
      { title: "Template Cetak & Excel — Rapor Pondok" },
      {
        name: "description",
        content:
          "Cetak rekap santri atau unduh berkas Excel per kategori: pelanggaran, halaqoh, hafalan, ibadah, kesehatan, dan pembayaran.",
      },
      { property: "og:title", content: "Template Cetak & Excel — Rapor Pondok" },
      {
        property: "og:description",
        content: "Cetak rekap santri dan unduh berkas Excel per kategori.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateCetak,
});

const TEMPLATES = [
  { nama: "Rekap Pelanggaran", desc: "Daftar pelanggaran per santri beserta kategori." },
  { nama: "Rekap Halaqoh & KBM", desc: "Jumlah sakit, izin, dan alpa per bulan." },
  { nama: "Rekap Hafalan", desc: "Capaian surat, ayat, dan juz." },
  { nama: "Rekap Ibadah", desc: "Tahajjud, dhuha, puasa, jamaah." },
  { nama: "Rekap Kesehatan", desc: "Riwayat sakit dan penanganan." },
  { nama: "Rekap Pembayaran", desc: "Tunggakan dan SPP dua belas bulan." },
  { nama: "Rapor Lengkap per Santri", desc: "Semua kategori dalam satu lembar." },
  { nama: "Daftar Hadir Kosong", desc: "Lembar kosong untuk pencatatan manual." },
];

function TemplateCetak() {
  return (
    <AppShell>
      <PageHeader
        title="Template Cetak & Excel"
        subtitle="Pilih rentang waktu dan kelas, lalu cetak atau unduh"
      />

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle>Penyaring data</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Kelas">
            <Select options={["Semua kelas", ...KELAS]} />
          </Field>
          <Field label="Tahun ajaran">
            <Select options={["2025/2026", "2024/2025"]} />
          </Field>
          <Field label="Format">
            <Select options={["PDF (cetak)", "Excel (.xlsx)"]} />
          </Field>
        </div>
        <div className="mt-4">
          <DateRangePresets presets={PRESET_TANGGAL} />
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((t) => (
          <GlassCard key={t.nama} className="flex flex-col gap-3 p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <FileSpreadsheet className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{t.nama}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
            <div className="mt-auto flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Printer className="size-3.5" /> Cetak
              </Button>
              <Button size="sm" variant="hero" className="flex-1">
                <Download className="size-3.5" /> Unduh
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
