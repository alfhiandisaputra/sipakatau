// src/utils/leaderboardUtils.js
import { Crown, Medal, Star } from 'lucide-react';

export const getRankColor = (rank) => {
  switch (rank) {
    case 1: return 'bg-gradient-to-r from-purple-200 to-purple-500';
    case 2: return 'bg-gradient-to-r from-yellow-300 to-yellow-400';
    case 3: return 'bg-gradient-to-r from-amber-700 to-amber-800';
    default: return 'bg-gray-100';
  }
};

export const getRankIcon = (rank) => {
  switch (rank) {
    case 1: return <Crown className="w-5 h-5 text-purple-500" />;
    case 2: return <Medal className="w-5 h-5 text-yellow-500" />;
    case 3: return <Medal className="w-5 h-5 text-amber-700" />;
    default: return <Star className="w-4 h-4 text-gray-400" />;
  }
};

export const getTier = (points) => {
  if (points >= 10000) return { name: 'Planet Hero', color: 'text-purple-600', bg: 'bg-purple-100' };
  if (points >= 5000) return { name: 'Master', color: 'text-amber-600', bg: 'bg-amber-100' };
  if (points >= 1000) return { name: 'Warior', color: 'text-emerald-600', bg: 'bg-emerald-100' };
  if (points >= 500) return { name: 'Pemula', color: 'text-emerald-600', bg: 'bg-emerald-100' };
  return { name: 'Beginner', color: 'text-gray-600', bg: 'bg-gray-100' };
};

export const getFilteredUsers = (users, searchTerm, activeFilter, currentUser) => {
  let result = [...users];

  if (searchTerm) {
    result = result.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  switch (activeFilter) {
    case 'top-10':
      result = result.slice(0, 10);
      break;
    case 'friends':
      if (currentUser?.region) {
        result = result.filter(user => user.region === currentUser.region);
      }
      break;
    case 'nearby':

      result = result.slice(0, 15);
      break;
    default:
      break;
  }
  
  return result;
};