// src/components/features/leaderboard/LeaderboardPagination.jsx
import { Button } from '../../ui';

export default function LeaderboardPagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange
}) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'primary' : 'outline'}
          onClick={() => onPageChange(i)}
          className={`rounded-xl w-10 ${currentPage === i ? 'bg-linear-to-r from-amber-500 to-orange-500' : ''}`}
        >
          {i}
        </Button>
      );
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} pengguna
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-xl"
        >
          Sebelumnya
        </Button>
        
        {renderPageNumbers()}
        
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-xl"
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}