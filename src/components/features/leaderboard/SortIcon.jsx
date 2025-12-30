// src/components/features/leaderboard/SortIcon.jsx
import { ChevronUp, ChevronDown } from 'lucide-react';
import React from 'react';

const SortIcon = ({ column, sortBy, sortOrder }) => {
  if (sortBy !== column) return null;
  
  return sortOrder === 'asc' ? (
    <ChevronUp className="w-4 h-4 ml-1" />
  ) : (
    <ChevronDown className="w-4 h-4 ml-1" />
  );
};

export default React.memo(SortIcon);