import React from 'react';

interface FooterProps {
  setActiveTab: (tab: 'lab' | 'inspector' | 'pipeline' | 'comparison' | 'challenges') => void;
  onOpenCheatSheet: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenCheatSheet }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 mt-16 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <span className="text-indigo-400 font-mono">&lt;str&gt;</span>
            <span>StringCraft Studio</span>
            <span className="text-slate-400 font-normal">· Enes Öztürk</span>
          </div>
          <p className="text-slate-400">
            JavaScript ve TypeScript String Metotları Kapsamlı Referans ve İnteraktif Laboratuvarı.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('lab')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Metotlar
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            İndeks İzleyici
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Zincirleme Hattı
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Karşılaştırma
          </button>
          <button
            onClick={onOpenCheatSheet}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Kopya Kartı
          </button>
        </div>

        <div className="text-slate-400 font-mono text-[11px] text-center md:text-right">
          <span>Enes Öztürk tarafından hazırlanmıştır</span>
        </div>
      </div>
    </footer>
  );
};
