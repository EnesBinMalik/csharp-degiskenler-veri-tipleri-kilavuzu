import React from 'react';
import { BookOpen, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { AUTHOR_NAME } from '../data/courseData';

interface HeaderProps {
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark with Author Attribution */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              C# Değişkenler Atölyesi
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Eğitmen: <strong className="text-slate-300 font-semibold">{AUTHOR_NAME}</strong>
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#degisken-nedir"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Değişken Nedir?
          </a>
          <a
            href="#kurallar"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            6 Altın Kural
          </a>
          <a
            href="#datetime"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            DateTime Kütüphanesi
          </a>
          <a
            href="#string"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            String Kütüphanesi
          </a>
          <a
            href="#laboratuvar"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            C# Konsol Laboratuvarı
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm shadow-cyan-400/20 whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Bilgi Testini Çöz</span>
          </button>
        </div>
      </div>
    </header>
  );
};
