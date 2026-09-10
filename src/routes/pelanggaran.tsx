import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Plus, Trash2, Pencil, Save, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
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
  Select,
  SeverityBadge,
  Tabs,
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

type Baris = { id: number; kategori: string };

function BarisCatat({
  baris,
  index,
  onKategori,
  onHapus,
}: {
  baris: Baris;
  index: number;
  onKategori: (v: string) => void;
  onHapus: () => void;
}) {
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
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_150px_170px]">
        <Field label="Nama santri">
          <SearchableSelect options={SANTRI.map((s) => s.nama)} placeholder="Pilih santri…" />
        </Field>
        <Field label="Tanggal kejadian">
          <Input type="date" defaultValue="2025-08-24" />
        </Field>
        <Field label="Kategori">
          <Select
            options={[...KATEGORI_PELANGGARAN]}
            value={baris.kategori}
            onChange={(e) => onKategori(e.target.value)}
          />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
        <Field label="Keterangan">
          <Textarea placeholder="Tulis kronologi singkat…" className="min-h-20" />
        </Field>
        <Field label="Foto bukti (opsional)">
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-card/60 py-5 text-center ring-1 ring-dashed ring-border">
            <Camera className="size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Ambil foto atau pilih dari galeri</p>
          </div>
        </Field>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        Pratinjau tingkat:{" "}
        <SeverityBadge level={baris.kategori as (typeof KATEGORI_PELANGGARAN)[number]} />
      </div>
    </div>
  );
}

function Pelanggaran() {
  const [tab, setTab] = useState("Catat");
  const [rows, setRows] = useState<Baris[]>([
    { id: 1, kategori: "Ringan" },
    { id: 2, kategori: "Ringan" },
  ]);
  const [next, setNext] = useState(3);

  return (
    <AppShell>
      <PageHeader
        title="Pelanggaran Santri"
        subtitle={`Bulan laporan ${BULAN_LAPORAN} · Kelas MA X-A`}
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
            lengkap tidak tersimpan dan tidak menimbulkan pesan kesalahan.
          </Banner>

          <div className="mt-4 space-y-3">
            {rows.map((b, i) => (
              <BarisCatat
                key={b.id}
                baris={b}
                index={i}
                onKategori={(v) =>
                  setRows((r) => r.map((x) => (x.id === b.id ? { ...x, kategori: v } : x)))
                }
                onHapus={() => setRows((r) => r.filter((x) => x.id !== b.id))}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setRows((r) => [...r, { id: next, kategori: "Ringan" }]);
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
      )}
    </AppShell>
  );
}
