import React, { useState } from 'react';
import { Play, Search, ArrowLeftRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

type AlgorithmType = 'minmax' | 'search' | 'reverse' | 'filter_evens';

export const AlgorithmPlayground: React.FC = () => {
  const [arrayData, setArrayData] = useState<number[]>([14, 42, 9, 81, 23, 56, 3, 67]);
  const [activeAlgo, setActiveAlgo] = useState<AlgorithmType>('minmax');
  const [searchTarget, setSearchTarget] = useState<number>(23);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<string>('');

  const handleRandomize = () => {
    const fresh = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 5);
    setArrayData(fresh);
    setHighlightedIdx(null);
    setResultMessage('');
  };

  const runMinMax = () => {
    let min = arrayData[0];
    let max = arrayData[0];
    let minIdx = 0;
    let maxIdx = 0;

    for (let i = 1; i < arrayData.length; i++) {
      if (arrayData[i] < min) {
        min = arrayData[i];
        minIdx = i;
      }
      if (arrayData[i] > max) {
        max = arrayData[i];
        maxIdx = i;
      }
    }

    setHighlightedIdx(minIdx);
    setResultMessage(`En Küçük Eleman: ${min} ([${minIdx}] indeksi), En Büyük Eleman: ${max} ([${maxIdx}] indeksi)`);
  };

  const runSearch = () => {
    let foundIdx = -1;
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i] === searchTarget) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx !== -1) {
      setHighlightedIdx(foundIdx);
      setResultMessage(`"${searchTarget}" değeri [${foundIdx}] indeksinde (yani ${foundIdx + 1}. sırada) bulundu!`);
    } else {
      setHighlightedIdx(null);
      setResultMessage(`"${searchTarget}" değeri dizide bulunamadı.`);
    }
  };

  const runReverse = () => {
    const reversed = [...arrayData].reverse();
    setArrayData(reversed);
    setHighlightedIdx(null);
    setResultMessage('Simülasyonda dizi kopyası ters sıraya çevrildi.');
  };

  const runEvens = () => {
    const evens = arrayData.filter((n) => n % 2 === 0);
    setHighlightedIdx(null);
    setResultMessage(`Çift Sayılar: ${evens.join(', ')} (Toplam ${evens.length} adet çift sayı)`);
  };

  return (
    <section id="algoritmalar" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 05</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">Algoritmalar</span>
            <span aria-hidden="true">·</span>
            <span>Döngülerle Dizi İşleme</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Temel Dizi & Döngü Algoritmaları
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            Diziler ve döngüler, programlamada arama, sıralama, filtreleme ve ekstremum (min/max) değerleri bulma işlemlerinin temel taşıdır. Farklı algoritmaları canlı dizi üzerinde test edin.
          </p>
        </div>

        {/* Algorithm Tabs (Interactive Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 mb-8 max-w-2xl">
          <button
            onClick={() => {
              setActiveAlgo('minmax');
              setResultMessage('');
              setHighlightedIdx(null);
            }}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeAlgo === 'minmax'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Min / Max Bulma
          </button>

          <button
            onClick={() => {
              setActiveAlgo('search');
              setResultMessage('');
              setHighlightedIdx(null);
            }}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeAlgo === 'search'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Doğrusal Arama (Linear Search)
          </button>

          <button
            onClick={() => {
              setActiveAlgo('reverse');
              setResultMessage('');
              setHighlightedIdx(null);
            }}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeAlgo === 'reverse'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Ters Çevirme (Reverse)
          </button>

          <button
            onClick={() => {
              setActiveAlgo('filter_evens');
              setResultMessage('');
              setHighlightedIdx(null);
            }}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeAlgo === 'filter_evens'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Çift Sayıları Filtreleme
          </button>
        </div>

        {/* Live Array Display */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              Çalışma Dizisi (int[{arrayData.length}])
            </span>
            <button
              onClick={handleRandomize}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Yeni Sayılar Üret
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {arrayData.map((val, idx) => {
              const isHighlight = highlightedIdx === idx;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    isHighlight
                      ? 'bg-sky-500 text-slate-950 border-white font-bold ring-2 ring-sky-300 scale-105 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className={`text-[10px] font-mono mb-1 ${isHighlight ? 'text-slate-900' : 'text-slate-500'}`}>
                    [{idx}]
                  </div>
                  <div className="text-lg font-mono font-bold">{val}</div>
                </div>
              );
            })}
          </div>

          {/* Action Trigger Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800">
            {activeAlgo === 'minmax' && (
              <button
                onClick={runMinMax}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                Min ve Max Elemanları Bul
              </button>
            )}

            {activeAlgo === 'search' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-white"
                  placeholder="Hedef sayı..."
                />
                <button
                  onClick={runSearch}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Dizide Ara (Linear Search)
                </button>
              </div>
            )}

            {activeAlgo === 'reverse' && (
              <button
                onClick={runReverse}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Diziyi Tersine Çevir
              </button>
            )}

            {activeAlgo === 'filter_evens' && (
              <button
                onClick={runEvens}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Çift Sayıları Tara
              </button>
            )}

            {resultMessage && (
              <div className="text-xs font-medium text-emerald-300 flex items-center gap-1.5 ml-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{resultMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
