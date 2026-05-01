# Petualangan IPAS

> Landing page dan paket distribusi untuk aplikasi edukasi "Petualangan IPAS" (kisi-kisi: SD kelas 4–5). Mobile-first, animasi IPA/IPS, dan unduhan APK langsung.

## Ringkasan

Halaman ini adalah landing page sederhana dan modern untuk aplikasi pembelajaran "Petualangan IPAS". Desain mobile-first (375–430px), menggunakan HTML/CSS/JS murni tanpa framework. Berisi:

- Hero interaktif dengan animasi bertema IPA & IPS
- Fitur singkat, carousel screenshot aplikasi nyata, panduan instalasi, FAQ
- Tombol "⬇️ DOWNLOAD SEKARANG" langsung mengunduh `apk/petualangan IPAS.apk`

## Cara Menjalankan (Preview Lokal)

1. Buka folder proyek:

```powershell
cd "d:\AIPPROJECT03\Make Money\JOKI\Petualangan IPAS\petualangan-ipas-download"
```

2. Cara cepat melihat halaman di browser (pilih salah satu):

- Jalankan server HTTP sederhana (Python):

```powershell
python -m http.server 8000
# lalu buka http://localhost:8000 di browser
```

- Atau buka langsung file `index.html` di browser (beberapa fitur seperti `fetch` atau CORS tidak digunakan, jadi halaman seharusnya tampil normal).

## Struktur Proyek

- `index.html` — Halaman utama (link ke CSS/JS eksternal)
- `assets/style.css` — Semua stylesheet, animasi, dan breakpoint responsif
- `assets/script.js` — Interaksi: carousel, stepper, FAQ, confetti, IntersectionObserver
- `assets/img/logo.png` — Logo aplikasi
- `assets/UI/` — Folder berisi screenshot UI aplikasi
- `apk/petualangan IPAS.apk` — Berkas APK yang diunduh langsung dari tombol hero/footer

## Perbaikan Mobile yang Dilakukan

- Tombol hero dan tombol unduh dibuat full-width dengan touch-friendly size
- Ukuran font, spasi, dan logo disesuaikan untuk layar ≤430px dan ≤375px
- Fitur grid berubah menjadi single-column pada layar kecil
- Animasi besar direduksi (ukuran & opacity) agar tidak menutupi konten penting

## Pengembangan & Catatan

- CSS dirancang mobile-first; ada breakpoint pada `768px` dan `1024px` untuk tablet/desktop
- `assets/script.js` memakai IntersectionObserver untuk animasi masuk dan mendukung swipe carousel
- Jika ingin mematikan efek confetti, cari fungsi `createConfetti()` di `assets/script.js` dan hapus event listener pada tombol unduh

## Testing singkat

1. Buka halaman di ponsel atau emulator (pastikan file `assets` dan `apk` tetap di jalur relatif yang sama).
2. Tekan tombol `⬇️ DOWNLOAD SEKARANG` di hero — APK harus mulai terunduh.
3. Geser carousel screenshot dengan jari atau mouse untuk memastikan snapping dan tombol titik aktif.

## Lisensi & Kredit

Proyek ini dibuat sebagai materi edukasi. Silakan hubungi pemilik proyek untuk detail lisensi atau distribusi.

---

Jika mau, saya bisa:

- Menambahkan file CHANGELOG.md dan CONTRIBUTING.md
- Menyempurnakan accessibility (a11y) dan tes Lighthouse ringan
- Meng-generate build ZIP/installer untuk distribusi

Ingin saya lanjutkan ke salah satu opsi di atas?
