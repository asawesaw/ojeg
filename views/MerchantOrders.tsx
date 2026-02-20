import React, { useState } from 'react';
import { 
  ShoppingBag, Clock, CheckCircle2, 
  XCircle, Package, MapPin, AlertCircle 
} from 'lucide-react';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'NEW' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  time: string;
  address: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8821',
    customerName: 'Budi Santoso',
    items: [
      { name: 'Original Burger', qty: 2, price: 35000 },
      { name: 'Iced Coffee Latte', qty: 1, price: 22000 }
    ],
    total: 92000,
    status: 'NEW',
    time: '5 menit lalu',
    address: 'Apartemen Sudirman, Tower A No. 12'
  },
  {
    id: 'ORD-8819',
    customerName: 'Siti Aminah',
    items: [
      { name: 'Nasi Goreng Spesial', qty: 1, price: 28000 }
    ],
    total: 28000,
    status: 'PROCESSING',
    time: '20 menit lalu',
    address: 'Jl. Melati No. 45, Tebet'
  },
  {
    id: 'ORD-8810',
    customerName: 'Andi Wijaya',
    items: [
      { name: 'Wireless Earbuds', qty: 1, price: 250000 }
    ],
    total: 250000,
    status: 'COMPLETED',
    time: 'Hari ini, 10:30',
    address: 'Perumahan Gading Serpong, Blok B2'
  }
];

const MerchantOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'NEW' | 'PROCESSING' | 'COMPLETED'>('NEW');

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const removeOrder = (id: string) => {
    if (confirm('Yakin ingin menolak pesanan ini?')) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  const filteredOrders = orders.filter(o => o.status === activeTab);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW': return { label: 'Pesanan Baru', color: 'bg-orange-100 text-orange-700' };
      case 'PROCESSING': return { label: 'Sedang Diproses', color: 'bg-blue-100 text-blue-700' };
      case 'COMPLETED': return { label: 'Selesai', color: 'bg-violet-100 text-violet-700' };
      default: return { label: 'Status', color: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Pesanan Toko</h1>
        <div className="bg-violet-100 p-2 rounded-xl text-violet-700">
          <ShoppingBag size={20} />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'NEW', label: 'Masuk' },
          { id: 'PROCESSING', label: 'Diproses' },
          { id: 'COMPLETED', label: 'Selesai' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-violet-600 text-white shadow-md shadow-violet-100' 
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {tab.label} ({orders.filter(o => o.status === tab.id).length})
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-20">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider mb-1">Order ID: {order.id}</span>
                  <h3 className="font-bold text-slate-800">{order.customerName}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusLabel(order.status).color}`}>
                  {getStatusLabel(order.status).label}
                </div>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{item.qty}x {item.name}</span>
                    <span className="text-slate-800 font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <Clock size={12} />
                <span>Dipesan {order.time}</span>
                <span className="mx-1">•</span>
                <Package size={12} />
                <span>{order.items.length} Items</span>
              </div>

              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <MapPin size={16} />
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed flex-1 line-clamp-1 italic">
                    {order.address}
                 </p>
              </div>

              <div className="pt-2 flex gap-3">
                {order.status === 'NEW' && (
                  <>
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'PROCESSING')}
                      className="flex-1 bg-violet-600 text-white py-3 rounded-2xl font-bold text-xs shadow-lg shadow-violet-50 active:scale-95 transition-transform"
                    >
                      Terima Pesanan
                    </button>
                    <button 
                      onClick={() => removeOrder(order.id)}
                      className="px-4 border border-red-100 text-red-500 rounded-2xl hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  </>
                )}
                {order.status === 'PROCESSING' && (
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                    className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-xs active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <Package size={16} /> Siap Dikirim
                  </button>
                )}
                {order.status === 'COMPLETED' && (
                  <button className="w-full bg-slate-100 text-slate-500 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} className="text-violet-500" /> Selesai
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="py-24 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <AlertCircle size={40} />
             </div>
             <div className="space-y-1">
                <p className="text-slate-800 font-bold">Belum Ada Pesanan</p>
                <p className="text-slate-400 text-xs px-10">Pesanan yang masuk akan muncul di sini sesuai status yang dipilih.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantOrders;