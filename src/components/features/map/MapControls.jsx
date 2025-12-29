// src/components/features/map/MapControls.jsx
import { Navigation, ZoomIn, ZoomOut, Layers, MapPin } from 'lucide-react';

export default function MapControls({ 
  onZoomIn, 
  onZoomOut, 
  onCurrentLocation,
  onToggleLayer,
  currentLayer = 'default'
}) {
  const layerLabels = {
    'default': 'Standar',
    'satellite': 'Satelit',
    'terrain': 'Topografi'
  };

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={onZoomIn}
          className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors hover:shadow-xl"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onZoomOut}
          className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors hover:shadow-xl"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onCurrentLocation}
          className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors hover:shadow-xl"
          title="Lokasi Saya"
        >
          <Navigation className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onToggleLayer}
          className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors hover:shadow-xl group relative"
          title="Ubah Layer"
        >
          <Layers className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Layer: {layerLabels[currentLayer]}
          </span>
        </button>
      </div>
      
      {/* Layer Indicator */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-medium text-gray-900">
            {layerLabels[currentLayer]}
          </span>
        </div>
      </div>
    </div>
  );
}