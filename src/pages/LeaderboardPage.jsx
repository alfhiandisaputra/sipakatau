// src/pages/LeaderboardPage.jsx
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import {LeaderboardFilter,LeaderboardHeader,LeaderboardRewards,LeaderboardStats,LeaderboardTable} from '../components/features/leaderboard'
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../data/mockUsers';
import { getDeterministicChange } from '../utils/deterministicRandom';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const initialUsers = useMemo(() => {
    const regularUsers = mockUsers.filter(user => user.role === 'user');
    const sortedUsers = [...regularUsers].sort((a, b) => b.points - a.points);
    
    return sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1,
      change: getDeterministicChange(user.id),
    }));
  }, []);

  const [users] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('all-time');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const formatNumber = useCallback((num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }, []);

  const currentUserRank = useMemo(() => {
    return users.findIndex(u => u.id === currentUser?.id) + 1;
  }, [users, currentUser]);

  const stats = useMemo(() => {
    const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
    const averagePoints = Math.floor(totalPoints / users.length);
    const activeUsers = users.filter(u => u.points > 100).length;
    
    return {
      userRank: currentUserRank,
      totalPoints,
      averagePoints,
      activeUsers,
      highestPoints: users[0]?.points || 0
    };
  }, [users, currentUserRank]);

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  }, []);

  const handleTimeRangeChange = useCallback((rangeId) => {
    setTimeRange(rangeId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Silakan login untuk melihat leaderboard
          </h1>
          <Button
            onClick={() => navigate('/auth')}
            variant="primary"
            className="rounded-2xl"
          >
            Login Sekarang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <LayoutWrapper user={currentUser}>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <LeaderboardHeader 
          currentUser={currentUser}
          userRank={currentUserRank}
          totalUsers={users.length}
          onBack={() => navigate('/dashboard')}
          formatNumber={formatNumber}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LeaderboardFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
          
          <LeaderboardStats 
            totalUsers={users.length}
            highestPoints={stats.highestPoints}
            averagePoints={stats.averagePoints}
            activeUsers={stats.activeUsers}
            formatNumber={formatNumber}
          />
          
          <LeaderboardTable
            users={users}
            currentUser={currentUser}
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
          
          <LeaderboardRewards 
            currentUser={currentUser}
            userRank={currentUserRank}
            totalUsers={users.length}
            formatNumber={formatNumber}
            onNavigate={navigate}
          />
          
        </div>
      </div>
    </LayoutWrapper>
  );
}