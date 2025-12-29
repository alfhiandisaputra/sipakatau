// // src/pages/MapPage.jsx
// import { useState, useEffect, useRef } from 'react';
// import LayoutWrapper from '../components/layout/LayoutWrapper';
// import { 
//   MapComponent,
//   FilterBar,
//   LocationList,
//   LocationDetails,
//   MapControls,
//   KabupatenStats,
//   WasteCategoryFilter
// } from '../components/features/map';
// import { soppengLocations, soppengKecamatan } from '../data/mockSoppengLocations';
// import { Card, Button } from '../components/ui';
// import { 
//   MapPin, 
//   Calendar,
//   Share2,
//   Download
// } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';


// const DEFAULT_CENTER = [-4.3518, 119.8892];

// export default function MapPage({ onNavigate }) {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(DEFAULT_CENTER); 
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedKecamatan, setSelectedKecamatan] = useState('all');
//   const [selectedCategories, setSelectedCategories] = useState(['all']);
//   const [showWasteFilter, setShowWasteFilter] = useState(false);
//   const [viewMode, setViewMode] = useState('map'); // 
//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
//   const { user } = useAuth();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;
    
//     const getCurrentLocation = async () => {
//       if (!navigator.geolocation) {
//         console.warn('Geolocation tidak didukung oleh browser');
//         return;
//       }
      
//       setIsLoadingLocation(true);
      
//       try {
//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             timeout: 10000,
//             maximumAge: 60000,
//             enableHighAccuracy: true
//           });
//         });
        
//         if (mounted) {
//           setUserLocation([position.coords.latitude, position.coords.longitude]);
//           setIsLoadingLocation(false);
//         }
//       } catch (error) {
//         if (mounted) {
//           console.warn('Tidak dapat mendapatkan lokasi:', error.message);
//           setIsLoadingLocation(false);
//         }
//       }
//     };
    
//     getCurrentLocation();
    
//     return () => {
//       mounted = false;
//     };
//   }, []); 

  
//   const filteredLocations = soppengLocations.filter(location => {
//     const matchesSearch = 
//       location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       location.kelurahan.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesKecamatan = 
//       selectedKecamatan === 'all' || 
//       location.kecamatan === selectedKecamatan;
    
//     const matchesCategories = 
//       selectedCategories.includes('all') || 
//       selectedCategories.includes(location.category);

//     return matchesSearch && matchesKecamatan && matchesCategories;
//   });

//   const handleLocationSelect = (location) => {
//     setSelectedLocation(location);
//     setViewMode('map');
//   };

//   const handleCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation tidak didukung oleh browser Anda');
//       return;
//     }
    
//     setIsLoadingLocation(true);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const newLocation = [position.coords.latitude, position.coords.longitude];
//         setUserLocation(newLocation);
//         setIsLoadingLocation(false);
        
//         if (mapRef.current) {
//           mapRef.current.flyTo(newLocation, 15);
//         }
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         alert('Tidak dapat mendapatkan lokasi saat ini. Pastikan GPS diaktifkan dan izin diberikan.');
//         setIsLoadingLocation(false);
//       },
//       {
//         timeout: 10000,
//         maximumAge: 60000,
//         enableHighAccuracy: true
//       }
//     );
//   };

//   const handleSchedulePickup = () => {
//     if (selectedLocation) {
//       onNavigate('pickup');
//     } else {
//       alert('Pilih lokasi terlebih dahulu untuk menjadwalkan penjemputan');
//     }
//   };

//   const handleGetDirections = () => {
//     if (selectedLocation && userLocation) {
//       const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${selectedLocation.lat},${selectedLocation.lng}&travelmode=driving`;
//       window.open(url, '_blank');
//     }
//   };

//   const handleCategoryToggle = (categoryId) => {
//     if (categoryId === 'all') {
//       setSelectedCategories(['all']);
//     } else {
//       const newCategories = selectedCategories.includes(categoryId)
//         ? selectedCategories.filter(id => id !== categoryId && id !== 'all')
//         : [...selectedCategories.filter(id => id !== 'all'), categoryId];
      
//       if (newCategories.length === 0) {
//         setSelectedCategories(['all']);
//       } else {
//         setSelectedCategories(newCategories);
//       }
//     }
//   };

//   const handleShareMap = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url).then(() => {
//       alert('Link peta berhasil disalin!');
//     }).catch(err => {
//       console.error('Failed to copy:', err);
//       alert('Gagal menyalin link');
//     });
//   };

//   const handleZoomIn = () => {
//     if (mapRef.current) {
//       mapRef.current.zoomIn();
//     }
//   };

//   const handleZoomOut = () => {
//     if (mapRef.current) {
//       mapRef.current.zoomOut();
//     }
//   };

//   const handleToggleLayer = () => {
//     // Implement layer toggle logic here
//     alert('Fitur ganti layer akan segera hadir!');
//   };

//   if (!user) {
//     return (
//       <LayoutWrapper>
//         <div className="min-h-screen flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               Silakan login untuk melihat peta Kabupaten Soppeng
//             </h1>
//             <Button
//               onClick={() => onNavigate('auth')}
//               variant="primary"
//               className="rounded-2xl"
//             >
//               Login Sekarang
//             </Button>
//           </div>
//         </div>
//       </LayoutWrapper>
//     );
//   }

//   return (
//     <LayoutWrapper user={user}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-linear-to-r from-emerald-500 to-teal-500 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-white/20 rounded-xl">
//                     <MapPin className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-bold mb-1">Peta Kabupaten Soppeng</h1>
//                     <p className="text-emerald-100">
//                       Temukan TPS, Bank Sampah, dan Fasilitas Pengelolaan Sampah
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 <Button
//                   variant="outline"
//                   onClick={() => onNavigate('pickup')}
//                   className="bg-white/10 hover:bg-white/20 border-white text-white rounded-2xl"
//                 >
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Jadwalkan Pickup
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={handleShareMap}
//                   className="bg-white/10 hover:bg-white/20 border-white text-white rounded-2xl"
//                 >
//                   <Share2 className="w-4 h-4 mr-2" />
//                   Bagikan
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Filter Bar */}
//           <FilterBar
//             searchQuery={searchQuery}
//             onSearchChange={setSearchQuery}
//             onCurrentLocation={handleCurrentLocation}
//             onFilterClick={() => setShowWasteFilter(!showWasteFilter)}
//             selectedKecamatan={selectedKecamatan}
//             onKecamatanChange={setSelectedKecamatan}
//           />

//           {/* View Mode Toggle */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setViewMode('map')}
//                 className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
//                   viewMode === 'map' 
//                     ? 'bg-emerald-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Tampilan Peta
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
//                   viewMode === 'list' 
//                     ? 'bg-emerald-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Tampilan Daftar
//               </button>
//             </div>
            
//             <div className="text-sm text-gray-600">
//               <span className="font-medium">{filteredLocations.length}</span> lokasi ditemukan
//               {isLoadingLocation && (
//                 <span className="ml-2 inline-flex items-center gap-1 text-emerald-600">
//                   <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
//                   Mendeteksi lokasi...
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Waste Category Filter */}
//           {showWasteFilter && (
//             <div className="mb-6">
//               <WasteCategoryFilter
//                 selectedCategories={selectedCategories}
//                 onCategoryToggle={handleCategoryToggle}
//               />
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className={`${viewMode === 'map' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
//               {viewMode === 'map' ? (
//                 <div className="h-150 rounded-3xl overflow-hidden border border-gray-200 shadow-lg relative">
//                   <MapComponent
//                     locations={filteredLocations}
//                     userLocation={userLocation}
//                     onLocationSelect={handleLocationSelect}
//                     selectedLocationId={selectedLocation?.id}
//                     center={userLocation}
//                     zoom={12}
//                     mapRef={mapRef}
//                   />
//                   <MapControls
//                     onZoomIn={handleZoomIn}
//                     onZoomOut={handleZoomOut}
//                     onCurrentLocation={handleCurrentLocation}
//                     onToggleLayer={handleToggleLayer}
//                   />
//                 </div>
//               ) : (
//                 <LocationList
//                   locations={filteredLocations}
//                   onLocationSelect={handleLocationSelect}
//                   selectedLocationId={selectedLocation?.id}
//                 />
//               )}
              
//               {/* Info Panel */}
//               <Card className="mt-6 p-6 rounded-3xl bg-linear-to-r from-blue-50 to-emerald-50">
//                 <h3 className="font-bold text-gray-900 mb-3">Informasi Penting</h3>
//                 <ul className="space-y-2 text-gray-600">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span>TPS Biru: Tempat Pembuangan Sementara</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Hijau: Bank Sampah dan Pusat Daur Ulang</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                     <span>Ungu: Fasilitas Khusus (B3, Elektronik)</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
//                     <span>Anda: Lokasi Anda saat ini</span>
//                   </li>
//                 </ul>
//               </Card>
//             </div>

    
//             <div className="space-y-8">
//               <KabupatenStats kecamatan={soppengKecamatan} />
              
//               {viewMode === 'map' && selectedLocation ? (
//                 <LocationDetails
//                   location={selectedLocation}
//                   onSchedulePickup={handleSchedulePickup}
//                   onGetDirections={handleGetDirections}
//                   onClose={() => setSelectedLocation(null)}
//                 />
//               ) : (
//                 <Card className="p-6 rounded-3xl">
//                   <div className="text-center py-8">
//                     <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                       <MapPin className="w-8 h-8 text-emerald-600" />
//                     </div>
//                     <h4 className="font-bold text-gray-900 mb-2">
//                       {viewMode === 'map' ? 'Pilih Lokasi' : 'Detail Lokasi'}
//                     </h4>
//                     <p className="text-gray-600 mb-4">
//                       {viewMode === 'map' 
//                         ? 'Klik salah satu lokasi di peta untuk melihat detailnya' 
//                         : 'Klik salah satu lokasi di daftar untuk melihat detailnya'
//                       }
//                     </p>
//                     {viewMode === 'map' && (
//                       <Button
//                         variant="outline"
//                         className="rounded-2xl"
//                         onClick={() => setViewMode('list')}
//                       >
//                         Lihat Semua Lokasi
//                       </Button>
//                     )}
//                   </div>
//                 </Card>
//               )}

//               {/* Quick Actions */}
//               <Card className="p-6 rounded-3xl">
//                 <h3 className="font-bold text-gray-900 mb-4">Aksi Cepat</h3>
//                 <div className="space-y-3">
//                   <Button
//                     variant="outline"
//                     className="w-full rounded-2xl justify-start"
//                     onClick={() => onNavigate('scanner')}
//                   >
//                     <div className="p-2 bg-emerald-100 rounded-lg mr-3">
//                       <MapPin className="w-4 h-4 text-emerald-600" />
//                     </div>
//                     Scan Jenis Sampah
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full rounded-2xl justify-start"
//                     onClick={() => onNavigate('pickup')}
//                   >
//                     <div className="p-2 bg-blue-100 rounded-lg mr-3">
//                       <Calendar className="w-4 h-4 text-blue-600" />
//                     </div>
//                     Jadwalkan Penjemputan
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full rounded-2xl justify-start"
//                     onClick={() => window.print()}
//                   >
//                     <div className="p-2 bg-amber-100 rounded-lg mr-3">
//                       <Download className="w-4 h-4 text-amber-600" />
//                     </div>
//                     Unduh Peta
//                   </Button>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </LayoutWrapper>
//   );
// }


export default function RewardsPage() {
  return <div className="pt-20">rewards page</div>;
}