// src/App.jsx
import { useState } from 'react';
import Navigation from './components/layout/Navigation';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import ScannerPage from './pages/ScannerPage';
import MapPage from './pages/MapPage';
import PickupRequestPage from './pages/PickupRequestPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, isLoading } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <UserDashboard onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'scanner':
        return user ? <ScannerPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'map':
        return user ? <MapPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'pickup':
        return user ? <PickupRequestPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'profile':
        return user ? <ProfilePage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'rewards':
        return user ? <RewardsPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </>
  );
}

export default App;