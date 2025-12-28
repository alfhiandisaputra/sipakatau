// src/pages/ScannerPage.jsx
import { useState } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { 
  ScannerCamera,
  ScannerControls,
  ScannerResults,
  WasteTypeSelector,
  PointsCalculator,
  ScannerHeader,
  ScannerInstructions
} from '../components/features/scanner';
import { wasteItems } from '../data/wasteItems';
import { useAuth } from '../hooks/useAuth';

export default function Scanner({ onNavigate }) {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualSelect, setShowManualSelect] = useState(false);
  const [selectedWasteType, setSelectedWasteType] = useState('PLASTIC');
  
  const { user } = useAuth();

  const handleStartScan = () => {
    setIsScanning(true);
    setCapturedImage(null);
    setScannedResult(null);
    setShowManualSelect(false);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleCapture = (image) => {
    setCapturedImage(image);
    setIsScanning(false);
    setIsAnalyzing(true);
    
    // Simulasi AI analysis
    setTimeout(() => {
      // Pilih hasil acak atau tidak terdeteksi
      const random = Math.random();
      if (random > 0.3) {
        const randomIndex = Math.floor(Math.random() * wasteItems.length);
        setScannedResult({
          ...wasteItems[randomIndex],
          confidence: Math.floor(Math.random() * 30) + 70 // 70-99%
        });
      } else {
        setScannedResult(null);
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setScannedResult(null);
    setIsScanning(true);
  };

  const handleManualSelect = () => {
    setShowManualSelect(true);
  };

  const handleWasteTypeSelect = (type) => {
    setSelectedWasteType(type);
    // Set hasil berdasarkan pilihan manual
    const selectedItem = wasteItems.find(item => item.type === type) || wasteItems[0];
    setScannedResult({
      ...selectedItem,
      confidence: 100
    });
    setShowManualSelect(false);
  };

  const handlePointsConfirm = (data) => {
    // Di sini Anda akan mengirim data ke backend
    alert(`Berhasil! ${data.points} poin ditambahkan untuk ${data.weight} kg ${data.wasteTypeName}`);
    
    // Reset scanner
    setIsScanning(false);
    setCapturedImage(null);
    setScannedResult(null);
    setShowManualSelect(false);
    
    // Navigate ke dashboard
    onNavigate('dashboard');
  };

  // Handle jika user belum login
  if (!user) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Silakan login untuk menggunakan scanner
            </h1>
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper user={user}>
      <div className="min-h-screen bg-gray-50">
        <ScannerHeader user={user} onBack={() => onNavigate('dashboard')} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Scanner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Scanner Camera */}
            <div className="lg:col-span-2 space-y-8">
              <ScannerCamera
                isScanning={isScanning}
                onCapture={handleCapture}
                capturedImage={capturedImage}
                onRetake={handleRetake}
              />
              
              <ScannerControls
                isScanning={isScanning}
                hasResult={!!scannedResult || showManualSelect}
                onStartScan={handleStartScan}
                onStopScan={handleStopScan}
                onRetry={handleRetake}
                onShowInfo={handleManualSelect}
              />
              
              {/* Manual Waste Type Selection */}
              {showManualSelect && (
                <WasteTypeSelector
                  selectedType={selectedWasteType}
                  onSelect={handleWasteTypeSelect}
                />
              )}
              
              {/* Scanner Results */}
              {(scannedResult !== null || isAnalyzing) && (
                <ScannerResults
                  detectedWaste={scannedResult}
                  confidence={scannedResult?.confidence || 0}
                  points={scannedResult ? scannedResult.pointsPerKg : 0}
                  onConfirm={() => {
                    // Akan di-handle oleh PointsCalculator
                  }}
                  onManualSelect={handleManualSelect}
                  isLoading={isAnalyzing}
                />
              )}
            </div>

            {/* Right Column - Points Calculator & Instructions */}
            <div className="space-y-8">
              {/* Points Calculator (show when waste is detected) */}
              {scannedResult && (
                <PointsCalculator
                  wasteType={scannedResult.type}
                  onCalculate={handlePointsConfirm}
                />
              )}
              
              {/* Scanner Instructions */}
              {!scannedResult && !isAnalyzing && !showManualSelect && (
                <ScannerInstructions />
              )}
              
              {/* Quick Stats */}
              <div className="rounded-3xl p-6 bg-white border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Statistik Scan Hari Ini</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Scan</span>
                    <span className="font-bold text-gray-900">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Poin Dikumpulkan</span>
                    <span className="font-bold text-emerald-600">450 poin</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sampah Terdaur Ulang</span>
                    <span className="font-bold text-gray-900">3.2 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Scans Preview */}
          {!scannedResult && !isAnalyzing && (
            <div className="rounded-3xl p-8 bg-white border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Scan Terbaru</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wasteItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-emerald-100">
                        <item.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">{item.pointsPerKg}</div>
                      <div className="text-sm text-gray-600">poin/kg</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}