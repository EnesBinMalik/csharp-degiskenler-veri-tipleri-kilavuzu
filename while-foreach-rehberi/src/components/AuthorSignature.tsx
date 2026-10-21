import React from 'react';
import { Feather } from 'lucide-react';

interface AuthorSignatureProps {
  variant?: 'banner' | 'footer' | 'card';
}

export const AuthorSignature: React.FC<AuthorSignatureProps> = ({ variant = 'card' }) => {
  if (variant === 'banner') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-5 shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-xl bg-gradient-to-br from-indigo-300 to-pink-400 bg-clip-text text-transparent">
                    EÖ
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
                  Ders Materyali & Rehber
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  EĞİTİM MATERYALİ
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Hazırlayan: Enes Öztürk
              </h3>
              <p className="text-xs text-slate-300">
                While ve foreach döngülerini anlatan notlar, görselleştirmeler ve pratik testler
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Signature Badge */}
            <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-indigo-500/30 backdrop-blur-sm text-right">
              <p className="text-[10px] text-slate-400 font-mono">HAZIRLAYAN</p>
              <p className="font-serif italic text-base text-indigo-300 font-bold tracking-wide">
                Enes Öztürk
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 text-center my-8 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 shadow-inner">
          <Feather className="w-6 h-6" />
        </div>

        <h4 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-1">
          Eğitim Materyali
        </h4>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Bu C# eğitim materyali, döngü mantıklarını örneklerle anlatmak amacıyla
          <strong className="text-white font-semibold"> Enes Öztürk </strong> tarafından hazırlanmıştır. Uygulamadaki kod adımları tarayıcıda simüle edilir.
        </p>

        {/* Author attribution card */}
        <div className="inline-block p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-indigo-500/30 shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-400">C# DÖNGÜ EĞİTİMİ</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              v1.0 • KİŞİSEL ÇALIŞMA
            </span>
          </div>

          <div className="py-2 text-center">
            {/* Calligraphic-like Signature Display */}
            <div className="relative inline-block">
              <span className="font-serif italic text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Enes Öztürk
              </span>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-1" />
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Yazılım Geliştirici & İçerik Üreticisi
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
            <span>Konu: While & ForEach</span>
            <span className="text-emerald-400 font-mono">© 2026 Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
