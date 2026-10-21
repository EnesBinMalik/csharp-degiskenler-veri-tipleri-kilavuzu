import React from 'react';
import { Code, Terminal, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Signature stamp */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold tracking-tight text-base">
            <span className="w-2 h-2 rounded bg-cyan-400"></span>
            <span>Enes Öztürk İmzalı Proje</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            C# metotları, parametre aktarımı, kapsam ve ref parametreleri için etkileşimli rehber.
          </p>
        </div>

        {/* Quick nav links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <button onClick={() => onScrollTo('hero')} className="hover:text-white transition-colors cursor-pointer">
            Giriş
          </button>
          <button onClick={() => onScrollTo('teori')} className="hover:text-white transition-colors cursor-pointer">
            Metot Nedir?
          </button>
          <button onClick={() => onScrollTo('sozdizimi')} className="hover:text-white transition-colors cursor-pointer">
            Söz Dizimi
          </button>
          <button onClick={() => onScrollTo('deger-ref')} className="hover:text-white transition-colors cursor-pointer">
            Değer vs Ref
          </button>
          <button onClick={() => onScrollTo('simulator')} className="hover:text-white transition-colors cursor-pointer">
            Simülatör
          </button>
          <button onClick={() => onScrollTo('test')} className="hover:text-white transition-colors cursor-pointer">
            Test
          </button>
        </div>

        {/* Quiet copyright */}
        <div className="text-xs text-slate-500 font-mono text-center md:text-right">
          © {new Date().getFullYear()} · Hazırlayan: Enes Öztürk
        </div>
      </div>
    </footer>
  );
};
