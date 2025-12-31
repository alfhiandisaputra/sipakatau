// src/utils/activityUtils.js (updated version)
import { 
  UserPlus, 
  Truck, 
  Recycle, 
  Calendar, 
  Camera, 
  Award,
  BookOpen,
  Users,
  Star,
  Target,
  Leaf,
  Shield,
  Crown,
  Trophy,
  Globe,
  Zap,
  CheckCircle,
  Home,
  MapPin
} from 'lucide-react';

// Get activity icon
export const getActivityIcon = (type) => {
  switch (type) {
    case 'join': return UserPlus;
    case 'pickup': return Truck;
    case 'recycle': return Recycle;
    case 'event': return Calendar;
    case 'scan': return Camera;
    case 'achievement': return Award;
    case 'level_up': return Star;
    case 'article': return BookOpen;
    case 'community': return Users;
    case 'challenge': return Target;
    case 'environmental': return Leaf;
    case 'warrior': return Shield;
    case 'master': return Crown;
    case 'legend': return Trophy;
    case 'planet_hero': return Globe;
    case 'points': return Zap;
    case 'completion': return CheckCircle;
    default: return Home;
  }
};

// Get activity color
export const getActivityColor = (type) => {
  switch (type) {
    case 'join': return { icon: 'text-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-700' };
    case 'pickup': return { icon: 'text-blue-600', bg: 'bg-blue-50', text: 'text-blue-700' };
    case 'recycle': return { icon: 'text-green-600', bg: 'bg-green-50', text: 'text-green-700' };
    case 'event': return { icon: 'text-purple-600', bg: 'bg-purple-50', text: 'text-purple-700' };
    case 'scan': return { icon: 'text-amber-600', bg: 'bg-amber-50', text: 'text-amber-700' };
    case 'achievement': return { icon: 'text-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700' };
    case 'level_up': return { icon: 'text-pink-600', bg: 'bg-pink-50', text: 'text-pink-700' };
    case 'article': return { icon: 'text-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-700' };
    case 'community': return { icon: 'text-cyan-600', bg: 'bg-cyan-50', text: 'text-cyan-700' };
    case 'challenge': return { icon: 'text-orange-600', bg: 'bg-orange-50', text: 'text-orange-700' };
    default: return { icon: 'text-gray-600', bg: 'bg-gray-50', text: 'text-gray-700' };
  }
};

// Format activity date
export const formatActivityDate = (dateString) => {
  if (!dateString) return 'Tanggal tidak tersedia';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hari ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Format activity time
export const formatActivityTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Enhanced function that works with your user data structure
export const getActivitiesByPoints = (user) => {
  if (!user) return [];
  
  // Safely extract properties with defaults
  const points = user?.points || 0;
  const level = user?.level || 'Pemula';
  const joinDate = user?.joinDate || user?.createdAt || '2024-01-01';
  
  // Calculate derived values based on points and level
  const estimatedPickupCount = points >= 9000 ? 50 : 
                               points >= 5000 ? 30 :
                               points >= 1000 ? 15 :
                               points >= 500 ? 8 : 3;
  
  const estimatedRecycledKg = points >= 9000 ? 250 :
                              points >= 5000 ? 120 :
                              points >= 1000 ? 60 :
                              points >= 500 ? 25 : 10;
  
  const estimatedArticleRead = points >= 9000 ? 20 :
                               points >= 5000 ? 12 :
                               points >= 1000 ? 8 :
                               points >= 500 ? 5 : 2;
  
  const estimatedEventCount = points >= 9000 ? 8 :
                              points >= 5000 ? 5 :
                              points >= 1000 ? 3 :
                              points >= 500 ? 2 : 1;
  
  const activities = [];
  
  // 1. Join Activity (always)
  activities.push({
    id: 1,
    type: 'join',
    title: 'Bergabung dengan SIPAKATAU',
    description: 'Menjadi anggota komunitas peduli lingkungan',
    points: 50,
    date: joinDate,
    status: 'completed',
    location: 'Aplikasi SIPAKATAU',
    icon: getActivityIcon('join'),
    ...getActivityColor('join')
  });
  
  // 2. First Pickup (for Master level users)
  if (level === 'Master') {
    activities.push({
      id: 2,
      type: 'pickup',
      title: 'Penjemputan Pertama',
      description: 'TPS Terpadu Watansoppeng - Sampah Plastik',
      points: 100,
      date: new Date(new Date(joinDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'TPS Terpadu Watansoppeng',
      icon: getActivityIcon('pickup'),
      ...getActivityColor('pickup')
    });
  }
  
  // 3. Active Collector (based on estimated pickup count)
  if (estimatedPickupCount >= 10) {
    activities.push({
      id: 3,
      type: 'pickup',
      title: 'Pengumpul Aktif',
      description: `Telah melakukan ${estimatedPickupCount} penjemputan sampah`,
      points: 200,
      date: new Date(new Date(joinDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Lokasi Penjemputan',
      icon: getActivityIcon('pickup'),
      ...getActivityColor('pickup')
    });
  }
  
  // 4. Recycling Activity (for users with points)
  if (points >= 500) {
    activities.push({
      id: 4,
      type: 'recycle',
      title: 'Daur Ulang Plastik',
      description: `Mendaur ulang ${estimatedRecycledKg} kg sampah plastik`,
      points: 150,
      date: new Date(new Date(joinDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Bank Sampah Induk Soppeng',
      icon: getActivityIcon('recycle'),
      ...getActivityColor('recycle')
    });
  }
  
  // 5. Article Reading (for educated users)
  if (estimatedArticleRead >= 5) {
    activities.push({
      id: 5,
      type: 'article',
      title: 'Eco Learner',
      description: `Membaca ${estimatedArticleRead} artikel edukasi lingkungan`,
      points: 100,
      date: new Date(new Date(joinDate).getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('article'),
      ...getActivityColor('article')
    });
  }
  
  // 6. Event Participation
  if (estimatedEventCount > 0) {
    activities.push({
      id: 6,
      type: 'event',
      title: 'Event Bersih-bersih',
      description: 'Partisipasi dalam event komunitas',
      points: 300,
      date: new Date(new Date(joinDate).getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Pantai Soppeng',
      icon: getActivityIcon('event'),
      ...getActivityColor('event')
    });
  }
  
  // 7. Level Up Achievements
  if (level !== 'Pemula') {
    const levelPoints = {
      'Sadar Lingkungan': 100,
      'Warrior': 200,
      'Master': 300,
      'Planet Hero': 500
    };
    
    activities.push({
      id: 7,
      type: 'achievement',
      title: 'Level Up!',
      description: `Mencapai level ${level}`,
      points: levelPoints[level] || 100,
      date: new Date(new Date(joinDate).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('level_up'),
      ...getActivityColor('achievement')
    });
  }
  
  // 8. Point Milestones
  if (points >= 500) {
    activities.push({
      id: 8,
      type: 'achievement',
      title: '500 Poin!',
      description: 'Mencapai 500 poin pertama',
      points: 50,
      date: new Date(new Date(joinDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('points'),
      ...getActivityColor('achievement')
    });
  }
  
  if (points >= 1000) {
    activities.push({
      id: 9,
      type: 'achievement',
      title: '1000 Poin!',
      description: 'Mencapai 1000 poin',
      points: 100,
      date: new Date(new Date(joinDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('points'),
      ...getActivityColor('achievement')
    });
  }
  
  if (points >= 5000) {
    activities.push({
      id: 10,
      type: 'achievement',
      title: '5000 Poin!',
      description: 'Mencapai 5000 poin - Level Master',
      points: 300,
      date: new Date(new Date(joinDate).getTime() + 40 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('master'),
      ...getActivityColor('achievement')
    });
  }
  
  if (points >= 9000) {
    activities.push({
      id: 11,
      type: 'achievement',
      title: '9000 Poin!',
      description: 'Hampir mencapai level Planet Hero',
      points: 400,
      date: new Date(new Date(joinDate).getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('master'),
      ...getActivityColor('achievement')
    });
  }
  
  // 9. Scan Activity (for Master level)
  if (level === 'Master') {
    activities.push({
      id: 12,
      type: 'scan',
      title: 'Scan Sampah Expert',
      description: 'Identifikasi 50+ jenis sampah',
      points: 150,
      date: new Date(new Date(joinDate).getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Aplikasi SIPAKATAU',
      icon: getActivityIcon('scan'),
      ...getActivityColor('scan')
    });
  }
  
  // 10. Community Activity
  if (points >= 2000) {
    activities.push({
      id: 13,
      type: 'community',
      title: 'Kontributor Komunitas',
      description: 'Berbagi tips dan pengalaman lingkungan',
      points: 80,
      date: new Date(new Date(joinDate).getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      location: 'Forum SIPAKATAU',
      icon: getActivityIcon('community'),
      ...getActivityColor('community')
    });
  }
  
  // Sort by date descending (newest first)
  return activities
    .filter(activity => activity.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(activity => ({
      ...activity,
      formattedDate: formatActivityDate(activity.date),
      formattedTime: formatActivityTime(activity.date)
    }));
};

// Enhanced version that auto-calculates stats
export const getActivityStats = (user) => {
  const activities = getActivitiesByPoints(user);
  
  const stats = {
    totalActivities: activities.length,
    totalPoints: activities.reduce((sum, activity) => sum + activity.points, 0),
    byType: {},
    recentActivity: activities[0] || null
  };
  
  // Count by type
  activities.forEach(activity => {
    stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;
  });
  
  return stats;
};

// Get recent activities (with limit)
export const getRecentActivities = (user, limit = 5) => {
  const activities = getActivitiesByPoints(user);
  return activities.slice(0, limit);
};

// Export all functions
export default {
  getActivitiesByPoints,
  getActivityStats,
  getRecentActivities,
  getActivityIcon,
  getActivityColor,
  formatActivityDate,
  formatActivityTime
};