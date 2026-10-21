import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Terminal as TerminalIcon,
  Cpu,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import { LoopConfig, LoopPresetId, ExecutionStep } from '../types/loop';
import { PRESET_CONFIGS, generateExecutionSteps, getCodeLinesForPreset } from '../utils/loopEngine';

interface SimulatorProps {
  onGoToFlowchart?: () => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ onGoToFlowchart }) => {
  const [preset, setPreset] = useState<LoopPresetId>('break');
  const [config, setConfig] = useState<LoopConfig>(PRESET_CONFIGS.break);
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1000); // ms per step

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Recalculate steps whenever preset or config changes
  useEffect(() => {
    const generated = generateExecutionSteps(preset, config);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [preset, config]);

  // Handle auto-play
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playSpeed, steps.length]);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIdx]);

  const handleSelectPreset = (newPreset: LoopPresetId) => {
    setPreset(newPreset);
    if (newPreset !== 'custom') {
      setConfig({ ...PRESET_CONFIGS[newPreset] });
    }
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const currentStep = steps[currentStepIdx] || {
    stepIndex: 0,
    iteration: 0,
    stage: 'idle',
    stageLabel: 'Başlangıç',
    variableI: config.startVal,
    conditionMet: true,
    codeLineNumber: 1,
    explanation: 'Döngüyü başlatmak için "Oynat" veya "Adım İlerle" butonuna tıklayın.',
    outputLog: [],
  };

  const codeLines = getCodeLinesForPreset(preset, config);

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Preset Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Hazır Senaryolar & Kod Örnekleri
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            C# kodu çalıştırılmaz; for döngüsü, break ve continue adımları tarayıcıda simüle edilir.
          </p>
        </div>

        {/* Segmented Preset Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={() => handleSelectPreset('break')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              preset === 'break'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Break Örneği (7'de Dur)
          </button>
          <button
            onClick={() => handleSelectPreset('continue')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              preset === 'continue'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Continue Örneği (Tek Sayılar)
          </button>
          <button
            onClick={() => handleSelectPreset('infinite')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              preset === 'infinite'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            for(;;) Sonsuz Döngü
          </button>
          <button
            onClick={() => handleSelectPreset('basic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              preset === 'basic'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Temel Sayaç (0..5)
          </button>
          <button
            onClick={() => handleSelectPreset('custom')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              preset === 'custom'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Özelleştir</span>
          </button>
        </div>
      </div>

      {/* Custom configuration panel when 'custom' is selected */}
      {preset === 'custom' && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
          <p className="sm:col-span-2 lg:col-span-4 text-amber-300">
            Simülasyon en fazla 25 iterasyon gösterir. Sınıra ulaşılırsa bu, örnek C# döngüsünün tamamlandığı anlamına gelmez.
          </p>
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Başlangıç Değeri (ifade1)</label>
            <input
              type="number"
              value={config.startVal}
              onChange={(e) => setConfig({ ...config, startVal: parseInt(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Koşul Şartı (koşul)</label>
            <div className="flex gap-2">
              <select
                value={config.conditionOp}
                onChange={(e) => setConfig({ ...config, conditionOp: e.target.value as LoopConfig['conditionOp'] })}
                className="px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
              >
                <option value="<=">&lt;=</option>
                <option value="<">&lt;</option>
                <option value=">=">&gt;=</option>
                <option value=">">&gt;</option>
              </select>
              <input
                type="number"
                value={config.targetVal}
                onChange={(e) => setConfig({ ...config, targetVal: parseInt(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Break Durumu</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hasBreak}
                  onChange={(e) => setConfig({ ...config, hasBreak: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span>i == </span>
              </label>
              <input
                type="number"
                disabled={!config.hasBreak}
                value={config.breakVal}
                onChange={(e) => setConfig({ ...config, breakVal: parseInt(e.target.value) || 0 })}
                className="w-20 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono disabled:opacity-40"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Continue Durumu</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hasContinue}
                  onChange={(e) => setConfig({ ...config, hasContinue: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span>Şart:</span>
              </label>
              <select
                disabled={!config.hasContinue}
                value={config.continueCondition}
                onChange={(e) => setConfig({ ...config, continueCondition: e.target.value as LoopConfig['continueCondition'] })}
                className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono disabled:opacity-40"
              >
                <option value="even">i % 2 == 0 (Çiftler)</option>
                <option value="odd">i % 2 != 0 (Tekler)</option>
                <option value="specific">i == {config.continueVal}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Sandbox Grid (3 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Window with Active Line Highlight (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">Program.cs (C#)</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-400">
              Satır {currentStep.codeLineNumber} aktif
            </span>
          </div>

          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-slate-950/40">
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = lineNum === currentStep.codeLineNumber;
              const isBreakLine = line.includes('break');
              const isContinueLine = line.includes('continue');
              const isForHeader = line.startsWith('for');

              let lineBg = 'hover:bg-slate-800/30';
              let borderClass = 'border-l-2 border-transparent';

              if (isActive) {
                if (currentStep.stage === 'break_triggered') {
                  lineBg = 'bg-rose-950/40 text-rose-200';
                  borderClass = 'border-l-2 border-rose-500';
                } else if (currentStep.stage === 'continue_triggered') {
                  lineBg = 'bg-amber-950/40 text-amber-200';
                  borderClass = 'border-l-2 border-amber-500';
                } else {
                  lineBg = 'bg-indigo-950/50 text-indigo-100';
                  borderClass = 'border-l-2 border-indigo-400';
                }
              }

              return (
                <div
                  key={idx}
                  className={`flex items-start px-2 py-0.5 rounded transition-colors ${lineBg} ${borderClass}`}
                >
                  <span className="w-6 shrink-0 text-slate-600 select-none text-right pr-2">
                    {lineNum}
                  </span>
                  <div className="flex-1 whitespace-pre">
                    {/* Minimal syntax highlights */}
                    {line.includes('for') && (
                      <span>
                        <span className="text-purple-400 font-semibold">for</span>
                        {line.substring(line.indexOf('('))}
                      </span>
                    )}
                    {line.includes('break') && (
                      <span>
                        <span className="text-rose-400 font-bold">break</span>;
                        <span className="text-slate-500 text-xs italic ml-2">
                          {line.substring(line.indexOf(';') + 1)}
                        </span>
                      </span>
                    )}
                    {line.includes('continue') && (
                      <span>
                        <span className="text-amber-400 font-bold">continue</span>;
                        <span className="text-slate-500 text-xs italic ml-2">
                          {line.substring(line.indexOf(';') + 1)}
                        </span>
                      </span>
                    )}
                    {line.includes('Console.WriteLine') && (
                      <span>
                        <span className="text-cyan-300">Console</span>.
                        <span className="text-yellow-200">WriteLine</span>
                        {line.substring(line.indexOf('('))}
                      </span>
                    )}
                    {!line.includes('for') &&
                      !line.includes('break') &&
                      !line.includes('continue') &&
                      !line.includes('Console.WriteLine') && (
                        <span className={line.startsWith('//') ? 'text-slate-500 italic' : 'text-slate-300'}>
                          {line}
                        </span>
                      )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Code Footer / Stage Indicator */}
          <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Şu Anki İşlem:</span>
            <span
              className={`font-semibold ${
                currentStep.stage === 'break_triggered'
                  ? 'text-rose-400'
                  : currentStep.stage === 'continue_triggered'
                  ? 'text-amber-400'
                  : currentStep.stage === 'finished'
                  ? 'text-emerald-400'
                  : 'text-indigo-400'
              }`}
            >
              {currentStep.stageLabel}
            </span>
          </div>
        </div>

        {/* Middle Column: Execution Stage & Variable Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Variable State Board */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  Simüle Edilen Sayaç Durumu
              </span>
              <span className="text-xs font-mono text-slate-500">
                İterasyon #{currentStep.iteration}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Variable i display */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Sayaç (int i)
                </div>
                <div className="text-3xl font-extrabold font-mono text-white mt-1 tabular-nums">
                  {currentStep.variableI}
                </div>
                <div className="text-[10px] text-indigo-400 mt-1 font-mono">
                  {currentStep.stage === 'init'
                    ? 'Başlatıldı'
                    : currentStep.stage === 'update'
                    ? 'Güncellendi'
                    : 'Mevcut Değer'}
                </div>
              </div>

              {/* Condition evaluation display */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Koşul Sonucu
                </div>
                <div
                  className={`text-xl font-bold font-mono mt-2 tabular-nums ${
                    currentStep.conditionMet ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {currentStep.stage === 'init'
                    ? '—'
                    : currentStep.conditionMet
                    ? 'TRUE (1)'
                    : 'FALSE (0)'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {currentStep.conditionMet ? 'Döngü Sürer' : 'Döngü Biter'}
                </div>
              </div>
            </div>

            {/* Special event badge if break or continue */}
            {currentStep.stage === 'limit_reached' && (
              <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-amber-300 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Gösterim sınırına ulaşıldı:</strong> Gerçek döngünün tamamlandığı anlamına gelmez.
                </span>
              </div>
            )}

            {currentStep.stage === 'break_triggered' && (
              <div className="mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Break tetiklendi:</strong> Döngüden derhal çıkıldı!
                </span>
              </div>
            )}

            {currentStep.stage === 'continue_triggered' && (
              <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-amber-300 text-xs">
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Continue tetiklendi:</strong> Bu iterasyon atlandı, sayaç artırılacak.
                </span>
              </div>
            )}
          </div>

          {/* Stepped Explanation Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Adım Açıklaması</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans min-h-[4rem]">
              {currentStep.explanation}
            </p>
          </div>

          {/* Playback Controls Deck */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Adım: <strong className="text-white font-mono">{currentStepIdx + 1}</strong> / {steps.length}
              </span>

              {/* Speed selector */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="text-slate-500 mr-1">Hız:</span>
                {[1500, 1000, 500].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaySpeed(speed)}
                    className={`px-1.5 py-0.5 rounded ${
                      playSpeed === speed
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {speed === 1500 ? '0.7x' : speed === 1000 ? '1x' : '2x'}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleReset}
                title="Döngüyü Sıfırla"
                className="py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-950 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>

              <button
                onClick={handleStepBack}
                disabled={currentStepIdx === 0}
                title="Önceki Adım"
                className="py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-950 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 disabled:opacity-40 transition-colors"
              >
                <SkipBack className="w-3.5 h-3.5" />
                <span>Geri</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Durdur' : 'Otomatik Oynat'}
                className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
              </button>

              <button
                onClick={handleStepForward}
                disabled={currentStepIdx >= steps.length - 1}
                title="Sonraki Adım"
                className="py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-950 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 disabled:opacity-40 transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>İlerle</span>
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{
                  width: `${((currentStepIdx + 1) / Math.max(steps.length, 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Terminal / Console Output (3 cols) */}
        <div className="lg:col-span-3 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg flex flex-col h-full min-h-[380px]">
          <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-medium text-slate-300">Örnek Konsol Çıktısı (Simülasyon)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {currentStep.outputLog.length} satır
            </span>
          </div>

          {/* Terminal Screen */}
          <div className="p-4 bg-black/90 font-mono text-xs text-emerald-400 flex-1 overflow-y-auto space-y-1 select-text">
            <div className="text-slate-600 text-[11px] mb-2">
              # Beklenen çıktı · C# kodu çalıştırılmıyor
            </div>

            {currentStep.outputLog.length === 0 ? (
              <div className="text-slate-600 italic py-6 text-center">
                Henüz konsola veri yazdırılmadı.
                <br />
                <span className="text-[11px]">Adımları ilerleterek çıktıları görün.</span>
              </div>
            ) : (
              currentStep.outputLog.map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span className="text-emerald-300 font-semibold">{log}</span>
                </div>
              ))
            )}

            {/* Blinking cursor */}
            <div className="flex items-center gap-2 text-slate-500">
              <span>&gt;</span>
              <span className="inline-block w-2 h-3.5 bg-emerald-500/70 animate-pulse"></span>
            </div>
            <div ref={terminalEndRef}></div>
          </div>

          {/* Terminal footer summary */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Console.WriteLine()</span>
            {currentStep.stage === 'finished' || currentStep.stage === 'limit_reached' && (
              <span className="text-emerald-400 font-medium">Bitti</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
