"use client";

import { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';

export const MobileConnect = () => {
  const [ip, setIp] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Tenta buscar o IP apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
        fetch('/api/ip')
        .then(res => res.json())
        .then(data => {
            if (data.ip && data.ip !== 'localhost') {
                setIp(data.ip);
            }
        })
        .catch(err => console.error('Erro ao obter IP local:', err));
    }
  }, []);

  if (!ip) return null;

  const url = `http://${ip}:3000`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-50 bg-zinc-900/80 dark:bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:scale-110 transition-all shadow-lg group"
          title="Testar no Mobile"
        >
          <Smartphone size={24} className="group-hover:animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-xl shadow-2xl max-w-sm w-full flex flex-col items-center relative border border-white/10 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold mb-2 font-serif">Teste no Mobile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
              Escaneie para acessar o localhost via Wi-Fi.
            </p>
            
            <div className="bg-white p-2 rounded-lg border-2 border-black/10 dark:border-white/10 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeUrl} alt="QR Code para localhost" width={200} height={200} className="rounded-md" />
            </div>
            
            <p className="mt-4 font-mono text-xs bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded text-center break-all select-all">
              {url}
            </p>
            
            <p className="text-[10px] text-gray-400 mt-4 text-center max-w-[200px]">
              Certifique-se de que seu celular e PC estão na mesma rede Wi-Fi.
            </p>
          </div>
        </div>
      )}
    </>
  );
};