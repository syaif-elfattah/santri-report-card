import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  DataTable,
  GlassCard,
  Input,
  MonthNav,
  NumCell,
  PageHeader,
  RowOrder,
  SearchInput,
  SearchableSelect,
  SectionTitle,
  Select,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, HAFALAN, KELAS } from "@/lib/mock";

const SURAT = [
  "Al-Baqarah",
  "Ali 'Imran",
  "An-Nisa'",
  "Al-Kahf",
  "Maryam",
  "Yasin",
  "Al-Waqi'ah",
  "Al-Mulk",
  "An-Naba'",
  "An-Nazi'at",
  "Al-Balad",
];

export const Route = createFileRoute("/hafalan")({
  head: () => ({
    meta: [
      { title: "Hafalan Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Catat capaian hafalan santri per bulan: surat terakhir, ayat, dan juz, dengan pencarian nama surat yang bisa diketik.",
      },
      { property: "og:title", content: "Hafalan Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Capaian hafalan bulanan santri: surat, ayat, dan juz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hafalan,
});

function Hafalan() {
  return (
    <AppShell>
      <PageHeader
        title="Hafalan Santri"
        subtitle="Capaian hafalan per bulan"
        actions={
          <Button variant="hero">
            <Save className="size-4" /> Simpan semua
          </Button>
        }
      />

      <Banner tone="primary" title="Nama surat bisa diketik">
        Ketik beberapa huruf pada kolom surat, daftar akan menyaring otomatis.
      </Banner>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Kelas MA X-A">Isian hafalan</SectionTitle>
        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_220px]">
          <SearchInput />
          <Select options={KELAS} />
          <MonthNav start={BULAN_LAPORAN} />
        </div>

        {/* Tabel untuk layar lebar */}
        <div className="hidden md:block">
          <DataTable
            head={
              <>
                <Th>Urutan</Th>
                <Th sortable>Santri</Th>
                <Th>Surat terakhir</Th>
                <Th align="center">Ayat</Th>
                <Th align="center">Juz</Th>
                <Th align="center">Status</Th>
              </>
            }
          >
            {HAFALAN.map((h, i) => (
              <tr key={h.nama} className="align-middle hover:bg-secondary/40">
                <Td>
                  <RowOrder index={i} />
                </Td>
                <Td className="font-medium">{h.nama}</Td>
                <Td className="w-56">
                  <SearchableSelect options={SURAT} value={h.surat} placeholder="Pilih surat…" />
                </Td>
                <Td align="center">
                  <NumCell value={h.ayat} />
                </Td>
                <Td align="center">
                  <NumCell value={h.juz} />
                </Td>
                <Td align="center">
                  {h.surat ? <Badge tone="success">Terisi</Badge> : <Badge tone="warning">Kosong</Badge>}
                </Td>
              </tr>
            ))}
          </DataTable>
        </div>

        {/* Kartu untuk HP */}
        <ul className="space-y-3 md:hidden">
          {HAFALAN.map((h, i) => (
            <li key={h.nama} className="glass-soft space-y-3 rounded-2xl p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <RowOrder index={i} />
                  <p className="min-w-0 truncate text-sm font-medium">{h.nama}</p>
                </div>
                {h.surat ? <Badge tone="success">Terisi</Badge> : <Badge tone="warning">Kosong</Badge>}
              </div>
              <SearchableSelect options={SURAT} value={h.surat} placeholder="Pilih surat…" />
              <div className="grid grid-cols-2 gap-3">
                <Input defaultValue={h.ayat ?? ""} inputMode="numeric" placeholder="Ayat" />
                <Input defaultValue={h.juz ?? ""} inputMode="numeric" placeholder="Juz" />
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </AppShell>
  );
}
