import React from 'react';
import { ActiveTab } from '../types';
import { USER_INFO } from '../data/csharpExamples';
import { Code2, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-10 mt-16 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Signature */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <Code2 className="w-4 h-4 text-sky-400" />
            <span>C# Metot &amp; Parametre Laboratuvarı</span>
          </div>
          <p className="text-slate-400 text-xs">
            Hazırlayan &amp; Geliştirici: <strong className="text-sky-300">{USER_INFO.author}</strong> · {USER_INFO.course}
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400">
          <button
            onClick={() => setActiveTab('overloading')}
            className="hover:text-slate-200 transition-colors cursor-pointer"
          >
            Metot Overloading
          </button>
          <button
            onClick={() => setActiveTab('out-ref')}
            className="hover:text-slate-200 transition-colors cursor-pointer"
          >
            Out &amp; Ref Aktarımı
          </button>
          <button
            onClick={() => setActiveTab('signature-validator')}
            className="hover:text-slate-200 transition-colors cursor-pointer"
          >
            İmza Doğrulayıcı
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className="hover:text-slate-200 transition-colors cursor-pointer"
          >
            İnteraktif Konsol
          </button>
          <button
            onClick={() => setActiveTab('submission')}
            className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
          >
            Ödev Teslim Paneli (Enes Öztürk)
          </button>
        </div>

        {/* Tech standard info */}
        <div className="text-center md:text-right text-slate-400 text-[11px] font-mono">
          <span>C# metotları · out/ref parametreleri</span>
          <br />
          <span>© {new Date().getFullYear()} Enes Öztürk</span>
        </div>
      </div>
    </footer>
  );
};
