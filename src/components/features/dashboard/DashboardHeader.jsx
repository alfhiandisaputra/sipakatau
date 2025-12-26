// src/components/features/dashboard/DashboardHeader.jsx
import { Award } from 'lucide-react';
import { formatPoints } from '../../../utils/formatters';

export default function DashboardHeader({ user }) {
  return (
    <div className="bg-linear-to-r from-emerald-500 to-teal-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Selamat datang, {user.name}!
            </h1>
            <p className="text-emerald-100 mt-1 md:mt-2 text-sm md:text-base">
              Teruskan kontribusi Anda untuk lingkungan yang lebih baik
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-linear-to-br from-amber-500 to-emerald-400 bg-white p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-xs md:text-sm">Total Poin Anda</p>
                  <p className="text-xl md:text-3xl font-bold text-white">
                    {formatPoints(user.points)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}