// src/pages/AuthPage.jsx
import { useState } from 'react';
import { Card, ImageWithFallback } from '../components/ui';
import { LoginForm, RegisterForm } from '../components/features/auth';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils';

export default function AuthPage({ onNavigate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleAuthSuccess = (userData) => {
    login(userData);
    onNavigate('dashboard');
  };

  const handleSubmit = (userData) => {
    setLoading(true);
    setTimeout(() => {
      handleAuthSuccess(userData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col justify-center p-12">
          <div className="max-w-lg mx-auto">
            {/* Logo */}
            <div className="mb-12">
              <div 
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-4 cursor-pointer group"
              >
                <div className="bg-white rounded-2xl group-hover:scale-105 transition-transform">
                  <img src="/sipakatau.svg" alt="logo" className='w-20 h-20' />
                  </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">SIPAKATAU</h1>
                  <p className="text-emerald-100 text-lg">Memanusiakan Lingkungan</p>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  {isLogin 
                    ? 'Selamat Kembali!' 
                    : 'Mulai Perjalanan Anda'}
                </h2>
                <p className="text-emerald-50 text-lg leading-relaxed">
                  {isLogin 
                    ? 'Masuk untuk melanjutkan kontribusi Anda terhadap lingkungan yang lebih bersih dan mendapatkan rewards menarik.'
                    : 'Bergabunglah dengan ribuan warga yang telah mengubah sampah menjadi nilai dan membuat dampak positif.'}
                </p>
              </div>

              {/* Stats/Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/20 p-3 rounded-xl">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Tukar Poin</p>
                      <p className="text-emerald-100 text-sm">Hadiah menarik</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-teal-500/20 p-3 rounded-xl">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Pantau Dampak</p>
                      <p className="text-emerald-100 text-sm">Kontribusi Anda</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-xl">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Smart Pickup</p>
                      <p className="text-emerald-100 text-sm">Jadwal fleksibel</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-500/20 p-3 rounded-xl">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">AI Scanner</p>
                      <p className="text-emerald-100 text-sm">Teknologi canggih</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial/Quote */}
              <div className="mt-8">
                <div className="border-l-4 border-emerald-400 pl-6 py-2">
                  <p className="text-emerald-50 italic text-lg">
                    "Bergabung dengan SIPAKATAU mengubah cara saya melihat sampah. Sekarang setiap botol plastik adalah poin berharga!"
                  </p>
                  <p className="text-emerald-200 mt-2 font-medium">— Baco Santoso, Anggota sejak 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src="/images/illustrations/auth-illustration.png"
            fallbackSrc="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="Eco friendly"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
          <div 
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="rounded-2xl group-hover:scale-105 transition-transform">
              <img src="/sipakatau.svg" alt="logo" className='w-15 h-15' />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SIPAKATAU</h1>
          </div>
        </div>

          {/* Form Container */}
          <Card className="p-8 rounded-3xl shadow-xl border border-gray-200 bg-white">
            {/* Toggle Login/Register */}
            <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={cn(
                  'flex-1 py-3 rounded-xl font-medium transition-all duration-200',
                  isLogin 
                    ? 'bg-white text-emerald-500 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Masuk
                </div>
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={cn(
                  'flex-1 py-3 rounded-xl font-medium transition-all duration-200',
                  !isLogin 
                    ? 'bg-white text-emerald-500 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Daftar
                </div>
              </button>
            </div>

            {/* Render Form */}
            {isLogin ? (
              <LoginForm 
                onSubmit={handleSubmit}
                loading={loading}
                onToggleForm={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm 
                onSubmit={handleSubmit}
                loading={loading}
                onToggleForm={() => setIsLogin(true)}
              />
            )}
          </Card>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}