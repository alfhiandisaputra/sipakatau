// src/components/features/leaderboard/SortIcon.jsx
import { ChevronUp, ChevronDown } from 'lucide-react';
import React from 'react';

// Komponen terpisah untuk icon sort
const SortIcon = ({ column, sortBy, sortOrder }) => {
  if (sortBy !== column) return null;
  
  return sortOrder === 'asc' ? (
    <ChevronUp className="w-4 h-4 ml-1" />
  ) : (
    <ChevronDown className="w-4 h-4 ml-1" />
  );
};

// Tambahkan React.memo untuk optimasi
export default React.memo(SortIcon);