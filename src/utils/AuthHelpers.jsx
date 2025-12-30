// src/utils/authHelpers.js
import { mockUsers } from '../data/mockUsers';

export const getUserInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const formatUserPoints = (points) => {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return points.toString();
};

export const getUserLevelBadge = (level) => {
  const badges = {
    'Pemula': { color: 'bg-gray-100 text-gray-800', label: 'Pemula' },
    'Sadar Lingkungan': { color: 'bg-green-100 text-green-800', label: 'Sadar Lingkungan' },
    'Warrior': { color: 'bg-blue-100 text-blue-800', label: 'Warrior' },
    'Master': { color: 'bg-purple-100 text-purple-800', label: 'Master' }
  };
  
  return badges[level] || badges['Pemula'];
};

export const getRankFromPoints = (points, userList = mockUsers) => {
  // Sort users by points descending
  const sortedUsers = [...userList].sort((a, b) => b.points - a.points);
  const rank = sortedUsers.findIndex(u => u.points <= points) + 1;
  return rank || sortedUsers.length + 1;
};

export const calculateLevelProgress = (points, level) => {
  const levelThresholds = {
    'Pemula': 0,
    'Sadar Lingkungan': 500,
    'Warrior': 1000,
    'Master': 5000
  };
  
  const currentThreshold = levelThresholds[level] || 0;
  const nextLevel = Object.keys(levelThresholds).find(key => levelThresholds[key] > currentThreshold) || 'Master';
  const nextThreshold = levelThresholds[nextLevel] || 5000;
  
  if (nextThreshold === currentThreshold) return 100;
  
  const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export const getNextLevelThreshold = (level) => {
  const thresholds = {
    'Pemula': 500,
    'Sadar Lingkungan': 1000,
    'Warrior': 5000,
    'Master': 10000
  };
  
  return thresholds[level] || 500;
};

export const getUserProgress = (user) => {
  const points = user?.points || 0;
  const level = user?.level || 'Pemula';
  const progress = calculateLevelProgress(points, level);
  const nextLevel = level === 'Pemula' ? 'Sadar Lingkungan' :
                   level === 'Sadar Lingkungan' ? 'Warrior' :
                   level === 'Warrior' ? 'Master' : 'Maksimal';
  
  return {
    progress,
    nextLevel,
    nextThreshold: getNextLevelThreshold(level),
    currentThreshold: level === 'Pemula' ? 0 :
                     level === 'Sadar Lingkungan' ? 500 :
                     level === 'Warrior' ? 1000 : 5000
  };
};