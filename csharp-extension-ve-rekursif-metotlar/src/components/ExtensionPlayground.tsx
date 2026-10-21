import React, { useState, useMemo } from 'react';
import { EXTENSION_PRESETS, validateExtensionCode } from '../data/extensionExamples';
import { Check, X, ShieldAlert, ShieldCheck, Play, Code, RefreshCw, Layers } from 'lucide-react';

export const ExtensionPlayground: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('is_even');
  const [activeCode, setActiveCode] = useState<string>(EXTENSION_PRESETS[0].code);
  const [inputValue, setInputValue] = useState<string | number>(EXTENSION_PRESETS[0].sampleInput);
  const [executionResult, setExecutionResult] = useState<{ result: any; steps: string[] } | null>(null);

  // Selected preset object
  const currentPreset = useMemo(() => {
    return EXTENSION_PRESETS.find(p => p.id === selectedPresetId) || EXTENSION_PRESETS[0];
  }, [selectedPresetId]);

  // Code validation against the 3 Golden Rules
  const validation = useMemo(() => {
    return validateExtensionCode(activeCode);
  }, [activeCode]);

  // Load a preset
  const handleSelectPreset = (id: string) => {
    const preset = EXTENSION_PRESETS.find(p => p.id === id);
    if (preset) {
      setSelectedPresetId(id);
      setActiveCode(preset.code);
      setInputValue(preset.sampleInput);
      setExecutionResult(null);
    }
  };

  // Run the method
  const handleExecute = () => {
    if (currentPreset && validation.isValid) {
      const res = currentPreset.execute(inputValue);
      setExecutionResult(res);
    }
  };

  return (
    <div className="space-y-8">

      {/* Title & Preset Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Metot Genişletme Laboratuvarı</span>
            <span aria-hidden="true">·</span>
            <span>Tarayıcı Tabanlı Kural Denetimi</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400">Etkileşimli Örnek</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Extension Metot Laboratuvarı
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Geleneksel extension metot bildirimlerinin temel kurallarını inceleyin. Bu araç C# derleyicisi çalıştırmaz; yazdığınız metni sınırlı kurallara göre denetler.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {EXTENSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPresetId === preset.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Golden Rules Status Strip */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            )}
            <h3 className="text-sm font-bold text-white">
              Geleneksel C# Extension Metot Kuralları
            </h3>
          </div>
          <span className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
            validation.isValid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}>
            {validation.isValid ? 'TEMEL KURALLAR UYUMLU' : 'KURAL EKSİK'}
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Bu metin denetimi tam bir C# ayrıştırıcısı değildir; kodun derlendiğini garanti etmez.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {validation.rules.map((rule, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs transition-colors ${
                rule.isSatisfied
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">{rule.ruleName}</span>
                {rule.isSatisfied ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed mt-1">
                {rule.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Code Editor & Runner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: Code Editor (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-slate-300">MyExtension.cs</span>
            </div>
            <button
              onClick={() => handleSelectPreset(selectedPresetId)}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              title="Varsayılan koda sıfırla"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          </div>

          <div className="p-4">
            <textarea
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              rows={13}
              spellCheck={false}
              className="w-full bg-slate-900/90 text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 leading-relaxed resize-none"
            />
          </div>

          <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
            <span>Düzenlenebilir C# Kodu. 'static' veya 'this' anahtar kelimelerini silerek kuralları test edin!</span>
            <span className="font-mono text-cyan-400">Genişletilen Tip: {validation.detectedTargetType}</span>
          </div>
        </div>

        {/* Right: Preset demonstration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Execution Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Örnek Simülasyonunu Çalıştır</h3>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {currentPreset.targetType} Tipine Uygula
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {currentPreset.description}
            </p>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Bu simülasyon, seçili örneğin tarayıcıdaki hazır gösterim mantığını çalıştırır; düzenlediğiniz C# kodunu derlemez veya yürütmez.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Test Değeri ({currentPreset.targetType}):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    placeholder="Girdi girin..."
                  />
                  <button
                    onClick={handleExecute}
                    disabled={!validation.isValid}
                    className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    Çalıştır
                  </button>
                </div>
              </div>

              {/* Result Preview */}
              {executionResult ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Dönen Sonuç:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                      {String(executionResult.result)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-400">Çalışma İzleme Raporu:</div>
                    {executionResult.steps.map((st, idx) => (
                      <div key={idx} className="text-[11px] font-mono text-slate-300">
                        {st}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400">
                  Değeri girin ve 'Çalıştır' butonuyla önceden tanımlı örnek simülasyonunun sonucunu görün.
                </div>
              )}
            </div>

            {/* Fluent Chaining Example */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Akıcı Zincirleme (Fluent Chaining) Gücü:</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                deger.<span className="text-blue-400">ToString</span>().<span className="text-blue-400">ToUrlSlug</span>().<span className="text-blue-400">TersCevir</span>();
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                LINQ kütüphanesinin (<code className="text-cyan-300">.Where().Select().OrderBy()</code>) tüm altyapısı bu extension metot mekanizmasına dayanır.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
