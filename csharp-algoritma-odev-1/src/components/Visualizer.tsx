import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowDownUp, RefreshCw, Hash, FileText } from 'lucide-react';

export const Visualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'q1' | 'q2' | 'q3' | 'q4'>('q1');

  // --- QUESTION 1 STATE ---
  const [q1Numbers, setQ1Numbers] = useState<number[]>([14, 7, 22, 35, 88, 11, 40]);
  const [q1InputStr, setQ1InputStr] = useState<string>('14, 7, 22, 35, 88, 11, 40');

  const handleQ1Update = (str: string) => {
    setQ1InputStr(str);
    const parsed = str
      .split(/[, ]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0);
    setQ1Numbers(parsed);
  };

  const handleQ1Random = () => {
    const randomCount = Math.floor(Math.random() * 4) + 5; // 5-8 numbers
    const newArr = Array.from({ length: randomCount }, () => Math.floor(Math.random() * 90) + 1);
    setQ1Numbers(newArr);
    setQ1InputStr(newArr.join(', '));
  };

  // --- QUESTION 2 STATE ---
  const [q2M, setQ2M] = useState<number>(4);
  const [q2Numbers, setQ2Numbers] = useState<number[]>([4, 9, 12, 18, 24, 25, 40, 7]);
  const [q2InputStr, setQ2InputStr] = useState<string>('4, 9, 12, 18, 24, 25, 40, 7');

  const handleQ2Update = (str: string) => {
    setQ2InputStr(str);
    const parsed = str
      .split(/[, ]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0);
    setQ2Numbers(parsed);
  };

  const handleQ2Random = () => {
    const newM = Math.floor(Math.random() * 5) + 3; // 3-7
    setQ2M(newM);
    const randomCount = Math.floor(Math.random() * 3) + 6;
    const newArr = Array.from({ length: randomCount }, () => Math.floor(Math.random() * 60) + 1);
    setQ2Numbers(newArr);
    setQ2InputStr(newArr.join(', '));
  };

  // --- QUESTION 3 STATE ---
  const [q3Words, setQ3Words] = useState<string[]>(['kodlama', 'algoritma', 'patika', 'csharp', 'developer']);
  const [q3InputStr, setQ3InputStr] = useState<string>('kodlama, algoritma, patika, csharp, developer');

  const handleQ3Update = (str: string) => {
    setQ3InputStr(str);
    const parsed = str
      .split(/[, ]+/)
      .map((w) => w.trim())
      .filter(Boolean);
    setQ3Words(parsed);
  };

  // --- QUESTION 4 STATE ---
  const [q4Sentence, setQ4Sentence] = useState<string>(
    'C# 101 ödevini başarıyla tamamlayan Enes Öztürk yazılım geliştiriyor.'
  );

  const q4Words = q4Sentence.split(/\s+/).filter(Boolean);
  const q4Letters = q4Sentence.match(/\p{L}/gu) || [];
  const q4NonSpace = q4Sentence.replace(/\s/g, '').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Question Selector Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('q1')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'q1'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Soru 1: Çift Sayı Filtresi (n)
        </button>
        <button
          onClick={() => setActiveTab('q2')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'q2'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Soru 2: m'e Bölünenler (n, m)
        </button>
        <button
          onClick={() => setActiveTab('q3')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'q3'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Soru 3: Ters Kelime Sıralama (n)
        </button>
        <button
          onClick={() => setActiveTab('q4')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'q4'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Soru 4: Cümle & Harf Analizi
        </button>
      </div>

      {/* ======================= TAB 1: QUESTION 1 ======================= */}
      {activeTab === 'q1' && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-center font-mono">
                    01
                  </span>
                  Çift Sayı Belirleme Algoritması ($n$ Adet Pozitif Sayı)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Matematiksel koşul: <code className="font-mono text-cyan-300">sayi % 2 == 0</code> olan pozitif sayılar listelenir.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQ1Random}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Rastgele Sayılar Üret</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">
                Test Sayı Dizisi ($n = {q1Numbers.length}$ eleman, virgülle ayrılmış):
              </label>
              <input
                type="text"
                value={q1InputStr}
                onChange={(e) => handleQ1Update(e.target.value)}
                placeholder="Örn: 14, 7, 22, 35, 88"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Graphical Step-by-Step Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {q1Numbers.map((num, idx) => {
              const isEven = num % 2 === 0;
              return (
                <div
                  key={`q1-${idx}-${num}`}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    isEven
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xs text-slate-500 font-mono mb-1">Eleman [{idx}]</span>
                  <span className="text-2xl font-bold font-mono my-1">{num}</span>
                  <div className="mt-2 text-xs font-mono flex items-center gap-1">
                    {isEven ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{num} % 2 = 0 (Çift)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-500">{num} % 2 = 1 (Tek)</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Output Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-sm">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Konsol Çıktısı [Console.WriteLine]:</span>
              <div className="text-emerald-400 font-bold flex flex-wrap items-center gap-2">
                {q1Numbers.filter((n) => n % 2 === 0).length > 0 ? (
                  q1Numbers
                    .filter((n) => n % 2 === 0)
                    .map((n, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
                        {n}
                      </span>
                    ))
                ) : (
                  <span className="text-slate-500 text-xs">(Hiç çift sayı bulunamadı)</span>
                )}
              </div>
            </div>

            <div className="text-right text-xs text-slate-400">
              <span>Toplam Çift Sayı: </span>
              <strong className="text-slate-200 font-bold">{q1Numbers.filter((n) => n % 2 === 0).length}</strong>
              <span className="text-slate-600 mx-2">/</span>
              <span>Toplam Eleman: </span>
              <strong className="text-slate-200 font-bold">{q1Numbers.length}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 2: QUESTION 2 ======================= */}
      {activeTab === 'q2' && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-center font-mono">
                    02
                  </span>
                  $m$'e Eşit veya Tam Bölünen Sayılar ($n$ Adet Sayı, Bölen $m$)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Koşul: <code className="font-mono text-cyan-300">sayi == m || sayi % m == 0</code>
                </p>
              </div>

              <button
                onClick={handleQ2Random}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rastgele Üret</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Hedef / Bölen Sayı ($m$):
                </label>
                <input
                  type="number"
                  min="1"
                  value={q2M}
                  onChange={(e) => setQ2M(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Test Sayı Dizisi ($n = {q2Numbers.length}$ adet sayı):
                </label>
                <input
                  type="text"
                  value={q2InputStr}
                  onChange={(e) => handleQ2Update(e.target.value)}
                  placeholder="Örn: 4, 9, 12, 18, 24, 25"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>

          {/* Cards for Q2 with math explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {q2Numbers.map((num, idx) => {
              const isEqual = num === q2M;
              const isDivisible = num % q2M === 0;
              const matched = isEqual || isDivisible;
              const remainder = num % q2M;
              const quotient = Math.floor(num / q2M);

              return (
                <div
                  key={`q2-${idx}-${num}`}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    matched
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">[{idx}]</span>
                    {matched ? (
                      <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isEqual ? 'm\'e Eşit' : 'Tam Bölünür'}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        Bölünmez
                      </span>
                    )}
                  </div>

                  <div className="my-3 text-center">
                    <div className="text-2xl font-bold font-mono">{num}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      {num} ÷ {q2M} = {quotient} (Kalan: {remainder})
                    </div>
                  </div>

                  <div className="text-xs font-mono pt-2 border-t border-slate-800/80 text-center">
                    {matched ? (
                      <span className="text-emerald-400 font-semibold">Konsola Yazdırılır ✓</span>
                    ) : (
                      <span className="text-slate-500">Elenir</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Q2 Result Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-sm">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                Konsol Çıktısı [{q2M} sayısına eşit veya tam bölünenler]:
              </span>
              <div className="text-emerald-400 font-bold flex flex-wrap items-center gap-2">
                {q2Numbers.filter((n) => n === q2M || n % q2M === 0).length > 0 ? (
                  q2Numbers
                    .filter((n) => n === q2M || n % q2M === 0)
                    .map((n, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
                        {n}
                      </span>
                    ))
                ) : (
                  <span className="text-slate-500 text-xs">({q2M} sayısına bölünen eleman bulunamadı)</span>
                )}
              </div>
            </div>

            <div className="text-right text-xs text-slate-400">
              <span>Şartı Sağlayan: </span>
              <strong className="text-emerald-400 font-bold">
                {q2Numbers.filter((n) => n === q2M || n % q2M === 0).length}
              </strong>
              <span className="text-slate-600 mx-2">/</span>
              <span>Toplam: </span>
              <strong className="text-slate-200 font-bold">{q2Numbers.length}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 3: QUESTION 3 ======================= */}
      {activeTab === 'q3' && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-center font-mono">
                03
              </span>
              Kelimeleri Sondan Başa Yazdırma ($n$ Adet Kelime)
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Kullanıcının girdiği kelimeler dizide saklanır ve <code className="font-mono text-cyan-300">for (int i = n - 1; i &gt;= 0; i--)</code> döngüsüyle sondan başa doğru yazdırılır.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">
                Kelimeler (virgülle ayrılmış):
              </label>
              <input
                type="text"
                value={q3InputStr}
                onChange={(e) => handleQ3Update(e.target.value)}
                placeholder="Örn: kodlama, algoritma, patika, csharp"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Visual Dual Timeline: Input order vs Output order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Order */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  Giriş Sırası (Dizi İndeksleri: 0 → n-1)
                </span>
                <span className="text-xs text-slate-500 font-mono">{q3Words.length} Kelime</span>
              </div>

              <div className="flex flex-col gap-2">
                {q3Words.map((word, idx) => (
                  <div
                    key={`q3-in-${idx}`}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
                        {idx}
                      </span>
                      <span className="text-slate-200 font-semibold text-sm">{word}</span>
                    </div>
                    <span className="text-slate-500">{word.length} harf</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reversed Order */}
            <div className="bg-emerald-950/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ArrowDownUp className="w-3.5 h-3.5 text-emerald-400" />
                  Konsol Çıktısı (Sondan Başa Sıralanış: n-1 → 0)
                </span>
                <span className="text-xs text-emerald-500 font-mono">Ters Dizi</span>
              </div>

              <div className="flex flex-col gap-2">
                {[...q3Words].reverse().map((word, idx) => {
                  const originalIdx = q3Words.length - 1 - idx;
                  return (
                    <div
                      key={`q3-out-${idx}`}
                      className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg flex items-center justify-between font-mono text-xs shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-emerald-300 font-bold text-sm">{word}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-xs">
                        (Orijinal: [{originalIdx}])
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 4: QUESTION 4 ======================= */}
      {activeTab === 'q4' && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-center font-mono">
                04
              </span>
              Cümledeki Toplam Kelime ve Harf Sayısı Analizörü
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Cümle parçalanır (<code className="font-mono text-cyan-300">string.Split</code>) ve karakterler incelenerek alfabetik harf sayısı hesaplanır.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400">Analiz Edilecek Cümle:</label>
              <textarea
                rows={3}
                value={q4Sentence}
                onChange={(e) => setQ4Sentence(e.target.value)}
                placeholder="Bir cümle yazınız..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 font-sans focus:outline-none focus:border-emerald-500/50 leading-relaxed"
              />
            </div>

            {/* Preset Sentences */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-slate-500">Örnekler:</span>
              <button
                onClick={() => setQ4Sentence('C# 101 ödevini başarıyla tamamlayan Enes Öztürk yazılım geliştiriyor.')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-xs"
              >
                Ödev Cümlesi (Enes Öztürk)
              </button>
              <button
                onClick={() => setQ4Sentence('Algoritma ve veri yapıları yazılım mühendisliğinin temelidir.')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-xs"
              >
                Yazılım Mühendisliği
              </button>
              <button
                onClick={() => setQ4Sentence('Bugün hava çok güzel, kod yazmak harika!')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-xs"
              >
                Kısa Cümle
              </button>
            </div>
          </div>

          {/* Quantitative Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Toplam Kelime</span>
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-emerald-400 my-2 tabular-nums">
                {q4Words.length}
              </div>
              <div className="text-xs text-slate-500 font-mono">string.Split(' ')</div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Toplam Harf</span>
                <Hash className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-cyan-400 my-2 tabular-nums">
                {q4Letters.length}
              </div>
              <div className="text-xs text-slate-500 font-mono">char.IsLetter(c)</div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Boşluklar Dışında</span>
                <span className="font-mono text-xs text-amber-400">Length</span>
              </div>
              <div className="text-3xl font-bold font-mono text-amber-400 my-2 tabular-nums">
                {q4NonSpace}
              </div>
              <div className="text-xs text-slate-500 font-mono">Boşluk ve sekme dışı · Noktalama dahil</div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Toplam Uzunluk</span>
                <span className="font-mono text-xs text-slate-400">cumle.Length</span>
              </div>
              <div className="text-3xl font-bold font-mono text-slate-200 my-2 tabular-nums">
                {q4Sentence.length}
              </div>
              <div className="text-xs text-slate-500 font-mono">Boşluklar Dahil</div>
            </div>
          </div>

          {/* Breakdown Tokens */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <span className="text-xs font-semibold text-slate-300">
              Ayrıştırılan Kelimeler ve Harf Dağılımı ({q4Words.length} kelime):
            </span>
            <div className="flex flex-wrap gap-2">
              {q4Words.map((w, i) => {
                const lettersInWord = (w.match(/\p{L}/gu) || []).length;
                return (
                  <div
                    key={`w-${i}`}
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2 font-mono text-xs"
                  >
                    <span className="text-slate-500">#{i + 1}</span>
                    <span className="text-emerald-300 font-semibold text-sm">{w}</span>
                    <span className="text-slate-500 text-xs bg-slate-900 px-1.5 py-0.5 rounded">
                      {lettersInWord} harf
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
