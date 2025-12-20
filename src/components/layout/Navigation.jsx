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
  LogOut
} from 'lucide-react';
import { Button } from '../ui';
import { useAuth } from '../../context/AuthContext';

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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 glass-effect border-b z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SIPAKATAU</h1>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
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
              {user && (
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
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-2 rounded-xl">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">SIPAKATAU</h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 glass-effect border-b z-40 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
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
            
            {user && (
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
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
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

      {/* Spacers */}
      <div className="h-20 hidden md:block"></div>
      <div className="h-16 md:hidden"></div>
      <div className="h-20 md:hidden"></div>
    </>
  );
}