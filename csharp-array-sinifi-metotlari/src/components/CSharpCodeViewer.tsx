import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode } from 'lucide-react';
import { DataType } from '../types/arrayTypes';

interface CSharpCodeViewerProps {
  currentValues: (number | string | null)[];
  dataType: DataType;
  lastActionCode?: string;
}

export const CSharpCodeViewer: React.FC<CSharpCodeViewerProps> = ({
  currentValues,
  dataType,
  lastActionCode
}) => {
  const [copied, setCopied] = useState(false);

  const formattedValues = dataType === 'string'
    ? currentValues.map(v => v === null ? 'null' : `"${v}"`).join(', ')
    : currentValues.map(v => v ?? 'null').join(', ');

  const fullProgramCode = `using System;

namespace DiziMetotlariRehberi
{
    // Hazırlayan: Enes Öztürk
    internal class Program
    {
        static void Main(string[] args)
        {
            // 1) Dizi Tanımlama
            ${dataType}[] sayiDizisi = { ${formattedValues} };

            Console.WriteLine("Dizinin Elemanları:");
            foreach (var eleman in sayiDizisi)
            {
                Console.Write(eleman + " ");
            }
            Console.WriteLine();
${lastActionCode ? `\n            // Son Çalıştırılan Metot:\n            ${lastActionCode}\n` : ''}
            Console.WriteLine($"Eleman Sayısı (Length): {sayiDizisi.Length}");
        }
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullProgramCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            Program.cs (Örnek C# Kodu)
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
            Tarayıcı simülasyonu
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kodu Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body */}
      <p className="px-4 pt-2 text-[11px] text-amber-200">
        Bu örnek kod ekranda üretilir; uygulama C# derlemez veya çalıştırmaz.
      </p>
      <div className="p-4 font-mono text-xs overflow-y-auto flex-1 max-h-[360px] min-h-[180px] bg-slate-950 text-slate-300 leading-relaxed">
        <pre className="text-slate-300">
          <code>
            <span className="text-purple-400">using</span> System;{'\n\n'}
            <span className="text-purple-400">namespace</span>{' '}
            <span className="text-yellow-300">DiziMetotlariRehberi</span>{'\n'}
            {'{'}{'\n'}
            {'    '}<span className="text-slate-500">// Hazırlayan: Enes Öztürk</span>{'\n'}
            {'    '}<span className="text-purple-400">internal class</span>{' '}
            <span className="text-yellow-300">Program</span>{'\n'}
            {'    '}{'{'}{'\n'}
            {'        '}<span className="text-purple-400">static void</span>{' '}
            <span className="text-blue-400">Main</span>(
            <span className="text-teal-300">string</span>[] args){'\n'}
            {'        '}{'{'}{'\n'}
            {'            '}<span className="text-slate-500">// Mevcut dizi durumu</span>{'\n'}
            {'            '}
            <span className="text-teal-300">{dataType}</span>[] sayiDizisi = {'{ '}
            <span className="text-emerald-300 font-semibold">{formattedValues}</span>
            {' }'};{'\n'}
            {lastActionCode && (
              <>
                {'\n'}
                {'            '}<span className="text-slate-500">// Son Çalıştırılan Metot:</span>{'\n'}
                {'            '}
                <span className="text-cyan-300 font-bold bg-cyan-950/40 px-1 py-0.5 rounded">
                  {lastActionCode}
                </span>{'\n'}
              </>
            )}
            {'\n'}
            {'            '}Console.<span className="text-blue-400">WriteLine</span>(
            <span className="text-amber-200">$"Boyut: {'{'}sayiDizisi.Length{'}'}"</span>);{'\n'}
            {'        '}{'}'}{'\n'}
            {'    '}{'}'}{'\n'}
            {'}'}
          </code>
        </pre>
      </div>
    </div>
  );
};
