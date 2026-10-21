import React, { useState } from 'react';
import { ArrayListItem, DataType } from '../types';
import {
  Plus,
  Trash2,
  RotateCcw,
  Layers,
  Zap,
  Info,
  ArrowRight,
  Sparkles,
  BoxSelect,
  AlertTriangle,
  Play
} from 'lucide-react';

export const CapacityVisualizer: React.FC = () => {
  // The sample represents an ArrayList after three items have been added.
  const [items, setItems] = useState<ArrayListItem[]>([
    { id: '1', value: 'Kedi', displayValue: '"Kedi"', type: 'string', isBoxed: false, addedAt: 1 },
    { id: '2', value: 99, displayValue: '99', type: 'int', isBoxed: true, addedAt: 2 },
    { id: '3', value: true, displayValue: 'true', type: 'bool', isBoxed: true, addedAt: 3 },
  ]);

  const [capacity, setCapacity] = useState<number>(4);
  const [lastDoublingEvent, setLastDoublingEvent] = useState<{
    from: number;
    to: number;
    atIndex: number;
    timestamp: number;
  } | null>(null);

  const [inputVal, setInputVal] = useState<string>('Kahve');
  const [selectedType, setSelectedType] = useState<DataType>('string');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  // Calculate capacity expansion if an item is added
  const handleAddItem = (customVal?: { val: any; type: DataType; display: string }) => {
    const typeToAdd = customVal ? customVal.type : selectedType;
    let actualVal: any = customVal ? customVal.val : inputVal;
    let display = customVal ? customVal.display : inputVal;

    if (!customVal) {
      if (selectedType === 'int') {
        const parsed = parseInt(inputVal, 10);
        actualVal = isNaN(parsed) ? 42 : parsed;
        display = String(actualVal);
      } else if (selectedType === 'bool') {
        actualVal = inputVal.toLowerCase() === 'true' || inputVal === '1';
        display = String(actualVal);
      } else if (selectedType === 'double') {
        const parsed = parseFloat(inputVal);
        actualVal = isNaN(parsed) ? 3.14 : parsed;
        display = String(actualVal);
      } else if (selectedType === 'string') {
        display = `"${actualVal}"`;
      }
    }

    const newItem: ArrayListItem = {
      id: Math.random().toString(36).substring(2, 9),
      value: actualVal,
      displayValue: display,
      type: typeToAdd,
      isBoxed: typeToAdd !== 'string' && typeToAdd !== 'object', // value types are boxed
      addedAt: Date.now(),
    };

    const newCount = items.length + 1;
    let currentCap = capacity;

    if (newCount > currentCap) {
      // Doubled automatically: 4 -> 8 -> 16 -> 32
      const newCap = currentCap === 0 ? 4 : currentCap * 2;
      setCapacity(newCap);
      setLastDoublingEvent({
        from: currentCap,
        to: newCap,
        atIndex: newCount,
        timestamp: Date.now(),
      });
    }

    setItems([...items, newItem]);
    setHighlightIndex(items.length);
    setTimeout(() => setHighlightIndex(null), 1200);
  };

  const handleRemoveLast = () => {
    if (items.length === 0) return;
    setItems(items.slice(0, -1));
  };

  const handleReset = () => {
    setItems([]);
    setCapacity(0);
    setLastDoublingEvent(null);
  };

  const handleLoadUserExample = () => {
    setCapacity(4);
    setItems([
      { id: '1', value: 'Kedi', displayValue: '"Kedi"', type: 'string', isBoxed: false, addedAt: 1 },
      { id: '2', value: 99, displayValue: '99', type: 'int', isBoxed: true, addedAt: 2 },
      { id: '3', value: true, displayValue: 'true', type: 'bool', isBoxed: true, addedAt: 3 },
    ]);
    setLastDoublingEvent(null);
  };

  const handleFillToFourth = () => {
    setCapacity(4);
    setItems([
      { id: '1', value: 'Kedi', displayValue: '"Kedi"', type: 'string', isBoxed: false, addedAt: 1 },
      { id: '2', value: 99, displayValue: '99', type: 'int', isBoxed: true, addedAt: 2 },
      { id: '3', value: true, displayValue: 'true', type: 'bool', isBoxed: true, addedAt: 3 },
      { id: '4', value: 3.14, displayValue: '3.14', type: 'double', isBoxed: true, addedAt: 4 },
    ]);
    setLastDoublingEvent(null);
  };

  const handleTriggerDoubling = () => {
    // Set to 4, then immediately add 5th to trigger 4 -> 8
    setCapacity(4);
    const initial4: ArrayListItem[] = [
      { id: '1', value: 'Kedi', displayValue: '"Kedi"', type: 'string', isBoxed: false, addedAt: 1 },
      { id: '2', value: 99, displayValue: '99', type: 'int', isBoxed: true, addedAt: 2 },
      { id: '3', value: true, displayValue: 'true', type: 'bool', isBoxed: true, addedAt: 3 },
      { id: '4', value: 3.14, displayValue: '3.14', type: 'double', isBoxed: true, addedAt: 4 },
    ];
    setItems(initial4);

    setTimeout(() => {
      setCapacity(8);
      const fifth: ArrayListItem = {
        id: '5',
        value: '5. Eleman!',
        displayValue: '"5. Eleman!"',
        type: 'string',
        isBoxed: false,
        addedAt: 5,
      };
      setItems([...initial4, fifth]);
      setLastDoublingEvent({
        from: 4,
        to: 8,
        atIndex: 5,
        timestamp: Date.now(),
      });
      setHighlightIndex(4);
      setTimeout(() => setHighlightIndex(null), 1500);
    }, 400);
  };

  const count = items.length;
  const isFull = capacity > 0 && count === capacity;
  const occupancyPercent = capacity > 0 ? Math.round((count / capacity) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1: Count */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>ELEMAN SAYISI (Count)</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{count}</span>
            <span className="text-xs text-slate-400">öğe yüklü</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            dizi.Count özelliği ile okunur
          </div>
        </div>

        {/* Metric 2: Capacity */}
        <div className="bg-slate-900/90 border border-indigo-900/50 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-indigo-300 text-xs font-medium">
            <span>KAPASİTE (Capacity)</span>
            <BoxSelect className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-300 font-mono">{capacity}</span>
            <span className="text-xs text-indigo-200/80">slot ayrıldı</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            {capacity === 0
              ? 'Boş liste: henüz iç dizi ayrılmadı'
              : count <= 4 && capacity === 4
                ? 'İlk eklemeden sonraki örnek kapasite'
                : `Simülasyon kapasitesi: ${capacity}`}
          </div>
        </div>

        {/* Metric 3: Occupancy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>DOLULUK ORANI</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">%{occupancyPercent}</span>
            <span className="text-xs text-slate-400">({count} / {capacity})</span>
          </div>
          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${occupancyPercent >= 100 ? 'bg-amber-500' : 'bg-indigo-500'}`}
              style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Next Expansion */}
        <div className={`rounded-xl p-4 flex flex-col justify-between border transition-all ${
          isFull
            ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
            : 'bg-slate-900/90 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between text-xs font-medium">
            <span>BİR SONRAKİ İŞLEM</span>
            {isFull ? <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" /> : <Info className="w-4 h-4 text-slate-400" />}
          </div>
          <div className="mt-2">
            {isFull ? (
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">⚠️ Boyut Katlanacak!</span>
                <p className="text-xs text-amber-300/90 mt-0.5">
                  1 eleman daha eklenirse kapasite <strong className="font-mono text-white">{capacity} ➔ {capacity * 2}</strong> olacak!
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold text-slate-200">Kapasite Yeterli</span>
                <p className="text-xs text-slate-400 mt-0.5">
                  <strong className="font-mono text-indigo-400">{capacity - count}</strong> slot boş. Yeniden tahsis gerekmez.
                </p>
              </div>
            )}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Arka plan: object[] dizisi kopyalanır
          </div>
        </div>
      </div>

      {/* Dynamic capacity alert for the simulated growth scenario */}
      {lastDoublingEvent && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-950/60 via-indigo-950/60 to-purple-950/60 border border-amber-500/40 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Zap className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <span>Simülasyonda kapasite artışı:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-xs font-mono font-bold">
                    Kapasite {lastDoublingEvent.from} ➔ {lastDoublingEvent.to} Oldu!
                  </span>
                </h4>
                <span className="text-[11px] text-slate-400">Az önce</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                <strong className="text-white">"{lastDoublingEvent.atIndex}. öğe"</strong> eklenirken modelin kapasitesi (<span className="font-mono text-amber-300">{lastDoublingEvent.from}</span>) aşıldı.
                Bu eğitim simülasyonu, <strong className="text-amber-200 font-mono">{lastDoublingEvent.to}</strong> slotluk yeni bir iç dizi ayrıldığını ve öğelerin kopyalandığını gösterir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Memory Slots View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BoxSelect className="w-4 h-4 text-indigo-400" />
                ArrayList Bellek Düzeni (object[] slots)
              </h3>
              <span className="px-2 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                RAM Simülasyonu
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              ArrayList arka planda <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">object[]</code> tutar.
              Her slot nesne referansı saklar.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadUserExample}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Örnek 3 Elemanı Yükle
            </button>
            <button
              onClick={handleFillToFourth}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition flex items-center gap-1.5"
            >
              4'e Doldur (Sınır)
            </button>
            <button
              onClick={handleTriggerDoubling}
              className="px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              5. Eleman Testi (4➔8)
            </button>
          </div>
        </div>

        {/* The Visual Slots Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {Array.from({ length: capacity }).map((_, idx) => {
              const item = items[idx];
              const isOccupied = !!item;
              const isRecentlyAdded = highlightIndex === idx;

              return (
                <div
                  key={idx}
                  className={`relative rounded-xl border p-3 flex flex-col justify-between min-h-[130px] transition-all duration-300 ${
                    isRecentlyAdded
                      ? 'border-indigo-400 bg-indigo-950/70 shadow-lg shadow-indigo-500/30 scale-[1.03]'
                      : isOccupied
                      ? 'border-slate-700 bg-slate-800/80 hover:border-slate-600'
                      : 'border-dashed border-slate-800 bg-slate-950/50 hover:border-slate-700'
                  }`}
                >
                  {/* Slot Header: Index & Memory offset */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 font-bold">[{idx}]</span>
                    <span className="text-[10px] text-slate-400">
                      ptr_{idx}
                    </span>
                  </div>

                  {/* Slot Content */}
                  <div className="my-2 flex flex-col items-center justify-center text-center">
                    {isOccupied ? (
                      <>
                        <span className="text-xs font-bold text-white font-mono break-all px-1 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 max-w-full">
                          {item.displayValue}
                        </span>

                        {/* Type badge */}
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                            item.type === 'string'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : item.type === 'int'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : item.type === 'bool'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.type}
                          </span>

                          {item.isBoxed && (
                            <span
                              className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              title="Değer tipi object'e sarmalandı (Boxing maliyeti)"
                            >
                              📦 Boxed
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-slate-400 flex flex-col items-center justify-center py-2">
                        <span className="text-[11px] font-mono italic">boş slot</span>
                        <span className="text-[10px] text-slate-400 mt-1">(null)</span>
                      </div>
                    )}
                  </div>

                  {/* Slot Footer Status */}
                  <div className="text-[10px] text-center font-mono">
                    {isOccupied ? (
                      <span className="text-indigo-400/90 text-[10px]">object ref</span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">boş dizi yuvası</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacity Doubling Flow Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Yaygın büyüme örneği:</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className={`px-2 py-0.5 rounded ${capacity === 0 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>0</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className={`px-2 py-0.5 rounded ${capacity === 4 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>4</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className={`px-2 py-0.5 rounded ${capacity === 8 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>8</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className={`px-2 py-0.5 rounded ${capacity === 16 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>16</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className={`px-2 py-0.5 rounded ${capacity === 32 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>32</span>
            </div>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            {isFull ? (
              <span className="text-amber-400 font-semibold">Sonraki Add(): Kapasite ➔ {capacity * 2}</span>
            ) : (
              <span>Sonraki Add(): Slot [{items.length}]'e yazılacak</span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Add Element, Choose Types, Pre-set items */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          ArrayList'e Eleman Ekle (dizi.Add(...))
        </h4>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Quick predefined buttons from user prompt */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleAddItem({ val: 'Kedi', type: 'string', display: '"Kedi"' })}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-emerald-300 transition flex items-center gap-1.5"
            >
              <span>+ dizi.Add("Kedi")</span>
              <span className="text-[10px] text-slate-400">(string)</span>
            </button>

            <button
              onClick={() => handleAddItem({ val: 99, type: 'int', display: '99' })}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-blue-300 transition flex items-center gap-1.5"
            >
              <span>+ dizi.Add(99)</span>
              <span className="text-[10px] text-slate-400">(int)</span>
            </button>

            <button
              onClick={() => handleAddItem({ val: true, type: 'bool', display: 'true' })}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-purple-300 transition flex items-center gap-1.5"
            >
              <span>+ dizi.Add(true)</span>
              <span className="text-[10px] text-slate-400">(bool)</span>
            </button>
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-800" />

          {/* Custom Input */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch gap-2">
            <select
              value={selectedType}
              onChange={(e) => {
                const t = e.target.value as DataType;
                setSelectedType(t);
                if (t === 'string') setInputVal('Kitap');
                if (t === 'int') setInputVal('100');
                if (t === 'bool') setInputVal('false');
                if (t === 'double') setInputVal('2.718');
              }}
              aria-label="Veri Tipi Seçin"
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="string">string (Referans)</option>
              <option value="int">int (Değer - Boxed)</option>
              <option value="bool">bool (Değer - Boxed)</option>
              <option value="double">double (Değer - Boxed)</option>
            </select>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Değer girin..."
              aria-label="Eklenecek Değer"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />

            <button
              onClick={() => handleAddItem()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              Ekle
            </button>
          </div>

          {/* Removal Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemoveLast}
              disabled={items.length === 0}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs transition flex items-center gap-1"
              title="Son eklenen elemanı sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Sonuncuyu Sil
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs transition flex items-center gap-1"
              title="Tüm diziyi sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
