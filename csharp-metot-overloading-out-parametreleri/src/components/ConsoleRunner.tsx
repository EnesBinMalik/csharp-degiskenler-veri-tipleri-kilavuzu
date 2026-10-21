import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Copy, Check, Sparkles } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  defaultOutput: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'user-base',
    title: 'Ödevdeki Temel Örnekler',
    subtitle: 'EkranaYazdir 3 Overload ve Toplam out parametresi',
    code: `using System;

class Program
{
    static void Main()
    {
        Metotlar instance = new Metotlar();

        // 1. Overload: int
        instance.EkranaYazdir(42);

        // 2. Overload: string
        instance.EkranaYazdir("Merhaba C# Dünyası");

        // 3. Overload: 2 string
        instance.EkranaYazdir("Enes ", "Öztürk");

        // Out parametresi ile Toplam
        int sonuc = instance.Toplam(4, 8, out int toplamSonuc);
        Console.WriteLine($"Toplam Metot Dönüşü: {sonuc}");
        Console.WriteLine($"Out Parametre Değeri: {toplamSonuc}");
    }
}

public class Metotlar
{
    public void EkranaYazdir(int deger) => Console.WriteLine(deger);
    public void EkranaYazdir(string deger) => Console.WriteLine(deger);
    public void EkranaYazdir(string d1, string d2) => Console.WriteLine(d1 + d2);

    public int Toplam(int a, int b, out int toplam)
    {
        toplam = a + b;
        return toplam;
    }
}`,
    defaultOutput: [
      '42',
      'Merhaba C# Dünyası',
      'Enes Öztürk',
      'Toplam Metot Dönüşü: 12',
      'Out Parametre Değeri: 12',
    ],
  },
  {
    id: 'tryparse',
    title: 'int.TryParse ve Out Kullanımı',
    subtitle: 'Gerçek hayatta en yaygın out tasarım deseni',
    code: `using System;

class Program
{
    static void Main()
    {
        string[] inputs = { "1923", "Enes", "2026", "-50" };

        foreach (var text in inputs)
        {
            if (int.TryParse(text, out int sayi))
            {
                Console.WriteLine($"[BAŞARILI] '{text}' sayısı dönüştürüldü: {sayi} (Karesi: {sayi * sayi})");
            }
            else
            {
                Console.WriteLine($"[BAŞARISIZ] '{text}' geçerli bir tamsayı değil!");
            }
        }
    }
}`,
    defaultOutput: [
      "[BAŞARILI] '1923' sayısı dönüştürüldü: 1923 (Karesi: 3697929)",
      "[BAŞARISIZ] 'Enes' geçerli bir tamsayı değil!",
      "[BAŞARILI] '2026' sayısı dönüştürüldü: 2026 (Karesi: 4104676)",
      "[BAŞARILI] '-50' sayısı dönüştürüldü: -50 (Karesi: 2500)",
    ],
  },
  {
    id: 'multi-out',
    title: 'Çoklu Out Parametresi: Bölüm ve Kalan',
    subtitle: 'Tek bir fonksiyondan birden fazla değer çıkarma',
    code: `using System;

class Program
{
    static void Main()
    {
        int bolum = BolmeIslemi(47, 5, out int kalan, out string durum);
        Console.WriteLine($"Bölme Sonucu: {bolum}");
        Console.WriteLine($"Kalan (out): {kalan}");
        Console.WriteLine($"İşlem Durumu (out): {durum}");
    }

    static int BolmeIslemi(int a, int b, out int kalan, out string aciklama)
    {
        if (b == 0)
        {
            kalan = 0;
            aciklama = "Sıfıra bölme hatası!";
            return 0;
        }

        kalan = a % b;
        aciklama = "İşlem başarıyla tamamlandı.";
        return a / b;
    }
}`,
    defaultOutput: [
      'Bölme Sonucu: 9',
      'Kalan (out): 2',
      'İşlem Durumu (out): İşlem başarıyla tamamlandı.',
    ],
  },
];

const getSampleOutput = (output: string[]) => [
  '[Tarayıcı simülasyonu] C# kodu derlenmez; aşağıda örnek çıktı gösterilir.',
  ...output,
];

export const ConsoleRunner: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('user-base');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [outputLogs, setOutputLogs] = useState<string[]>(getSampleOutput(SCENARIOS[0].defaultOutput));
  const [copied, setCopied] = useState<boolean>(false);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRun = () => {
    setIsRunning(true);
    setOutputLogs(['[Tarayıcı simülasyonu] Önceden tanımlı örnek çıktı hazırlanıyor...']);

    setTimeout(() => {
      setOutputLogs(getSampleOutput(scenario.defaultOutput));
      setIsRunning(false);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scenario.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-2">
          <span>Bölüm 4</span>
          <span aria-hidden="true">·</span>
          <span>Örnek Konsol Çıktıları</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          C# Kod Örnekleri ve Konsol Simülasyonu
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          C# örnek kodlarını inceleyin ve her senaryo için önceden tanımlanmış örnek çıktıları görüntüleyin.
          Bu panel kodu derlemez veya C# çalışma zamanında çalıştırmaz.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenarioId(sc.id);
              setOutputLogs(getSampleOutput(sc.defaultOutput));
            }}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeScenarioId === sc.id
                ? 'bg-sky-950/40 border-sky-500/80 text-white shadow-sm shadow-sky-500/20'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="text-xs font-semibold text-sky-400 mb-1">{sc.title}</div>
            <div className="text-xs text-slate-400 leading-snug">{sc.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Code Editor Preview */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col shadow-xl">
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-200">Program.cs</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isRunning ? 'Hazırlanıyor...' : 'Örnek çıktıyı göster'}</span>
              </button>
            </div>
          </div>

          <pre className="p-5 text-xs font-mono text-slate-200 overflow-x-auto flex-1 leading-relaxed bg-slate-950/90">
            <code>{scenario.code}</code>
          </pre>
        </div>

        {/* Terminal Output */}
        <div className="lg:col-span-5 rounded-2xl bg-black border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL ÇIKTISI</span>
            </span>
            <button
              onClick={() => setOutputLogs([])}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Temizle</span>
            </button>
          </div>

          <div className="p-4 font-mono text-xs text-slate-300 flex-1 overflow-y-auto space-y-1.5 min-h-[300px] bg-black">
            {outputLogs.map((log, index) => (
              <div
                key={index}
                className={`${
                  log.startsWith('[Tarayıcı simülasyonu]')
                    ? 'text-sky-400 font-semibold'
                    : log.includes('[BAŞARILI]')
                    ? 'text-emerald-400'
                    : log.includes('[BAŞARISIZ]')
                    ? 'text-rose-400'
                    : 'text-slate-200'
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Enes Öztürk · Tarayıcı simülasyonu</span>
            <span className="text-slate-400">Örnek çıktı</span>
          </div>
        </div>
      </div>
    </div>
  );
};
