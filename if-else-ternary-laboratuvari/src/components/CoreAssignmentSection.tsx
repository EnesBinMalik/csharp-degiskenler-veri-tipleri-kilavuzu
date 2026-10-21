import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, Check, Copy, Terminal, Cpu, Info, CornerDownRight } from 'lucide-react';

export const CoreAssignmentSection: React.FC = () => {
  const [condition, setCondition] = useState<boolean>(true);
  const [debugStep, setDebugStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedIfElse, setCopiedIfElse] = useState<boolean>(false);
  const [copiedTernary, setCopiedTernary] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'C# koşullu dallanma simülasyonu hazır.',
    'Örnek akış hazırlanıyor...',
    `[Çıktı]: Değişken: true`,
  ]);

  // Steps definition:
  // Step 0: Idle
  // Step 1: Line 1 (Declaration: bool condition = true/false)
  // Step 2: Line 3 (Evaluation: if (condition))
  // Step 3: Line 5 (True branch) or Line 9 (False branch)
  // Step 4: Finished & Output printed

  const totalSteps = 4;

  const handleStep = () => {
    setDebugStep((prev) => {
      const next = prev < totalSteps ? prev + 1 : 1;
      updateLogsForStep(next);
      return next;
    });
  };

  const handleReset = () => {
    setDebugStep(0);
    setIsPlaying(false);
  };

  const updateLogsForStep = (step: number) => {
    const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
    if (step === 1) {
      setTerminalLogs((prev) => [
        ...prev.slice(-6),
        `[${time}] Simülasyon adımı 1: 'bool condition = ${condition};' örneği seçildi.`,
      ]);
    } else if (step === 2) {
      setTerminalLogs((prev) => [
        ...prev.slice(-6),
        `[${time}] Simülasyon adımı 2: 'if (${condition})' koşulu değerlendiriliyor... Sonuç: ${condition ? 'TRUE (Doğru)' : 'FALSE (Yanlış)'}.`,
      ]);
    } else if (step === 3) {
      setTerminalLogs((prev) => [
        ...prev.slice(-6),
        `[${time}] Simülasyon adımı 3: ${condition ? 'if' : 'else'} kolu seçildi.`,
      ]);
    } else if (step === 4) {
      setTerminalLogs((prev) => [
        ...prev.slice(-6),
        `[${time}] [ÇIKTI]: Değişken: ${condition ? 'true' : 'false'}`,
      ]);
    }
  };

  useEffect(() => {
    // When condition changes, trigger an update
    const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
    setTerminalLogs((prev) => [
      ...prev.slice(-6),
      `[${time}] Kullanıcı 'condition' değerini '${condition}' yaptı.`,
      `[${time}] [ÇIKTI]: Değişken: ${condition ? 'true' : 'false'}`,
    ]);
    setDebugStep(0);
  }, [condition]);

  // Auto-step timer when isPlaying is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setDebugStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return 4;
          }
          const next = prev + 1;
          updateLogsForStep(next);
          return next;
        });
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isPlaying, condition]);

  const copyToClipboard = (text: string, isIfElse: boolean) => {
    navigator.clipboard.writeText(text);
    if (isIfElse) {
      setCopiedIfElse(true);
      setTimeout(() => setCopiedIfElse(false), 2000);
    } else {
      setCopiedTernary(true);
      setTimeout(() => setCopiedTernary(false), 2000);
    }
  };

  const originalIfElseCode = `// Hazırlayan: Enes Öztürk
bool condition = ${condition ? 'true' : 'false'};

if (condition)
{
    Console.WriteLine("Değişken: true");
}
else
{
    Console.WriteLine("Değişken: false");
}`;

  const ternaryEquivalentCode = `// Hazırlayan: Enes Öztürk
bool condition = ${condition ? 'true' : 'false'};

// Ternary Operatörü (? :) ile Tek Satırda Yazım:
Console.WriteLine(condition ? "Değişken: true" : "Değişken: false");

// Değişkene Atama Yöntemi:
// string sonuc = condition ? "Değişken: true" : "Değişken: false";
// Console.WriteLine(sonuc);`;

  return (
    <section id="odev-ornegi" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          Ödev Çekirdek İncelemesi · Enes Öztürk
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Ödev Sorusu: If-Else Kod Analizi ve Ternary Dönüşümü
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-3xl">
          <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded">bool condition = true;</code> örneğinin iki koşul değerindeki akışını inceleyin. Bu adım göstergesi tarayıcı tabanlı bir eğitim simülasyonudur; C# derlemez, CLR çalıştırmaz veya gerçek hata ayıklama yapmaz.
        </p>
      </div>

      {/* Main Interactive Control Deck */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 mb-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Condition Value Switcher */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Koşul Değişkeni Değerini Değiştir:
            </div>
            <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setCondition(true)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  condition
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-950"></span>
                <span>condition = true</span>
              </button>
              <button
                onClick={() => setCondition(false)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  !condition
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-950"></span>
                <span>condition = false</span>
              </button>
            </div>
          </div>

          {/* Step Debugger Controls */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Adım Adım Akış Simülasyonu:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleStep}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors active:scale-95"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{debugStep === 0 ? 'Adım Adım Başlat' : `Sonraki Adım (${debugStep}/${totalSteps})`}</span>
              </button>

              <button
                onClick={() => {
                  if (debugStep >= totalSteps) setDebugStep(0);
                  setIsPlaying(!isPlaying);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                  isPlaying
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>{isPlaying ? 'Durdur' : 'Otomatik Oynat'}</span>
              </button>

              <button
                onClick={handleReset}
                title="Sıfırla"
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Status Pill */}
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Aktif Çıktı:</div>
            <div className="text-lg font-bold font-mono text-cyan-400">
              "{condition ? 'Değişken: true' : 'Değişken: false'}"
            </div>
          </div>
        </div>

        {/* Debug Step Explanation Banner */}
        {debugStep > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              {debugStep === 1 && (
                <span>
                  <strong>Adım 1/4 - Değişken Tanımlama:</strong> Örnek akışta <code className="text-cyan-300 font-mono">bool condition</code> değişkeninin değeri <code className="text-cyan-300 font-mono">{condition ? 'true' : 'false'}</code> olarak gösteriliyor.
                </span>
              )}
              {debugStep === 2 && (
                <span>
                  <strong>Adım 2/4 - Koşul Değerlendirme:</strong> Örnek <code className="text-cyan-300 font-mono">if (condition)</code> koşulunun sonucu: <strong className={condition ? 'text-emerald-400' : 'text-rose-400'}>{condition ? 'TRUE' : 'FALSE'}</strong>.
                </span>
              )}
              {debugStep === 3 && (
                <span>
                  <strong>Adım 3/4 - Dallanma (Branching):</strong> Koşul {condition ? 'doğru' : 'yanlış'} olduğunda örnek akışta{' '}
                  <strong className="text-cyan-300">{condition ? 'if' : 'else'}</strong> bloğu içerisindeki satıra sıçradı.
                </span>
              )}
              {debugStep === 4 && (
                <span>
                  <strong>Adım 4/4 - Örnek Çıktı:</strong> Örnek kodun üreteceği çıktı gösteriliyor; <code className="text-yellow-300 font-mono">Console.WriteLine()</code> tarayıcıda çalıştırılmıyor.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Comparison Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: If-Else */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold text-slate-200">1. Klasik If - Else Bloğu</span>
              <span className="text-[11px] text-slate-400 font-mono">(Ödevdeki Orijinal Kod)</span>
            </div>
            <button
              onClick={() => copyToClipboard(originalIfElseCode, true)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copiedIfElse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIfElse ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto flex-1 select-text">
            {/* Line 1 */}
            <div
              className={`flex items-center py-0.5 px-2 rounded transition-colors ${
                debugStep === 1 ? 'bg-cyan-950/80 text-cyan-200 ring-1 ring-cyan-500/50' : ''
              }`}
            >
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">1</span>
              <span>
                <span className="text-purple-400 font-semibold">bool</span>{' '}
                <span className="text-blue-300">condition</span> ={' '}
                <span className={`font-bold ${condition ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {condition ? 'true' : 'false'}
                </span>
                ;
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">2</span>
              <span>&nbsp;</span>
            </div>

            {/* Line 3: if (condition) */}
            <div
              className={`flex items-center py-0.5 px-2 rounded transition-colors ${
                debugStep === 2 ? 'bg-cyan-950/80 text-cyan-200 ring-1 ring-cyan-500/50' : ''
              }`}
            >
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">3</span>
              <span>
                <span className="text-purple-400 font-bold">if</span> (<span className="text-blue-300">condition</span>)
              </span>
            </div>

            {/* Line 4 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">4</span>
              <span className="text-slate-400">{'{'}</span>
            </div>

            {/* Line 5: True branch output */}
            <div
              className={`flex items-center py-0.5 px-2 rounded transition-colors ${
                (debugStep === 3 || debugStep === 4) && condition
                  ? 'bg-emerald-950/90 text-emerald-200 ring-1 ring-emerald-500/60 font-semibold'
                  : condition
                  ? 'text-slate-200'
                  : 'text-slate-500 line-through'
              }`}
            >
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">5</span>
              <span className="pl-4">
                Console.<span className="text-yellow-200">WriteLine</span>(
                <span className="text-amber-300">"Değişken: true"</span>);
              </span>
              {condition && (
                <span className="ml-auto text-[10px] text-emerald-400 font-mono select-none">
                  ◄ ÇALIŞAN BLOK
                </span>
              )}
            </div>

            {/* Line 6 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">6</span>
              <span className="text-slate-400">{'}'}</span>
            </div>

            {/* Line 7: else */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">7</span>
              <span>
                <span className="text-purple-400 font-bold">else</span>
              </span>
            </div>

            {/* Line 8 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">8</span>
              <span className="text-slate-400">{'{'}</span>
            </div>

            {/* Line 9: False branch output */}
            <div
              className={`flex items-center py-0.5 px-2 rounded transition-colors ${
                (debugStep === 3 || debugStep === 4) && !condition
                  ? 'bg-rose-950/90 text-rose-200 ring-1 ring-rose-500/60 font-semibold'
                  : !condition
                  ? 'text-slate-200'
                  : 'text-slate-500 line-through'
              }`}
            >
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">9</span>
              <span className="pl-4">
                Console.<span className="text-yellow-200">WriteLine</span>(
                <span className="text-amber-300">"Değişken: false"</span>);
              </span>
              {!condition && (
                <span className="ml-auto text-[10px] text-rose-400 font-mono select-none">
                  ◄ ÇALIŞAN BLOK
                </span>
              )}
            </div>

            {/* Line 10 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">10</span>
              <span className="text-slate-400">{'}'}</span>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Örnek kod görünümü</span>
            <span className="text-slate-300">Tür: <strong>Statement (Deyim)</strong></span>
          </div>
        </div>

        {/* Right Column: Ternary If */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <span className="text-xs font-bold text-slate-200">2. Modern Ternary If (? :) Karşılığı</span>
              <span className="text-[11px] text-cyan-400 font-mono">(Değer üreten ifade)</span>
            </div>
            <button
              onClick={() => copyToClipboard(ternaryEquivalentCode, false)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copiedTernary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTernary ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto flex-1 select-text">
            {/* Line 1 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">1</span>
              <span>
                <span className="text-purple-400 font-semibold">bool</span>{' '}
                <span className="text-blue-300">condition</span> ={' '}
                <span className={`font-bold ${condition ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {condition ? 'true' : 'false'}
                </span>
                ;
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">2</span>
              <span>&nbsp;</span>
            </div>

            {/* Line 3: Direct Console.WriteLine with ternary */}
            <div
              className={`flex items-center py-1 px-2 rounded transition-colors ${
                debugStep >= 2 ? 'bg-cyan-950/90 text-cyan-200 ring-1 ring-cyan-500/60 font-medium' : ''
              }`}
            >
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">3</span>
              <span className="overflow-x-auto whitespace-nowrap">
                Console.<span className="text-yellow-200">WriteLine</span>(
                <span className="text-blue-300 font-semibold">condition</span>{' '}
                <span className="text-cyan-400 font-bold">?</span>{' '}
                <span className={condition ? 'text-emerald-300 font-bold underline' : 'text-slate-400'}>
                  "Değişken: true"
                </span>{' '}
                <span className="text-cyan-400 font-bold">:</span>{' '}
                <span className={!condition ? 'text-rose-300 font-bold underline' : 'text-slate-400'}>
                  "Değişken: false"
                </span>
                );
              </span>
            </div>

            {/* Line 4 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">4</span>
              <span>&nbsp;</span>
            </div>

            {/* Line 5: Assignment variant */}
            <div className="flex items-center py-0.5 px-2 text-slate-400">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">5</span>
              <span className="text-slate-500">// Alternatif: Bir değişkene değer atamak için:</span>
            </div>

            {/* Line 6 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">6</span>
              <span className="overflow-x-auto whitespace-nowrap">
                <span className="text-purple-400 font-semibold">string</span>{' '}
                <span className="text-blue-200">sonuc</span> = condition{' '}
                <span className="text-cyan-400 font-bold">?</span>{' '}
                <span className="text-amber-300">"Değişken: true"</span>{' '}
                <span className="text-cyan-400 font-bold">:</span>{' '}
                <span className="text-amber-300">"Değişken: false"</span>;
              </span>
            </div>

            {/* Line 7 */}
            <div className="flex items-center py-0.5 px-2">
              <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">7</span>
              <span>
                Console.<span className="text-yellow-200">WriteLine</span>(sonuc);
              </span>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Örnek kod görünümü</span>
            <span className="text-cyan-300">Tür: <strong>Expression (İfade)</strong></span>
          </div>
        </div>
      </div>

      {/* C# Execution Terminal & Variable Watch Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal Output */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200 font-semibold">Enes Öztürk - C# Terminali (Console.exe)</span>
            </div>
            <span className="text-emerald-400 font-semibold text-[11px]">Çalışma Durumu: Başarılı (Exit code 0)</span>
          </div>

          <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 h-44 overflow-y-auto">
            {terminalLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('[ÇIKTI]')
                    ? 'text-emerald-400 font-bold bg-emerald-950/30 px-2 py-1 rounded border-l-2 border-emerald-500'
                    : log.includes('Adım')
                    ? 'text-cyan-300'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Watch & Memory Inspection */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800 font-mono text-xs text-slate-400">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-semibold">Bellek & Değişken İzleme (Watch)</span>
          </div>

          <div className="p-4 text-xs font-mono space-y-3 flex-1">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Değişken Adı:</span>
              <span className="text-blue-300 font-bold">condition</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Veri Tipi:</span>
              <span className="text-purple-300">System.Boolean</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Mevcut Değer:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${condition ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                {condition ? 'true' : 'false'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Bellek Alanı:</span>
              <span className="text-slate-300">Koşul sonucu: {condition ? 'true' : 'false'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Dallanma Yönü:</span>
              <span className="text-cyan-300 font-bold">
                {condition ? 'True Bloğu (Satır 5)' : 'False Bloğu (Satır 9)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
