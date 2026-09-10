import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, ShieldCheck, HelpCircle } from "lucide-react";
import { Button, Field, GlassCard, Input } from "@/components/kit";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Rapor Pondok Ma'ahid Kudus" },
      {
        name: "description",
        content:
          "Halaman masuk untuk musyrif, wali kelas, dan admin Pondok Pesantren Ma'ahid Kudus pada sistem rapor bulanan santri.",
      },
      { property: "og:title", content: "Masuk — Rapor Pondok Ma'ahid Kudus" },
      {
        property: "og:description",
        content: "Masuk sebagai musyrif, wali kelas, atau admin pondok.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="orb -left-24 -top-24 size-[440px] bg-primary/30" />
        <div className="orb -right-24 bottom-0 size-[460px] bg-primary-glow/30" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="relative grid w-full max-w-4xl gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="hidden flex-col justify-center px-2 lg:flex">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl gradient-primary font-display text-base font-bold text-primary-foreground">
              RP
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-tight">Rapor Pondok</p>
              <p className="text-sm text-muted-foreground">Ma&apos;ahid Kudus</p>
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight">
            Satu tempat untuk seluruh catatan bulanan santri.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Hafalan, ibadah, halaqoh, kesehatan, pelanggaran, dan pembayaran — terkumpul rapi lalu
            dikirim ke wali santri lewat WhatsApp.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Pengisian cepat lewat HP", "Rapor otomatis per bulan", "Pantauan pimpinan pondok"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" /> {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <GlassCard className="p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3 lg:hidden">
            <div className="grid size-11 place-items-center rounded-2xl gradient-primary font-display text-sm font-bold text-primary-foreground">
              RP
            </div>
            <div>
              <p className="font-display text-base font-semibold leading-tight">Rapor Pondok</p>
              <p className="text-xs text-muted-foreground">Ma&apos;ahid Kudus</p>
            </div>
          </div>

          <h2 className="font-display text-xl font-semibold">Masuk ke akun</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Khusus musyrif dan admin pondok. Gunakan akun yang diberikan admin.
          </p>

          <div className="mt-5 space-y-3">
            <Field label="Email atau nama pengguna">
              <Input placeholder="nama@maahid.id" />
            </Field>
            <Field label="Kata sandi">
              <Input type="password" placeholder="••••••••" />
            </Field>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="size-3.5 accent-primary" defaultChecked /> Ingat saya
              di perangkat ini
            </label>
            <Link to="/">
              <Button variant="hero" className="w-full">
                <LogIn className="size-4" /> Masuk
              </Button>
            </Link>
          </div>

          <p className="mt-5 rounded-xl bg-secondary/60 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
            Wali santri tidak memiliki akun dan tidak perlu masuk. Wali cukup membuka tautan rapor
            yang dikirim musyrif lewat WhatsApp.
          </p>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <HelpCircle className="size-3.5" /> Lupa kata sandi? Hubungi admin pondok.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
