import React from 'react';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'lessons' | 'flowchart' | 'quiz';
  onSelectTab: (tab: 'simulator' | 'lessons' | 'flowchart' | 'quiz') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
            For & Kontrol Deyimleri
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('simulator')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Döngü Simülatörü
          </button>
          <button
            onClick={() => onSelectTab('lessons')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'lessons'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Konu Anlatımı
          </button>
          <button
            onClick={() => onSelectTab('flowchart')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Akış Şeması
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Alıştırma & Test
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('simulator')}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm whitespace-nowrap"
          >
            Simülatörü Başlat
          </button>
        </div>
      </div>
    </header>
  );
};
