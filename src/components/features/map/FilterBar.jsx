// src/components/features/map/FilterBar.jsx
import { Search, Filter,MapPin } from 'lucide-react';

export default function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  onCurrentLocation,
  onFilterClick,
  selectedKecamatan,
  onKecamatanChange 
}) {
  const kecamatanOptions = [
    { value: 'all', label: 'Semua Kecamatan' },
    { value: 'Lalabata', label: 'Lalabata' },
    { value: 'Marioriawa', label: 'Marioriawa' },
    { value: 'Donri-Donri', label: 'Donri-Donri' },
    { value: 'Marioriwawo', label: 'Marioriwawo' },
    { value: 'Ganra', label: 'Ganra' },
    { value: 'Citta', label: 'Citta' },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 mb-6 shadow-md border border-gray-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">

       <div className="flex-1">
            <div className="flex items-center h-12 rounded-2xl border border-gray-300 bg-white
                            focus-within:ring-2 focus-within:ring-emerald-500">
            <div className="invisible pl-8 pr-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
              <input
                type="text"
                placeholder="Cari lokasi.."
                className="flex-1 h-full pr-4 text-sm text-gray-900 rounded-2xl
                          focus:outline-none"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

        <div className="w-full md:w-56">
          <select
            className="h-12 w-full rounded-2xl border border-gray-300 bg-white px-4 text-sm text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={selectedKecamatan}
            onChange={(e) => onKecamatanChange(e.target.value)}
          >
            {kecamatanOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <button
            onClick={onFilterClick}
            className="h-12 rounded-2xl bg-gray-100 px-5 text-sm font-medium text-gray-700
                      hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          <button
            onClick={onCurrentLocation}
            className="h-12 rounded-2xl bg-emerald-500 px-5 text-sm font-medium text-white
            hover:bg-emerald-600 transition flex items-center justify-center gap-2"
          >
            <MapPin className="w-7 h-7" />
            Lokasi Saya
          </button>
        </div>
      </div>
    </div>
  );
}
