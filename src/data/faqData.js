import {
  Camera,
  BookOpen,
  Award,
  Shield,
  Smartphone,
  Globe,
  Recycle,
  HelpCircle,
  Zap,
  Users,
  CreditCard,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Package,
  HardDrive,
  Leaf,
  Cpu,
  Coffee,
  TreePine,
  Droplets,
  SprayCan,
  Glasses,
  Apple,
  Newspaper,
  ShoppingBag,
  GlassWater,
  FileText as FileIcon,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  GraduationCap,
  Target,
  Info,
  CheckCircle,
  Share2,
  Save,
  BookOpen as BookIcon,
  ArrowLeft,
  Award as AwardIcon
} from 'lucide-react';

export const faqCategories = [
  {
    id: 'scanner',
    title: 'AI Waste Scanner',
    icon: Camera,
    description: 'Pertanyaan tentang fitur pemindaian sampah',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    items: [
      {
        id: 'scanner-1',
        question: 'Bagaimana cara menggunakan AI Waste Scanner?',
        answer: '1. Klik tombol "Mulai Scan Sampah"\n2. Arahkan kamera ke sampah dengan jarak 20-30 cm\n3. Pastikan pencahayaan cukup\n4. Tekan tombol "Capture Image"\n5. Tunggu hasil analisis AI\n6. Pelajari informasi edukasi yang ditampilkan'
      },
      {
        id: 'scanner-2',
        question: 'Akurasi pemindaian AI seberapa tinggi?',
        answer: 'AI Waste Scanner memiliki akurasi rata-rata 85-92% dalam mengidentifikasi jenis sampah. Akurasi dapat dipengaruhi oleh:\n• Kualitas gambar\n• Pencahayaan\n• Posisi objek\n• Jenis sampah yang umum\nUntuk hasil terbaik, pastikan sampah difoto secara jelas dan terpisah.'
      },
      {
        id: 'scanner-3',
        question: 'Jenis sampah apa saja yang bisa di-scan?',
        answer: 'Sistem dapat mengidentifikasi 5 kategori utama:\n1. PLASTIC (botol, kemasan, kantong)\n2. PAPER (kertas, kardus, koran)\n3. METAL (kaleng, besi, aluminium)\n4. GLASS (botol, gelas, kaca)\n5. ORGANIC (sisa makanan, daun, kayu)\n6. E-WASTE (elektronik, baterai)'
      },
      {
        id: 'scanner-4',
        question: 'Apakah bisa scan sampah dalam kondisi gelap?',
        answer: 'Untuk hasil optimal, gunakan pencahayaan yang cukup. AI membutuhkan gambar yang jelas untuk analisis akurat. Jika kondisi gelap:\n• Aktifkan flash kamera\n• Pindah ke area lebih terang\n• Gunakan fitur "Pilih Manual" jika scan tidak berhasil'
      }
    ]
  },
  {
    id: 'education',
    title: 'Edukasi & Informasi',
    icon: BookOpen,
    description: 'Materi pembelajaran dan pengetahuan',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    items: [
      {
        id: 'edu-1',
        question: 'Bagaimana cara menyimpan edukasi untuk dipelajari nanti?',
        answer: 'Setelah scan berhasil:\n1. Klik tombol "Simpan ke Riwayat Edukasi"\n2. Edukasi akan tersimpan di dashboard Anda\n3. Akses kapan saja melalui menu "Riwayat Edukasi"\n4. Anda bisa membagikan edukasi ke media sosial'
      },
      {
        id: 'edu-2',
        question: 'Apakah ada batasan jumlah scan per hari?',
        answer: 'Tidak ada batasan! Anda bisa scan sebanyak yang diinginkan untuk:\n• Mempelajari berbagai jenis sampah\n• Meningkatkan level pengetahuan\n• Mengumpulkan poin edukasi\n• Menyelesaikan misi harian'
      },
      {
        id: 'edu-3',
        question: 'Bagaimana cara meningkatkan level pengetahuan?',
        answer: 'Level pengetahuan ditingkatkan dengan:\n1. Melakukan scan secara rutin\n2. Menyimpan edukasi ke riwayat\n3. Membaca semua informasi yang tersedia\n4. Menyelesaikan quiz edukasi (jika tersedia)\n\nLevel: Pemula (0-4 scan) → Menengah (5-9 scan) → Ahli (10+ scan)'
      },
      {
        id: 'edu-4',
        question: 'Dari mana sumber informasi edukasi ini?',
        answer: 'Informasi edukasi kami berasal dari:\n• Kementerian Lingkungan Hidup dan Kehutanan\n• Badan Pengelolaan Sampah Nasional\n• Penelitian universitas terkemuka\n• Organisasi lingkungan internasional (UNEP, WWF)\n• Data industri daur ulang terbaru'
      }
    ]
  },
  {
    id: 'points',
    title: 'Poin & Hadiah',
    icon: Award,
    description: 'Sistem poin dan reward program',
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
    items: [
      {
        id: 'points-1',
        question: 'Bagaimana cara mendapatkan poin?',
        answer: 'Poin bisa didapatkan melalui:\n✓ Scan sampah: 10 poin per scan\n✓ Simpan edukasi: 5 poin per edukasi\n✓ Selesaikan misi harian: 25-100 poin\n✓ Undang teman: 50 poin per teman\n✓ Partisipasi event: 100-500 poin'
      },
      {
        id: 'points-2',
        question: 'Apa saja yang bisa ditukar dengan poin?',
        answer: 'Poin bisa ditukar dengan:\n• Voucher belanja (minimal 500 poin)\n• Bibit tanaman (minimal 250 poin)\n• Tas belanja ramah lingkungan (minimal 300 poin)\n• Tumbler stainless steel (minimal 750 poin)\n• Donasi untuk program lingkungan (mulai 100 poin)'
      },
      {
        id: 'points-3',
        question: 'Apakah poin bisa kadaluarsa?',
        answer: 'Poin memiliki masa aktif 1 tahun sejak diperoleh. Kami akan mengirimkan notifikasi 30 hari sebelum poin kadaluarsa. Gunakan poin Anda sebelum waktu tersebut untuk menghindari kehilangan.'
      },
      {
        id: 'points-4',
        question: 'Bagaimana cara menukar poin?',
        answer: '1. Buka halaman "Reward Store" di dashboard\n2. Pilih hadiah yang diinginkan\n3. Pastikan poin mencukupi\n4. Klik "Tukar Poin"\n5. Isi alamat pengiriman\n6. Konfirmasi penukaran\nHadiah akan diproses dalam 3-5 hari kerja.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Akun & Keamanan',
    icon: Shield,
    description: 'Pengaturan akun dan privasi',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    items: [
      {
        id: 'account-1',
        question: 'Bagaimana cara reset password?',
        answer: '1. Klik "Lupa Password" di halaman login\n2. Masukkan email terdaftar\n3. Cek email untuk link reset\n4. Buat password baru\n5. Login dengan password baru\nJika mengalami masalah, hubungi support@ecoeduscanner.id'
      },
      {
        id: 'account-2',
        question: 'Apakah data saya aman?',
        answer: 'Ya! Kami menerapkan:\n• Enkripsi end-to-end untuk semua data\n• Two-factor authentication (opsional)\n• Tidak menyimpan foto scan di server kami\n• Data anonim untuk penelitian\n• Compliance dengan regulasi PDP Indonesia'
      },
      {
        id: 'account-3',
        question: 'Bagaimana menghapus akun?',
        answer: '1. Buka "Pengaturan Akun"\n2. Pilih "Hapus Akun"\n3. Konfirmasi dengan password\n4. Semua data akan dihapus permanen dalam 30 hari\nCatatan: Poin dan riwayat tidak bisa dipulihkan setelah penghapusan.'
      },
      {
        id: 'account-4',
        question: 'Bisakah ganti email/nomor telepon?',
        answer: 'Ya, bisa:\n1. Buka "Pengaturan Akun"\n2. Pilih "Informasi Pribadi"\n3. Klik "Ubah" di samping email/telepon\n4. Masukkan data baru dan verifikasi\n5. Konfirmasi dengan kode OTP'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Teknis & Dukungan',
    icon: Smartphone,
    description: 'Masalah teknis dan troubleshooting',
    color: 'bg-red-500',
    textColor: 'text-red-600',
    items: [
      {
        id: 'tech-1',
        question: 'Aplikasi crash saat membuka kamera, bagaimana?',
        answer: 'Solusi:\n1. Pastikan izin kamera sudah diberikan\n2. Update aplikasi ke versi terbaru\n3. Restart aplikasi\n4. Clear cache aplikasi\n5. Restart smartphone\n6. Jika masih terjadi, hubungi technical support'
      },
      {
        id: 'tech-2',
        question: 'Berapa ukuran aplikasi dan spesifikasi minimum?',
        answer: 'Ukuran: ~50MB\nSpesifikasi minimum:\n• Android 8.0+ / iOS 12+\n• RAM 2GB+\n• Kamera 8MP+\n• Koneksi internet (untuk pertama kali)\nAplikasi bisa digunakan offline setelah data edukasi diunduh.'
      },
      {
        id: 'tech-3',
        question: 'Bagaimana cara update aplikasi?',
        answer: 'Update otomatis:\n• Aktifkan auto-update di Play Store/App Store\nUpdate manual:\n1. Buka Play Store/App Store\n2. Cari "EcoEdu Scanner"\n3. Klik "Update" jika tersedia\nPastikan selalu gunakan versi terbaru untuk fitur terbaik.'
      },
      {
        id: 'tech-4',
        question: 'Apakah ada versi desktop/web?',
        answer: 'Saat ini hanya tersedia versi mobile (Android & iOS). Versi web sedang dalam pengembangan dan akan segera hadir. Anda bisa mengakses versi web melalui browser di https://scanner.ecoedu.id (coming soon)'
      }
    ]
  },
  {
    id: 'environment',
    title: 'Lingkungan & Dampak',
    icon: Globe,
    description: 'Kontribusi terhadap lingkungan',
    color: 'bg-teal-500',
    textColor: 'text-teal-600',
    items: [
      {
        id: 'env-1',
        question: 'Bagaimana aplikasi ini membantu lingkungan?',
        answer: 'Kontribusi kami:\n1. Edukasi massal tentang pengelolaan sampah\n2. Data anonim untuk penelitian lingkungan\n3. Kolaborasi dengan bank sampah lokal\n4. Program penanaman poin dari donasi\n5. Kampanye kesadaran lingkungan\n6. Partnership dengan komunitas daur ulang'
      },
      {
        id: 'env-2',
        question: 'Apakah data scan digunakan untuk penelitian?',
        answer: 'Ya, dengan ketentuan:\n• Data sepenuhnya anonim\n• Tidak ada informasi pribadi yang dibagikan\n• Hanya metadata jenis sampah dan lokasi umum\n• Untuk meningkatkan akurasi AI\n• Publikasi laporan dampak lingkungan'
      },
      {
        id: 'env-3',
        question: 'Bagaimana cara berkontribusi lebih?',
        answer: 'Selain menggunakan aplikasi:\n1. Gabung komunitas EcoEdu di media sosial\n2. Jadi relawan edukasi lingkungan\n3. Ikuti event bersih-bersih bersama\n4. Donasi melalui aplikasi\n5. Sebarkan edukasi ke teman dan keluarga'
      },
      {
        id: 'env-4',
        question: 'Apakah ada program corporate partnership?',
        answer: 'Ya! Kami terbuka untuk:\n• CSR perusahaan\n• Program sustainability\n• Edukasi karyawan\n• Sponsorship event lingkungan\nHubungi partnership@ecoeduscanner.id untuk informasi lebih lanjut.'
      }
    ]
  }
];

// Data untuk waste types yang digunakan di scanner
export const wasteTypeIcons = {
  PLASTIC: Package,
  PAPER: FileIcon,
  METAL: HardDrive,
  GLASS: GlassWater,
  ORGANIC: Leaf,
  EWASTE: Cpu,
  WOOD: TreePine
};

export const wasteTypeDescriptions = {
  PLASTIC: 'Material sintetik yang membutuhkan waktu ratusan tahun untuk terurai',
  PAPER: 'Material selulosa yang mudah terurai namun boros sumber daya',
  METAL: 'Material konduktif yang bisa didaur ulang tanpa batas',
  GLASS: 'Material inert yang 100% bisa didaur ulang tanpa kehilangan kualitas',
  ORGANIC: 'Material biodegradable yang bisa dikompos menjadi pupuk',
  EWASTE: 'Perangkat elektronik yang mengandung bahan berbahaya',
  WOOD: 'Material alami yang bisa terurai atau didaur ulang'
};

// Data untuk education content
export const wasteEducation = {
  PLASTIC: {
    process: 'Pisahkan berdasarkan kode resin (1-7), bersihkan, keringkan, lalu bawa ke bank sampah',
    impact: '1 botol plastik terurai 450 tahun. Didaur ulang menghemat 75% energi vs produksi baru',
    tips: [
      'Hindari plastik sekali pakai',
      'Pilih produk dengan kemasan minimal',
      'Gunakan tumbler dan tas belanja',
      'Kenali simbol daur ulang plastik'
    ],
    facts: [
      'Indonesia penghasil sampah plastik ke laut terbesar ke-2 dunia',
      'Hanya 9% plastik global yang didaur ulang',
      '1 ton plastik daur ulang = hemat 5.774 kWh energi'
    ]
  },
  PAPER: {
    process: 'Pisahkan dari bahan kontaminan, rendam, hancurkan, saring, cetak, keringkan',
    impact: 'Daur ulang kertas kurangi 74% polusi udara & 35% polusi air',
    tips: [
      'Gunakan kedua sisi kertas',
      'Pilih kertas daur ulang',
      'Digitalisasi dokumen',
      'Kompos kertas tisu'
    ],
    facts: [
      '1 ton kertas daur ulang = selamatkan 17 pohon',
      'Kertas bisa didaur ulang 5-7 kali',
      'Produksi kertas daur ulang butuh 60% energi lebih sedikit'
    ]
  },
  METAL: {
    process: 'Pisahkan aluminium & besi, lebur pada suhu tinggi, cetak menjadi produk baru',
    impact: 'Daur ulang aluminium hemat 95% energi dibanding produksi dari bijih',
    tips: [
      'Pipihkan kaleng untuk hemat ruang',
      'Bersihkan dari sisa makanan',
      'Pisahkan tutup plastik',
      'Kumpulkan magnet untuk besi'
    ],
    facts: [
      'Aluminium bisa didaur ulang tanpa batas',
      'Daur ulang 1 kaleng aluminium = hemat energi untuk 3 jam TV',
      '75% aluminium yang pernah diproduksi masih digunakan'
    ]
  },
  GLASS: {
    process: 'Pisahkan berdasarkan warna, hancurkan, lebur dengan pasir & soda ash',
    impact: 'Daur ulang gelas kurangi 50% polusi air & 20% polusi udara',
    tips: [
      'Pisahkan kaca berdasarkan warna',
      'Hati-hati dengan pecahan kaca',
      'Lepaskan tutup logam/plastik',
      'Jangan campur dengan keramik'
    ],
    facts: [
      'Kaca bisa didaur ulang 100% tanpa batas',
      'Produksi kaca daur ulang hemat 40% energi',
      '1 botol kaca didaur ulang = hemat energi untuk lampu 100 watt 4 jam'
    ]
  },
  ORGANIC: {
    process: 'Kompos metode aerob/anaerob, vermikompos (cacing), atau biokonversi',
    impact: 'Kompos kurangi 50% sampah rumah tangga & hasilkan pupuk organik',
    tips: [
      'Pisahkan bahan basah & kering',
      'Cincang bahan besar',
      'Pertahankan rasio C:N 30:1',
      'Aduk secara berkala'
    ],
    facts: [
      'Kompos kurangi emisi metana TPA',
      'Pupuk kompos tingkatkan 20% produktivitas tanah',
      '40% sampah Indonesia adalah organik'
    ]
  }
};

// Fungsi utilitas
export const getAllFAQItems = () => {
  return faqCategories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      categoryTitle: category.title,
      categoryId: category.id,
      categoryColor: category.color,
      categoryTextColor: category.textColor
    }))
  );
};

export const getPopularFAQs = () => {
  const popularIds = [
    'scanner-1',
    'scanner-2',
    'points-1',
    'points-2',
    'account-2',
    'tech-1'
  ];
  
  const allItems = getAllFAQItems();
  return allItems.filter(item => popularIds.includes(item.id));
};

export const searchFAQs = (query) => {
  const allItems = getAllFAQItems();
  
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return allItems.filter(item => 
    item.question.toLowerCase().includes(lowerQuery) ||
    item.answer.toLowerCase().includes(lowerQuery) ||
    item.categoryTitle.toLowerCase().includes(lowerQuery)
  );
};

export const getWasteIcon = (wasteType) => {
  return wasteTypeIcons[wasteType] || Package;
};

export const getWasteDescription = (wasteType) => {
  return wasteTypeDescriptions[wasteType] || wasteTypeDescriptions.PLASTIC;
};

export const getEducationContent = (wasteType) => {
  return wasteEducation[wasteType] || wasteEducation.PLASTIC;
};

export const contactInfo = {
  email: 'support@ecoeduscanner.id',
  whatsapp: '6281234567890',
  phone: '1500-123',
  hotline: '1500-123',
  youtube: 'https://youtube.com/ecoeduscanner',
  website: 'https://scanner.ecoedu.id'
};