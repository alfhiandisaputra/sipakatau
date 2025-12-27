// src/components/features/scanner/ScannerControls.jsx
import { Camera, RotateCw, Info, Zap, X } from 'lucide-react';
import { cn } from '../../../utils';

const ScannerControls = ({ 
  isScanning, 
  hasResult, 
  onStartScan, 
  onStopScan, 
  onRetry,
  onShowInfo,
  className 
}) => {
  if (hasResult) {
    return (
      <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
        <button
          onClick={onRetry}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg"
        >
          <RotateCw className="w-5 h-5" />
          <span className="font-semibold">Scan Lagi</span>
        </button>
        
        <button
          onClick={onShowInfo}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors border border-gray-700"
        >
          <Info className="w-5 h-5" />
          <span className="font-semibold">Info Detil</span>
        </button>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
        <button
          onClick={onStopScan}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
          <span className="font-semibold">Stop Scan</span>
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
      <button
        onClick={onStartScan}
        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-105"
      >
        <Camera className="w-6 h-6" />
        <span className="font-bold text-lg">Mulai Scan Sampah</span>
        <Zap className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ScannerControls;