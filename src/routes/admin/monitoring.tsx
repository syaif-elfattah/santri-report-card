import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Download } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  GlassCard,
  PageHeader,
  SectionTitle,
  Select,
  Stat,
} from "@/components/kit";
import { BULAN_LAPORAN, MONITORING_KELAS } from "@/lib/mock";

export const Route = createFileRoute("/admin/monitoring")({
  head: () => ({
    meta: [
      { title: "Monitoring Laporan — Rapor Pondok" },
      {
        name: "description",
        content:
          "Pantauan pimpinan atas kemajuan pengisian rapor tiap kelas, daftar santri yang belum terisi, dan kelas yang terlambat.",
      },
      { property: "og:title", content: "Monitoring Laporan — Rapor Pondok" },
      {
        property: "og:description",
        content: "Pantauan kemajuan pengisian rapor tiap kelas dan musyrif.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Monitoring,
});

function Monitoring() {
  const total = MONITORING_KELAS.reduce((a, k) => a + k.total, 0);
  const sudah = MONITORING_KELAS.reduce((a, k) => a + k.sudah, 0);
  const telat = MONITORING_KELAS.filter((k) => k.telat).length;

  return (
    <AppShell>
      <PageHeader
        title="Monitoring Laporan"
        subtitle={`Kemajuan pengisian bulan ${BULAN_LAPORAN}`}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Unduh rekap
            </Button>
            <Button variant="hero">
              <BellRing className="size-4" /> Ingatkan yang belum
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:max-w-xs">
        <Select options={["Agustus 2025", "Juli 2025", "Juni 2025"]} />
      </div>

      {telat > 0 ? (
        <Banner tone="danger" title={`${telat} kelas melewati batas tanggal 15`}>
          Musyrif kelas tersebut perlu diingatkan agar rapor segera dikirim ke wali santri.
        </Banner>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Total santri" value={total} />
        <Stat
          label="Sudah terisi"
          value={sudah}
          hint={`${Math.round((sudah / total) * 100)}% selesai`}
          hintTone="success"
        />
        <Stat label="Belum terisi" value={total - sudah} hintTone="warning" />
        <Stat label="Kelas terlambat" value={telat} hintTone="danger" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {MONITORING_KELAS.map((k) => {
          const pct = Math.round((k.sudah / k.total) * 100);
          return (
            <GlassCard key={k.kelas} className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold">{k.kelas}</p>
                  <p className="text-xs text-muted-foreground">{k.musyrif}</p>
                </div>
                {k.telat ? (
                  <Badge tone="danger">Terlambat</Badge>
                ) : pct === 100 ? (
                  <Badge tone="success">Selesai</Badge>
                ) : (
                  <Badge tone="warning">Berjalan</Badge>
                )}
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">
                    {k.sudah} dari {k.total} santri
                  </span>
                  <span className="font-display text-lg font-bold">{pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full gradient-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {k.belum.length ? (
                <div className="mt-4">
                  <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    Belum terisi
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {k.belum.map((n) => (
                      <Badge key={n} tone="warning">
                        {n}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {k.dikecualikan.length ? (
                <div className="mt-3">
                  <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    Dikecualikan
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {k.dikecualikan.map((d) => (
                      <Badge key={d.nama} tone="muted">
                        {d.nama} · {d.alasan}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  Lihat detail
                </Button>
                <Button size="sm" variant="ghost">
                  <BellRing className="size-3.5" /> Ingatkan musyrif
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="6 bulan terakhir">Ketepatan waktu pengisian</SectionTitle>
        <div className="flex h-40 items-end gap-3">
          {[
            ["Mar", 92],
            ["Apr", 78],
            ["Mei", 85],
            ["Jun", 96],
            ["Jul", 88],
            ["Agu", 72],
          ].map(([b, v]) => (
            <div key={String(b)} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span className="text-[11px] font-medium tabular-nums text-muted-foreground">{v}%</span>
              <div
                className="w-full rounded-t-xl gradient-primary"
                style={{ height: `${(Number(v) / 100) * 110}px` }}
              />
              <span className="text-[11px] text-muted-foreground">{b}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
