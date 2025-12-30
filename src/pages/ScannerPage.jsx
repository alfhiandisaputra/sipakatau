import { useState } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { 
  ScannerCamera,
  ScannerControls,
  ScannerResults,
  WasteTypeSelector,
  EducationContent,
  ScannerHeader,
  ScannerInstructions
} from '../components/features/scanner';
import { wasteItems } from '../data/wasteItems';
import { useAuth } from '../hooks/useAuth';

export default function Scanner() {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualSelect, setShowManualSelect] = useState(false);
  const [selectedWasteType, setSelectedWasteType] = useState('PLASTIC');
  const [scanHistory, setScanHistory] = useState([]);
  
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
  
  setScannedResult(null);
  setShowManualSelect(false);
  
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.3) {
      const randomIndex = Math.floor(Math.random() * wasteItems.length);
      const result = {
        ...wasteItems[randomIndex],
        confidence: Math.floor(Math.random() * 30) + 70
      };
      setScannedResult(result);
    
      setScanHistory(prev => [{
        ...result,
        id: Date.now(),
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]);
    } else {
      setScannedResult({ 
        isError: true,
        message: "Tidak dapat mengidentifikasi sampah"
      });
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
  setScannedResult(null);
};

  const handleWasteTypeSelect = (type) => {
    setSelectedWasteType(type);
    const selectedItem = wasteItems.find(item => item.type === type) || wasteItems[0];
    setScannedResult({
      ...selectedItem,
      confidence: 100
    });
    setShowManualSelect(false);
  };

  const handleSaveToHistory = () => {
    if (scannedResult) {
      alert(`Informasi tentang ${scannedResult.name} telah disimpan di riwayat edukasi!`);
      setScannedResult(null);
      setCapturedImage(null);
    }
  };

  if (!user) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Silakan login untuk menggunakan scanner edukasi
            </h1>
            <button
              onClick={() => navigate('/auth')}
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
        <ScannerHeader user={user} onBack={() => navigate('/dashboard')} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
              
              {showManualSelect && (
                <WasteTypeSelector
                  selectedType={selectedWasteType}
                  onSelect={handleWasteTypeSelect}
                />
              )}
              
              {(scannedResult !== null || isAnalyzing) && (
                <ScannerResults
                  detectedWaste={scannedResult}
                  confidence={scannedResult?.confidence || 0}
                  onSave={handleSaveToHistory}
                  onManualSelect={handleManualSelect}
                  isLoading={isAnalyzing}
                />
              )}
            </div>

            <div className="space-y-8">
              {scannedResult && (
                <EducationContent wasteType={scannedResult.type} />
              )}
              
              {!scannedResult && !isAnalyzing && !showManualSelect && (
                <ScannerInstructions />
              )}
              
              <div className="rounded-3xl p-6 bg-white border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Statistik Edukasi</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Scan Edukasi</span>
                    <span className="font-bold text-gray-900">{scanHistory.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Jenis Sampah Dipelajari</span>
                    <span className="font-bold text-emerald-600">
                      {new Set(scanHistory.map(item => item.type)).size} jenis
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Akurasi Rata-rata</span>
                    <span className="font-bold text-blue-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level Pengetahuan</span>
                    <span className="font-bold text-amber-600">
                      {scanHistory.length >= 10 ? 'Ahli' : 
                       scanHistory.length >= 5 ? 'Menengah' : 'Pemula'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Recent Waste Types - Show when no result */}
             {!scannedResult && !isAnalyzing && !showManualSelect && (
                <div className="rounded-3xl p-6 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <h3 className="font-bold text-gray-900 mb-4">Jenis Sampah Populer</h3>
                  <div className="space-y-3">
                    {wasteItems.slice(0, 4).map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-100">
                              <IconComponent className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{item.name}</span>
                              <span className="text-xs text-gray-500">{item.type}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedWasteType(item.type);
                              const selectedItem = wasteItems.find(i => i.type === item.type);
                              setScannedResult({
                                ...selectedItem,
                                confidence: 100
                              });
                            }}
                            className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            Pelajari
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Education History - Show when no active scanning */}
          {!scannedResult && !isAnalyzing && !showManualSelect && (
            <div className="rounded-3xl p-8 bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Scan Terbaru</h3>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wasteItems.slice(0, 3).map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100">
                          <IconComponent className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedWasteType(item.type);
                            const selectedItem = wasteItems.find(i => i.type === item.type);
                            setScannedResult({
                              ...selectedItem,
                              confidence: 100
                            });
                          }}
                          className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}