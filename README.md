# Rapor Santri Ceria

# Dokumentasi Lengkap Sistem "Rapor Pondok"



> **PETUNJUK PENTING UNTUK YANG MEMBACA DOKUMEN INI (termasuk AI lain):**

> Dokumen ini dibuat khusus untuk keperluan **REDESAIN TAMPILAN**. Tujuannya

> HANYA mengubah tampilan visual dan tata letak (layout) supaya sistem lebih

> enak dipakai (user-friendly) dan menarik dilihat.

>

> **JANGAN UBAH SISTEM SAMA SEKALI** -- yang dimaksud "sistem" di sini:

> - Alur kerja/logika bisnis (siapa boleh apa, kapan sesuatu terjadi)

> - Data apa yang disimpan dan bagaimana strukturnya

> - Nama field, nama kolom, dan makna tiap data

> - Aturan validasi dan perhitungan (rumus, kondisi, batas waktu)

> - Fungsi setiap tombol dan apa yang terjadi saat diklik

>

> Yang BOLEH dan MEMANG DIHARAPKAN berubah: warna, jenis huruf, bentuk

> tombol/kartu, tata letak (grid, spacing, urutan visual), ikon, animasi/transisi,

> dan hal-hal estetika lainnya -- selama semua INFORMASI dan FUNGSI yang

> disebutkan di bawah tetap ada dan bisa diakses.



---



## 1. Tentang Sistem Ini



**Nama**: Rapor Pondok

**Institusi**: Pondok Pesantren Ma'ahid Kudus, Jawa Tengah

**Fungsi utama**: Mencatat perkembangan bulanan santri (hafalan, ibadah, kehadiran

halaqoh, kesehatan, pelanggaran, pembayaran) lalu mengirim laporannya ke wali

santri lewat WhatsApp.



**Dua peran pengguna:**

- **Musyrif** -- guru/pembimbing yang mengampu santri di kelas tertentu. Tugas

  hariannya: mencatat data bulanan, mengirim laporan ke wali.

- **Admin** -- mengelola data induk (tahun ajaran, kelas, musyrif, santri),

  memantau progres semua musyrif, dan yang boleh mencetak/mengunduh template.



**Konsep "bulan laporan" yang penting**: Sistem SELALU bekerja mundur 1 bulan

-- kalau hari ini bulan September, maka "bulan laporan" yang sedang aktif

adalah Agustus (karena laporan bulan Agustus baru dikerjakan sepanjang

September). ada tanggal 15 sebagai batas -- lewat tanggal itu, status berubah

dari "normal" (kuning) jadi "darurat" (merah).



---



## 2. Struktur Navigasi (Sidebar & Navbar)



### Sidebar (menu kiri, selalu terlihat di desktop)

Daftar menu dari atas ke bawah:

1. Beranda

2. Pelanggaran

3. Absen Halaqoh & KBM

4. Hafalan Santri

5. Ibadah Santri

6. Kesehatan Santri

7. Pembayaran

8. Laporan Wali Santri

9. Template Cetak & Excel

10. Masukan & Saran

11. *(garis pemisah)*

12. Manajemen -- **HANYA muncul untuk Admin**

13. Monitoring Laporan -- **HANYA muncul untuk Admin**



Di paling bawah sidebar: nama pengguna yang sedang login, perannya (Admin/Musyrif),

tombol ganti tema (terang/gelap), dan tombol Keluar (logout).



Setiap item sidebar sudah punya ikon spesifik (contoh: rumah untuk Beranda,

segitiga peringatan untuk Pelanggaran, buku untuk Absen Halaqoh, hati untuk

Ibadah, dompet untuk Pembayaran, dsb).



### Navbar atas / Hamburger (mobile)

Di layar sempit (HP), sidebar disembunyikan dan diganti tombol hamburger (☰)

di pojok kiri atas yang membuka sidebar sebagai panel yang muncul dari kiri

(drawer), menutupi sebagian layar dengan overlay gelap di belakangnya. Ada

tombol close (X) untuk menutupnya lagi.



### Logout

Klik tombol Keluar di sidebar -> sesi berakhir -> diarahkan ke halaman Login.



---



## 3. Halaman Login (`/login`)



**Siapa yang akses**: Siapa saja yang belum login (baik admin maupun musyrif

memakai halaman yang sama).



**Elemen di halaman**:

- Input "Nomor WhatsApp" (format 08xxxxxxxxxx)

- Input "Kata Sandi" (password, disembunyikan)

- Tombol "Masuk"



**Cara kerja sistem**:

- Nomor WA dicocokkan ke data pengguna (admin atau musyrif) di database.

- Ada pembatas percobaan: maksimal 5 kali percobaan login per nomor per menit

  (mencegah brute-force). Kalau kelebihan, pengguna harus tunggu.

- Kalau berhasil, diarahkan ke halaman Beranda (`/dashboard`).

- Peran pengguna (admin/musyrif) otomatis menentukan menu apa saja yang

  muncul di sidebar setelah login.



---



## 4. Halaman Beranda / Dashboard (`/dashboard`)



**Siapa yang akses**: Semua pengguna yang sudah login (isinya beda tergantung peran).



**Sapaan**: Di bagian atas ada sapaan sesuai waktu ("Selamat pagi/siang/sore/

malam") + nama pengguna.



**Khusus untuk Musyrif** -- ada kartu reminder otomatis yang isinya:

- Jumlah santri yang sudah dikirimkan laporannya bulan ini (dari yang diampu)

- Kelas mana yang belum dipublikasikan

- Kalau ada santri yang belum lengkap nomor WA wali-nya

- Warna kartu berubah: netral/kuning kalau masih dalam masa wajar (sebelum

  tanggal 15), berubah merah/darurat kalau sudah lewat tanggal 15 dan masih

  ada yang belum beres.



**Banner "Panduan Musyrif Lengkap"** -- kotak highlight yang mengarahkan ke

halaman Panduan, isinya ringkasan "step-by-step semua tugas bulanan".



**Bagian "Pencatatan bulanan"** -- grid berisi tautan cepat ke:

- Catat Pelanggaran

- Absen Halaqoh & KBM

- Catat Hafalan

- Catat Ibadah

- Catat Kesehatan

- Pembayaran



Setiap kotak punya ikon, judul, dan deskripsi singkat 1 baris.



**Bagian "Laporan & administrasi"** -- daftar (list, bukan grid) berisi:

- Laporan Wali Santri

- Masukan & Saran

- Manajemen (khusus admin)

- Monitoring Laporan (khusus admin)



**Bagian terpisah "Alat bantu" (ditandai label "opsional")** -- SENGAJA dipisah

secara visual (garis putus-putus di sekitarnya) dari 2 bagian di atas, supaya

pengguna tidak mengira ini bagian dari tugas wajib bulanan:

- Template Cetak & Excel



---



## 5. Halaman Pelanggaran (`/pelanggaran`)



**Siapa yang akses**: Musyrif (kelas yang diampu) dan Admin (semua kelas).



Halaman ini punya **2 tab**: "Catat" dan "Laporan".



### Tab Catat

- Dropdown pilih kelas

- Form tambah baris pelanggaran baru, tiap baris berisi:

  - Nama santri (dropdown yang **bisa diketik untuk mencari**, bukan dropdown

    biasa -- penting kalau kelasnya banyak santri)

  - Tanggal kejadian

  - Kategori: Ringan / Sedang / Berat / Sangat Berat (pilihan, masing-masing

    ditampilkan dengan warna badge yang beda)

  - Deskripsi pelanggaran (teks bebas)

  - Foto bukti (opsional, upload gambar)

- Tombol "+ Tambah baris" untuk menambah form baru

- Tombol "Simpan semua" untuk submit sekaligus

- Di bawah form: **riwayat pelanggaran** kelas itu, ditampilkan sebagai daftar

  dengan badge kategori berwarna per item



### Tab Laporan

- Filter: kelas, nama santri (dropdown bisa diketik), preset rentang tanggal

  (Bulan Ini / Bulan Lalu / 3 Bulan / Semester / 1 Tahun / Kustom)

- Ringkasan jumlah pelanggaran per kategori (Ringan/Sedang/Berat/Sangat Berat)

  ditampilkan sebagai angka besar

- Tabel detail yang bisa diurutkan (klik judul kolom = urutkan; tahan Shift +

  klik kolom lain = urutkan berdasar 2 kolom sekaligus)

- Tombol "Export Excel" untuk mengunduh rekap

- Klik satu baris untuk melihat detail lengkap termasuk foto (kalau ada)



---



## 6. Halaman Absen Halaqoh & KBM (`/halaqoh`)



**Siapa yang akses**: Musyrif dan Admin.



**Isi halaman**:

- Dropdown pilih kelas

- Tabel berisi SEMUA santri aktif di kelas itu, dengan 3 kolom isian angka:

  **Sakit**, **Izin**, **Alpa** (jumlah hari dalam sebulan)

- Data ini bersifat rekap bulanan -- bisa diisi kapan saja sepanjang bulan,

  dan diupdate terus (bukan sekali isi lalu terkunci)

- Bisa diisi manual satu-satu, atau (secara konsep) tempel dari Excel/spreadsheet



---



## 7. Halaman Hafalan Santri (`/hafalan`)



**Siapa yang akses**: Musyrif dan Admin.



**Isi halaman**:

- Dropdown pilih kelas

- Tabel semua santri, dengan kolom:

  - **Surat** (nama surat dalam Al-Qur'an, dipilih dari daftar 114 surat)

  - **Ayat** (nomor ayat)

- Sistem otomatis menghitung **Juz** berdasarkan surat+ayat yang diisi

  (berdasarkan pembagian Mushaf Madinah standar) -- musyrif TIDAK perlu

  menghitung manual.

- Yang dicatat adalah **posisi hafalan TERAKHIR/TERBARU** santri bulan itu

  (bukan "tambahan sebulan ini") -- kalau santri belum menambah hafalan baru

  bulan itu, baris boleh dikosongkan.



---



## 8. Halaman Ibadah Santri (`/ibadah`)



**Siapa yang akses**: Musyrif dan Admin.



**Isi halaman**:

- Dropdown pilih kelas

- Tabel semua santri dengan 5 kolom isian angka (jumlah hari dalam sebulan):

  **Tdk Jamaah**, **Tahajjud**, **Qobliyah Subuh**, **Puasa Sunnah**, **Dhuha**



---



## 9. Halaman Kesehatan Santri (`/kesehatan`)



**Siapa yang akses**: Musyrif dan Admin.



Halaman ini juga punya **2 tab**: "Catat kesehatan" dan "Laporan". BEDA

mendasar dari modul lain: ini **bukan rekap bulanan**, tapi **catatan per

KEJADIAN** -- 1 santri bisa punya beberapa catatan sepanjang bulan (misal

sakit 2x dalam sebulan = 2 baris catatan terpisah).



### Tab Catat kesehatan

- Dropdown pilih kelas

- Form tambah catatan baru per baris:

  - Nama santri (dropdown bisa diketik)

  - Tanggal kejadian

  - Sakit apa (teks)

  - Penanganan yang diberikan (teks)

  - Keterangan tambahan (opsional)

- Riwayat kesehatan kelas itu ditampilkan di bawah form



### Tab Laporan

- Filter kelas, nama santri (bisa diketik), preset tanggal

- Tabel ringkasan: nama santri, kelas, **jumlah catatan** (bukan breakdown

  kategori seperti Pelanggaran -- kesehatan tidak punya tingkat keparahan)

- Tabel detail (tanggal, sakit apa, penanganan, keterangan), bisa diurutkan

- Tombol Export Excel



---



## 10. Halaman Pembayaran (`/pembayaran`)



**Siapa yang akses**: Musyrif (lihat kelas yang diampu) dan Admin (semua +

boleh import data).



**Cara data masuk**: Admin mengimpor file Excel "Tagihan 1 Tahun" dari

bendahara pondok (ada 2 kategori jenjang: MTs atau MA, diimpor terpisah).

Import ULANG aman dilakukan -- data lama otomatis ter-update, tidak

menduplikat.



**Elemen filter**:

- Dropdown pilih kelas ("Semua kelas" sebagai default)

- Kotak pencarian nama santri (mengetik langsung menyaring tabel)

- Dropdown "Sampai bulan" (menentukan sampai bulan apa tagihan dihitung)



**Tabel** (lebar, banyak kolom, bisa di-scroll horizontal):

- Nama santri, Jenjang, Kelas

- Kolom-kolom jenis tagihan: Tag. Pondok MTs, Tag. MTs, Tag. Pondok MA,

  Tag. MA, DU (Dana Usaha) Siswa Baru, DU Naik Kelas, Ujian, SPP per bulan

  (12 bulan ditampilkan), dan sejenisnya

- Setiap sel isinya angka (kalau ada kekurangan bayar) atau tanda "-" (kalau

  sudah lunas)

- Kolom bisa diurutkan (klik header, shift+klik untuk multi-kolom)

- Baris "Total keseluruhan" di paling bawah tabel, otomatis menyesuaikan

  kalau sedang difilter/dicari



---



## 11. Halaman Laporan Wali Santri (`/laporan-wali`)



**Siapa yang akses**: Musyrif (kelasnya) dan Admin (semua kelas). Ini halaman

INTI untuk mengirim hasil rekap bulanan ke orang tua/wali santri.



**Kontrol atas**:

- Dropdown pilih kelas

- Navigasi geser bulan (tombol kiri/kanan)



**Banner status publikasi**:

- Kalau bulan itu BELUM dipublikasikan untuk kelas tsb: muncul banner kuning

  "Bulan ini belum dipublikasikan" + tombol "Publikasikan bulan ini".

  Publikasi ini yang memungkinkan wali mengecek laporan secara mandiri lewat

  halaman Cek Laporan (lihat bagian 16) kapan pun mereka mau.



**Daftar santri di kelas itu**, tiap baris punya:

- Nama santri

- Badge kuning peringatan kalau ada modul yang **belum diisi** untuk bulan

  itu (contoh: "Belum diisi: Hafalan, Ibadah, Halaqoh")

- Ikon mata -- untuk **preview** laporan lengkap santri itu langsung di

  halaman ini (tanpa perlu unduh dulu)

- Tombol "Download PDF" -- unduh laporan PDF gabungan (Hafalan + Ibadah +

  Absensi + Kedisiplinan + Kesehatan + Pembayaran) untuk santri itu

- Tombol "Kirim WA" -- membuka WhatsApp dengan pesan siap kirim + link PDF

  laporan, LANGSUNG ke nomor WA wali santri tersebut (personal, satu-satu).

  Ini bisa dilakukan KAPAN SAJA, tidak perlu menunggu publikasi kelas.

- Ikon "kecualikan" (silang orang) -- untuk menandai santri TIDAK perlu

  direkap bulan itu (misal sedang pulang lama karena sakit), dengan mengisi

  alasan singkat. Santri yang dikecualikan namanya tercoret di daftar, ada

  keterangan "Dikecualikan: [alasan]" + tombol "Batalkan pengecualian" untuk

  membatalkan kalau ternyata datanya sudah ada.



**Catatan teknis penting (jangan berubah)**: PDF dibuat ON-THE-FLY setiap

kali diklik/dibuka -- BUKAN file yang dibuat sekali lalu disimpan. Artinya

kalau data diedit setelah link dikirim, link yang SAMA (kalau dibuka lagi)

akan otomatis menampilkan data TERBARU, tidak perlu kirim ulang.



---



## 12. Halaman Template Cetak & Excel (`/template-cetak`)



**Siapa yang akses**: Musyrif dan Admin (tombol PDF khusus admin, Excel untuk semua).



**Tujuan**: Alat bantu OPSIONAL bagi musyrif yang lebih nyaman mengisi data

di kertas/Excel dulu sebelum dipindah ke sistem. Cakupannya HANYA 3 modul:

Hafalan, Absen Halaqoh & KBM, Ibadah (TIDAK termasuk Kesehatan, Pelanggaran,

Pembayaran).



**2 mode pemilihan** (tab):

1. **Per Kelas** -- checklist semua kelas (menampilkan nama musyrif pengampu

   + jumlah santri per kelas). Ada tombol cepat "pilih semua kelas milik

   musyrif X" kalau ada lebih dari 1 musyrif.

2. **Per Santri yang Diampu** -- checklist musyrif (admin bisa pilih musyrif

   manapun, musyrif hanya bisa pilih dirinya sendiri). Isi templatenya PERSIS

   santri yang diampu orang itu lewat data supervisi -- PENTING: kalau

   musyrif itu mengampu santri yang tersebar di beberapa kelas berbeda, hasil

   akhirnya tetap DIPECAH per kelas (tidak digabung rata), karena pencatatan

   modul memang berbasis sesi per-kelas.



**Tombol aksi**:

- "Download PDF" (khusus admin) -- 1 file PDF gabungan, orientasi landscape,

  tiap kelompok (kelas, atau kombinasi musyrif+kelas) mulai di halaman baru,

  maksimal 2 halaman per kelompok kalau santrinya banyak. Kop tiap halaman

  jelas menyebutkan Kelas (jenjang+label) dan Musyrif pengampu. Kolomnya

  dikelompokkan 3 bagian: Hafalan (Surat, Ayat), Absen Halaqoh & KBM (Sakit,

  Izin, Alpa), Ibadah (Tdk Jamaah, Tahajjud, Qob. Subuh, Puasa Sunnah, Dhuha)

  -- nama+nomor terisi, kolom lain kosong untuk ditulis tangan.

- "Download Excel" -- BUKAN 1 file gabungan, tapi FILE TERPISAH per kelas

  (nama file mengikuti nama kelas atau nama musyrif tergantung mode yang

  dipakai) -- alasannya file ini biasanya diteruskan satu-satu ke musyrif

  masing-masing, jadi tiap orang cukup terima file miliknya sendiri.



---



## 13. Halaman Masukan & Saran (`/masukan`)



**Siapa yang akses**: Semua pengguna bisa mengirim; Admin bisa melihat SEMUA

masukan dari semua musyrif, musyrif hanya melihat riwayat masukannya sendiri.



**Form pengiriman**:

- 8 pilihan kategori (chip/tombol pilihan): Pelanggaran, Halaqoh, Hafalan,

  Ibadah, Kesehatan, Pembayaran, Pelaporan, Lainnya

- Kotak teks pesan

- Tombol "Kirim"



**Riwayat**:

- Musyrif: melihat daftar masukan yang PERNAH dia kirim sendiri

- Admin: melihat SEMUA masukan dari semua musyrif, dengan badge jumlah yang

  BELUM dibaca + titik indikator merah di menu sidebar. Klik satu masukan

  otomatis menandainya sebagai sudah dibaca.



---



## 14. Halaman Panduan (`/panduan`)



**Siapa yang akses**: Semua pengguna (isinya sama, panduan untuk musyrif).



**Bentuk tampilan**: Timeline vertikal bersambung (garis menyambung antar

bagian, dengan penanda/marker di tiap bagian) -- BUKAN kumpulan kartu terpisah.



**Isi, berurutan**:

1. **Bagian 1 -- Persiapan**: pastikan data santri lengkap, terutama nomor WA

   wali (WAJIB, karena laporan hanya sampai kalau nomornya benar). Ada tautan

   langsung ke halaman Santri.

2. **Bagian 2 -- Sepanjang bulan**: isi Absen Halaqoh & KBM (bisa kapan saja,

   update terus, bisa tempel dari Excel), isi Hafalan (posisi TERAKHIR, bukan

   tambahan, boleh kosong kalau belum ada perkembangan), isi Ibadah (sama

   pola dengan Halaqoh). Ada sub-bagian terpisah untuk Catat Kesehatan

   (dijelaskan bedanya dari 3 modul di atas: ini per-kejadian, bukan rekap

   bulanan).

3. **(Sisipan) Santri yang gak bisa direkap bulan ini -- Kecualikan**:

   penjelasan fitur pengecualian, dan konsekuensinya (tidak kena tanda

   "belum lengkap", tidak dihitung "belum terkirim" di monitoring, dan tetap

   TIDAK terlihat wali walau kelasnya sudah dipublikasikan).

4. **Bagian 3 -- Sebelum kirim**: cek kelengkapan data di halaman Laporan

   Wali Santri (tanda kuning "Belum diisi" sebagai penanda), bisa preview

   dulu (klik nama santri) sebelum mengunduh.

5. **Bagian 4 -- Kirim ke wali**: klik "Publikasikan bulan ini" (supaya wali

   BISA cek mandiri lewat Cek Laporan kalau suatu saat perlu), lalu kirim

   dengan klik "Kirim WA" di tiap santri (bisa kapan saja, tidak perlu

   menunggu publikasi).

6. **Bagian 5 -- Pantau**: cek reminder otomatis di Beranda.



---



## 15. Halaman Admin: Manajemen (`/admin/tahun-ajaran`, dst.)



**Siapa yang akses**: KHUSUS Admin.



Ini kumpulan **5 tab** dalam 1 area "Manajemen":



### Tab Tahun Ajaran

- Buat tahun ajaran baru, tandai mana yang AKTIF (hanya 1 yang aktif dalam

  satu waktu -- ini menentukan data mana yang dipakai di seluruh sistem)



### Tab Kelas

- CRUD (tambah/edit/nonaktifkan) kelas: jenjang (MA/MTs) + label (contoh "X-A")



### Tab Musyrif

- CRUD data musyrif: nama, nomor HP (untuk login DAN untuk menerima reminder

  WA dari admin)



### Tab Santri

- Form tambah santri baru: nama lengkap, kelas (dropdown bisa diketik),

  musyrif pengampu (dropdown bisa diketik), nomor WA wali

- Import Excel massal (kolom: nama, kelas, musyrif, no_hp_wali opsional).

  Kelas & musyrif WAJIB sudah ada duluan di sistem. Santri yang namanya

  sudah ada otomatis di-UPDATE (bukan dobel).

- Kotak pencarian nama santri (menyaring daftar secara langsung)

- Filter kelas

- Daftar santri dalam tabel: nama, kelas, musyrif, no. HP wali, status

  (Aktif/Nonaktif), tombol Edit per baris (inline, langsung di tabel)



### Tab Naik Kelas

- Proses kenaikan kelas di akhir tahun ajaran -- pilih kelas asal & kelas

  tujuan, santri berpindah otomatis ke tahun ajaran baru sambil riwayat data

  lama (nilai, catatan) tetap terikat ke kelas & tahun ajaran LAMA-nya

  (tidak berubah walau santrinya sudah pindah kelas).



---



## 16. Halaman Admin: Monitoring Laporan (`/admin/laporan-monitoring`)



**Siapa yang akses**: KHUSUS Admin. Ini "pusat kendali" untuk memantau progres

SEMUA musyrif dalam mengirim laporan.



**Kontrol atas**: geser bulan, banner status (kuning = masih masa wajar,

merah = sudah lewat tanggal 15/darurat)



**Statistik ringkas** (angka besar): total santri sudah lapor (dari total

keseluruhan), jumlah kelas yang belum tuntas, jumlah kelas yang telat (lewat

tanggal 15), jumlah santri yang dikecualikan bulan itu.



**Tombol "Salin Rekap"**: menyalin teks siap-tempel (misal untuk grup WA

pimpinan) berisi status SETIAP kelas dalam format: `[centang/segitiga] [Kelas]

([Musyrif]) -- [jumlah sudah]/[jumlah total]`. Centang kalau semua santrinya

sudah lapor, segitiga peringatan kalau masih ada yang belum.



**Bagian "Reminder ke Musyrif"**: daftar musyrif yang MASIH punya santri

belum lapor bulan itu (musyrif yang sudah beres semua TIDAK muncul di sini).

Tiap musyrif punya tombol "Kirim WA" yang membuka WhatsApp LANGSUNG ke nomor

musyrif tersebut (personal, satu-satu, bukan ke grup), dengan pesan berisi

daftar LENGKAP semua santri yang jadi tanggung jawabnya (dikelompokkan per

kelas kalau dia mengampu lebih dari 1 kelas) beserta status masing-masing

(sudah/belum) -- bukan cuma yang belum saja.



**Bagian "Status per kelas"**: daftar semua kelas, bisa diklik untuk

memperluas (expand) dan melihat:

- Daftar nama santri yang BELUM lapor

- Daftar santri yang DIKECUALIKAN bulan itu beserta ALASANnYA (bukan cuma

  angka jumlahnya)

- Penanda "Tepat waktu" (hijau) atau "Telat" (merah, lewat tanggal 15)

  berdasarkan kapan aktivitas pengiriman PERTAMA kali terjadi untuk kelas itu



---



## 17. Halaman Akun (`/akun`)



**Siapa yang akses**: Semua pengguna (untuk akun masing-masing).



**Isi**: Form ganti kata sandi, dan tombol/toggle untuk beralih tema

terang/gelap.



---



## 18. Halaman Cek Laporan (`/cek-laporan`) -- HALAMAN PUBLIK



**Siapa yang akses**: SIAPA SAJA tanpa perlu login -- ini halaman yang diakses

WALI SANTRI, bukan musyrif/admin.



**Cara kerja**:

- Wali memasukkan nomor WA yang terdaftar di sistem (nomor yang sama dengan

  yang didaftarkan admin/musyrif di data santri)

- Ada pembatas percobaan (rate limiter) untuk mencegah orang iseng menebak-nebak nomor

- Kalau nomor cocok, ditampilkan daftar SEMUA anak yang terhubung ke nomor

  itu, dan untuk tiap anak, daftar BULAN yang laporannya sudah DIPUBLIKASIKAN

  oleh musyrifnya (bulan yang belum dipublikasikan TIDAK akan muncul,

  meskipun datanya sebenarnya sudah ada di sistem)

- Klik salah satu bulan -> tampil laporan lengkap anak itu (narasi + rincian

  per modul: hafalan, ibadah, absensi, kedisiplinan, kesehatan, pembayaran)



---



## 19. Pola & Komponen yang Berulang di Banyak Halaman



Supaya konsisten, catat pola-pola berikut yang dipakai di LEBIH DARI SATU

halaman (kalau didesain ulang, sebaiknya tetap 1 pola yang sama, bukan

beda-beda tiap halaman):



- **Dropdown yang bisa diketik ("searchable select")**: dipakai untuk memilih

  nama santri (bisa banyak) dan musyrif (bisa banyak) -- mengetik akan

  langsung menyaring pilihan yang muncul di bawahnya, bisa dipilih pakai

  klik atau tombol panah+Enter di keyboard.

- **Preset rentang tanggal**: Bulan Ini / Bulan Lalu / 3 Bulan / Semester (6

  Bulan) / 1 Tahun / Kustom (isi tanggal manual) -- dipakai di semua halaman

  Laporan (Pelanggaran, Kesehatan) dan Pembayaran.

- **Tabel yang bisa diurutkan**: klik judul kolom untuk urutkan naik/turun,

  tahan Shift lalu klik kolom lain untuk urutkan berdasarkan lebih dari satu

  kolom sekaligus.

- **Badge kategori berwarna**: khususnya untuk tingkat pelanggaran (Ringan/

  Sedang/Berat/Sangat Berat), tiap tingkat punya warna beda dan level paling

  parah (Sangat Berat) sengaja dibuat paling menonjol dibanding yang lain.

- **Kotak pencarian nama yang menyaring tabel langsung**: dipakai di halaman

  Pembayaran dan Manajemen > Santri -- mengetik nama langsung menyaring baris

  tabel yang tampil, tanpa perlu klik tombol cari.

- **Export ke Excel**: tombol yang sama fungsinya (unduh rekap sebagai file

  Excel) muncul di halaman Pelanggaran (tab Laporan) dan Kesehatan (tab

  Laporan).

- **Tombol "Kirim WA"**: selalu membuka aplikasi WhatsApp dengan pesan yang

  SUDAH terisi otomatis (nama santri/musyrif terkait + link/isi yang

  relevan), tinggal ditekan kirim oleh pengguna -- sistem tidak mengirim

  pesan secara otomatis sendiri, pengguna yang menekan tombol kirim di WA.

- **Pengecualian santri bulanan**: fitur ini SATU sistem yang sama dipakai

  di halaman Laporan Wali Santri (tempat mengatur) dan ditampilkan lagi

  (nama + alasan) di halaman Monitoring Laporan (admin).



---



## 20. Ringkasan Alur Sistem End-to-End (1 Siklus Bulanan)



1. Sepanjang bulan berjalan, musyrif mengisi data di 5 modul (Halaqoh,

   Hafalan, Ibadah bisa kapan saja & terus diupdate; Kesehatan & Pelanggaran

   dicatat tiap ada kejadian).

2. Menjelang/masuk bulan berikutnya, musyrif membuka Laporan Wali Santri,

   mengecek kelengkapan (tanda kuning kalau ada yang bolong), mengecualikan

   santri yang memang tidak ada datanya bulan itu (dengan alasan).

3. Musyrif mempublikasikan bulan tersebut untuk kelasnya (supaya wali bisa

   akses mandiri kalau perlu), lalu mengirim WA satu-satu ke tiap wali santri.

4. Admin memantau progres semua musyrif dari Monitoring Laporan -- kalau ada

   yang lambat, admin bisa mengirim reminder WA personal ke musyrif

   bersangkutan, atau menyalin rekap status untuk dibagikan ke grup pimpinan.

5. Wali santri, kapan saja, bisa membuka Cek Laporan, memasukkan nomor WA

   terdaftarnya, dan melihat laporan anaknya untuk bulan-bulan yang sudah

   dipublikasikan.

6. Di akhir tahun ajaran, Admin memproses Naik Kelas -- santri pindah ke

   kelas baru untuk tahun ajaran baru, riwayat data lama tetap tersimpan

   terikat ke kelas & tahun ajaran lamanya.


buatkan mockup desain web yang bagus dari sisi tampilan laptop dan hp dengan rincian seperti diatas

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://santri-report-card.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8018ec60-9e2c-4282-929d-dd746969f2c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
