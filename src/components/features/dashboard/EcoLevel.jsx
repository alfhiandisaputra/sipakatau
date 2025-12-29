// src/components/features/dashboard/EcoLevel.jsx
import { Card } from '../../ui';
import { TrendingUp, Sprout, Leaf, Shield, Crown, Trophy } from 'lucide-react';
import { formatPoints } from '../../../utils/formatters';
import { cn } from '../../../utils';


const levels = [
  { 
    name: 'Pemula', 
    minPoints: 0, 
    maxPoints: 499, 
    color: 'from-emerald-400 to-emerald-300',
    Icon: Sprout,
    iconColor: 'text-emerald-600'
  },
  { 
    name: 'Sadar Lingkungan', 
    minPoints: 500, 
    maxPoints: 999, 
    color: 'from-emerald-400 to-emerald-300',
    Icon: Leaf,
    iconColor: 'text-emerald-600'
  },
  { 
    name: 'Warrior', 
    minPoints: 1000, 
    maxPoints: 4999, 
    color: 'from-teal-500 to-emerald-400',
    Icon: Shield,
    iconColor: 'text-teal-600'
  },
  { 
    name: 'Master', 
    minPoints: 5000, 
    maxPoints: 9999, 
    color: 'from-amber-500 to-yellow-400',
    Icon: Crown,
    iconColor: 'text-amber-600'
  },
  { 
    name: 'Planet Hero',
    minPoints: 10000, 
    maxPoints: Infinity, 
    color: 'from-purple-500 to-pink-400',
    Icon: Trophy,
    iconColor: 'text-purple-600'
  },
];


const getLevelFromPoints = (points) => {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].minPoints) {
      return levels[i];
    }
  }
  return levels[0];
};


const getNextLevel = (currentLevel) => {
  const currentIndex = levels.findIndex(l => l.name === currentLevel.name);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
};

export default function EcoLevel({ points, level: userLevel }) {
  
  let currentLevel;
  
  
  if (userLevel) {
    currentLevel = levels.find(l => l.name === userLevel);
  }
  
  
  if (!currentLevel) {
    currentLevel = getLevelFromPoints(points);
  }
  
  const nextLevel = getNextLevel(currentLevel);
  
  
  let progressPercentage;
  if (nextLevel) {
    const range = nextLevel.minPoints - currentLevel.minPoints;
    const progressInRange = points - currentLevel.minPoints;
    progressPercentage = Math.min(Math.round((progressInRange / range) * 100), 100);
  } else {
    progressPercentage = 100;
  }

  
  const pointsNeeded = nextLevel ? nextLevel.minPoints - points : 0;

  return (
    <Card className="p-6 rounded-3xl">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Level Anda</h2>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${currentLevel.iconColor.replace('text-', 'bg-')}20`}>
            <currentLevel.Icon className={`w-8 h-8 ${currentLevel.iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{currentLevel.name}</h3>
            <p className="text-sm text-gray-600">
              {formatPoints(points)} poin • {nextLevel 
                ? `${pointsNeeded} poin lagi menuju ${nextLevel.name}`
                : 'Level tertinggi tercapai!'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-600 font-semibold">{progressPercentage}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-linear-to-r ${currentLevel.color} rounded-full transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {levels.map((lvl, index) => {
            const isCompleted = points >= lvl.minPoints;
            const isCurrent = currentLevel.name === lvl.name;
            
            return (
              <div key={index} className="text-center">
                <div className={cn(
                  'w-3 h-3 rounded-full mx-auto mb-1',
                  isCompleted 
                    ? isCurrent ? 'bg-emerald-500 ring-4 ring-emerald-200' : 'bg-emerald-500'
                    : 'bg-gray-300'
                )} />
                <span className={cn(
                  'text-xs',
                  isCompleted ? 'text-gray-900 font-medium' : 'text-gray-500'
                )}>
                  {lvl.name.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Badges */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {levels.map((lvl, index) => {
          const isCompleted = points >= lvl.minPoints;
          const isCurrent = currentLevel.name === lvl.name;
          const Icon = lvl.Icon;
          
          return (
            <div
              key={index}
              className={cn(
                'text-center p-3 rounded-xl transition-all flex flex-col items-center',
                isCurrent 
                  ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm' 
                  : isCompleted
                    ? 'bg-emerald-50/50 border border-emerald-100'
                    : 'bg-gray-50 border border-gray-100'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg mb-2',
                isCurrent 
                  ? lvl.iconColor.replace('text-', 'bg-') + '20' 
                  : isCompleted
                    ? lvl.iconColor.replace('text-', 'bg-') + '10'
                    : 'bg-gray-100'
              )}>
                <Icon className={cn(
                  'w-6 h-6',
                  isCurrent ? lvl.iconColor :
                  isCompleted ? lvl.iconColor :
                  'text-gray-400'
                )} />
              </div>
              <div className={cn(
                'text-sm font-semibold',
                isCurrent ? 'text-emerald-700' :
                isCompleted ? 'text-emerald-600' :
                'text-gray-400'
              )}>
                {lvl.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {lvl.minPoints === 0 ? 'Mulai' : formatPoints(lvl.minPoints)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Detail Level */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Status Level</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Level Saat Ini:</span>
                <span className="font-medium">{currentLevel.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Poin Anda:</span>
                <span className="font-medium">{formatPoints(points)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Progress:</span>
                <span className="font-medium text-emerald-600">{progressPercentage}%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Benefit Level {currentLevel.name}</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span>Penukaran poin lebih menguntungkan</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span>Prioritas layanan pickup</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span>Akses ke acara eksklusif</span>
              </li>
              {nextLevel && (
                <li className="flex items-center gap-2 text-emerald-600 font-medium">
                  <div className="w-1 h-1 bg-emerald-600 rounded-full"></div>
                  <span>Level berikutnya: {nextLevel.name} ({nextLevel.minPoints} poin)</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}