# ♻️ SIPAKATAU (Sistem Pintar Kelola Sampah untuk Tatanan Masyarakat Unggul)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**SIPAKATAU** adalah platform pengelolaan sampah cerdas berbasis web yang mengintegrasikan teknologi AI, pemetaan interaktif, dan sistem ekonomi sirkular. Nama ini diambil dari filosofi Bugis **"Sipakatau"** yang berarti saling memanusiakan —mencerminkan misi kami untuk memanusiakan lingkungan dan meningkatkan kualitas hidup masyarakat. Kami percaya bahwa Smart Society bukan sekadar tentang robot atau sensor, tapi tentang bagaimana teknologi dapat memanusiakan warga dengan menciptakan lingkungan yang bersih (melalui pemilahan sampah) dan memberikan apresiasi yang adil atas kontribusi mereka (melalui sistem poin dan reward).

**TAGLINE**
"Smart Waste, Smart People, Sipakatau."

---

## 🌟 Masalah & Solusi
Masyarakat seringkali kesulitan dalam memilah sampah dan tidak memiliki motivasi untuk menyetor sampah ke bank sampah. **SIPAKATAU** hadir sebagai solusi "Smart Society" dengan:
- **Edukasi Praktis:** Menggunakan simulasi AI untuk memilah sampah.
- **Logistik Efisien:** Layanan penjemputan sampah langsung ke rumah.
- **Apresiasi Nyata:** Sistem poin yang dapat ditukar dengan kebutuhan harian.

## ✨ Fitur Utama
- **[SMART SCAN] AI Waste Scanner (Simulation):** Mengidentifikasi jenis sampah (Organik/Anorganik) secara instan untuk edukasi pemilahan.
- **[SMART MAP] Interactive Bank Sampah Map:** Navigasi lokasi titik penampungan sampah terdekat dengan status real-time.
- **[SMART PICK-UP] Digital Pickup Request:** Formulir cerdas untuk penjadwalan penjemputan sampah dengan kalkulator poin otomatis.
- **[SMART ECONOMY] Gamified Dashboard:** Meliputi *Leaderboard* warga, *Milestone* pencapaian lingkungan, dan pusat penukaran poin (Rewards).

## 🛠️ Tech Stack
- **Library Inti:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context API (Simulasi poin & data user)
- **Animasi:** Framer Motion & AOS (Animate on Scroll)
- **Icons & Visuals:** Lucide React & Unsplash


## PROJECT STRUKTUR
```
├── public/                 # Aset publik (favicon, logo, manifest)
├── src/
│   ├── assets/             # Gambar, Ilustrasi, SVG
│   ├── components/         # Komponen UI Reusable
│   │   ├── ui/             # Komponen kecil (Button, Input, Badge)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BentoGrid.jsx   # Layout dashboard
│   │   └── Leaderboard.jsx
│   ├── data/               # Mock data (JSON) untuk simulasi poin/lokasi
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Halaman Utama
│   │   ├── Home.jsx        # Landing Page
│   │   ├── Dashboard.jsx   # Pusat User (Poin, Milestone)
│   │   ├── Scanner.jsx     # Fitur Scan AI (Simulasi)
│   │   ├── Pickup.jsx      # Form Penjemputan
│   │   └── Rewards.jsx     # Penukaran Poin
│   ├── context/            # State Management (Global Point System)
│   │   └── UserContext.jsx
│   ├── App.jsx             # Routing
│   ├── main.jsx
│   └── index.css           # Tailwind Directives
├── tailwind.config.js
├── package.json
└── README.md
```


## 🚀 Instalasi & Penggunaan
1. **Clone Repositori**
   ```bash
   git clone [https://github.com/username/sipakatau-web.git](https://github.com/username/sipakatau-web.git)
   cd sipakatau-web
   
## Scripts

- Build for Production:
  ```shell
  npm run build
  ```
  Script ini menjalankan webpack dalam mode production menggunakan konfigurasi `webpack.prod.js` dan menghasilkan sejumlah file build ke direktori `dist`.

- Start Development Server:
  ```shell
  npm run start-dev
  ```
  Script ini menjalankan server pengembangan webpack dengan fitur live reload dan mode development sesuai konfigurasi di`webpack.dev.js`.

- Serve:
  ```shell
  npm run serve
  ```
  Script ini menggunakan [`http-server`](https://www.npmjs.com/package/http-server) untuk menyajikan konten dari direktori `dist`.
