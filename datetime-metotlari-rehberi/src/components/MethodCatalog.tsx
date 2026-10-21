import React, { useState, useMemo } from 'react';
import { DATETIME_METHODS } from '../data/datetimeMethods';
import { MethodCategory, MethodItem } from '../types/datetime';
import { Search, Play, Copy, Check, AlertTriangle, Code2 } from 'lucide-react';

export const MethodCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MethodCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [runOutputs, setRunOutputs] = useState<Record<string, string>>({});

  const categories: { key: MethodCategory; label: string }[] = [
    { key: 'all', label: 'Tüm Metotlar' },
    { key: 'olusturma', label: 'Oluşturma & Ayrıştırma' },
    { key: 'get', label: 'Okuma (Getters)' },
    { key: 'set', label: 'Düzenleme (Setters)' },
    { key: 'format', label: 'Formatlama' },
    { key: 'intl', label: 'Modern Intl API' },
    { key: 'hesaplama', label: 'Hesaplama & Fark' },
  ];

  const filteredMethods = useMemo(() => {
    return DATETIME_METHODS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (item.csharpEquivalent && item.csharpEquivalent.toLowerCase().includes(query)) ||
        (item.pythonEquivalent && item.pythonEquivalent.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExecuteSnippet = (method: MethodItem) => {
    try {
      // Create a captured console.log environment to run snippet safely
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
        },
      };

      // Wrap code in a function with custom console
      const runFn = new Function('console', method.exampleCode);
      runFn(customConsole);

      setRunOutputs((prev) => ({
        ...prev,
        [method.id]: logs.join('\n') || 'İşlem tamamlandı (Çıktı boş).',
      }));
    } catch (err: unknown) {
      setRunOutputs((prev) => ({
        ...prev,
        [method.id]: `Çalıştırma Hatası: ${err instanceof Error ? err.message : String(err)}`,
      }));
    }
  };

  return (
    <section id="metot-katalogu" className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs text-amber-400 font-medium tracking-wide">
              Etkileşimli Dokümantasyon
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              DateTime Metot Kataloğu
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              JavaScript Date motorundaki tüm kurucu, getter, setter, Intl ve hesaplama metotlarını canlı kodla deneyin.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Metot, etiket veya dil ara (örn: getMonth, ISO)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Count & Current Filter Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{filteredMethods.length} metot listeleniyor</span>
          <span aria-hidden="true">·</span>
          <span>ECMAScript & Node.js uyumlu</span>
          <span aria-hidden="true">·</span>
          <span>Enes Öztürk Analiz Notları Dahil</span>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMethods.map((method) => {
            const hasRun = runOutputs[method.id] !== undefined;

            return (
              <div
                key={method.id}
                className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-colors"
              >
                <div>
                  {/* Card Header & Return Type */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono tracking-tight flex items-center gap-2">
                        <span>{method.name}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="text-amber-400/90 font-medium">{method.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-400">{method.returnType}</span>
                      </div>
                    </div>

                    {/* Copy Snippet Button */}
                    <button
                      onClick={() => handleCopyCode(method.id, method.exampleCode)}
                      title="Kodu Kopyala"
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedId === method.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {method.summary}
                  </p>

                  {/* Syntax Preview */}
                  <div className="bg-slate-950/80 border border-slate-800/60 rounded-lg p-2.5 mb-3 font-mono text-xs text-amber-200/90 whitespace-pre-wrap leading-relaxed">
                    {method.syntax}
                  </div>

                  {/* Code Snippet Box */}
                  <div className="relative bg-slate-950 border border-slate-800/80 rounded-lg overflow-hidden mb-3">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-slate-800/80 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-slate-500" />
                        JavaScript Örneği
                      </span>
                      <button
                        onClick={() => handleExecuteSnippet(method)}
                        className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Çalıştır</span>
                      </button>
                    </div>

                    <pre className="p-3 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-48">
                      <code>{method.exampleCode}</code>
                    </pre>

                    {/* Live Execution Output Pane */}
                    {hasRun && (
                      <div className="p-3 bg-slate-900/95 border-t border-slate-800/90 text-xs font-mono">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                          <span>Konsol Çıktısı (Canlı)</span>
                          <span className="text-emerald-400">Başarılı</span>
                        </div>
                        <pre className="text-amber-300 whitespace-pre-wrap leading-relaxed">
                          {runOutputs[method.id]}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Common Pitfall Warning (If any) */}
                  {method.pitfalls && (
                    <div className="flex items-start gap-2.5 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg mb-3 text-xs text-amber-200/90">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 font-semibold block mb-0.5">
                          Enes Öztürk Dikkat Notu:
                        </strong>
                        {method.pitfalls}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cross-Language Equivalents Footer */}
                <div className="pt-3 border-t border-slate-800/80 text-xs space-y-1">
                  {method.csharpEquivalent && (
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                      <span className="text-slate-500">C# (.NET):</span>
                      <span className="text-slate-300 truncate max-w-[70%]">{method.csharpEquivalent}</span>
                    </div>
                  )}
                  {method.pythonEquivalent && (
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                      <span className="text-slate-500">Python:</span>
                      <span className="text-slate-300 truncate max-w-[70%]">{method.pythonEquivalent}</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
