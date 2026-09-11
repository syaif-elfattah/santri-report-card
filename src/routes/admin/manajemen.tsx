import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, GraduationCap, Upload } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Banner,
  Button,
  DataTable,
  GlassCard,
  PageHeader,
  SearchInput,
  SectionTitle,
  Select,
  Tabs,
  Td,
  Th,
} from "@/components/kit";
import { KELAS, MUSYRIF, SANTRI } from "@/lib/mock";

export const Route = createFileRoute("/admin/manajemen")({
  head: () => ({
    meta: [
      { title: "Manajemen Data — Rapor Pondok" },
      {
        name: "description",
        content:
          "Kelola data santri, kelas, pengguna, dan tahun ajaran termasuk proses kenaikan kelas di akhir tahun.",
      },
      { property: "og:title", content: "Manajemen Data — Rapor Pondok" },
      {
        property: "og:description",
        content: "Kelola santri, kelas, pengguna, dan kenaikan kelas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Manajemen,
});

const TABS = ["Santri", "Kelas", "Pengguna", "Tahun Ajaran"];

function Manajemen() {
  const [tab, setTab] = useState("Santri");

  return (
    <AppShell>
      <PageHeader
        title="Manajemen"
        subtitle="Data induk pondok — hanya admin"
        actions={
          <>
            <Button variant="outline">
              <Upload className="size-4" /> Impor Excel
            </Button>
            <Button variant="hero">
              <Plus className="size-4" /> Tambah data
            </Button>
          </>
        }
      />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "Santri" ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint={`${SANTRI.length} santri`}>Daftar santri</SectionTitle>
          <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_170px]">
            <SearchInput />
            <Select options={["Semua kelas", ...KELAS]} />
            <Select options={["Semua status", "Aktif", "Nonaktif"]} />
          </div>
          <DataTable
            head={
              <>
                <Th sortable>Nama</Th>
                <Th>Kelas</Th>
                <Th>Musyrif</Th>
                <Th>WA wali</Th>
                <Th align="center">Status</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {SANTRI.map((s) => (
              <tr key={s.nama} className="hover:bg-secondary/40">
                <Td className="font-medium">{s.nama}</Td>
                <Td>{s.kelas}</Td>
                <Td>{s.musyrif}</Td>
                <Td className={s.hpWali ? "" : "text-destructive"}>{s.hpWali || "Belum diisi"}</Td>
                <Td align="center">
                  {s.aktif ? <Badge tone="success">Aktif</Badge> : <Badge tone="muted">Nonaktif</Badge>}
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
      ) : null}

      {tab === "Kelas" ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint="Tahun ajaran 2025/2026">Daftar kelas</SectionTitle>
          <DataTable
            head={
              <>
                <Th>Kelas</Th>
                <Th>Jenjang</Th>
                <Th>Wali kelas</Th>
                <Th align="center">Jumlah santri</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {KELAS.map((k, i) => (
              <tr key={k} className="hover:bg-secondary/40">
                <Td className="font-medium">{k}</Td>
                <Td>{k.startsWith("MTs") ? "MTs" : "MA"}</Td>
                <Td>{MUSYRIF[i % MUSYRIF.length]}</Td>
                <Td align="center">{[18, 17, 12, 16][i]}</Td>
                <Td align="right">
                  <Button size="sm" variant="outline">
                    <Pencil className="size-3.5" />
                  </Button>
                </Td>
              </tr>
            ))}
          </DataTable>
        </GlassCard>
      ) : null}

      {tab === "Pengguna" ? (
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle hint="Musyrif, wali kelas, admin, pimpinan">Daftar pengguna</SectionTitle>
          <DataTable
            head={
              <>
                <Th>Nama</Th>
                <Th>Peran</Th>
                <Th>Kelas diampu</Th>
                <Th align="center">Status</Th>
                <Th align="right">Aksi</Th>
              </>
            }
          >
            {[
              ["Ust. Hasan Basri", "Musyrif · Wali Kelas", "MA X-A"],
              ["Ust. Ridwan Fauzi", "Musyrif", "MA XI-B"],
              ["Ust. Anwar Sodiq", "Musyrif", "MTs VII-A, MTs VIII-B"],
              ["Ust. Kholid", "Admin", "—"],
              ["KH. Mahfudz", "Pimpinan", "—"],
            ].map(([n, p, k]) => (
              <tr key={n} className="hover:bg-secondary/40">
                <Td className="font-medium">{n}</Td>
                <Td>
                  <Badge tone="primary">{p}</Badge>
                </Td>
                <Td>{k}</Td>
                <Td align="center">
                  <Badge tone="success">Aktif</Badge>
                </Td>
                <Td align="right">
                  <Button size="sm" variant="outline">
                    <Pencil className="size-3.5" />
                  </Button>
                </Td>
              </tr>
            ))}
          </DataTable>
        </GlassCard>
      ) : null}

      {tab === "Tahun Ajaran" ? (
        <div className="space-y-4">
          <Banner
            tone="warning"
            title="Naik Kelas adalah proses massal sekali klik untuk semua santri aktif"
          >
            Susun pemetaan kelas asal ke kelas tujuan di bawah, lalu jalankan sekali — seluruh
            santri berpindah bersamaan ke tahun ajaran baru. Riwayat lama tetap terikat pada kelas
            dan tahun ajaran sebelumnya.
          </Banner>

          <GlassCard className="p-4 sm:p-5">
            <SectionTitle hint="2025/2026 → 2026/2027">Pemetaan kenaikan kelas</SectionTitle>
            <DataTable
              head={
                <>
                  <Th>Kelas asal</Th>
                  <Th align="center">Santri aktif</Th>
                  <Th>Kelas tujuan (tahun ajaran baru)</Th>
                </>
              }
            >
              {[
                { asal: "MTs VII-A", jumlah: 18, tujuan: "MTs VIII-A", lulus: false },
                { asal: "MTs VIII-B", jumlah: 17, tujuan: "MTs IX-B", lulus: false },
                { asal: "MTs IX-A", jumlah: 15, tujuan: "Lulus", lulus: true },
                { asal: "MA X-A", jumlah: 12, tujuan: "MA XI-A", lulus: false },
                { asal: "MA XI-B", jumlah: 16, tujuan: "MA XII-B", lulus: false },
                { asal: "MA XII-A", jumlah: 14, tujuan: "Lulus", lulus: true },
              ].map((r) => (
                <tr key={r.asal} className="hover:bg-secondary/40">
                  <Td className="font-medium">{r.asal}</Td>
                  <Td align="center">{r.jumlah}</Td>
                  <Td>
                    {r.lulus ? (
                      <div className="flex items-center gap-2">
                        <Badge tone="primary">Ditandai LULUS</Badge>
                        <span className="text-xs text-muted-foreground">
                          jenjang akhir — keluar dari status aktif
                        </span>
                      </div>
                    ) : (
                      <Select
                        className="w-48"
                        options={[r.tujuan, "MTs VIII-A", "MTs IX-B", "MA XI-A", "MA XII-B", "Lulus"]}
                      />
                    )}
                  </Td>
                </tr>
              ))}
            </DataTable>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="warning">
                <GraduationCap className="size-4" /> Proses Naik Kelas semua santri
              </Button>
              <span className="text-xs text-muted-foreground">
                92 santri aktif akan diproses sekaligus · 29 santri ditandai lulus
              </span>
            </div>
          </GlassCard>
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle>Daftar tahun ajaran</SectionTitle>
            <DataTable
              head={
                <>
                  <Th>Tahun ajaran</Th>
                  <Th align="center">Status</Th>
                  <Th align="center">Jumlah santri</Th>
                  <Th align="right">Aksi</Th>
                </>
              }
            >
              {[
                ["2025/2026", "Aktif", 63],
                ["2024/2025", "Arsip", 58],
                ["2023/2024", "Arsip", 54],
              ].map(([t, s, j]) => (
                <tr key={String(t)} className="hover:bg-secondary/40">
                  <Td className="font-medium">{t}</Td>
                  <Td align="center">
                    {s === "Aktif" ? <Badge tone="success">Aktif</Badge> : <Badge tone="muted">Arsip</Badge>}
                  </Td>
                  <Td align="center">{j}</Td>
                  <Td align="right">
                    <Button size="sm" variant="outline">
                      Lihat
                    </Button>
                  </Td>
                </tr>
              ))}
            </DataTable>
          </GlassCard>
        </div>
      ) : null}
    </AppShell>
  );
}
