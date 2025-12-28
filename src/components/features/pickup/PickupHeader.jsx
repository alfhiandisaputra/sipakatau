// src/components/features/scanner/ScannerHeader.jsx
import { ArrowLeft, Award } from 'lucide-react';

const PickupHeader = ({ user, onBack }) => {
  return (
    <div className="bg-linear-to-r from-emerald-500 to-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-3 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Digital Pickup Request
              </h1>
              <p className="text-emerald-100 mt-2">
                Formulir Cerdas untuk Penjemputan Sampah Anda
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#F59E0B] to-[#10B981] bg-white p-3 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Total Poin Anda</p>
                  <p className="text-3xl font-bold text-white">{user?.points || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupHeader;