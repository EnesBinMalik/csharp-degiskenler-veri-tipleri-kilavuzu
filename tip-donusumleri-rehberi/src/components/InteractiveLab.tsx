import React, { useState, useId } from 'react';
import {
  DataType,
  ConversionMethod,
  TYPE_DETAILS,
  PRESET_SCENARIOS,
  IMPLICIT_CONVERSIONS,
} from '../types/conversion';
import { simulateConversion } from '../utils/conversionEngine';
import {
  Sparkles,
  Play,
  Copy,
  Check,
  AlertOctagon,
  ShieldAlert,
  Info,
  Binary,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface InteractiveLabProps {
  initialSource?: DataType;
  initialTarget?: DataType;
  initialValue?: string;
  initialMethod?: ConversionMethod;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  initialSource = 'int',
  initialTarget = 'float',
  initialValue = '25',
  initialMethod = 'implicit',
}) => {
  const [sourceType, setSourceType] = useState<DataType>(initialSource);
  const [targetType, setTargetType] = useState<DataType>(initialTarget);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [method, setMethod] = useState<ConversionMethod>(initialMethod);
  const [checkedMode, setCheckedMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const sourceSelectId = useId();
  const targetSelectId = useId();
  const methodSelectId = useId();
  const valueInputId = useId();

  // Run real-time simulation
  const result = simulateConversion(
    sourceType,
    targetType,
    inputValue,
    method,
    checkedMode
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result.csharpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setSourceType(preset.sourceType);
    setTargetType(preset.targetType);
    setInputValue(preset.value);
    setMethod(preset.method);
    if (preset.checkedMode !== undefined) {
      setCheckedMode(preset.checkedMode);
    }
  };

  const allTypes: DataType[] = [
    'byte',
    'sbyte',
    'short',
    'ushort',
    'int',
    'uint',
    'long',
    'ulong',
    'float',
    'double',
    'decimal',
    'char',
    'bool',
    'string',
    'object',
  ];

  const isImplicitAllowed = IMPLICIT_CONVERSIONS[sourceType]?.includes(targetType);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Title & Presets Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              İnteraktif Dönüşüm Laboratuvarı
            </h2>
            <p className="text-sm text-slate-400">
              C# dönüşüm örneklerini tarayıcıdaki eğitim simülatöründe inceleyin. Bu araç C# kodu derlemez veya gerçek bellek yerleşimini ölçmez.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start">
            Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
          </div>
        </div>

        {/* Quick Presets Pills */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-indigo-400" /> Hazır Senaryolar & Prompt Örnekleri:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCENARIOS.map((p) => {
              const isSelected =
                sourceType === p.sourceType &&
                targetType === p.targetType &&
                inputValue === p.value &&
                method === p.method;

              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.category === 'implicit'
                        ? 'bg-emerald-400'
                        : p.category === 'error_overflow'
                        ? 'bg-rose-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-indigo-400" /> Değişken ve Dönüşüm Ayarları
          </h3>

          {/* Source Type Selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={sourceSelectId} className="font-semibold text-slate-300 cursor-pointer">
                Kaynak Veri Tipi (Source)
              </label>
              <span className="text-slate-500 font-mono text-[11px]">
                {TYPE_DETAILS[sourceType].typeClassification === 'Referans türü'
                  ? 'Boyut bağlama bağlı'
                  : `${TYPE_DETAILS[sourceType].bits}-bit (${TYPE_DETAILS[sourceType].bytes} bayt)`}
              </span>
            </div>
            <select
              id={sourceSelectId}
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as DataType)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none transition-colors"
            >
              {allTypes.map((t) => (
                <option key={t} value={t}>
                  {t} ({TYPE_DETAILS[t].bits} bit - {TYPE_DETAILS[t].clrType})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 italic">
              {TYPE_DETAILS[sourceType].description}
            </p>
          </div>

          {/* Value Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={valueInputId} className="font-semibold text-slate-300 cursor-pointer">
                Değişkene Atanacak Değer
              </label>
              <span className="text-[11px] text-indigo-400">
                Aralık: {TYPE_DETAILS[sourceType].minValue} .. {TYPE_DETAILS[sourceType].maxValue}
              </span>
            </div>
            <div className="relative">
              <input
                id={valueInputId}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Örn: 25, 300, 3.99, null, '123'"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            {/* Quick value presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['25', '10', '300', '3.99', '1923', 'yuz-yirmi-uc', 'null'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInputValue(val)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Target Type Selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor={targetSelectId} className="font-semibold text-slate-300 cursor-pointer">
                Hedef Veri Tipi (Target)
              </label>
              <span className="text-slate-500 font-mono text-[11px]">
                {TYPE_DETAILS[targetType].typeClassification === 'Referans türü'
                  ? 'Boyut bağlama bağlı'
                  : `${TYPE_DETAILS[targetType].bits}-bit (${TYPE_DETAILS[targetType].bytes} bayt)`}
              </span>
            </div>
            <select
              id={targetSelectId}
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as DataType)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none transition-colors"
            >
              {allTypes.map((t) => (
                <option key={t} value={t}>
                  {t} ({TYPE_DETAILS[t].typeClassification === 'Referans türü' ? 'boyut bağlama bağlı' : `${TYPE_DETAILS[t].bits} bit`} - {TYPE_DETAILS[t].clrType})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 italic">
              {TYPE_DETAILS[targetType].description}
            </p>
          </div>

          {/* Conversion Method */}
          <div className="space-y-1.5">
            <label htmlFor={methodSelectId} className="text-xs font-semibold text-slate-300 cursor-pointer block">
              Dönüşüm Yöntemi
            </label>
            <select
              id={methodSelectId}
              value={method}
              onChange={(e) => setMethod(e.target.value as ConversionMethod)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-medium focus:border-indigo-500 focus:outline-none transition-colors"
            >
              <option value="implicit">
                Implicit (Bilinçsiz / Otomatik) {isImplicitAllowed ? '✅ Güvenli' : '❌ Hata Verir'}
              </option>
              <option value="explicit_cast">
                Explicit Cast: ({targetType})değer
              </option>
              <option value="convert_class">
                Convert Sınıfı: Convert.To...()
              </option>
              <option value="parse">
                Parse Metodu: {targetType}.Parse()
              </option>
              <option value="try_parse">
                TryParse Metodu: {targetType}.TryParse()
              </option>
              <option value="to_string">
                ToString(): değer.ToString()
              </option>
              <option value="boxing_unboxing">
                Boxing & Unboxing (Değer &lt;-&gt; Object)
              </option>
            </select>
          </div>

          {/* Checked Mode Toggle (for explicit cast) */}
          {method === 'explicit_cast' && (
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">checked Bloğu</span>
                <span className="text-[11px] text-slate-400">
                  Taşma olduğunda sessiz kalmayıp OverflowException fırlatır
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCheckedMode(!checkedMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  checkedMode ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    checkedMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Quick status summary badge */}
          <div className="pt-2 text-xs flex items-center gap-2">
            <span className="text-slate-400">Implicit Geçiş Durumu:</span>
            {isImplicitAllowed ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Desteklenir (Otomatik)
              </span>
            ) : (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Explicit (Açık müdahale) gerekir
              </span>
            )}
          </div>
        </div>

        {/* Output & Simulation Results Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Execution Result Banner */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-xl transition-all ${
              result.success
                ? result.warningMessage
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-rose-950/25 border-rose-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                {result.success ? (
                  result.warningMessage ? (
                    <>
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300">Dönüştürüldü Ancak Veri Bozuldu (Taşma)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Dönüşüm Başarılı</span>
                    </>
                  )
                ) : (
                  <>
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-300">İstisna / Hata Oluştu</span>
                  </>
                )}
              </span>

              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-900 border border-slate-700 text-slate-300">
                {method}
              </span>
            </div>

            {/* Target Value Large Display */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-0.5">
                  Çıktı Değeri ({targetType}):
                </span>
                <span
                  className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                    result.success
                      ? result.warningMessage
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {result.convertedValueDisplay}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Dönüşüm Türü</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {method === 'implicit' ? 'Implicit (Bilinçsiz)' : 'Explicit (Bilinçli)'}
                </span>
              </div>
            </div>

            {/* Warnings or Error specifics */}
            {result.errorMessage && (
              <div className="bg-rose-950/40 border border-rose-900/60 rounded-lg p-3 text-xs text-rose-300 font-mono mb-3">
                <strong>{result.exceptionName || 'Hata'}:</strong> {result.errorMessage}
              </div>
            )}
            {result.warningMessage && (
              <div className="bg-amber-950/40 border border-amber-900/60 rounded-lg p-3 text-xs text-amber-300 font-sans mb-3">
                {result.warningMessage}
              </div>
            )}

            {/* Explanation text */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {result.explanation}
            </p>
          </div>

          {/* Live Bit Analysis (if available) */}
          {result.bitAnalysis && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Binary className="w-4 h-4 text-indigo-400" />
                  Bellek ve Bit Düzeyinde Kesilme İncelemesi
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  {result.bitAnalysis.sourceTotalBits}-bit &rarr; {result.bitAnalysis.targetTotalBits}-bit
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <div className="text-slate-400 text-[11px] mb-1 flex items-center justify-between">
                    <span>
                      Kaynak ({sourceType} = {inputValue}) [{result.bitAnalysis.sourceTotalBits} bit]:
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 tracking-wider break-all">
                    {result.bitAnalysis.hasTruncation ? (
                      <>
                        <span className="text-rose-400 line-through bg-rose-950/30 px-1 rounded">
                          {result.bitAnalysis.lostBits}
                        </span>{' '}
                        <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1 rounded">
                          {result.bitAnalysis.preservedBits}
                        </span>
                      </>
                    ) : (
                      result.bitAnalysis.sourceBitsFormatted
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-1">
                    Hedefe Sığan Sonuç ({targetType} = {result.rawTargetValue}) [{result.bitAnalysis.targetTotalBits} bit]:
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold tracking-wider break-all">
                    {result.bitAnalysis.targetBitsFormatted}
                  </div>
                </div>
              </div>

              {result.bitAnalysis.hasTruncation && (
                <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300 leading-relaxed">
                  🛑 <strong>Neden Sayı Bozuldu?</strong> {sourceType} ({result.bitAnalysis.sourceTotalBits} bit) {targetType} tipine ({result.bitAnalysis.targetTotalBits} bit) dönüştürülürken üstteki bitler belleğe sığmadığı için atıldı! Kalan bitlerin sayısal değeri <strong>{result.rawTargetValue}</strong> etmektedir.
                </div>
              )}
            </div>
          )}

          {/* Memory Allocation Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-white block">
                Tür Bilgisi ve Simülasyon Notu
              </span>
              <p className="text-slate-300 leading-relaxed">
                {result.memoryNote}
              </p>
              <div className="text-[11px] text-slate-400 pt-1 flex flex-wrap gap-4 font-mono">
                <span>Kaynak: {TYPE_DETAILS[sourceType].typeClassification}</span>
                <span>•</span>
                <span>Hedef: {TYPE_DETAILS[targetType].typeClassification}</span>
              </div>
            </div>
          </div>

          {/* Generated C# Code Snippet with Copy */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">Program.cs</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Kodu Kopyala
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed selection:bg-indigo-600/40">
              <code>{result.csharpCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
