import React, { useState } from 'react';
import { DataType } from '../types/array-lesson';
import { Database, Binary, Info, RefreshCw } from 'lucide-react';

export const MemoryModelVisualizer: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DataType>('int');
  const [arrayLength, setArrayLength] = useState<number>(6);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const typeConfig: Record<DataType, { sizeDescription: string; defaultVal: (idx: number) => string | number | boolean; syntax: string }> = {
    int: {
      sizeDescription: 'int: 4 baytlık değer',
      defaultVal: (idx) => [10, 24, 7, 42, 19, 88, 5, 63, 31, 99][idx % 10],
      syntax: 'int[]',
    },
    string: {
      sizeDescription: 'string: metin başvurusu (boyut ortama bağlıdır)',
      defaultVal: (idx) => ['"Mavi"', '"Kırmızı"', '"Sarı"', '"Yeşil"', '"Mor"', '"Turuncu"', '"Beyaz"', '"Siyah"'][idx % 8],
      syntax: 'string[]',
    },
    double: {
      sizeDescription: 'double: 8 baytlık değer',
      defaultVal: (idx) => [3.14, 2.71, 9.81, 1.41, 0.57, 4.25, 8.99, 6.02][idx % 8],
      syntax: 'double[]',
    },
    bool: {
      sizeDescription: 'bool: mantıksal değer',
      defaultVal: (idx) => idx % 2 === 0,
      syntax: 'bool[]',
    },
  };

  const currentConfig = typeConfig[selectedType];
  const [customValues, setCustomValues] = useState<Record<string, Record<number, string | number | boolean>>>({
    int: {},
    string: {},
    double: {},
    bool: {},
  });

  const getCellValue = (idx: number) => {
    if (customValues[selectedType]?.[idx] !== undefined) {
      return customValues[selectedType][idx];
    }
    return currentConfig.defaultVal(idx);
  };

  const handleUpdateValue = (idx: number, newVal: string) => {
    let parsed: string | number | boolean = newVal;
    if (selectedType === 'int') {
      const num = parseInt(newVal, 10);
      parsed = isNaN(num) ? 0 : num;
    } else if (selectedType === 'double') {
      const num = parseFloat(newVal);
      parsed = isNaN(num) ? 0.0 : num;
    } else if (selectedType === 'bool') {
      parsed = newVal.toLowerCase() === 'true';
    } else if (selectedType === 'string') {
      parsed = newVal.startsWith('"') ? newVal : `"${newVal}"`;
    }

    setCustomValues((prev) => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        [idx]: parsed,
      },
    }));
  };

  const resetValues = () => {
    setCustomValues((prev) => ({
      ...prev,
      [selectedType]: {},
    }));
  };

  return (
    <section id="bellek" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 01</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">Dizi Hücreleri</span>
            <span aria-hidden="true">·</span>
            <span>Kavramsal Görünüm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dizi Nedir ve Bellekte Nasıl Saklanır?
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            C# dizileri, aynı türden elemanları sıralı bir koleksiyonda tutar. İndeksleme <span className="font-mono text-sky-300">0</span>'dan başlar; bu nedenle {arrayLength} elemanlı dizinin son indeksi <span className="font-mono text-sky-300">{arrayLength - 1}</span>'dir.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Data Type Selector (Interactive Filter Tabs) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Veri Tipi:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['int', 'string', 'double', 'bool'] as DataType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedIndex(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono ml-2">
              {currentConfig.sizeDescription}
            </span>
          </div>

          {/* Array Length Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Eleman Sayısı (Length):</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[4, 5, 6, 8, 10].map((len) => (
                <button
                  key={len}
                  onClick={() => {
                    setArrayLength(len);
                    if (selectedIndex >= len) setSelectedIndex(len - 1);
                  }}
                  className={`w-7 h-7 text-xs font-mono font-medium rounded flex items-center justify-center transition-all cursor-pointer ${
                    arrayLength === len
                      ? 'bg-slate-800 text-sky-300 font-bold border border-sky-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>

            <button
              onClick={resetValues}
              className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              title="Değerleri Sıfırla"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Memory Grid */}
        <div className="p-3 mb-6 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-100 leading-relaxed">
          Bu çizim kavramsaldır; gerçek RAM adreslerini, CLR bellek yerleşimini veya dizinin toplam bayt maliyetini göstermez. Özellikle <code>string[]</code> hücreleri metin içeriğini değil başvuruları tutar.
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual: Memory Strip */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-semibold text-white">
                    Dizi Hücreleri (Şematik)
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Hücre sayısı: <span className="text-sky-300 font-bold">{arrayLength}</span>
                </div>
              </div>

              {/* Zero-Index Lesson Rule Box */}
              <div className="p-3 mb-6 rounded-lg bg-sky-950/40 border border-sky-800/40 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-200 leading-relaxed">
                  <strong>Enes Öztürk'ün Temel Kuralı:</strong> "Dizi index'i 0'dan başlar. Yani {arrayLength} elemanlı bir dizinin ilk elemanı <strong>0. indekste</strong>, sonuncu elemanı <strong>{arrayLength - 1}. indekstir</strong>."
                </div>
              </div>

              {/* Memory Array Interactive Blocks */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-2 min-w-max">
                  {Array.from({ length: arrayLength }).map((_, idx) => {
                    const isSelected = selectedIndex === idx;
                    const val = getCellValue(idx);

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`flex-1 min-w-[90px] p-3 rounded-lg border transition-all cursor-pointer text-center relative ${
                          isSelected
                            ? 'bg-sky-950/80 border-sky-400 shadow-md ring-2 ring-sky-400/20'
                            : 'bg-slate-950 hover:bg-slate-850 border-slate-800'
                        }`}
                      >
                        {/* Index header */}
                        <div className="flex items-center justify-between text-[11px] font-mono mb-2 pb-1 border-b border-slate-800">
                          <span className="text-slate-400">Idx:</span>
                          <span className={`font-bold ${isSelected ? 'text-sky-300' : 'text-slate-300'}`}>
                            [{idx}]
                          </span>
                        </div>

                        {/* Cell Value */}
                        <div className="my-2">
                          <span
                            className={`text-sm font-mono font-bold block truncate px-1 ${
                              isSelected ? 'text-white' : 'text-slate-200'
                            }`}
                          >
                            {String(val)}
                          </span>
                        </div>

                        {/* Schematic cell label */}
                        <div className="mt-2 pt-1 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                          dizi[{idx}]
                        </div>

                        {/* First / Last indicator */}
                        {idx === 0 && (
                          <div className="text-[9px] font-medium text-emerald-400 mt-1">
                            İlk Eleman
                          </div>
                        )}
                        {idx === arrayLength - 1 && (
                          <div className="text-[9px] font-medium text-amber-400 mt-1">
                            Son Eleman
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Offset Calculation Bar */}
              <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-400 mb-2">
                  <span>Seçili hücre: <strong className="text-sky-300">dizi[{selectedIndex}]</strong> ({selectedIndex + 1}. eleman)</span>
                  <span className="text-emerald-400">İndeksleme: 0 tabanlı</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-300">
                  <span>C# erişim ifadesi:</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400 text-sky-300 font-bold">
                    dizi[{selectedIndex}]
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison: Contiguous Array vs Scattered Variables */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Binary className="w-4 h-4 text-amber-400" />
                Neden Ayrı Değişkenler Yerine Dizi Kullanırız?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30 space-y-2">
                  <div className="font-semibold text-red-300">❌ Ayrı Değişkenler (sayi1, sayi2...):</div>
                  <p className="text-slate-300 leading-relaxed">
                    Her değerin ayrı bir adı olur. Değişkenleri tek tek kullanabilirsiniz; ancak sayısal bir indeksle seçip aynı döngü üzerinden yönetmek için dizi gibi bir koleksiyon daha uygundur.
                  </p>
                  <pre className="p-2 rounded bg-slate-950 text-slate-400 font-mono text-[11px] overflow-x-auto">
                    int s1 = 12;{'\n'}
                    int s2 = 45;{'\n'}
                    int s3 = 78;
                  </pre>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-2">
                  <div className="font-semibold text-emerald-300">✅ Tek Bir Dizi (int[] sayilar):</div>
                  <p className="text-slate-300 leading-relaxed">
                    Elemanlara indeksle erişilir; bir döngüyle sırayla işlemek için aynı kodu kullanabilirsiniz.
                  </p>
                  <pre className="p-2 rounded bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                    int[] s = new int[3];{'\n'}
                    for (int i = 0; i &lt; s.Length; i++){'{'}{'\n'}
                    {'  '}Console.WriteLine(s[i]);{'\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cell Inspector & Value Editor */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-slate-800">
                Seçili Hücre İnceleyicisi
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">İndeks Numarası:</span>
                  <span className="font-mono font-bold text-sky-400">[{selectedIndex}]</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Sıra (İnsan Gözüyle):</span>
                  <span className="font-medium text-slate-200">{selectedIndex + 1}. Eleman</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Dizi İndeksi:</span>
                  <span className="font-mono text-emerald-400">dizi[{selectedIndex}]</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Tür bilgisi:</span>
                  <span className="font-mono text-slate-200">
                    {currentConfig.sizeDescription}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Şu Anki Değer:</span>
                  <span className="font-mono font-bold text-white">
                    {String(getCellValue(selectedIndex))}
                  </span>
                </div>
              </div>

              {/* Live Edit Value in Array */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Bu Hücrenin Değerini Değiştir (<span className="font-mono">dizi[{selectedIndex}] = ...</span>):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={String(getCellValue(selectedIndex))}
                    onChange={(e) => handleUpdateValue(selectedIndex, e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-sky-400 text-white"
                    placeholder="Yeni değer yazın..."
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bu düzenleme yalnızca ekrandaki örnek değeri değiştirir; C# kodu çalıştırılmaz.
                </p>
              </div>

              {/* Equivalent C# Access Code */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">
                  C# Erişim Kodu
                </div>
                <code className="text-xs font-mono text-sky-300 block">
                  {currentConfig.syntax} dizi[{selectedIndex}] = {String(getCellValue(selectedIndex))};
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
