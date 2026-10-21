import React from 'react';
import { FileText, Printer } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReport }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors">
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span>
          <span>C# Karar Yapıları</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#odev-ornegi" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Ödev Örneği
          </a>
          <a href="#karsilastirma" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            If-Else vs Ternary
          </a>
          <a href="#akis-semasi" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Akış Şeması
          </a>
          <a href="#simulator" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Canlı Laboratuvar
          </a>
          <a href="#quiz" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Test
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Ödev Raporu (Enes Öztürk)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
