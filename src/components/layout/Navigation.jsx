// src/components/layout/Navigation.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.replace('/', '') || 'home';
  
  const EXCLUDED_PAGES = ['auth'];

  if(EXCLUDED_PAGES.includes(currentPage)) {
    return null;
  }

  const mobileBottomNavItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'map', label: 'Peta', icon: MapPin, path: '/map' },
    { id: 'scanner', label: 'Scanner', icon: Camera, path: '/scanner' },
    { id: 'pickup', label: 'Pickup', icon: Truck, path: '/pickup' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
  ] : [];

  const desktopNavItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
  ] : [];

  const mobileMenuItems = user ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: User, path: '/admin' }] : []),
  ] : [];

  const unauthedNavItems = [
    { id: 'home', label: 'Beranda', icon: Home, path: '/' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <nav className="hidden md:block fixed top-0 left-0 right-0 glass-effect border-b z-990 h-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
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
                  {desktopNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <Link key={item.id} to={item.path}>
                        <Button
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
                      </Link>
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
                      onClick={handleLogout}
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
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-emerald-500 text-emerald-500 bg-white hover:text-emerald-600 hover:border-emerald-600 hover:bg-gray-300"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-xl border-white shadow-emerald-500/25"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 glass-effect border-b z-990 h-16">
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
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 bg" />}
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
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        variant={isActive ? 'primary' : 'ghost'}
                        className="w-full justify-start rounded-xl px-4 py-3"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
                
                {/* Profile and Logout */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3" onClick={handleProfileClick}>
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
                      onClick={handleLogout}
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
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        variant={isActive ? 'primary' : 'ghost'}
                        className="w-full rounded-xl px-4 py-3"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl px-6 py-4 border-emerald-500 text-emerald-500 bg-white hover:text-emerald-600 hover:border-emerald-600 hover:bg-gray-300"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Masuk ke Akun
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button
                    variant="primary"
                    className="w-full rounded-xl px-6 py-4 shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t z-50">
          <div className="grid grid-cols-5 gap-1 px-1 py-2">
            {mobileBottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 rounded-xl transition-all",
                    isActive 
                      ? "bg-emerald-50 text-emerald-600" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
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
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}