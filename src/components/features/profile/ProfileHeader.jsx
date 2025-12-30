// src/components/features/profile/ProfileHeader.jsx
import { ArrowLeft, Share2, Camera, MapPin } from 'lucide-react';
import { Button } from '../../ui';
import { getUserLevelBadge, getRankFromPoints } from '../../../utils'
import { mockUsers } from '../../../data/mockUsers';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ user}) => {
  const userBadge = getUserLevelBadge(user?.level);
  const userRank = getRankFromPoints(user?.points || 0, mockUsers);
  const navigate = useNavigate();
  
  return (
    <div className="bg-linear-to-r from-emerald-500 to-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-emerald-300 to-teal-400 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  onClick={() => alert('Ganti foto profil - fitur akan segera hadir!')}
                >
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {user?.name || 'Pengguna'}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${userBadge.color}`}>
                    {userBadge.label}
                  </span>
                </div>
                <p className="text-emerald-100">
                  {user?.email || 'email@contoh.com'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  <span className="text-emerald-100 text-sm">
                    Kabupaten Soppeng, Sulawesi Selatan
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/map')}
              className="bg-white/10 hover:bg-white/20 border-white text-white rounded-2xl"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Lihat Peta
            </Button>
            <Button
              variant="outline"
              onClick={() => alert('Fitur berbagi profil akan segera hadir!')}
              className="bg-white/10 hover:bg-white/20 border-white text-white rounded-2xl"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan Profil
            </Button>
          </div>
        </div>
        
        {/* Member Since & Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
            <p className="text-emerald-100 text-sm">Anggota Sejak</p>
            <p className="text-2xl font-bold text-white">
              {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'Jan 2024'}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
            <p className="text-emerald-100 text-sm">Level</p>
            <p className="text-2xl font-bold text-white">
              {user?.level || 'Pemula'}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
            <p className="text-emerald-100 text-sm">Peringkat</p>
            <p className="text-2xl font-bold text-white">
              #{userRank}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
            <p className="text-emerald-100 text-sm">Total Poin</p>
            <p className="text-2xl font-bold text-white">
              {(user?.points || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;