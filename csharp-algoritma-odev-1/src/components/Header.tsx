import React from 'react';
import { Download } from 'lucide-react';
import { CSHARP_FULL_CODE } from '../data/csharpCode';

interface HeaderProps {
  activeTab: 'terminal' | 'visualizer' | 'code' | 'notes';
  setActiveTab: (tab: 'terminal' | 'visualizer' | 'code' | 'notes') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const handleDownload = () => {
    const blob = new Blob([CSHARP_FULL_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Program.cs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand title wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
          C#
        </div>
        <span className="text-base font-semibold tracking-tight text-slate-100 whitespace-nowrap">
          Ödev 1 · Enes Öztürk
        </span>
      </div>

      {/* Zone 2: Single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'terminal' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Terminal Konsol
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'visualizer' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Görsel Analizör
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'code' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          C# Kaynak Kodu
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'notes' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Algoritma Analizi
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          title="Tam C# Program.cs kodunu indir"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Program.cs İndir</span>
        </button>
      </div>
    </header>
  );
};
