import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Info,
  Sliders,
  Sparkles
} from 'lucide-react';
import { LESSON_CONTENT } from '../data/lessonsData';

export const WhileVisualizer: React.FC = () => {
  // Configurable parameters
  const [initialValue, setInitialValue] = useState<number>(1);
  const [limitValue, setLimitValue] = useState<number>(5);
  const [stepIncrement, setStepIncrement] = useState<number>(1);

  // Simulation execution steps generated dynamically
  interface SimulationStep {
    line: number; // 1: init, 2: condition, 4: print, 5: increment, 6: end
    sayac: number;
    conditionEvaluated: boolean;
    conditionResult: boolean | null;
    consoleLogs: string[];
    explanation: string;
    isFinished: boolean;
    simulationLimitReached?: boolean;
  }

  // Generate steps based on parameters
  const steps: SimulationStep[] = React.useMemo(() => {
    const list: SimulationStep[] = [];
    const logs: string[] = [];
    let currentSayac = initialValue;

    // Line 1: init
    list.push({
      line: 1,
      sayac: currentSayac,
      conditionEvaluated: false,
      conditionResult: null,
      consoleLogs: [...logs],
      explanation: `Başlangıç değeri atandı: int sayac = ${currentSayac};`,
      isFinished: false
    });

    let iterations = 0;
    const maxSafety = 50;

    while (currentSayac <= limitValue && iterations < maxSafety) {
      iterations++;
      // Line 2: check condition (true)
      list.push({
        line: 2,
        sayac: currentSayac,
        conditionEvaluated: true,
        conditionResult: true,
        consoleLogs: [...logs],
        explanation: `Koşul kontrolü: sayac <= ${limitValue} -> (${currentSayac} <= ${limitValue}) = DOĞRU (true). Döngü içine giriliyor.`,
        isFinished: false
      });

      // Line 4: Console.WriteLine(sayac);
      logs.push(currentSayac.toString());
      list.push({
        line: 4,
        sayac: currentSayac,
        conditionEvaluated: false,
        conditionResult: true,
        consoleLogs: [...logs],
        explanation: `Örnek akışta Console.WriteLine(sayac) çağrısının çıktısı "${currentSayac}" olarak gösterildi.`,
        isFinished: false
      });

      // Line 5: sayac++ or increment
      const oldVal = currentSayac;
      currentSayac += stepIncrement;
      list.push({
        line: 5,
        sayac: currentSayac,
        conditionEvaluated: false,
        conditionResult: null,
        consoleLogs: [...logs],
        explanation: `sayac değeri ${stepIncrement} artırıldı (${stepIncrement === 1 ? 'sayac++' : `sayac += ${stepIncrement}`}): ${oldVal} -> ${currentSayac}`,
        isFinished: false
      });
    }

    const simulationLimitReached = currentSayac <= limitValue;

    list.push({
      line: 2,
      sayac: currentSayac,
      conditionEvaluated: true,
      conditionResult: simulationLimitReached,
      consoleLogs: [...logs],
      explanation: simulationLimitReached
        ? `Güvenlik amacıyla gösterim ${maxSafety} iterasyonda durduruldu. Mevcut koşul (${currentSayac} <= ${limitValue}) hâlâ true; gerçek C# döngüsü devam ederdi.`
        : `Koşul kontrolü: sayac <= ${limitValue} -> (${currentSayac} <= ${limitValue}) = YANLIŞ (false). Koşul sağlanmadığı için döngü sonlandı!`,
      isFinished: !simulationLimitReached,
      simulationLimitReached
    });

    return list;
  }, [initialValue, limitValue, stepIncrement]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset step index if parameters change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [initialValue, limitValue, stepIncrement]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                1. DÖNGÜ TİPİ
              </span>
              <span className="text-xs text-slate-400">Koşula Bağlı İterasyon</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              While Döngüsü
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-indigo-400 font-semibold">Enes Öztürk Açıklaması:</span>{' '}
            "{LESSON_CONTENT.whileSection.definition}"
          </div>
        </div>

        {/* User's exact explanation paragraph */}
        <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 text-slate-300 text-sm leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-white mb-1">Örnek İncelemesi:</p>
            <p>{LESSON_CONTENT.whileSection.explanation}</p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Code & Live Execution Pointer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-400 ml-2">Program.cs (While Simülatörü)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Adım {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Code Viewer with active line highlight */}
          <div className="p-4 sm:p-6 font-mono text-sm bg-slate-950 flex-grow select-none">
            <div className="space-y-1.5">
              {/* Line 1 */}
              <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
                currentStep.line === 1
                  ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900/60'
              }`}>
                <span className="w-6 text-slate-600 text-xs select-none">1</span>
                <span>
                  <span className="text-sky-400">int</span> sayac = <span className="text-emerald-400">{initialValue}</span>;
                </span>
                {currentStep.line === 1 && (
                  <span className="ml-auto text-[11px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                    ← Şu anki satır (Değişken tanımlandı)
                  </span>
                )}
              </div>

              {/* Line 2 */}
              <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
                currentStep.line === 2
                  ? 'bg-indigo-500/20 text-indigo-200 border-l-4 border-indigo-400 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900/60'
              }`}>
                <span className="w-6 text-slate-600 text-xs select-none">2</span>
                <span>
                  <span className="text-purple-400">while</span> (sayac &lt;= <span className="text-emerald-400">{limitValue}</span>)
                </span>
                {currentStep.line === 2 && (
                  <span className={`ml-auto text-[11px] px-2 py-0.5 rounded font-mono ${
                    currentStep.conditionResult === true
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {currentStep.conditionResult === true ? '✓ TRUE (Döngüye Gir)' : '✗ FALSE (Döngüyü Bitir)'}
                  </span>
                )}
              </div>

              {/* Line 3 */}
              <div className="flex items-center gap-3 px-3 py-1 text-slate-500">
                <span className="w-6 text-slate-700 text-xs select-none">3</span>
                <span>{'{'}</span>
              </div>

              {/* Line 4 */}
              <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
                currentStep.line === 4
                  ? 'bg-emerald-500/20 text-emerald-200 border-l-4 border-emerald-400 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900/60'
              }`}>
                <span className="w-6 text-slate-600 text-xs select-none">4</span>
                <span className="pl-4">
                  <span className="text-cyan-400">Console</span>.<span className="text-yellow-300">WriteLine</span>(sayac);
                </span>
                {currentStep.line === 4 && (
                  <span className="ml-auto text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                    ← Konsola yazdırılıyor: "{currentStep.sayac}"
                  </span>
                )}
              </div>

              {/* Line 5 */}
              <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
                currentStep.line === 5
                  ? 'bg-purple-500/20 text-purple-200 border-l-4 border-purple-400 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900/60'
              }`}>
                <span className="w-6 text-slate-600 text-xs select-none">5</span>
                <span className="pl-4">
                  {stepIncrement === 1 ? <>sayac<span className="text-rose-400">++</span></> : <>sayac += <span className="text-emerald-400">{stepIncrement}</span></>};
                </span>
                {currentStep.line === 5 && (
                  <span className="ml-auto text-[11px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                    ← Sayaç {stepIncrement} artırıldı
                  </span>
                )}
              </div>

              {/* Line 6 */}
              <div className="flex items-center gap-3 px-3 py-1 text-slate-500">
                <span className="w-6 text-slate-700 text-xs select-none">6</span>
                <span>{'}'}</span>
              </div>
            </div>
          </div>

          {/* Stepper Controls Bar */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-all cursor-pointer"
                title="Önceki Adım"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" /> Duraklat
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Otomatik Yürüt
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === steps.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-all cursor-pointer"
                title="Sonraki Adım"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                title="Döngüyü Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed selection */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Hız:</span>
              <button
                onClick={() => setPlaybackSpeed(1800)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 1800 ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                0.7x
              </button>
              <button
                onClick={() => setPlaybackSpeed(1100)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 1100 ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                1x
              </button>
              <button
                onClick={() => setPlaybackSpeed(500)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 500 ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                2x
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Memory, Condition Checker, and Terminal Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Active Step Explanation */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-md">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Adım Açıklaması (Akış Simülasyonu)
            </h3>
            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              {currentStep.explanation}
            </p>
          </div>

          {/* Memory Inspector (RAM State) */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-md">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Simüle Edilen Değişkenler</span>
              <span className="text-[10px] text-indigo-400 font-mono">TARAYICI</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Sayac Variable */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-[11px] text-indigo-400 font-mono mb-1">int sayac</div>
                <div className="text-3xl font-extrabold text-white font-mono tracking-tight transition-transform duration-300">
                  {currentStep.sayac}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Anlık Değer</div>
              </div>

              {/* Condition State */}
              <div className={`p-3.5 rounded-xl border flex flex-col items-center justify-center ${
                currentStep.conditionResult === true
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : currentStep.conditionResult === false
                  ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="text-[11px] font-mono mb-1">Koşul: sayac &lt;= {limitValue}</div>
                <div className="text-xl font-bold font-mono">
                  {currentStep.sayac} &lt;= {limitValue}
                </div>
                <div className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
                  {currentStep.simulationLimitReached
                    ? 'Gösterim sınırında'
                    : currentStep.conditionResult === true
                    ? '✓ True (Devam)'
                    : currentStep.conditionResult === false
                    ? '✗ False (Döngü Bitti)'
                    : 'Değerlendirilmedi'}
                </div>
              </div>
            </div>
          </div>

          {/* Live C# Console Output */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl flex-grow flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold">Örnek Konsol Çıktısı</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Tarayıcı simülasyonu</span>
            </div>

            <div className="font-mono text-sm bg-black/60 rounded-xl p-3 border border-slate-900 h-32 overflow-y-auto space-y-1 text-emerald-400">
              <div className="text-[10px] text-slate-500">Örnek çıktı · C# kodu çalıştırılmıyor</div>
              {currentStep.consoleLogs.length === 0 ? (
                <span className="text-slate-600 italic text-xs">Henüz örnek çıktı yok. Simülasyon ilerledikçe sayılar burada gösterilir...</span>
              ) : (
                currentStep.consoleLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-600 text-xs">&gt;</span>
                    <span className="font-bold">{log}</span>
                  </div>
                ))
              )}
              {currentStep.isFinished && (
                <div className="pt-2 text-xs text-slate-500 border-t border-slate-900">
                  Örnek döngünün koşulu false oldu; akış döngü sonrasına geçer.
                </div>
              )}
              {currentStep.simulationLimitReached && (
                <div className="pt-2 text-xs text-amber-300 border-t border-amber-900">
                  Gösterim 50 iterasyonda durdu. Koşul hâlâ true; döngü tamamlanmadı.
                </div>
              )}
            </div>
          </div>

          {/* Custom Parameter Adjuster */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800/60 p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Parametreleri Değiştirip Test Et:
              </span>
              <button
                onClick={() => {
                  setInitialValue(1);
                  setLimitValue(5);
                  setStepIncrement(1);
                }}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Varsayılan (1-5)
              </button>
            </div>
            <p className="mb-2 text-[10px] text-slate-500">Görselleştirme güvenlik için en fazla 50 iterasyon gösterir.</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Başlangıç (sayac):</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Math.min(1000000, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Üst Sınır (&lt;= N):</label>
                <input
                  type="number"
                  min="1"
                  max="1000000"
                  value={limitValue}
                  onChange={(e) => setLimitValue(Math.min(1000000, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
