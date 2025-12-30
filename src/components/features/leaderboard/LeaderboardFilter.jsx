// src/components/features/leaderboard/LeaderboardFilters.jsx
import { Search, Users, Trophy, Target } from 'lucide-react';
import { Card } from '../../ui';

export default function LeaderboardFilters({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  timeRange,
  onTimeRangeChange
}) {
  const filters = [
    { id: 'all', label: 'Semua Pengguna', icon: Users },
    { id: 'top-10', label: 'Top 10', icon: Trophy },
    { id: 'friends', label: 'Teman', icon: Users },
    { id: 'nearby', label: 'Terdekat', icon: Target },
  ];

  const timeRanges = [
    { id: 'all-time', label: 'Sepanjang Masa' },
    { id: 'monthly', label: 'Bulan Ini' },
    { id: 'weekly', label: 'Minggu Ini' },
    { id: 'today', label: 'Hari Ini' },
  ];

  return (
    <Card className="p-6 mb-8 rounded-3xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => onTimeRangeChange(range.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-6">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}