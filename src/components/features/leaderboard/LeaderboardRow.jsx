// src/components/features/leaderboard/LeaderboardRow.jsx
import { getRankColor, getRankIcon, getTier } from '../../../utils/LeaderboardUtils';
import React from 'react';

const LeaderboardRow = ({ 
  user, 
  currentUser
}) => {
  const isCurrentUser = user.id === currentUser.id;
  const tier = getTier(user.points);
  const rankColor = getRankColor(user.rank);
  const rankIcon = getRankIcon(user.rank);
  
  return (
    <tr 
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isCurrentUser ? 'bg-amber-50/50' : ''
      }`}
    >
      {/* Rank */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rankColor}`}>
            <span className={`font-bold ${user.rank <= 3 ? 'text-white' : 'text-gray-700'}`}>
              {user.rank}
            </span>
          </div>
          {user.rank <= 3 && (
            <div className="hidden md:block">
              {rankIcon}
            </div>
          )}
        </div>
      </td>
      
      {/* User */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${isCurrentUser ? 'ring-2 ring-amber-500 ring-offset-2' : ''}`}>
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff`}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 flex items-center gap-2">
              {user.name}
              {isCurrentUser && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Anda
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      
      {/* Level */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${tier.bg} ${tier.color}`}>
            {tier.name}
          </div>
          <div className="text-gray-700 font-medium">Lv. {user.level || 1}</div>
        </div>
      </td>
      
      {/* Points */}
      <td className="py-4 px-6">
        <div className="font-bold text-gray-900 text-lg">
          {user.points.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">
          {Math.floor(user.points / 100)} aksi
        </div>
      </td>
      
      {/* Waste Processed */}
      <td className="py-4 px-6">
        <div className="font-medium text-gray-900">
          {Math.floor(user.points / 10)} kg
        </div>
        <div className="text-sm text-gray-500">
          {Math.floor(user.points / 50)} pickup
        </div>
      </td>
      
      {/* Status */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            user.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'
          }`} />
          <span className="text-sm text-gray-600">
            {user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(LeaderboardRow);