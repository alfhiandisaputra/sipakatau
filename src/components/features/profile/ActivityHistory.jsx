// src/components/features/profile/ActivityHistory.jsx
import { useState } from 'react';
import { Card, Button } from '../../ui';
import { 
  Calendar, 
  Filter,
  Download,
  ChevronRight,
  Recycle,
  Trash2,
  Package,
  CheckCircle
} from 'lucide-react';

const ActivityHistory = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'pickup', label: 'Penjemputan' },
    { id: 'recycle', label: 'Daur Ulang' },
    { id: 'event', label: 'Event' },
    { id: 'scan', label: 'Scan' }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'pickup': return <Recycle className="w-5 h-5 text-blue-600" />;
      case 'recycle': return <Package className="w-5 h-5 text-green-600" />;
      case 'event': return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'scan': return <CheckCircle className="w-5 h-5 text-amber-600" />;
      default: return <Trash2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'pickup': return 'bg-blue-100 text-blue-700';
      case 'recycle': return 'bg-green-100 text-green-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      case 'scan': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'points') {
      return b.points - a.points;
    }
    return 0;
  });

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);

  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Riwayat Aktivitas</h3>
          <p className="text-gray-600 text-sm">Catatan semua aktivitas Anda</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Filter */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                onClick={() => setFilter(filterItem.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === filterItem.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </div>

          {/* Sort & Export */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="date">Terbaru</option>
              <option value="points">Poin Tertinggi</option>
            </select>
            <Button
              variant="outline"
              className="rounded-lg flex items-center gap-2"
              onClick={() => alert('Export akan segera hadir!')}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 p-4 bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Aktivitas</p>
            <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Poin</p>
            <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Rata-rata Poin</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(totalPoints / activities.length)}
            </p>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {sortedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className={`p-3 ${getActivityColor(activity.type)} rounded-lg`}>
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">+{activity.points}</p>
                    <p className="text-xs text-gray-500">poin</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activity.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getActivityColor(activity.type)}`}>
                  {activity.type === 'pickup' ? 'Penjemputan' :
                   activity.type === 'recycle' ? 'Daur Ulang' :
                   activity.type === 'event' ? 'Event' : 'Scan'}
                </span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Pagination/View More */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <Button
          variant="ghost"
          className="text-emerald-600 hover:text-emerald-700"
          onClick={() => alert('Memuat lebih banyak aktivitas...')}
        >
          Lihat Selengkapnya
        </Button>
      </div>
    </Card>
  );
};

export default ActivityHistory;