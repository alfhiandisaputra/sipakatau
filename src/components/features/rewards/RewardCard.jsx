// src/components/features/rewards/RewardCard.jsx
import { Award } from 'lucide-react';
import { Card, Button, Badge } from '../../ui';
import ImageWithFallback from '../../ui/ImageWithFallback';

export default function RewardCard({ 
  reward, 
  userPoints, 
  onSelect, 
  showCategory = true 
}) {
  const canRedeem = userPoints >= reward.points && reward.available;

  return (
    <Card
      className={`rounded-3xl overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full ${
        canRedeem 
          ? 'border-2 border-emerald-500/10 hover:border-emerald-500' 
          : 'border-2 border-gray-200 opacity-80'
      }`}
    >
      <div className="relative h-44 md:h-48 overflow-hidden">
        <ImageWithFallback
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover"
          loading="lazy"
          fallbackSrc="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=75"
        />
        
        {!canRedeem && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-red-500 text-white px-3 py-1 text-xs">
              {!reward.available ? 'Habis' : 'Poin Tidak Cukup'}
            </Badge>
          </div>
        )}
        
        {showCategory && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] md:text-xs px-2 py-1 font-bold uppercase shadow-sm">
              {reward.category}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col grow">
        <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-1">{reward.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reward.description}</p>
        
        <div className="flex items-center justify-between mb-5 mt-auto">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xl md:text-2xl font-bold text-amber-500">
              {reward.points.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-tighter">
            Poin Dibutuhkan
          </span>
        </div>

        <Button
          onClick={() => canRedeem && onSelect(reward)}
          disabled={!canRedeem}
          className={`w-full rounded-2xl py-6 text-base font-semibold transition-all ${
            canRedeem 
              ? 'bg-linear-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white shadow-md shadow-emerald-200' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border-0'
          }`}
        >
          {canRedeem ? 'Tukar Sekarang' : (!reward.available ? 'Stok Habis' : 'Poin Tidak Cukup')}
        </Button>
      </div>
    </Card>
  );
}