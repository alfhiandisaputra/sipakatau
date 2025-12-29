import { Camera, Target, BookOpen, GraduationCap, Info } from 'lucide-react';

const ScannerInstructions = () => {
  const steps = [
    {
      icon: Camera,
      title: "Mulai Scan Edukasi",
      description: "Klik tombol 'Mulai Scan' untuk mengaktifkan kamera AI"
    },
    {
      icon: Target,
      title: "Arahkan ke Sampah",
      description: "Arahkan kamera ke sampah dengan jarak optimal 20-30 cm"
    },
    {
      icon: BookOpen,
      title: "Dapatkan Edukasi",
      description: "Lihat informasi lengkap tentang jenis dan pengelolaan sampah"
    },
    {
      icon: GraduationCap,
      title: "Tingkatkan Pengetahuan",
      description: "Simpan dan bagikan edukasi untuk tingkatkan kesadaran lingkungan"
    }
  ];

  return (
    <div className="rounded-3xl p-6 bg-white border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-emerald-100">
          <GraduationCap className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Scanner Edukasi Sampah</h3>
          <p className="text-gray-600 text-sm">Pelajari pengelolaan sampah dengan teknologi AI</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="text-center">
              <div className="relative mb-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Info className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-gray-900 text-sm">Manfaat Edukasi:</h4>
        </div>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Pahami cara daur ulang yang benar</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Ketahui dampak lingkungan setiap material</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Pelajari teknik pengurangan sampah</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>Tingkatkan kesadaran lingkungan sekitar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScannerInstructions;