import React from 'react';
import { Feather, Sparkles } from 'lucide-react';

interface AuthorSignatureProps {
  variant?: 'card' | 'inline' | 'compact';
}

export const AuthorSignature: React.FC<AuthorSignatureProps> = ({ variant = 'card' }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold text-[10px]">
          EÖ
        </span>
        <span className="font-medium text-slate-300">Enes Öztürk</span>
        <span className="text-slate-600">•</span>
        <span className="text-indigo-400 font-mono text-[11px]">.NET & C# Notları</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-[11px] shadow-sm">
          EÖ
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Yazar:</span>
          <span className="font-semibold text-slate-100">Enes Öztürk</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-xl shadow-indigo-950/30">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-indigo-300 font-extrabold text-xl tracking-wider">
                EÖ
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white px-1.5 py-0.5 rounded-full shadow-md text-[8px] font-semibold" title="İçerik atfı">
              Yazar
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-white tracking-tight">Enes Öztürk</h4>
              <span className="px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Makale Yazarı
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">
              C# ve veri yapıları içerikleri
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                C# .NET Koleksiyonlar Serisi
              </span>
              <span>•</span>
              <span>ArrayList ve Dinamik Diziler</span>
            </div>
          </div>
        </div>

        {/* Artistic signature representation */}
        <div className="flex flex-col items-start md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <Feather className="w-3.5 h-3.5 text-indigo-400" />
            <span>İçerik atfı</span>
          </div>
          <div className="font-serif italic text-2xl tracking-wide bg-gradient-to-r from-indigo-200 via-indigo-400 to-violet-300 bg-clip-text text-transparent font-medium py-1 select-none">
            Enes Öztürk
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            "Tip güvenliğini göz ardı etmeyin, verinizi tanıyın."
          </p>
        </div>
      </div>
    </div>
  );
};
