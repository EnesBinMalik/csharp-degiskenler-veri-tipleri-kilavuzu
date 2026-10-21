import React from 'react';
import { TabType } from '../types';
import { FileCode } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenCheatsheet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenCheatsheet
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">

          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              C#
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onTabChange('theory'); }}
              className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              Extension & Rekürsif Metotlar
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onTabChange('theory')}
              className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
                activeTab === 'theory'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Rehber & Teori
            </button>
            <button
              onClick={() => onTabChange('recursion')}
              className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
                activeTab === 'recursion'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Rekürsif Simülatör
            </button>
            <button
              onClick={() => onTabChange('extension')}
              className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
                activeTab === 'extension'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Extension Laboratuvarı
            </button>
            <button
              onClick={() => onTabChange('comparison')}
              className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
                activeTab === 'comparison'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Mimari Karşılaştırma
            </button>
            <button
              onClick={() => onTabChange('quiz')}
              className={`hover:text-white transition-colors whitespace-nowrap py-1 ${
                activeTab === 'quiz'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Sınav & Alıştırmalar
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCheatsheet}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Kod Şablonları</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-800/60 overflow-x-auto text-xs gap-3">
        <button
          onClick={() => onTabChange('theory')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'theory' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400'}`}
        >
          Rehber
        </button>
        <button
          onClick={() => onTabChange('recursion')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'recursion' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400'}`}
        >
          Rekürsif
        </button>
        <button
          onClick={() => onTabChange('extension')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'extension' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400'}`}
        >
          Extension
        </button>
        <button
          onClick={() => onTabChange('comparison')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'comparison' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400'}`}
        >
          Karşılaştırma
        </button>
        <button
          onClick={() => onTabChange('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'quiz' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400'}`}
        >
          Sınav
        </button>
      </div>
    </header>
  );
};
