import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, Code2, ExternalLink } from 'lucide-react';
import { CSHARP_FULL_CODE, QUESTION_DETAILS } from '../data/csharpCode';

export const CodeViewer: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'q1' | 'q2' | 'q3' | 'q4'>('all');
  const [copied, setCopied] = useState(false);

  const getCurrentCode = () => {
    if (selectedView === 'all') return CSHARP_FULL_CODE;
    const item = QUESTION_DETAILS.find((q) => q.id === selectedView);
    return item ? item.codeSnippet : CSHARP_FULL_CODE;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([CSHARP_FULL_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Program.cs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentCode = getCurrentCode();
  const codeLines = currentCode.split('\n');

  return (
    <div className="flex flex-col gap-6">
      {/* Selector & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
        {/* Code tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedView('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedView === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tam Program.cs (Tüm Sorular + Menü)
          </button>
          <button
            onClick={() => setSelectedView('q1')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedView === 'q1'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soru 1 Metodu
          </button>
          <button
            onClick={() => setSelectedView('q2')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedView === 'q2'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soru 2 Metodu
          </button>
          <button
            onClick={() => setSelectedView('q3')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedView === 'q3'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soru 3 Metodu
          </button>
          <button
            onClick={() => setSelectedView('q4')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedView === 'q4'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soru 4 Metodu
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Program.cs İndir</span>
          </button>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
        {/* Editor Header */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">
              {selectedView === 'all' ? 'Program.cs' : `Soru_${selectedView.toUpperCase()}.cs`}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">C# 101 Ödev 1 (Enes Öztürk)</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{codeLines.length} satır</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">UTF-8</span>
          </div>
        </div>

        {/* Code Lines Display */}
        <div className="p-4 overflow-x-auto max-h-[580px] terminal-scroll bg-[#060a12] text-slate-300 leading-relaxed">
          <pre className="flex flex-col">
            {codeLines.map((line, idx) => {
              // Basic color highlights for comments and keywords
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('///');
              const isRegion = line.trim().startsWith('#region') || line.trim().startsWith('#endregion');
              const isEnesSignature = line.includes('Enes Öztürk');

              return (
                <div key={idx} className="flex hover:bg-slate-900/40 px-1 py-0.5 rounded">
                  <span className="w-10 text-right pr-4 text-slate-600 select-none shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <span
                    className={`flex-1 font-mono ${
                      isEnesSignature
                        ? 'text-cyan-300 font-bold bg-cyan-950/20 px-1 rounded'
                        : isComment
                        ? 'text-slate-500 italic'
                        : isRegion
                        ? 'text-yellow-400/90 font-semibold'
                        : 'text-slate-200'
                    }`}
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Terminal Compilation Quick Guide */}
      <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
        <div>
          <span className="text-slate-300 font-semibold flex items-center gap-2 mb-1">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Lokal Ortamda C# Projesini Çalıştırma (.NET CLI):
          </span>
          <p className="text-slate-400 font-sans">
            Bu klasördeki C# konsol projesini .NET SDK ile çalıştırın:
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 shrink-0 select-all">
          <code>dotnet run --project Odev1_AlgoritmaSorulari.csproj</code>
        </div>
      </div>
    </div>
  );
};
