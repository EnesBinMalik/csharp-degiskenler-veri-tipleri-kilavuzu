import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCurrentISO = () => {
    const iso = new Date().toISOString();
    navigator.clipboard.writeText(iso);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-amber-400 font-mono text-xl">⌘</span>
          <span>DateTime Metotlar</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeTab === 'catalog' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Metot Kataloğu
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeTab === 'sandbox' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Canlı Laboratuvar
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeTab === 'calculator' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Zaman Hesaplayıcı
          </button>
          <button
            onClick={() => setActiveTab('timezones')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeTab === 'timezones' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Dünya Saatleri
          </button>
          <button
            onClick={() => setActiveTab('crosslang')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeTab === 'crosslang' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Çoklu Dil & Rehber
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopyCurrentISO}
            title="Şu anki ISO-8601 tarihini panoya kopyala"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Anlık ISO Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
