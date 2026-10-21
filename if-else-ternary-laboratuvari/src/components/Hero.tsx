import React from 'react';
import { Play, BookOpen } from 'lucide-react';

interface HeroProps {
  onScrollToExample: () => void;
  onOpenReport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToExample, onOpenReport }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 px-6 border-b border-slate-800/80 bg-radial-[at_top_center] from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Unboxed Metadata Header Line (Constitution: No static pill enclosures) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-4 tracking-wide">
          <span>ALGORİTMA VE PROGRAMLAMA ÖDEVİ</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>C# KARAR YAPILARI</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">HAZIRLAYAN: ENES ÖZTÜRK</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              C# If-Else Yapısı ve <span className="text-cyan-400">Ternary If (? :)</span> Operatörü
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Programlama mantığında koşullu dallanmanın temeli olan <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm font-mono">if-else</code> blokları ve <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm font-mono">? :</code> ternary operatörü; etkileşimli örnekler, adım adım akış simülasyonu ve karşılaştırmalarla anlatılır. C# kodu tarayıcıda derlenmez veya çalıştırılmaz.
            </p>

            {/* Author Attribution Card */}
            <div className="mt-6 p-4 rounded-xl border border-slate-800 bg-slate-900/60 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ödevi Hazırlayan Öğrenci</div>
                  <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                    <span>Enes Öztürk</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-medium">
                      Kişisel Eğitim Çalışması
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  <div>Ders: C# Programlama</div>
                  <div className="text-cyan-400">Konu: Koşul & Ternary</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToExample}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all active:scale-95 shadow-md shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Örnek Akışı Göster</span>
              </button>
              <button
                onClick={onOpenReport}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Çalışma Özeti</span>
              </button>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  <span className="ml-2 text-slate-300 font-medium">Program.cs</span>
                </div>
                <span className="text-[11px] text-cyan-400">Enes Öztürk Ödevi</span>
              </div>

              <div className="p-4 font-mono text-xs text-slate-300 leading-relaxed space-y-1.5 overflow-x-auto">
                <div className="text-slate-500">// Ödevde Verilen Örnek</div>
                <div><span className="text-purple-400">bool</span> <span className="text-blue-300">condition</span> = <span className="text-cyan-400 font-bold">true</span>;</div>
                <div className="pt-1"><span className="text-purple-400 font-semibold">if</span> (<span className="text-blue-300">condition</span>)</div>
                <div>{'{'}</div>
                <div className="pl-4 text-emerald-300">Console.<span className="text-yellow-200">WriteLine</span>(<span className="text-amber-300">"Değişken: true"</span>);</div>
                <div>{'}'}</div>
                <div><span className="text-purple-400 font-semibold">else</span></div>
                <div>{'{'}</div>
                <div className="pl-4 text-slate-400">Console.<span className="text-yellow-200">WriteLine</span>(<span className="text-amber-300">"Değişken: false"</span>);</div>
                <div>{'}'}</div>

                <div className="pt-2 border-t border-slate-800/80 text-slate-500">// Ternary If Alternatifi (1 Satır)</div>
                <div className="text-cyan-300 font-semibold">
                  Console.<span className="text-yellow-200">WriteLine</span>(condition ? <span className="text-amber-300">"Değişken: true"</span> : <span className="text-amber-300">"Değişken: false"</span>);
                </div>
              </div>

              <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Konsol Çıktısı:</span>
                <span className="text-emerald-400 font-bold">Değişken: true</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
