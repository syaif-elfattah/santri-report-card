export const BULAN_LAPORAN = "Agustus 2025";
export const HARI_INI = "8 September 2025";

export type Santri = {
  nama: string;
  kelas: string;
  musyrif: string;
  hpWali: string;
  aktif: boolean;
};

export const KELAS = ["MTs VII-A", "MTs VIII-B", "MA X-A", "MA XI-B"];

export const MUSYRIF = ["Ust. Hasan Basri", "Ust. Ridwan Fauzi", "Ust. Anwar Sodiq"];

export const SANTRI: Santri[] = [
  { nama: "Abdullah Fauzi", kelas: "MA X-A", musyrif: "Ust. Hasan Basri", hpWali: "081234567801", aktif: true },
  { nama: "Ahmad Fauzan Ramadhan", kelas: "MA X-A", musyrif: "Ust. Hasan Basri", hpWali: "081234567802", aktif: true },
  { nama: "Bilal Ramadhan", kelas: "MA X-A", musyrif: "Ust. Hasan Basri", hpWali: "081234567803", aktif: true },
  { nama: "Citra Ananda", kelas: "MA X-A", musyrif: "Ust. Hasan Basri", hpWali: "", aktif: true },
  { nama: "Farhan Maulana", kelas: "MA X-A", musyrif: "Ust. Hasan Basri", hpWali: "081234567805", aktif: true },
  { nama: "Nur Aini Salsabila", kelas: "MA XI-B", musyrif: "Ust. Ridwan Fauzi", hpWali: "081234567806", aktif: true },
  { nama: "Rizky Pratama", kelas: "MA XI-B", musyrif: "Ust. Ridwan Fauzi", hpWali: "081234567807", aktif: true },
  { nama: "Yusuf Al-Fikri", kelas: "MTs VIII-B", musyrif: "Ust. Anwar Sodiq", hpWali: "081234567808", aktif: true },
  { nama: "Zaid Abdurrahman", kelas: "MTs VII-A", musyrif: "Ust. Anwar Sodiq", hpWali: "081234567809", aktif: false },
];

export const KATEGORI_PELANGGARAN = ["Ringan", "Sedang", "Berat", "Sangat Berat"] as const;
export type KategoriPelanggaran = (typeof KATEGORI_PELANGGARAN)[number];

export const PELANGGARAN = [
  { nama: "Bilal Ramadhan", tanggal: "03/08/2025", kategori: "Sangat Berat" as KategoriPelanggaran, deskripsi: "Keluar pondok tanpa izin bermalam", foto: true },
  { nama: "Abdullah Fauzi", tanggal: "07/08/2025", kategori: "Sedang" as KategoriPelanggaran, deskripsi: "Tidak mengikuti halaqoh subuh 3 kali", foto: false },
  { nama: "Rizky Pratama", tanggal: "12/08/2025", kategori: "Ringan" as KategoriPelanggaran, deskripsi: "Terlambat masuk kelas", foto: false },
  { nama: "Farhan Maulana", tanggal: "19/08/2025", kategori: "Berat" as KategoriPelanggaran, deskripsi: "Membawa alat elektronik terlarang", foto: true },
  { nama: "Ahmad Fauzan Ramadhan", tanggal: "24/08/2025", kategori: "Ringan" as KategoriPelanggaran, deskripsi: "Piket kamar tidak dikerjakan", foto: false },
];

export const HALAQOH = [
  { nama: "Abdullah Fauzi", sakit: 1, izin: 0, alpa: 0 },
  { nama: "Ahmad Fauzan Ramadhan", sakit: 0, izin: 2, alpa: 0 },
  { nama: "Bilal Ramadhan", sakit: 0, izin: 1, alpa: 3 },
  { nama: "Citra Ananda", sakit: 4, izin: 0, alpa: 0 },
  { nama: "Farhan Maulana", sakit: 0, izin: 0, alpa: 1 },
];

export const HAFALAN = [
  { nama: "Abdullah Fauzi", surat: "Al-Mulk", ayat: 30, juz: 29 },
  { nama: "Ahmad Fauzan Ramadhan", surat: "Al-Kahf", ayat: 11, juz: 15 },
  { nama: "Bilal Ramadhan", surat: "", ayat: null, juz: null },
  { nama: "Citra Ananda", surat: "Al-Waqi'ah", ayat: 78, juz: 27 },
  { nama: "Farhan Maulana", surat: "An-Naba'", ayat: 40, juz: 30 },
];

export const IBADAH = [
  { nama: "Abdullah Fauzi", tdkJamaah: 2, tahajjud: 18, qobliyah: 22, puasa: 4, dhuha: 20 },
  { nama: "Ahmad Fauzan Ramadhan", tdkJamaah: 0, tahajjud: 25, qobliyah: 27, puasa: 8, dhuha: 26 },
  { nama: "Bilal Ramadhan", tdkJamaah: 6, tahajjud: 5, qobliyah: 9, puasa: 1, dhuha: 6 },
  { nama: "Citra Ananda", tdkJamaah: 1, tahajjud: 12, qobliyah: 20, puasa: 3, dhuha: 14 },
  { nama: "Farhan Maulana", tdkJamaah: 3, tahajjud: 9, qobliyah: 15, puasa: 2, dhuha: 11 },
];

export const KESEHATAN = [
  { nama: "Citra Ananda", tanggal: "05/08/2025", sakit: "Demam tinggi", penanganan: "Istirahat di UKS, paracetamol", keterangan: "Dijemput wali 2 hari" },
  { nama: "Citra Ananda", tanggal: "21/08/2025", sakit: "Batuk pilek", penanganan: "Obat dari klinik pondok", keterangan: "" },
  { nama: "Abdullah Fauzi", tanggal: "11/08/2025", sakit: "Luka di kaki", penanganan: "Dibersihkan & diperban", keterangan: "Kontrol 3 hari" },
  { nama: "Bilal Ramadhan", tanggal: "18/08/2025", sakit: "Maag kambuh", penanganan: "Obat maag, makan teratur", keterangan: "" },
];

export const PEMBAYARAN = [
  { nama: "Abdullah Fauzi", jenjang: "MA", kelas: "MA X-A", tagPondok: 0, tagJenjang: 250000, du: 0, ujian: 150000, spp: [0, 0, 0, 0, 0, 175000, 175000, 175000, 0, 0, 0, 0] },
  { nama: "Ahmad Fauzan Ramadhan", jenjang: "MA", kelas: "MA X-A", tagPondok: 0, tagJenjang: 0, du: 0, ujian: 0, spp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { nama: "Bilal Ramadhan", jenjang: "MA", kelas: "MA X-A", tagPondok: 400000, tagJenjang: 250000, du: 300000, ujian: 150000, spp: [0, 0, 175000, 175000, 175000, 175000, 175000, 175000, 0, 0, 0, 0] },
  { nama: "Yusuf Al-Fikri", jenjang: "MTs", kelas: "MTs VIII-B", tagPondok: 0, tagJenjang: 120000, du: 0, ujian: 100000, spp: [0, 0, 0, 0, 0, 0, 150000, 150000, 0, 0, 0, 0] },
];

export const BULAN_SPP = ["Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

export const LAPORAN_WALI = [
  { nama: "Abdullah Fauzi", belum: [] as string[], dikecualikan: null as string | null },
  { nama: "Ahmad Fauzan Ramadhan", belum: [], dikecualikan: null },
  { nama: "Bilal Ramadhan", belum: ["Hafalan", "Ibadah"], dikecualikan: null },
  { nama: "Citra Ananda", belum: ["Halaqoh"], dikecualikan: null },
  { nama: "Farhan Maulana", belum: [], dikecualikan: "Pulang sakit 2 minggu" },
];

export const MASUKAN_KATEGORI = [
  "Pelanggaran",
  "Halaqoh",
  "Hafalan",
  "Ibadah",
  "Kesehatan",
  "Pembayaran",
  "Pelaporan",
  "Lainnya",
];

export const MASUKAN = [
  { kategori: "Hafalan", pesan: "Mohon daftar surat bisa dicari dengan mengetik.", tanggal: "02/09/2025", dari: "Ust. Hasan Basri", dibaca: false },
  { kategori: "Pembayaran", pesan: "Kolom SPP terlalu banyak, susah digeser di HP.", tanggal: "04/09/2025", dari: "Ust. Ridwan Fauzi", dibaca: false },
  { kategori: "Pelaporan", pesan: "Terima kasih, tombol Kirim WA sangat membantu.", tanggal: "06/09/2025", dari: "Ust. Anwar Sodiq", dibaca: true },
];

export const MONITORING_KELAS = [
  { kelas: "MTs VII-A", musyrif: "Ust. Anwar Sodiq", sudah: 18, total: 18, telat: false, belum: [], dikecualikan: [] as { nama: string; alasan: string }[] },
  { kelas: "MTs VIII-B", musyrif: "Ust. Anwar Sodiq", sudah: 14, total: 17, telat: false, belum: ["Yusuf Al-Fikri", "Hamzah Ali", "Ilham Nur"], dikecualikan: [{ nama: "Salman Hadi", alasan: "Izin umroh keluarga" }] },
  { kelas: "MA X-A", musyrif: "Ust. Hasan Basri", sudah: 8, total: 12, telat: true, belum: ["Bilal Ramadhan", "Citra Ananda", "Dimas Arya", "Erlangga Putra"], dikecualikan: [{ nama: "Farhan Maulana", alasan: "Pulang sakit 2 minggu" }] },
  { kelas: "MA XI-B", musyrif: "Ust. Ridwan Fauzi", sudah: 15, total: 16, telat: false, belum: ["Rizky Pratama"], dikecualikan: [] },
];

export const PRESET_TANGGAL = [
  "Bulan Ini",
  "Bulan Lalu",
  "3 Bulan",
  "Semester",
  "1 Tahun",
  "Kustom",
];

export const rupiah = (n: number) => (n === 0 ? "-" : "Rp" + n.toLocaleString("id-ID"));
