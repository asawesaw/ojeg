import React, { useState } from 'react';
import { MapPin, ChevronLeft, Package, ArrowRight, Info, Truck, Bike } from 'lucide-react';

interface LogisticsProps {
  type: 'KIRIM' | 'BOX';
  onBack: () => void;
}

const LogisticsService: React.FC<LogisticsProps> = ({ type, onBack }) => {
  const [step, setStep] = useState<'ADDR' | 'DETAIL' | 'CONFIRM'>('ADDR');
  const [formData, setFormData] = useState({
    pickup: 'Lokasi Saya Saat Ini',
    destination: '',
    weight: '1',
    category: 'Dokumen',
    note: ''
  });

  const categories = ['Dokumen', 'Makanan', 'Pakaian', 'Elektronik', 'Pecah Belah'];

  return (
    <div className="relative h-screen bg-slate-50 flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="px-6 py-8 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
          <ChevronLeft size={24} className="text-slate-800" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {type === 'KIRIM' ? 'Kirim Barang' : 'Kurir Box'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
        {step === 'ADDR' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={18} className="text-violet-600" /> Alamat Pengiriman
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-100 p-4 rounded-2xl">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Titik Jemput</label>
                  <input readOnly value={formData.pickup} className="w-full bg-transparent font-bold text-sm outline-none" />
                </div>
                <div className="bg-white border-2 border-violet-500 p-4 rounded-2xl shadow-sm">
                  <label className="text-[10px] font-bold text-violet-600 uppercase">Titik Antar</label>
                  <input 
                    autoFocus
                    placeholder="Cari lokasi tujuan..." 
                    className="w-full bg-transparent font-bold text-sm outline-none" 
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl flex gap-3">
              <Info size={20} className="text-blue-600 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                Pastikan nomor telepon penerima aktif untuk memudahkan kurir saat koordinasi.
              </p>
            </div>
          </div>
        )}

        {step === 'DETAIL' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Package size={18} className="text-violet-600" /> Detail Paket
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Berat (kg)</label>
                  <input 
                    type="number" 
                    value={formData.weight} 
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-transparent font-bold text-sm outline-none" 
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-transparent font-bold text-sm outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Catatan untuk Kurir</label>
                <textarea 
                  placeholder="Contoh: Titipkan di satpam..." 
                  className="w-full bg-transparent font-bold text-sm outline-none mt-1 h-20 resize-none"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 'CONFIRM' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h3 className="font-bold text-slate-800">Pilih Armada</h3>
            <div className="space-y-3">
              {[
                { name: 'Nusa Kirim (Motor)', icon: Bike, cap: '5kg', price: 15000, show: type === 'KIRIM' },
                { name: 'Nusa Pickup (Bak)', icon: Truck, cap: '500kg', price: 85000, show: type === 'BOX' },
                { name: 'Nusa Box (Tertutup)', icon: Truck, cap: '800kg', price: 125000, show: type === 'BOX' },
              ].filter(v => v.show).map((v) => (
                <div key={v.name} className="p-4 bg-white border-2 border-violet-500 rounded-3xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-600 text-white rounded-2xl">
                      <v.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{v.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Kapasitas hingga {v.cap}</p>
                    </div>
                  </div>
                  <span className="font-black text-violet-700">Rp {v.price.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white p-6 border-t border-slate-100">
        <button 
          onClick={() => {
            if (step === 'ADDR' && formData.destination) setStep('DETAIL');
            else if (step === 'DETAIL') setStep('CONFIRM');
            else if (step === 'CONFIRM') { alert('Pesanan dibuat!'); onBack(); }
          }}
          disabled={step === 'ADDR' && !formData.destination}
          className="w-full bg-violet-600 disabled:bg-slate-200 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-100 active:scale-95 transition-all"
        >
          {step === 'CONFIRM' ? 'Pesan Sekarang' : 'Lanjutkan'} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LogisticsService;