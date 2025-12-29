import { BookOpen, Recycle, AlertTriangle, Lightbulb, Shield, TrendingUp, Globe } from 'lucide-react';
import { WASTE_TYPES } from '../../../utils/constants';
import { cn } from '../../../utils';

const EducationContent = ({ wasteType }) => {
  const typeInfo = WASTE_TYPES[wasteType] || WASTE_TYPES.PLASTIC;
  
  const wasteEducation = {
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

  const education = wasteEducation[wasteType] || wasteEducation.PLASTIC;

  return (
    <div className={cn("rounded-3xl p-6 bg-white border border-gray-200 shadow-sm")}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-100">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Edukasi Pengelolaan</h3>
          <p className="text-sm text-gray-600">Pelajari cara mengelola {typeInfo.name} dengan benar</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Recycle className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-gray-900">Proses Daur Ulang</h4>
        </div>
        <p className="text-gray-700 bg-emerald-50 rounded-xl p-4">
          {education.process}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-gray-900">Dampak Lingkungan</h4>
        </div>
        <p className="text-gray-700 bg-blue-50 rounded-xl p-4">
          {education.impact}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h4 className="font-bold text-gray-900">Tips Praktis di Rumah</h4>
        </div>
        <div className="space-y-2">
          {education.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
              <span className="text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

    
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h4 className="font-bold text-gray-900">Fakta Menarik</h4>
        </div>
        <div className="space-y-2">
          {education.facts.map((fact, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Shield className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
              <span className="text-gray-700">{fact}</span>
            </div>
          ))}
        </div>
      </div>

  
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-amber-800 mb-1">Yang Perlu Dihindari</h5>
            <p className="text-amber-700 text-sm">
              {wasteType === 'PLASTIC' && 'Jangan membakar plastik karena menghasilkan dioksin beracun'}
              {wasteType === 'GLASS' && 'Jangan campur kaca dengan keramik karena merusak mesin daur ulang'}
              {wasteType === 'ORGANIC' && 'Jangan buang minyak bekas ke saluran air'}
              {wasteType === 'METAL' && 'Hati-hati dengan kaleng berkarat yang bisa melukai'}
              {wasteType === 'PAPER' && 'Kertas kotor minyak/grease tidak bisa didaur ulang'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationContent;