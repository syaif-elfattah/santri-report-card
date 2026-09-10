import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge, GlassCard, PageHeader, SearchInput, SectionTitle, Tabs } from "@/components/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/panduan")({
  head: () => ({
    meta: [
      { title: "Panduan Penggunaan — Rapor Pondok" },
      {
        name: "description",
        content:
          "Panduan langkah demi langkah memakai sistem rapor pondok untuk musyrif, wali kelas, dan admin.",
      },
      { property: "og:title", content: "Panduan Penggunaan — Rapor Pondok" },
      {
        property: "og:description",
        content: "Langkah demi langkah memakai sistem rapor pondok.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Panduan,
});

const ISI: Record<string, { q: string; a: string }[]> = {
  Musyrif: [
    {
      q: "Bagaimana urutan mengisi data bulanan?",
      a: "Mulai dari Absen Halaqoh, lalu Hafalan, Ibadah, Kesehatan, dan Pelanggaran bila ada. Setelah semua terisi, buka Laporan Wali Santri untuk mengirimkan rapor.",
    },
    {
      q: "Sampai kapan batas pengisian?",
      a: "Pengisian dianggap wajar bila selesai sebelum tanggal 15 bulan berikutnya. Setelah itu kelas Anda akan ditandai terlambat pada monitoring pimpinan.",
    },
    {
      q: "Santri saya pulang lama, bagaimana?",
      a: "Tandai santri tersebut sebagai Dikecualikan pada halaman Laporan Wali Santri dan tuliskan alasannya, agar tidak terhitung sebagai tunggakan.",
    },
  ],
  "Wali Kelas": [
    {
      q: "Apa bedanya dengan musyrif?",
      a: "Wali kelas melihat seluruh santri di kelasnya, termasuk yang diampu musyrif lain, dan memastikan tidak ada data yang tertinggal.",
    },
    {
      q: "Bisakah mengubah data musyrif lain?",
      a: "Tidak. Wali kelas hanya dapat melihat dan mengingatkan. Perubahan tetap dilakukan oleh musyrif pemilik data.",
    },
  ],
  Admin: [
    {
      q: "Menambah santri dan kelas baru",
      a: "Buka Manajemen, pilih tab Santri atau Kelas, lalu tambahkan data. Setiap santri wajib memiliki kelas dan musyrif pengampu.",
    },
    {
      q: "Memproses kenaikan kelas",
      a: "Di akhir tahun ajaran, buka Manajemen lalu jalankan Naik Kelas. Riwayat lama tetap tersimpan pada kelas dan tahun ajaran sebelumnya.",
    },
  ],
  "Wali Santri": [
    {
      q: "Cara melihat rapor anak",
      a: "Buka halaman Cek Laporan, masukkan nomor WhatsApp yang terdaftar di pondok, lalu pilih bulan laporan yang ingin dilihat.",
    },
    {
      q: "Nomor saya tidak dikenali",
      a: "Hubungi musyrif pengampu anak Anda agar nomor WhatsApp diperbarui di data pondok.",
    },
  ],
};

function Panduan() {
  const [tab, setTab] = useState("Musyrif");
  const [open, setOpen] = useState(0);

  return (
    <AppShell>
      <PageHeader title="Panduan Penggunaan" subtitle="Bacaan singkat sesuai peran Anda" />

      <GlassCard className="p-4 sm:p-5">
        <div className="mb-4 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <Tabs tabs={Object.keys(ISI)} active={tab} onChange={(t) => (setTab(t), setOpen(0))} />
          <SearchInput placeholder="Cari topik panduan…" />
        </div>

        <ul className="space-y-2">
          {ISI[tab].map((item, i) => (
            <li key={item.q} className="glass-soft overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className="min-w-0 flex-1 text-sm font-medium">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    open === i && "rotate-180",
                  )}
                />
              </button>
              {open === i ? (
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Durasi 2–4 menit">Video singkat</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Mengisi hafalan", "Mengirim rapor ke wali", "Mencatat pelanggaran"].map((v) => (
            <div key={v} className="glass-soft rounded-2xl p-4">
              <div className="mb-3 grid h-24 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <PlayCircle className="size-8" />
              </div>
              <p className="text-sm font-medium">{v}</p>
              <Badge tone="muted" className="mt-2">
                Video
              </Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
