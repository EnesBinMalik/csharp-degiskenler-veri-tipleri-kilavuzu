import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
  Sliders,
  Copy,
  Check,
  Sparkles,
  Code2,
  FileCode
} from 'lucide-react';
import { PLAYGROUND_TEMPLATES } from '../data/lessonsData';

export const Playground: React.FC = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const activeTemplate = PLAYGROUND_TEMPLATES[selectedTemplateIndex];

  // While state
  const [whileStart, setWhileStart] = useState<number>(1);
  const [whileLimit, setWhileLimit] = useState<number>(5);
  const [whileStep, setWhileStep] = useState<number>(1);

  // ForEach state
  const [arrayStr, setArrayStr] = useState<string>('2, 4, 5, 1, 2, 4');

  // Execution state
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Update parameters when template changes
  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    const tmpl = PLAYGROUND_TEMPLATES[idx];
    if (tmpl.type === 'while' || tmpl.type === 'while-down') {
      setWhileStart(tmpl.initialVal || 1);
      setWhileLimit(tmpl.limit || 5);
      setWhileStep(tmpl.step || 1);
    } else if (tmpl.type === 'foreach') {
      setArrayStr(tmpl.array?.join(', ') || '2, 4, 5, 1, 2, 4');
    }
    setConsoleOutput([]);
  };

  const handleRunCode = () => {
    const tmpl = PLAYGROUND_TEMPLATES[selectedTemplateIndex];
    let parsedArray: number[] = [];
    if (tmpl.type === 'foreach') {
      const values = arrayStr.split(',').map((value) => value.trim());
      parsedArray = values.map((value) => Number(value));
      const total = parsedArray.reduce((sum, value) => sum + value, 0);
      if (
        values.length === 0 ||
        values.length > 10 ||
        values.some((value) => !/^-?\d+$/.test(value)) ||
        parsedArray.some((value) => !Number.isInteger(value) || value < -2147483648 || value > 2147483647) ||
        total < -2147483648 ||
        total > 2147483647
      ) {
        setInputError('1-10 arasında 32 bit tam sayı girin; dizi toplamı da int aralığında kalmalıdır.');
        setConsoleOutput([]);
        return;
      }
    } else if (
      ![whileStart, whileLimit, whileStep].every(Number.isSafeInteger) ||
      [whileStart, whileLimit, whileStep].some((value) => value < -2147483648 || value > 2147483647) ||
      whileStep < 1
    ) {
      setInputError('Başlangıç ve sınır int aralığında tam sayı olmalı; adım 1 veya daha büyük olmalıdır.');
      setConsoleOutput([]);
      return;
    }

    setInputError(null);
    setIsRunning(true);
    setConsoleOutput([]);

    setTimeout(() => {
      const logs: string[] = [];

      if (tmpl.type === 'while') {
        let sayac = whileStart;
        logs.push(`[Simülasyon]: While örneği başladı. (sayac = ${sayac}, sınır <= ${whileLimit})`);
        let count = 0;
        let stoppedAtIntLimit = false;
        while (sayac <= whileLimit && count < 100) {
          logs.push(`Çıktı: ${sayac}`);
          if (sayac > 2147483647 - whileStep) {
            logs.push('[Simülasyon]: int sınırına ulaşılacağı için gösterim durduruldu; döngü normal tamamlanmadı.');
            stoppedAtIntLimit = true;
            break;
          }
          sayac += whileStep;
          count++;
        }
        if (!stoppedAtIntLimit) {
          logs.push(count === 100 && sayac <= whileLimit
            ? '[Simülasyon]: Gösterim 100 iterasyonda durdu; koşul hâlâ true, döngü tamamlanmadı.'
            : `[Simülasyon]: Örnek döngü tamamlandı. Toplam iterasyon sayısı: ${count}`);
        }
      } else if (tmpl.type === 'while-down') {
        let sayac = whileStart;
        logs.push(`[Simülasyon]: Geriye sayım örneği başladı. (sayac = ${sayac}, alt sınır >= ${whileLimit})`);
        let count = 0;
        let stoppedAtIntLimit = false;
        while (sayac >= whileLimit && count < 100) {
          logs.push(`Çıktı: ${sayac}`);
          if (sayac < -2147483648 + whileStep) {
            logs.push('[Simülasyon]: int sınırına ulaşılacağı için gösterim durduruldu; döngü normal tamamlanmadı.');
            stoppedAtIntLimit = true;
            break;
          }
          sayac -= whileStep;
          count++;
        }
        if (!stoppedAtIntLimit) {
          logs.push(count === 100 && sayac >= whileLimit
            ? '[Simülasyon]: Gösterim 100 iterasyonda durdu; koşul hâlâ true, döngü tamamlanmadı.'
            : `[Simülasyon]: Örnek döngü tamamlandı. İterasyon sayısı: ${count}`);
        }
      } else {
        const arr = parsedArray;
        logs.push(`[Simülasyon]: Foreach örneği başladı. Dizi eleman sayısı: ${arr.length}`);
        let total = 0;
        arr.forEach((item, i) => {
          total += item;
          logs.push(`Eleman [${i}] = ${item} -> Ara Toplam: ${total}`);
        });
        logs.push(`[Simülasyon]: Örnek toplam tamamlandı. Nihai sonuç: ${total}`);
      }

      setConsoleOutput(logs);
      setIsRunning(false);
    }, 400);
  };

  // Generate the active C# code preview
  const generatedCode = React.useMemo(() => {
    const tmpl = PLAYGROUND_TEMPLATES[selectedTemplateIndex];
    if (tmpl.type === 'while') {
      return `using System;

class Program
{
    static void Main()
    {
        // Enes Öztürk - While Döngüsü Örneği
        int sayac = ${whileStart};

        while (sayac <= ${whileLimit})
        {
            Console.WriteLine(sayac);
            sayac += ${whileStep};
        }

        Console.WriteLine("Döngü bitti.");
    }
}`;
    } else if (tmpl.type === 'while-down') {
      return `using System;

class Program
{
    static void Main()
    {
        // Enes Öztürk - Geriye Sayım While
        int sayac = ${whileStart};

        while (sayac >= ${whileLimit})
        {
            Console.WriteLine(sayac);
            sayac -= ${whileStep};
        }

        Console.WriteLine("Geri sayım tamamlandı!");
    }
}`;
    } else {
      return `using System;

class Program
{
    static void Main()
    {
        // Enes Öztürk - ForEach Dizi Toplama Örneği
        int[] sayiDizisi = { ${arrayStr} };
        int toplam = 0;

        foreach (int i in sayiDizisi)
        {
            toplam += i;
            Console.WriteLine($"i: {i}, anlık toplam: {toplam}");
        }

        Console.WriteLine($"Genel Toplam: {toplam}");
    }
}`;
    }
  }, [selectedTemplateIndex, whileStart, whileLimit, whileStep, arrayStr]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                LABORATUVAR
              </span>
              <span className="text-xs text-slate-400">Tarayıcı tabanlı örnek simülasyonu</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Kod Laboratuvarı & Sandbox
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Şablon ve parametreleri değiştirerek beklenen örnek çıktıyı görün. C# kodu derlenmez veya çalıştırılmaz.
          </p>
        </div>

        {/* Template Selector */}
        <div className="mt-5 flex flex-wrap gap-2">
          {PLAYGROUND_TEMPLATES.map((tmpl, idx) => (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                selectedTemplateIndex === idx
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tmpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Editor Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-slate-300 font-semibold">Program.cs</span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm bg-slate-950 text-slate-200 overflow-x-auto flex-grow">
            <pre className="text-slate-300 leading-relaxed">{generatedCode}</pre>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Şablon: <span className="text-indigo-300 font-semibold">{activeTemplate.title}</span>
            </div>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              {isRunning ? 'Simüle Ediliyor...' : 'Örnek Çıktıyı Göster'}
            </button>
          </div>
        </div>

        {/* Right: Parameters & Console (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Controls */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-md">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Dinamik Parametre Ayarları
            </h3>

            {activeTemplate.type.startsWith('while') ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Başlangıç Değeri (sayac):</label>
                    <input
                      type="number"
                      value={whileStart}
                      onChange={(e) => setWhileStart(Number(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Koşul Sınırı:</label>
                    <input
                      type="number"
                      value={whileLimit}
                      onChange={(e) => setWhileLimit(Number(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Artış/Azalış Adımı:</label>
                  <input
                    type="number"
                    min="1"
                    value={whileStep}
                    onChange={(e) => setWhileStep(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Dizi Elemanları (sayiDizisi):</label>
                <input
                  type="text"
                  value={arrayStr}
                  onChange={(e) => {
                    setArrayStr(e.target.value);
                    setInputError(null);
                  }}
                  placeholder="2, 4, 5, 1, 2, 4"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  1-10 tam sayıyı virgülle ayırın.
                </span>
              </div>
            )}
            {inputError && <p role="alert" className="mt-3 text-xs text-rose-300">{inputError}</p>}
          </div>

          {/* Console Output */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl flex-grow flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold">C# Terminal Konsolu</span>
              </div>
              {consoleOutput.length > 0 && (
                <button
                  onClick={() => setConsoleOutput([])}
                  className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  Temizle
                </button>
              )}
            </div>

            <div className="font-mono text-xs bg-black/80 rounded-xl p-3 border border-slate-900 h-44 overflow-y-auto space-y-1.5 text-emerald-400">
              {consoleOutput.length === 0 ? (
                <div className="text-slate-600 italic py-4 text-center">
                  "Örnek Çıktıyı Göster" düğmesine tıklayarak simüle edilmiş sonucu burada görebilirsiniz.
                </div>
              ) : (
                consoleOutput.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className={line.includes('Tamamlandı') || line.includes('Nihai') ? 'text-white font-bold' : ''}>
                      {line}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
