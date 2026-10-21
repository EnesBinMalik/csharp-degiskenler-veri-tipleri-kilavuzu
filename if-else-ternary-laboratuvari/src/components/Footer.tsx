import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReport }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-12 px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
            <span className="w-2 h-2 bg-cyan-400 rounded-sm"></span>
            <span>C# If-Else ve Ternary If Laboratuvarı</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Ödevi Hazırlayan & Kodlayan: <strong className="text-slate-200">Enes Öztürk</strong>
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            Algoritma ve Programlama Dersi · C# .NET Standartları
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#odev-ornegi" className="hover:text-cyan-400 transition-colors">
            Ödev Örneği
          </a>
          <a href="#karsilastirma" className="hover:text-cyan-400 transition-colors">
            Karşılaştırma
          </a>
          <a href="#akis-semasi" className="hover:text-cyan-400 transition-colors">
            Akış Şeması
          </a>
          <button
            onClick={onOpenReport}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Çalışma Özeti
          </button>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Yukarı Çık</span>
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-[11px] text-slate-500">
        © 2026 Enes Öztürk. Tüm hakları saklıdır. Resmi veya onaylı bir belge değildir.
      </div>
    </footer>
  );
};
