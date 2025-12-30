// src/components/features/leaderboard/LeaderboardHeader.jsx
import { Trophy, ArrowLeft } from 'lucide-react';
import { getRankIcon } from '../../../utils/LeaderboardUtils';

export default function LeaderboardHeader({ 
  currentUser, 
  userRank, 
  totalUsers, 
  formatNumber,
  onBack
}) {
  // Bagian userTier dihapus karena info tier tidak lagi ditampilkan
  
  return (
    <div className="bg-linear-to-r from-amber-500 via-orange-500 to-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Section: Title & Description */}
          <div className="text-center md:text-left text-white w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <button
                type="button"
                onClick={onBack}
                className="
                  group
                  bg-white/20 backdrop-blur-lg rounded-xl 
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
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Trophy className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Papan Peringkat</h1>
            </div>
            <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto md:mx-0">
              Lihat peringkat Anda di antara komunitas peduli lingkungan terbaik
            </p>
          </div>
          
          {/* Section: User Rank Card */}
          <div className="w-full md:w-auto bg-white/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/30 min-w-full md:min-w-[320px] shadow-xl">
            {/* Upper Part: Rank & Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {/* Menggunakan bg default putih transparan karena userTier.bg dihapus */}
                <div className="p-2.5 bg-white/80 rounded-xl shadow-inner">
                  {getRankIcon(userRank || 0)}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white text-sm md:text-base">Peringkat Anda</h3>
                  <p className="text-xs md:text-sm opacity-80 truncate max-w-[120px]">{currentUser.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-black text-white leading-tight">
                  #{userRank || '-'}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-80">Dari {totalUsers} User</div>
              </div>
            </div>

            {/* Lower Part: Stats Grid - Sekarang hanya 2 kolom agar seimbang */}
            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <div className="text-center md:text-left text-white border-r border-white/10">
                <div className="text-[10px] md:text-xs opacity-70 uppercase font-medium">Poin</div>
                <div className="text-lg md:text-xl font-bold">{formatNumber(currentUser.points)}</div>
              </div>
              <div className="text-center md:text-right text-white">
                <div className="text-[10px] md:text-xs opacity-70 uppercase font-medium">Level</div>
                <div className="text-lg md:text-xl font-bold">{currentUser.level || 1}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}