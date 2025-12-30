// src/components/features/profile/UserStats.jsx
import { Card } from '../../ui';
import { 
  TrendingUp, 
  Recycle, 
  Calendar, 
  Star,
  BarChart3,
  Target
} from 'lucide-react';

const UserStats = ({ user }) => {
  const stats = [
    {
      id: 'points',
      label: 'Total Poin',
      value: user?.points || 1250,
      change: '+12%',
      icon: Star,
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      id: 'pickups',
      label: 'Penjemputan',
      value: user?.pickupCount || 24,
      change: '+8%',
      icon: Recycle,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'recycled',
      label: 'Sampah Didaur Ulang',
      value: user?.recycledKg || 156,
      unit: 'kg',
      change: '+15%',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'streak',
      label: 'Hari Berturut-turut',
      value: user?.streak || 7,
      change: '+2',
      icon: Calendar,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const weeklyProgress = [
    { day: 'Sen', value: 70 },
    { day: 'Sel', value: 45 },
    { day: 'Rab', value: 85 },
    { day: 'Kam', value: 60 },
    { day: 'Jum', value: 90 },
    { day: 'Sab', value: 75 },
    { day: 'Min', value: 50 }
  ];

  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Statistik Aktivitas</h3>
          <p className="text-gray-600 text-sm">Ringkasan performa Anda</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Activity Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Aktivitas Mingguan</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>Target: 70%</span>
          </div>
        </div>
        <div className="flex items-end justify-between h-32">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="text-xs text-gray-500 mb-2">{day.day}</div>
              <div className="relative w-8 mx-auto">
                <div className="absolute bottom-0 w-full h-full bg-gray-100 rounded-t-lg"></div>
                <div 
                  className="absolute bottom-0 w-full bg-linear-to-t from-emerald-400 to-teal-400 rounded-t-lg transition-all duration-300 hover:opacity-90"
                  style={{ height: `${day.value}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium text-gray-700 mt-1">{day.value}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900">Progress Pencapaian</h4>
            <p className="text-sm text-gray-600">Menuju level berikutnya</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">90%</p>
            <p className="text-sm text-gray-600">9000/10000 poin</p>
          </div>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-emerald-400 to-teal-400 rounded-full"
            style={{ width: '90%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Level: Master</span>
          <span>Berikutnya: Planet Hero</span>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;