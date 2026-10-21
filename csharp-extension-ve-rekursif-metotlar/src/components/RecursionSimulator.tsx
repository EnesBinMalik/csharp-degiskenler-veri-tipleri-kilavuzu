import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RecursionAlgorithm, RecursionStep } from '../types';
import {
  ALGORITHM_CODES,
  generateFibonacciSteps,
  generateFactorialSteps,
  generatePowerSteps,
  generateReverseSteps,
  generateOverflowSteps
} from '../utils/recursionEngine';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Layers,
  GitBranch,
  AlertOctagon,
  CheckCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';

export const RecursionSimulator: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<RecursionAlgorithm>('fibonacci');
  const [fibInput, setFibInput] = useState<number>(4);
  const [factInput, setFactInput] = useState<number>(4);
  const [powerBase, setPowerBase] = useState<number>(2);
  const [powerExp, setPowerExp] = useState<number>(3);
  const [reverseText, setReverseText] = useState<string>('ENES');

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step

  // Generate steps based on input
  const steps: RecursionStep[] = useMemo(() => {
    switch (selectedAlgo) {
      case 'fibonacci':
        return generateFibonacciSteps(Math.min(Math.max(fibInput, 0), 6));
      case 'factorial':
        return generateFactorialSteps(Math.min(Math.max(factInput, 0), 6));
      case 'power':
        return generatePowerSteps(powerBase, Math.min(Math.max(powerExp, 0), 5));
      case 'reverse':
        return generateReverseSteps(reverseText.slice(0, 5));
      case 'overflow_demo':
        return generateOverflowSteps();
      default:
        return [];
    }
  }, [selectedAlgo, fibInput, factInput, powerBase, powerExp, reverseText]);

  // Reset step when steps change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // Playback timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  const currentStep = steps[currentStepIndex] || {
    stepIndex: 0,
    description: 'Hazır.',
    stack: [],
    treeNodes: [],
    activeLine: 1
  };

  const codeLines = ALGORITHM_CODES[selectedAlgo] || [];

  return (
    <div className="space-y-8">

      {/* Title & Algorithm Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Rekürsif Analiz Laboratuvarı</span>
            <span aria-hidden="true">·</span>
            <span>Çağrı Yığını Görselleştirici</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400">Enes Öztürk Özel Modülü</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Rekürsif Metot & Call Stack Simülatörü
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Rekürsif çağrıların ve dönüşlerin kavramsal akışını adım adım izleyin. Bu tarayıcı simülatörü C# kodu çalıştırmaz veya gerçek CLR bellek kullanımını ölçmez.
          </p>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setSelectedAlgo('fibonacci')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedAlgo === 'fibonacci'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fibonacci(n)
          </button>
          <button
            onClick={() => setSelectedAlgo('factorial')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedAlgo === 'factorial'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Faktöriyel(n)
          </button>
          <button
            onClick={() => setSelectedAlgo('power')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedAlgo === 'power'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Üs Alma(a^b)
          </button>
          <button
            onClick={() => setSelectedAlgo('reverse')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedAlgo === 'reverse'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ters Çevir
          </button>
          <button
            onClick={() => setSelectedAlgo('overflow_demo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedAlgo === 'overflow_demo'
                ? 'bg-rose-500 text-white font-bold shadow-sm'
                : 'text-rose-400 hover:text-rose-200'
            }`}
          >
            Derin Çağrı Riski (Görsel)
          </button>
        </div>
      </div>

      {/* Parameter Control Deck */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">

        {/* Dynamic Inputs based on algorithm */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {selectedAlgo === 'fibonacci' && (
            <div className="flex items-center gap-3">
              <label className="text-slate-300 font-medium">Hesaplanacak Sayı (n):</label>
              <div className="flex items-center gap-1.5">
                {[2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFibInput(val)}
                    className={`w-8 h-8 rounded-lg font-mono font-semibold transition-colors ${
                      fibInput === val
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <span className="text-slate-400 text-[11px]">(Prompt örneğindeki Fibonacci algoritması)</span>
            </div>
          )}

          {selectedAlgo === 'factorial' && (
            <div className="flex items-center gap-3">
              <label className="text-slate-300 font-medium">Faktöriyel Sayısı (n!):</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFactInput(val)}
                    className={`w-8 h-8 rounded-lg font-mono font-semibold transition-colors ${
                      factInput === val
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedAlgo === 'power' && (
            <div className="flex items-center gap-3">
              <label className="text-slate-300 font-medium">Taban:</label>
              <input
                type="number"
                value={powerBase}
                onChange={(e) => setPowerBase(Number(e.target.value) || 2)}
                className="w-14 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-center font-mono text-cyan-300"
                min="1"
                max="10"
              />
              <label className="text-slate-300 font-medium ml-2">Üs:</label>
              <input
                type="number"
                value={powerExp}
                onChange={(e) => setPowerExp(Math.min(Math.max(Number(e.target.value) || 0, 0), 4))}
                className="w-14 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-center font-mono text-cyan-300"
                min="0"
                max="4"
              />
            </div>
          )}

          {selectedAlgo === 'reverse' && (
            <div className="flex items-center gap-3">
              <label className="text-slate-300 font-medium">Ters Çevrilecek Metin:</label>
              <input
                type="text"
                value={reverseText}
                maxLength={6}
                onChange={(e) => setReverseText(e.target.value)}
                className="px-3 py-1 bg-slate-950 border border-slate-700 rounded font-mono text-cyan-300 uppercase tracking-widest text-xs"
              />
            </div>
          )}

          {selectedAlgo === 'overflow_demo' && (
            <div className="flex items-center gap-2 text-rose-300">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Taban durumu olmayan örnek için sınırlı çağrı zinciri gösterimi; gerçek bir hata oluşturulmaz.</span>
            </div>
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Step Back button */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Önceki Adım"
          >
            <RotateCcw className="w-4 h-4 scale-x-[-1]" />
          </button>

          {/* Play / Pause button */}
          <button
            onClick={() => {
              if (currentStepIndex >= steps.length - 1) {
                setCurrentStepIndex(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStepIndex >= steps.length - 1 ? 'Tekrar Başlat' : 'Oynat'}</span>
              </>
            )}
          </button>

          {/* Step Forward button */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
            }}
            disabled={currentStepIndex >= steps.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Sonraki Adım"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed selector */}
          <div className="ml-2 pl-2 border-l border-slate-700 flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <span>Hız:</span>
            {[
              { label: '0.5x', ms: 1600 },
              { label: '1x', ms: 1000 },
              { label: '2x', ms: 500 }
            ].map((spd) => (
              <button
                key={spd.label}
                onClick={() => setPlaybackSpeed(spd.ms)}
                className={`px-1.5 py-0.5 rounded ${
                  playbackSpeed === spd.ms ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-slate-200'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Step Description Strip */}
      <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
        currentStep.isOverflow
          ? 'bg-rose-950/40 border-rose-700 text-rose-200'
          : currentStep.isComplete
          ? 'bg-emerald-950/30 border-emerald-700/60 text-emerald-200'
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
            currentStep.isOverflow ? 'bg-rose-500 text-white' : currentStep.isComplete ? 'bg-emerald-500 text-slate-950' : 'bg-cyan-500/20 text-cyan-400'
          }`}>
            {currentStepIndex + 1}/{steps.length}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Adım {currentStepIndex + 1} Açıklaması</div>
            <div className="text-sm font-medium mt-0.5">{currentStep.description}</div>
          </div>
        </div>

        {currentStep.highlightVar && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs shrink-0">
            <span className="text-slate-400">{currentStep.highlightVar.name}:</span>
            <span className="text-cyan-400 font-bold">{currentStep.highlightVar.value}</span>
          </div>
        )}
      </div>

      {/* 2-Zone Sandbox Split: Left Code & Tree, Right Visual Call Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: Code Viewer + Call Tree (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Synchronized C# Code Viewer */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
            <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-slate-300">Program.cs (Kavramsal örnek)</span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Aktif Satır: {currentStep.activeLine}</span>
              </div>
            </div>

            <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed">
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isActive = lineNum === currentStep.activeLine;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-2 py-1 rounded transition-colors ${
                      isActive ? 'bg-cyan-500/15 border-l-2 border-cyan-400 text-white font-medium' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-6 text-slate-600 select-none text-right pr-3 font-mono text-[11px] tabular-nums">
                      {lineNum}
                    </span>
                    <span className="font-mono">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Call Tree / Graph */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Özyineleme Çağrı Ağacı (Call Tree)</h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {currentStep.treeNodes.length} Düğüm Oluştu
              </span>
            </div>

            {/* Tree nodes visualization */}
            <div className="min-h-[160px] max-h-[300px] overflow-y-auto p-2 space-y-2">
              {currentStep.treeNodes.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-8">
                  Çağrı henüz başlamadı. 'Oynat' veya 'Sonraki Adım' butonuna tıklayın.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentStep.treeNodes.map((node) => {
                    const isResolved = node.status === 'resolved';
                    const isError = node.status === 'error';
                    const isWaiting = node.status === 'waiting';
                    return (
                      <div
                        key={node.id}
                        className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                          isError
                            ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                            : isResolved
                            ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300'
                            : isWaiting
                            ? 'bg-amber-950/30 border-amber-600/40 text-amber-200'
                            : 'bg-cyan-950/50 border-cyan-500 text-cyan-200 shadow-sm'
                        }`}
                      >
                        <span className="font-semibold">{node.label}</span>
                        {node.result !== undefined && (
                          <span className="text-[11px] bg-slate-900/80 px-1.5 py-0.5 rounded text-emerald-400">
                            → {node.result}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                <span>Aktif Çerçeve</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                <span>Dallanmayı Bekliyor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-400" />
                <span>Sonuçlandı (Geri Döndü)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: The Living Stack (Call Stack Visualizer) (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">

          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Yığın Bellek (Call Stack)</h3>
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Derinlik: {currentStep.stack.length} Frame
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Bu kavramsal modelde yeni çağrılar tepeye (TOP) eklenir (Push); dönüş yapan çağrılar tepeden çıkarılır (Pop). Gerçek CLR yığınını görüntülemez.
            </p>

            {/* Stack Visual Bucket */}
            <div className="relative border-2 border-slate-800 border-t-0 rounded-b-2xl p-3 min-h-[340px] max-h-[460px] overflow-y-auto bg-slate-900/40 flex flex-col-reverse gap-2.5">

              {currentStep.stack.length === 0 ? (
                <div className="m-auto text-center py-12 text-slate-400 text-xs">
                  <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-40" />
                  <span>Yığın şu an boş (Stack is empty).</span>
                  {currentStep.isComplete && (
                    <div className="mt-2 text-emerald-400 font-semibold">
                      Tüm rekürsif çağrılar tamamlandı!
                    </div>
                  )}
                </div>
              ) : (
                currentStep.stack.map((frame, idx) => {
                  const isTop = idx === currentStep.stack.length - 1;
                  return (
                    <div
                      key={frame.id}
                      className={`p-3.5 rounded-xl border transition-all text-xs font-mono ${
                        isTop
                          ? currentStep.isOverflow
                            ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-md ring-2 ring-rose-500/40'
                            : 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                          {isTop && <span className="text-[10px] bg-cyan-400 text-slate-950 px-1 rounded font-sans font-bold">TOP</span>}
                          <span>Frame #{idx + 1}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {frame.state === 'calling' ? 'Çalışıyor' : frame.state === 'waiting' ? 'Dönüş Bekliyor' : 'Dönüş Yapıyor'}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white mb-2">
                        {frame.callDescription}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <div>
                          <span className="text-slate-400">Parametre:</span>{' '}
                          <span className="text-cyan-200 font-bold">
                            {Object.entries(frame.params).map(([k, v]) => `${k}=${v}`).join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Dönüş Değeri:</span>{' '}
                          <span className="text-emerald-400 font-bold">
                            {frame.returnValue !== undefined ? frame.returnValue : 'Beklemede...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

            </div>
          </div>

          {/* Stack Footnotes */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Gösterim:</span>
              <span className="font-mono text-slate-300">Kavramsal · gerçek CLR ölçümü değildir</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
