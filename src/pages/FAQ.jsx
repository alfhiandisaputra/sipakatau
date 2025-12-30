import { useState, useMemo } from 'react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Zap,
  Users,
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  faqCategories,
  getPopularFAQs,
  searchFAQs,
  contactInfo
} from '../data/faqData';
import { formatAnswer, formatContactInfo } from '../utils/formatters'; // Import formatters

export default function FAQ() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [copiedItemId, setCopiedItemId] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleFAQItem = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const popularFAQs = useMemo(() => getPopularFAQs(), []);
  const filteredItems = useMemo(() => searchFAQs(searchTerm), [searchTerm]);

  const handleCopyFAQ = (question, answer, itemId) => {
    const textToCopy = `Q: ${question}\nA: ${answer}\n\nSumber: EcoEdu Scanner FAQ`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopiedItemId(itemId);
        setTimeout(() => setCopiedItemId(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  const handleSaveFAQ = (itemId) => {
    // Simpan ke localStorage atau state management
    const savedFAQs = JSON.parse(localStorage.getItem('savedFAQs') || '[]');
    if (!savedFAQs.includes(itemId)) {
      savedFAQs.push(itemId);
      localStorage.setItem('savedFAQs', JSON.stringify(savedFAQs));
      alert('FAQ berhasil disimpan!');
    } else {
      alert('FAQ sudah tersimpan!');
    }
  };

  return (
    <LayoutWrapper user={user}>
      <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
        <div className="bg-linear-to-r from-emerald-500 to-teal-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Pusat Bantuan & FAQ
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                Temukan jawaban untuk pertanyaan umum tentang EcoEdu Scanner
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              placeholder="Cari pertanyaan atau topik..."
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
          
          {searchTerm && filteredItems.length > 0 && (
            <div className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Hasil pencarian untuk "{searchTerm}"
                <span className="text-emerald-600 ml-2">({filteredItems.length} hasil ditemukan)</span>
              </h3>
              <div className="space-y-4">
                {filteredItems.map((item) => {
                  const category = faqCategories.find(cat => cat.id === item.categoryId);
                  const Icon = category?.icon;
                  return (
                    <div 
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-colors"
                    >
                      <button
                        onClick={() => toggleFAQItem(item.id)}
                        className="w-full text-left flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {Icon && (
                              <Icon className={`w-4 h-4 ${item.categoryTextColor}`} />
                            )}
                            <span 
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${item.categoryTextColor.replace('text-', 'bg-')}20`,
                                color: item.categoryTextColor
                              }}
                            >
                              {item.categoryTitle}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {item.question}
                          </h4>
                        </div>
                        {expandedItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                        )}
                      </button>
                      {expandedItems.includes(item.id) && (
                        <div className="mt-3 pl-2 border-l-2 border-emerald-500">
                          <div className="text-gray-600 bg-gray-50 rounded-xl p-4">
                            {formatAnswer(item.answer)}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => handleSaveFAQ(item.id)}
                              className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                            >
                              <Heart className="w-4 h-4" />
                              Simpan
                            </button>
                            <button
                              onClick={() => handleCopyFAQ(item.question, item.answer, item.id)}
                              className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1 ml-4"
                            >
                              <Copy className="w-4 h-4" />
                              {copiedItemId === item.id ? 'Tersalin!' : 'Salin'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {searchTerm && filteredItems.length === 0 && (
            <div className="mt-6 text-center p-8 bg-white rounded-2xl shadow-lg">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tidak ditemukan hasil untuk "{searchTerm}"
              </h3>
              <p className="text-gray-600 mb-6">
                Coba kata kunci lain atau jelajahi kategori di bawah
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <Search className="w-4 h-4" />
                Lihat Semua FAQ
              </button>
            </div>
          )}
        </div>


        {!searchTerm && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-amber-500" />
                  Pertanyaan Populer
                </h2>
                <span className="text-sm text-gray-500">
                  {popularFAQs.length} pertanyaan terpopuler
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularFAQs.map((item) => {
                  const category = faqCategories.find(cat => cat.id === item.categoryId);
                  const Icon = category?.icon;
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ 
                            backgroundColor: `${item.categoryTextColor}20`
                          }}
                        >
                          {Icon && (
                            <Icon 
                              className={`w-5 h-5 ${item.categoryTextColor}`} 
                            />
                          )}
                        </div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: item.categoryTextColor }}
                        >
                          {item.categoryTitle}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3">
                        {item.question}
                      </h3>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleFAQItem(item.id)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                        >
                          {expandedItems.includes(item.id) ? 'Tutup jawaban' : 'Lihat jawaban'}
                          {expandedItems.includes(item.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleSaveFAQ(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                            title="Simpan FAQ"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCopyFAQ(item.question, item.answer, item.id)}
                            className="p-1 text-gray-400 hover:text-emerald-600"
                            title="Salin FAQ"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {expandedItems.includes(item.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-gray-600">
                          
                            {formatAnswer(item.answer)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Kategori Pertanyaan
                </h2>
                <span className="text-sm text-gray-500">
                  {faqCategories.length} kategori tersedia
                </span>
              </div>
              
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={category.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${category.color} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-900">
                            {category.title}
                          </h3>
                          <p className="text-gray-600">{category.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {category.items.length} pertanyaan
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedCategory === category.id ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedCategory === category.id && (
                      <div className="border-t border-gray-200 p-6">
                        <div className="space-y-4">
                          {category.items.map((item) => (
                            <div 
                              key={item.id}
                              className="border border-gray-100 rounded-xl p-4 hover:border-emerald-200 transition-colors bg-gray-50/50"
                            >
                              <button
                                onClick={() => toggleFAQItem(item.id)}
                                className="w-full text-left flex items-start justify-between gap-4"
                              >
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {item.question}
                                  </h4>
                                </div>
                                {expandedItems.includes(item.id) ? (
                                  <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                                )}
                              </button>
                              {expandedItems.includes(item.id) && (
                                <div className="mt-3 pl-2 border-l-2 border-emerald-500">
                                  <div className="text-gray-600 bg-white rounded-xl p-4 shadow-sm">
                                   
                                    {formatAnswer(item.answer)}
                                  </div>
                                  <div className="mt-3 flex gap-2">
                                    <button
                                      onClick={() => handleSaveFAQ(item.id)}
                                      className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                                    >
                                      <Heart className="w-4 h-4" />
                                      Simpan
                                    </button>
                                    <button
                                      onClick={() => handleCopyFAQ(item.question, item.answer, item.id)}
                                      className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1 ml-4"
                                    >
                                      <Copy className="w-4 h-4" />
                                      {copiedItemId === item.id ? 'Tersalin!' : 'Salin'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-center shadow-xl">
              <div className="max-w-2xl mx-auto">
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Masih Punya Pertanyaan?
                </h3>
                <p className="text-emerald-100 mb-6">
                  Tim support kami siap membantu Anda 24/7
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                  <button
                    onClick={() => window.open(formatContactInfo('email', contactInfo.email), '_blank')}
                    className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </button>
                  <button
                    onClick={() => window.open(formatContactInfo('whatsapp', contactInfo.whatsapp), '_blank')}
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(formatContactInfo('phone', contactInfo.phone), '_blank')}
                    className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Telepon
                  </button>
                </div>
                <div className="mt-6 text-emerald-100 text-sm space-y-1">
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <HelpCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Video Tutorial</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Lihat video panduan penggunaan aplikasi
                </p>
                <button
                  onClick={() => window.open(contactInfo.youtube, '_blank')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                >
                  Tonton sekarang
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Komunitas</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Bergabung dengan komunitas EcoEdu Scanner
                </p>
                <button
                  onClick={() => navigate('/community')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  Gabung sekarang
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <HelpCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Blog Edukasi</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Baca artikel edukasi tentang pengelolaan sampah
                </p>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                >
                  Baca artikel
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}