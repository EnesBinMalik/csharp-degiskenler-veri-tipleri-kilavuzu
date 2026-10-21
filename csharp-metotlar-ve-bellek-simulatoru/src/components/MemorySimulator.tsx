import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, ArrowDown, Cpu, Sparkles, AlertCircle } from 'lucide-react';

export const MemorySimulator: React.FC = () => {
  // Configurable initial values from user prompt
  const [initX, setInitX] = useState<number>(3);
  const [initY, setInitY] = useState<number>(4);
  const [isRefMode, setIsRefMode] = useState<boolean>(true);

  // Stepper state (0 to 6)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1800); // ms per step

  // Reset simulation when inputs change
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Step definitions based on user example
  const steps = [
    {
      step: 0,
      title: 'Hazır (Ready)',
      codeLine: 0,
      callStack: ['Main() [Başlangıç]'],
      description: 'Simülasyon hazır. "İleri Adım" veya "Oynat" ile metot çağrısını, parametre aktarımını ve sonuç değerini adım adım inceleyin. Bu, C# çalışma zamanını çalıştırmayan kavramsal bir tarayıcı simülasyonudur.',
      mainX: initX,
      mainY: initY,
      mainSonuc: null as number | null,
      methodFrameActive: false,
      methodX: null as number | null,
      methodY: null as number | null,
      returnValue: null as number | null,
      actionHighlight: 'none'
    },
    {
      step: 1,
      title: '1. Çağıran kapsamındaki değişkenler',
      codeLine: 1, // int x = 3; int y = 4;
      callStack: ['Main() [Aktif]'],
      description: `Çağıran kapsamda int x = ${initX} ve int y = ${initY} değerleri var. Simülasyon gerçek bellek adreslerini veya değişkenlerin fiziksel yerleşimini göstermez.`,
      mainX: initX,
      mainY: initY,
      mainSonuc: null,
      methodFrameActive: false,
      methodX: null,
      methodY: null,
      returnValue: null,
      actionHighlight: 'main_vars'
    },
    {
      step: 2,
      title: '2. Metot Çağrısı ve Parametre Aktarımı',
      codeLine: 3, // int sonuc = instance.ArttırVeTopla(ref x, ref y);
      callStack: ['Main() [Beklemede]', isRefMode ? 'ArttırVeTopla(ref x, ref y) [Aktif]' : 'ArttırVeTopla(x, y) [Aktif]'],
      description: isRefMode
        ? `ref kullanıldığında metot parametreleri çağıranın x ve y değişkenlerine başvurur; bunlar ham bellek adresleri değildir.`
        : `ref kullanılmadığında int argümanlarının değerleri metot parametrelerine aktarılır. Metot içindeki parametre atamaları çağırandaki x ve y değerlerini değiştirmez.`,
      mainX: initX,
      mainY: initY,
      mainSonuc: null,
      methodFrameActive: true,
      methodX: initX,
      methodY: initY,
      returnValue: null,
      actionHighlight: 'method_call'
    },
    {
      step: 3,
      title: '3. Komut: x += 1 Yürütülüyor',
      codeLine: 7, // x += 1;
      callStack: ['Main() [Beklemede]', 'ArttırVeTopla() [Satır: x += 1]'],
      description: isRefMode
        ? `x += 1 çalıştı. ref parametresi aynı çağıran değişkene başvurduğundan x ${initX} değerinden ${initX + 1} değerine güncellendi.`
        : `x += 1 çalıştı. Değerle aktarılan parametre ${initX + 1} oldu; çağıran kapsamındaki x değişmedi (${initX}).`,
      mainX: isRefMode ? initX + 1 : initX,
      mainY: initY,
      mainSonuc: null,
      methodFrameActive: true,
      methodX: initX + 1,
      methodY: initY,
      returnValue: null,
      actionHighlight: 'x_increment'
    },
    {
      step: 4,
      title: '4. Komut: y += y Yürütülüyor',
      codeLine: 8, // y += y;
      callStack: ['Main() [Beklemede]', 'ArttırVeTopla() [Satır: y += y]'],
      description: isRefMode
        ? `y += y çalıştı (${initY} + ${initY} = ${initY * 2}). ref parametresi nedeniyle çağıran kapsamındaki y ${initY * 2} oldu.`
        : `y += y çalıştı (${initY} + ${initY} = ${initY * 2}). Metot parametresi ${initY * 2} oldu; çağıran kapsamındaki y değişmedi (${initY}).`,
      mainX: isRefMode ? initX + 1 : initX,
      mainY: isRefMode ? initY * 2 : initY,
      mainSonuc: null,
      methodFrameActive: true,
      methodX: initX + 1,
      methodY: initY * 2,
      returnValue: null,
      actionHighlight: 'y_double'
    },
    {
      step: 5,
      title: '5. Komut: return (x + y) Sonuç Hesaplanıyor',
      codeLine: 9, // return (x + y);
      callStack: ['Main() [Beklemede]', 'ArttırVeTopla() [Satır: return]'],
      description: `Toplam hesaplandı: ${(initX + 1)} + ${(initY * 2)} = ${(initX + 1) + (initY * 2)}. return ifadesi bu değeri çağırana verir.`,
      mainX: isRefMode ? initX + 1 : initX,
      mainY: isRefMode ? initY * 2 : initY,
      mainSonuc: null,
      methodFrameActive: true,
      methodX: initX + 1,
      methodY: initY * 2,
      returnValue: (initX + 1) + (initY * 2),
      actionHighlight: 'return_calc'
    },
    {
      step: 6,
      title: '6. Metottan Dönüş',
      codeLine: 3, // int sonuc = ...
      callStack: ['Main() [Tamamlandı]'],
      description: isRefMode
        ? `Metot tamamlandı; parametre kapsamı sona erdi. Çağıran kapsamına dönüldü: x=${initX + 1}, y=${initY * 2}, sonuc=${(initX + 1) + (initY * 2)}. Simülasyon fiziksel bellek temizlemesini göstermez.`
        : `Metot tamamlandı; parametre kapsamı sona erdi. Çağıran kapsamına dönüldü: x=${initX}, y=${initY}, sonuc=${(initX + 1) + (initY * 2)}. Simülasyon fiziksel bellek temizlemesini göstermez.`,
      mainX: isRefMode ? initX + 1 : initX,
      mainY: isRefMode ? initY * 2 : initY,
      mainSonuc: (initX + 1) + (initY * 2),
      methodFrameActive: false,
      methodX: null,
      methodY: null,
      returnValue: (initX + 1) + (initY * 2),
      actionHighlight: 'lifetime_ended'
    }
  ];

  const currentStepData = steps[currentStep];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (currentStep < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, playSpeed);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, playSpeed, steps.length]);

  return (
    <section id="simulator" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 04</span>
          <span aria-hidden="true">·</span>
          <span>İnteraktif Simülasyon</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Metot Çağrısı ve ref Simülatörü
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Enes Öztürk'ün <code className="text-cyan-300 font-mono">ArttırVeTopla</code> kod örneğini adım adım inceleyin.
              Parametre değerlerinin ve çağıran değişkenlerin nasıl etkilendiğini görün.
            </p>
          </div>

          {/* Mode Switcher: ref vs Normal */}
          <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => { setIsRefMode(true); handleReset(); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isRefMode
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ref İle Çağrım (Değişkene Başvuru)
            </button>
            <button
              onClick={() => { setIsRefMode(false); handleReset(); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isRefMode
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal Çağrım (Değer Tipi - Kopya)
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Values & Playback */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-6 shadow-lg">
        {/* Input variables */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-400">Parametre Değerleri:</span>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-cyan-400">x:</label>
            <input
              type="number"
              min={1}
              max={99}
              value={initX}
              onChange={(e) => { setInitX(Number(e.target.value) || 0); handleReset(); }}
              className="w-16 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-sm font-mono text-white text-center focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-cyan-400">y:</label>
            <input
              type="number"
              min={1}
              max={99}
              value={initY}
              onChange={(e) => { setInitY(Number(e.target.value) || 0); handleReset(); }}
              className="w-16 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-sm font-mono text-white text-center focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-xs font-mono text-slate-300">
          Adım: <strong className="text-cyan-400 text-sm">{currentStep} / {steps.length - 1}</strong>
          <span className="text-slate-500 ml-2">({currentStepData.title})</span>
        </div>

        {/* Playback action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentStep > 0) setCurrentStep(currentStep - 1);
            }}
            disabled={currentStep === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white transition-colors cursor-pointer"
            title="Önceki Adım"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{currentStep === steps.length - 1 ? 'Yeniden Oynat' : 'Otomatik Oynat'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            }}
            disabled={currentStep === steps.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white transition-colors cursor-pointer"
            title="Sonraki Adım"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation 3-Zone Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Code Window with active line highlight */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              C# Çalışma Alanı
            </span>
            <span className="font-mono text-slate-500">Satır #{currentStepData.codeLine || '-'}</span>
          </div>

          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto flex-1 bg-slate-950/40">
            {/* Line 1 */}
            <div className={`px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 1 ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">1</span>
              <span className="text-cyan-400">int</span> x = <span className="text-amber-300 font-bold">{initX}</span>;
            </div>

            {/* Line 2 */}
            <div className={`px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 1 ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">2</span>
              <span className="text-cyan-400">int</span> y = <span className="text-amber-300 font-bold">{initY}</span>;
            </div>

            {/* Line 3 */}
            <div className={`px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 3 ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">3</span>
              <span className="text-cyan-400">int</span> sonuc = instance.<span className="text-teal-300 font-bold">ArttırVeTopla</span>(
              {isRefMode ? (
                <span><span className="text-indigo-400 font-bold">ref</span> x, <span className="text-indigo-400 font-bold">ref</span> y</span>
              ) : (
                <span>x, y</span>
              )}
              );
            </div>

            <div className="border-t border-slate-800/80 my-3"></div>

            {/* Line 5 */}
            <div className="px-2 py-0.5 text-slate-500">
              <span className="text-slate-600 select-none mr-3">5</span>
              <span className="text-indigo-400">public int</span> <span className="text-teal-300 font-bold">ArttırVeTopla</span>(
              {isRefMode ? (
                <span><span className="text-indigo-400 font-bold">ref int</span> x, <span className="text-indigo-400 font-bold">ref int</span> y</span>
              ) : (
                <span><span className="text-cyan-400">int</span> x, <span className="text-cyan-400">int</span> y</span>
              )}
              )
            </div>

            {/* Line 6 */}
            <div className="px-2 py-0.5 text-slate-500">
              <span className="text-slate-600 select-none mr-3">6</span>
              {'{'}
            </div>

            {/* Line 7 */}
            <div className={`pl-6 px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 7 ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-bold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">7</span>
              x += <span className="text-amber-300">1</span>;
            </div>

            {/* Line 8 */}
            <div className={`pl-6 px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 8 ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-bold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">8</span>
              y += y;
            </div>

            {/* Line 9 */}
            <div className={`pl-6 px-2 py-1 rounded transition-colors ${currentStepData.codeLine === 9 ? 'bg-emerald-500/20 text-emerald-200 border-l-2 border-emerald-400 font-bold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none mr-3">9</span>
              <span className="text-indigo-400">return</span> (x + y);
            </div>

            {/* Line 10 */}
            <div className="px-2 py-0.5 text-slate-500">
              <span className="text-slate-600 select-none mr-3">10</span>
              {'}'}
            </div>
          </div>

          {/* Active step explanation box */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
            <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentStepData.title}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{currentStepData.description}</p>
          </div>
        </div>

        {/* Center / Right: Conceptual call frames and values */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stack Frame Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Çağrı Çerçeveleri (Kavramsal Gösterim)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                LIFO (Last-In First-Out)
              </span>
            </div>

            {/* Method Frame: ArttırVeTopla (Pushed on top of stack) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={`font-semibold flex items-center gap-1.5 ${currentStepData.methodFrameActive ? 'text-amber-400' : 'text-slate-500 line-through'}`}>
                  <span>[Frame 2] ArttırVeTopla() çağrısı</span>
                  {currentStepData.methodFrameActive && (
                    <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.2 rounded font-sans">
                      Aktif Yürütülüyor
                    </span>
                  )}
                  {currentStep === 6 && (
                    <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.2 rounded font-sans">
                      Çağrı tamamlandı
                    </span>
                  )}
                </span>
                <span className="text-slate-500 text-[11px]">Şematik</span>
              </div>

              {currentStepData.methodFrameActive ? (
                <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 grid grid-cols-2 gap-4 transition-all">
                  {/* Method Param X */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>parametre x</span>
                      <span className="text-[10px] text-slate-500">parametre</span>
                    </div>
                    {isRefMode ? (
                      <div className="pt-1 text-indigo-400 font-semibold flex items-center gap-1">
                        <span className="text-xs">↳ Main.x</span>
                        <span className="text-slate-400">(aynı değişkene başvuru)</span>
                      </div>
                    ) : (
                      <div className="pt-1 text-emerald-400 font-bold text-base">
                        {currentStepData.methodX} <span className="text-xs text-slate-500 font-normal">(Kopya)</span>
                      </div>
                    )}
                  </div>

                  {/* Method Param Y */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>parametre y</span>
                      <span className="text-[10px] text-slate-500">parametre</span>
                    </div>
                    {isRefMode ? (
                      <div className="pt-1 text-indigo-400 font-semibold flex items-center gap-1">
                        <span className="text-xs">↳ Main.y</span>
                        <span className="text-slate-400">(aynı değişkene başvuru)</span>
                      </div>
                    ) : (
                      <div className="pt-1 text-emerald-400 font-bold text-base">
                        {currentStepData.methodY} <span className="text-xs text-slate-500 font-normal">(Kopya)</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950/40 rounded-xl border border-dashed border-slate-800/80 text-center text-xs text-slate-500 font-mono">
                  {currentStep === 0 || currentStep === 1
                    ? 'Metot henüz çağrılmadı. Stack frame henüz açılmadı.'
                    : 'Metot çağrısı tamamlandı; simülasyonda parametre kapsamı sona erdi.'}
                </div>
              )}
            </div>

            {/* Connecting Pointer Indicator in ref mode */}
            {isRefMode && currentStepData.methodFrameActive && (
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-indigo-400 py-1">
                <div className="flex items-center gap-1 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1 rounded-full">
                  <ArrowDown className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                  <span>ref parametreleri çağıranın aynı değişkenlerine başvurur.</span>
                </div>
              </div>
            )}

            {/* Main Frame: Main() (Base of stack) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-semibold">
                  [Frame 1] Main() çağıran kapsamı
                </span>
                <span className="text-slate-500 text-[11px]">Şematik</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 grid grid-cols-3 gap-4">
                {/* Main Variable x */}
                <div className={`p-3 rounded-lg border font-mono text-xs space-y-1 transition-all ${
                  isRefMode && (currentStep === 3 || currentStep >= 4)
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-sm'
                    : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-cyan-400 font-bold">int x</span>
                    <span className="text-[10px] text-slate-500">çağıran değişkeni</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {currentStepData.mainX}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isRefMode && currentStep >= 3 ? (
                      <span className="text-indigo-400">ref ile {initX} → {currentStepData.mainX}</span>
                    ) : (
                      <span>Başlangıç: {initX}</span>
                    )}
                  </div>
                </div>

                {/* Main Variable y */}
                <div className={`p-3 rounded-lg border font-mono text-xs space-y-1 transition-all ${
                  isRefMode && (currentStep === 4 || currentStep >= 5)
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-sm'
                    : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-cyan-400 font-bold">int y</span>
                    <span className="text-[10px] text-slate-500">çağıran değişkeni</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {currentStepData.mainY}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isRefMode && currentStep >= 4 ? (
                      <span className="text-indigo-400">ref ile {initY} → {currentStepData.mainY}</span>
                    ) : (
                      <span>Başlangıç: {initY}</span>
                    )}
                  </div>
                </div>

                {/* Main Variable sonuc */}
                <div className={`p-3 rounded-lg border font-mono text-xs space-y-1 transition-all ${
                  currentStep === 6
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-sm'
                    : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-emerald-400 font-bold">int sonuc</span>
                    <span className="text-[10px] text-slate-500">çağıran değişkeni</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {currentStepData.mainSonuc !== null ? currentStepData.mainSonuc : '—'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currentStep === 6 ? 'Dönen sonuç atandı' : 'Bekleniyor...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Before & After Comparison Result Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
              <span>Çağıran Main Değişkenlerinin Öncesi &amp; Sonrası:</span>
              <span className="font-mono text-cyan-400">
                {isRefMode ? 'Mod: ref (Referans)' : 'Mod: Normal (Değer Tipi)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Değişken x:</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-slate-400">{initX}</span>
                  <span className="text-slate-600">→</span>
                  <span className={`font-bold text-sm ${isRefMode ? 'text-indigo-400' : 'text-emerald-400'}`}>
                    {currentStepData.mainX}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {isRefMode ? 'ref ile DEĞİŞTİ' : 'Aynı kaldı (Korundu)'}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Değişken y:</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-slate-400">{initY}</span>
                  <span className="text-slate-600">→</span>
                  <span className={`font-bold text-sm ${isRefMode ? 'text-indigo-400' : 'text-emerald-400'}`}>
                    {currentStepData.mainY}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {isRefMode ? 'ref ile DEĞİŞTİ' : 'Aynı kaldı (Korundu)'}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Dönen sonuc:</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-slate-400">—</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-bold text-sm text-amber-300">
                    {currentStepData.mainSonuc !== null ? currentStepData.mainSonuc : (currentStepData.returnValue || '—')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  return (x + y)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
