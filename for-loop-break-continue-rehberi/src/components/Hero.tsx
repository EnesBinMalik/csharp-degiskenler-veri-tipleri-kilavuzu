import React from 'react';
import { Play, Sparkles, BookOpen } from 'lucide-react';

interface HeroProps {
  onStartSimulator: () => void;
  onReadLessons: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulator, onReadLessons }) => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Unboxed clean metadata kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-400 font-medium mb-3">
            <span>Algoritma & Programlama Temelleri</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>            C# Döngüleri</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">Hazırlayan: Enes Öztürk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
            For Döngüsü, Break & Continue Rehberi
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
            2 ifade ve 1 koşul yapısını, sonsuz döngü kurallarını ve akış kesintilerini tarayıcı tabanlı simülasyonla keşfedin. C# kodu derlenmez veya çalıştırılmaz.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartSimulator}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-950"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Görsel Simülatörü Aç</span>
            </button>
            <button
              onClick={onReadLessons}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Ders Notlarını Oku</span>
            </button>
          </div>

          {/* Quick concept bullets */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>2 İfade + 1 Koşul Anatomisi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>for(;;) Sonsuz Döngü Kuralları</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Break: Döngüden Erken Çıkış</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Continue: Mevcut İterasyonu Atlama</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
