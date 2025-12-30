// src/pages/ProfilePage.jsx
import { useState } from 'react';
import { ProfileHeader } from '../components/features/profile';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { 
  ProfileInfo, 
  UserStats, 
  AchievementBadges, 
  ActivityHistory, 
  SettingsPanel 
} from '../components/features/profile';
import { Card, Button } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { 
  PartyPopper, 
  Trash2, 
  BookOpen, 
  Sprout, 
  Recycle, 
  Shield, 
  Users, 
  Crown, 
  Trophy,
  User,
  Award,
  Settings,
  Bell,
  Clock
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: User },
    { id: 'achievements', label: 'Pencapaian', icon: Award },
    { id: 'history', label: 'Riwayat', icon: Clock },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const getAchievementsByLevel = (level, user) => {
  const baseAchievements = [
    { 
      id: 1, 
      name: 'Pemula Beraksi', 
      description: 'Bergabung dengan SIPAKATAU', 
      icon: PartyPopper, 
      earned: true,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    { 
      id: 2, 
      name: 'Sampah Pertama', 
      description: 'Lakukan penjemputan pertama', 
      icon: Trash2, 
      earned: user?.pickupCount > 0,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 3, 
      name: 'Eco Learner', 
      description: 'Baca 5 artikel edukasi', 
      icon: BookOpen, 
      earned: false,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  if (level === 'Sadar Lingkungan' || level === 'Warrior' || level === 'Master') {
    baseAchievements.push(
      { 
        id: 4, 
        name: 'Sadar Lingkungan', 
        description: 'Capai 500 poin', 
        icon: Sprout, 
        earned: true,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      { 
        id: 5, 
        name: 'Pengumpul Aktif', 
        description: '10x penjemputan sampah', 
        icon: Recycle, 
        earned: user?.pickupCount >= 10,
        iconColor: 'text-teal-600',
        bgColor: 'bg-teal-50'
      }
    );
  }

  if (level === 'Warrior' || level === 'Master') {
    baseAchievements.push(
      { 
        id: 6, 
        name: 'Eco Warrior', 
        description: 'Capai 1000 poin', 
        icon: Shield, 
        earned: true,
        iconColor: 'text-amber-600',
        bgColor: 'bg-amber-50'
      },
      { 
        id: 7, 
        name: 'Komunitas Aktif', 
        description: 'Ikuti 3 event bersih-bersih', 
        icon: Users, 
        earned: false,
        iconColor: 'text-indigo-600',
        bgColor: 'bg-indigo-50'
      }
    );
  }

  if (level === 'Master') {
    baseAchievements.push(
      { 
        id: 8, 
        name: 'Master Sampah', 
        description: 'Capai 5000 poin', 
        icon: Crown, 
        earned: true,
        iconColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      { 
        id: 9, 
        name: 'Legenda Hijau', 
        description: 'Bimbing 5 anggota baru', 
        icon: Trophy, 
        earned: false,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50'
      }
    );
  }

  return baseAchievements;
};

  const getActivitiesByPoints = (points) => {
    const baseActivities = [
      { 
        id: 1, 
        type: 'join', 
        title: 'Bergabung dengan SIPAKATAU', 
        description: 'Menjadi anggota komunitas peduli lingkungan', 
        points: 50, 
        date: user?.joinDate || '2024-01-01' 
      },
    ];

    if (points >= 100) {
      baseActivities.push({
        id: 2, 
        type: 'pickup', 
        title: 'Penjemputan Pertama', 
        description: 'TPS Terpadu Watansoppeng', 
        points: 100, 
        date: '2024-01-10'
      });
    }

    if (points >= 500) {
      baseActivities.push({
        id: 3, 
        type: 'recycle', 
        title: 'Daur Ulang Plastik', 
        description: 'Bank Sampah Induk Soppeng', 
        points: 200, 
        date: '2024-01-20'
      });
    }

    if (points >= 1000) {
      baseActivities.push({
        id: 4, 
        type: 'event', 
        title: 'Event Bersih-bersih', 
        description: 'Pantai Soppeng', 
        points: 300, 
        date: '2024-02-01'
      });
    }

    if (points >= 2000) {
      baseActivities.push({
        id: 5, 
        type: 'scan', 
        title: 'Scan Sampah Expert', 
        description: 'Identifikasi 50 jenis sampah', 
        points: 150, 
        date: '2024-02-15'
      });
    }

    if (points >= 5000) {
      baseActivities.push({
        id: 6, 
        type: 'achievement', 
        title: 'Master Level Unlocked', 
        description: 'Mencapai level Master', 
        points: 500, 
        date: '2024-03-01'
      });
    }

    return baseActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const achievements = getAchievementsByLevel(user?.level || 'Pemula');
  const activities = getActivitiesByPoints(user?.points || 0);

  const getUserStats = () => {
    const points = user?.points || 0;
    const level = user?.level || 'Pemula';
    
    const levelThresholds = {
      'Pemula': 499,
      'Sadar Lingkungan': 500,
      'Warrior': 1000,
      'Master': 9000,
      'Planet Hero': 10000
    };
    
    const currentThreshold = levelThresholds[level] || 0;
    const nextLevel = Object.keys(levelThresholds).find(key => levelThresholds[key] > currentThreshold) || 'Master';
    const nextThreshold = levelThresholds[nextLevel] || 5000;
    
    const progress = nextThreshold > currentThreshold 
      ? ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100
      : 100;
    
    return {
      progress: Math.min(Math.max(progress, 0), 100),
      nextLevel,
      nextThreshold,
      currentThreshold
    };
  };

  const stats = getUserStats();

  const handleUpdateProfile = async (updatedData) => {
    setIsLoading(true);
    try {
      await updateUser({ ...user, ...updatedData });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Silakan login untuk melihat profil
          </h1>
          <Button
            onClick={() => navigate('/auth')}
            variant="primary"
            className="rounded-2xl"
          >
            Login Sekarang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <LayoutWrapper user={user}>
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader
        user={user}
        onBack={() => navigate('/dashboard')}
        stats={stats}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                <ProfileInfo
                  user={user}
                  isEditing={isEditing}
                  editData={editData}
                  onEditToggle={() => setIsEditing(!isEditing)}
                  onEditChange={(field, value) => setEditData({...editData, [field]: value})}
                  onSave={handleUpdateProfile}
                  isLoading={isLoading}
                />
                
                <UserStats 
                  user={user} 
                  stats={stats}
                />
              </>
            )}

            {/* Achievements - Visible on achievements tab */}
            {activeTab === 'achievements' && (
              <AchievementBadges
                achievements={achievements}
                totalEarned={achievements.filter(a => a.earned).length}
                totalAvailable={achievements.length}
                userLevel={user?.level}
              />
            )}

            {/* Activity History - Visible on history tab */}
            {activeTab === 'history' && (
              <ActivityHistory 
                activities={activities}
                totalPoints={user?.points || 0}
              />
            )}

            {/* Settings - Visible on settings tab */}
            {activeTab === 'settings' && (
              <SettingsPanel
                user={user}
                onUpdate={handleUpdateProfile}
                onLogout={logout}
              />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions Card */}
            <Card className="p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Aksi Cepat</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full rounded-xl justify-start px-4 py-3"
                  onClick={() => navigate('/pickup')}
                >
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Jadwalkan Pickup</p>
                    <p className="text-xs text-gray-500">Request penjemputan sampah</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-xl justify-start px-4 py-3"
                  onClick={() => navigate('/map')}
                >
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Lihat Peta</p>
                    <p className="text-xs text-gray-500">Cari lokasi TPS & Bank Sampah</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-xl justify-start px-4 py-3"
                  onClick={() => navigate('/scanner')}
                >
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Scan Sampah</p>
                    <p className="text-xs text-gray-500">Identifikasi jenis sampah</p>
                  </div>
                </Button>
              </div>
            </Card>

            {/* Account Status Card */}
            <Card className="p-6 rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Status Akun</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Terverifikasi</p>
                    <p className="text-sm text-gray-600">Email</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Bell className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Notifikasi</p>
                    <p className="text-sm text-gray-600">Email aktif</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Level</p>
                    <p className="text-sm text-gray-600">{user?.level || 'Pemula'}</p>
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