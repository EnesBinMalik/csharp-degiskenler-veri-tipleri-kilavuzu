import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, CheckCircle2, AlertOctagon, Sparkles, Copy, Check } from 'lucide-react';

interface CodeScenario {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string[];
  hasError?: boolean;
}

export const CodePlayground: React.FC = () => {
  const scenarios: CodeScenario[] = [
    {
      id: 'enes-example',
      title: 'Örnek Senaryo (Karma Türler)',
      description: 'string, int ve bool tiplerinin tek bir ArrayList içerisinde saklanması.',
      code: `using System;
using System.Collections;

class Program
{
    static void Main()
    {
        ArrayList dizi = new ArrayList();

        dizi.Add("Kedi");  // string
        dizi.Add(99);      // int
        dizi.Add(true);    // bool

        Console.WriteLine("--- DİZİ İÇERİĞİ ---");
        for (int i = 0; i < dizi.Count; i++)
        {
            Console.WriteLine($"dizi[{i}] = {dizi[i]} (Tip: {dizi[i].GetType().Name})");
        }

        Console.WriteLine($"\\nToplam Eleman (Count): {dizi.Count}");
        Console.WriteLine($"Ayrılan Kapasite (Capacity): {dizi.Capacity}");
    }
}`,
      output: [
        'Eğitim amaçlı örnek çıktı:',
        '--- DİZİ İÇERİĞİ ---',
        'dizi[0] = Kedi (Tip: String)',
        'dizi[1] = 99 (Tip: Int32)',
        'dizi[2] = True (Tip: Boolean)',
        '',
        'Toplam Eleman (Count): 3',
        'Ayrılan Kapasite (Capacity): 4',
      ],
    },
    {
      id: 'doubling-scenario',
      title: 'Kapasite İkiye Katlanması (4 ➔ 8)',
      description: '5. eleman eklendiğinde arka planda kapasitenin 8\'e çıkmasının konsol çıktısı.',
      code: `using System;
using System.Collections;

class Program
{
    static void Main()
    {
        ArrayList liste = new ArrayList();
        Console.WriteLine($"Başlangıç Kapasitesi: {liste.Capacity}");

        for (int i = 1; i <= 6; i++)
        {
            liste.Add($"Eleman {i}");
            Console.WriteLine($"Eklendi: Eleman {i} | Count: {liste.Count} | Capacity: {liste.Capacity}");
        }
    }
}`,
      output: [
        'Eğitim amaçlı örnek çıktı:',
        'Başlangıç Kapasitesi: 0',
        'Eklendi: Eleman 1 | Count: 1 | Capacity: 4',
        'Eklendi: Eleman 2 | Count: 2 | Capacity: 4',
        'Eklendi: Eleman 3 | Count: 3 | Capacity: 4',
        'Eklendi: Eleman 4 | Count: 4 | Capacity: 4 (Dizi doldu!)',
        '⚠️ 5. eleman ekleniyor: Kapasite aşıldı! Arka plan tahsisi...',
        'Eklendi: Eleman 5 | Count: 5 | Capacity: 8  <-- 2 KATINA ÇIKTI!',
        'Eklendi: Eleman 6 | Count: 6 | Capacity: 8',
      ],
    },
    {
      id: 'runtime-crash',
      title: 'Hatalı Tip Dönüşümü (InvalidCastException)',
      description: 'String olan "Kedi" değerini int olarak cast etmeye çalışınca oluşan kaza.',
      code: `using System;
using System.Collections;

class Program
{
    static void Main()
    {
        ArrayList dizi = new ArrayList();
        dizi.Add("Kedi"); // string
        dizi.Add(99);     // int

        Console.WriteLine("dizi[0] okunuyor...");

        // HATA: dizi[0] 'Kedi' (string) dir, ancak int'e dönüştürülmek isteniyor!
        // Derleyici buna izin verir çünkü dizi[0] 'object' olarak görünür.
        int sayi = (int)dizi[0];

        Console.WriteLine($"Okunan Sayı: {sayi}");
    }
}`,
      hasError: true,
      output: [
        'Eğitim amaçlı örnek hata çıktısı:',
        'dizi[0] okunuyor...',
        'Unhandled exception. System.InvalidCastException: Unable to cast object of type \'System.String\' to type \'System.Int32\'.',
        '   at Program.Main() in /src/Program.cs:line 16',
        '',
        '💥 CRASH! Çalışma zamanında çöktü (Exit code 134)',
      ],
    },
    {
      id: 'modern-generics',
      title: 'Modern Çözüm: Generic List<T>',
      description: 'Tip güvenli List<string> kullanımı ve derleme zamanı güvencesi.',
      code: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Yalnızca string kabul eden tip güvenli modern liste
        List<string> isimler = new List<string>();

        isimler.Add("Kedi");
        isimler.Add("Köpek");
        // isimler.Add(99); // <-- DERLEME HATASI! Kod derlenmez bile, tip güvenliği!

        // Cast yapmaya gerek yoktur!
        string ilk = isimler[0];
        Console.WriteLine($"İlk Eleman: {ilk} (Uzunluk: {ilk.Length})");
        Console.WriteLine($"Koleksiyon Tipi: {isimler.GetType().Name}");
    }
}`,
      output: [
        'Eğitim amaçlı örnek çıktı:',
        'İlk Eleman: Kedi (Uzunluk: 4)',
        'Koleksiyon Tipi: List`1',
        'Bu string örneğinde değer tipi boxing işlemi yoktur.',
      ],
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>('enes-example');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(scenarios[0].output);
  const [copied, setCopied] = useState<boolean>(false);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleLogs(['[Örnek çıktı hazırlanıyor...]']);

    setTimeout(() => {
      setConsoleLogs(activeScenario.output);
      setIsRunning(false);
    }, 600);
  };

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    const scen = scenarios.find((s) => s.id === id);
    if (scen) {
      setConsoleLogs(scen.output);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeScenario.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Scenario Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((scen) => {
          const isActive = scen.id === activeScenarioId;
          return (
            <button
              key={scen.id}
              onClick={() => handleScenarioChange(scen.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-indigo-500 bg-indigo-950/60 shadow-lg shadow-indigo-500/20'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={isActive ? 'text-indigo-300' : 'text-slate-300'}>
                  {scen.title}
                </span>
                {scen.hasError && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Crash
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {scen.description}
              </p>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-amber-200/80">
        Bu alandaki C# kodu düzenlenmez veya çalıştırılmaz; konsol bölümünde senaryoya ait önceden hazırlanmış örnek çıktı gösterilir.
      </p>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="font-mono text-slate-300 font-medium">Program.cs</span>
              <span className="text-[11px] text-slate-400 font-mono">(C# örneği)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Kopyalandı' : 'Kodu Al'}</span>
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-indigo-600/30 disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isRunning ? 'Hazırlanıyor...' : 'Örnek Çıktıyı Göster'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 overflow-x-auto bg-slate-950/60 leading-relaxed flex-1">
            <pre>
              <code>{activeScenario.code}</code>
            </pre>
          </div>
        </div>

        {/* Right: Simulated Terminal Output */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>C# Konsol Terminali</span>
            </div>
            <button
              onClick={() => setConsoleLogs([])}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition"
            >
              Temizle
            </button>
          </div>

          <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 overflow-y-auto max-h-[420px] flex-1 bg-black/60">
            {consoleLogs.map((log, i) => {
              const isError = log.includes('Unhandled exception') || log.includes('CRASH') || log.includes('InvalidCastException');
              const isWarn = log.includes('⚠️');
              const isSuccess = log.includes('başarıyla') || log.includes('Onaylandı');

              return (
                <div
                  key={i}
                  className={`leading-relaxed ${
                    isError
                      ? 'text-rose-400 font-semibold'
                      : isWarn
                      ? 'text-amber-300 font-semibold'
                      : isSuccess
                      ? 'text-emerald-400 font-semibold'
                      : 'text-slate-300'
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>

          {activeScenario.hasError && (
            <div className="p-3 bg-rose-950/40 border-t border-rose-900/40 flex items-center gap-2 text-xs text-rose-300">
              <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
              <span>Enes Öztürk'ün bahsettiği tip dönüştürme hatası tam olarak bu noktada gerçekleşir!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
