import React from 'react';
import { ArrowDown, Cpu, ShieldCheck, Terminal, Award, FileCode } from 'lucide-react';
import { AUTHOR_NAME } from '../data/courseData';

interface HeroProps {
  onStartExplore: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartExplore, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Author & Chapter Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
          <span>C# & .NET Mimarisi</span>
          <span aria-hidden="true">·</span>
          <span>Eğitmen: {AUTHOR_NAME}</span>
          <span aria-hidden="true">·</span>
          <span>Ders 01</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
          Değişkenler, Bellek Yönetimi ve Temel .NET Kütüphaneleri
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Değişkenlerin bellek mimarisi, doğru veri tipi seçimi (Char vs String karşılaştırması),
          sözdizimi kuralları ve yazılım geliştirmede en çok başvurduğumuz{' '}
          <strong className="text-white font-semibold">DateTime</strong> ile{' '}
          <strong className="text-white font-semibold">String</strong> kütüphanelerinin interaktif rehberi.
        </p>

        {/* Author Signature Plaque */}
        <div className="mt-8 flex flex-wrap items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-2xl">
          <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-lg shrink-0">
            EÖ
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{AUTHOR_NAME}</span>
              <span className="text-[11px] text-cyan-400 font-medium">İmzalı Eğitim İçeriği</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              "Uygulamanın performansı açısından doğru veri tiplerine karar verebilmek yazılım mimarisinin temelidir."
            </p>
          </div>
          <div className="italic text-xs font-serif text-slate-400 border-l border-slate-800 pl-4 shrink-0 hidden sm:block">
            ✍️ Enes Öztürk
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onStartExplore}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-cyan-500/20 whitespace-nowrap"
          >
            <span>Eğitime Başla</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          <a
            href="#kurallar"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-lg transition-colors border border-slate-700 whitespace-nowrap"
          >
            6 Tanımlama Kuralı
          </a>
          <button
            onClick={onOpenQuiz}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-medium text-sm rounded-lg transition-colors border border-cyan-500/30 whitespace-nowrap"
          >
            Öğrendiklerini Test Et
          </button>
        </div>

        {/* 4 Feature Cards Strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <Cpu className="w-5 h-5" />
              <h2 className="text-sm font-semibold text-slate-100">Doğru Tip & Bellek</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Değer ve referans türlerini, bellek yerleşimini kesin varsayımlara düşmeden öğrenin.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-sm font-semibold text-slate-100">6 Altın Kural</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Case-sensitivity, rakamla başlayamama, işlem operatörleri ve derleyici hata kodları.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <FileCode className="w-5 h-5" />
              <h2 className="text-sm font-semibold text-slate-100">DateTime & String</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              En sık kullanılan iki devasa kütüphane, canlı metot testleri ve Microsoft resmi belgeleri.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <Terminal className="w-5 h-5" />
              <h2 className="text-sm font-semibold text-slate-100">Canlı C# Laboratuvarı</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tarayıcıda değişken testi, sözdizimi doğrulayıcı ve anlık konsol çalıştırma simülasyonu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
