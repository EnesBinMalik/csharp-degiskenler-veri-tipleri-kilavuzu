import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrayElement, DataType } from '../types/arrayTypes';
import { Layers, ArrowUpDown, Search, Sparkles, Edit3 } from 'lucide-react';

interface ArrayMemoryVisualizerProps {
  elements: ArrayElement[];
  dataType: DataType;
  activeMethod: string | null;
  scanningIndex: number | null;
  comparingIndices: [number, number] | null;
  clearedRange: { start: number; count: number } | null;
  foundIndex: number | null;
  mirrorCenter: number | null; // For Reverse mirroring line
  onElementClick?: (index: number) => void;
  variableName?: string;
}

export const ArrayMemoryVisualizer: React.FC<ArrayMemoryVisualizerProps> = ({
  elements,
  dataType,
  activeMethod,
  scanningIndex,
  comparingIndices,
  clearedRange,
  foundIndex,
  mirrorCenter,
  onElementClick,
  variableName = 'sayiDizisi'
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of visualizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-cyan-300">
                {dataType}[] {variableName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Length: <strong className="text-white font-mono">{elements.length}</strong>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dizi elemanlarının kavramsal gösterimi
            </p>
          </div>
        </div>

        {/* Simulation status info */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            <span>Eleman: <span className="text-emerald-300 font-semibold">{elements.length}</span></span>
          </div>
          {activeMethod && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>İşlem: {activeMethod}</span>
            </div>
          )}
        </div>
      </div>

      <p className="mb-2 text-xs text-amber-200 bg-amber-950/30 border border-amber-800/40 rounded-lg p-3">
        Tarayıcıdaki şematik simülasyondur; gerçek RAM adresi, CLR yerleşimi veya ölçülmüş bellek boyutu göstermez.
      </p>

      {/* Main Array Representation */}
      <div className="relative py-4 px-2 overflow-x-auto min-h-[190px] flex items-center justify-center">
        {elements.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">Dizi boş (Length: 0).</p>
            <p className="text-xs mt-1">Metot kontrollerinden yeni boyut belirleyerek diziyi büyütebilirsiniz.</p>
          </div>
        ) : (
          <div className="flex items-stretch gap-2.5 relative">
            {/* Mirror line if Reverse is active */}
            {mirrorCenter !== null && elements.length > 1 && (
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="h-full w-0.5 bg-gradient-to-b from-purple-500 via-pink-400 to-purple-500 shadow-lg shadow-purple-500/50" />
                <span className="absolute -top-3 px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-900/90 text-purple-200 border border-purple-500 rounded shadow-md whitespace-nowrap">
                  Ayna Ekseni (Center)
                </span>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {elements.map((el, index) => {
                const isScanning = scanningIndex === index;
                const isFound = foundIndex === index;
                const isComparing = comparingIndices ? comparingIndices.includes(index) : false;
                const isCleared = clearedRange
                  ? index >= clearedRange.start && index < clearedRange.start + clearedRange.count
                  : false;
                const isNewlyAdded = el.status === 'newly-added';

                // Determine border and background styles based on state
                let cellBorder = 'border-slate-700 bg-slate-950/70 hover:border-slate-500';
                let glowRing = '';
                let badgeLabel = null;

                if (isFound) {
                  cellBorder = 'border-emerald-500 bg-emerald-950/60 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400';
                  badgeLabel = 'Buldum! (Match)';
                } else if (isScanning) {
                  cellBorder = 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400 animate-pulse';
                  badgeLabel = 'Taranıyor...';
                } else if (isComparing) {
                  cellBorder = 'border-amber-400 bg-amber-950/60 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400';
                  badgeLabel = 'Kıyaslanıyor';
                } else if (isCleared) {
                  cellBorder = 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500/60';
                  badgeLabel = dataType === 'int' ? 'Varsayılan: 0' : 'Varsayılan: null';
                } else if (isNewlyAdded) {
                  cellBorder = 'border-dashed border-emerald-400/80 bg-emerald-950/20';
                  badgeLabel = 'Yeni Hücre';
                }

                return (
                  <motion.div
                    key={el.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    onClick={() => onElementClick && onElementClick(index)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Index header indicator: [0], [1], etc. */}
                    <div className="flex flex-col items-center mb-1.5">
                      <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded transition-colors ${
                        isScanning || isFound || isComparing
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 group-hover:text-cyan-300 bg-slate-800/80'
                      }`}>
                        [{index}]
                      </span>
                      {/* Arrow pointer for scanning */}
                      {isScanning && (
                        <motion.div
                          animate={{ y: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          className="text-cyan-400 -mb-1"
                        >
                          ▼
                        </motion.div>
                      )}
                    </div>

                    {/* Array Cell Box */}
                    <div
                      className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl border flex flex-col items-center justify-center p-2 relative transition-all duration-200 select-none ${cellBorder} ${glowRing}`}
                    >
                      {/* Status pill badge on top inside card */}
                      {badgeLabel && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 whitespace-nowrap shadow-sm">
                          {badgeLabel}
                        </span>
                      )}

                      {/* Value display */}
                      <span className={`text-xl sm:text-2xl font-mono font-bold tracking-tight ${
                        isFound
                          ? 'text-emerald-300'
                          : isCleared
                          ? 'text-rose-300'
                          : isScanning
                          ? 'text-cyan-200'
                          : 'text-slate-100 group-hover:text-white'
                      }`}>
                        {String(el.value)}
                      </span>

                      {/* Type hint and quick edit icon on hover */}
                      <div className="mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-cyan-400">
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Değiştir</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Visualizer Legend / Helper note */}
      <div className="mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-600" />
            Normal Hücre
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/40 border border-cyan-400" />
            Taranan (IndexOf)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-400" />
            Bulunan Eşleşme
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40 border border-rose-400" />
            Varsayılan değere sıfırlanan (Clear)
          </span>
        </div>

        <div className="text-slate-400 text-[11px] italic">
          💡 İpucu: Herhangi bir hücreye tıklayarak değerini doğrudan değiştirebilirsiniz (örn: <code className="text-cyan-300">sayiDizisi[6] = 10;</code>)
        </div>
      </div>
    </div>
  );
};
