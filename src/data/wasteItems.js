import { 
  Droplets, 
  Package, 
  SprayCan , 
  Glasses, 
  Apple, 
  Newspaper, 
  ShoppingBag, 
  HardDrive, 
  GlassWater, 
  Leaf,
  Recycle,
  FileText,
  Cpu,
  Coffee,
  TreePine
} from 'lucide-react';

export const wasteItems = [
  {
    id: 1,
    name: 'Botol Plastik PET',
    type: 'PLASTIC',
    description: 'Botol plastik bening seperti botol air mineral, soda, dan minuman lainnya.',
    recyclingTips: 'Bersihkan dari sisa minuman, lepaskan label dan tutup botol jika berbeda jenis plastik.',
    icon: Droplets,
    category: 'Plastik Daur Ulang',
    decompositionTime: '450 tahun',
    recyclingRate: '30%',
    environmentalImpact: 'Tinggi'
  },
  {
    id: 2,
    name: 'Kardus Bekas',
    type: 'PAPER',
    description: 'Kardus kemasan, kotak makanan, dan karton tebal lainnya.',
    recyclingTips: 'Lipat atau potong untuk menghemat ruang, bersihkan dari sisa makanan atau lemak.',
    icon: Package,
    category: 'Kertas Daur Ulang',
    decompositionTime: '2-5 bulan',
    recyclingRate: '68%',
    environmentalImpact: 'Sedang'
  },
  {
    id: 3,
    name: 'Kaleng Aluminium',
    type: 'METAL',
    description: 'Kaleng minuman ringan, bir, dan makanan kaleng.',
    recyclingTips: 'Bersihkan dari sisa minuman/makanan, tekan agar pipih untuk menghemat ruang.',
    icon: SprayCan,
    category: 'Logam Daur Ulang',
    decompositionTime: '200 tahun',
    recyclingRate: '75%',
    environmentalImpact: 'Tinggi'
  },
  {
    id: 4,
    name: 'Botol Kaca',
    type: 'GLASS',
    description: 'Botol kaca untuk minuman, saus, dan produk makanan lainnya.',
    recyclingTips: 'Pisahkan berdasarkan warna (bening, hijau, coklat), lepaskan tutup logam atau plastik.',
    icon: Glasses,
    category: 'Kaca Daur Ulang',
    decompositionTime: '1 juta tahun',
    recyclingRate: '33%',
    environmentalImpact: 'Rendah'
  },
  {
    id: 5,
    name: 'Sisa Makanan Organik',
    type: 'ORGANIC',
    description: 'Sisa makanan, sayuran, buah-buahan, kulit telur, dan bahan organik lainnya.',
    recyclingTips: 'Simpan dalam wadah tertutup untuk menghindari bau, pisahkan dari bahan anorganik.',
    icon: Apple,
    category: 'Kompos',
    decompositionTime: '2-6 minggu',
    recyclingRate: '55%',
    environmentalImpact: 'Rendah'
  },
  {
    id: 6,
    name: 'Kertas HVS/Majalah',
    type: 'PAPER',
    description: 'Kertas putih bekas print, dokumen, majalah, dan koran.',
    recyclingTips: 'Hilangkan klip kertas, staples, dan plastik pembungkus sebelum disetor.',
    icon: Newspaper,
    category: 'Kertas Daur Ulang',
    decompositionTime: '2-5 bulan',
    recyclingRate: '68%',
    environmentalImpact: 'Sedang'
  },
  {
    id: 7,
    name: 'Plastik Kemasan',
    type: 'PLASTIC',
    description: 'Plastik kemasan makanan, snack, deterjen, dan produk rumah tangga.',
    recyclingTips: 'Bersihkan dari sisa makanan, keringkan, dan pisahkan berdasarkan jenis plastik jika memungkinkan.',
    icon: ShoppingBag,
    category: 'Plastik Fleksibel',
    decompositionTime: '20-500 tahun',
    recyclingRate: '15%',
    environmentalImpact: 'Tinggi'
  },
  {
    id: 8,
    name: 'Kaleng Besi',
    type: 'METAL',
    description: 'Kaleng susu, makanan kaleng, cat, dan produk berbahan besi.',
    recyclingTips: 'Bersihkan dari sisa isi, pastikan tidak berkarat berat, tekan agar pipih.',
    icon: HardDrive,
    category: 'Logam Ferro',
    decompositionTime: '50 tahun',
    recyclingRate: '70%',
    environmentalImpact: 'Tinggi'
  },
  {
    id: 9,
    name: 'Gelas/Piring Kaca',
    type: 'GLASS',
    description: 'Gelas minum, piring kaca, toples kaca, dan peralatan gelas lainnya.',
    recyclingTips: 'Bungkus dengan kertas/koran untuk menghindari pecahan, pisahkan dari kaca jendela atau kaca mobil.',
    icon: GlassWater,
    category: 'Kaca Daur Ulang',
    decompositionTime: '1 juta tahun',
    recyclingRate: '33%',
    environmentalImpact: 'Rendah'
  },
  {
    id: 10,
    name: 'Daun & Ranting',
    type: 'ORGANIC',
    description: 'Daun kering, ranting kecil, potongan rumput, dan bahan kebun organik.',
    recyclingTips: 'Keringkan sebelum disetor, hindari mencampur dengan plastik atau bahan non-organik.',
    icon: Leaf,
    category: 'Kompos Kebun',
    decompositionTime: '1-3 bulan',
    recyclingRate: '40%',
    environmentalImpact: 'Rendah'
  },
  {
    id: 11,
    name: 'Elektronik Bekas',
    type: 'EWASTE',
    description: 'Ponsel, laptop, baterai, dan peralatan elektronik lainnya.',
    recyclingTips: 'Pisahkan baterai, hapus data pribadi, jangan dibuang sembarangan karena mengandung logam berat.',
    icon: Cpu,
    category: 'E-Waste',
    decompositionTime: 'Tidak terurai',
    recyclingRate: '20%',
    environmentalImpact: 'Sangat Tinggi'
  },
  {
    id: 12,
    name: 'Kopi & Teh',
    type: 'ORGANIC',
    description: 'Ampas kopi, daun teh, dan sisa minuman herbal.',
    recyclingTips: 'Dapat dijadikan kompos atau pupuk, keringkan sebelum disimpan.',
    icon: Coffee,
    category: 'Kompos',
    decompositionTime: '2-8 minggu',
    recyclingRate: '60%',
    environmentalImpact: 'Rendah'
  },
  {
    id: 13,
    name: 'Kayu & Furniture',
    type: 'WOOD',
    description: 'Pecahan kayu, furniture rusak, dan bahan kayu lainnya.',
    recyclingTips: 'Pisahkan paku dan hardware, potong kecil untuk daur ulang atau kompos.',
    icon: TreePine,
    category: 'Kayu Daur Ulang',
    decompositionTime: '10-15 tahun',
    recyclingRate: '45%',
    environmentalImpact: 'Sedang'
  },
  {
    id: 14,
    name: 'Kertas Karton',
    type: 'PAPER',
    description: 'Kertas karton tipis, kemasan makanan, dan karton susu.',
    recyclingTips: 'Bersihkan dari sisa makanan, keringkan, lipat untuk hemat ruang.',
    icon: FileText,
    category: 'Kertas Daur Ulang',
    decompositionTime: '2-5 bulan',
    recyclingRate: '68%',
    environmentalImpact: 'Sedang'
  },
  {
    id: 15,
    name: 'Plastik LDPE',
    type: 'PLASTIC',
    description: 'Plastik fleksibel seperti kantong belanja, bungkus makanan, dan plastik stretch.',
    recyclingTips: 'Bersihkan dan keringkan, kumpulkan dalam jumlah banyak untuk efisiensi.',
    icon: Recycle,
    category: 'Plastik Fleksibel',
    decompositionTime: '20-500 tahun',
    recyclingRate: '15%',
    environmentalImpact: 'Tinggi'
  }
];

export const getUniqueWasteTypes = () => {
  const types = [...new Set(wasteItems.map(item => item.type))];
  return types;
};

export const getWasteByType = (type) => {
  return wasteItems.filter(item => item.type === type);
};

export const searchWasteItems = (query) => {
  const lowerQuery = query.toLowerCase();
  return wasteItems.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.type.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
};