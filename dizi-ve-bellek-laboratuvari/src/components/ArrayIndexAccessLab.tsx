import React, { useState } from 'react';
import { Target, AlertCircle, CheckCircle, Edit3, ArrowRight } from 'lucide-react';

export const ArrayIndexAccessLab: React.FC = () => {
  const [colors, setColors] = useState<string[]>(['Mavi', 'Kırmızı', 'Sarı', 'Yeşil']);
  const [testIndex, setTestIndex] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<string>('Turuncu');

  const colorPalettes: Record<string, string> = {
    Mavi: 'bg-blue-600/30 border-blue-500 text-blue-300',
    Kırmızı: 'bg-red-600/30 border-red-500 text-red-300',
    Sarı: 'bg-yellow-600/30 border-yellow-500 text-yellow-300',
    Yeşil: 'bg-emerald-600/30 border-emerald-500 text-emerald-300',
  };

  const isOutOfRange = testIndex < 0 || testIndex >= colors.length;
  const activeColor = !isOutOfRange ? colors[testIndex] : null;

  const handleUpdateCurrentSlot = () => {
    if (isOutOfRange) return;
    const updated = [...colors];
    updated[testIndex] = customInputValue.trim() || 'Mor';
    setColors(updated);
  };

  const handleResetColors = () => {
    setColors(['Mavi', 'Kırmızı', 'Sarı', 'Yeşil']);
    setTestIndex(1);
  };

  return (
    <section id="erisim" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 03</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">İndeks & Erişim</span>
            <span aria-hidden="true">·</span>
            <span>IndexOutOfRangeException Kontrolü</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dizilere Erişim ve Sınır Güvenliği
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            Dizilere indeks numaraları kullanılarak köşeli parantez <span className="font-mono text-sky-300">[i]</span> içinde erişilir. İndeksler <span className="font-mono text-sky-300">0</span>'dan başladığı için, <strong>1. indeks daima 2. sıradaki elemanı getirir</strong>.
          </p>
        </div>

        {/* Lesson Code Snippet Card */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-white">Enes Öztürk'ün Ders Örneği:</span>
            <span className="font-mono">C# Syntax</span>
          </div>
          <pre className="mt-3 p-4 rounded-lg bg-slate-950 font-mono text-sm text-sky-300 overflow-x-auto leading-relaxed border border-slate-800">
            <span className="text-purple-400">string</span>[] renkler = &#123;<span className="text-emerald-300">"Mavi"</span>, <span className="text-emerald-300">"Kırmızı"</span>, <span className="text-emerald-300">"Sarı"</span>, <span className="text-emerald-300">"Yeşil"</span>&#125;;{'\n'}
            <span className="text-purple-400">string</span> renk = renkler[<span className="text-amber-300 font-bold">1</span>]; <span className="text-slate-500">// Kırmızı rengi getirir.</span>
          </pre>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Color Array Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-sky-400" />
                  İnteraktif Eleman Seçimi
                </span>
                <button
                  onClick={handleResetColors}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Diziyi Sıfırla
                </button>
              </div>

              {/* Color Array Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colors.map((color, idx) => {
                  const isSelected = testIndex === idx;
                  const customColorStyle = colorPalettes[color] || 'bg-slate-800 border-slate-700 text-slate-200';

                  return (
                    <div
                      key={idx}
                      onClick={() => setTestIndex(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-center relative ${
                        isSelected
                          ? 'ring-2 ring-sky-400 scale-[1.03] shadow-lg'
                          : 'opacity-85 hover:opacity-100'
                      } ${customColorStyle}`}
                    >
                      <div className="text-[11px] font-mono text-slate-300/80 mb-1">
                        renkler[{idx}]
                      </div>
                      <div className="text-lg font-bold font-mono tracking-wide">
                        "{color}"
                      </div>
                      <div className="text-xs mt-1.5 opacity-90 font-medium">
                        {idx + 1}. Eleman
                      </div>
                      {isSelected && (
                        <div className="mt-2 text-[10px] font-bold text-sky-300 bg-slate-950/70 py-0.5 rounded">
                          SEÇİLDİ
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Index Slider & Boundary Tester */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Dizi İndeksini Değiştir:</span>
                  <span className="font-mono text-sky-300 font-bold">
                    İndeks: [{testIndex}]
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={-1}
                    max={5}
                    value={testIndex}
                    onChange={(e) => setTestIndex(parseInt(e.target.value, 10))}
                    className="flex-1 accent-sky-400 cursor-pointer"
                  />
                  <div className="flex gap-1">
                    {[-1, 0, 1, 2, 3, 4].map((i) => (
                      <button
                        key={i}
                        onClick={() => setTestIndex(i)}
                        className={`w-7 h-7 text-xs font-mono rounded transition-colors cursor-pointer ${
                          testIndex === i
                            ? i >= 0 && i < colors.length
                              ? 'bg-sky-500 text-slate-950 font-bold'
                              : 'bg-red-500 text-white font-bold'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span className="text-red-400">[-1: Hata]</span>
                  <span>[0]: İlk</span>
                  <span>[1]: Kırmızı</span>
                  <span>[3]: Son</span>
                  <span className="text-red-400">[4: Hata]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Result or Exception Sandbox */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-slate-800">
                Çalışma Zamanı Sonucu
              </h3>

              {!isOutOfRange ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" />
                      Geçerli İndeks Erişimi (Success)
                    </div>
                    <div className="font-mono text-sm text-slate-200">
                      string renk = renkler[{testIndex}];
                    </div>
                    <div className="text-xs text-emerald-300">
                      Sonuç: <strong className="text-white text-sm">"{activeColor}"</strong> ({testIndex + 1}. Eleman)
                    </div>
                  </div>

                  {testIndex === 1 && (
                    <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/30 text-xs text-sky-200">
                      <strong>Enes Öztürk'ün Vurgusu:</strong> <span className="font-mono">renkler[1]</span> çağrıldığında 1. eleman olan "Mavi" değil, 0'dan başlandığı için <strong>2. eleman olan "Kırmızı"</strong> döner.
                    </div>
                  )}

                  {/* Modify in place */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                      Bu İndeksteki Elemanı Değiştir:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customInputValue}
                        onChange={(e) => setCustomInputValue(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs font-mono bg-slate-900 border border-slate-700 rounded text-white"
                        placeholder="Yeni renk..."
                      />
                      <button
                        onClick={handleUpdateCurrentSlot}
                        className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded cursor-pointer"
                      >
                        Ata
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      renkler[{testIndex}] = "{customInputValue}";
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-950/40 border border-red-800/40 space-y-2.5">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      IndexOutOfRangeException Hatası!
                    </div>
                    <div className="font-mono text-xs text-red-300 bg-slate-950/90 p-2.5 rounded border border-red-900/60 leading-relaxed">
                      System.IndexOutOfRangeException: Dizi sınırlarının dışına çıkıldı.{'\n'}
                      İndeks {testIndex}, dizi boyutu {colors.length} iken geçersizdir.
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {testIndex < 0 ? (
                        <>C# dilinde negatif indeksler desteklenmez. İndeks daima 0 veya pozitif olmalıdır.</>
                      ) : (
                        <>
                          Dizimiz 4 elemanlıdır; geçerli indeksler <span className="font-mono">0, 1, 2, 3</span> aralığındadır. <span className="font-mono text-red-300">[{testIndex}]</span> bu aralığın dışındadır. C# çalışma zamanı geçersiz dizi erişiminde <code>IndexOutOfRangeException</code> oluşturur.
                        </>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => setTestIndex(1)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Güvenli İndekse Geri Dön ([1])
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
