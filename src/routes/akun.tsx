import { createFileRoute } from "@tanstack/react-router";
import { Save, KeyRound, LogOut } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Badge,
  Button,
  Field,
  GlassCard,
  Input,
  PageHeader,
  SectionTitle,
} from "@/components/kit";

export const Route = createFileRoute("/akun")({
  head: () => ({
    meta: [
      { title: "Akun Saya — Rapor Pondok" },
      {
        name: "description",
        content:
          "Kelola data akun pengguna sistem rapor pondok: nama, nomor kontak, kata sandi, dan preferensi tampilan.",
      },
      { property: "og:title", content: "Akun Saya — Rapor Pondok" },
      {
        property: "og:description",
        content: "Kelola nama, kontak, dan kata sandi akun Anda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Akun,
});

function Akun() {
  return (
    <AppShell>
      <PageHeader title="Akun Saya" subtitle="Data pribadi dan keamanan masuk" />

      <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        <GlassCard className="h-fit p-5 text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full gradient-primary font-display text-xl font-bold text-primary-foreground">
            HB
          </div>
          <p className="mt-3 font-display text-lg font-semibold">Ust. Hasan Basri</p>
          <p className="text-sm text-muted-foreground">hasan.basri@maahid.id</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge tone="primary">Musyrif</Badge>
            <Badge tone="muted">Wali Kelas MA X-A</Badge>
          </div>
          <div className="mt-5 space-y-2 text-left">
            <div className="glass-soft flex justify-between rounded-xl px-3 py-2 text-sm">
              <span className="text-muted-foreground">Santri diampu</span>
              <span className="font-medium">12</span>
            </div>
            <div className="glass-soft flex justify-between rounded-xl px-3 py-2 text-sm">
              <span className="text-muted-foreground">Tahun ajaran</span>
              <span className="font-medium">2025/2026</span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle>Data diri</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nama lengkap">
                <Input defaultValue="Hasan Basri" />
              </Field>
              <Field label="Nama panggilan">
                <Input defaultValue="Ust. Hasan" />
              </Field>
              <Field label="Email">
                <Input defaultValue="hasan.basri@maahid.id" />
              </Field>
              <Field label="Nomor WhatsApp">
                <Input defaultValue="081234500011" />
              </Field>
            </div>
            <div className="mt-4">
              <Button variant="hero">
                <Save className="size-4" /> Simpan perubahan
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5">
            <SectionTitle hint="Minimal 8 karakter">Ubah kata sandi</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Kata sandi lama">
                <Input type="password" defaultValue="password" />
              </Field>
              <Field label="Kata sandi baru">
                <Input type="password" />
              </Field>
              <Field label="Ulangi kata sandi">
                <Input type="password" />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>
                <KeyRound className="size-4" /> Perbarui kata sandi
              </Button>
              <Button variant="ghost">
                <LogOut className="size-4" /> Keluar dari semua perangkat
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
