import { createFileRoute } from "@tanstack/react-router";
import { Save, Keyboard } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
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
  SectionTitle,
  Select,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, IBADAH, KELAS } from "@/lib/mock";

export const Route = createFileRoute("/ibadah")({
  head: () => ({
    meta: [
      { title: "Ibadah Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Rekap ibadah bulanan santri: sholat berjamaah, tahajjud, qobliyah ba'diyah, puasa sunnah, dan sholat dhuha.",
      },
      { property: "og:title", content: "Ibadah Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Rekap tahajjud, dhuha, puasa sunnah, dan jamaah santri per bulan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ibadah,
});

const KOLOM = [
  { key: "tdkJamaah", label: "Tidak jamaah" },
  { key: "tahajjud", label: "Tahajjud" },
  { key: "qobliyah", label: "Qobliyah/Ba'diyah" },
  { key: "puasa", label: "Puasa sunnah" },
  { key: "dhuha", label: "Dhuha" },
] as const;

function Ibadah() {
  return (
    <AppShell>
      <PageHeader
        title="Ibadah Santri"
        subtitle="Rekap ibadah per bulan"
        actions={
          <Button variant="hero">
            <Save className="size-4" /> Simpan semua
          </Button>
        }
      />

      <Banner tone="primary" title="Angka adalah jumlah dalam satu bulan">
        Contoh: tahajjud 18 berarti santri tahajjud 18 kali sepanjang bulan ini.
      </Banner>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Kelas MA X-A">Isian ibadah</SectionTitle>
        <div className="mb-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_220px]">
          <SearchInput />
          <Select options={KELAS} />
          <MonthNav start={BULAN_LAPORAN} />
        </div>
        <p className="mb-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Keyboard className="size-3.5" /> Isian seperti Excel: Tab pindah kolom, Enter pindah
          baris, dan bisa tempel (paste) banyak sel sekaligus dari spreadsheet.
        </p>

        <div className="hidden md:block">
          <DataTable
            head={
              <>
                <Th>Urutan</Th>
                <Th sortable>Santri</Th>
                {KOLOM.map((k) => (
                  <Th key={k.key} align="center">
                    {k.label}
                  </Th>
                ))}
              </>
            }
          >
            {IBADAH.map((s, i) => (
              <tr key={s.nama} className="hover:bg-secondary/40">
                <Td>
                  <RowOrder index={i} />
                </Td>
                <Td className="font-medium">{s.nama}</Td>
                {KOLOM.map((k) => (
                  <Td key={k.key} align="center">
                    <NumCell value={s[k.key]} />
                  </Td>
                ))}
              </tr>
            ))}
          </DataTable>
        </div>

        <ul className="space-y-3 md:hidden">
          {IBADAH.map((s, i) => (
            <li key={s.nama} className="glass-soft space-y-3 rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <RowOrder index={i} />
                <p className="min-w-0 truncate text-sm font-medium">{s.nama}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {KOLOM.map((k) => (
                  <label key={k.key} className="block">
                    <span className="mb-1 block text-[11px] text-muted-foreground">{k.label}</span>
                    <Input defaultValue={s[k.key]} inputMode="numeric" />
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </AppShell>
  );
}
