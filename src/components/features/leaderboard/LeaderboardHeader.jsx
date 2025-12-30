// src/components/features/leaderboard/LeaderboardHeader.jsx
import { Trophy, ArrowLeft } from 'lucide-react';
import { getTier, getRankIcon } from '../../../utils/LeaderboardUtils';

export default function LeaderboardHeader({ 
  currentUser, 
  userRank, 
  totalUsers, 
  formatNumber,
  onBack
}) {
  const userTier = getTier(currentUser.points);
  
  return (
    <div className="bg-linear-to-r from-amber-500 via-orange-500 to-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left text-white mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <button
              type="button"
              onClick={onBack}
              className="
                group
                bg-white/20 backdrop-blur-lg rounded-2xl 
                p-2 md:p-2.5 
                hover:bg-white/40 hover:shadow-md 
                transition-all duration-200 active:scale-95 
                border border-white/10 cursor-pointer
              "
            >
              <ArrowLeft 
                className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:-translate-x-1" 
                strokeWidth={2.5} 
              />
            </button>
              <div className="p-1 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Trophy className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Papan Peringkat</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Lihat peringkat Anda di antara komunitas peduli lingkungan terbaik
            </p>
          </div>
          
          {/* User Rank Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 min-w-75">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${userTier.bg} rounded-xl`}>
                  {getRankIcon(userRank || 0)}
                </div>
                <div>
                  <h3 className="font-bold text-white">Peringkat Anda</h3>
                  <p className="text-sm opacity-80">{currentUser.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  #{userRank || '-'}
                </div>
                <div className="text-sm opacity-80">Dari {totalUsers} pengguna</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="text-sm opacity-80">Total Poin</div>
                <div className="text-2xl font-bold">{formatNumber(currentUser.points)}</div>
              </div>
              <div className="text-white">
                <div className="text-sm opacity-80">Level</div>
                <div className="text-2xl font-bold">{currentUser.level || 1}</div>
              </div>
              <div className="text-white">
                <div className="text-sm opacity-80">Tier</div>
                <div className={`text-xl font-bold ${userTier.color}`}>
                  {userTier.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}