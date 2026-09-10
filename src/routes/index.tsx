import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TriangleAlert,
  ScrollText,
  HandHeart,
  Wallet,
  Send,
  Stethoscope,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  DataTable,
  GlassCard,
  PageHeader,
  SectionTitle,
  SeverityBadge,
  Stat,
  Td,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, HARI_INI, PELANGGARAN, LAPORAN_WALI } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beranda — Rapor Pondok Ma'ahid Kudus" },
      {
        name: "description",
        content:
          "Ringkasan bulanan santri: pencatatan hafalan, ibadah, halaqoh, kesehatan, pelanggaran, dan status pengiriman laporan wali.",
      },
      { property: "og:title", content: "Beranda — Rapor Pondok Ma'ahid Kudus" },
      {
        property: "og:description",
        content: "Ringkasan bulanan santri dan status laporan wali santri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Beranda,
});

const SHORTCUTS = [
  { to: "/pelanggaran", label: "Catat Pelanggaran", icon: TriangleAlert },
  { to: "/halaqoh", label: "Absen Halaqoh", icon: BookOpen },
  { to: "/hafalan", label: "Isi Hafalan", icon: ScrollText },
  { to: "/ibadah", label: "Isi Ibadah", icon: HandHeart },
  { to: "/kesehatan", label: "Catat Kesehatan", icon: Stethoscope },
  { to: "/pembayaran", label: "Cek Pembayaran", icon: Wallet },
] as const;

function Beranda() {
  const belum = LAPORAN_WALI.filter((l) => l.belum.length > 0).length;

  return (
    <AppShell>
      <PageHeader
        title={`Assalamu'alaikum, Ust. Hasan`}
        subtitle={`${HARI_INI} · Mengisi laporan bulan ${BULAN_LAPORAN} untuk kelas MA X-A`}
        actions={
          <Link to="/laporan-wali">
            <Button variant="hero">
              <Send className="size-4" /> Kirim Laporan
            </Button>
          </Link>
        }
      />

      <Banner
        tone="warning"
        title="Batas wajar pengisian: tanggal 15"
        action={
          <Link to="/laporan-wali">
            <Button size="sm" variant="warning">
              Lihat sisa
            </Button>
          </Link>
        }
      >
        {belum} santri di kelas Anda datanya belum lengkap untuk bulan {BULAN_LAPORAN}.
      </Banner>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Santri diampu" value={12} hint="Kelas MA X-A" />
        <Stat label="Sudah lengkap" value={8} hint="66% terisi" hintTone="success" />
        <Stat label="Belum lengkap" value={4} hint="Segera dilengkapi" hintTone="warning" />
        <Stat label="Pelanggaran bulan ini" value={5} hint="1 sangat berat" hintTone="danger" />
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle hint="Pintasan">Mulai mencatat</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SHORTCUTS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="glass-soft group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-card"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <s.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{s.label}</span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint={BULAN_LAPORAN}>Pelanggaran terbaru</SectionTitle>
          <DataTable
            head={
              <>
                <Th>Santri</Th>
                <Th>Tanggal</Th>
                <Th>Kategori</Th>
                <Th>Keterangan</Th>
              </>
            }
          >
            {PELANGGARAN.slice(0, 5).map((p, i) => (
              <tr key={i} className="hover:bg-secondary/40">
                <Td className="font-medium">{p.nama}</Td>
                <Td>{p.tanggal}</Td>
                <Td>
                  <SeverityBadge level={p.kategori} />
                </Td>
                <Td className="max-w-[240px] truncate whitespace-normal text-muted-foreground">
                  {p.deskripsi}
                </Td>
              </tr>
            ))}
          </DataTable>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint="Per santri">Kelengkapan data</SectionTitle>
          <ul className="space-y-2">
            {LAPORAN_WALI.map((l) => (
              <li
                key={l.nama}
                className="glass-soft flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
              >
                <span className="min-w-0 truncate text-sm">{l.nama}</span>
                {l.dikecualikan ? (
                  <Badge tone="muted">Dikecualikan</Badge>
                ) : l.belum.length === 0 ? (
                  <Badge tone="success">Lengkap</Badge>
                ) : (
                  <Badge tone="warning">Kurang: {l.belum.join(", ")}</Badge>
                )}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </AppShell>
  );
}
