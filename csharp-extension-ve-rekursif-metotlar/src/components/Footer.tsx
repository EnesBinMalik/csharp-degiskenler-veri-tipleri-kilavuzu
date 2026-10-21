import React from 'react';
import { TabType } from '../types';
import { authorData } from '../data/theoryContent';
import { Code2, Heart } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand & signature */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              EÖ
            </div>
            <div>
              <div className="text-white font-semibold">
                C# Extension & Rekürsif Metotlar Laboratuvarı
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Hazırlayan: <strong className="text-cyan-400 font-medium">{authorData.name}</strong>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <button
              onClick={() => onTabChange('theory')}
              className="hover:text-white transition-colors"
            >
              Rehber
            </button>
            <button
              onClick={() => onTabChange('recursion')}
              className="hover:text-white transition-colors"
            >
              Rekürsif Simülatör
            </button>
            <button
              onClick={() => onTabChange('extension')}
              className="hover:text-white transition-colors"
            >
              Extension Laboratuvarı
            </button>
            <button
              onClick={() => onTabChange('quiz')}
              className="hover:text-white transition-colors"
            >
              Bilgi Sınavı
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Extension metotlar ve rekürsif algoritmalar için etkileşimli eğitim örnekleri</span>
          <span className="hidden sm:inline">·</span>
          <span>Geleneksel extension metot sözdizimi · C# 3.0+</span>
        </div>
      </div>
    </footer>
  );
};
