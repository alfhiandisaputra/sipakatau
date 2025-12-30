// src/pages/MapPage.jsx
import { useState, useEffect, useRef } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { 
  MapComponent,
  FilterBar,
  LocationList,
  LocationDetails,
  MapControls,
  KabupatenStats,
  WasteCategoryFilter,
  MapHeader
} from '../components/features/map';
import { soppengLocations, soppengKecamatan } from '../data/mockSoppengLocations';
import { Button } from '../components/ui';
import { 
  MapPin, 
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const DEFAULT_CENTER = [-4.3518, 119.8892];

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [showWasteFilter, setShowWasteFilter] = useState(false);
  const [viewMode, setViewMode] = useState('map');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapLayer, setMapLayer] = useState('default');
  
  const { user } = useAuth();
  const mapRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    
    const getCurrentLocation = async () => {
      if (!navigator.geolocation) {
        console.warn('Geolocation tidak didukung oleh browser');
        return;
      }
      
      setIsLoadingLocation(true);
      
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 60000,
            enableHighAccuracy: true
          });
        });
        
        if (mounted) {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setIsLoadingLocation(false);
        }
      } catch (error) {
        if (mounted) {
          console.warn('Tidak dapat mendapatkan lokasi:', error.message);
          setIsLoadingLocation(false);
        }
      }
    };
    
    getCurrentLocation();
    
    return () => {
      mounted = false;
    };
  }, []);

  const filteredLocations = soppengLocations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.kelurahan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesKecamatan = 
      selectedKecamatan === 'all' || 
      location.kecamatan === selectedKecamatan;
    
    const matchesCategories = 
      selectedCategories.includes('all') || 
      selectedCategories.includes(location.category);

    return matchesSearch && matchesKecamatan && matchesCategories;
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (viewMode === 'list') {
      setViewMode('map');
    }
    if (mapRef.current && mapRef.current.flyTo) {
      mapRef.current.flyTo([location.lat, location.lng], 15);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda');
      return;
    }
    
    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setUserLocation(newLocation);
        setIsLoadingLocation(false);
        
        if (mapRef.current && mapRef.current.flyTo) {
          mapRef.current.flyTo(newLocation, 15);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Tidak dapat mendapatkan lokasi saat ini. Pastikan GPS diaktifkan dan izin diberikan.');
        setIsLoadingLocation(false);
      },
      {
        timeout: 10000,
        maximumAge: 60000,
        enableHighAccuracy: true
      }
    );
  };

  const handleSchedulePickup = () => {
    if (selectedLocation) {
      navigate('/pickup');
    } else {
      alert('Pilih lokasi terlebih dahulu untuk menjadwalkan penjemputan');
    }
  };

  const handleGetDirections = () => {
    if (selectedLocation && userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${selectedLocation.lat},${selectedLocation.lng}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  const handleCategoryToggle = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId && id !== 'all')
        : [...selectedCategories.filter(id => id !== 'all'), categoryId];
      
      if (newCategories.length === 0) {
        setSelectedCategories(['all']);
      } else {
        setSelectedCategories(newCategories);
      }
    }
  };

  const handleShareMap = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link peta berhasil disalin!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Gagal menyalin link');
    });
  };

  const handleZoomIn = () => {
    if (mapRef.current && mapRef.current.zoomIn) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && mapRef.current.zoomOut) {
      mapRef.current.zoomOut();
    }
  };

  const handleToggleLayer = () => {
    const layers = ['default', 'satellite', 'terrain'];
    const nextLayer = layers[(layers.indexOf(mapLayer) + 1) % layers.length];
    setMapLayer(nextLayer);
  };

  if (!user) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Silakan login untuk melihat peta Kabupaten Soppeng
            </h1>
            <Button
              onClick={() => navigate('/auth')}
              variant="primary"
              className="rounded-2xl"
            >
              Login Sekarang
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper user={user}>
      <div className="min-h-screen bg-gray-50">
        <MapHeader
          user={user}
          onBack={() => navigate('/dashboard')}
          onShareMap={handleShareMap}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCurrentLocation={handleCurrentLocation}
            onFilterClick={() => setShowWasteFilter(!showWasteFilter)}
            selectedKecamatan={selectedKecamatan}
            onKecamatanChange={setSelectedKecamatan}
            isLoadingLocation={isLoadingLocation}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredLocations.length}</span> lokasi ditemukan
              {isLoadingLocation && (
                <span className="ml-2 inline-flex items-center gap-1 text-emerald-600">
                  <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  Mendeteksi lokasi...
                </span>
              )}
            </div>
            
            {showWasteFilter && (
              <button
                onClick={() => setShowWasteFilter(false)}
                className="p-2 text-gray-500 hover:text-gray-700 self-end md:self-center"
                title="Tutup filter"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {showWasteFilter && (
            <div className="mb-6">
              <WasteCategoryFilter
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
              />
            </div>
          )}

          {viewMode === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Map */}
                <div className="h-125 md:h-150 rounded-2xl overflow-hidden border border-gray-200 shadow-lg relative">
                  <MapComponent
                    ref={mapRef}
                    locations={filteredLocations}
                    userLocation={userLocation}
                    onLocationSelect={handleLocationSelect}
                    selectedLocationId={selectedLocation?.id}
                    center={userLocation}
                    zoom={12}
                    mapLayer={mapLayer}
                  />
                  <MapControls
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onCurrentLocation={handleCurrentLocation}
                    onToggleLayer={handleToggleLayer}
                    currentLayer={mapLayer}
                  />
                </div>
                
                {/* Map Legend */}
                <div className="bg-linear-to-r from-blue-50 to-emerald-50 rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Legenda Peta</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">TPS</p>
                        <p className="text-xs text-gray-600">Titik Pembuangan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Bank Sampah</p>
                        <p className="text-xs text-gray-600">Daur Ulang</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Fasilitas Khusus</p>
                        <p className="text-xs text-gray-600">B3 & Elektronik</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Lokasi Anda</p>
                        <p className="text-xs text-gray-600">Posisi saat ini</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {selectedLocation ? (
                  <LocationDetails
                    location={selectedLocation}
                    onSchedulePickup={handleSchedulePickup}
                    onGetDirections={handleGetDirections}
                    onClose={() => setSelectedLocation(null)}
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-center">

                      <div className="relative inline-flex mb-6">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
                        <div className="relative bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                          <MapPin className="w-10 h-10 text-emerald-600" />
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-xl mb-3">
                        Pilih Lokasi
                      </h4>
                    
                      <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm leading-relaxed">
                        Klik salah satu lokasi di peta untuk melihat detail informasi lengkap
                      </p>

                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          className="rounded-xl px-6 py-3 border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200"
                          onClick={() => setViewMode('list')}
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Lihat Semua Lokasi
                          </div>
                        </Button>
                
                        <p className="text-xs text-gray-400 mt-2">
                          Atau gunakan filter di atas untuk mencari lokasi tertentu
                        </p>
                      </div>
                    </div>
                  </div>
                )}


                 {/* Statistics */}
                <KabupatenStats kecamatan={soppengKecamatan} />
                

              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <LocationList
                locations={filteredLocations}
                onLocationSelect={handleLocationSelect}
                selectedLocationId={selectedLocation?.id}
              />
              
              <div className="flex justify-center">
                <Button
                  onClick={() => setViewMode('map')}
                  variant="outline"
                  className="rounded-2xl px-6 py-3"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Lihat Peta
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}