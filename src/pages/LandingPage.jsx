// src/pages/LandingPage.jsx
import { Button, Card, ImageWithFallback } from '../components/ui';
import { 
  Sparkles, Camera, Truck, Trophy, Leaf, Users, Recycle 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage({ onNavigate }) {
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      onNavigate('auth');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-500 opacity-90"></div>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/illustrations/hero-illustration.png"
            fallbackSrc="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sustainable city"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
          <div className="mb-6 flex justify-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl px-8 py-3 border border-white/30 mt-10 shadow-lg hover:shadow-2xl transition-shadow">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight"><span className='text-emerald-300'>SI</span>PAKATAU</h1>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl mb-8 font-semibold">
            Memanusiakan Lingkungan, Membangun Masa Depan Bersama
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95">
           Solusi cerdas untuk keluarga dan generasi muda dalam mengelola sampah secara mudah, aman, dan bernilai
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="primary"
            className="rounded-3xl px-12 py-6 text-xl shadow-2xl"
          >
            {user ? 'Lanjutkan Aktivitas' : 'Mulai Pilah Sekarang'}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl text-center mb-16 text-gray-900">
          Solusi Mudah untuk Semua Generasi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 rounded-3xl border-2 border-emerald-500/20 hover:border-emerald-500 transition-all hover:shadow-2xl group">
              <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">AI Waste Scanner</h3>
              <p className="text-gray-600 text-lg">
                Cukup foto sampah Anda. Sistem pintar kami akan membantu mengenali jenisnya dan memberi panduan pemilahan yang benar.
              </p>
            </Card>

            <Card className="p-10 rounded-3xl border-2 border-teal-500/20 hover:border-teal-500 transition-all hover:shadow-2xl group">
              <div className="bg-linear-to-br from-teal-500 to-emerald-500 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Penjemputan Praktis ke Rumah</h3>
              <p className="text-gray-600 text-lg">
                Tidak perlu repot. Atur jadwal penjemputan sampah dan biarkan kami yang datang sesuai waktu pilihan Anda.
              </p>
            </Card>

            <Card className="p-10 rounded-3xl border-2 border-amber-500/20 hover:border-amber-500 transition-all hover:shadow-2xl group">
              <div className="bg-linear-to-br from-amber-500 to-emerald-500 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Point Rewards</h3>
              <p className="text-gray-600 text-lg">
                Setiap kontribusi Anda bernilai. Kumpulkan poin dan tukarkan dengan hadiah, voucher, atau manfaat lainnya.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 px-4 bg-linear-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl text-center mb-16 text-gray-900">
            Dampak Nyata dari Aksi Kita
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-12 rounded-3xl bg-white/60 backdrop-blur-lg border-2 border-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl">
                  <Recycle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-500 mb-3">2,547</div>
                <p className="text-xl text-gray-600">Sampah Berhasil Dikelola</p>
              </div>
            </Card>

            <Card className="p-12 rounded-3xl bg-white/60 backdrop-blur-lg border-2 border-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-500 mb-3">15,892</div>
                <p className="text-xl text-gray-600">Lingkungan Lebih Hijau</p>
              </div>
            </Card>

            <Card className="p-12 rounded-3xl bg-white/60 backdrop-blur-lg border-2 border-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-500 mb-3">48,329</div>
                <p className="text-xl text-gray-600">Masyarakat Terlibat</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-linear-to-br from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-5xl mb-6"> Perubahan Besar Dimulai dari Langkah Kecil</h2>
          <p className="text-2xl mb-12 opacity-95">
            Ajak keluarga dan komunitas Anda berkontribusi demi lingkungan yang lebih bersih dan masa depan yang lebih baik

          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="primary"
            className="rounded-3xl px-12 py-6 text-xl shadow-2xl"
          >
            {user ? 'Lihat Kontribusiku' : 'Mulai Berkontribusi'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">SIPAKATAU</h3>
              <p className="text-gray-400">  Teknologi untuk Lingkungan, Edukasi untuk Generasi</p>
            </div>
            <div>
              <h4 className="text-lg mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate('scanner')} className="hover:text-white transition-colors">AI Scanner</button></li>
                <li><button onClick={() => onNavigate('pickup')} className="hover:text-white transition-colors">Smart Pickup</button></li>
                <li><button onClick={() => onNavigate('rewards')} className="hover:text-white transition-colors">Rewards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Tentang</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Tim Kami</button></li>
                <li><button className="hover:text-white transition-colors">Mitra</button></li>
                <li><button className="hover:text-white transition-colors">Karir</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Bantuan</button></li>
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
                <li><button className="hover:text-white transition-colors">Email</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SIPAKATAU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}