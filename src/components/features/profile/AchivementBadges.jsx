// src/components/features/profile/AchievementBadges.jsx
import { Card } from '../../ui';
import { Award, Trophy, Lock } from 'lucide-react';

const AchievementBadges = ({ achievements, totalEarned, totalAvailable }) => {
  const progress = Math.round((totalEarned / totalAvailable) * 100);

  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Pencapaian & Badges</h3>
          <p className="text-gray-600 text-sm">Koleksi prestasi Anda</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8 p-4 bg-linear-to-r from-amber-50 to-yellow-50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Progress Koleksi</p>
            <p className="text-2xl font-bold text-gray-900">{progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Badge Terkumpul</p>
            <p className="text-2xl font-bold text-gray-900">{totalEarned}/{totalAvailable}</p>
          </div>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-linear-to-r from-yellow-400 to-amber-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={`relative group ${
                  achievement.earned ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className={`p-4 rounded-xl text-center ${
                  achievement.earned 
                    ? 'bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex justify-center mb-2">
                    <Icon className="w-8 h-8 text-emerald-500" />
                  </div>

                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    {achievement.description}
                  </p>

                  {achievement.earned ? (
                    <div className="flex items-center justify-center gap-1 text-xs text-emerald-600">
                      <Award className="w-3 h-3" />
                      <span>Tercapai</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span>Terkunci</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-full"></div>
            <span className="text-gray-600">Terkunci ({totalEarned})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full"></div>
            <span className="text-gray-600">Terkunci ({totalAvailable - totalEarned})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AchievementBadges;