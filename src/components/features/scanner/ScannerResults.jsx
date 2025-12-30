import { CheckCircle, AlertTriangle, BookOpen, Info, Share2, Save } from 'lucide-react';
import { WASTE_TYPES } from '../../../utils/constants';
import React from 'react';

const ScannerResults = ({ 
  detectedWaste, 
  confidence, 
  onSave,
  onManualSelect,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="rounded-3xl p-8 bg-linear-to-br from-gray-900 to-black text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
        <h3 className="text-2xl font-bold text-white mb-3">Menganalisis...</h3>
        <p className="text-gray-300">
          AI sedang menganalisis gambar sampah Anda
        </p>
      </div>
    );
  }

  if (detectedWaste?.isError) {
    return (
      <div className="rounded-3xl p-8 bg-linear-to-br from-red-50 to-orange-50 border border-red-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-red-100">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tidak Terdeteksi</h3>
            <p className="text-gray-600">{detectedWaste.message}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Coba lagi dengan:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Pencahayaan yang lebih baik</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Fokus pada satu jenis sampah</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Ambil gambar dari sudut yang jelas</span>
            </li>
          </ul>
          
          <button
            onClick={onManualSelect}
            className="w-full mt-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Pilih Jenis Sampah Manual
          </button>
        </div>
      </div>
    );
  }

  if (!detectedWaste || !detectedWaste.name) {
    return null;
  }
  const wasteType = WASTE_TYPES[detectedWaste.type] || WASTE_TYPES.PLASTIC;

  return (
    <div className="rounded-3xl p-8 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Sampah Teridentifikasi!</h3>
            <p className="text-gray-600">Temukan informasi edukasi tentang {detectedWaste.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Akurasi</div>
          <div className="text-2xl font-bold text-emerald-600">{confidence}%</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{detectedWaste.name}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: wasteType.color }}
                >
                  {wasteType.name}
                </span>
                <span className="text-sm text-gray-500">
                  {detectedWaste.category || 'Material Daur Ulang'}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100">
              {detectedWaste.icon && React.createElement(detectedWaste.icon, { 
                className: "w-6 h-6 text-emerald-600" 
              })}
            </div>
          </div>

          <p className="text-gray-600 mb-4">{detectedWaste.description}</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-gray-900">Tips Daur Ulang:</span>
            </div>
            <p className="text-sm text-gray-700">{detectedWaste.recyclingTips}</p>
          </div>
        </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">Simpan ke Riwayat Edukasi</span>
        </button>
        
        <button
          onClick={() => {
            const shareText = `Saya baru belajar tentang ${detectedWaste.name} di EcoEdu Scanner! ${detectedWaste.recyclingTips}`;
            if (navigator.share) {
              navigator.share({
                title: 'Edukasi Sampah',
                text: shareText,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(shareText);
              alert('Teks telah disalin ke clipboard!');
            }
          }}
          className="flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-semibold">Bagikan Edukasi</span>
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => document.getElementById('education-content')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <BookOpen className="w-5 h-5" />
          Lihat Detail Edukasi Lengkap
        </button>
      </div>
    </div>
  );
};

export default ScannerResults;