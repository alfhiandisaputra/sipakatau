// src/pages/UserDashboard.jsx
import { useState } from 'react';
import { Card, Button } from '../components/ui';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { 
  StatsCard, 
  EcoLevel, 
  Leaderboard, 
  QuickActions, 
  DashboardHeader 
} from '../components/features/dashboard';
import { 
  Recycle, 
  Package, 
  Award, 
  Calendar,
  History,
  Plus
} from 'lucide-react';
import { mockUsers } from '../data/mockUsers';
import { mockWasteData } from '../data/mockWasteData';
import { formatPoints, formatDate } from '../utils/formatters';
import { cn } from '../utils';
import { useAuth } from '../hooks/useAuth';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const { user: currentUser } = useAuth();
  

  const regularUsers = mockUsers.filter(user => user.role === 'user');
  
  const sortedUsersForLeaderboard = [...regularUsers]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5); 

  const userActivities = mockWasteData
    .filter(activity => activity.userId === currentUser?.id)
    .slice(0, 5);
  
  const userStats = userActivities.reduce((stats, activity) => {
    return {
      totalWaste: stats.totalWaste + (activity.weight || 0),
      totalPoints: stats.totalPoints + (activity.points || 0),
      totalPickups: stats.totalPickups + (activity.type === 'pickup' ? 1 : 0),
    };
  }, { totalWaste: 0, totalPoints: 0, totalPickups: 0 });

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'recycling', label: 'Daur Ulang' },
    { id: 'pickup', label: 'Pickup' },
    { id: 'reward', label: 'Reward' }
  ];

  return (
    <LayoutWrapper user={currentUser}>
      <div className="min-h-screen bg-gray-50 md:pb-0">
        <DashboardHeader user={currentUser} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <QuickActions />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Statistik Anda</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatsCard
                    title="Total Sampah"
                    value={`${userStats.totalWaste} kg`}
                    change="+12% dari bulan lalu"
                    icon={<Recycle className="w-5 h-5" />}
                    color="emerald"
                  />
                  <StatsCard
                    title="Total Poin"
                    value={formatPoints(currentUser.points)}
                    change="+150 poin bulan ini"
                    icon={<Award className="w-5 h-5" />}
                    color="amber"
                  />
                  <StatsCard
                    title="Total Pickup"
                    value={userStats.totalPickups}
                    change="2 pickup bulan ini"
                    icon={<Package className="w-5 h-5" />}
                    color="blue"
                  />
                </div>
              </div>

              {/* Eco Level */}
          <div>
            <EcoLevel 
              points={currentUser.points}
              level={currentUser.level}
            />
          </div>

             {/* Recent Activity */}
          <Card className="p-4 sm:p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      'px-3 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                      'min-w-17.5 text-center', 
                      activeFilter === filter.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {userActivities.length > 0 ? (
                userActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'p-3 rounded-xl shrink-0',
                        activity.type === 'recycling' ? 'bg-emerald-100' :
                        activity.type === 'pickup' ? 'bg-blue-100' :
                        'bg-amber-100'
                      )}>
                        {activity.type === 'recycling' ? (
                          <Recycle className="w-5 h-5 text-emerald-600" />
                        ) : activity.type === 'pickup' ? (
                          <Package className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Award className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <div className="sm:hidden flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                    </div>
                    
                    <div className="flex justify-between sm:flex-col sm:text-right">
                      <div className="sm:hidden">
                        <p className="text-sm text-gray-500">{activity.weight} kg</p>
                      </div>
                      <p className={cn(
                        'font-semibold text-lg sm:text-base',
                        activity.points > 0 ? 'text-emerald-600' : 'text-amber-600'
                      )}>
                        {activity.points > 0 ? '+' : ''}{formatPoints(activity.points)} poin
                      </p>
                      <p className="hidden sm:block text-sm text-gray-500 mt-1">
                        {activity.weight} kg
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Recycle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">Belum ada aktivitas terbaru</p>
                  <p className="text-sm text-gray-400">Mulai aktivitas pertama Anda untuk melihatnya di sini</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/scanner')}
                    className="mt-4"
                  >
                    Mulai Aktivitas
                  </Button>
                </div>
              )}
            </div>
                <Button
                  variant="ghost"
                  className="w-full mt-6 rounded-xl py-3"
                  onClick={() => navigate('/history')}
                >
                  <History className="w-4 h-4 mr-2" />
                  Lihat Semua Aktivitas
                </Button>
              </Card>
            </div>

            {/* Right Column - Leaderboard & Goals */}
            <div className="space-y-8">
              <div className="invisible flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">invisible</h2>
              </div>
              {/* Leaderboard */}
            <Card className="p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5">Papan Peringkat</h2>
                  <span className="text-sm text-gray-500 mb">Top 5</span>
              </div>
                <Leaderboard 
                  users={sortedUsersForLeaderboard} 
                  currentUserId={currentUser.id} 
                />
                <Button
                  variant="ghost"
                  className="w-full mt-6 rounded-xl"
                  onClick={() => navigate('/leaderboard')}
                >
                  Lihat Peringkat Lengkap
                </Button>
              </Card>

              {/* Monthly Goal */}
              <Card className="p-6 rounded-3xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Target Bulanan</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Pengumpulan Sampah</span>
                      <span>{userStats.totalWaste}/10 kg</span>
                    </div>
                    <div className="h-3 bg-emerald-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${Math.min((userStats.totalWaste / 10) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Poin yang Dikumpulkan</span>
                      <span>{currentUser.points}/500 poin</span>
                    </div>
                    <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${Math.min((currentUser.points / 500) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="w-full mt-6 rounded-xl"
                  onClick={() => navigate('/scanner')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kontribusi
                </Button>
              </Card>

              {/* Quick Tips */}
              <Card className="p-6 rounded-3xl">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tips Hari Ini</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                      <Recycle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Pisahkan Plastik Transparan</h4>
                      <p className="text-sm text-gray-600 mt-1">Plastik transparan bernilai lebih tinggi untuk didaur ulang</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Jadwalkan Pickup Pagi</h4>
                      <p className="text-sm text-gray-600 mt-1">Pickup pagi hari memiliki slot yang lebih banyak</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}