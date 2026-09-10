import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Button,
  DataTable,
  DateRangePresets,
  Field,
  GlassCard,
  Input,
  PageHeader,
  SearchInput,
  SearchableSelect,
  SectionTitle,
  Td,
  Textarea,
  Th,
} from "@/components/kit";
import { BULAN_LAPORAN, KESEHATAN, PRESET_TANGGAL, SANTRI } from "@/lib/mock";

export const Route = createFileRoute("/kesehatan")({
  head: () => ({
    meta: [
      { title: "Kesehatan Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Riwayat kesehatan santri: tanggal sakit, jenis keluhan, penanganan yang diberikan, dan keterangan tambahan.",
      },
      { property: "og:title", content: "Kesehatan Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Riwayat sakit dan penanganan santri selama satu bulan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Kesehatan,
});

function Kesehatan() {
  return (
    <AppShell>
      <PageHeader title="Kesehatan Santri" subtitle={`Catatan bulan ${BULAN_LAPORAN}`} />

      <div className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
        <GlassCard className="h-fit p-4 sm:p-5">
          <SectionTitle hint="Form">Tambah catatan sakit</SectionTitle>
          <div className="space-y-3">
            <Field label="Nama santri">
              <SearchableSelect options={SANTRI.map((s) => s.nama)} placeholder="Pilih santri…" />
            </Field>
            <Field label="Tanggal">
              <Input type="date" defaultValue="2025-08-21" />
            </Field>
            <Field label="Jenis sakit">
              <Input placeholder="Contoh: Demam tinggi" />
            </Field>
            <Field label="Penanganan">
              <Textarea placeholder="Obat / tindakan yang diberikan…" />
            </Field>
            <Field label="Keterangan (opsional)">
              <Input placeholder="Contoh: dijemput wali 2 hari" />
            </Field>
            <Button variant="hero" className="w-full">
              <Plus className="size-4" /> Simpan catatan
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint={`${KESEHATAN.length} catatan`}>Riwayat kesehatan</SectionTitle>
          <div className="mb-3">
            <SearchInput />
          </div>
          <div className="mb-4">
            <DateRangePresets presets={PRESET_TANGGAL} />
          </div>
          <DataTable
            head={
              <>
                <Th sortable>Santri</Th>
                <Th sortable>Tanggal</Th>
                <Th>Jenis sakit</Th>
                <Th>Penanganan</Th>
                <Th>Keterangan</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {KESEHATAN.map((k, i) => (
              <tr key={i} className="hover:bg-secondary/40">
                <Td className="font-medium">{k.nama}</Td>
                <Td>{k.tanggal}</Td>
                <Td>{k.sakit}</Td>
                <Td className="whitespace-normal text-muted-foreground">{k.penanganan}</Td>
                <Td className="text-muted-foreground">{k.keterangan || "—"}</Td>
                <Td align="right">
                  <div className="inline-flex gap-1">
                    <Button size="sm" variant="outline">
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}
          </DataTable>
        </GlassCard>
      </div>
    </AppShell>
  );
}
