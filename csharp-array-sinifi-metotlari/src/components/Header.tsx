import React from 'react';
import { Sparkles, Terminal, BookOpen, Award, Cpu, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'playground' | 'guide' | 'quiz' | 'architecture';
  setActiveTab: (tab: 'playground' | 'guide' | 'quiz' | 'architecture') => void;
  onResetToPromptExample: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onResetToPromptExample
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Logo & Signature */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg border border-cyan-400/30">
              C#
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                  System.Array Sınıfı & Metotları
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  .NET Core / C#
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  Enes Öztürk İmzasıyla
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-medium">El Emeği İnteraktif Simülatör</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'playground'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>İnteraktif Laboratuvar</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Metot Kılavuzu</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Quiz & Pratik</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Stack / Heap Mimarisi</span>
            </button>

            {/* Quick Reset to User Prompt button */}
            <button
              onClick={onResetToPromptExample}
              title="Örnek diziyi ({ 1, 3, 4, 9, 8, 7 }) geri yükle"
              className="ml-1 p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
