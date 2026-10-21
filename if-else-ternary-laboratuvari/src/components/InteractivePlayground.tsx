import React, { useState } from 'react';
import { SCENARIOS } from '../data/examplesData.ts';
import { CodeScenario } from '../types.ts';
import { Play, Copy, Check, Terminal, Sparkles, Sliders } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('original-prompt-example');
  const [scenarioValues, setScenarioValues] = useState<Record<string, any>>({
    'original-prompt-example': true,
    'driving-license': 19,
    'exam-grade': 75,
    'even-odd': 42,
    'user-auth': true,
  });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeScenario: CodeScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const currentValue = scenarioValues[activeScenario.id] ?? activeScenario.defaultValue;

  const updateValue = (newVal: any) => {
    setScenarioValues((prev) => ({
      ...prev,
      [activeScenario.id]: newVal,
    }));
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const ifElseCode = activeScenario.getIfElseCode(currentValue);
  const ternaryCode = activeScenario.getTernaryCode(currentValue);
  const output = activeScenario.getOutput(currentValue);
  const explanation = activeScenario.conditionExplanation(currentValue);

  return (
    <section id="simulator" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-10">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          Canlı Simülasyon Laboratuvarı · Enes Öztürk
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Farklı Senaryolarda If-Else ve Ternary Dönüşümü
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-3xl">
          Farklı algoritmik senaryoları seçin, değişken değerlerini değiştirin ve anında derlenmiş C# kodunu ve konsol çıktısını gözlemleyin.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all border ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{scenario.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Controller Bar */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 mb-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {activeScenario.inputConfig?.label || `${activeScenario.variableName} Değeri`}:
            </div>

            {/* If variable is boolean */}
            {activeScenario.variableType === 'bool' && (
              <div className="mt-2 inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  onClick={() => updateValue(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentValue === true
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  true (Doğru)
                </button>
                <button
                  onClick={() => updateValue(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentValue === false
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  false (Yanlış)
                </button>
              </div>
            )}

            {/* If variable is number */}
            {activeScenario.variableType === 'number' && (
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="range"
                  min={activeScenario.inputConfig?.min ?? 0}
                  max={activeScenario.inputConfig?.max ?? 100}
                  step={activeScenario.inputConfig?.step ?? 1}
                  value={currentValue}
                  onChange={(e) => updateValue(Number(e.target.value))}
                  className="w-full max-w-xs h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="font-mono text-base font-bold text-cyan-400 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg min-w-14 text-center">
                  {currentValue}
                </span>
              </div>
            )}

            <p className="mt-3 text-xs text-slate-400 italic">{explanation}</p>
          </div>

          {/* Quick Terminal Output Pill */}
          <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Anlık Konsol Çıktısı:</span>
            </div>
            <div className="font-mono text-sm font-bold text-emerald-400">
              {output}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Live Code Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* If Else Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <span className="text-xs font-bold text-blue-400">Klasik If - Else Biçimi</span>
            <button
              onClick={() => handleCopy(ifElseCode, 'ifelse')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-mono px-2 py-1 rounded bg-slate-800"
            >
              {copiedCode === 'ifelse' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'ifelse' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto flex-1 leading-relaxed">
            {ifElseCode}
          </pre>
        </div>

        {/* Ternary Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <span className="text-xs font-bold text-cyan-400">Ternary If (? :) Biçimi</span>
            <button
              onClick={() => handleCopy(ternaryCode, 'ternary')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-mono px-2 py-1 rounded bg-slate-800"
            >
              {copiedCode === 'ternary' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode === 'ternary' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto flex-1 leading-relaxed">
            {ternaryCode}
          </pre>
        </div>
      </div>
    </section>
  );
};
