import React, { useState, useMemo } from 'react';
import {
  STRING_METHODS,
  CATEGORIES,
  StringMethodInfo,
  MethodCategory,
} from '../data/stringMethods';
import {
  Search,
  Copy,
  Check,
  Play,
  Sparkles,
  Info,
  CornerDownRight,
  RotateCcw,
} from 'lucide-react';

const PRESET_STRINGS = [
  { label: 'Varsayılan Cümle', text: 'Enes Öztürk ile Modern JavaScript Geliştirme' },
  { label: 'URL Formatı', text: 'https://enesozturk.dev/api/v1/posts?sort=desc' },
  { label: 'E-Posta & Metin', text: 'iletisim@enesozturk.dev - Yazılım Mimarisi' },
  { label: 'Boşluklu & Satırlı', text: '   \n  Enes Öztürk Stüdyo 2026   \t  ' },
  { label: 'Sayısal & Kod', text: 'KART-4521-9980-3312' },
  { label: 'Türkçe Karakterler', text: 'Çiğdem ve Şule ışıklı caddede yürüyor' },
];

export const MethodLab: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('slice');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected method object
  const currentMethod: StringMethodInfo = useMemo(() => {
    return STRING_METHODS.find((m) => m.id === selectedMethodId) || STRING_METHODS[0];
  }, [selectedMethodId]);

  // Current working string
  const [inputString, setInputString] = useState<string>(currentMethod.defaultSample);

  // Dynamic parameters state
  const [paramsState, setParamsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    currentMethod.params.forEach((p) => {
      init[p.name] = p.defaultVal;
    });
    return init;
  });

  const [copiedCode, setCopiedCode] = useState(false);

  // When changing method, reset default sample and parameters
  const handleSelectMethod = (method: StringMethodInfo) => {
    setSelectedMethodId(method.id);
    setInputString(method.defaultSample);
    const newParams: Record<string, any> = {};
    method.params.forEach((p) => {
      newParams[p.name] = p.defaultVal;
    });
    setParamsState(newParams);
  };

  const handleParamChange = (name: string, value: any) => {
    setParamsState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Run the method execution
  const execution = useMemo(() => {
    try {
      return currentMethod.run(inputString, paramsState);
    } catch (err: any) {
      return {
        result: 'Hata',
        resultType: 'error',
        code: `${currentMethod.name}(...)`,
        explanation: err.message,
        isError: true,
        highlightRange: undefined as [number, number] | undefined,
      };
    }
  }, [currentMethod, inputString, paramsState]);

  // Filtered methods list
  const filteredMethods = useMemo(() => {
    return STRING_METHODS.filter((m) => {
      const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.signature.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-400 mb-1 tracking-wider uppercase">
              Laboratuvar & Etkileşimli Deney Alanı
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              JavaScript String Metotları Kataloğu
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-3xl leading-relaxed">
              Her metodun gerçek zamanlı parametre testlerini yapın, karakter indeks haritasını görsel
              olarak inceleyin ve Enes Öztürk'ün hazırladığı püf noktalarıyla dilin inceliklerini keşfedin.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span className="font-mono text-slate-300 font-semibold">{STRING_METHODS.length} Metot</span>
            <span>·</span>
            <span>Saf İmmutable (Orijinal Değişmez)</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tüm Metotlar ({STRING_METHODS.length})
            </button>
            {Object.entries(CATEGORIES).map(([catKey, catVal]) => {
              const count = STRING_METHODS.filter((m) => m.category === catKey).length;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === catKey
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {catVal.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Metot veya işlem ara..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Lab Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Method List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 mb-2">
            <span>Metot Listesi</span>
            <span className="font-mono">{filteredMethods.length} sonuç</span>
          </div>

          <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredMethods.map((method) => {
              const isSelected = method.id === selectedMethodId;
              return (
                <button
                  key={method.id}
                  onClick={() => handleSelectMethod(method)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-semibold text-white">
                      .{method.name}()
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {method.esVersion}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {method.shortDesc}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-indigo-400/90">{method.categoryLabel}</span>
                    <span className="text-slate-400">→ {method.returns}</span>
                  </div>
                </button>
              );
            })}

            {filteredMethods.length === 0 && (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-lg text-slate-400 text-xs">
                Aramanızla eşleşen string metodu bulunamadı.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Sandbox & Visual Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Method Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold font-mono text-indigo-400">
                    {currentMethod.signature}
                  </h2>
                  <span className="text-xs font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                    {currentMethod.esVersion}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {currentMethod.detailedDesc}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs text-slate-500 block">Dönüş Türü:</span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {currentMethod.returns}
                </span>
              </div>
            </div>

            {/* Input String Editor with Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span>Hedef Metin (Orijinal String)</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    (Uzunluk: {inputString.length})
                  </span>
                </label>
                <button
                  onClick={() => setInputString(currentMethod.defaultSample)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              </div>

              <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-indigo-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Test edilecek metni yazın..."
              />

              {/* Quick Presets */}
              <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none text-xs">
                <span className="text-slate-400 shrink-0 text-[11px]">Örnekler:</span>
                {PRESET_STRINGS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputString(p.text)}
                    className="px-2.5 py-1 text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Parameter Inputs */}
            {currentMethod.params.length > 0 && (
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  Parametre Ayarları ({currentMethod.params.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentMethod.params.map((p) => (
                    <div key={p.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-mono text-slate-300 font-medium">
                          {p.name}
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {p.type}
                        </span>
                      </div>
                      <input
                        type={p.type === 'number' ? 'number' : 'text'}
                        value={paramsState[p.name] ?? ''}
                        onChange={(e) =>
                          handleParamChange(
                            p.name,
                            p.type === 'number'
                              ? e.target.value === ''
                                ? ''
                                : Number(e.target.value)
                              : e.target.value
                          )
                        }
                        placeholder={p.placeholder || p.name}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Character Grid & Highlight Strip */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Görsel Karakter & İndeks Haritası
                </span>
                <span>
                  {execution.highlightRange
                    ? `Vurgulanan Aralık: [${execution.highlightRange[0]} ... ${execution.highlightRange[1]}]`
                    : 'Tüm Metin'}
                </span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto scrollbar-thin">
                <div className="flex items-center gap-1 min-w-max">
                  {inputString.split('').map((char, index) => {
                    const isHighlighted =
                      execution.highlightRange &&
                      index >= execution.highlightRange[0] &&
                      index < execution.highlightRange[1];

                    const negIndex = index - inputString.length;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center min-w-[34px] px-1 py-1 rounded transition-colors ${
                          isHighlighted
                            ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400/50'
                            : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {/* Positive index */}
                        <span className="text-[9px] font-mono text-slate-400">
                          {index}
                        </span>

                        {/* Character itself */}
                        <span className="text-sm font-mono my-0.5">
                          {char === ' ' ? '␣' : char === '\n' ? '↵' : char === '\t' ? '⇥' : char}
                        </span>

                        {/* Negative index */}
                        <span className="text-[9px] font-mono text-slate-400">
                          {negIndex}
                        </span>
                      </div>
                    );
                  })}
                  {inputString.length === 0 && (
                    <span className="text-xs text-slate-400 italic">Boş metin ("")</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                <span>Üst: Pozitif İndeks (0..n-1)</span>
                <span>Orta: Karakter (␣ = Boşluk)</span>
                <span>Alt: Negatif İndeks (-n..-1)</span>
              </div>
            </div>

            {/* Live Result Execution Output */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Canlı Çalışma Çıktısı (Evaluation)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-indigo-400">
                  Tür: {execution.resultType}
                </span>
              </div>

              {/* Display Result Value */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <pre className="font-mono text-sm text-emerald-300 overflow-x-auto whitespace-pre-wrap break-all">
                  {typeof execution.result === 'object'
                    ? JSON.stringify(execution.result, null, 2)
                    : String(execution.result)}
                </pre>
              </div>

              {/* Natural Explanation */}
              <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-800/80">
                <CornerDownRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{execution.explanation}</span>
              </div>

              {/* Code Generator & Copy Box */}
              <div className="flex items-center justify-between gap-3 p-2.5 bg-slate-900/90 rounded border border-slate-800">
                <div className="font-mono text-xs text-slate-300 truncate">
                  <span className="text-slate-400">const</span>{' '}
                  <span className="text-indigo-300">sonuc</span> ={' '}
                  <span className="text-amber-200 font-semibold">{execution.code}</span>;
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(`const str = "${inputString}";\nconst sonuc = ${execution.code};`)
                  }
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors shrink-0 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Kodu Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Author Pro Tip */}
            <div className="p-4 bg-indigo-950/30 border border-indigo-900/50 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Enes Öztürk'ten Not</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentMethod.proTip}
              </p>
            </div>

            {/* Real World Code Examples */}
            {currentMethod.examples.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pratik Örnek Senaryolar</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentMethod.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5"
                    >
                      <div className="text-[11px] font-medium text-slate-300">
                        {ex.title}
                      </div>
                      <div className="font-mono text-xs text-amber-300 bg-slate-900 p-2 rounded border border-slate-800/80 overflow-x-auto">
                        {ex.code}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400">
                        Çıktı: {ex.output}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
