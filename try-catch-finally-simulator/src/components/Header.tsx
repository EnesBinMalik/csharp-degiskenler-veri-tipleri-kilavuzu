import React from 'react';
import { Terminal, ShieldAlert, Cpu, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'logic-errors' | 'bug-hunter' | 'best-practices';
  onTabChange: (tab: 'simulator' | 'logic-errors' | 'bug-hunter' | 'best-practices') => void;
  onOpenManifesto: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenManifesto }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Signature */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-mono font-bold text-lg">
            {'<T>'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Try-Catch-Finally <span className="text-slate-400 font-normal">ve</span> Mantıksal Hatalar
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Hazırlayan: Enes Öztürk
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Hata Yönetimi & Savunmacı Kodlama Simülatörü</span>
              <span className="hidden md:inline text-slate-600">·</span>
              <button 
                onClick={onOpenManifesto}
                className="hidden md:inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
              >
                Yazar Notu & Manifestosu
              </button>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
          <button
            onClick={() => onTabChange('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>İnteraktif Simülatör</span>
          </button>

          <button
            onClick={() => onTabChange('logic-errors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
              activeTab === 'logic-errors'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Mantıksal Hatalar</span>
          </button>

          <button
            onClick={() => onTabChange('bug-hunter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
              activeTab === 'bug-hunter'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Açık Avcısı (Meydan Okuma)</span>
          </button>

          <button
            onClick={() => onTabChange('best-practices')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
              activeTab === 'best-practices'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Defensive Rehber</span>
          </button>

          <button
            onClick={onOpenManifesto}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-indigo-400 hover:bg-slate-800 font-medium shrink-0"
          >
            <span>Not</span>
          </button>
        </div>
      </div>
    </header>
  );
};
