import React from 'react';
import { ActiveTab } from '../types';
import { USER_INFO } from '../data/csharpExamples';
import { ArrowRight, Sparkles, BookOpen, Layers, Cpu, Share2 } from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-6 py-12 md:py-16">
      {/* Subtle background ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Unboxed Metadata Header (No pills, clean typography) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-medium mb-4">
          <span>{USER_INFO.course}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Geliştirici: {USER_INFO.author}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{USER_INFO.date}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl text-balance">
          Metot Overloading &amp; Out/Ref Parametreleri
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          C# dilinde metotların aşırı yüklenmesi (overloading), metot imzası kuralları ve
          <code className="mx-1 font-mono text-sky-300">out</code>/<code className="font-mono text-amber-300">ref</code>
          parametrelerinin etkileşimli örneklerle anlatıldığı Türkçe eğitim rehberi. Bellek çizimleri kavramsaldır.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActiveTab('overloading')}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-sm shadow-sky-500/20"
          >
            <span>Overloading Simülatörünü Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('out-ref')}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-lg border border-slate-700/80 transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Out vs Ref Aktarım Şeması</span>
          </button>

          <button
            onClick={() => setActiveTab('submission')}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-amber-400 font-medium text-sm rounded-lg border border-amber-500/30 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Ödev Detayları &amp; Teslim Linki</span>
          </button>
        </div>

        {/* 3-Column Core Takeaways Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>Metot İmzası (Method Signature)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Metot adı + parametrelerin türü, sırası ve geçirme biçimi</strong>.
              <br />
              <span className="text-rose-400">Dönüş türü ve parametre adları overload ayrımı oluşturmaz.</span> Yalnızca dönüş türünü değiştirerek metot aşırı yüklenemez.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Out Parametre Mekanizması</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">İlk değer zorunluluğu yoktur.</strong> Çağrılan metot içinde değişkene bir değer atanması ise mecburidir. Birden fazla dönüş için idealdir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Ref Parametre Karşılaştırması</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">İlk değer atanması ZORUNLUDUR.</strong> Metot çağrılmadan önce değişken bellekte başlatılmış olmalıdır. Çift yönlü aktarım sağlar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
