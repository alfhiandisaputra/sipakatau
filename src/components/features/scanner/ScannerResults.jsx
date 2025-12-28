// src/components/features/scanner/ScannerResults.jsx
import { CheckCircle, AlertTriangle, Recycle, Award } from 'lucide-react';
import { WASTE_TYPES } from '../../../utils/constants';

const ScannerResults = ({ 
  detectedWaste, 
  confidence, 
  points,
  onConfirm,
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

  if (!detectedWaste) {
    return (
      <div className="rounded-3xl p-8 bg-linear-to-br from-red-50 to-orange-50 border border-red-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-red-100">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tidak Terdeteksi</h3>
            <p className="text-gray-600">Sistem tidak dapat mengidentifikasi sampah</p>
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
            <p className="text-gray-600">AI mendeteksi sampah Anda</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Akurasi</div>
          <div className="text-2xl font-bold text-emerald-600">{confidence}%</div>
        </div>
      </div>

      {/* Waste Info */}
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
                {wasteType.pointsPerKg} poin/kg
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100">
            <Recycle className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <p className="text-gray-600 mb-4">{detectedWaste.description}</p>
        
        {/* Tips */}
        <div className="bg-gray-50 rounded-xl p-4 mt-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Tips:</span> {detectedWaste.recyclingTips}
          </p>
        </div>
      </div>

      {/* Points Calculation */}
      <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Poin yang didapat</div>
              <div className="text-sm text-gray-600">Estimasi untuk 1 kg</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-600">{points}</div>
            <div className="text-sm text-gray-600">poin</div>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full mt-6 py-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
      >
        Konfirmasi & Dapatkan Poin
      </button>
    </div>
  );
};

export default ScannerResults;