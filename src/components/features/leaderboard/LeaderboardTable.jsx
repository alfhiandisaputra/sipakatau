// src/components/features/leaderboard/LeaderboardTable.jsx
import { useState, useMemo } from 'react';
import { Card } from '../../ui';
import LeaderboardRow from './LeaderboardRow';
import LeaderboardPagination from './LeaderboardPagination';
import SortIcon from './SortIcon';
import { getFilteredUsers } from '../../../utils/LeaderboardUtils';

export default function LeaderboardTable({
  users,
  currentUser,
  searchTerm,
  activeFilter,
  currentPage,
  itemsPerPage,
  onPageChange
}) {
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredUsers = useMemo(() => {
    const filtered = getFilteredUsers(users, searchTerm, activeFilter, currentUser);
    
    return [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'name') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [users, searchTerm, activeFilter, currentUser, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    onPageChange(1);
  };

  if (currentUsers.length === 0) {
    return (
      <Card className="rounded-3xl p-8 text-center">
        <div className="text-gray-500 mb-4">
          Tidak ada pengguna yang sesuai dengan kriteria pencarian.
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-3xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th 
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('rank')}
                >
                  <div className="flex items-center">
                    Peringkat
                    <SortIcon column="rank" sortBy={sortBy} sortOrder={sortOrder} />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Pengguna
                    <SortIcon column="name" sortBy={sortBy} sortOrder={sortOrder} />
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Level</th>
                <th 
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('points')}
                >
                  <div className="flex items-center">
                    Total Poin
                    <SortIcon column="points" sortBy={sortBy} sortOrder={sortOrder} />
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Sampah Diolah</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                <th 
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('change')}
                >
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <LeaderboardRow
                  key={user.id}
                  user={user}
                  currentUser={currentUser}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        <LeaderboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={onPageChange}
        />
      </Card>
    </>
  );
}