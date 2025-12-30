// src/components/features/rewards/RewardsHeader.jsx
import { ArrowLeft, Gift, Award } from 'lucide-react';
import { formatPoints } from '../../../utils/formatters';

const RewardsHeader = ({ user, onBack }) => {
  const userPoints = user?.points || 0;
  const redeemedPoints = user?.redeemedPoints || 500;

  return (
    <div className="bg-linear-to-r from-amber-500 to-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="
                group
                bg-white/20 backdrop-blur-lg rounded-2xl 
                p-2 md:p-2.5 
                hover:bg-white/40 hover:shadow-md 
                transition-all duration-200 active:scale-95 
                border border-white/10 cursor-pointer
              "
              aria-label="Kembali ke dashboard"
            >
              <ArrowLeft 
                className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:-translate-x-1" 
                strokeWidth={2.5} 
              />
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block bg-white/20 backdrop-blur-lg p-3 rounded-2xl">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Rewards Center
                </h1>
                <p className="text-amber-100 mt-2">
                  Tukar poin dengan hadiah menarik
                </p>
              </div>
            </div>
          </div>
          
      
          <div className="hidden md:flex gap-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 min-w-45">
              <div className="flex items-center gap-4">
                <div className="bg-linear-to-br from-amber-400 to-amber-600 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-100 text-sm">Poin Anda</p>
                  <p className="text-2xl font-bold text-white">
                          {formatPoints(userPoints)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 min-w-45">
              <div className="flex items-center gap-4">
                <div className="bg-linear-to-br from-emerald-400 to-emerald-600 p-3 rounded-xl">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Telah Ditukar</p>
                  <p className="text-2xl font-bold text-white">
                          {formatPoints(redeemedPoints)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <span className="text-white font-bold">
                  {formatPoints(userPoints)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsHeader;