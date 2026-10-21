import React, { useState, useEffect, useRef } from 'react';
import { SCENARIOS } from '../../data/scenarios';
import { Scenario, ExecutionStep } from '../../types';
import { CodeViewer } from './CodeViewer';
import { FlowchartView } from './FlowchartView';
import { VariablesInspector } from './VariablesInspector';
import { TerminalConsole, ConsoleLog } from './TerminalConsole';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Sparkles,
  Info,
  Quote,
  Lightbulb,
  Sliders,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface SimulatorViewProps {
  onOpenManifesto: () => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ onOpenManifesto }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  // Dynamic input values per scenario
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    currentScenario.inputs.forEach((inp) => {
      initial[inp.id] = inp.defaultValue;
    });
    return initial;
  });

  // Steps generated based on inputs
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1200); // 1.2s per step
  const [logs, setLogs] = useState<ConsoleLog[]>([]);

  // Update inputs and reset when scenario changes
  useEffect(() => {
    const newInputs: Record<string, string> = {};
    currentScenario.inputs.forEach((inp) => {
      newInputs[inp.id] = inp.defaultValue;
    });
    setInputs(newInputs);
    resetSimulation(newInputs, currentScenario);
  }, [selectedScenarioId]);

  // Regenerate steps and reset
  const resetSimulation = (inputValues = inputs, scenario = currentScenario) => {
    setIsPlaying(false);
    const newSteps = scenario.generateSteps(inputValues);
    setSteps(newSteps);
    setCurrentStepIndex(-1);
    setLogs([]);
  };

  const handleInputChange = (id: string, value: string) => {
    const updated = { ...inputs, [id]: value };
    setInputs(updated);
    resetSimulation(updated);
  };

  const handleApplyPreset = (presetValues: Record<string, string>) => {
    const updated = { ...inputs, ...presetValues };
    setInputs(updated);
    resetSimulation(updated);
  };

  // Step Forward
  const stepForward = () => {
    if (steps.length === 0) return;

    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = steps[nextIndex];
      setCurrentStepIndex(nextIndex);

      if (nextStep.consoleOutput) {
        setLogs((prev) => [
          ...prev,
          {
            id: `log-${Date.now()}-${Math.random()}`,
            type: nextStep.consoleOutput!.type,
            text: nextStep.consoleOutput!.text,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
    } else {
      setIsPlaying(false);
    }
  };

  // Auto-play timer loop
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          stepForward();
        } else {
          setIsPlaying(false);
        }
      }, speedMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps, speedMs]);

  // Current step details
  const activeStep = currentStepIndex >= 0 ? steps[currentStepIndex] : undefined;
  const isComplete = currentStepIndex === steps.length - 1 && steps.length > 0;

  // Track lines executed so far
  const executedLines = steps
    .slice(0, currentStepIndex + 1)
    .map((s) => s.lineNumber);

  // Check if an exception was thrown in past or current steps
  const exceptionStep = steps.slice(0, currentStepIndex + 1).find((s) => s.isErrorTrigger || s.exceptionThrown);
  const hasException = Boolean(exceptionStep);
  const failedLine = exceptionStep?.lineNumber;

  return (
    <div className="space-y-6">
      {/* Top Bar: Scenario Selector & Prompt Alignment */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Senaryo Seçimi
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                Kullanıcı İstemindeki C# int.Parse Toplama Örneği ve Diğer Durumlar
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    selectedScenarioId === sc.id
                      ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <p className="font-semibold truncate">{sc.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{sc.shortDescription}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inputs & Quick Presets Section */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Dynamic input inputs */}
          <div className="flex flex-wrap items-center gap-3 text-xs w-full md:w-auto">
            {currentScenario.inputs.map((inp) => (
              <div key={inp.id} className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <label className="text-slate-400 font-medium whitespace-nowrap">{inp.label}:</label>
                <input
                  type="text"
                  value={inputs[inp.id] ?? ''}
                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                  placeholder={inp.placeholder}
                  className="bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-slate-100 font-mono w-28 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Hızlı Denemeler:</span>
            {currentScenario.presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.values)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 text-[11px] transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: Play / Step / Reset / Speed */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg sticky top-[69px] z-20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={() => {
              if (isComplete) {
                resetSimulation();
                setTimeout(() => setIsPlaying(true), 100);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium text-xs shadow-md transition-all ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Duraklat
              </>
            ) : isComplete ? (
              <>
                <RotateCcw className="w-4 h-4" /> Yeniden Başlat
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Otomatik Çalıştır
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={() => {
              setIsPlaying(false);
              stepForward();
            }}
            disabled={isComplete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <SkipForward className="w-4 h-4 text-indigo-400" />
            <span>Adım İlerle</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => resetSimulation()}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Status indicator & Speed control */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>İlerleme:</span>
            <span className="font-mono text-slate-200 font-semibold">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[11px]">
            <Sliders className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Hız:</span>
            {[
              { label: '0.5x', ms: 1800 },
              { label: '1x', ms: 1200 },
              { label: '2x', ms: 600 }
            ].map((sp) => (
              <button
                key={sp.label}
                onClick={() => setSpeedMs(sp.ms)}
                className={`px-1.5 py-0.5 rounded ${
                  speedMs === sp.ms
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Code, Right Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Window (7 cols) */}
        <div className="lg:col-span-7 h-[580px]">
          <CodeViewer
            lines={currentScenario.lines}
            currentStep={activeStep}
            executedLines={executedLines}
            failedLine={failedLine}
          />
        </div>

        {/* Right Column: Flowchart, Variables, Console (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <FlowchartView
            currentBlock={activeStep?.block}
            hasException={hasException}
            isComplete={isComplete}
          />

          <VariablesInspector
            currentStep={activeStep}
            hasException={hasException}
            exceptionInfo={exceptionStep?.exceptionThrown}
          />

          <TerminalConsole logs={logs} onClear={() => setLogs([])} />
        </div>
      </div>

      {/* Enes Öztürk's Insight & Architectural Note Box */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Quote className="w-32 h-32 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
            <Lightbulb className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Geliştirici Notu & Açık Analizi
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Enes Öztürk</span>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed italic">
              "Uygulama geliştirirken bu tarz hataya neden olabilecek noktaları yakalıyor olmak gerekiyor.
              Bunun için de kod üzerinde zaman geçirmek ve düşünmek gerekiyor. Hızlıca kodu yazıp geçmek doğru bir yaklaşım değildir.
              Yazdığımız kod bloğunun açıklarını düşünmemiz ve bu açıklar için önlemler alıyor olmamız gerekiyor."
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Önemli Çıkarım:</span>
                <span>{currentScenario.didYouKnow}</span>
              </div>
              <button
                onClick={onOpenManifesto}
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 font-medium"
              >
                Tüm Prensipleri İncele →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
