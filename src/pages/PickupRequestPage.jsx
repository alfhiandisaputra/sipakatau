import { useState } from "react";
import  Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import  Input from "../components/ui/Input";
import  Label from "../components/ui/Label";
import PickupHeader from "../components/features/pickup/PickupHeader";
import { CheckCircle, Calendar, MapPin, Package, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";


export default function PickupRequest() {
  const navigate = useNavigate()
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    wasteType: '',
    weight: '',
    date: '',
    time: '',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
  });


  const estimatedPoints = formData.weight ? parseInt(formData.weight) * 100 : 0;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('Penjemputan berhasil dijadwalkan! Tim kami akan segera menghubungi Anda.');
    if (navigate) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen mt-20">
      <PickupHeader user={user} onBack={() => navigate('/dashboard')} />
      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 text-[#0f172a]">Jadwalkan Penjemputan</h1>
          <p className="text-muted-foreground text-lg">
            Isi formulir di bawah untuk menjadwalkan penjemputan sampah Anda
          </p>
        </div>

        <div className="mb-12 w-full px-4">
  <div className="relative flex items-center justify-between max-w-2xl mx-auto">
    <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
    
    <div 
      className="absolute top-6 left-0 h-1 bg-linear-to-r from-[#10B981] to-[#06B6D4] -z-10 transition-all duration-500 rounded-full"
      style={{ width: `${((step - 1) / (4 - 1)) * 100}%` }}
    ></div>

    {[1, 2, 3, 4].map((s) => (
      <div key={s} className="flex flex-col items-center relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
            s <= step
              ? 'bg-linear-to-br from-[#10B981] to-[#06B6D4] text-white shadow-lg scale-110 border-white'
              : 'bg-white text-gray-400 border-gray-200'
          }`}
        >
          {s < step ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <span className="font-bold text-lg">{s}</span>
          )}
        </div>

        {/* Label Teks */}
        <div className="absolute top-14 w-32 text-center">
          <p 
            className={`text-xs mt-1 transition-colors duration-300 ${
              s <= step ? 'text-[#10B981] font-bold' : 'text-gray-400'
            }`}
          >
            {s === 1 && 'Jenis Sampah'}
            {s === 2 && 'Berat'}
            {s === 3 && 'Waktu & Lokasi'}
            {s === 4 && 'Konfirmasi'}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Form Content */}
        <Card className="p-8 md:p-12 rounded-3xl border-2 border-[#10B981]/20 shadow-xl">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-br from-[#10B981] to-[#06B6D4] p-3 rounded-2xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Pilih Jenis Sampah</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card
                  onClick={() => setFormData({ ...formData, wasteType: 'Anorganik (Plastik)' })}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    formData.wasteType === 'Anorganik (Plastik)'
                      ? 'border-4 border-[#10B981] bg-[#10B981]/5 shadow-lg'
                      : 'border-2 border-gray-200 hover:border-[#10B981]/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-[#06B6D4]/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Package className="w-10 h-10 text-[#06B6D4]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Anorganik</h3>
                    <p className="text-muted-foreground text-sm">Plastik, Botol, Kaleng, Kaca</p>
                  </div>
                </Card>

                <Card
                  onClick={() => setFormData({ ...formData, wasteType: 'Organik' })}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    formData.wasteType === 'Organik'
                      ? 'border-4 border-[#10B981] bg-[#10B981]/5 shadow-lg'
                      : 'border-2 border-gray-200 hover:border-[#10B981]/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-[#10B981]/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Package className="w-10 h-10 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Organik</h3>
                    <p className="text-muted-foreground text-sm">Sisa Makanan, Daun, Kertas</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Weight */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-br from-[#10B981] to-[#06B6D4] p-3 rounded-2xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Estimasi Berat Sampah</h2>
              </div>

              <div className="max-w-md mx-auto">
                <Label htmlFor="weight" className="text-lg mb-2 block">Berat (Kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  placeholder="Masukkan estimasi berat"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="rounded-2xl border-2 border-[#10B981]/30 focus:border-[#10B981] h-14 text-lg"
                />

                {formData.weight && (
                  <Card className="mt-6 p-6 rounded-2xl bg-linear-to-br from-[#F59E0B]/10 to-[#10B981]/10 border-2 border-[#F59E0B]/30">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Estimasi Poin yang Didapat</p>
                      <p className="text-5xl font-bold text-[#F59E0B]">{estimatedPoints}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        *Poin final akan disesuaikan setelah penimbangan
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Date, Time, Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-br from-[#10B981] to-[#06B6D4] p-3 rounded-2xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Waktu & Lokasi Penjemputan</h2>
              </div>

              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <Label htmlFor="date" className="text-lg mb-2 block">Tanggal</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="rounded-2xl border-2 border-[#10B981]/30 focus:border-[#10B981] h-14 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-lg mb-2 block">Waktu</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="rounded-2xl border-2 border-[#10B981]/30 focus:border-[#10B981] h-14 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-lg mb-2 block items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#10B981]" />
                    Alamat Penjemputan
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="rounded-2xl border-2 border-[#10B981]/30 focus:border-[#10B981] h-14 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-linear-to-br from-[#10B981] to-[#06B6D4] p-3 rounded-2xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Konfirmasi Detail Penjemputan</h2>
              </div>

              <Card className="p-6 rounded-2xl bg-linear-to-br from-[#10B981]/5 to-[#06B6D4]/5 border-2 border-[#10B981]/20">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-muted-foreground">Jenis Sampah:</span>
                    <span className="font-semibold">{formData.wasteType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-muted-foreground">Estimasi Berat:</span>
                    <span className="font-semibold">{formData.weight} Kg</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-muted-foreground">Tanggal:</span>
                    <span className="font-semibold">{formData.date}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-muted-foreground">Waktu:</span>
                    <span className="font-semibold">{formData.time}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-muted-foreground">Alamat:</span>
                    <span className="font-semibold text-right">{formData.address}</span>
                  </div>
                  <div className="flex justify-between py-3 bg-linear-to-r from-[#F59E0B]/10 to-[#10B981]/10 px-4 rounded-xl">
                    <span className="text-muted-foreground">Estimasi Poin:</span>
                    <span className="text-2xl font-bold text-[#F59E0B]">{estimatedPoints} poin</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-2xl bg-[#06B6D4]/10 border-2 border-[#06B6D4]/30">
                <p className="text-sm text-center">
                  Tim kami akan menghubungi Anda 1 jam sebelum waktu penjemputan untuk konfirmasi.
                </p>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          {/* Navigation Buttons */}
<div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
  {step > 1 && (
    <Button
      onClick={handleBack}
      variant="outline"
      className="w-full sm:flex-1 border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10 rounded-2xl py-6 order-2 sm:order-1"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Kembali
    </Button>
  )}
  
  <div className="w-full sm:flex-1 order-1 sm:order-2">
    {step < 4 ? (
      <Button
        onClick={handleNext}
        disabled={
          (step === 1 && !formData.wasteType) ||
          (step === 2 && !formData.weight) ||
          (step === 3 && (!formData.date || !formData.time))
        }
        className="w-full bg-linear-to-r from-[#10B981] to-[#06B6D4] hover:opacity-90 text-white rounded-2xl py-6"
      >
        Lanjut
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    ) : (
      <Button
        onClick={handleSubmit}
        className="w-full bg-linear-to-r from-[#10B981] to-[#06B6D4] hover:opacity-90 text-white rounded-2xl py-6 shadow-lg shadow-emerald-500/20"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Ajukan Penjemputan
      </Button>
    )}
  </div>
</div>
        </Card>
      </div>
    </div>
  );
}