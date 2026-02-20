import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Plus, ArrowUpRight, ArrowDownLeft, 
  QrCode, History, ChevronRight, Search, X,
  ArrowLeftRight, Wallet as WalletIcon, ShieldCheck,
  CheckCircle2, Info, Landmark, Smartphone, ArrowRight
} from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'IN' | 'OUT';
  date: string;
  category: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Top Up via BCA', amount: 500000, type: 'IN', date: 'Hari ini, 10:20', category: 'Top Up' },
  { id: '2', title: 'Pembayaran Ojeg', amount: 12000, type: 'OUT', date: 'Hari ini, 08:45', category: 'Transportasi' },
  { id: '3', title: 'Makan Siang - Bakso Solo', amount: 25000, type: 'OUT', date: 'Kemarin, 13:15', category: 'Makanan' },
  { id: '4', title: 'Transfer ke Budi', amount: 150000, type: 'OUT', date: '12 Mei 2024', category: 'Transfer' },
  { id: '5', title: 'Refund Pembatalan Order', amount: 45000, type: 'IN', date: '10 Mei 2024', category: 'Refund' },
];

interface WalletProps {
  initialAction?: 'topup' | 'transfer' | null;
  onActionHandled?: () => void;
}

const Wallet: React.FC<WalletProps> = ({ initialAction, onActionHandled }) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Masuk' | 'Keluar'>('Semua');
  const [showQR, setShowQR] = useState(false);
  const [activeModal, setActiveModal] = useState<'topup' | 'transfer' | null>(null);
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'SUCCESS'>('INPUT');
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (initialAction) {
      setActiveModal(initialAction);
      if (onActionHandled) onActionHandled();
    }
  }, [initialAction]);

  const handleAction = () => {
    setStep('PROCESSING');
    setTimeout(() => {
      setStep('SUCCESS');
    }, 2000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setStep('INPUT');
    setAmount('');
    setDestination('');
  };

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
    if (activeFilter === 'Masuk') return t.type === 'IN';
    if (activeFilter === 'Keluar') return t.type === 'OUT';
    return true;
  });

  if (showQR) {
    return (
      <div className="flex flex-col h-full bg-black text-white p-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-12">
          <button onClick={() => setShowQR(false)} className="p-2 bg-white/10 rounded-full">
            <ChevronRight className="rotate-180" size={24} />
          </button>
          <h2 className="font-bold">Pindai QRIS</h2>
          <div className="w-10"></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 border-2 border-violet-500 rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-violet-500/10 flex items-center justify-center">
               <QrCode size={120} className="text-violet-500 opacity-20" />
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.8)] animate-[scan_2s_infinite]"></div>
          </div>
          <p className="text-center text-slate-400 text-sm max-w-[200px]">Arahkan kamera ke kode QRIS merchant untuk membayar</p>
        </div>
        <div className="mt-auto flex justify-around p-8">
          <button className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Plus size={20} /></div><span className="text-[10px] font-bold">Upload</span></button>
          <button className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><ShieldCheck size={20} /></div><span className="text-[10px] font-bold">Kode Bayar</span></button>
        </div>
        <style>{`@keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }`}</style>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dompet NusaPay</h1>
        <div className="flex gap-2">
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 shadow-sm"><Search size={20} /></button>
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 shadow-sm"><History size={20} /></button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-7 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <WalletIcon size={18} className="text-violet-400" />
              </div>
              <span className="text-xs font-black tracking-widest uppercase opacity-70">Saldo Utama</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg text-[9px] font-black border border-emerald-500/20">
               <ShieldCheck size={10} /> TERPROTEKSI
            </div>
          </div>
          <h2 className="text-4xl font-black mb-10 tracking-tighter">Rp 1.250.000</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => setShowQR(true)} className="flex flex-col items-center gap-3 group/btn">
              <div className="w-14 h-14 bg-white/10 group-hover/btn:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all shadow-lg border border-white/5">
                <QrCode size={24} />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">Bayar</span>
            </button>
            <button onClick={() => setActiveModal('topup')} className="flex flex-col items-center gap-3 group/btn">
              <div className="w-14 h-14 bg-white/10 group-hover/btn:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all shadow-lg border border-white/5">
                <Plus size={24} />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">Isi Saldo</span>
            </button>
            <button onClick={() => setActiveModal('transfer')} className="flex flex-col items-center gap-3 group/btn">
              <div className="w-14 h-14 bg-white/10 group-hover/btn:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all shadow-lg border border-white/5">
                <ArrowLeftRight size={24} />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">Transfer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5 pb-24">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-black text-slate-800 tracking-tight">Aktivitas Terbaru</h3>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['Semua', 'Masuk', 'Keluar'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                  activeFilter === f ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 group active:scale-[0.98] transition-all">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                tx.type === 'IN' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {tx.type === 'IN' ? <ArrowDownLeft size={28} /> : <ArrowUpRight size={28} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-800 tracking-tight">{tx.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{tx.date} • {tx.category}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-black tracking-tighter ${
                  tx.type === 'IN' ? 'text-emerald-600' : 'text-slate-800'
                }`}>
                  {tx.type === 'IN' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                </span>
                <ChevronRight size={14} className="text-slate-300 ml-auto mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Modals (Top Up / Transfer) */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-end justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            {step === 'INPUT' && (
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                    {activeModal === 'topup' ? 'Isi Saldo NusaPay' : 'Transfer Saldo'}
                  </h2>
                  <button onClick={closeModal} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
                </div>

                {activeModal === 'transfer' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nomor Tujuan</label>
                    <div className="relative">
                       <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                       <input 
                         type="tel"
                         placeholder="Masukkan nomor HP tujuan"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-black text-sm focus:ring-4 focus:ring-violet-500/10 outline-none transition-all"
                         value={destination}
                         onChange={(e) => setDestination(e.target.value)}
                       />
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-7 rounded-[32px] border border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Nominal {activeModal === 'topup' ? 'Pengisian' : 'Transfer'}</span>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-300">Rp</span>
                      <input 
                        type="number"
                        placeholder="0"
                        className="bg-transparent text-3xl font-black text-slate-800 w-full outline-none tracking-tighter"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Metode {activeModal === 'topup' ? 'Pembayaran' : 'Sumber Dana'}</h3>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'BCA', label: 'BCA Account', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { id: 'NUSA', label: 'NusaPay Wallet', icon: WalletIcon, color: 'text-violet-600', bg: 'bg-violet-50' },
                      ].map(m => (
                        <button key={m.id} className="p-5 rounded-[28px] border-2 border-slate-50 bg-white flex flex-col items-center gap-3">
                           <div className={`${m.bg} ${m.color} p-3 rounded-2xl`}><m.icon size={24} /></div>
                           <span className="text-[11px] font-black text-slate-800">{m.label}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={handleAction}
                  disabled={!amount}
                  className="w-full bg-slate-900 disabled:opacity-30 text-white py-5 rounded-[28px] font-black text-sm tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  KONFIRMASI {activeModal.toUpperCase()} <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 'PROCESSING' && (
              <div className="p-20 text-center space-y-8 flex flex-col items-center">
                <div className="relative">
                   <div className="w-24 h-24 border-8 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center"><Info size={32} className="text-violet-600" /></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Memproses Transaksi</h3>
                  <p className="text-xs text-slate-400 font-bold">Harap tunggu sebentar...</p>
                </div>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="p-10 text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto shadow-inner rotate-12">
                   <CheckCircle2 size={48} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Transaksi Berhasil!</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed px-4">
                    {activeModal === 'topup' ? 'Saldo berhasil ditambahkan ke dompet Anda.' : `Saldo berhasil dikirim ke ${destination || 'penerima'}.`}
                  </p>
                </div>
                <div className="bg-slate-50 py-3 rounded-2xl text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">
                  Ref: TX-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </div>
                <button 
                  onClick={closeModal}
                  className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black text-xs tracking-widest uppercase shadow-lg active:scale-95 transition-all"
                >
                  KEMBALI
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;