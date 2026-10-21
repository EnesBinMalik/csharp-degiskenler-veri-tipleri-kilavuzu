import React, { useState } from 'react';
import { Code2, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const ArrayDeclarationExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fixed' | 'inline' | 'twostep'>('fixed');

  // Interactive custom builder state
  const [builderType, setBuilderType] = useState<'int' | 'string'>('int');
  const [builderName, setBuilderName] = useState('sayilar');
  const [builderSize, setBuilderSize] = useState(6);
  const [allocatedStep, setAllocatedStep] = useState<1 | 2>(2);

  return (
    <section id="tanimlama" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 02</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">Sözdizimi & Ayırma</span>
            <span aria-hidden="true">·</span>
            <span>C# Dizi Tanımlama Yolları</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dizi Tanımlama ve Bellek Tahsisi
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            C# dizileri referans türüdür ve oluşturulduklarında uzunlukları sabittir. Eleman sayısı oluşturma anında belirlenir; daha sonra dizinin uzunluğu değiştirilemez. Enes Öztürk'ün anlattığı 3 temel yöntemi aşağıdan inceleyin.
          </p>
        </div>

        {/* 3 Tabs for Enes Öztürk's Examples */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 mb-8 max-w-2xl">
          <button
            onClick={() => setActiveTab('fixed')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'fixed'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            1. Boyut Belirterek (int[10])
          </button>
          <button
            onClick={() => setActiveTab('inline')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'inline'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            2. Süslü Parantezle (renkler)
          </button>
          <button
            onClick={() => setActiveTab('twostep')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'twostep'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            3. İki Aşamalı (Önce Tanım)
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Code & Explanation */}
          <div className="lg:col-span-6 space-y-6">
            {activeTab === 'fixed' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-sky-400">Örnek 1: Boyut Belirterek Tanımlama</span>
                    <span className="font-mono">C# Kodu</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-sm text-sky-300 overflow-x-auto leading-relaxed">
                    <span className="text-purple-400">int</span>[] sayilar = <span className="text-purple-400">new</span> <span className="text-purple-400">int</span>[<span className="text-amber-300">10</span>];{'\n'}
                    sayilar[<span className="text-amber-300">2</span>] = <span className="text-emerald-400">12</span>;
                  </pre>
                  <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                    <p>
                      <strong>Enes Öztürk'ün Notu:</strong> "Yukarıda örnek bir dizi tanımlaması görüyoruz. Integer tipinde veri tutan 10 elemanlı bir dizi tanımladık. Ve dizinin <strong>3. elemanına yani 2. indexine 12 değerini</strong> atadık."
                    </p>
                    <p className="text-xs text-slate-400">
                      Yeni bir int dizisi açıldığında tüm elemanlar otomatik olarak varsayılan değer olan <span className="font-mono text-slate-200">0</span> ile doldurulur. <span className="font-mono text-sky-300">sayilar[2] = 12;</span> satırı sadece 2. indeksi günceller.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-white">İndeks Sırası Hatırlatması:</div>
                  <ul className="space-y-1 list-disc list-inside text-slate-400">
                    <li><span className="font-mono text-slate-300">sayilar[0]</span>: 1. eleman (Varsayılan 0)</li>
                    <li><span className="font-mono text-slate-300">sayilar[1]</span>: 2. eleman (Varsayılan 0)</li>
                    <li><span className="font-mono text-sky-300 font-bold">sayilar[2]</span>: 3. eleman (Değeri: <strong className="text-emerald-400">12</strong>)</li>
                    <li><span className="font-mono text-slate-300">sayilar[9]</span>: 10. ve son eleman</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'inline' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-sky-400">Örnek 2: Tanım Anında Eleman Atama</span>
                    <span className="font-mono">C# Kodu</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-sm text-sky-300 overflow-x-auto leading-relaxed">
                    <span className="text-purple-400">string</span>[] renkler = &#123;<span className="text-emerald-300">"Mavi"</span>, <span className="text-emerald-300">"Kırmızı"</span>, <span className="text-emerald-300">"Sarı"</span>, <span className="text-emerald-300">"Yeşil"</span>&#125;;
                  </pre>
                  <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                    <p>
                      <strong>Enes Öztürk'ün Notu:</strong> "Dizilerin elemanlarını dizi tanımı yapılırken verebiliriz. Yukarıdaki örnekte göreceğiniz üzere string tipinde bir dizi tanımladık. Ve elemanları bize bunun <strong>4 elemanlı bir dizi</strong> olduğunu söylüyor."
                    </p>
                    <p className="text-xs text-slate-400">
                      Derleyici, süslü parantez içindeki eleman sayısını sayarak bellek boyutunu otomatik olarak 4 olarak belirler. <span className="font-mono text-sky-300">new string[4]</span> yazmaya gerek kalmaz.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-white">Elemanlar ve İndeksleri:</div>
                  <ul className="space-y-1 list-disc list-inside text-slate-400">
                    <li><span className="font-mono text-slate-300">renkler[0]</span>: "Mavi"</li>
                    <li><span className="font-mono text-sky-300 font-bold">renkler[1]</span>: "Kırmızı" (2. eleman)</li>
                    <li><span className="font-mono text-slate-300">renkler[2]</span>: "Sarı"</li>
                    <li><span className="font-mono text-slate-300">renkler[3]</span>: "Yeşil" (son eleman)</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'twostep' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-sky-400">Örnek 3: İki Aşamalı Tanımlama</span>
                    <span className="font-mono">C# Kodu</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-sm text-sky-300 overflow-x-auto leading-relaxed">
                    <span className="text-purple-400">int</span>[] dizi;{'\n'}
                    dizi = <span className="text-purple-400">new</span> <span className="text-purple-400">int</span>[<span className="text-amber-300">4</span>];
                  </pre>
                  <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                    <p>
                      <strong>Enes Öztürk'ün Notu:</strong> "Dizi değişkenini önce tanımlayıp dizi örneğini daha sonra oluşturabilirsiniz. Dizi örneği oluşturulurken eleman sayısı belirlenir."
                    </p>
                    <p className="text-xs text-slate-400">
                      Bu yerel değişken, ilk satırda henüz bir diziye atanmış değildir; ikinci satırda oluşturulan 4 elemanlı diziye atanır. Yerel değişkenlerin ve dizilerin fiziksel bellek yerleşimi bu örnekte modellenmez.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Önemli Uyarı:</strong> Yerel değişkeni <span className="font-mono">dizi = new int[4];</span> ile atamadan <span className="font-mono">dizi[0] = 5;</span> kullanırsanız kod derlenmez; C# yerel değişkenin atanmamış olduğunu bildirir. Önceden <span className="font-mono">null</span> atanmış bir dizi değişkenine erişmek ise çalışma zamanında <span className="font-mono">NullReferenceException</span> oluşturur.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visual State for the Active Tab */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  Bellekteki Görünüm Simülasyonu
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {activeTab === 'fixed' && '10 elemanlı int dizisi'}
                  {activeTab === 'inline' && '4 elemanlı string dizisi'}
                  {activeTab === 'twostep' && '4 elemanlı int dizisi'}
                </span>
              </div>

              {/* Visualized Cells */}
              {activeTab === 'fixed' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400">
                    <span className="text-sky-300 font-mono">sayilar[2] = 12;</span> ataması sonucu dizi durumu:
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
                      const isAssigned = idx === 2;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            isAssigned
                              ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-400/30'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-slate-400 mb-1">
                            [{idx}]
                          </div>
                          <div
                            className={`text-base font-bold font-mono ${
                              isAssigned ? 'text-emerald-300 scale-110' : 'text-slate-500'
                            }`}
                          >
                            {isAssigned ? 12 : 0}
                          </div>
                          <div className="text-[9px] text-slate-500 mt-1">
                            {isAssigned ? 'Atandı (12)' : 'Varsayılan (0)'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-slate-400 pt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>3. eleman olan <span className="font-mono text-white">sayilar[2]</span> başarıyla 12 değerini aldı.</span>
                  </div>
                </div>
              )}

              {activeTab === 'inline' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    <span className="font-mono text-sky-300">renkler</span> dizisi elemanları:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { idx: 0, val: 'Mavi', color: 'bg-blue-600/30 border-blue-500 text-blue-300' },
                      { idx: 1, val: 'Kırmızı', color: 'bg-red-600/30 border-red-500 text-red-300' },
                      { idx: 2, val: 'Sarı', color: 'bg-yellow-600/30 border-yellow-500 text-yellow-300' },
                      { idx: 3, val: 'Yeşil', color: 'bg-emerald-600/30 border-emerald-500 text-emerald-300' },
                    ].map((item) => (
                      <div
                        key={item.idx}
                        className={`p-3.5 rounded-lg border text-center ${item.color}`}
                      >
                        <div className="text-[10px] font-mono text-slate-300 mb-1">
                          İndeks [{item.idx}]
                        </div>
                        <div className="text-sm font-bold font-mono">
                          "{item.val}"
                        </div>
                        <div className="text-[10px] text-slate-300 mt-1">
                          {item.idx + 1}. Eleman
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    <code>string[]</code> hücreleri metin içeriğini değil string başvurularını tutar. Gerçek bellek maliyeti çalışma ortamına ve metinlere bağlıdır.
                  </div>
                </div>
              )}

              {activeTab === 'twostep' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-400">Aşama Seç:</span>
                    <button
                      onClick={() => setAllocatedStep(1)}
                      className={`px-3 py-1 text-xs rounded transition-all cursor-pointer ${
                        allocatedStep === 1
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      Aşama 1: int[] dizi;
                    </button>
                    <button
                      onClick={() => setAllocatedStep(2)}
                      className={`px-3 py-1 text-xs rounded transition-all cursor-pointer ${
                        allocatedStep === 2
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      Aşama 2: new int[4];
                    </button>
                  </div>

                  {allocatedStep === 1 ? (
                    <div className="p-5 rounded-lg bg-slate-950 border border-dashed border-amber-600/50 text-center space-y-2">
                      <div className="text-amber-400 font-mono text-sm font-semibold">
                        dizi henüz bir diziye atanmamış
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Yerel değişken henüz atanmadı; bu aşamada <code>dizi[0]</code> erişimi derleme hatasına yol açar. Değişkene henüz <code>null</code> değeri verilmiş olduğu varsayılmaz.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>4 elemanlı dizi örneği oluşturuldu.</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 1, 2, 3].map((idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"
                          >
                            <div className="text-[10px] font-mono text-slate-400 mb-1">
                              dizi[{idx}]
                            </div>
                            <div className="text-base font-bold font-mono text-white">0</div>
                            <div className="text-[9px] text-slate-500 mt-1">4 bayt</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Custom Array Allocator Mini-Lab */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Kendi Dizini Tasarla (Canlı Kod Oluşturucu)
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Tip:</label>
                    <select
                      value={builderType}
                      onChange={(e) => setBuilderType(e.target.value as 'int' | 'string')}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    >
                      <option value="int">int</option>
                      <option value="string">string</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Dizi Adı:</label>
                    <input
                      type="text"
                      value={builderName}
                      onChange={(e) => setBuilderName(e.target.value || 'dizi')}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Boyut:</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={builderSize}
                      onChange={(e) => setBuilderSize(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-850 font-mono text-xs text-sky-300">
                  {builderType}[] {builderName} = new {builderType}[{builderSize}];
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
