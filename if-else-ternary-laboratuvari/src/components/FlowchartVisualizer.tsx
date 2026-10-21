import React, { useState } from 'react';
import { GitBranch, Check, X, ArrowDown, Activity } from 'lucide-react';

export const FlowchartVisualizer: React.FC = () => {
  const [activeCondition, setActiveCondition] = useState<boolean>(true);

  return (
    <section id="akis-semasi" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          Algoritmik Mantık & Görselleştirme · Enes Öztürk
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Koşullu Dallanma Akış Şeması (Flowchart)
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-3xl">
          Şema, <code className="text-cyan-300 font-mono">if</code> ve <code className="text-cyan-300 font-mono">ternary</code> örneklerindeki koşullu seçimi kavramsal olarak gösterir. Animasyon gerçek bir program yürütmez.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        {/* Toggle condition right here */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-300">Simüle Edilen Koşul:</span>
            <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveCondition(true)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeCondition
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                condition = true
              </button>
              <button
                onClick={() => setActiveCondition(false)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  !activeCondition
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                condition = false
              </button>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Aktif Takip Edilen Yol: <strong className={activeCondition ? 'text-emerald-400' : 'text-rose-400'}>{activeCondition ? 'EVET (True Kolu)' : 'HAYIR (False Kolu)'}</strong></span>
          </div>
        </div>

        {/* Interactive SVG Flowchart diagram */}
        <div className="py-8 flex flex-col items-center select-none font-mono">
          {/* Node 1: Start (Oval) */}
          <div className="w-56 px-4 py-2.5 rounded-full border border-slate-700 bg-slate-950 text-center text-xs font-bold text-slate-200 shadow-md">
            ● BAŞLA (Program.Main)
          </div>

          {/* Connector Down */}
          <div className="w-0.5 h-7 bg-cyan-400"></div>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 -mt-1.5 mb-1" />

          {/* Node 2: Variable Declaration (Rectangle) */}
          <div className="w-64 px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-center text-xs text-slate-200 shadow-md">
            <div className="text-[10px] text-slate-400 uppercase">Değişken Tanımlama</div>
            <div className="font-bold text-cyan-300 mt-0.5">
              bool condition = {activeCondition ? 'true' : 'false'};
            </div>
          </div>

          {/* Connector Down */}
          <div className="w-0.5 h-7 bg-cyan-400"></div>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 -mt-1.5 mb-1" />

          {/* Node 3: Decision Diamond (Rotated Box) */}
          <div className="relative my-4">
            <div className="w-44 h-24 border-2 border-cyan-400 bg-slate-950 rounded-lg flex items-center justify-center p-2 text-center shadow-lg shadow-cyan-500/10">
              <div>
                <div className="text-[10px] text-cyan-400 uppercase font-semibold">Karar Noktası</div>
                <div className="text-xs font-bold text-white mt-0.5">condition == true?</div>
              </div>
            </div>
          </div>

          {/* Branching Split */}
          <div className="w-full max-w-2xl grid grid-cols-2 gap-8 relative mt-2">
            {/* Left Branch: TRUE */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>EVET (TRUE)</span>
              </div>
              <div className={`w-0.5 h-6 ${activeCondition ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-slate-800'}`}></div>
              <ArrowDown className={`w-3.5 h-3.5 -mt-1.5 mb-1 ${activeCondition ? 'text-emerald-400' : 'text-slate-800'}`} />

              <div
                className={`w-full max-w-xs p-4 rounded-xl border text-center transition-all ${
                  activeCondition
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50 scale-105'
                    : 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] font-bold text-emerald-400 uppercase">1. If Gövdesi</div>
                <div className="text-xs font-mono font-bold mt-1 text-slate-200">
                  Console.WriteLine(<span className="text-amber-300">"Değişken: true"</span>);
                </div>
                {activeCondition && (
                  <div className="mt-2 text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    ✓ SEÇİLEN ÖRNEK KOL
                  </div>
                )}
              </div>
            </div>

            {/* Right Branch: FALSE */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-2">
                <X className="w-3.5 h-3.5" />
                <span>HAYIR (FALSE)</span>
              </div>
              <div className={`w-0.5 h-6 ${!activeCondition ? 'bg-rose-400 shadow-sm shadow-rose-400' : 'bg-slate-800'}`}></div>
              <ArrowDown className={`w-3.5 h-3.5 -mt-1.5 mb-1 ${!activeCondition ? 'text-rose-400' : 'text-slate-800'}`} />

              <div
                className={`w-full max-w-xs p-4 rounded-xl border text-center transition-all ${
                  !activeCondition
                    ? 'border-rose-500 bg-rose-950/40 text-rose-200 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/50 scale-105'
                    : 'border-slate-800 bg-slate-950/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] font-bold text-rose-400 uppercase">2. Else Gövdesi</div>
                <div className="text-xs font-mono font-bold mt-1 text-slate-200">
                  Console.WriteLine(<span className="text-amber-300">"Değişken: false"</span>);
                </div>
                {!activeCondition && (
                  <div className="mt-2 text-[10px] bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded font-bold">
                    ✓ SEÇİLEN ÖRNEK KOL
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Merge back */}
          <div className="w-full max-w-md flex flex-col items-center mt-6">
            <div className="w-0.5 h-6 bg-slate-700"></div>
            <ArrowDown className="w-3.5 h-3.5 text-slate-700 -mt-1.5 mb-1" />

            {/* End node */}
            <div className="w-56 px-4 py-2.5 rounded-full border border-slate-700 bg-slate-950 text-center text-xs font-bold text-slate-300 shadow-md">
              ■ BİTİR (Sonraki Komutlar)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
