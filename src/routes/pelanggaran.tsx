import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Plus, Trash2, Pencil } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
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
  Select,
  SeverityBadge,
  Td,
  Textarea,
  Th,
} from "@/components/kit";
import {
  KATEGORI_PELANGGARAN,
  PELANGGARAN,
  PRESET_TANGGAL,
  SANTRI,
  BULAN_LAPORAN,
} from "@/lib/mock";

export const Route = createFileRoute("/pelanggaran")({
  head: () => ({
    meta: [
      { title: "Pelanggaran Santri — Rapor Pondok" },
      {
        name: "description",
        content:
          "Catat pelanggaran santri per kategori Ringan sampai Sangat Berat lengkap dengan tanggal, keterangan, dan foto bukti.",
      },
      { property: "og:title", content: "Pelanggaran Santri — Rapor Pondok" },
      {
        property: "og:description",
        content: "Pencatatan pelanggaran santri berikut kategori dan bukti foto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pelanggaran,
});

function Pelanggaran() {
  const [kategori, setKategori] = useState<string>("Ringan");

  return (
    <AppShell>
      <PageHeader
        title="Pelanggaran Santri"
        subtitle={`Bulan laporan ${BULAN_LAPORAN} · Kelas MA X-A`}
      />

      <div className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
        <GlassCard className="h-fit p-4 sm:p-5">
          <SectionTitle hint="Form">Tambah pelanggaran</SectionTitle>
          <div className="space-y-3">
            <Field label="Nama santri">
              <SearchableSelect options={SANTRI.map((s) => s.nama)} placeholder="Pilih santri…" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tanggal">
                <Input type="date" defaultValue="2025-08-24" />
              </Field>
              <Field label="Kategori">
                <Select
                  options={[...KATEGORI_PELANGGARAN]}
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              Pratinjau tingkat:{" "}
              <SeverityBadge level={kategori as (typeof KATEGORI_PELANGGARAN)[number]} />
            </div>
            <Field label="Keterangan">
              <Textarea placeholder="Tulis kronologi singkat…" />
            </Field>
            <Field label="Foto bukti (opsional)">
              <div className="glass-soft flex flex-col items-center justify-center gap-2 rounded-xl border-dashed py-6 text-center">
                <Camera className="size-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Ketuk untuk ambil foto atau pilih dari galeri
                </p>
              </div>
            </Field>
            <Button variant="hero" className="w-full">
              <Plus className="size-4" /> Simpan pelanggaran
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint={`${PELANGGARAN.length} catatan`}>Riwayat pelanggaran</SectionTitle>
          <div className="mb-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_170px]">
            <SearchInput />
            <Select options={["Semua kategori", ...KATEGORI_PELANGGARAN]} />
          </div>
          <div className="mb-4">
            <DateRangePresets presets={PRESET_TANGGAL} />
          </div>
          <DataTable
            head={
              <>
                <Th sortable>Santri</Th>
                <Th sortable>Tanggal</Th>
                <Th>Kategori</Th>
                <Th>Keterangan</Th>
                <Th align="center">Bukti</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {PELANGGARAN.map((p, i) => (
              <tr key={i} className="hover:bg-secondary/40">
                <Td className="font-medium">{p.nama}</Td>
                <Td>{p.tanggal}</Td>
                <Td>
                  <SeverityBadge level={p.kategori} />
                </Td>
                <Td className="whitespace-normal text-muted-foreground">{p.deskripsi}</Td>
                <Td align="center">
                  {p.foto ? <Badge tone="primary">Ada foto</Badge> : <span className="text-muted-foreground">—</span>}
                </Td>
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
