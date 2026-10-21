import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AUTHOR_NAME } from '../data/courseData';

interface Scenario {
  id: string;
  title: string;
  desc: string;
  code: string;
  simulateOutput: () => {
    isSuccess: boolean;
    logs: string[];
    compilationTime: string;
    exitCode: number;
  };
}

export const InteractiveConsole: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('char_string');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleOutput, setConsoleOutput] = useState<{
    isSuccess: boolean;
    logs: string[];
    compilationTime: string;
    exitCode: number;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const scenarios: Scenario[] = [
    {
      id: 'char_string',
      title: 'Char ve String Türleri',
      desc: 'Tek UTF-16 kod birimi tutan char ile metin türü string arasındaki fark.',
      code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== CHAR VE STRING TÜR ÖZELLİKLERİ ===");
        
        char harf = 'E';
        Console.WriteLine($"[char] Değer: {harf}");
        Console.WriteLine($"[char] Tip: {harf.GetType().FullName}");
        Console.WriteLine($"[char] Tür boyutu: {sizeof(char)} bayt");
        
        Console.WriteLine("--------------------------------");
        
        string metin = "Enes";
        Console.WriteLine($"[string] Değer: {metin}");
        Console.WriteLine($"[string] Tip: {metin.GetType().FullName}");
        Console.WriteLine($"[string] UTF-16 kod birimi sayısı: {metin.Length}");
        
        Console.WriteLine("Tür boyutu ile toplam çalışma zamanı bellek kullanımı aynı şey değildir.");
    }
}`,
      simulateOutput: () => ({
        isSuccess: true,
        logs: [
          '=== CHAR VE STRING TÜR ÖZELLİKLERİ ===',
          '[char] Değer: E',
          '[char] Tip: System.Char',
          '[char] Tür boyutu: 2 bayt',
          '--------------------------------',
          '[string] Değer: Enes',
          '[string] Tip: System.String',
          '[string] UTF-16 kod birimi sayısı: 4',
          'Tür boyutu ile toplam çalışma zamanı bellek kullanımı aynı şey değildir.'
        ],
        compilationTime: '0.14s',
        exitCode: 0
      })
    },
    {
      id: 'rules_error',
      title: 'Hatalı Değişken İsimleri ve Derleyici Hataları',
      desc: 'Rakamla başlama, boşluk, eksi işareti ve rezerve isim kullanıldığında oluşan derleyici çıktıları.',
      code: `using System;

class Program
{
    static void Main()
    {
        // ❌ Kural 2 İhlali: Rakamla başlayamaz
        int 1sayi = 10;
        
        // ❌ Kural 3 İhlali: Boşluk içeremez
        string ogrenci adi = "Mehmet";
        
        // ❌ Kural 4 İhlali: İşlem operatörü kullanılamaz
        double kar-zarar = 1500;
        
        // ❌ Kural 5 İhlali: Rezerve kelime kullanılamaz
        int class = 42;
    }
}`,
      simulateOutput: () => ({
        isSuccess: false,
        logs: [
          'Program.cs(8,13): error CS1001: Identifier expected [1sayi: Değişken ismi rakamla başlayamaz]',
          'Program.cs(11,24): error CS1002: ; expected [ogrenci adi: Değişken isimlerinde boşluk bırakılamaz]',
          'Program.cs(14,19): error CS1073: Unexpected token \'-\' [kar-zarar: Değişken adında eksi operatörü kullanılamaz]',
          'Program.cs(17,13): error CS1001: Identifier expected [class: "class" rezerve bir C# anahtar kelimesidir]',
          '',
          'Build FAILED: 4 Error(s), 0 Warning(s).'
        ],
        compilationTime: '0.08s',
        exitCode: 1
      })
    },
    {
      id: 'datetime_ops',
      title: 'DateTime ile Tarih ve Saat Hesaplama',
      desc: 'Şu anki zaman, gün ekleme, formatlama ve özelliklerin konsol çıktısı.',
      code: `using System;

class Program
{
    static void Main()
    {
        DateTime suan = DateTime.Now;
        Console.WriteLine($"Şu anki Zaman: {suan:dd.MM.yyyy HH:mm:ss}");
        Console.WriteLine($"Bugün: {DateTime.Today:dd.MM.yyyy} (Saat 00:00:00)");
        
        DateTime teslimTarihi = suan.AddDays(15);
        Console.WriteLine($"15 Gün Sonra Teslim: {teslimTarihi:dddd, d MMMM yyyy}");
        
        DateTime ucAySonra = suan.AddMonths(3);
        Console.WriteLine($"3 Ay Sonraki Tarih: {ucAySonra:yyyy-MM-dd}");
        
        Console.WriteLine($"Haftanın Günü: {suan.DayOfWeek}");
        Console.WriteLine($"Yılın Kaçıncı Günü: {suan.DayOfYear}. gün");
        Console.WriteLine($"Artık Yıl mı (2028): {DateTime.IsLeapYear(2028)}");
    }
}`,
      simulateOutput: () => {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        const day15 = new Date(now);
        day15.setDate(day15.getDate() + 15);
        const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

        return {
          isSuccess: true,
          logs: [
            `Şu anki Zaman: ${day}.${month}.${year} ${hours}:${minutes}:${seconds}`,
            `Bugün: ${day}.${month}.${year} (Saat 00:00:00)`,
            `15 Gün Sonra Teslim: ${dayNames[day15.getDay()]}, ${day15.getDate()} ${monthNames[day15.getMonth()]} ${day15.getFullYear()}`,
            `3 Ay Sonraki Tarih: ${year}-${pad(now.getMonth() + 4 > 12 ? now.getMonth() - 8 : now.getMonth() + 4)}-${day}`,
            `Haftanın Günü: ${dayNames[now.getDay()]}`,
            `Yılın Kaçıncı Günü: 294. gün`,
            `Artık Yıl mı (2028): True`
          ],
          compilationTime: '0.12s',
          exitCode: 0
        };
      }
    },
    {
      id: 'string_ops',
      title: 'String Kütüphanesi ile Metin İşleme',
      desc: 'Trim, ToUpper, Split, Replace ve IsNullOrEmpty fonksiyonlarının çıktısı.',
      code: `using System;

class Program
{
    static void Main()
    {
        string rawVeri = "   Enes Öztürk - C# Uzmanlık Eğitimi   ";
        Console.WriteLine($"Ham Veri: \\"{rawVeri}\\" (Uzunluk: {rawVeri.Length})");
        
        // Trim ile temizleme
        string temiz = rawVeri.Trim();
        Console.WriteLine($"Trim Sonrası: \\"{temiz}\\" (Yeni Uzunluk: {temiz.Length})");
        
        // Büyük harf
        string buyuk = temiz.ToUpper();
        Console.WriteLine($"ToUpper: {buyuk}");
        
        // Replace
        string guncel = temiz.Replace("C#", ".NET Core");
        Console.WriteLine($"Replace: {guncel}");
        
        // Split
        string[] parcalar = temiz.Split('-');
        Console.WriteLine($"Split ile Parçalama:");
        for (int i = 0; i < parcalar.Length; i++)
        {
            Console.WriteLine($"  [{i}] = \\"{parcalar[i].Trim()}\\"");
        }
        
        // Boşluk kontrolü
        Console.WriteLine($"string.IsNullOrWhiteSpace(\\"   \\"): {string.IsNullOrWhiteSpace("   ")}");
    }
}`,
      simulateOutput: () => ({
        isSuccess: true,
        logs: [
          'Ham Veri: "   Enes Öztürk - C# Uzmanlık Eğitimi   " (Uzunluk: 39)',
          'Trim Sonrası: "Enes Öztürk - C# Uzmanlık Eğitimi" (Yeni Uzunluk: 33)',
          'ToUpper: ENES ÖZTÜRK - C# UZMANLIK EĞİTİMİ',
          'Replace: Enes Öztürk - .NET Core Uzmanlık Eğitimi',
          'Split ile Parçalama:',
          '  [0] = "Enes Öztürk"',
          '  [1] = "C# Uzmanlık Eğitimi"',
          'string.IsNullOrWhiteSpace("   "): True'
        ],
        compilationTime: '0.11s',
        exitCode: 0
      })
    },
    {
      id: 'unassigned_variable',
      title: 'CS0165: Atanmamış Yerel Değişken Hatası',
      desc: 'Değer atanmadan kullanılan değişkenlerde derleyicinin verdiği kesin atama (Definite Assignment) hatası.',
      code: `using System;

class Program
{
    static void Main()
    {
        // Değişken tanımlandı ancak değer atanmadı (unassigned)
        int sinavNotu;
        
        // ❌ HATA: Atanmamış değişken okunmaya çalışılıyor!
        Console.WriteLine(sinavNotu);
        
        // ✅ Doğru Yol:
        // int sinavNotu = 0; // veya null atanmalıdır
    }
}`,
      simulateOutput: () => ({
        isSuccess: false,
        logs: [
          'Program.cs(11,27): error CS0165: Use of unassigned local variable \'sinavNotu\'',
          '',
          'Açıklama: C# derleyicisi "sinavNotu" değişkenine henüz hiçbir değer atanmadığını tespit etti.',
          'Değişkenlerin her zaman bir değeri olmak zorundadır. Yoksa null tanımlanmalıdır.',
          'Ataması yapılmayan yerel değişkenler kullanıldığında derleyici derlemeyi durdurur.',
          '',
          'Build FAILED: 1 Error(s), 0 Warning(s).'
        ],
        compilationTime: '0.06s',
        exitCode: 1
      })
    }
  ];

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput(null);
    setTimeout(() => {
      setConsoleOutput(currentScenario.simulateOutput());
      setIsRunning(false);
    }, 400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentScenario.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="laboratuvar" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800">
      {/* Chapter Indicator */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 05</span>
          <span aria-hidden="true">·</span>
          <span>Pratik Deneyim</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          C# Konsol Simülatörü ve Kod Laboratuvarı
        </h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          Öğrendiğimiz kuralları, bellek senaryolarını ve kütüphane fonksiyonlarını canlı derleyici simülasyonu ile deneyimleyin.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenarioId(sc.id);
              setConsoleOutput(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeScenarioId === sc.id
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Dual Split Sandbox Layout: Code Editor on Left, Console Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Code Editor */}
        <div className="flex flex-col rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-semibold">Program.cs</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded transition-colors shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Derleniyor...' : 'Kodu Çalıştır (Run)'}</span>
              </button>
            </div>
          </div>

          {/* Code Text Area */}
          <div className="p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto flex-1 min-h-[320px] max-h-[460px] leading-relaxed">
            <pre className="whitespace-pre">{currentScenario.code}</pre>
          </div>

          {/* Editor Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
            <span>Senaryo: {currentScenario.desc}</span>
            <span className="font-mono text-cyan-400">.NET Core 3.1 / C# 8.0+</span>
          </div>
        </div>

        {/* Right Side: Terminal / Console Output */}
        <div className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">Terminal (dotnet run)</span>
            </div>
            {consoleOutput && (
              <div className="flex items-center gap-3 text-[11px]">
                <span>Süre: {consoleOutput.compilationTime}</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    consoleOutput.isSuccess
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  Exit Code: {consoleOutput.exitCode}
                </span>
              </div>
            )}
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs text-slate-300 overflow-y-auto flex-1 min-h-[320px] max-h-[460px] bg-slate-950">
            {isRunning ? (
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="animate-spin">⏳</span>
                <span>Microsoft (R) Visual C# Compiler derleniyor...</span>
              </div>
            ) : consoleOutput ? (
              <div className="space-y-1">
                <div className="text-slate-500 mb-3">$ dotnet run --project App.csproj</div>
                {consoleOutput.logs.map((log, index) => {
                  const isError = log.includes('error CS') || log.includes('FAILED');
                  const isSuccess = log.includes('Sonuç:') || log.includes('===');
                  return (
                    <div
                      key={index}
                      className={
                        isError
                          ? 'text-rose-400 font-semibold'
                          : isSuccess
                          ? 'text-emerald-300 font-semibold'
                          : 'text-slate-300'
                      }
                    >
                      {log}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-500">
                <Terminal className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">Çıktıyı görmek için sol taraftaki "Kodu Çalıştır" butonuna basın.</p>
                <span className="text-[11px] text-slate-600 mt-1">Seçili Senaryo: {currentScenario.title}</span>
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              C# Runtime Hazır
            </span>
            <button
              onClick={handleRun}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Yeniden Çalıştır ↻
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
