import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Layers,
  Calculator,
  Info,
  Sparkles,
  ArrowDown,
  Check,
  Plus
} from 'lucide-react';
import { LESSON_CONTENT } from '../data/lessonsData';

export const ForEachVisualizer: React.FC = () => {
  // Configurable array (default matches user request exactly: {2, 4, 5, 1, 2, 4})
  const [arrayElements, setArrayElements] = useState<number[]>([2, 4, 5, 1, 2, 4]);
  const [customInput, setCustomInput] = useState<string>('2, 4, 5, 1, 2, 4');
  const [inputError, setInputError] = useState<string | null>(null);

  interface ForEachStep {
    line: number; // 1: array def, 2: toplam init, 4: foreach loop head, 6: toplam += i, 8: finish
    elementIndex: number; // -1 for outside
    currentVal: number;
    prevTotal: number;
    newTotal: number;
    consoleLogs: string[];
    explanation: string;
    isFinished: boolean;
  }

  // Generate steps based on array
  const steps: ForEachStep[] = React.useMemo(() => {
    const list: ForEachStep[] = [];
    const logs: string[] = [];
    let runningTotal = 0;

    // Step 0: array definition
    list.push({
      line: 1,
      elementIndex: -1,
      currentVal: 0,
      prevTotal: 0,
      newTotal: 0,
      consoleLogs: [...logs],
      explanation: `Dizi tanımlandı: int[] sayiDizisi = { ${arrayElements.join(', ')} }; (Toplam ${arrayElements.length} eleman)`,
      isFinished: false
    });

    // Step 1: int toplam = 0;
    list.push({
      line: 2,
      elementIndex: -1,
      currentVal: 0,
      prevTotal: 0,
      newTotal: 0,
      consoleLogs: [...logs],
      explanation: 'Toplam değişkeni sıfırlandı: int toplam = 0;',
      isFinished: false
    });

    // Loop through each element
    arrayElements.forEach((val, idx) => {
      // Line 4: foreach (int i in sayiDizisi)
      list.push({
        line: 4,
        elementIndex: idx,
        currentVal: val,
        prevTotal: runningTotal,
        newTotal: runningTotal,
        consoleLogs: [...logs],
        explanation: `İterasyon ${idx + 1}/${arrayElements.length}: Dizinin ${idx}. indeksindeki eleman alındı. int i = ${val}`,
        isFinished: false
      });

      // Line 6: toplam += i;
      const before = runningTotal;
      runningTotal += val;
      logs.push(`İterasyon #${idx + 1}: i = ${val} eklendi. (toplam: ${before} + ${val} = ${runningTotal})`);

      list.push({
        line: 6,
        elementIndex: idx,
        currentVal: val,
        prevTotal: before,
        newTotal: runningTotal,
        consoleLogs: [...logs],
        explanation: `toplam += i işlemi yapıldı: ${before} + ${val} = ${runningTotal}`,
        isFinished: false
      });
    });

    // Finish step
    logs.push(`Döngü Tamamlandı! Sonuç: Toplam = ${runningTotal}`);
    list.push({
      line: 8,
      elementIndex: -1,
      currentVal: 0,
      prevTotal: runningTotal,
      newTotal: runningTotal,
      consoleLogs: [...logs],
      explanation: `Foreach döngüsü dizideki tüm (${arrayElements.length}) elemanı ziyaret etti ve otomatik olarak bitti. Nihai toplam: ${runningTotal}`,
      isFinished: true
    });

    return list;
  }, [arrayElements]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [arrayElements]);

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

  const applyCustomArray = () => {
    const values = customInput.split(',').map((value) => value.trim());
    const parsed = values.map((value) => Number(value));
    const total = parsed.reduce((sum, value) => sum + value, 0);
    if (
      values.length === 0 ||
      values.length > 10 ||
      values.some((value) => !/^-?\d+$/.test(value)) ||
      parsed.some((value) => !Number.isInteger(value) || value < -2147483648 || value > 2147483647) ||
      total < -2147483648 ||
      total > 2147483647
    ) {
      setInputError('1-10 arasında 32 bit tam sayı girin; dizi toplamı da int aralığında kalmalıdır.');
      return;
    }
    setArrayElements(parsed);
    setInputError(null);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                2. DÖNGÜ TİPİ
              </span>
              <span className="text-xs text-slate-400">Koleksiyon & Dizi İteratörü</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              ForEach Döngüsü
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-semibold">Enes Öztürk Açıklaması:</span>{' '}
            "{LESSON_CONTENT.forEachSection.definition}"
          </div>
        </div>

        {/* Syntax Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Genel Yazım Şekli (Syntax):
            </div>
            <pre className="font-mono text-xs sm:text-sm text-indigo-300 bg-slate-900/80 p-3 rounded-lg border border-indigo-500/20 overflow-x-auto">
{`foreach(değişkenTipi değişkenAdı in diziAdı)
{
    //Komutlar
}`}
            </pre>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3 text-slate-300 text-sm">
            <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white mb-1">Nasıl Çalışır?</p>
              <p className="text-xs leading-relaxed">
                {LESSON_CONTENT.forEachSection.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Array Track & Interactive Memory Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Görsel Dizi (sayiDizisi)
            </h3>
            <p className="text-xs text-slate-400">
              Foreach dizinin başından sonuna kadar sırayla her kutuyu ziyaret eder.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            Dizi Boyutu: <strong className="text-emerald-400">{arrayElements.length}</strong> Eleman
          </div>
        </div>

        {/* Array Boxes Visual */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-3 px-1 no-scrollbar">
          {arrayElements.map((val, idx) => {
            const isCurrent = currentStep.elementIndex === idx;
            const isProcessed = currentStep.elementIndex > idx || currentStep.isFinished;

            return (
              <div
                key={idx}
                className={`relative flex-shrink-0 w-16 sm:w-20 rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-b from-emerald-500/30 to-emerald-950/60 border-2 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105'
                    : isProcessed
                    ? 'bg-slate-950/90 border border-slate-800 text-slate-400'
                    : 'bg-slate-950/50 border border-dashed border-slate-800 text-slate-500'
                }`}
              >
                {/* Pointer indicator */}
                {isCurrent && (
                  <div className="absolute -top-3 text-emerald-400 animate-bounce">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                )}

                <span className="text-[10px] font-mono text-slate-500 mb-0.5">
                  [{idx}]
                </span>
                <span className={`text-2xl font-extrabold font-mono ${
                  isCurrent ? 'text-white' : isProcessed ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {val}
                </span>

                <div className="mt-1 flex items-center gap-1">
                  {isProcessed && !isCurrent ? (
                    <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Eklendi
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[9px] font-semibold text-emerald-300 bg-emerald-500/20 px-1 rounded">
                      İşleniyor
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-600">Sırada</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer with Stepper (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-400 ml-2">Program.cs (ForEach Simülatörü)</span>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Adım {currentStepIndex + 1} / {steps.length}
            </span>
          </div>

          {/* Code */}
          <div className="p-4 sm:p-6 font-mono text-sm bg-slate-950 flex-grow select-none space-y-1.5">
            {/* Line 1 */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
              currentStep.line === 1
                ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-900/60'
            }`}>
              <span className="w-6 text-slate-600 text-xs">1</span>
              <span>
                <span className="text-sky-400">int</span>[] sayiDizisi = {'{'} <span className="text-emerald-400">{arrayElements.join(', ')}</span> {'}'};
              </span>
            </div>

            {/* Line 2 */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
              currentStep.line === 2
                ? 'bg-indigo-500/20 text-indigo-200 border-l-4 border-indigo-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-900/60'
            }`}>
              <span className="w-6 text-slate-600 text-xs">2</span>
              <span>
                <span className="text-sky-400">int</span> toplam = <span className="text-emerald-400">0</span>;
              </span>
            </div>

            {/* Line 3 empty */}
            <div className="flex items-center gap-3 px-3 py-0.5 text-slate-700">
              <span className="w-6 text-slate-800 text-xs">3</span>
            </div>

            {/* Line 4 foreach */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
              currentStep.line === 4
                ? 'bg-emerald-500/20 text-emerald-200 border-l-4 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-900/60'
            }`}>
              <span className="w-6 text-slate-600 text-xs">4</span>
              <span>
                <span className="text-purple-400">foreach</span> (<span className="text-sky-400">int</span> i <span className="text-purple-400">in</span> sayiDizisi)
              </span>
              {currentStep.line === 4 && (
                <span className="ml-auto text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  ← i = {currentStep.currentVal}
                </span>
              )}
            </div>

            {/* Line 5 */}
            <div className="flex items-center gap-3 px-3 py-1 text-slate-500">
              <span className="w-6 text-slate-700 text-xs">5</span>
              <span>{'{'}</span>
            </div>

            {/* Line 6 toplam += i */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
              currentStep.line === 6
                ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-semibold'
                : 'text-slate-400 hover:bg-slate-900/60'
            }`}>
              <span className="w-6 text-slate-600 text-xs">6</span>
              <span className="pl-4">
                toplam <span className="text-rose-400">+=</span> i;
              </span>
              {currentStep.line === 6 && (
                <span className="ml-auto text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {currentStep.prevTotal} + {currentStep.currentVal} = {currentStep.newTotal}
                </span>
              )}
            </div>

            {/* Line 7 */}
            <div className="flex items-center gap-3 px-3 py-1 text-slate-500">
              <span className="w-6 text-slate-700 text-xs">7</span>
              <span>{'}'}</span>
            </div>

            {/* Line 8 */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all ${
              currentStep.line === 8
                ? 'bg-sky-500/20 text-sky-200 border-l-4 border-sky-400 font-semibold'
                : 'text-slate-500'
            }`}>
              <span className="w-6 text-slate-700 text-xs">8</span>
              <span>
                <span className="text-cyan-400">Console</span>.<span className="text-yellow-300">WriteLine</span>(<span className="text-emerald-300">"Toplam: "</span> + toplam);
              </span>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-all cursor-pointer"
                title="Önceki Adım"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" /> Duraklat
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Otomatik Oynat
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === steps.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-all cursor-pointer"
                title="Sonraki Adım"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                title="Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Hız:</span>
              <button
                onClick={() => setPlaybackSpeed(1800)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 1800 ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}
              >
                0.7x
              </button>
              <button
                onClick={() => setPlaybackSpeed(1100)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 1100 ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}
              >
                1x
              </button>
              <button
                onClick={() => setPlaybackSpeed(500)}
                className={`px-2 py-1 rounded cursor-pointer ${playbackSpeed === 500 ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}
              >
                2x
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Calculation & Accumulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Explanation */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-md">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Adım Açıklaması
            </h3>
            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              {currentStep.explanation}
            </p>
          </div>

          {/* Memory Watchers */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-md">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Değişken İzleyici (Canlı Değerler)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* i element */}
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 text-center">
                <span className="text-[11px] font-mono text-emerald-400 block mb-0.5">int i (Aktif Eleman)</span>
                <span className="text-3xl font-extrabold text-white font-mono">
                  {currentStep.elementIndex >= 0 ? currentStep.currentVal : '-'}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {currentStep.elementIndex >= 0 ? `İndeks: [${currentStep.elementIndex}]` : 'Döngü Dışı'}
                </span>
              </div>

              {/* toplam variable */}
              <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30 text-center">
                <span className="text-[11px] font-mono text-indigo-400 block mb-0.5">int toplam</span>
                <span className="text-3xl font-extrabold text-indigo-300 font-mono">
                  {currentStep.newTotal}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Kümülatif Toplam
                </span>
              </div>
            </div>

            {/* Arithmetic Formula Pill */}
            {currentStep.line === 6 && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center font-mono text-xs text-emerald-300 animate-pulse">
                {currentStep.prevTotal} + {currentStep.currentVal} = <strong className="text-white text-sm">{currentStep.newTotal}</strong>
              </div>
            )}
          </div>

          {/* Console Log */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl flex-grow flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold">Örnek Konsol Akışı (Simülasyon)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Tarayıcı simülasyonu</span>
            </div>

            <div className="font-mono text-xs bg-black/60 rounded-xl p-3 border border-slate-900 h-28 overflow-y-auto space-y-1 text-emerald-400">
              <div className="text-[10px] text-slate-500">Örnek çıktı · C# kodu çalıştırılmıyor</div>
              {currentStep.consoleLogs.length === 0 ? (
                <span className="text-slate-600 italic">Döngü başladığında konsol çıktıları burada listelenecek...</span>
              ) : (
                currentStep.consoleLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600">&gt;</span>
                    <span className={idx === currentStep.consoleLogs.length - 1 ? 'text-white font-bold' : ''}>
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Custom Array Input */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800/60 p-3 text-xs">
            <label className="text-slate-400 font-medium block mb-1">
              Farklı Bir Dizi ile Test Et (Virgülle ayırın):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => {
                  setCustomInput(e.target.value);
                  setInputError(null);
                }}
                placeholder="Örn: 2, 4, 5, 1, 2, 4"
                className="flex-grow bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={applyCustomArray}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-xs transition-colors cursor-pointer"
              >
                Uygula
              </button>
            </div>
            {inputError && <p role="alert" className="mt-2 text-[11px] text-rose-300">{inputError}</p>}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setCustomInput('2, 4, 5, 1, 2, 4');
                  setArrayElements([2, 4, 5, 1, 2, 4]);
                }}
                className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
              >
                Varsayılan {`{2, 4, 5, 1, 2, 4}`}
              </button>
              <button
                onClick={() => {
                  setCustomInput('10, 25, 40, 5');
                  setArrayElements([10, 25, 40, 5]);
                }}
                className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
              >
                Örnek {`{10, 25, 40, 5}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
