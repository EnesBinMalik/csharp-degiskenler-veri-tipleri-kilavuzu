import React from 'react';
import { ActiveTab } from '../types';
import { Code2, Send } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand Wordmark (Single line, no clutter) */}
      <div
        onClick={() => setActiveTab('overloading')}
        className="flex items-center gap-2.5 cursor-pointer text-slate-100 font-bold tracking-tight text-base whitespace-nowrap shrink-0 select-none group"
      >
        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
          <Code2 className="w-4 h-4" />
        </div>
        <span>C# Metot &amp; Parametre Laboratuvarı</span>
      </div>

      {/* Zone 2: 4-5 Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('overloading')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'overloading'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'hover:text-slate-100 text-slate-400'
          }`}
        >
          Metot Overloading
        </button>
        <button
          onClick={() => setActiveTab('out-ref')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'out-ref'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'hover:text-slate-100 text-slate-400'
          }`}
        >
          Out &amp; Ref Aktarımı
        </button>
        <button
          onClick={() => setActiveTab('signature-validator')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'signature-validator'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'hover:text-slate-100 text-slate-400'
          }`}
        >
          İmza Doğrulayıcı
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'console'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'hover:text-slate-100 text-slate-400'
          }`}
        >
          İnteraktif Konsol
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'quiz'
              ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
              : 'hover:text-slate-100 text-slate-400'
          }`}
        >
          Bilgi Sınavı
        </button>
      </nav>

      {/* Zone 3: Single Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('submission')}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-sky-400 rounded-lg hover:bg-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-sky-500/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ödev Teslimi (Enes Öztürk)</span>
        </button>
      </div>
    </header>
  );
};
