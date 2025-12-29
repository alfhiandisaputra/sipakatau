// src/components/features/rewards/UserPointsCard.jsx
import { Award } from 'lucide-react';
import { Card } from '../../ui';

export default function UserPointsCard({ 
  userPoints = 0, 
  totalRedeemed = 0,
  className = "" 
}) {
  return (
    <Card className={`mb-8 p-6 md:p-8 rounded-3xl bg-linear-to-r from-amber-500 to-emerald-500 border-0 shadow-xl ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white gap-6 md:gap-0">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-lg p-3 md:p-4 rounded-2xl">
            <Award className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <p className="text-white/80 text-sm md:text-lg">Poin Anda Saat Ini</p>
            <p className="text-4xl md:text-5xl font-bold">{userPoints.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="w-full md:w-auto text-left md:text-right border-t border-white/20 pt-4 md:border-0 md:pt-0">
          <p className="text-white/80 text-xs md:text-sm mb-1 uppercase tracking-wider">Total Ditukar</p>
          <p className="text-2xl md:text-3xl font-bold">{totalRedeemed.toLocaleString('id-ID')}</p>
        </div>
      </div>
    </Card>
  );
}