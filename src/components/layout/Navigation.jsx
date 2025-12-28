// src/components/layout/Navigation.jsx
import { useState } from 'react';
import { cn } from '../../utils/index';
import { 
  Home, 
  LayoutDashboard, 
  Camera, 
  MapPin, 
  Truck, 
  Trophy,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { Button, Avatar } from '../ui';
import { useAuth } from '../../hooks/useAuth';

export default function Navigation({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 

  const EXCLUDED_PAGES = ['auth', 'admin-dashboard'];

  if(EXCLUDED_PAGES.includes(currentPage)) {
    return null;
  }

  const mobileBottomNavItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Peta', icon: MapPin },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'pickup', label: 'Pickup', icon: Truck },
    { id: 'leaderboard', label: 'Ranking', icon: Trophy },
  ] : [];


  const desktopNavItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ] : [];

  const mobileMenuItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: User }] : []),
  ] : [];


  const unauthedNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
  ];

  const handleNavigate = (page) => {
    if (page === 'home' && user) {
      onNavigate('dashboard');
    } else if (page === 'home') {
      onNavigate('home');
    } else {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      onNavigate('home');
    }
  };

  const handleProfileClick = () => {
    onNavigate('profile');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 glass-effect border-b z-50 h-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="group-hover:scale-105 transition-transform">
                <img src="/sipakatau.svg" alt="logo" className='w-20 h-20' />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SIPAKATAU</h1>
                <p className="text-xs text-gray-700">Sistem Pintar Kelola Sampah</p>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {/* Desktop Nav Items */}
                  {desktopNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        variant={isActive ? 'primary' : 'ghost'}
                        className={cn(
                          'rounded-xl px-4',
                          isActive && 'shadow-md'
                        )}
                        size="sm"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    );
                  })}
                  
                  {/* User Menu */}
                  <div className="ml-4 flex items-center gap-2">
                    <div 
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={handleProfileClick}
                    >
                      <Avatar 
                        src={user.avatar} 
                        fallback={user.name}
                        size="sm"
                      />
                      <div className="hidden lg:block">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-800">{user.points} poin</p>
                      </div>
                    </div>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 rounded-xl"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => onNavigate('auth')}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-emerald-500 text-emerald-500 bg-white hover:text-emerald-600 hover:border-emerald-600 hover:bg-gray-300"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Masuk
                  </Button>
                  <Button
                    onClick={() => onNavigate('auth')}
                    variant="primary"
                    size="sm"
                    className="rounded-xl border-white shadow-emerald-500/25"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Daftar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 glass-effect border-b z-50 h-16">
        <div className="flex items-center justify-between px-4 h-16">
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="group-hover:scale-105 transition-transform">
                <img src="/sipakatau.svg" alt="logo" className='w-15 h-15' />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SIPAKATAU</h1>
              <p className="text-[10px] text-gray-700">Sistem Pintar Kelola Sampah</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2">
                <div 
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={handleProfileClick}
                >
                  <Avatar 
                    src={user.avatar} 
                    fallback={user.name}
                    size="xs"
                  />
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900">{user.name?.split(' ')[0] || 'User'}</p>
                    <p className="text-[10px] text-gray-700">{user.points} poin</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-xl"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            )}
            {!user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 bg" />}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Hamburger Menu) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 glass-effect border-b z-40 shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
            {user ? (
              <>
                {/* Mobile Menu Items */}
                {mobileMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      variant={isActive ? 'primary' : 'ghost'}
                      className="w-full justify-start rounded-xl px-4 py-3"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
                
                {/* Profile and Logout */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={user.avatar} 
                        fallback={user.name}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.points} poin • Level {user.level}</p>
                      </div>
                    </div>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 rounded-xl"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="text-center pb-4">
                  <p className="text-gray-600">Bergabunglah dengan komunitas peduli lingkungan</p>
                </div>
                {unauthedNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      variant={isActive ? 'primary' : 'ghost'}
                      className="w-full rounded-xl px-4 py-3"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
                <Button
                  onClick={() => onNavigate('auth')}
                  variant="outline"
                  className="w-full rounded-xl px-6 py-4 border-emerald-500 text-emerald-500 bg-white hover:text-emerald-600 hover:border-emerald-600 hover:bg-gray-300"
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Masuk ke Akun
                </Button>
                <Button
                  onClick={() => onNavigate('auth')}
                  variant="primary"
                  className="w-full rounded-xl px-6 py-4 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  Daftar Gratis
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) - Hanya untuk user yang login */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t z-50">
          <div className="grid grid-cols-5 gap-1 px-1 py-2">
            {mobileBottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 rounded-xl transition-all",
                    isActive 
                      ? "bg-emerald-50 text-emerald-600" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 mb-1",
                    isActive ? "text-emerald-500" : "text-gray-500"
                  )} />
                  <span className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-emerald-500" : "text-gray-600"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}