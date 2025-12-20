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
  Info
} from 'lucide-react';
import { Button, Avatar } from '../ui';
import { useAuth } from '../../hooks/useAuth';

export default function Navigation({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'map', label: 'Peta', icon: MapPin },
    { id: 'pickup', label: 'Pickup', icon: Truck },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin', icon: User });
  }

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const unauthedNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
  ];

  const itemsToDisplay = user ? navItems : unauthedNavItems;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 glass-effect border-b z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl group-hover:scale-105 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SIPAKATAU</h1>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {navItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        variant={isActive ? 'primary' : 'ghost'}
                        className={cn(
                          'rounded-2xl px-6',
                          isActive && 'shadow-lg'
                        )}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    );
                  })}
                  
                  {/* User Menu */}
                  <div className="ml-4 flex items-center gap-3">
                    <Avatar 
                      src={user.avatar} 
                      fallback={user.name?.charAt(0) || 'U'}
                      size="sm"
                    />
                    <Button
                      onClick={logout}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleNavigate('home')}
                    variant="outline"
                    className="rounded-2xl px-6 border-emerald-500 text-emerald-500 hover:bg-emerald-50 hover:border-emerald-600"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Tentang
                  </Button>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <Button
                    onClick={() => handleNavigate('auth')}
                    variant="primary"
                    className="rounded-2xl px-6 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Daftar Sekarang
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 glass-effect border-b z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">SIPAKATAU</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
  <div className="md:hidden fixed top-16 left-0 right-0 glass-effect border-b z-40 shadow-lg">
    <div className="px-4 py-4 space-y-2">
      {itemsToDisplay.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <Button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            variant={isActive ? 'primary' : 'ghost'}
            className="w-full justify-start rounded-2xl px-6 py-4"
          >
            <Icon className="w-5 h-5 mr-3" />
            {item.label}
          </Button>
        );
      })}
      
      {user ? (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar 
              src={user.avatar} 
              fallback={user.name?.charAt(0) || 'U'}
              size="sm"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.points} poin</p>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-gray-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <Button
              onClick={() => handleNavigate('auth')}
              variant="outline"
              className="w-full rounded-2xl px-6 py-4 border-emerald-500 text-emerald-500"
            >
              <LogIn className="w-5 h-5 mr-3" />
              Masuk ke Akun
            </Button>
            <Button
              onClick={() => handleNavigate('auth')}
              variant="primary"
              className="w-full rounded-2xl px-6 py-4 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Daftar Gratis
            </Button>
            <p className="text-xs text-center text-gray-500 px-4 pt-2">
              Bergabunglah dengan komunitas peduli lingkungan
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)}

      {/* Bottom Navigation (Mobile) - Hanya untuk user yang login */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t z-50">
          <div className="grid grid-cols-5 gap-1 px-2 py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  variant="ghost"
                  className="flex-col h-auto py-3 rounded-2xl"
                >
                  <Icon className={cn(
                    "w-6 h-6 mb-1",
                    isActive ? "text-emerald-500" : "text-gray-600"
                  )} />
                  <span className={cn(
                    "text-xs",
                    isActive ? "text-emerald-500 font-medium" : "text-gray-600"
                  )}>
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Spacers */}
      <div className="h-20 hidden md:block"></div>
      <div className="h-16 md:hidden"></div>
      {user && <div className="h-20 md:hidden"></div>}
    </>
  );
}