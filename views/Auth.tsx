
import React, { useState } from 'react';
import { 
  User, Bike, Store, ShieldAlert, ArrowRight, ChevronLeft, 
  Smartphone, Mail, Lock, CheckCircle2, Upload, MapPin, Camera,
  FileText, ArrowLeft
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole, data: any) => void;
}

type AuthMode = 'landing' | 'login' | 'register-select' | 'register-form' | 'success';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    vehicleType: 'Motor',
    plateNumber: '',
    storeName: '',
    storeCategory: 'Makanan',
    address: '',
    staffKey: ''
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode('register-form');
    setStep(1);
  };

  const handleBack = () => {
    if (mode === 'register-form' && step > 1) {
      setStep(step - 1);
    } else if (mode === 'register-form') {
      setMode('register-select');
    } else {
      setMode('landing');
    }
  };

  const renderHeader = (title: string, subtitle: string) => (
    <div className="mb-8">
      <button 
        onClick={handleBack}
        className="mb-4 p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1 text-slate-500 font-bold text-xs"
      >
        <ChevronLeft size={20} /> KEMBALI
      </button>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>
    </div>
  );

  const Landing = () => (
    <div className="h-full flex flex-col justify-between py-12 px-6 animate-in fade-in duration-500">
      <div className="mt-10">
        <div className="w-20 h-20 bg-violet-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-violet-100 mb-8 transform -rotate-6">
          <span className="text-white text-4xl font-black">N</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight">
          Semua yang kamu butuh,<br />
          <span className="text-violet-600 underline decoration-violet-100 underline-offset-8">Ada di satu aplikasi.</span>
        </h1>
        <p className="text-slate-500 mt-6 text-lg font-medium">
          Bergabung dengan NusaApp dan nikmati kemudahan masa depan.
        </p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => setMode('login')}
          className="w-full bg-violet-600 text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-violet-100 active:scale-95 transition-all"
        >
          Masuk Sekarang
        </button>
        <button 
          onClick={() => setMode('register-select')}
          className="w-full bg-white text-slate-700 py-5 rounded-3xl font-bold text-lg border-2 border-slate-100 active:scale-95 transition-all"
        >
          Daftar Akun Baru
        </button>
      </div>
    </div>
  );

  const RegisterSelect = () => (
    <div className="py-12 px-6 animate-in slide-in-from-bottom-8 duration-500">
      {renderHeader("Mari Bergabung", "Bagaimana Anda ingin menggunakan NusaApp?")}
      
      <div className="grid gap-4">
        {[
          { id: UserRole.USER, label: 'Sebagai Pelanggan', icon: User, desc: 'Pesan kendaraan, belanja, dan bayar praktis.', color: 'violet' },
          { id: UserRole.DRIVER, label: 'Sebagai Mitra Driver', icon: Bike, desc: 'Dapatkan penghasilan dengan waktu fleksibel.', color: 'blue' },
          { id: UserRole.MERCHANT, label: 'Sebagai Mitra Toko', icon: Store, desc: 'Kembangkan bisnismu bersama kami.', color: 'orange' },
          { id: UserRole.ADMIN, label: 'Sebagai Staf', icon: ShieldAlert, desc: 'Akses administrasi internal.', color: 'purple' },
        ].map((role) => (
          <button 
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className="flex items-center gap-5 p-6 bg-white border-2 border-slate-50 rounded-[32px] hover:border-violet-500 hover:shadow-xl hover:shadow-violet-50 transition-all group text-left"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-600 group-hover:bg-violet-600 group-hover:text-white transition-colors`}>
              <role.icon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{role.label}</h3>
              <p className="text-xs text-slate-500 font-medium">{role.desc}</p>
            </div>
            <ArrowRight size={20} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );

  const RegisterForm = () => {
    const isLastStep = (selectedRole === UserRole.USER && step === 1) || 
                      (selectedRole === UserRole.DRIVER && step === 2) || 
                      (selectedRole === UserRole.MERCHANT && step === 2) ||
                      (selectedRole === UserRole.ADMIN && step === 1);

    const totalSteps = (selectedRole === UserRole.DRIVER || selectedRole === UserRole.MERCHANT) ? 2 : 1;

    const isStep1Valid = formData.name.trim() !== '' && formData.phone.trim() !== '' && 
                        (selectedRole !== UserRole.ADMIN || formData.staffKey.trim() !== '');
    
    const isStep2Valid = selectedRole === UserRole.DRIVER ? formData.plateNumber.trim() !== '' : 
                        selectedRole === UserRole.MERCHANT ? formData.storeName.trim() !== '' && formData.address.trim() !== '' : true;

    const canProceed = step === 1 ? isStep1Valid : isStep2Valid;

    const handleSubmit = () => {
      if (isLastStep) {
        setMode('success');
      } else {
        setStep(step + 1);
      }
    };

    return (
      <div className="py-12 px-6 animate-in slide-in-from-right-8 duration-500">
        {renderHeader(
          `Daftar ${selectedRole === UserRole.USER ? 'Pelanggan' : selectedRole === UserRole.DRIVER ? 'Driver' : selectedRole === UserRole.MERCHANT ? 'Mitra Toko' : 'Staf'}`, 
          `Langkah ${step} dari ${totalSteps}`
        )}

        {totalSteps > 1 && (
          <div className="flex gap-2 mb-8">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step > i ? 'bg-violet-600' : 'bg-slate-100'}`}></div>
            ))}
          </div>
        )}
        
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                    placeholder="Masukkan nama sesuai KTP"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Handphone</label>
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                  <input 
                    type="tel"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                    placeholder="Contoh: 0812345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                  <input 
                    type="email"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {selectedRole === UserRole.ADMIN && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kunci Rahasia Staf</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                    <input 
                      type="password"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                      placeholder="Masukkan kode otorisasi"
                      value={formData.staffKey}
                      onChange={(e) => setFormData({...formData, staffKey: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && selectedRole === UserRole.DRIVER && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Jenis Kendaraan</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Motor', 'Mobil', 'Box', 'XL'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setFormData({...formData, vehicleType: type})}
                      className={`py-3 rounded-2xl font-bold text-xs border-2 transition-all ${
                        formData.vehicleType === type ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-500 border-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Plat Kendaraan</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all uppercase"
                  placeholder="B 1234 ABC"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dokumen Pendukung</label>
                <div className="grid grid-cols-2 gap-4">
                   <button className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-violet-300 hover:text-violet-500 transition-all">
                      <Camera size={24} />
                      <span className="text-[10px] font-black uppercase tracking-tight">Foto KTP</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-violet-300 hover:text-violet-500 transition-all">
                      <FileText size={24} />
                      <span className="text-[10px] font-black uppercase tracking-tight">Foto SIM</span>
                   </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && selectedRole === UserRole.MERCHANT && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Toko/Bisnis</label>
                <div className="relative group">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                    placeholder="Contoh: Kopi Kenangan"
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Alamat Bisnis Lengkap</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                    placeholder="Cari gedung atau jalan"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Bisnis</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                   {['Makanan', 'Elektronik', 'Swalayan', 'Apotek', 'Pakaian'].map(c => (
                     <button 
                       key={c}
                       onClick={() => setFormData({...formData, storeCategory: c})}
                       className={`px-6 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
                         formData.storeCategory === c ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
                       }`}
                     >
                       {c}
                     </button>
                   ))}
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={handleSubmit}
            disabled={!canProceed}
            className="w-full bg-violet-600 disabled:bg-slate-200 text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-violet-100 active:scale-95 transition-all mt-6 flex items-center justify-center gap-2"
          >
            {isLastStep ? 'Selesaikan Pendaftaran' : 'Langkah Selanjutnya'} 
            {!isLastStep && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    );
  };

  const Success = () => (
    <div className="h-full flex flex-col items-center justify-center py-12 px-10 text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-violet-100 text-violet-600 rounded-[32px] flex items-center justify-center mb-8 animate-bounce">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Pendaftaran Berhasil!</h1>
      <p className="text-slate-500 font-medium mb-10 leading-relaxed">
        Selamat datang di keluarga besar NusaApp. Akun {formData.name} telah siap digunakan.
      </p>
      <button 
        onClick={() => onLogin(selectedRole, formData)}
        className="w-full bg-violet-600 text-white py-5 rounded-3xl font-bold text-lg shadow-lg active:scale-95 transition-all"
      >
        Mulai Gunakan Aplikasi
      </button>
    </div>
  );

  const Login = () => {
    const [loginRole, setLoginRole] = useState<UserRole>(UserRole.USER);
    
    return (
      <div className="py-12 px-6 animate-in slide-in-from-left-8 duration-500">
        {renderHeader("Selamat Datang Kembali", "Silakan masuk ke akun Anda")}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pilih Role Akses</label>
            <div className="grid grid-cols-2 gap-2">
               {[
                 { id: UserRole.USER, label: 'User' },
                 { id: UserRole.DRIVER, label: 'Driver' },
                 { id: UserRole.MERCHANT, label: 'Merchant' },
                 { id: UserRole.ADMIN, label: 'Admin' }
               ].map(r => (
                 <button 
                   key={r.id}
                   onClick={() => setLoginRole(r.id)}
                   className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                     loginRole === r.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-50'
                   }`}
                 >
                   {r.label}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nomor HP atau Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                placeholder="0812 atau email@domain.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kata Sandi</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
              <input 
                type="password"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button 
            onClick={() => onLogin(loginRole, {})}
            className="w-full bg-violet-600 text-white py-5 rounded-3xl font-bold text-lg shadow-lg active:scale-95 transition-all mt-4"
          >
            Masuk
          </button>
          <p className="text-center text-sm text-slate-500 font-medium">
            Belum punya akun? <span onClick={() => setMode('register-select')} className="text-violet-600 font-bold cursor-pointer underline underline-offset-4">Daftar</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white overflow-y-auto no-scrollbar">
      {mode === 'landing' && <Landing />}
      {mode === 'register-select' && <RegisterSelect />}
      {mode === 'register-form' && <RegisterForm />}
      {mode === 'login' && <Login />}
      {mode === 'success' && <Success />}
    </div>
  );
};

export default Auth;
