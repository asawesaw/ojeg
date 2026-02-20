import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getSmartResponse } from '../services/geminiService';

const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const botMsg = await getSmartResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-72 h-96 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 mb-4 animate-in slide-in-from-bottom-5">
          <div className="bg-violet-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold text-sm">NusaBot</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Ada yang bisa NusaBot bantu?
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-sm ${
                  m.role === 'user' ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   </div>
                 </div>
               </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..." 
              className="flex-1 bg-slate-50 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-violet-500"
            />
            <button onClick={handleSend} className="bg-violet-600 text-white p-2 rounded-xl">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-violet-600 text-white p-4 rounded-full shadow-xl shadow-violet-200 active:scale-90 transition-transform"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingBot;