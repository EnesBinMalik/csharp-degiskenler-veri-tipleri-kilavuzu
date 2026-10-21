import React, { useState } from 'react';
import { CROSS_LANG_ITEMS } from '../data/crossLangData';
import { Copy, Check, Terminal } from 'lucide-react';

export const LanguageComparison: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="coklu-dil-karsilastirma" className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="text-xs text-amber-400 font-medium tracking-wide">
            Platformlar Arası Karşılaştırma
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Çoklu Dil DateTime Eşdeğer Tablosu
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            JavaScript, C# (.NET), Python ve SQL arasında DateTime operasyonlarının sözdizimi farklarını hızlıca kıyaslayın ve kopyalayın.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-300">
                <th className="py-3.5 px-4 min-w-[200px]">Operasyon & Amaç</th>
                <th className="py-3.5 px-4 min-w-[220px] text-amber-400">JavaScript / TS</th>
                <th className="py-3.5 px-4 min-w-[220px] text-purple-400">C# (.NET)</th>
                <th className="py-3.5 px-4 min-w-[220px] text-sky-400">Python</th>
                <th className="py-3.5 px-4 min-w-[180px] text-emerald-400">SQL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs font-mono">
              {CROSS_LANG_ITEMS.map((item, index) => (
                <tr key={index} className="hover:bg-slate-850/50 transition-colors">
                  {/* Operation description */}
                  <td className="py-4 px-4 font-sans">
                    <div className="font-semibold text-white text-sm">
                      {item.operation}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {item.description}
                    </div>
                  </td>

                  {/* JavaScript */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-800/80">
                      <span className="text-amber-200 truncate">{item.javascript}</span>
                      <button
                        onClick={() => handleCopy(item.javascript, `js-${index}`)}
                        className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer"
                        title="Kopyala"
                      >
                        {copiedKey === `js-${index}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* C# */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-800/80">
                      <span className="text-purple-200 truncate">{item.csharp}</span>
                      <button
                        onClick={() => handleCopy(item.csharp, `cs-${index}`)}
                        className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer"
                        title="Kopyala"
                      >
                        {copiedKey === `cs-${index}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Python */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-800/80">
                      <span className="text-sky-200 truncate">{item.python}</span>
                      <button
                        onClick={() => handleCopy(item.python, `py-${index}`)}
                        className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer"
                        title="Kopyala"
                      >
                        {copiedKey === `py-${index}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* SQL */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-800/80">
                      <span className="text-emerald-200 truncate">{item.sql}</span>
                      <button
                        onClick={() => handleCopy(item.sql, `sql-${index}`)}
                        className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer"
                        title="Kopyala"
                      >
                        {copiedKey === `sql-${index}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
