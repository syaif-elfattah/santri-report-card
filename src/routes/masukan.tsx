import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  Field,
  GlassCard,
  PageHeader,
  SectionTitle,
  Select,
  Textarea,
} from "@/components/kit";
import { MASUKAN, MASUKAN_KATEGORI } from "@/lib/mock";

export const Route = createFileRoute("/masukan")({
  head: () => ({
    meta: [
      { title: "Masukan & Saran — Rapor Pondok" },
      {
        name: "description",
        content:
          "Kirim masukan, saran, atau laporan kendala penggunaan sistem rapor pondok langsung kepada admin.",
      },
      { property: "og:title", content: "Masukan & Saran — Rapor Pondok" },
      {
        property: "og:description",
        content: "Kirim saran dan kendala penggunaan sistem kepada admin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Masukan,
});

function Masukan() {
  return (
    <AppShell>
      <PageHeader title="Masukan & Saran" subtitle="Sampaikan kendala atau ide perbaikan" />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_1fr]">
        <GlassCard className="h-fit p-4 sm:p-5">
          <SectionTitle hint="Dibaca admin">Tulis masukan</SectionTitle>
          <div className="space-y-3">
            <Field label="Kategori">
              <Select options={MASUKAN_KATEGORI} />
            </Field>
            <Field label="Isi masukan">
              <Textarea className="min-h-40" placeholder="Ceritakan kendalanya sedetail mungkin…" />
            </Field>
            <Button variant="hero" className="w-full">
              <Send className="size-4" /> Kirim masukan
            </Button>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <Banner tone="success" title="Masukan Anda ditindaklanjuti">
            Admin membaca setiap masukan dan menandainya bila sudah diproses.
          </Banner>
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle hint={`${MASUKAN.length} kiriman`}>Riwayat masukan</SectionTitle>
            <ul className="space-y-3">
              {MASUKAN.map((m, i) => (
                <li key={i} className="glass-soft space-y-2 rounded-2xl p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="primary">{m.kategori}</Badge>
                    {m.dibaca ? (
                      <Badge tone="success">Sudah dibaca</Badge>
                    ) : (
                      <Badge tone="warning">Menunggu</Badge>
                    )}
                    <span className="ml-auto text-[11px] text-muted-foreground">{m.tanggal}</span>
                  </div>
                  <p className="text-sm">{m.pesan}</p>
                  <p className="text-[11px] text-muted-foreground">Dari: {m.dari}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
