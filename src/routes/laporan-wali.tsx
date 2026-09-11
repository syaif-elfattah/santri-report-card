import { createFileRoute } from "@tanstack/react-router";
import { Send, Eye, ShieldQuestion, CheckCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  DataTable,
  GlassCard,
  MonthNav,
  PageHeader,
  SearchInput,
  SectionTitle,
  Select,
  Stat,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, KELAS, LAPORAN_WALI, SANTRI } from "@/lib/mock";

export const Route = createFileRoute("/laporan-wali")({
  head: () => ({
    meta: [
      { title: "Laporan Wali Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Pratinjau rapor bulanan santri dan kirim tautannya ke nomor WhatsApp wali santri, lengkap dengan status kelengkapan data.",
      },
      { property: "og:title", content: "Laporan Wali Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Pratinjau dan kirim rapor bulanan santri ke wali via WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LaporanWali,
});

function LaporanWali() {
  return (
    <AppShell>
      <PageHeader
        title="Laporan Wali Santri"
        subtitle={`Rapor bulan ${BULAN_LAPORAN} · Kelas MA X-A`}
        actions={
          <Button variant="wa">
            <CheckCheck className="size-4" /> Kirim semua yang lengkap
          </Button>
        }
      />

      <Banner tone="warning" title="Laporan hanya bisa dikirim bila data santri sudah lengkap">
        Santri yang datanya kurang akan otomatis terkunci. Bila ada alasan khusus, tandai
        &quot;Dikecualikan&quot; agar tidak dihitung sebagai tunggakan pengisian.
      </Banner>

      <Banner tone="primary" title="Tombol Kirim WA membuka WhatsApp berisi tautan PDF bertoken">
        Wali cukup mengetuk tautan itu dan rapor PDF langsung terbuka — tanpa akun dan tanpa perlu
        memasukkan nomor apa pun.
      </Banner>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Siap dikirim" value={2} hintTone="success" hint="Data lengkap" />
        <Stat label="Belum lengkap" value={2} hintTone="warning" />
        <Stat label="Dikecualikan" value={1} />
        <Stat label="Sudah terkirim" value={0} hint={`Bulan ${BULAN_LAPORAN}`} />
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint={`${SANTRI.length} santri`}>Daftar pengiriman</SectionTitle>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_170px_220px]">
          <SearchInput />
          <Select options={KELAS} />
          <Select options={["Semua status", "Siap kirim", "Belum lengkap", "Dikecualikan"]} />
          <MonthNav start={BULAN_LAPORAN} />
        </div>

        <div className="hidden md:block">
          <DataTable
            head={
              <>
                <Th sortable>Santri</Th>
                <Th>Nomor WA wali</Th>
                <Th>Status data</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {LAPORAN_WALI.map((l) => {
              const s = SANTRI.find((x) => x.nama === l.nama);
              const siap = l.belum.length === 0 && !l.dikecualikan && !!s?.hpWali;
              return (
                <tr key={l.nama} className="hover:bg-secondary/40">
                  <Td className="font-medium">{l.nama}</Td>
                  <Td className={s?.hpWali ? "" : "text-destructive"}>
                    {s?.hpWali || "Belum ada nomor"}
                  </Td>
                  <Td>
                    {l.dikecualikan ? (
                      <Badge tone="muted">Dikecualikan · {l.dikecualikan}</Badge>
                    ) : l.belum.length ? (
                      <Badge tone="warning">Kurang: {l.belum.join(", ")}</Badge>
                    ) : (
                      <Badge tone="success">Lengkap</Badge>
                    )}
                  </Td>
                  <Td align="right">
                    <div className="inline-flex gap-1.5">
                      <Button size="sm" variant="outline">
                        <Eye className="size-3.5" /> Pratinjau
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ShieldQuestion className="size-3.5" /> Kecualikan
                      </Button>
                      <Button size="sm" variant={siap ? "wa" : "ghost"} disabled={!siap}>
                        <Send className="size-3.5" /> Kirim WA
                      </Button>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </DataTable>
        </div>

        <ul className="space-y-3 md:hidden">
          {LAPORAN_WALI.map((l) => {
            const s = SANTRI.find((x) => x.nama === l.nama);
            const siap = l.belum.length === 0 && !l.dikecualikan && !!s?.hpWali;
            return (
              <li key={l.nama} className="glass-soft space-y-2.5 rounded-2xl p-3">
                <p className="truncate text-sm font-medium">{l.nama}</p>
                <p className="text-xs text-muted-foreground">{s?.hpWali || "Belum ada nomor WA"}</p>
                {l.dikecualikan ? (
                  <Badge tone="muted">Dikecualikan</Badge>
                ) : l.belum.length ? (
                  <Badge tone="warning">Kurang: {l.belum.join(", ")}</Badge>
                ) : (
                  <Badge tone="success">Lengkap</Badge>
                )}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Button size="sm" variant="outline">
                    <Eye className="size-3.5" /> Pratinjau
                  </Button>
                  <Button size="sm" variant={siap ? "wa" : "ghost"} disabled={!siap}>
                    <Send className="size-3.5" /> Kirim WA
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </GlassCard>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="PDF yang dibuka wali dari tautan WhatsApp">Pratinjau rapor</SectionTitle>
        <div className="mx-auto max-w-md space-y-3 rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="text-center">
            <p className="font-display text-base font-semibold">Rapor Bulanan Santri</p>
            <p className="text-xs text-muted-foreground">
              Pondok Pesantren Ma&apos;ahid Kudus · {BULAN_LAPORAN}
            </p>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3 text-sm">
            <p className="font-medium">Abdullah Fauzi</p>
            <p className="text-xs text-muted-foreground">MA X-A · Musyrif: Ust. Hasan Basri</p>
          </div>
          {[
            ["Hafalan", "Al-Mulk ayat 30 (Juz 29)"],
            ["Halaqoh & KBM", "Sakit 1 · Izin 0 · Alpa 0"],
            ["Ibadah", "Tahajjud 18 · Dhuha 20 · Puasa 4"],
            ["Kesehatan", "Luka di kaki (11/08) — diperban"],
            ["Pelanggaran", "1 pelanggaran kategori Sedang"],
            ["Pembayaran", "Tunggakan Rp750.000"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-border/60 py-1.5 text-sm last:border-0">
              <span className="text-muted-foreground">{k}</span>
              <span className="text-right font-medium">{v}</span>
            </div>
          ))}
          <p className="pt-1 text-center text-[11px] text-muted-foreground">
            Dikirim otomatis oleh sistem Rapor Pondok
          </p>
        </div>
      </GlassCard>
    </AppShell>
  );
}
