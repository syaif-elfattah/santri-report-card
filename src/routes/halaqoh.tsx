import { createFileRoute } from "@tanstack/react-router";
import { Save, Keyboard } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Banner,
  Button,
  DataTable,
  GlassCard,
  MonthNav,
  NumCell,
  PageHeader,
  RowOrder,
  SearchInput,
  SectionTitle,
  Select,
  Stat,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, HALAQOH, KELAS } from "@/lib/mock";

export const Route = createFileRoute("/halaqoh")({
  head: () => ({
    meta: [
      { title: "Absen Halaqoh & KBM — Rapor Pondok" },
      {
        name: "description",
        content:
          "Rekap kehadiran halaqoh dan KBM santri per bulan: jumlah sakit, izin, dan alpa dalam satu tabel isian cepat.",
      },
      { property: "og:title", content: "Absen Halaqoh & KBM — Rapor Pondok" },
      {
        property: "og:description",
        content: "Rekap sakit, izin, dan alpa santri per bulan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Halaqoh,
});

function Halaqoh() {
  return (
    <AppShell>
      <PageHeader
        title="Absen Halaqoh & KBM"
        subtitle="Rekap kehadiran per bulan"
        actions={
          <Button variant="hero">
            <Save className="size-4" /> Simpan semua
          </Button>
        }
      />

      <Banner tone="primary" title="Isi jumlah per bulan, bukan per hari">
        Cukup tulis total sakit, izin, dan alpa selama satu bulan. Kosongkan bila tidak ada.
      </Banner>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Stat label="Total sakit" value={5} />
        <Stat label="Total izin" value={3} />
        <Stat label="Total alpa" value={4} hint="Perlu perhatian" hintTone="warning" />
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Kelas MA X-A">Daftar santri</SectionTitle>
        <div className="mb-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_220px]">
          <SearchInput />
          <Select options={KELAS} />
          <MonthNav start={BULAN_LAPORAN} />
        </div>
        <p className="mb-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Keyboard className="size-3.5" /> Isian seperti Excel: Tab pindah kolom, Enter pindah
          baris, dan bisa tempel (paste) banyak sel sekaligus dari spreadsheet.
        </p>
        <DataTable
          head={
            <>
              <Th>Urutan</Th>
              <Th sortable>Santri</Th>
              <Th align="center">Sakit</Th>
              <Th align="center">Izin</Th>
              <Th align="center">Alpa</Th>
              <Th align="center">Total</Th>
            </>
          }
        >
          {HALAQOH.map((h, i) => (
            <tr key={h.nama} className="hover:bg-secondary/40">
              <Td>
                <RowOrder index={i} />
              </Td>
              <Td className="font-medium">{h.nama}</Td>
              <Td align="center">
                <NumCell value={h.sakit} />
              </Td>
              <Td align="center">
                <NumCell value={h.izin} />
              </Td>
              <Td align="center">
                <NumCell value={h.alpa} />
              </Td>
              <Td align="center" className="font-semibold">
                {h.sakit + h.izin + h.alpa}
              </Td>
            </tr>
          ))}
        </DataTable>
      </GlassCard>
    </AppShell>
  );
}
