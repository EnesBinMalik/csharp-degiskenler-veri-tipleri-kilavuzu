import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Terminal, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

export const LoopExecutionSimulator: React.FC = () => {
  // Preset array sizes
  const [arraySize, setArraySize] = useState<number>(10); // default 10 for rapid interactive demo, allows switching to 5 or 20
  const [numbers, setNumbers] = useState<number[]>([15, 22, 8, 45, 30, 18, 9, 34, 12, 27, 14, 50, 3, 29, 41, 16, 25, 38, 7, 33]);

  // Execution state
  const [currentI, setCurrentI] = useState<number>(-1); // -1: not started
  const [runningTotal, setRunningTotal] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0); // 1-indexed code line
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(600); // ms per step
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const activeNumbers = numbers.slice(0, arraySize);

  // Line definitions in the C# code
  const codeLines = [
    { line: 1, text: `int[] sayiDizisi = new int[${arraySize}];`, comment: 'Dizi için bellekte yer ayrılır' },
    { line: 2, text: 'int toplam = 0;', comment: 'Toplam sayacı sıfırlanır' },
    { line: 3, text: 'for (int i = 0; i < sayiDizisi.Length; i++)', comment: 'Döngü i=0 ile başlar' },
    { line: 4, text: '{', comment: '' },
    { line: 5, text: '    Console.Write("Lütfen {0}. sayıyı girin: ", i + 1);', comment: 'Kullanıcıdan sayı istenir' },
    { line: 6, text: '    sayiDizisi[i] = Convert.ToInt32(Console.ReadLine());', comment: 'Değer diziye atanır' },
    { line: 7, text: '    toplam += sayiDizisi[i];', comment: 'Toplama eklenir' },
    { line: 8, text: '}', comment: 'Bir sonraki iterasyon' },
    { line: 9, text: `double ortalama = (double)toplam / ${arraySize};`, comment: 'Ortalama hesaplanır' },
    { line: 10, text: 'Console.WriteLine("Sayıların ortalaması: " + ortalama);', comment: 'Ekrana yazdırılır' },
  ];

  const timerRef = useRef<number | null>(null);

  // Step Forward implementation
  const stepForward = () => {
    if (isFinished) return;

    if (currentI === -1) {
      // Start loop
      setCurrentI(0);
      setCurrentLine(3);
      setRunningTotal(0);
      setConsoleOutput(['> Tarayıcı simülasyonu başladı.', `> ${arraySize} örnek değer işlenecek.`]);
      return;
    }

    if (currentLine === 3) {
      // Entering loop body
      setCurrentLine(5);
      setConsoleOutput((prev) => [...prev, `Lütfen ${currentI + 1}. sayıyı girin: ${activeNumbers[currentI]}`]);
    } else if (currentLine === 5) {
      // Read line & assign
      setCurrentLine(6);
      // Value already in array slot
    } else if (currentLine === 6) {
      // Add to total
      const newTotal = runningTotal + activeNumbers[currentI];
      setRunningTotal(newTotal);
      setCurrentLine(7);
    } else if (currentLine === 7) {
      // Next iteration or finish
      if (currentI + 1 < arraySize) {
        setCurrentI(currentI + 1);
        setCurrentLine(3);
      } else {
        // Loop finished, compute average
        setCurrentLine(9);
        const avg = runningTotal / arraySize;
        setConsoleOutput((prev) => [
          ...prev,
          '---------------------------------------',
          `Sayıların ortalaması: ${avg.toFixed(2)}`,
          'Console.ReadLine(); // Program tamamlandı.',
        ]);
        setIsFinished(true);
        setIsPlaying(false);
      }
    } else if (currentLine === 9) {
      setCurrentLine(10);
      setIsFinished(true);
      setIsPlaying(false);
    }
  };

  // Reset simulator
  const resetSimulator = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentI(-1);
    setRunningTotal(0);
    setCurrentLine(0);
    setConsoleOutput([]);
    setIsFinished(false);
  };

  // Randomize numbers
  const randomizeNumbers = () => {
    const randomized = Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 5);
    setNumbers(randomized);
    resetSimulator();
  };

  // Play / Pause timer effect
  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = window.setInterval(() => {
        stepForward();
      }, playSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isFinished, currentI, currentLine, runningTotal, playSpeed, arraySize]);

  const calculatedAverage = isFinished
    ? (runningTotal / arraySize).toFixed(2)
    : currentI >= 0
    ? (runningTotal / Math.max(1, currentI + (currentLine > 6 ? 1 : 0))).toFixed(2)
    : '0.00';

  return (
    <section id="donguler" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 04</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">Döngü Simülatörü</span>
            <span aria-hidden="true">·</span>
            <span>For Döngüsü & Toplam/Ortalama Algoritması</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Döngülerle Dizi Kullanımı (Adım Adım İcra Simülatörü)
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            "For döngüsü kullanmasaydık 20 defa <span className="font-mono text-sky-300">Console.ReadLine()</span> yazmamız gerekiyordu. Bunun yerine döngülerin ve dizilerin gücünü birleştirerek sadece birkaç satırda, okunabilir bir kod ile problemimizi çözdük." — <em>Enes Öztürk</em>
          </p>
          <p className="text-xs text-slate-400 mt-3 max-w-3xl">
            Bu araç, örnek C# akışını önceden belirlenmiş sayılarla tarayıcıda canlandırır; C# kodunu veya .NET çalışma zamanını çalıştırmaz.
          </p>
        </div>

        {/* Simulator Control Toolbar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isFinished}
              className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isFinished
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sm'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" />
                  Durdur
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  {currentI === -1 ? 'Otomatik Çalıştır' : 'Devam Et'}
                </>
              )}
            </button>

            <button
              onClick={stepForward}
              disabled={isPlaying || isFinished}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Adım İlerle
            </button>

            <button
              onClick={resetSimulator}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Simülatörü Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Array Size Selectors */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Hız:</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[
                  { label: 'Yavaş', ms: 1000 },
                  { label: 'Normal', ms: 500 },
                  { label: 'Hızlı', ms: 200 },
                ].map((s) => (
                  <button
                    key={s.ms}
                    onClick={() => setPlaySpeed(s.ms)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      playSpeed === s.ms
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Eleman Sayısı:</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[5, 10, 20].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setArraySize(size);
                      resetSimulator();
                    }}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      arraySize === size
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {size} Eleman
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={randomizeNumbers}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sayıları Rastgele Üret
            </button>
          </div>
        </div>

        {/* Live Debugging & Execution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Code Highlighter & Active Line */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-white">C# Örnek Kodu (Simülasyon)</span>
                <span className="font-mono text-sky-400">
                  {currentLine > 0 ? `Satır: ${currentLine}` : 'Beklemede'}
                </span>
              </div>

              {/* Code lines with active pointer */}
              <div className="font-mono text-xs rounded-lg bg-slate-950 p-3 border border-slate-800 space-y-0.5 overflow-x-auto">
                {codeLines.map((lineObj) => {
                  const isActive = currentLine === lineObj.line;
                  return (
                    <div
                      key={lineObj.line}
                      className={`flex items-center py-1 px-2 rounded transition-colors ${
                        isActive
                          ? 'bg-sky-500/20 text-white font-bold border-l-2 border-sky-400 pl-3'
                          : 'text-slate-400 hover:bg-slate-900/50'
                      }`}
                    >
                      <span className="w-6 text-[10px] text-slate-600 select-none">
                        {lineObj.line}
                      </span>
                      <span className="flex-1 whitespace-pre">{lineObj.text}</span>
                      {isActive && lineObj.comment && (
                        <span className="text-[10px] text-sky-300 font-sans ml-2 hidden sm:inline">
                          // {lineObj.comment}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Variable Watch & Registers */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Bellek Değişkenleri & Canlı Değerler
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">i (Döngü İndeksi)</div>
                  <div className="text-xl font-bold font-mono text-sky-300 mt-1">
                    {currentI === -1 ? '-' : currentI}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">
                    {currentI >= 0 ? `${currentI + 1}. Eleman` : 'Başlamadı'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">sayiDizisi[i]</div>
                  <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                    {currentI >= 0 ? activeNumbers[currentI] : '-'}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Okunan Değer</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">toplam</div>
                  <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                    {runningTotal}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Kümülatif Toplam</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">ortalama</div>
                  <div className="text-xl font-bold font-mono text-purple-300 mt-1">
                    {calculatedAverage}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">toplam / {arraySize}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Array Cells & Simulated C# Console Window */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Array Cells in Loop */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white">Dizi Hücreleri (İşlenen Elemanlar)</span>
                <span className="font-mono text-slate-400">
                  Boyut: {arraySize} | İlerleme: {currentI >= 0 ? Math.min(arraySize, currentI + (currentLine > 6 ? 1 : 0)) : 0}/{arraySize}
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1">
                {activeNumbers.map((num, idx) => {
                  const isCurrent = currentI === idx;
                  const isProcessed = currentI > idx || (currentI === idx && currentLine > 6);

                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded text-center border transition-all text-xs font-mono ${
                        isCurrent
                          ? 'bg-sky-500 text-slate-950 border-white font-bold ring-2 ring-sky-300 shadow-md scale-105'
                          : isProcessed
                          ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="text-[9px] opacity-75">[{idx}]</div>
                      <div className="font-bold text-sm">{num}</div>
                    </div>
                  );
                })}
              </div>

              {isFinished && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Döngü başarıyla tamamlandı! {arraySize} sayının toplamı <strong>{runningTotal}</strong>, ortalaması <strong>{calculatedAverage}</strong> olarak hesaplandı.
                  </span>
                </div>
              )}
            </div>

            {/* Simulated C# Windows Console Output */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-white font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  Örnek Konsol Çıktısı (Tarayıcı Simülasyonu)
                </span>
                <span className="text-[11px] font-mono text-slate-500">Gerçek .NET çıktısı değildir</span>
              </div>

              <div className="h-56 overflow-y-auto rounded-lg bg-black border border-slate-800 p-3 font-mono text-xs text-emerald-400 space-y-1 shadow-inner">
                {consoleOutput.length === 0 ? (
                  <div className="text-slate-600 italic">
                    Konsol henüz başlatılmadı. "Otomatik Çalıştır" veya "Adım İlerle" butonuna basın.
                  </div>
                ) : (
                  consoleOutput.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Why Loops? Side-by-Side Comparison */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-3">
              <div className="font-semibold text-white">
                Enes Öztürk'ün Vurguladığı Kod Okunabilirliği:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  <span className="text-red-400 font-semibold block mb-1">Döngüsüz (20 Tekrar):</span>
                  <code>int sayi1 = Convert.ToInt32(...);{'\n'}int sayi2 = ...{'\n'}... 20 satır tekrar!</code>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  <span className="text-emerald-400 font-semibold block mb-1">Diziler & For Döngüsü:</span>
                  <code>for(int i=0; i &lt; 20; i++){'{'}{'\n'}  sayiDizisi[i] = ...;{'\n'}{'}'} // Temiz & dinamik</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
