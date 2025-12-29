// src/pages/RewardsPage.jsx
import { useState } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import RewardsHeader from '../components/features/rewards/RewardsHeader';
import { 
  CategoryFilter,
  RewardsGrid,
  RedemptionModal
} from '../components/features/rewards';
import { mockRewards } from '../data/mockRewards';
import { useAuth } from '../hooks/useAuth';

const categories = ['Semua', 'Voucher Digital', 'Sembako', 'Diskon Lokal'];

export default function RewardsPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedReward, setSelectedReward] = useState(null);
  const { user } = useAuth();

  const userPoints = user?.points || 8450;
  const totalRedeemed = user?.redeemedPoints || 15300;

  const filteredRewards = selectedCategory === 'Semua' 
    ? mockRewards 
    : mockRewards.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      alert(`Berhasil menukar ${reward.name}! Kode voucher akan dikirim ke email Anda.`);
      setSelectedReward(null);
    } else {
      alert('Poin Anda tidak cukup untuk menukar reward ini.');
    }
  };

  if (!user) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Silakan login untuk melihat rewards
            </h1>
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper user={user} showHeader={false}>
      <div className="min-h-screen bg-gray-50">
        <RewardsHeader 
          user={user}
          onBack={() => onNavigate('dashboard')}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <RewardsGrid
            rewards={filteredRewards}
            userPoints={userPoints}
            onSelectReward={setSelectedReward}
          />


          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tips Menukar Poin</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full mt-1">1</span>
                  <span>Pastikan poin Anda cukup sebelum menukar reward</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full mt-1">2</span>
                  <span>Reward digital akan dikirim ke email dalam 1x24 jam</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full mt-1">3</span>
                  <span>Reward fisik dapat diambil di kantor SIPAKATAU Soppeng</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-linear-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Anda</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Poin Dikumpulkan</span>
                  <span className="font-bold text-emerald-600">{(userPoints + totalRedeemed).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Poin Tersedia</span>
                  <span className="font-bold text-amber-600">{userPoints.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Poin Tertukar</span>
                  <span className="font-bold text-emerald-600">{totalRedeemed.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                  <span className="text-gray-600 font-medium">Total Reward Tertukar</span>
                  <span className="font-bold text-gray-900">
                    {Math.floor(totalRedeemed / 5000)} item
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedReward && (
          <RedemptionModal
            reward={selectedReward}
            userPoints={userPoints}
            onConfirm={() => handleRedeem(selectedReward)}
            onCancel={() => setSelectedReward(null)}
          />
        )}
      </div>
    </LayoutWrapper>
  );
}