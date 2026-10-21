import React from 'react';
import { ArrowRight, Terminal, Cpu, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExplore: (targetId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto">
      {/* Editorial author kicker without pill box */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
        <span className="text-cyan-400 font-semibold">Enes Öztürk İmzalı Proje</span>
        <span aria-hidden="true">·</span>
        <span>C# &amp; Nesne Yönelimli Programlama Rehberi</span>
        <span aria-hidden="true">·</span>
        <span>Etkileşimli Bellek Mimarisi</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and Rationale */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Metotların Gücü, Bellek Yaşamı ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">ref Semantiği</span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            Büyük yazılım problemlerini küçük, anlaşılır ve yeniden kullanılabilir parçalara ayırmak
            profesyonel kodlamanın temelidir. Değer türlerinde varsayılan parametre aktarımından,
            <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded font-mono text-base mx-1">ref</code>
            anahtar kelimesinin çağıranın değişkenine başvurma davranışına kadar konuları adım adım keşfedin.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onExplore('simulator')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-950/40 cursor-pointer"
            >
              <span>Canlı Bellek Simülatörünü Aç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onExplore('teori')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm transition-all border border-slate-700/60 cursor-pointer"
            >
              <span>Teorik Temelleri Oku</span>
            </button>
          </div>

          {/* Clean 3-factor proof points without badge boxes */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">DRY</div>
              <div className="text-xs text-slate-400 mt-1">Kod tekrarını önleme &amp; modüler parça yönetimi</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">Kapsam</div>
              <div className="text-xs text-slate-400 mt-1">Yerel değişkenlerin kod içindeki erişim alanı</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-indigo-400">ref</div>
              <div className="text-xs text-slate-400 mt-1">Çağıranın değişkenine başvuru ile çalışma</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Quick-Glance Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2 font-mono">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Program.cs (C#)</span>
              </div>
              <span className="font-mono text-slate-500">Enes Öztürk Örneği</span>
            </div>

            {/* Code presentation */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-slate-200">
              <div className="text-slate-500 mb-2">// 1. Çağıran satır (Main Scope):</div>
              <div className="text-slate-300">
                <span className="text-cyan-400">int</span> x = <span className="text-amber-400">3</span>;
              </div>
              <div className="text-slate-300">
                <span className="text-cyan-400">int</span> y = <span className="text-amber-400">4</span>;
              </div>
              <div className="text-slate-300">
                <span className="text-cyan-400">int</span> sonuc = instance.
                <span className="text-teal-300 font-semibold">ArttırVeTopla</span>(
                <span className="text-indigo-400 font-bold">ref</span> x, <span className="text-indigo-400 font-bold">ref</span> y);
              </div>

              <div className="border-t border-slate-800/80 my-3"></div>

              <div className="text-slate-500 mb-2">// 2. Metot tanımı:</div>
              <div className="text-slate-300">
                <span className="text-indigo-400">public</span> <span className="text-cyan-400">int</span> <span className="text-teal-300 font-semibold">ArttırVeTopla</span>(
                <span className="text-indigo-400 font-bold">ref</span> <span className="text-cyan-400">int</span> x, <span className="text-indigo-400 font-bold">ref</span> <span className="text-cyan-400">int</span> y)
              </div>
              <div className="text-slate-400">{'{'}</div>
              <div className="pl-4 text-emerald-400">
                x += <span className="text-amber-400">1</span>; <span className="text-slate-500">// x: 3 → 4 oldu!</span>
              </div>
              <div className="pl-4 text-emerald-400">
                y += y; <span className="text-slate-500">// y: 4 → 8 oldu!</span>
              </div>
              <div className="pl-4 text-amber-300">
                <span className="text-indigo-400">return</span> (x + y); <span className="text-slate-500">// (4 + 8) = 12</span>
              </div>
              <div className="text-slate-400">{'}'}</div>
            </div>

            {/* Quick explanation footer */}
            <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Sonuç: <strong className="text-cyan-300 font-mono">x=4, y=8, sonuc=12</strong></span>
              <button
                onClick={() => onExplore('simulator')}
                className="text-cyan-400 hover:text-cyan-300 font-medium underline flex items-center gap-1 cursor-pointer"
              >
                Bellekte Gör
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
