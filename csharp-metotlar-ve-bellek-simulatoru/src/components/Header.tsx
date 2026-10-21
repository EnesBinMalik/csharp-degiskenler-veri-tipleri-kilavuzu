import React from 'react';

interface HeaderProps {
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onScrollTo('hero')}
          className="text-left font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-lg flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block"></span>
          <span>Enes Öztürk · Metot Atlası</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onScrollTo('teori')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Metot Nedir?
          </button>
          <button
            onClick={() => onScrollTo('sozdizimi')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Söz Dizimi
          </button>
          <button
            onClick={() => onScrollTo('deger-ref')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Değer vs Ref
          </button>
          <button
            onClick={() => onScrollTo('simulator')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Bellek Simülatörü
          </button>
          <button
            onClick={() => onScrollTo('test')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Bilgi Testi
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onScrollTo('simulator')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Simülasyonu Çalıştır
          </button>
        </div>
      </div>
    </header>
  );
};
