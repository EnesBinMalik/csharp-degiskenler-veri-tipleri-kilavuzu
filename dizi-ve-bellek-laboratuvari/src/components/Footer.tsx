import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Author signature & copyright */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-white tracking-tight">
            Dizi ve Bellek Laboratuvarı
          </div>
          <p className="text-slate-400">
            Enes Öztürk tarafından hazırlanmış dizi ve algoritma eğitim modülü.
          </p>
          <p className="text-slate-500">© 2026 Enes Öztürk. Tüm hakları saklıdır.</p>
        </div>

        {/* Center: Quiet links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <button
            onClick={() => onNavigate('bellek')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Bellek Mimarisi
          </button>
          <button
            onClick={() => onNavigate('tanimlama')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Dizi Tanımlama
          </button>
          <button
            onClick={() => onNavigate('erisim')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            İndeks & Erişim
          </button>
          <button
            onClick={() => onNavigate('donguler')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Döngü Simülatörü
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Test
          </button>
        </div>

        {/* Right: Signature stamp */}
        <div className="text-right text-slate-500 font-mono text-[11px]">
          İmza: <span className="text-sky-400 font-semibold font-sans">Enes Öztürk</span>
        </div>
      </div>
    </footer>
  );
};
