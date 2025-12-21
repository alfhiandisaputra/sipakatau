// src/hooks/useDashboardData.js
import { mockUsers, mockWasteData } from '../data/mockData';

export function useDashboardData() {
  const currentUser = mockUsers[0];
  
  const stats = {
    totalWaste: mockWasteData.reduce((sum, item) => sum + item.weight, 0),
    totalPoints: mockWasteData.reduce((sum, item) => sum + item.points, 0),
    totalPickups: mockWasteData.filter(item => item.type === 'pickup').length,
  };
  
  const activities = mockWasteData.slice(0, 5);
  
  return {
    currentUser,
    stats,
    activities,
  };
}