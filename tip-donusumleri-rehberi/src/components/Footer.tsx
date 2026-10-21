import React from 'react';
import { Code2, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Tip Dönüşümleri (Type Conversions)
              </div>
              <div className="text-xs text-slate-400">
                C# tür dönüşümleri, örnekler ve bit görselleştirmesi
              </div>
            </div>
          </div>

          {/* Enes Öztürk Signature */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              EÖ
            </div>
            <div className="text-left text-xs">
              <div className="text-slate-400 font-medium">Bu çalışma ve içerikler</div>
              <div className="text-slate-200 font-bold flex items-center gap-1">
                Enes Öztürk imzasıyla hazırlanmıştır
              </div>
            </div>
          </div>
        </div>

        {/* Micro-notes */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Enes Öztürk. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Implicit (Bilinçsiz) & Explicit (Bilinçli)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
