// src/components/features/map/LocationList.jsx
import { MapPin, Clock, Phone, Package, ChevronRight } from 'lucide-react';
import { Card } from '../../ui';

export default function LocationList({ 
  locations, 
  onLocationSelect, 
  selectedLocationId 
}) {
  const getTypeColor = (type) => {
    switch (type) {
      case 'drop-point': return 'bg-blue-100 text-blue-700';
      case 'recycling-center': return 'bg-green-100 text-green-700';
      case 'special-facility': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'drop-point': return 'TPS';
      case 'recycling-center': return 'Bank Sampah';
      case 'special-facility': return 'Fasilitas Khusus';
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg mb-4">
        {locations.length} Lokasi di Soppeng
      </h3>
      <div className="space-y-3">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
              selectedLocationId === location.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
            }`}
            onClick={() => onLocationSelect(location)}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${
                location.type === 'drop-point' ? 'bg-blue-50' : 
                location.type === 'recycling-center' ? 'bg-green-50' : 
                'bg-purple-50'
              }`}>
                <MapPin className={`w-5 h-5 ${
                  location.type === 'drop-point' ? 'text-blue-600' : 
                  location.type === 'recycling-center' ? 'text-green-600' : 
                  'text-purple-600'
                }`} />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900">{location.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(location.type)}`}>
                    {getTypeLabel(location.type)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{location.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">
                      {location.available}/{location.capacity} kg
                    </span>
                  </div>
                </div>
                
                {/* Waste Categories */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {location.accepts.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                    {location.accepts.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        +{location.accepts.length - 3} jenis
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}