import React, { useState, useMemo } from 'react';
import { SANDBOX_RECIPES } from '../data/sandboxRecipes';
import { Play, Copy, Check, Clock, Sparkles } from 'lucide-react';

export const LiveSandbox: React.FC = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(SANDBOX_RECIPES[0].id);
  const selectedRecipe = useMemo(
    () => SANDBOX_RECIPES.find((r) => r.id === selectedRecipeId) || SANDBOX_RECIPES[0],
    [selectedRecipeId]
  );

  const [inputs, setInputs] = useState<Record<string, string | number>>(selectedRecipe.defaultInputs);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // When changing recipe, initialize inputs with defaults
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
    const recipe = SANDBOX_RECIPES.find((r) => r.id === id);
    if (recipe) {
      setInputs(recipe.defaultInputs);
      setExecutionTime(null);
    }
  };

  const handleInputChange = (key: string, value: string | number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Run calculation
  const executionData = useMemo(() => {
    const t0 = performance.now();
    const output = selectedRecipe.run(inputs);
    const t1 = performance.now();
    return {
      output,
      duration: Math.max(0.05, Number((t1 - t0).toFixed(2))),
    };
  }, [selectedRecipe, inputs]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedRecipe.codeTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="canli-laboratuvar" className="py-12 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div>
          <div className="text-xs text-amber-400 font-medium tracking-wide">
            İnteraktif Algoritma Simülasyonu
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Canlı DateTime Laboratuvarı
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Sık karşılaşılan iş senaryolarını parametrelerini değiştirerek anında test edin,
            algoritmanın arkasındaki mantığı ve performansını izleyin.
          </p>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SANDBOX_RECIPES.map((recipe) => {
            const isSelected = recipe.id === selectedRecipeId;
            return (
              <button
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe.id)}
                className={`p-3 text-left rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/60 text-white shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="text-[10px] text-amber-400 font-mono mb-1">
                  {recipe.category}
                </div>
                <div className="text-xs font-semibold line-clamp-2 leading-snug">
                  {recipe.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Workspace 2-Zone Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Zone: Inputs & Live Execution Result Deck (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Parametre Girdileri</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Canlı Tetikleme</span>
              </div>

              {/* Dynamic Input Fields */}
              <div className="space-y-3">
                {Object.entries(selectedRecipe.inputLabels).map(([key, config]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {config.label}
                    </label>
                    <input
                      type={config.type}
                      value={inputs[key] !== undefined ? inputs[key] : ''}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          config.type === 'number' ? Number(e.target.value) : e.target.value
                        )
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Calculated Output Showcase */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Hesaplanan Sonuç
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <Clock className="w-3 h-3" />
                  {executionData.duration} ms
                </span>
              </div>

              {/* Primary Result Headline */}
              <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
                <div className="text-xs text-amber-300 font-medium mb-1">
                  Çıktı Özeti
                </div>
                <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {executionData.output.result}
                </div>
              </div>

              {/* Metric Breakdown Cards */}
              <div className="grid grid-cols-2 gap-2">
                {executionData.output.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
                    <div className="text-[11px] text-slate-400">{metric.label}</div>
                    <div className="text-sm font-bold text-white font-mono tabular-nums mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Educational Explanation */}
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200 block mb-0.5 font-semibold">
                  Nasıl Çalışır?
                </strong>
                {executionData.output.explanation}
              </div>
            </div>

          </div>

          {/* Right Zone: Interactive Code Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">

            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {selectedRecipe.title}.js
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 overflow-x-auto">
              <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                <code>{selectedRecipe.codeTemplate}</code>
              </pre>
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Enes Öztürk DateTime Mimari Önerisi</span>
              <span className="font-mono text-[11px] text-amber-400">Vanilla ES2024</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
