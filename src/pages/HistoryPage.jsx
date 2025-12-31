// src/pages/HistoryPage.jsx
import { useState, useMemo } from 'react';
import { Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import LayoutWrapper from '../components/layout/LayoutWrapper';

import { 
  ArrowLeft,
  Filter,
  Calendar,
  Search,
  Download,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Recycle,
  Truck,
  BookOpen,
  Users,
  Camera,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { getActivitiesByPoints } from '../utils/activityUtils';
import { formatDateHistory, formatTime } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';

const HistoryPage = () => {
  const navigate = useNavigate()
  const {user }= useAuth()
  console.log(user)
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Get activities from utility function
  const allActivities = getActivitiesByPoints(user);
  
  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    let filtered = [...allActivities];
    
    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === selectedFilter);
    }
    
    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          break;
      }
      
      if (startDate) {
        filtered = filtered.filter(activity => new Date(activity.date) >= startDate);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [allActivities, selectedFilter, dateRange, searchQuery]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPoints = filteredActivities.reduce((sum, activity) => sum + (activity.points || 0),0);
    const totalActivities = filteredActivities.length;
    
    const activityTypes = {
      pickup: filteredActivities.filter(a => a.type === 'pickup').length,
      recycle: filteredActivities.filter(a => a.type === 'recycle').length,
      event: filteredActivities.filter(a => a.type === 'event').length,
      achievement: filteredActivities.filter(a => a.type === 'achievement').length,
      scan: filteredActivities.filter(a => a.type === 'scan').length,
      article: filteredActivities.filter(a => a.type === 'article').length,
      community: filteredActivities.filter(a => a.type === 'community').length,
    };
    
    return { totalPoints, totalActivities, activityTypes };
  }, [filteredActivities]);

  // Activity type configuration
  const activityConfig = {
    pickup: {
      label: 'Penjemputan',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    recycle: {
      label: 'Daur Ulang',
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    event: {
      label: 'Event',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    achievement: {
      label: 'Achievement',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    scan: {
      label: 'Scan',
      icon: Camera,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    article: {
      label: 'Artikel',
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    community: {
      label: 'Komunitas',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
    join: {
      label: 'Bergabung',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    }
  };

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Semua Aktivitas' },
    { id: 'pickup', label: 'Penjemputan' },
    { id: 'recycle', label: 'Daur Ulang' },
    { id: 'event', label: 'Event' },
    { id: 'achievement', label: 'Achievement' },
    { id: 'scan', label: 'Scan Sampah' },
    { id: 'article', label: 'Artikel' },
    { id: 'community', label: 'Komunitas' },
  ];

  const dateOptions = [
    { id: 'all', label: 'Semua Waktu' },
    { id: 'today', label: 'Hari Ini' },
    { id: 'week', label: '7 Hari Terakhir' },
    { id: 'month', label: '30 Hari Terakhir' },
  ];

  // Handle export history
  const handleExportHistory = () => {
    const data = filteredActivities.map(activity => ({
      Tanggal: formatDateHistory(activity.date),
      Aktivitas: activity.title,
      Deskripsi: activity.description,
      Poin: activity.points,
      Tipe: activityConfig[activity.type]?.label || activity.type,
      Status: 'Selesai'
    }));
    
    const csvContent = [
      ['Tanggal', 'Aktivitas', 'Deskripsi', 'Poin', 'Tipe', 'Status'],
      ...data.map(item => [item.Tanggal, item.Aktivitas, item.Deskripsi, item.Poin, item.Tipe, item.Status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `history-sipakatau-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert('Riwayat berhasil diekspor!');
  };

  return (
    <LayoutWrapper>
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Riwayat Aktivitas</h1>
              <p className="text-sm text-gray-600">Track semua kegiatan lingkunganmu</p>
            </div>
          </div>
          <button
            onClick={handleExportHistory}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-4">
        <Card className="p-6 rounded-2xl">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-2xl font-bold text-gray-900">9000</span>
              </div>
              <p className="text-sm text-gray-600">Total Poin</p>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalActivities}</span>
              </div>
              <p className="text-sm text-gray-600">Total Aktivitas</p>
            </div>
          </div>

          {/* Activity Type Distribution */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Distribusi Aktivitas</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.activityTypes).map(([type, count]) => {
                if (count === 0) return null;
                const config = activityConfig[type];
                if (!config) return null;
                
                return (
                  <div
                    key={type}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}
                  >
                    <config.icon className={`w-4 h-4 ${config.iconColor}`} />
                    <span className="text-sm font-medium text-gray-900">{config.label}</span>
                    <span className="text-xs bg-white/50 px-2 py-0.5 rounded-full">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4">
        <Card className="p-4 rounded-2xl">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari aktivitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filter:</span>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2">
                {filterOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFilter(option.id)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedFilter === option.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Periode:</span>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2">
                {dateOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setDateRange(option.id)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      dateRange === option.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity List */}
      <div className="px-4">
        {filteredActivities.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada aktivitas</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `Tidak ditemukan aktivitas dengan kata kunci "${searchQuery}"`
                : selectedFilter !== 'all'
                ? `Belum ada aktivitas ${activityConfig[selectedFilter]?.label?.toLowerCase()}`
                : 'Belum ada aktivitas yang tercatat'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setDateRange('all');
              }}
              className="text-emerald-600 font-medium hover:text-emerald-700"
            >
              Reset filter
            </button>
          </Card>
        ) : (
          <div className="space-y-3">
            {/* Timeline */}
            {(() => {
              // Group activities by date
              const groupedActivities = filteredActivities.reduce((groups, activity) => {
                const date = new Date(activity.date).toDateString();
                if (!groups[date]) groups[date] = [];
                groups[date].push(activity);
                return groups;
              }, {});

              return Object.entries(groupedActivities).map(([dateString, activities]) => {
                const date = new Date(dateString);
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                
                let dateLabel;
                if (date.toDateString() === today.toDateString()) {
                  dateLabel = 'Hari Ini';
                } else if (date.toDateString() === yesterday.toDateString()) {
                  dateLabel = 'Kemarin';
                } else {
                  dateLabel = date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                }

                return (
                  <div key={dateString}>
                    {/* Date Header */}
                    <div className="sticky top-16 z-10 bg-gray-50 py-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <h3 className="font-semibold text-gray-900">{dateLabel}</h3>
                        <span className="text-sm text-gray-500 ml-auto">
                          {activities.length} aktivitas
                        </span>
                      </div>
                    </div>

                    {/* Activities for this date */}
                    <div className="space-y-3">
                      {activities.map((activity) => {
                        const config = activityConfig[activity.type] || activityConfig.join;
                        const Icon = config.icon;
                        
                        return (
                          <Card 
                            key={activity.id} 
                            className="p-4 rounded-2xl hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`p-3 rounded-xl ${config.bgColor}`}>
                                <Icon className={`w-6 h-6 ${config.iconColor}`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                                      <Zap className="w-4 h-4" />
                                      <span>+{activity.points}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {formatTime(activity.date)}
                                    </div>
                                  </div>
                                </div>

                                {/* Meta info */}
                                <div className="flex items-center gap-3 mt-3">
                                  <div className="flex items-center gap-1 text-xs">
                                    <MapPin className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-600">
                                      {activity.location || 'Lokasi tidak tersedia'}
                                    </span>
                                  </div>
                                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                    activity.status === 'completed' 
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : activity.status === 'pending'
                                      ? 'bg-amber-50 text-amber-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {activity.status === 'completed' ? (
                                      <CheckCircle className="w-3 h-3" />
                                    ) : activity.status === 'pending' ? (
                                      <AlertCircle className="w-3 h-3" />
                                    ) : (
                                      <XCircle className="w-3 h-3" />
                                    )}
                                    <span>
                                      {activity.status === 'completed' ? 'Selesai' :
                                       activity.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>

      {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20  bg-opacity-50 z-999 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Detail Aktivitas</h3>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  {/* Gunakan icon dari activity, bukan dari config */}
                  {selectedActivity.icon && (
                    <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                      selectedActivity.bgColor || 'bg-gray-100'
                    }`}>
                      <selectedActivity.icon className={`w-12 h-12 ${
                        selectedActivity.iconColor || 'text-gray-600'
                      }`} />
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedActivity.title}</h4>
                  <p className="text-gray-600">{selectedActivity.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Poin</div>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold">
                        <Zap className="w-4 h-4" />
                        <span>+{selectedActivity.points}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Tanggal</div>
                      <div className="font-medium text-gray-900">
                        {formatDateHistory(selectedActivity.date)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Waktu</div>
                    <div className="font-medium text-gray-900">
                      {formatTime(selectedActivity.date)}
                    </div>
                  </div>

                  {selectedActivity.location && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Lokasi</div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedActivity.location}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                      selectedActivity.status === 'completed' 
                        ? 'bg-emerald-50 text-emerald-700'
                        : selectedActivity.status === 'pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {selectedActivity.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : selectedActivity.status === 'pending' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {selectedActivity.status === 'completed' ? 'Selesai' :
                        selectedActivity.status === 'pending' ? 'Menunggu Konfirmasi' : 'Dibatalkan'}
                      </span>
                    </div>
                  </div>

                  {selectedActivity.notes && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm text-blue-600 mb-1">Catatan</div>
                      <div className="text-gray-900">{selectedActivity.notes}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      // Logic untuk melihat detail lebih lanjut
                      if (selectedActivity.type === 'pickup') {
                        navigate('/pickup');
                      } else if (selectedActivity.type === 'event') {
                        // Navigate to event detail
                      }
                    }}
                    className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Lihat Detail Lengkap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
    </LayoutWrapper>
  );
};

export default HistoryPage;