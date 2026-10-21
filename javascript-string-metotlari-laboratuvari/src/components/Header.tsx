import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lab' | 'inspector' | 'pipeline' | 'comparison' | 'challenges';
  setActiveTab: (tab: 'lab' | 'inspector' | 'pipeline' | 'comparison' | 'challenges') => void;
  onOpenCheatSheet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCheatSheet,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('lab')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
              <span className="text-indigo-400 font-mono">&lt;str&gt;</span>
              <span>StringCraft</span>
              <span className="text-xs font-normal text-slate-400 ml-1">· Enes Öztürk</span>
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('lab')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'lab' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Metot Laboratuvarı
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'inspector' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Karakter & İndeks
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'pipeline' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Zincirleme Hattı
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'comparison' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Metot Karşılaştırma
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'challenges' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Meydan Okumalar
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Hızlı Referans Kartı</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center gap-4 py-2 overflow-x-auto text-xs border-t border-slate-900 scrollbar-none">
          <button
            onClick={() => setActiveTab('lab')}
            className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'lab' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Metotlar
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'inspector' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            İndeks İzleyici
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'pipeline' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Zincirleme
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'comparison' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Karşılaştırma
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'challenges' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Meydan Okuma
          </button>
        </div>
      </div>
    </header>
  );
};
