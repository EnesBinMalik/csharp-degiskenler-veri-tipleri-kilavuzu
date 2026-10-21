import React, { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Trash2, Check } from 'lucide-react';

export interface ConsoleLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
  timestamp: string;
}

interface TerminalConsoleProps {
  logs: ConsoleLog[];
  onClear: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ logs, onClear }) => {
  const [copied, setCopied] = React.useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const copyToClipboard = () => {
    const text = logs.map(l => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden flex flex-col h-full font-mono">
      {/* Terminal Header */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Konsol Çıktısı (stdout / stderr)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Konsolu Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClear}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
            title="Konsolu Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-3.5 overflow-y-auto flex-1 text-xs space-y-1.5 min-h-[160px] max-h-[220px]">
        <div className="text-slate-600 select-none pb-1 border-b border-slate-900 flex items-center justify-between">
          <span>Microsoft (R) .NET Core SDK 8.0 - C# Runtime</span>
          <span className="text-[10px]">C:\Users\EnesOzturk\App</span>
        </div>

        {logs.length === 0 ? (
          <div className="text-slate-600 italic py-4">
            Henüz konsol çıktısı yok. Program çalıştırıldığında çıktılar burada görüntülenecektir.
          </div>
        ) : (
          logs.map((log) => {
            let textColor = 'text-slate-300';
            let prefix = '';

            if (log.type === 'input') {
              textColor = 'text-sky-300';
              prefix = '';
            } else if (log.type === 'error') {
              textColor = 'text-rose-400 font-semibold';
            } else if (log.type === 'success') {
              textColor = 'text-emerald-400 font-medium';
            } else if (log.type === 'system') {
              textColor = 'text-slate-500 italic text-[11px]';
            }

            return (
              <div key={log.id} className={`leading-relaxed break-words ${textColor}`}>
                {prefix}
                {log.text}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
