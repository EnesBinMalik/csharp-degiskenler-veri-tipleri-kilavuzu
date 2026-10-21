import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Signature Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold font-mono text-sm shadow-md">
              EÖ
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight">
                DateTime Metotlar
              </div>
              <div className="text-xs text-amber-400/90 font-medium">
                Enes Öztürk İmzasıyla
              </div>
            </div>
          </div>

          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>JavaScript ES2024</span>
            <span aria-hidden="true">·</span>
            <span>C# .NET</span>
            <span aria-hidden="true">·</span>
            <span>Python 3.12+</span>
            <span aria-hidden="true">·</span>
            <span>ANSI SQL</span>
          </div>

          {/* Quick Year / Status */}
          <div className="text-xs text-slate-500 text-right">
            <span>© {new Date().getFullYear()} Tüm Hakları Saklıdır</span>
          </div>
        </div>

        {/* Quiet Subtitle & Philosophy */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Yazılım geliştiriciler için zaman ve takvim aritmetiği eğitim ve referans platformu.
          </p>
          <div className="text-slate-400 font-mono text-[11px]">
            Tasarım & Mimari: Enes Öztürk
          </div>
        </div>

      </div>
    </footer>
  );
};
