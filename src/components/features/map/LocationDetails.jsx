// src/components/features/map/LocationDetails.jsx
import { 
  MapPin, 
  Clock, 
  Phone, 
  Package, 
  Truck,
  Calendar,
  ExternalLink,
  Navigation,
  CheckCircle
} from 'lucide-react';
import { Card, Button } from '../../ui';

export default function LocationDetails({ 
  location, 
  onSchedulePickup,
  onGetDirections,
  onClose 
}) {
  if (!location) return null;

  const getTypeLabel = (type) => {
    switch (type) {
      case 'drop-point': return 'Tempat Pembuangan Sementara';
      case 'recycling-center': return 'Bank Sampah';
      case 'special-facility': return 'Fasilitas Khusus';
      default: return type;
    }
  };

  const getCapacityPercentage = (available, capacity) => {
    return (available / capacity) * 100;
  };

  const getCapacityColor = (percentage) => {
    if (percentage > 70) return 'text-green-600';
    if (percentage > 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="p-6 rounded-3xl sticky top-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-xl">{location.name}</h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {getTypeLabel(location.type)}
            </span>
          </div>
          <p className="text-gray-600">{location.address}</p>
          <p className="text-sm text-gray-500 mt-1">
            {location.kelurahan}, Kec. {location.kecamatan}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Kapasitas Tersedia</span>
          </div>
          <span className={`font-bold ${getCapacityColor(
            getCapacityPercentage(location.available, location.capacity)
          )}`}>
            {location.available} kg
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              getCapacityPercentage(location.available, location.capacity) > 70 
                ? 'bg-green-500' 
                : getCapacityPercentage(location.available, location.capacity) > 40
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
            style={{ 
              width: `${getCapacityPercentage(location.available, location.capacity)}%` 
            }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>0 kg</span>
          <span>Total: {location.capacity} kg</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Jam Operasi</p>
            <p className="font-medium text-gray-900">{location.hours}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Phone className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Kontak</p>
            <p className="font-medium text-gray-900">{location.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Jenis Sampah Diterima</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {location.accepts.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {location.facilities && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 rounded-lg mt-1">
              <MapPin className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Fasilitas</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {location.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-lg"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          className="w-full rounded-2xl py-3"
          onClick={onSchedulePickup}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Jadwalkan Penjemputan
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-2xl py-3"
          onClick={onGetDirections}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Petunjuk Arah
        </Button>
        <Button
          variant="ghost"
          className="w-full rounded-2xl py-3"
          onClick={() => window.open(`tel:${location.phone}`)}
        >
          <Phone className="w-4 h-4 mr-2" />
          Telepon Sekarang
        </Button>
      </div>
    </Card>
  );
}