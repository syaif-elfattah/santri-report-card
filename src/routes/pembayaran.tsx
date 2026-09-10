import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  DataTable,
  GlassCard,
  PageHeader,
  SearchInput,
  SectionTitle,
  Select,
  Stat,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, BULAN_SPP, KELAS, PEMBAYARAN, rupiah } from "@/lib/mock";

export const Route = createFileRoute("/pembayaran")({
  head: () => ({
    meta: [
      { title: "Pembayaran Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Rekap tunggakan santri: tagihan pondok, tagihan jenjang, daftar ulang, biaya ujian, dan SPP dua belas bulan.",
      },
      { property: "og:title", content: "Pembayaran Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Rekap tunggakan pondok, jenjang, daftar ulang, ujian, dan SPP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pembayaran,
});

function Pembayaran() {
  const total = PEMBAYARAN.reduce(
    (a, p) => a + p.tagPondok + p.tagJenjang + p.du + p.ujian + p.spp.reduce((x, y) => x + y, 0),
    0,
  );
  const menunggak = PEMBAYARAN.filter(
    (p) => p.tagPondok + p.tagJenjang + p.du + p.ujian + p.spp.reduce((x, y) => x + y, 0) > 0,
  ).length;

  return (
    <AppShell>
      <PageHeader
        title="Pembayaran"
        subtitle={`Data tunggakan per ${BULAN_LAPORAN} · hanya bisa dilihat`}
      />

      <Banner tone="primary" title="Data dari bagian keuangan">
        Angka di halaman ini tidak bisa diubah dari sini. Bila ada selisih, sampaikan lewat menu
        Masukan &amp; Saran.
      </Banner>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Santri menunggak" value={menunggak} hintTone="warning" hint="dari 4 santri" />
        <Stat label="Total tunggakan" value={rupiah(total)} hintTone="danger" />
        <Stat label="Lunas penuh" value={PEMBAYARAN.length - menunggak} hintTone="success" />
        <Stat label="Bulan SPP tertunggak" value={13} hint="akumulasi semua santri" />
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Geser ke samping untuk melihat SPP">Rekap tunggakan</SectionTitle>
        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_160px]">
          <SearchInput />
          <Select options={KELAS} />
          <Select options={["Semua status", "Menunggak", "Lunas"]} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="sticky left-0 z-10 whitespace-nowrap bg-card/90 px-3 py-2.5 font-semibold backdrop-blur">
                  Santri
                </th>
                <th className="px-3 py-2.5 font-semibold">Jenjang</th>
                <th className="px-3 py-2.5 text-right font-semibold">Tag. Pondok</th>
                <th className="px-3 py-2.5 text-right font-semibold">Tag. Jenjang</th>
                <th className="px-3 py-2.5 text-right font-semibold">Daftar Ulang</th>
                <th className="px-3 py-2.5 text-right font-semibold">Ujian</th>
                {BULAN_SPP.map((b) => (
                  <th key={b} className="px-2 py-2.5 text-center font-semibold">
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {PEMBAYARAN.map((p) => (
                <tr key={p.nama} className="hover:bg-secondary/40">
                  <td className="sticky left-0 z-10 whitespace-nowrap bg-card/90 px-3 py-2.5 font-medium backdrop-blur">
                    {p.nama}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge tone="muted">{p.jenjang}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{rupiah(p.tagPondok)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{rupiah(p.tagJenjang)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{rupiah(p.du)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{rupiah(p.ujian)}</td>
                  {p.spp.map((s, i) => (
                    <td
                      key={i}
                      className={
                        s > 0
                          ? "px-2 py-2.5 text-center text-[11px] font-medium tabular-nums text-destructive"
                          : "px-2 py-2.5 text-center text-[11px] text-muted-foreground"
                      }
                    >
                      {s > 0 ? (s / 1000).toFixed(0) + "rb" : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5" /> Angka merah berarti SPP bulan tersebut belum lunas.
        </p>
      </GlassCard>
    </AppShell>
  );
}
