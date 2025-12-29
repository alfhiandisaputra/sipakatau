// src/components/features/rewards/RewardsGrid.jsx
import RewardCard from './RewardCard';

export default function RewardsGrid({ 
  rewards, 
  userPoints, 
  onSelectReward,
  loading = false 
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-3xl h-96"></div>
          </div>
        ))}
      </div>
    );
  }

  if (rewards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎁</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada reward tersedia</h3>
        <p className="text-gray-600">Coba pilih kategori lain atau cek kembali nanti.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          userPoints={userPoints}
          onSelect={onSelectReward}
        />
      ))}
    </div>
  );
}