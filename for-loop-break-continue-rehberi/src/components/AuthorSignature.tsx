import React from 'react';
import { PenTool } from 'lucide-react';

export const AuthorSignature: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: App info & Author Signature */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight">
                  For Döngüsü & Akış Kontrolü
                </span>
                <span className="text-xs text-indigo-400 font-mono">v1.0</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>C# & Algoritma Eğitimi</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400 font-semibold">Hazırlayan: Enes Öztürk</span>
              </div>
            </div>
          </div>

          {/* Author attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-400 text-center sm:text-right">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-left">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Hazırlayan
              </div>
              <div className="text-sm font-semibold text-slate-200 font-sans mt-0.5">
                Enes Öztürk
              </div>
              <div className="text-[11px] text-slate-400">
                Yazılım Geliştirici & Eğitmen Notları
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Enes Öztürk. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            <span>2 İfade + 1 Koşul</span>
            <span>·</span>
            <span>Break & Continue</span>
            <span>·</span>
            <span>C# Syntax</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
