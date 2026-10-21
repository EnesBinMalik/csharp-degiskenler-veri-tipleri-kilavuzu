import React, { useState } from 'react';
import { METHOD_GUIDES } from '../data/methodGuides';
import { MethodKey } from '../types/arrayTypes';
import {
  ArrowDownAZ,
  Eraser,
  FlipHorizontal2,
  Search,
  Maximize2,
  Binary,
  PaintBucket,
  Play,
  Copy,
  Check,
  Info,
  Clock,
  HardDrive,
  Sparkles
} from 'lucide-react';

interface MethodGuideViewProps {
  onTryMethodInPlayground: (method: MethodKey) => void;
}

export const MethodGuideView: React.FC<MethodGuideViewProps> = ({
  onTryMethodInPlayground
}) => {
  const [selectedMethod, setSelectedMethod] = useState<MethodKey>('Sort');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const guide = METHOD_GUIDES[selectedMethod];

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getMethodIcon = (key: MethodKey) => {
    switch (key) {
      case 'Sort': return <ArrowDownAZ className="w-4 h-4 text-cyan-400" />;
      case 'Clear': return <Eraser className="w-4 h-4 text-rose-400" />;
      case 'Reverse': return <FlipHorizontal2 className="w-4 h-4 text-purple-400" />;
      case 'IndexOf': return <Search className="w-4 h-4 text-amber-400" />;
      case 'Resize': return <Maximize2 className="w-4 h-4 text-emerald-400" />;
      case 'BinarySearch': return <Binary className="w-4 h-4 text-blue-400" />;
      case 'Fill': return <PaintBucket className="w-4 h-4 text-fuchsia-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            C# System.Array Temel Mimarisi
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Array Sınıfı ve Statik Metotları
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            C# dilinde tüm diziler örtük olarak <code className="text-cyan-300 font-mono font-semibold">System.Array</code> soyut temel sınıfından türerler.
            Array sınıfı da dizilerle yapılan işlemleri (sıralama, arama, temizleme, ters çevirme, yeniden boyutlandırma) kolaylaştırmak için güçlü <strong>static</strong> hazır metotlar sunar.
          </p>
        </div>
      </div>

      {/* Main Grid: Method List (Left) & Detailed Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Metot Listesi
          </h3>
          {(Object.keys(METHOD_GUIDES) as MethodKey[]).map((key) => {
            const item = METHOD_GUIDES[key];
            const isSelected = selectedMethod === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMethod(key)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getMethodIcon(key)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-slate-100">
                      {item.name}
                    </span>
                    {key === 'Resize' && (
                      <span className="text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded">
                        ref
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-1">
                    {item.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Method Guide Body */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Title & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {getMethodIcon(guide.key)}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono text-white">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {guide.signature}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onTryMethodInPlayground(guide.key)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Laboratuvarda Canlı Dene
              </button>
            </div>

            {/* Complexity badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zaman Karmaşıklığı:</span>
                <strong className="font-mono text-cyan-300">{guide.timeComplexity}</strong>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                <span>Alan Karmaşıklığı:</span>
                <strong className="font-mono text-indigo-300">{guide.spaceComplexity}</strong>
              </div>
            </div>

            {/* Explanation paragraph */}
            <div className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {guide.fullDesc}
            </div>

            {/* Code example with copy button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>C# Kod Örneği:</span>
                <button
                  onClick={() => handleCopy(guide.promptExampleCode, guide.key)}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedKey === guide.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed">
                <pre>
                  <code>{guide.promptExampleCode}</code>
                </pre>
              </div>
            </div>

            {/* Parameters Table */}
            {guide.parameters.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Parametreler
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Parametre</th>
                        <th className="py-2 px-3">Tip</th>
                        <th className="py-2 px-3">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {guide.parameters.map((param, i) => (
                        <tr key={i} className="hover:bg-slate-950/40">
                          <td className="py-2.5 px-3 font-mono font-semibold text-cyan-300">
                            {param.name}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-indigo-300">
                            {param.type}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300">
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Önemli Noktalar & İpuçları
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {guide.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Note */}
            {guide.notes && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{guide.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
