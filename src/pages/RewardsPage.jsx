import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import RewardsHeader from "../components/features/reward/RewardsHeader";
import { Award, Gift, Smartphone, ShoppingBag, Tag } from "lucide-react";
import ImageWithFallback from "../components/ui/ImageWithFallback";

const rewardsData = [
  { id: 1, name: 'Voucher GoPay 50K', points: 5000, category: 'Voucher Digital', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 2, name: 'Pulsa 100K', points: 8000, category: 'Voucher Digital', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 3, name: 'Beras Premium 5Kg', points: 12000, category: 'Sembako', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 4, name: 'Minyak Goreng 2L', points: 6000, category: 'Sembako', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 5, name: 'Voucher Tokopedia 100K', points: 9000, category: 'Voucher Digital', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 6, name: 'Diskon 20% Restoran Lokal', points: 3000, category: 'Diskon Lokal', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 7, name: 'Gula Pasir 1Kg', points: 4000, category: 'Sembako', image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 8, name: 'Voucher OVO 75K', points: 7000, category: 'Voucher Digital', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=75', available: true },
  { id: 9, name: 'Teh Premium 250gr', points: 5500, category: 'Sembako', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=75', available: true },
];

const categories = ['Semua', 'Voucher Digital', 'Sembako', 'Diskon Lokal'];

export default function RewardsCenter({onNavigate}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedReward, setSelectedReward] = useState(null);
  const userPoints = 8450;

  const filteredRewards = selectedCategory === 'Semua' 
    ? rewardsData 
    : rewardsData.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward) => {
    if (userPoints >= reward.points) {
      alert(`Berhasil menukar ${reward.name}!`);
      setSelectedReward(null);
    } else {
      alert('Poin Anda tidak cukup.');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Optimized margin for mobile */}
        <RewardsHeader  onBack={() => onNavigate('dashboard')} />

        {/* User Points Card - Responsive layout (Column on mobile, Row on desktop) */}
        <Card className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#F59E0B] to-[#10B981] border-0 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-white gap-6 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-lg p-3 md:p-4 rounded-2xl">
                <Award className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <p className="text-white/80 text-sm md:text-lg">Poin Anda Saat Ini</p>
                <p className="text-4xl md:text-5xl font-bold">{userPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full md:w-auto text-left md:text-right border-t border-white/20 pt-4 md:border-0 md:pt-0">
              <p className="text-white/80 text-xs md:text-sm mb-1 uppercase tracking-wider">Total Ditukar</p>
              <p className="text-2xl md:text-3xl font-bold">15,300</p>
            </div>
          </div>
        </Card>

        {/* Category Filter - Scrollable on very small screens if they overflow */}
        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 min-w-max md:min-w-0">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`rounded-2xl px-4 md:px-6 py-4 md:py-5 text-sm transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white shadow-lg border-0'
                    : 'border-2 border-gray-200 hover:border-[#10B981] text-gray-700 bg-white'
                }`}
              >
                {category === 'Voucher Digital' && <Smartphone className="w-4 h-4 mr-2" />}
                {category === 'Sembako' && <ShoppingBag className="w-4 h-4 mr-2" />}
                {category === 'Diskon Lokal' && <Tag className="w-4 h-4 mr-2" />}
                {category === 'Semua' && <Gift className="w-4 h-4 mr-2" />}
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Rewards Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredRewards.map((reward) => {
            const canRedeem = userPoints >= reward.points;
            return (
              <Card
                key={reward.id}
                className={`rounded-3xl overflow-hidden transition-all hover:shadow-2xl flex flex-col ${
                  canRedeem 
                    ? 'border-2 border-[#10B981]/10 hover:border-[#10B981]' 
                    : 'border-2 border-gray-200 opacity-80'
                }`}
              >
                <div className="relative h-44 md:h-48 overflow-hidden">
                  <ImageWithFallback
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                    loading="lazy" 
                  />
                  {!canRedeem && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Badge className="bg-red-500 text-white px-3 py-1 text-xs">Poin Tidak Cukup</Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/95 backdrop-blur-sm text-[#0f172a] text-[10px] md:text-xs px-2 py-1 font-bold uppercase shadow-sm">
                      {reward.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-1">{reward.name}</h3>
                  <div className="flex items-center justify-between mb-5 mt-auto">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#F59E0B]" />
                      <span className="text-xl md:text-2xl font-bold text-[#F59E0B]">
                        {reward.points.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Poin Dibutuhkan</span>
                  </div>

                  <Button
                    onClick={() => canRedeem && setSelectedReward(reward.id)}
                    disabled={!canRedeem}
                    className={`w-full rounded-2xl py-6 text-base font-semibold transition-all ${
                      canRedeem 
                        ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:opacity-90 text-white shadow-md shadow-green-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-0'
                    }`}
                  >
                    {canRedeem ? 'Tukar Sekarang' : 'Poin Tidak Cukup'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Redemption Modal - Full screen on mobile for better focus */}
        {selectedReward && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4 z-50"
            onClick={() => setSelectedReward(null)}
          >
            <Card
              className="w-full md:max-w-md p-6 md:p-8 rounded-t-3xl md:rounded-3xl animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const reward = rewardsData.find(r => r.id === selectedReward);
                if (!reward) return null;
                return (
                  <>
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-br from-[#10B981] to-[#06B6D4] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
                        <Gift className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold">Konfirmasi</h2>
                      <p className="text-muted-foreground text-sm">Yakin ingin menukar poin untuk item ini?</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#10B981]/5 to-[#06B6D4]/5 p-5 rounded-2xl mb-6 border border-green-100">
                      <p className="text-lg font-bold text-center mb-1">{reward.name}</p>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-2xl font-black text-[#F59E0B]">{reward.points.toLocaleString()} <span className="text-sm font-normal">Poin</span></span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl mb-8 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Poin Anda:</span>
                        <span className="font-medium">{userPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pengurangan:</span>
                        <span className="font-bold text-red-500">-{reward.points.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="font-bold">Sisa Akhir:</span>
                        <span className="font-black text-[#10B981]">{(userPoints - reward.points).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-3">
                      <Button
                        onClick={() => setSelectedReward(null)}
                        variant="outline"
                        className="w-full md:flex-1 border-2 border-gray-200 rounded-2xl py-6 font-semibold"
                      >
                        Batal
                      </Button>
                      <Button
                        onClick={() => handleRedeem(reward)}
                        className="w-full md:flex-1 bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white rounded-2xl py-6 font-bold shadow-lg shadow-green-100"
                      >
                        Ya, Tukar
                      </Button>
                    </div>
                  </>
                );
              })()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}