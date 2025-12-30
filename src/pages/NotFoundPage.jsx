import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Mail, 
  Compass,
  Leaf,
  Clock,
  Trash2,
  Recycle,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Tambahkan animasi float dengan inline styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGoHome = () => {
    console.log('Go home clicked');
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
    const email = "support@sipakatau.id";
    const subject = "Bantuan: Halaman Tidak Ditemukan";
    const body = `Halo Tim SIPAKATAU,\n\nSaya mengalami masalah mengakses halaman tertentu.\n\nURL yang saya coba akses: ${window.location.href}\n\nTerima kasih.`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleGoBack = () => {
    console.log('Go back clicked');
    navigate(-1);
  };

  const handleExploreFeatures = () => {
    console.log('Explore features clicked');
    navigate('/features');
  };

  const ecoTips = [
    {
      icon: Recycle,
      title: "Daur Ulang Plastik",
      text: "1 botol plastik yang didaur ulang menghemat energi untuk menyalakan bola lampu 60-watt selama 3 jam!",
      color: "emerald",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Leaf,
      title: "Selamatkan Pohon",
      text: "Setiap ton kertas yang didaur ulang dapat menyelamatkan 17 pohon dan menghemat 7.000 galon air!",
      color: "blue",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      title: "Waktu Penguraian",
      text: "Plastik membutuhkan 450-1000 tahun untuk terurai. Yuk, kurangi penggunaan plastik sekali pakai!",
      color: "amber",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <LayoutWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-linear-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-4xl w-full relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-30"></div>
                <div className="relative p-3 bg-white rounded-2xl shadow-lg z-10">
                  <ShieldAlert className="w-10 h-10 text-emerald-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 z-10 relative">
                Oops! <span className="text-emerald-600">404</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto z-10 relative">
              Sepertinya sampah ini telah dibawa ke tempat daur ulang yang benar. 
              Halaman yang Anda cari tidak dapat ditemukan.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 relative z-10">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="text-[280px] md:text-[350px] font-bold text-gray-100 select-none">
                      404
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex justify-center">
                    <div className="relative">
                      <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <div className="absolute -top-6 -left-6 animate-float">
                          <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <Trash2 className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        <div className="absolute -bottom-4 -right-4 animate-float" style={{animationDelay: '0.3s'}}>
                          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                            <Recycle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <div className="absolute top-1/3 -right-10 animate-float" style={{animationDelay: '0.6s'}}>
                          <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                            <Leaf className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-48 h-56 bg-linear-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-2xl">
                              <div className="absolute top-6 left-4 right-4 h-3 bg-white/30 rounded-full"></div>
                              <div className="absolute top-16 left-4 right-4 h-3 bg-white/30 rounded-full"></div>
                              <div className="absolute top-28 left-4 right-4 h-3 bg-white/30 rounded-full"></div>
                              
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 border-8 border-white/40 rounded-full flex items-center justify-center">
                                  <div className="w-12 h-12 border-4 border-white transform rotate-45"></div>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-20">
                  <button
                    onClick={handleGoBack}
                    className="h-12 rounded-xl border border-gray-300 hover:border-emerald-400 flex items-center justify-center px-4 hover:bg-gray-50 transition-colors cursor-pointer relative z-30 active:scale-95"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="h-12 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center px-4 hover:from-emerald-600 hover:to-teal-600 transition-colors cursor-pointer relative z-30 active:scale-95 shadow-md"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    {user ? 'Ke Dashboard' : 'Ke Beranda'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Access */}
            <div className="space-y-6">
              <div className="bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="font-bold">Fakta Lingkungan</h3>
                </div>
                <div className="space-y-9">
                  {ecoTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 ${tip.bgColor} rounded-lg`}>
                            <Icon className={`w-4 h-4 ${tip.iconColor}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                            <p className="text-xs text-white/90">{tip.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Butuh Bantuan?</h3>
                  <p className="text-gray-600">Tim support kami siap membantu Anda 24/7</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleContactSupport}
                  className="rounded-xl border border-emerald-300 text-emerald-600 hover:border-emerald-400 hover:text-emerald-700 flex items-center justify-center px-4 py-2 transition-colors cursor-pointer relative z-30 active:scale-95"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </button>
                <button
                  onClick={handleExploreFeatures}
                  className="rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 flex items-center justify-center px-4 py-2 transition-colors cursor-pointer relative z-30 active:scale-95"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Jelajahi Fitur
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center relative z-10">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SIPAKATAU || Sistem Pintar Kelola Sampah untuk Masyarakat Unggul
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Setiap kontribusi Anda berarti untuk bumi yang lebih baik
            </p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default NotFoundPage;