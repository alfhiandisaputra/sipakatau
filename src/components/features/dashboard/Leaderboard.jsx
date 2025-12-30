// src/components/features/dashboard/Leaderboard.jsx
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatPoints } from '../../../utils/formatters';
import { cn } from '../../../utils';

function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
        <Trophy className="w-5 h-5 text-white" />
      </div>
    );
  }
  
  if (rank === 2) {
    return (
      <div className="w-8 h-8 bg-linear-to-br from-gray-400 to-gray-300 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold">{rank}</span>
      </div>
    );
  }
  
  if (rank === 3) {
    return (
      <div className="w-8 h-8 bg-linear-to-br from-amber-700 to-amber-600 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold">{rank}</span>
      </div>
    );
  }
  
  return (
    <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
      <span className="text-gray-600 font-semibold">{rank}</span>
    </div>
  );
}

function TrendIndicator({ trend }) {
  if (trend > 0) {
    return (
      <div className="flex items-center text-emerald-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-xs font-medium ml-1">+{trend}</span>
      </div>
    );
  }
  
  if (trend < 0) {
    return (
      <div className="flex items-center text-red-600">
        <TrendingDown className="w-4 h-4" />
        <span className="text-xs font-medium ml-1">{trend}</span>
      </div>
    );
  }
  
  return (
    <div className="invisible flex items-center text-gray-400">
      <Minus className="w-4 h-4" />
      <span className="text-xs font-medium ml-1">0</span>
    </div>
  );
}

export default function Leaderboard({ users, currentUserId }) {
  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div
          key={user.id}
          className={cn(
            'flex items-center gap-4 p-4 mb-4 rounded-2xl transition-colors',
            user.id === currentUserId
              ? 'bg-emerald-50 border border-emerald-100'
              : 'bg-gray-50 hover:bg-gray-100'
          )}
        >
          <RankBadge rank={index + 1} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {user.name}
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                      Anda
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Level {user.level}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm font-semibold text-amber-600">
                    {formatPoints(user.points)} poin
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <TrendIndicator trend={user.trend || 0} />
        </div>
      ))}
    </div>
  );
}