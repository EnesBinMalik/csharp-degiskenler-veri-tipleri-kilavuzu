import React from 'react';
import { Layers, ArrowRight, Play, Cpu, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStartSimulation: () => void;
  onExploreMemory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSimulation,
  onExploreMemory,
}) => {
  return (
    <section id="genel-bakis" className="py-16 md:py-24 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Author kicker & metadata (Zero-pill discipline: quiet inline text with separators) */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <span className="text-sky-400 font-semibold">Enes Öztürk İmzasıyla</span>
          <span aria-hidden="true">·</span>
          <span>Programlama Temelleri</span>
          <span aria-hidden="true">·</span>
          <span>Diziler & Bellek Yönetimi</span>
          <span aria-hidden="true">·</span>
          <span>C# & Algoritma Mimarisi</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
              Dizi Nedir, Tanımlama, Erişim ve Döngülerle Kullanımı
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Aynı türden değerleri sıralı bir koleksiyonda yönetmek için dizilerden faydalanırız. Değişkenler kullanılarak karmaşık ve uzun şekilde çözülebilecek problemler, diziler ve döngülerin gücüyle daha kolay ve okunabilir hale gelir.
            </p>

            {/* Core principles highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1">0-Tabanlı İndeks</span>
                <p className="text-sm text-slate-200">
                  5 elemanlı dizinin ilk elemanı <span className="font-mono text-sky-300">0.</span>, sonuncusu <span className="font-mono text-sky-300">4.</span> indekstir.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1">İndeksle Erişim</span>
                <p className="text-sm text-slate-200">
                  <span className="font-mono text-emerald-300">dizi[i]</span> ile indeksteki elemana sabit zamanlı erişilir.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Döngü Sinerjisi</span>
                <p className="text-sm text-slate-200">
                  20 defa <span className="font-mono text-amber-300">ReadLine()</span> yazmak yerine tek bir <span className="font-mono text-amber-300">for</span> döngüsü yeterlidir.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onStartSimulation}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Döngü Simülatörünü Çalıştır
              </button>

              <button
                onClick={onExploreMemory}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-sm rounded-lg border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                Bellek Yapısını İncele
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Quick Visual Concept */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Dizi Hücreleri (Şematik)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  int[5] Örneği
                </span>
              </div>

              {/* Memory cells interactive preview */}
              <div className="mt-5 space-y-4">
                <div className="text-xs text-slate-400">
                  5 elemanlı bir <code>int[]</code> dizisinin indeksleri ve örnek değerleri:
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[
                    { idx: 0, val: 45 },
                    { idx: 1, val: 12 },
                    { idx: 2, val: 89 },
                    { idx: 3, val: 34 },
                    { idx: 4, val: 78 },
                  ].map((cell) => (
                    <div
                      key={cell.idx}
                      className="group p-2.5 rounded-lg bg-slate-950/80 border border-slate-750 hover:border-sky-400 transition-all text-center"
                    >
                      <div className="text-[10px] font-mono text-sky-400/90 mb-1">
                        [{cell.idx}]
                      </div>
                      <div className="text-base font-bold font-mono text-white group-hover:text-sky-300">
                        {cell.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Indexing Callout */}
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <div className="text-slate-400 text-[11px] font-sans">İndeksleme örneği:</div>
                  <div className="text-sky-300 font-semibold">
                    dizi[2] → 3. eleman
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Gerçek bellek adresleri çalışma zamanı tarafından belirlenir; bu görsel adres göstermez.
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                  <span>İlk Eleman: <span className="font-mono text-slate-200">dizi[0]</span></span>
                  <span>Son Eleman: <span className="font-mono text-slate-200">dizi[4]</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
