// src/components/features/rewards/RedemptionModal.jsx
import { Gift, Award } from 'lucide-react';
import { Card, Button } from '../../ui';

export default function RedemptionModal({ 
  reward, 
  userPoints, 
  onConfirm, 
  onCancel 
}) {
  if (!reward) return null;

  const remainingPoints = userPoints - reward.points;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4 z-999"
      onClick={onCancel}
    >
      <Card
        className="w-full md:max-w-md p-6 md:p-8 rounded-t-3xl md:rounded-3xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="bg-linear-to-br from-emerald-500 to-teal-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-100">
            <Gift className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold">Konfirmasi Penukaran</h2>
          <p className="text-gray-600 text-sm">Yakin ingin menukar poin untuk item ini?</p>
        </div>

        <div className="bg-linear-to-br from-emerald-500/5 to-teal-500/5 p-5 rounded-2xl mb-6 border border-emerald-100">
          <p className="text-lg font-bold text-center mb-1">{reward.name}</p>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-2xl font-black text-amber-500">
              {reward.points.toLocaleString()} <span className="text-sm font-normal">Poin</span>
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl mb-8 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Poin Anda:</span>
            <span className="font-medium">{userPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pengurangan:</span>
            <span className="font-bold text-red-500">-{reward.points.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-bold">Sisa Akhir:</span>
            <span className={`font-black ${remainingPoints >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {remainingPoints.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full md:flex-1 border-2 border-gray-200 rounded-2xl py-6 font-semibold"
          >
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            disabled={remainingPoints < 0}
            className="w-full md:flex-1 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-2xl py-6 font-bold shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ya, Tukar Sekarang
          </Button>
        </div>
      </Card>
    </div>
  );
}