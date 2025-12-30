// src/components/features/leaderboard/LeaderboardRewards.jsx
import { Crown, TrendingUp, Award, Zap, Sparkles } from 'lucide-react';
import { Card, Button } from '../../ui';

export default function LeaderboardRewards({ 
  currentUser, 
  userRank, 
  totalUsers, 
  formatNumber,
  onNavigate 
}) {
  const needsPoints = 5000 - currentUser.points;
  
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="p-6 rounded-3xl bg-linear-to-br from-yellow-50 to-amber-50 border border-yellow-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Crown className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Peringkat 1-3</h3>
            <p className="text-sm text-gray-600">Penghargaan khusus setiap bulan</p>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Voucher belanja senilai Rp 500.000</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Piagam penghargaan digital</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Fitur premium selama 1 bulan</span>
          </li>
        </ul>
      </Card>
      
      <Card className="p-6 rounded-3xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Tips Naik Peringkat</h3>
            <p className="text-sm text-gray-600">Cara meningkatkan poin Anda</p>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Scan sampah setiap hari (+10 poin)</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Jadwalkan pickup rutin (+50 poin)</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Ajak teman bergabung (+100 poin)</span>
          </li>
        </ul>
      </Card>
      
      <Card className="p-6 rounded-3xl bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Target Anda</h3>
            <p className="text-sm text-gray-600">Raih peringkat lebih tinggi</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Peringkat saat ini</span>
              <span>#{userRank}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"
                style={{ width: `${Math.min(((totalUsers - userRank) / totalUsers) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {needsPoints > 0 
                ? `Butuh ${formatNumber(needsPoints)} poin lagi untuk mencapai Master Tier!`
                : 'Anda sudah mencapai Master Tier! 🎉'}
            </p>
            <Button
              onClick={() => onNavigate('/scanner')}
              variant="primary"
              className="rounded-xl w-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Tambah Poin Sekarang
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}