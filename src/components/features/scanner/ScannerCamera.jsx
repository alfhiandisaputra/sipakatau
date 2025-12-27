// src/components/features/scanner/ScannerCamera.jsx
import { useState, useEffect } from 'react';
import { Camera, X, Scan, Zap } from 'lucide-react';
import { cn } from '../../../utils';

const ScannerCamera = ({ isScanning, onCapture, capturedImage, onRetake }) => {
  const [scanLinePosition, setScanLinePosition] = useState(0);

  // Animasi garis scan
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanLinePosition((prev) => (prev + 2) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const handleCapture = () => {
    // Simulasi capture image
    const mockImages = [
      'https://images.unsplash.com/photo-1562077981-4d7eafd9c8c6?w=400',
      'https://images.unsplash.com/photo-1596521864200-6c6d6d8f6e4a?w=400',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    onCapture(randomImage);
  };

  if (capturedImage) {
    return (
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-gray-900 to-black">
        <div className="aspect-video relative">
          <img 
            src={capturedImage} 
            alt="Captured waste" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          
          <button
            onClick={onRetake}
            className="absolute top-4 right-4 p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-white text-sm text-center">
                Gambar berhasil diambil! <br />
                <span className="text-emerald-300 font-medium">Sistem sedang menganalisis...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-gray-900 to-black">
      {/* Camera View */}
      <div className="aspect-video relative flex items-center justify-center">
        {isScanning ? (
          <div className="w-full h-full relative">
            {/* Scanner Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-4 border-emerald-500/50 rounded-2xl w-64 h-64 relative">
                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg" />
              </div>
            </div>
            
            {/* Scanning line */}
            <div 
              className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent"
              style={{ top: `${scanLinePosition}%` }}
            />
            
            {/* Scanning dots */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            
            {/* Instruction */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white font-medium animate-pulse">
                Arahkan kamera ke sampah...
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Camera className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Waste Scanner</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Identifikasi jenis sampah secara instan dan dapatkan poin
            </p>
          </div>
        )}
      </div>

      {/* Capture Button */}
      {isScanning && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <button
            onClick={handleCapture}
            className="bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-full px-8 py-4 flex items-center gap-3 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105"
          >
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Capture Image</span>
          </button>
        </div>
      )}

      {/* Scanner Status */}
      <div className="absolute top-4 left-4">
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm",
          isScanning 
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            : "bg-gray-800/50 text-gray-300"
        )}>
          {isScanning ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Scanning...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              <span>Ready to Scan</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScannerCamera;