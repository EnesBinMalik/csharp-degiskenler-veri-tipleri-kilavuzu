import React, { useState } from 'react';
import {
  ArrowDownAZ,
  ArrowUpZA,
  Eraser,
  FlipHorizontal2,
  Search,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Check,
  Sparkles,
  Edit,
  Code
} from 'lucide-react';
import { DataType } from '../types/arrayTypes';

interface MethodControlsProps {
  onSort: (descending?: boolean) => void;
  onClear: (startIndex: number, length: number) => void;
  onReverse: () => void;
  onIndexOf: (value: number | string) => void;
  onResize: (newSize: number) => void;
  onSetElement: (index: number, value: number | string) => void;
  onLoadPreset: (preset: 'prompt' | 'names' | 'random' | 'custom', customValues?: (number | string)[], type?: DataType) => void;
  onReset: () => void;
  arrayLength: number;
  dataType: DataType;
  isAnimating: boolean;
}

export const MethodControls: React.FC<MethodControlsProps> = ({
  onSort,
  onClear,
  onReverse,
  onIndexOf,
  onResize,
  onSetElement,
  onLoadPreset,
  onReset,
  arrayLength,
  dataType,
  isAnimating
}) => {
  // Clear inputs
  const [clearIndex, setClearIndex] = useState<number>(2);
  const [clearCount, setClearCount] = useState<number>(2);

  // IndexOf input
  const [searchValue, setSearchValue] = useState<string>('7');

  // Resize input
  const [resizeTarget, setResizeTarget] = useState<number>(12);

  // Direct index assignment
  const [assignIndex, setAssignIndex] = useState<number>(6);
  const [assignValue, setAssignValue] = useState<string>('10');

  // Custom array input modal state
  const [customInputText, setCustomInputText] = useState<string>('15, 8, 42, 4, 16, 23');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Active tab in controls
  const [activeAction, setActiveAction] = useState<'sort' | 'clear' | 'reverse' | 'indexof' | 'resize' | 'assign'>('sort');

  const handleClearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClear(clearIndex, clearCount);
  };

  const handleIndexOfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = dataType === 'int' ? Number(searchValue) : searchValue;
    onIndexOf(val);
  };

  const handleResizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResize(resizeTarget);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = dataType === 'int' ? Number(assignValue) : assignValue;
    onSetElement(assignIndex, val);
  };

  const handleApplyCustomArray = () => {
    const rawItems = customInputText.split(',').map(s => s.trim()).filter(Boolean);
    if (rawItems.length === 0) return;

    // Check if numeric
    const isAllNumeric = rawItems.every(item => !isNaN(Number(item)));
    if (isAllNumeric) {
      onLoadPreset('custom', rawItems.map(Number), 'int');
    } else {
      onLoadPreset('custom', rawItems, 'string');
    }
    setShowCustomModal(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Preset Pickers Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-slate-200">Dizi Seç & Sıfırla:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onLoadPreset('prompt')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900/80 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{'{ 1, 3, 4, 9, 8, 7 }'}</span>
            <span className="text-[10px] bg-cyan-800/80 px-1.5 py-0.2 rounded text-cyan-100">Örnek</span>
          </button>

          <button
            onClick={() => onLoadPreset('names')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all"
          >
            {'{"Ahmet", "Zeynep", "Can", "Burak", "Elif"}'}
          </button>

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1"
          >
            <Edit className="w-3.5 h-3.5" />
            Özel Dizi Gir
          </button>

          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Sıfırla
          </button>
        </div>
      </div>

      {/* Method Category Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-4">
        <button
          onClick={() => setActiveAction('sort')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'sort'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <ArrowDownAZ className="w-4 h-4" />
          <span>Array.Sort</span>
        </button>

        <button
          onClick={() => setActiveAction('clear')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'clear'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Eraser className="w-4 h-4" />
          <span>Array.Clear</span>
        </button>

        <button
          onClick={() => setActiveAction('reverse')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'reverse'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <FlipHorizontal2 className="w-4 h-4" />
          <span>Array.Reverse</span>
        </button>

        <button
          onClick={() => setActiveAction('indexof')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'indexof'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Array.IndexOf</span>
        </button>

        <button
          onClick={() => setActiveAction('resize')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'resize'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Maximize2 className="w-4 h-4" />
          <span>Array.Resize&lt;T&gt;</span>
        </button>

        <button
          onClick={() => setActiveAction('assign')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeAction === 'assign'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Edit className="w-4 h-4" />
          <span>dizi[i] = x;</span>
        </button>
      </div>

      {/* Method Execution Box */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 mt-2">
        {/* 1. Array.Sort */}
        {activeAction === 'sort' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <ArrowDownAZ className="w-4 h-4" />
                  Array.Sort(sayiDizisi);
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Numeric dizileri küçükten büyüğe (ascending), string dizileri ise alfabetik (A-Z) olarak sıralar.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={isAnimating || arrayLength === 0}
                  onClick={() => onSort(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Küçükten Büyüğe Sırala (A→Z)
                </button>
                <button
                  disabled={isAnimating || arrayLength === 0}
                  onClick={() => onSort(true)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all border border-slate-700 disabled:opacity-50"
                  title="Array.Sort ardından Array.Reverse çağrılır"
                >
                  <ArrowUpZA className="w-3.5 h-3.5" />
                  Büyükten Küçüğe (Z→A)
                </button>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 flex items-center justify-between">
              <span>// C# Kodu:</span>
              <code className="text-cyan-300 font-semibold">Array.Sort(sayiDizisi);</code>
            </div>
          </div>
        )}

        {/* 2. Array.Clear */}
        {activeAction === 'clear' && (
          <form onSubmit={handleClearSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <Eraser className="w-4 h-4" />
                  Array.Clear(sayiDizisi, index, length);
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Belirtilen indeksten başlayarak istenen adet hücreyi tipin varsayılan değerine (int için 0) sıfırlar.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">index:</span>
                  <input
                    type="number"
                    min="0"
                    max={Math.max(0, arrayLength - 1)}
                    value={clearIndex}
                    onChange={(e) => setClearIndex(Number(e.target.value))}
                    className="w-14 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">length:</span>
                  <input
                    type="number"
                    min="1"
                    max={Math.max(1, arrayLength - clearIndex)}
                    value={clearCount}
                    onChange={(e) => setClearCount(Number(e.target.value))}
                    className="w-14 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAnimating || arrayLength === 0}
                  className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Temizle (Clear)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 gap-2">
              <span>// Kullanıcı Örneği: 2. indexten başlayarak 2 tane elemanı temizler</span>
              <button
                type="button"
                onClick={() => { setClearIndex(2); setClearCount(2); }}
                className="text-rose-300 hover:underline font-semibold"
              >
                Array.Clear(sayiDizisi, 2, 2); uygula
              </button>
            </div>
          </form>
        )}

        {/* 3. Array.Reverse */}
        {activeAction === 'reverse' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <FlipHorizontal2 className="w-4 h-4" />
                  Array.Reverse(sayiDizisi);
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dizinin ortasını ayna gibi belirleyerek elemanları tersyüz eder (ilk eleman ile son eleman yer değiştirir).
                </p>
              </div>

              <button
                disabled={isAnimating || arrayLength === 0}
                onClick={onReverse}
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Tersine Çevir (Reverse)
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 flex items-center justify-between">
              <span>// Örnek: {'{1, 3, 4, 9, 8, 7}'} iken tersine çevrildiğinde {'{7, 8, 9, 4, 3, 1}'} olur</span>
              <code className="text-purple-300 font-semibold">Array.Reverse(sayiDizisi);</code>
            </div>
          </div>
        )}

        {/* 4. Array.IndexOf */}
        {activeAction === 'indexof' && (
          <form onSubmit={handleIndexOfSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Array.IndexOf(sayiDizisi, aranacakDeger);
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verilen elemanın dizideki ilk indeksini döner. Eleman dizide yoksa -1 döner.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">Aranan:</span>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="7"
                    className="w-20 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAnimating || arrayLength === 0}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  <Search className="w-3.5 h-3.5" />
                  Index Bul (IndexOf)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 gap-2">
              <span>// Örnek: 7 sayısının indeksi</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setSearchValue('7'); }}
                  className="text-amber-300 hover:underline font-semibold"
                >
                  7 Ara (İndeks: 5)
                </button>
                <span className="text-slate-600">|</span>
                <button
                  type="button"
                  onClick={() => { setSearchValue('99'); }}
                  className="text-amber-300 hover:underline font-semibold"
                >
                  99 Ara (-1 Döner)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 5. Array.Resize */}
        {activeAction === 'resize' && (
          <form onSubmit={handleResizeSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  Array.Resize&lt;int&gt;(ref sayiDizisi, {resizeTarget});
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dizileri yeniden boyutlandırır. Büyütülürse boş kalan hücrelere varsayılan (0) atanır, küçültülürse sondan kırpılır.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">Yeni Boyut:</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={resizeTarget}
                    onChange={(e) => setResizeTarget(Math.max(1, Math.min(20, Number(e.target.value))))}
                    className="w-16 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAnimating}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Boyutlandır (Resize)
                </button>
              </div>
            </div>

            {/* Quick buttons from prompt */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Prompt Örnekleri:</span>
              <button
                type="button"
                onClick={() => { setResizeTarget(12); onResize(12); }}
                className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-mono hover:bg-emerald-900 transition-colors flex items-center gap-1"
              >
                <Maximize2 className="w-3 h-3" />
                12 Eleman Yap (Genişlet)
              </button>
              <button
                type="button"
                onClick={() => { setResizeTarget(3); onResize(3); }}
                className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[11px] font-mono hover:bg-rose-900 transition-colors flex items-center gap-1"
              >
                <Minimize2 className="w-3 h-3" />
                3 Eleman Yap (Kırp: {'{1,3,4}'})
              </button>
            </div>
          </form>
        )}

        {/* 6. Assign element directly */}
        {activeAction === 'assign' && (
          <form onSubmit={handleAssignSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  sayiDizisi[{assignIndex}] = {assignValue};
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dizinin belirli bir indeksindeki elemana doğrudan yeni değer atar. (Örn: Resize sonrası 6. indekse 10 atanması)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">İndeks [i]:</span>
                  <input
                    type="number"
                    min="0"
                    max={Math.max(0, arrayLength - 1)}
                    value={assignIndex}
                    onChange={(e) => setAssignIndex(Number(e.target.value))}
                    className="w-14 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-mono">Değer:</span>
                  <input
                    type="text"
                    value={assignValue}
                    onChange={(e) => setAssignValue(e.target.value)}
                    className="w-16 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-center text-xs focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAnimating || arrayLength === 0}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  Değeri Yaz
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 gap-2">
              <span>// Örnekteki 7. elemana (indeks 6) 10 değerini atama işlemi:</span>
              <button
                type="button"
                onClick={() => { setAssignIndex(6); setAssignValue('10'); }}
                className="text-indigo-300 hover:underline font-semibold"
              >
                sayiDizisi[6] = 10; ayarla
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Modal for Custom Array Builder */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Özel Dizi Tanımla
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Virgülle ayırarak istediğiniz sayıları veya metinleri girin (maksimum 15 eleman).
            </p>

            <textarea
              rows={3}
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-cyan-200 font-mono text-sm focus:outline-none focus:border-cyan-400"
              placeholder="1, 3, 4, 9, 8, 7"
            />

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleApplyCustomArray}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                Diziyi Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
