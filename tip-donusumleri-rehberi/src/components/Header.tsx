import React from 'react';
import {
  Code2,
  BookOpen,
  FlaskConical,
  Binary,
  Layers,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export type TabType = 'guide' | 'lab' | 'visualizer' | 'matrix' | 'quiz';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'guide' as TabType, label: 'Konu Anlatımı & Rehber', icon: BookOpen },
    { id: 'lab' as TabType, label: 'İnteraktif Laboratuvar', icon: FlaskConical },
    { id: 'visualizer' as TabType, label: 'Bit & Bellek Taşması', icon: Binary },
    { id: 'matrix' as TabType, label: 'Tip Hiyerarşisi & Tablo', icon: Layers },
    { id: 'quiz' as TabType, label: 'Bilgini Sına (Quiz)', icon: HelpCircle },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Tip Dönüşümleri (Type Conversions)
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> C# .NET
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Implicit & Explicit Dönüşümler, Bellek Mimarisi ve Bit Analizi
              </p>
            </div>
          </div>

          {/* Enes Öztürk Signature Badge */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 shadow-sm hover:border-indigo-500/50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                EÖ
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Hazırlayan
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1">
                  Enes Öztürk
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
