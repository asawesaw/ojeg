
import React, { useState } from 'react';
import { Search, MapPin, Bike, Car, ShoppingCart, Utensils, Zap, CreditCard, ChevronRight, Truck, Bell, Heart, ArrowLeftRight, Plus } from 'lucide-react';

const UserHome: React.FC<{ setView: (v: string) => void }> = ({ setView }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="px-4 py-6 space-y-7 animate-fade-up">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <MapPin size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Lokasi Sekarang</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-slate-800">Grand Indonesia, Jakarta</span>
              <ChevronRight size={14} className="text-slate-400" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="relative p-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-90 transition-all">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-11 h-11 rounded-2xl bg-white p-1 border border-slate-100 shadow-sm overflow-hidden">
             <img src="https://picsum.photos/seed/user1/100" className="w-full h-full object-cover rounded-xl" alt="Avatar" />
          </div>
        </div>
      </div>

      {/* Premium Wallet Card - Fixed Buttons */}
      <div className="relative group overflow-hidden bg-slate-900 rounded-[32px] p-6 text-white shadow-2xl shadow-slate-200">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-indigo-600/20 rounded-full blur-[60px]"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <CreditCard size={20} className="text-violet-400" />
              </div>
              <span className="font-bold text-sm tracking-tight">NusaPay Wallet</span>
            </div>
            <button 
              onClick={() => setView('wallet')} 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border border-white/5 transition-all"
            >
              Riwayat
            </button>
          </div>
          
          <div className="mb-6">
            <span className="text-[11px] text-slate-400 font-bold block mb-1">Saldo Tersedia</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-500">Rp</span>
              <span className="text-3xl font-black tracking-tighter">1.250.000</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setView('topup')}
              className="bg-violet-600 hover:bg-violet-500 text-white py-3.5 rounded-2xl text-[11px] font-black shadow-lg shadow-violet-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} className="stroke-[3]" /> ISI SALDO
            </button>
            <button 
              onClick={() => setView('transfer')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-3.5 rounded-2xl text-[11px] font-black border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeftRight size={14} className="stroke-[3]" /> TRANSFER
            </button>
          </div>
        </div>
      </div>

      {/* Modern Large Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-colors">
          <Search className="text-slate-400 group-focus-within:text-violet-600 transition-all" size={22} />
        </div>
        <input 
          type="text" 
          placeholder="Lagi pengen apa hari ini?"
          className="w-full bg-white border border-slate-100 rounded-[28px] py-5 pl-16 pr-6 text-sm font-black focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none shadow-xl shadow-slate-200/40 transition-all placeholder:text-slate-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {[
          { label: 'Ojeg', icon: Bike, color: 'bg-violet-50 text-violet-600', action: () => setView('ride') },
          { label: 'Mobil', icon: Car, color: 'bg-blue-50 text-blue-600', action: () => setView('mobil') },
          { label: 'Food', icon: Utensils, color: 'bg-orange-50 text-orange-600', action: () => setView('market') },
          { label: 'Belanja', icon: ShoppingCart, color: 'bg-indigo-50 text-indigo-600', action: () => setView('market') },
          { label: 'Pulsa', icon: Zap, color: 'bg-yellow-50 text-yellow-600', action: () => {} },
          { label: 'Kirim', icon: MapPin, color: 'bg-red-50 text-red-600', action: () => setView('kirim') },
          { label: 'Logistik', icon: Truck, color: 'bg-emerald-50 text-emerald-600', action: () => setView('box') },
          { label: 'Semua', icon: ChevronRight, color: 'bg-slate-50 text-slate-600', action: () => {} },
        ].map((item, idx) => (
          <button key={idx} onClick={item.action} className="flex flex-col items-center gap-2.5 group">
            <div className={`${item.color} w-16 h-16 rounded-[24px] flex items-center justify-center group-active:scale-90 transition-all border border-transparent group-hover:border-current/20 shadow-sm`}>
              <item.icon size={28} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-extrabold text-slate-600 tracking-tight group-hover:text-slate-900 transition-colors">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Promo Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">Promo Menarik Untukmu</h2>
          <button className="text-violet-600 text-xs font-black flex items-center gap-1 hover:underline tracking-tight">LIHAT SEMUA</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[300px] h-44 rounded-[32px] bg-slate-200 overflow-hidden relative group cursor-pointer snap-center shadow-md">
              <img src={`https://picsum.photos/seed/promo${i+10}/600/300`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Promo" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-violet-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">NusaDeal</span>
                   <span className="text-white/60 text-[10px] font-bold">Berakhir dlm 2 hari</span>
                </div>
                <h3 className="text-white font-black text-lg leading-tight">Makan Kenyang Hemat 50% Setiap Hari</h3>
                <p className="text-white/70 text-[11px] font-medium mt-1">Pakai kartu NusaPay debit atau kredit</p>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors">
                <Heart size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
