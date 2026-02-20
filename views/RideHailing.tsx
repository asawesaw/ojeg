import React, { useState } from 'react';
import { MapPin, Search, ChevronLeft, Map as MapIcon, Bike, Car, ArrowRight } from 'lucide-react';

interface RideProps {
  onBack: () => void;
  initialType?: 'MOTOR' | 'MOBIL';
}

const RideHailing: React.FC<RideProps> = ({ onBack, initialType = 'MOTOR' }) => {
  const [step, setStep] = useState<'DEST' | 'CONFIRM' | 'TRACK'>('DEST');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(initialType === 'MOTOR' ? 'Nusa Ojeg' : 'Nusa Mobil');

  const rideOptions = [
    { name: 'Nusa Ojeg', icon: Bike, price: 12000, desc: 'Paling cepat', type: 'MOTOR' },
    { name: 'Nusa Mobil', icon: Car, price: 28000, desc: 'Nyaman & ber-AC', type: 'MOBIL' },
    { name: 'Nusa XL', icon: Car, price: 42000, desc: 'Hingga 6 orang', type: 'MOBIL' },
  ];

  return (
    <div className="relative h-screen bg-slate-200 flex flex-col">
      <div className="flex-1 bg-slate-300 relative overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40">
           <svg className="w-full h-full" viewBox="0 0 100 100">
             <path d="M0 20 L100 20 M20 0 L20 100 M80 0 L80 100 M0 80 L100 80" stroke="white" strokeWidth="1" fill="none" />
             <circle cx="45" cy="50" r="1.5" fill="#7c3aed" />
             <circle cx="55" cy="40" r="1.5" fill="#3b82f6" />
           </svg>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="bg-violet-600 text-white p-2 rounded-full shadow-lg animate-bounce">
              <MapPin size={24} />
           </div>
           <div className="mt-2 bg-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md whitespace-nowrap">Lokasi Anda</div>
        </div>

        <button 
          onClick={onBack}
          className="absolute top-6 left-6 bg-white p-3 rounded-2xl shadow-xl z-10 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} className="text-slate-800" />
        </button>
      </div>

      <div className={`bg-white rounded-t-[40px] px-6 py-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 ${
        step === 'DEST' ? 'h-1/2' : 'h-2/3'
      }`}>
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6"></div>

        {step === 'DEST' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {initialType === 'MOTOR' ? 'Pesan Ojeg' : 'Pesan Mobil'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                <input readOnly value="Grand Indonesia, Jakarta" className="bg-transparent text-sm font-medium outline-none text-slate-500 w-full" />
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-violet-500 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <input 
                  autoFocus
                  placeholder="Masukkan tujuan" 
                  className="bg-transparent text-sm font-bold outline-none text-slate-800 w-full"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              disabled={!destination}
              onClick={() => setStep('CONFIRM')}
              className="w-full bg-violet-600 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-violet-200 flex items-center justify-center gap-2 group transition-all"
            >
              Konfirmasi Tujuan <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 'CONFIRM' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Pilih Armada</h2>
              <span className="text-xs text-slate-400 font-medium">Tiba: 5-8 mnt</span>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
              {rideOptions.map((opt) => (
                <div 
                  key={opt.name}
                  onClick={() => setSelectedRide(opt.name)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedRide === opt.name ? 'border-violet-500 bg-violet-50/50' : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${selectedRide === opt.name ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <opt.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{opt.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{opt.desc}</p>
                    </div>
                  </div>
                  <span className="font-bold text-violet-700">Rp {opt.price.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep('TRACK')}
              className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
            >
              Pesan {selectedRide}
            </button>
          </div>
        )}

        {step === 'TRACK' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Mencari Driver...</h2>
                <p className="text-xs text-slate-500">Mengkoneksikan ke {selectedRide} terdekat</p>
              </div>
              <div className="relative w-12 h-12">
                 <div className="absolute inset-0 border-4 border-violet-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {selectedRide.includes('Ojeg') ? <Bike size={24} className="text-violet-600" /> : <Car size={24} className="text-blue-600" />}
               </div>
               <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/3 animate-pulse"></div>
               </div>
            </div>

            <button 
              onClick={() => setStep('DEST')}
              className="w-full text-red-500 font-bold text-sm py-2 hover:bg-red-50 rounded-xl transition-colors"
            >
              Batalkan Pesanan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHailing;