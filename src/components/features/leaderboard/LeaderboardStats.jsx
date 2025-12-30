// src/components/features/leaderboard/LeaderboardStats.jsx
import { Users, Zap, Flame, Target } from 'lucide-react';
import { Card } from '../../ui';

export default function LeaderboardStats({ 
  totalUsers, 
  highestPoints, 
  averagePoints, 
  activeUsers,
  formatNumber 
}) {
  const stats = [
    {
      label: 'Total Peserta',
      value: totalUsers,
      icon: Users,
      color: 'amber',
      gradient: 'from-amber-50 to-yellow-50',
      border: 'border-amber-100',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      label: 'Poin Tertinggi',
      value: highestPoints,
      icon: Zap,
      color: 'emerald',
      gradient: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-100',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Rata-rata Poin',
      value: averagePoints,
      icon: Flame,
      color: 'blue',
      gradient: 'from-blue-50 to-cyan-50',
      border: 'border-blue-100',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Pengguna Aktif',
      value: activeUsers,
      icon: Target,
      color: 'purple',
      gradient: 'from-purple-50 to-pink-50',
      border: 'border-purple-100',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index}
            className={`p-6 rounded-2xl bg-linear-to-br ${stat.gradient} ${stat.border}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatNumber(stat.value)}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}