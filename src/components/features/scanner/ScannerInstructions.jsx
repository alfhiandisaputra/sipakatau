// src/components/features/scanner/ScannerInstructions.jsx
import { Camera, Target, Zap, CheckCircle, Info } from 'lucide-react';

const ScannerInstructions = () => {
  const steps = [
    {
      icon: Camera,
      title: "Mulai Scan",
      description: "Klik tombol 'Mulai Scan Sampah' untuk mengaktifkan kamera"
    },
    {
      icon: Target,
      title: "Arahkan Kamera",
      description: "Arahkan kamera ke sampah dengan jarak 20-30 cm"
    },
    {
      icon: Zap,
      title: "Capture Gambar",
      description: "Tekan tombol capture untuk mengambil gambar sampah"
    },
    {
      icon: CheckCircle,
      title: "Konfirmasi Hasil",
      description: "Periksa hasil identifikasi dan masukkan berat sampah"
    }
  ];

  return (
    <div className="rounded-3xl p-8 bg-white border border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-100">
          <Info className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Cara Menggunakan Scanner</h3>
          <p className="text-gray-600">Ikuti langkah-langkah berikut untuk hasil terbaik</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
          <h4 className="font-bold text-gray-900 mb-3">Tips untuk hasil scan terbaik:</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Pastikan pencahayaan cukup</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Fokus pada satu jenis sampah per scan</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Jaga jarak kamera 20-30 cm dari sampah</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Hindari gambar blur dengan menjaga tangan stabil</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScannerInstructions;