import React from 'react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#genel-bakis"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('genel-bakis');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-400 transition-colors"
        >
          Dizi Laboratuvarı
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#bellek"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('bellek');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Bellek Mimarisi
          </a>
          <a
            href="#tanimlama"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('tanimlama');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Dizi Tanımlama
          </a>
          <a
            href="#erisim"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('erisim');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            İndeks & Erişim
          </a>
          <a
            href="#donguler"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('donguler');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Döngü Simülatörü
          </a>
          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('quiz');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Bilgi Sınavı
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('donguler')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 active:scale-95 rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            Simülatörü Başlat
          </button>
        </div>
      </div>
    </header>
  );
};
