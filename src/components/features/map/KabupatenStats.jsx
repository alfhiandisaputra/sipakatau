// src/components/features/map/KabupatenStats.jsx (Versi Ringkas)
import { Card } from '../../ui';
import { 
  MapPin, 
  Recycle, 
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function KabupatenStats({ kecamatan }) {
  const totalLocations = kecamatan.reduce((sum, k) => sum + k.totalLocations, 0);
  const totalWasteCollected = kecamatan.reduce((sum, k) => sum + k.wasteCollected, 0);
  
  const topKecamatan = [...kecamatan]
    .sort((a, b) => b.wasteCollected - a.wasteCollected)
    .slice(0, 3);

  return (
    <Card className="p-6 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-xl">
          <BarChart3 className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Statistik Soppeng</h3>
          <p className="text-sm text-gray-600">Performa pengelolaan sampah</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Lokasi</p>
              <p className="text-2xl font-bold text-gray-900">{totalLocations}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span>+12% dari bulan lalu</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Recycle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sampah Terkelola</p>
              <p className="text-2xl font-bold text-gray-900">
                {(totalWasteCollected / 1000).toFixed(1)} ton
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <TrendingUp className="w-3 h-3" />
            <span>+8% dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Top 3 Kecamatan</h4>
        <div className="space-y-3">
          {topKecamatan.map((kec, index) => (
            <div key={kec.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-linear-to-br from-yellow-400 to-orange-400' :
                  index === 1 ? 'bg-linear-to-br from-gray-400 to-gray-500' :
                  'bg-linear-to-br from-amber-500 to-amber-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{kec.name}</p>
                  <p className="text-xs text-gray-500">{kec.totalLocations} lokasi</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">
                  {(kec.wasteCollected / 1000).toFixed(1)} ton
                </p>
                <p className="text-xs text-gray-500">
                  {((kec.wasteCollected / totalWasteCollected) * 100).toFixed(0)}% total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Rata-rata per kecamatan:</span>
          <span className="font-semibold text-gray-900">
            {(totalWasteCollected / kecamatan.length / 1000).toFixed(1)} ton
          </span>
        </div>
      </div>
    </Card>
  );
}