import React, { useState } from 'react';
import { OUT_VS_REF_COMPARISON } from '../data/csharpExamples';
import { Layers, ArrowRight, Play, RotateCcw, Check, Sparkles, AlertCircle, Database } from 'lucide-react';

export const OutRefVisualizer: React.FC = () => {
  // Calculator & Memory state
  const [paramA, setParamA] = useState<number>(4);
  const [paramB, setParamB] = useState<number>(8);
  const [animStep, setAnimStep] = useState<number>(0);

  // TryParse demo state
  const [tryParseInput, setTryParseInput] = useState<string>('2026');
  const [tryParseResult, setTryParseResult] = useState<{ success: boolean; value: number } | null>({
    success: true,
    value: 2026,
  });

  const steps = [
    {
      title: '1. Çağıran kapsamda bildirim',
      code: 'instance.Toplam(4, 8, out int toplam);',
      desc: 'Çağrıdaki out int toplam ifadesi değişkeni bildirir. out argümanına çağrıdan önce değer atanması gerekmez; metot normal döndüğünde parametreye değer atanmış olmalıdır.',
      callerValue: '[Henüz atanmamış]',
      callerStatus: 'uninitialized',
      calleeActive: false,
      calleeValue: '-',
      parameterFlow: 'out değişkenine metot içinde değer atanması bekleniyor.',
    },
    {
      title: '2. Metot Çağrısı & Referans Aktarımı',
      code: 'public int Toplam(int a, int b, out int toplam)',
      desc: 'Metot çağrılır. a ve b değerle aktarılır; out toplam parametresi çağıranın toplam değişkenine başvuru sağlar. Bu çizim kavramsaldır, fiziksel bellek adresi göstermez.',
      callerValue: '[Henüz atanmamış]',
      callerStatus: 'referenced',
      calleeActive: true,
      calleeValue: '[Henüz atanmamış]',
      parameterFlow: 'out toplam parametresi çağıranın değişkenine başvurur.',
    },
    {
      title: '3. Metot İçi Zorunlu Atama',
      code: 'toplam = a + b; // 4 + 8 = 12',
      desc: 'Metot out parametresine 12 değerini atar. Bu atama çağıranın toplam değişkenine erişilebilir; metodun normal dönüş yollarının tamamında out parametresine değer atanmalıdır.',
      callerValue: `${paramA + paramB}`,
      callerStatus: 'assigned',
      calleeActive: true,
      calleeValue: `${paramA + paramB}`,
      parameterFlow: `out toplam = ${paramA + paramB};`,
    },
    {
      title: '4. Metot dönüşü',
      code: 'return toplam;',
      desc: 'Metot dönüş değeri ve out parametresine atanmış değer çağırana ulaşır. Görsel fiziksel çağrı yığını veya bellek temizleme davranışı göstermez.',
      callerValue: `${paramA + paramB}`,
      callerStatus: 'assigned',
      calleeActive: false,
      calleeValue: 'Metot tamamlandı',
      parameterFlow: `Çağıranın toplam değişkeni = ${paramA + paramB}.`,
    },
  ];

  const currentStep = steps[animStep];

  const handleNextStep = () => {
    setAnimStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setAnimStep(0);
  };

  const handleTryParseCheck = () => {
    const normalizedInput = tryParseInput.trim();
    const num = Number(normalizedInput);
    if (/^[+-]?\d+$/.test(normalizedInput) && Number.isInteger(num) && num >= -2147483648 && num <= 2147483647) {
      setTryParseResult({ success: true, value: num });
    } else {
      setTryParseResult({ success: false, value: 0 });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-2">
          <span>Bölüm 2</span>
          <span aria-hidden="true">·</span>
          <span>Parametre Aktarım Modelleri</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Out ve Ref Parametre Kullanımı
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          C#'ta parametreler varsayılan olarak değerle aktarılır.
          <code className="text-sky-300 font-mono px-1">out</code> ve <code className="text-amber-300 font-mono px-1">ref</code>
          ise çağıranın değişkenine dil düzeyinde başvuru sağlar; ham bellek adresi veya işaretçi değildir.
        </p>
      </div>

      {/* Conceptual parameter-flow simulator */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Adım Adım Out Parametre Aktarımı (Kavramsal)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              instance.Toplam({paramA}, {paramB}, out int toplam) çağrısındaki değer akışı. Fiziksel bellek yerleşimini göstermez.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg bg-slate-950 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
            <button
              onClick={handleNextStep}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{animStep === steps.length - 1 ? 'Yeniden Başlat' : 'Sonraki Adım'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Parameter Adjuster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Parametre a (int):
            </label>
            <input
              type="number"
              value={paramA}
              onChange={(e) => {
                setParamA(Number(e.target.value) || 0);
                setAnimStep(0);
              }}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Parametre b (int):
            </label>
            <input
              type="number"
              value={paramB}
              onChange={(e) => {
                setParamB(Number(e.target.value) || 0);
                setAnimStep(0);
              }}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Step Progression Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {steps.map((st, i) => (
            <button
              key={i}
              onClick={() => setAnimStep(i)}
              className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                animStep === i
                  ? 'border-sky-500 bg-sky-950/40 text-sky-300 font-semibold'
                  : i < animStep
                  ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                  : 'border-slate-800/40 bg-slate-950/20 text-slate-500'
              }`}
            >
              <div className="text-[10px] text-slate-500 font-mono mb-0.5">Adım {i + 1}/4</div>
              <div className="truncate font-medium">{st.title.split('.')[1]}</div>
            </button>
          ))}
        </div>

        {/* Conceptual parameter-flow representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Method and caller scopes */}
          <div className="lg:col-span-7 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800 pb-2">
              <span>PARAMETRE AKIŞI (ŞEMATİK)</span>
              <span>C# çalışma zamanı simülasyonu değildir</span>
            </div>

            {/* Callee Frame (Toplam) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                currentStep.calleeActive
                  ? 'border-amber-500/80 bg-amber-950/20 shadow-md shadow-amber-500/10'
                  : 'border-slate-800/40 bg-slate-900/20 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-amber-400">
                  Metot: Toplam(int a, int b, out int toplam)
                </span>
                <span className="text-[10px] text-amber-300/80">
                  {currentStep.calleeActive ? '● Aktif Yürütülüyor' : 'Pasif / Boş'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Parametre a</span>
                  <span className="text-white font-semibold">{paramA}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Parametre b</span>
                  <span className="text-white font-semibold">{paramB}</span>
                </div>
                <div className="p-2 rounded bg-amber-950/40 border border-amber-500/40">
                  <span className="text-amber-400 block text-[10px]">out toplam</span>
                  <span className="text-amber-200 font-semibold truncate block">
                    {currentStep.calleeValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Caller Frame (Main) */}
            <div className="p-4 rounded-xl border border-sky-500/60 bg-sky-950/20">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-sky-400">Çağıran kapsam</span>
                <span className="text-[10px] text-sky-300">Çağıran Fonksiyon (Caller)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Çağıran değişken</span>
                  <span className="text-slate-300 font-semibold">toplam</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-sky-500/40">
                  <span className="text-sky-400 block text-[10px]">int toplamDeğeri</span>
                  <span
                    className={`font-bold ${
                      currentStep.callerStatus === 'uninitialized'
                        ? 'text-rose-400'
                        : currentStep.callerStatus === 'assigned'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {currentStep.callerValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Parameter flow explanation */}
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Değer akışı: {currentStep.parameterFlow}</span>
            </div>
          </div>

          {/* Right Column: Code Line & Step Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">
                {currentStep.title}
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 mb-3">
                {currentStep.code}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Kullanıcının Verdiği Out Örneği</span>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 leading-tight">
{`instance.Toplam(4,8, out int toplam);

public int Toplam(int a, int b, out int toplam)
{
    toplam = a + b;
    return toplam;
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Out vs Ref Comprehensive Comparison Matrix */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">
          Out ve Ref Parametreleri: Kritik Farklar Tablosu
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          "Out anahtar kelimesi ref ile aynı işi yapıyor diyebiliriz, arada sadece birkaç kritik fark var":
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-semibold font-mono">
                <th className="py-3 px-4">Özellik</th>
                <th className="py-3 px-4 text-sky-400">out Parametresi</th>
                <th className="py-3 px-4 text-amber-400">ref Parametresi</th>
                <th className="py-3 px-4">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {OUT_VS_REF_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-sky-200 leading-relaxed">{row.outParam}</td>
                  <td className="py-3 px-4 text-amber-200 leading-relaxed">{row.refParam}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {row.importance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-World Case: int.TryParse & Out Usage */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Gerçek Hayat Örneği: int.TryParse ile Out Parametre Kullanımı</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">bool int.TryParse(string s, out int result)</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          .NET kütüphanelerinde <code className="text-sky-300 font-mono">out</code> anahtar kelimesinin en yaygın kullanımı
          <code className="text-sky-300 font-mono">TryParse</code> metotlarıdır. Metot hem dönüşümün başarılı olup olmadığını
          (<code className="text-emerald-400 font-mono">bool</code>) döner, hem de dönüştürülen sayıyı
          <code className="text-sky-400 font-mono">out int</code> parametresi ile dışarı aktarır!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          <div className="space-y-3">
            <label className="block text-xs text-slate-400 font-mono">
              Test edilecek metin (string):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tryParseInput}
                onChange={(e) => setTryParseInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                placeholder="Örn: 2026 veya abc"
              />
              <button
                onClick={handleTryParseCheck}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                TryParse Çalıştır
              </button>
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => {
                  setTryParseInput('1923');
                  setTryParseResult({ success: true, value: 1923 });
                }}
                className="text-xs text-sky-400 hover:underline cursor-pointer"
              >
                Örnek: "1923" (Geçerli)
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => {
                  setTryParseInput('C# Dersleri');
                  setTryParseResult({ success: false, value: 0 });
                }}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                Örnek: "C# Dersleri" (Geçersiz)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
            <div className="text-slate-400">// Yürütülen C# Kodu:</div>
            <div className="text-sky-300">
              bool basarili = int.TryParse({JSON.stringify(tryParseInput)}, out int sayi);
            </div>
            {tryParseResult && (
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div>
                  Dönen Değer (bool):{' '}
                  <strong
                          className={tryParseResult.success ? 'text-emerald-400' : 'text-rose-400'}
                  >
                    {tryParseResult.success ? 'true' : 'false'}
                  </strong>
                </div>
                <div>
                  Out Parametresi (sayi):{' '}
                  <strong className="text-amber-300">{tryParseResult.value}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
