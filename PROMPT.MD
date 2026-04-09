# Role: Senior Frontend Developer (Expert in React, Tailwind, & Framer Motion)
# Project: Feature Expansion for "Rumah Belajar Insan Mandiri"

## 1. New Page: Galeri Video Interaktif
- **Goal:** Menampilkan video kegiatan yayasan dari YouTube dengan tampilan premium.
- **Videos:** 1. https://youtu.be/bt763xXStTo
  2. https://youtu.be/dtDB3LC0_FI
  3. https://youtu.be/KT1YPEBW7PU
- **Requirement:** - Gunakan Slider/Carousel yang bisa digeser (swipeable).
  - Saat video diklik, tampilkan di Modal atau langsung putar di tempat dengan transisi yang smooth.
  - Tambahkan efek "Glassmorphism" pada container video.
  - Gunakan Framer Motion untuk animasi transisi antar video.

## 2. New Page: Titip Doa (Prayer Request)
- **Goal:** Wadah bagi donatur atau pengunjung untuk menitipkan doa.
- **Requirement:**
  - Buat desain halaman yang sangat tenang (Zen style). Gunakan background warna beige lembut atau putih tulang.
  - Headline: "Titipkan Doa, Ketuk Pintu Langit."
  - Gunakan tombol CTA besar yang elegan: "Kirim Doa via WhatsApp".
  - Link Action: Arahkan langsung ke WhatsApp Admin dengan template teks otomatis: "Assalamu'alaikum Admin RBIM, saya ingin menitipkan doa untuk..."

## 3. Feature: Floating Action Button (FAB)
- **Asset:** Gunakan Logo Rumah Belajar Insan Mandiri (logo-rbim.png).
- **Behavior:** - Posisi: Fixed di pojok kanan bawah (Bottom-Right).
  - Animation: Berikan efek 'Floating' (naik turun pelan) dan 'Pulse' lembut.
  - Action: Jika diklik, buka chat WhatsApp ke nomor Admin.

## 4. Program Page Refinement (UX Upgrade)
- **Copywriting:** Perbaiki semua deskripsi program. Jangan terlalu kaku. Gunakan bahasa yang menyentuh sisi emosional dan pendidikan.
- **Feature "Baca Selengkapnya":** - Pada setiap card program, tampilkan hanya 2-3 baris deskripsi (truncated).
  - Tambahkan tombol "Baca Selengkapnya".
  - Saat diklik, gunakan Framer Motion 'Layout Transition' untuk memperluas card (expand) atau memunculkan Modal yang berisi detail lengkap program tersebut tanpa pindah halaman.

## 5. Technical Stack Consistency
- Tetap gunakan Tailwind CSS untuk styling.
- Pastikan semua elemen baru mengikuti "The Kinetic Academy" design system (No-Line Rule, Tonal Depth, dan Serif Typography untuk Heading).
- Gunakan Claude 3.5 Sonnet capabilities untuk menulis kode yang clean, modular, dan berperforma tinggi.