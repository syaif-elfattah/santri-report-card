import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Save, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Banner,
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
  Tabs,
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

function BarisCatat({ index, onHapus }: { index: number; onHapus: () => void }) {
  return (
    <div className="glass-soft rounded-2xl p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Baris {index + 1}
        </p>
        <Button size="sm" variant="ghost" onClick={onHapus} aria-label="Hapus baris">
          <Trash2 className="size-3.5" /> Hapus baris
        </Button>
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_160px_minmax(0,1fr)]">
        <Field label="Nama santri">
          <SearchableSelect options={SANTRI.map((s) => s.nama)} placeholder="Pilih santri…" />
        </Field>
        <Field label="Tanggal kejadian">
          <Input type="date" defaultValue="2025-08-21" />
        </Field>
        <Field label="Jenis sakit">
          <Input placeholder="Contoh: Demam tinggi" />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Field label="Penanganan">
          <Textarea placeholder="Obat / tindakan yang diberikan…" className="min-h-20" />
        </Field>
        <Field label="Keterangan (opsional)">
          <Textarea placeholder="Contoh: dijemput wali 2 hari" className="min-h-20" />
        </Field>
      </div>
    </div>
  );
}

function Kesehatan() {
  const [tab, setTab] = useState("Catat");
  const [rows, setRows] = useState<number[]>([1, 2]);
  const [next, setNext] = useState(3);

  return (
    <AppShell>
      <PageHeader
        title="Kesehatan Santri"
        subtitle={`Catatan bulan ${BULAN_LAPORAN}`}
        actions={
          tab === "Catat" ? (
            <Button variant="hero">
              <Save className="size-4" /> Simpan semua
            </Button>
          ) : null
        }
      />

      <Tabs tabs={["Catat", "Laporan"]} active={tab} onChange={setTab} />

      {tab === "Catat" ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint={`${rows.length} baris`}>Catat beberapa kejadian sekaligus</SectionTitle>

          <Banner tone="primary" title="Baris kosong otomatis diabaikan">
            Isi sebanyak yang perlu, lalu tekan &quot;Simpan semua&quot; sekali. Baris yang belum
            lengkap tidak ikut tersimpan dan tidak menimbulkan pesan kesalahan.
          </Banner>

          <div className="mt-4 space-y-3">
            {rows.map((id, i) => (
              <BarisCatat key={id} index={i} onHapus={() => setRows((r) => r.filter((x) => x !== id))} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setRows((r) => [...r, next]);
                setNext((n) => n + 1);
              }}
            >
              <Plus className="size-4" /> Tambah baris
            </Button>
            <Button variant="hero">
              <Save className="size-4" /> Simpan semua
            </Button>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="size-3.5" /> Tanggal diisi per baris kejadian, bukan per bulan.
            </span>
          </div>
        </GlassCard>
      ) : (
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
      )}
    </AppShell>
  );
}
