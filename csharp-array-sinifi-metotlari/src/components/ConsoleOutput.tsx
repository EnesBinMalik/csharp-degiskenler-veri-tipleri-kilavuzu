import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2, Copy, Check } from 'lucide-react';
import { ExecutionLog } from '../types/arrayTypes';

interface ConsoleOutputProps {
  logs: ExecutionLog[];
  onClearLogs: () => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ logs, onClearLogs }) => {
  const [copied, setCopied] = React.useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCopyLogs = () => {
    const text = logs.map(l => `[${l.timestamp}] ${l.code}\n${l.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            Örnek Çıktı (Tarayıcı Simülasyonu)
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            C# çalıştırılmıyor
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyLogs}
            title="Konsol çıktısını kopyala"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClearLogs}
            title="Konsolu temizle"
            className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs overflow-y-auto flex-1 space-y-3 max-h-[360px] min-h-[180px]">
        {logs.length === 0 ? (
          <div className="text-slate-600 italic py-4">
            Henüz bir örnek metot simüle edilmedi. Yukarıdaki panellerden bir işlem seçin.
          </div>
        ) : (
          logs.map((log) => {
            let badgeColor = 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80';
            if (log.type === 'warn') badgeColor = 'text-amber-400 bg-amber-950/60 border-amber-800/80';
            if (log.type === 'success') badgeColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';

            return (
              <div key={log.id} className="border-l-2 border-slate-700 pl-3 py-1 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
                    <span className="text-indigo-400">&gt;</span> {log.code}
                  </span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-900/40 p-2 rounded border border-slate-800/60">
                  {log.output}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer with signature stamp */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono">C# derleyicisi/çalışma zamanı kullanılmıyor</span>
        <span className="text-cyan-400/80 font-medium">Hazırlayan: Enes Öztürk</span>
      </div>
    </div>
  );
};
