
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  MapPin, TrendingUp, Users, DollarSign, Package, Star, 
  Power, Clock, ChevronRight, X, Check, ShieldCheck, 
  Image as ImageIcon, FileText, AlertCircle, ZoomIn, Eye,
  ArrowUpRight, CreditCard, Landmark, Wallet as WalletIcon,
  CheckCircle2, Info, Navigation, CalendarDays, Filter, ChevronDown, LogOut
} from 'lucide-react';

const chartData = [
  { name: 'Sen', revenue: 4000 },
  { name: 'Sel', revenue: 3000 },
  { name: 'Rab', revenue: 2000 },
  { name: 'Kam', revenue: 2780 },
  { name: 'Jum', revenue: 1890 },
  { name: 'Sab', revenue: 2390 },
  { name: 'Min', revenue: 3490 },
];

interface DashboardProps {
  onLogout?: () => void;
}

export const DriverDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'INPUT' | 'PROCESSING' | 'SUCCESS'>('INPUT');
  const [withdrawAmount, setWithdrawAmount] = useState('425000');
  const [selectedMethod, setSelectedMethod] = useState('BCA');

  const handleWithdraw = () => {
    setWithdrawStep('PROCESSING');
    setTimeout(() => {
      setWithdrawStep('SUCCESS');
    }, 2000);
  };

  const closeWithdraw = () => {
    setIsWithdrawOpen(false);
    setWithdrawStep('INPUT');
  };

  return (
    <div className="px-5 py-6 space-y-7 animate-fade-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Status Driver</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID Mitra: #NS-99120</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl font-black text-[10px] shadow-sm animate-pulse uppercase tracking-tight">
            <Power size={12} /> ONLINE
          </button>
          <button 
            onClick={() => { if(confirm("Keluar dari akun driver?")) onLogout?.(); }}
            className="p-2.5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
             <Navigation size={20} />
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Total Trip</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">142</span>
        </div>
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-3">
             <Star size={20} className="fill-current" />
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Rating</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-slate-800 tracking-tighter">4.9</span>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">+0.2</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-7 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-violet-600/30 rounded-full blur-[70px]"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">E-Wallet Pendapatan</span>
            <WalletIcon size={20} className="text-violet-500" />
          </div>
          <div className="mb-8">
            <span className="text-[10px] opacity-60 block font-bold mb-1 uppercase tracking-wider">Tersedia untuk ditarik</span>
            <div className="flex items-baseline gap-1.5">
               <span className="text-sm font-bold text-slate-500">Rp</span>
               <h2 className="text-4xl font-black tracking-tighter">425.000</h2>
            </div>
          </div>
          <button 
            onClick={() => setIsWithdrawOpen(true)}
            className="w-full bg-violet-600 hover:bg-violet-500 py-4 rounded-2xl text-[12px] font-black tracking-widest transition-all shadow-lg shadow-violet-900/40 flex items-center justify-center gap-3 active:scale-95"
          >
            TARIK SALDO <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-12">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-slate-800 tracking-tight">Aktivitas Terkini</h3>
          <span className="text-[10px] font-black text-violet-600 cursor-pointer">LIHAT SEMUA</span>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center hover:border-violet-200 transition-all cursor-pointer group shadow-sm active:scale-98">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition-all">
                 <MapPin size={24} />
               </div>
               <div>
                 <h4 className="text-sm font-black text-slate-800">Menuju SCBD Jakarta</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Selesai • 14:45</p>
               </div>
             </div>
             <div className="text-right">
                <span className="text-emerald-600 font-black text-sm block tracking-tighter">+Rp 12.000</span>
                <ChevronRight size={14} className="text-slate-300 ml-auto mt-1" />
             </div>
          </div>
        ))}
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-end justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            {withdrawStep === 'INPUT' && (
              <div className="p-8 space-y-7">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Tarik Saldo</h2>
                  <button onClick={closeWithdraw} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
                </div>

                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Nominal Penarikan</span>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-300">Rp</span>
                      <input 
                        type="number"
                        className="bg-transparent text-3xl font-black text-slate-800 w-full outline-none tracking-tighter"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                   </div>
                   <p className="text-[11px] text-violet-600 font-extrabold mt-3 flex items-center gap-1">
                     <Info size={12} /> Saldo bisa dicairkan: Rp 425.000
                   </p>
                </div>

                <div className="space-y-4">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Metode Pencairan</h3>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'BCA', label: 'BCA Account', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { id: 'OVO', label: 'E-Wallet OVO', icon: WalletIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
                      ].map(m => (
                        <button 
                          key={m.id}
                          onClick={() => setSelectedMethod(m.id)}
                          className={`p-5 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 ${
                            selectedMethod === m.id ? 'border-violet-500 bg-violet-50/50 scale-[1.02] shadow-lg shadow-violet-100' : 'border-slate-50 bg-white'
                          }`}
                        >
                           <div className={`${m.bg} ${m.color} p-3 rounded-2xl`}>
                              <m.icon size={24} />
                           </div>
                           <span className="text-[11px] font-black text-slate-800 tracking-tight">{m.label}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={handleWithdraw}
                  className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black text-sm tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all"
                >
                  KONFIRMASI PENARIKAN
                </button>
              </div>
            )}
            
            {withdrawStep === 'PROCESSING' && (
              <div className="p-16 text-center space-y-8 flex flex-col items-center justify-center">
                <div className="relative">
                   <div className="w-24 h-24 border-8 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Clock size={32} className="text-violet-600" />
                   </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Memproses Dana</h3>
                  <p className="text-xs text-slate-400 font-bold">Lagi verifikasi, sabar ya...</p>
                </div>
              </div>
            )}

            {withdrawStep === 'SUCCESS' && (
              <div className="p-10 text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto shadow-inner rotate-12">
                   <CheckCircle2 size={48} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Cair Berhasil!</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed px-4">
                    Dana <span className="text-emerald-600">Rp {parseInt(withdrawAmount).toLocaleString('id-ID')}</span> sudah dalam perjalanan ke akun <span className="font-black text-slate-800">{selectedMethod}</span> kamu.
                  </p>
                </div>
                <div className="bg-slate-50 py-3 rounded-2xl text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">
                  Ref: TXW-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </div>
                <button 
                  onClick={closeWithdraw}
                  className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black text-xs tracking-widest"
                >
                  KEMBALI KE BERANDA
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const MerchantDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeOrders, setActiveOrders] = useState([
    { id: 'ORD-991', items: '2x Burger Original, 1x Cola', total: 92000, status: 'PENDING', customer: 'Andi S.' },
    { id: 'ORD-992', items: '1x Nasi Goreng Spesial', total: 28000, status: 'PENDING', customer: 'Siti M.' },
  ]);

  const handleAccept = (id: string) => {
    setActiveOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ACCEPTED' } : o));
    setTimeout(() => {
        setActiveOrders(prev => prev.filter(o => o.id !== id));
    }, 1200);
  };

  return (
    <div className="px-5 py-6 space-y-8 animate-fade-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Pusat Mitra</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Kopi Kenangan - SCBD</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-slate-100 p-2.5 rounded-2xl shadow-sm text-violet-600">
             <Package size={22} />
          </div>
          <button 
            onClick={() => { if(confirm("Keluar dari panel toko?")) onLogout?.(); }}
            className="p-2.5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {[
          { label: 'Pesanan', val: activeOrders.length.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Dilihat', val: '1.2rb', icon: Eye, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Rating', val: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map(stat => (
          <div key={stat.label} className="min-w-[130px] bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm">
            <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
               <stat.icon size={20} />
            </div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">{stat.label}</span>
            <span className="text-xl font-black text-slate-800 tracking-tighter">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-slate-800 tracking-tight">Performa Penjualan</h3>
          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
             <TrendingUp size={12} /> +12%
          </div>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="revenue" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold'}} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-5 pb-12">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-black text-slate-800 tracking-tight">Antrean Masuk</h3>
          <span className="text-[10px] font-black text-violet-600 tracking-widest uppercase">Lihat Riwayat</span>
        </div>
        
        {activeOrders.map(order => (
          <div key={order.id} className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all duration-500 relative overflow-hidden ${order.status === 'ACCEPTED' ? 'opacity-30 scale-95 translate-x-20' : 'hover:border-violet-300'}`}>
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-slate-800">{order.customer}</span>
                    <span className="bg-slate-100 text-slate-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">#{order.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <Clock size={12} /> 2 mnt lalu
                  </div>
               </div>
               <div className="text-right">
                  <span className="text-violet-600 font-black text-sm block tracking-tighter">Rp {order.total.toLocaleString('id-ID')}</span>
                  <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg uppercase tracking-tighter">MENUNGGU</span>
               </div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-2xl mb-5 flex items-center gap-3">
               <Package size={16} className="text-slate-400" />
               <span className="text-[11px] font-bold text-slate-600 line-clamp-1">{order.items}</span>
            </div>

            {order.status === 'PENDING' && (
              <div className="flex gap-3">
                <button 
                  onClick={() => handleAccept(order.id)}
                  className="flex-[2] bg-violet-600 text-white py-3.5 rounded-2xl font-black text-[11px] tracking-widest shadow-lg shadow-violet-100 active:scale-95 transition-all uppercase"
                >
                  TERIMA ORDER
                </button>
                <button className="flex-1 border-2 border-slate-100 text-slate-400 py-3.5 rounded-2xl font-black text-[11px] tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all uppercase">
                  TOLAK
                </button>
              </div>
            )}
            
            {order.status === 'ACCEPTED' && (
                <div className="absolute inset-0 bg-violet-600/5 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-[10px] font-black text-violet-600 animate-bounce uppercase tracking-widest">Memproses...</div>
                </div>
            )}
          </div>
        ))}

        {activeOrders.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100 shadow-sm space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                   <Package size={32} />
                </div>
                <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Dapur Sedang Kosong</p>
            </div>
        )}
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Bulan Ini');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const periods = [
    { label: 'Hari Ini', id: 'today' },
    { label: 'Kemarin', id: 'yesterday' },
    { label: 'Minggu Ini', id: 'this_week' },
    { label: 'Bulan Ini', id: 'this_month' },
    { label: 'Tahun Ini', id: 'this_year' },
    { label: 'Tahun Sebelumnya', id: 'last_year' }
  ];

  const [verificationQueue, setVerificationQueue] = useState<VerificationItem[]>([
    { 
      id: 'V-001', 
      name: 'Andi Driver', 
      role: 'Mitra Driver', 
      date: '2 mnt lalu', 
      docs: [
        { type: 'KTP', url: 'https://picsum.photos/seed/ktp1/800/500' },
        { type: 'SIM', url: 'https://picsum.photos/seed/sim1/800/500' },
        { type: 'STNK', url: 'https://picsum.photos/seed/stnk1/800/500' }
      ], 
      status: 'PENDING' 
    },
    { 
      id: 'V-002', 
      name: 'Kopi Kenangan', 
      role: 'Mitra Toko', 
      date: '1 jam lalu', 
      docs: [
        { type: 'SIUP', url: 'https://picsum.photos/seed/siup1/800/500' },
        { type: 'Identitas Pemilik', url: 'https://picsum.photos/seed/id1/800/500' }
      ], 
      status: 'PENDING' 
    }
  ]);

  const [selectedReview, setSelectedReview] = useState<VerificationItem | null>(null);

  // Simulasi data berubah berdasarkan filter
  const getRevenue = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': return 'Rp 85.4jt';
      case 'Kemarin': return 'Rp 142.1jt';
      case 'Minggu Ini': return 'Rp 842.5jt';
      case 'Tahun Ini': return 'Rp 14.8M';
      case 'Tahun Sebelumnya': return 'Rp 12.2M';
      default: return 'Rp 4.2M';
    }
  };

  const getGrowth = () => {
    switch(selectedPeriod) {
      case 'Hari Ini': return '+5.2%';
      case 'Tahun Ini': return '+42.8%';
      case 'Tahun Sebelumnya': return '-2.4%';
      default: return '+24%';
    }
  };

  return (
    <div className="px-5 py-6 space-y-7 animate-fade-up min-h-screen pb-32">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Admin</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control Panel v2.0</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
           <ShieldCheck size={24} />
        </div>
      </div>

      {/* Modern Dropdown Filter */}
      <div className="space-y-3 relative">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-violet-600" />
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Filter Statistik</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border-2 border-slate-100 rounded-[24px] px-6 py-4 flex items-center justify-between shadow-sm hover:border-violet-200 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
               <CalendarDays size={18} className="text-violet-600" />
               <span className="text-xs font-black text-slate-700 tracking-tight">{selectedPeriod}</span>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu (Scroll Down) */}
          {isFilterOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[32px] border border-slate-100 shadow-2xl z-[110] overflow-hidden animate-in slide-in-from-top-4 duration-300">
               <div className="p-2 space-y-1">
                  {periods.map(period => (
                    <button
                      key={period.id}
                      onClick={() => {
                        setSelectedPeriod(period.label);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all ${
                        selectedPeriod === period.label 
                        ? 'bg-violet-50 text-violet-700' 
                        : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">{period.label}</span>
                      {selectedPeriod === period.label && <Check size={16} className="text-violet-600" />}
                    </button>
                  ))}
               </div>
            </div>
          )}
          
          {/* Backdrop to close dropdown */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 z-[105]" 
              onClick={() => setIsFilterOpen(false)}
            ></div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-violet-200 transition-colors">
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
             <TrendingUp size={40} className="text-violet-600" />
           </div>
           <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Revenue</span>
           <p className="text-2xl font-black text-slate-800 tracking-tighter transition-all">{getRevenue()}</p>
           <div className={`mt-3 flex items-center gap-1 text-[9px] font-black ${getGrowth().startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
             <TrendingUp size={10} className={getGrowth().startsWith('-') ? 'rotate-180' : ''} /> {getGrowth()} {selectedPeriod === 'Hari Ini' ? 'vs Kemarin' : 'bln ini'}
           </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
             <Users size={40} className="text-blue-600" />
           </div>
           <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Users</span>
           <p className="text-2xl font-black text-slate-800 tracking-tighter">24.5k</p>
           <div className="mt-3 flex items-center gap-1 text-[9px] font-black text-blue-600">
             <Info size={10} /> 120 pndftr baru
           </div>
        </div>
      </div>

      <div className="space-y-5">
         <div className="flex justify-between items-center px-1">
            <h3 className="font-black text-slate-800 tracking-tight">Persetujuan Mitra</h3>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-xl text-[9px] font-black tracking-widest uppercase">
              {verificationQueue.length} PENDING
            </span>
         </div>
         
         <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
            {verificationQueue.map((item, idx) => (
              <div key={item.id} className={`p-6 flex items-center justify-between ${idx !== verificationQueue.length - 1 ? 'border-b border-slate-50' : ''} hover:bg-slate-50 transition-all cursor-pointer group`}>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-violet-50 group-hover:text-violet-500 transition-all shadow-inner">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 group-hover:text-violet-600 transition-colors">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.role} • {item.date}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setSelectedReview(item)}
                  className="bg-slate-900 text-white text-[10px] font-black px-5 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all tracking-widest uppercase"
                 >
                   Tinjau
                 </button>
              </div>
            ))}
            
            {verificationQueue.length === 0 && (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-emerald-100" />
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Antrean bersih!</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

// Interface needs to be consistent
interface VerificationItem {
  id: string;
  name: string;
  role: string;
  date: string;
  docs: { type: string; url: string }[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
