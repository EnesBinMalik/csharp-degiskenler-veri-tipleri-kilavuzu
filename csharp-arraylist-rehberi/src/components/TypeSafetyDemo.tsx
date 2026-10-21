import React, { useState } from 'react';
import { DataType } from '../types';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flame,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Cpu,
  HelpCircle,
  Code2,
  RefreshCw
} from 'lucide-react';

export const TypeSafetyDemo: React.FC = () => {
  // Pre-loaded values for the cast demonstration.
  const sampleItems = [
    { index: 0, rawValue: 'Kedi', display: '"Kedi"', actualType: 'string' as DataType, isValueType: false },
    { index: 1, rawValue: 99, display: '99', actualType: 'int' as DataType, isValueType: true },
    { index: 2, rawValue: true, display: 'true', actualType: 'bool' as DataType, isValueType: true },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [targetType, setTargetType] = useState<DataType>('int');
  const [executionResult, setExecutionResult] = useState<{
    tested: boolean;
    success: boolean;
    code: string;
    message: string;
    stackTrace?: string;
  } | null>(null);

  const selectedItem = sampleItems[selectedIndex];

  const handleTestCast = (index: number, castTo: DataType) => {
    const item = sampleItems[index];
    const isMatch = item.actualType === castTo;

    const codeSnippet = `${castTo} deger = (${castTo})dizi[${index}];`;

    if (isMatch) {
      setExecutionResult({
        tested: true,
        success: true,
        code: codeSnippet,
        message: `Başarılı! "${item.display}" değeri hatasız olarak '${castTo}' tipine dönüştürüldü.`,
      });
    } else {
      setExecutionResult({
        tested: true,
        success: false,
        code: codeSnippet,
        message: `System.InvalidCastException: Specified cast is not valid. (Belirtilen tür dönüştürme geçersiz).`,
        stackTrace: `Unhandled exception. System.InvalidCastException: Unable to cast object of type 'System.${capitalize(item.actualType)}' to type 'System.${capitalize(castTo)}'.
   at Program.Main()
   [Crash! Uygulama çalışma zamanında (Runtime) çöktü!]`,
      });
    }
  };

  function capitalize(s: string) {
    if (s === 'int') return 'Int32';
    if (s === 'bool') return 'Boolean';
    if (s === 'string') return 'String';
    if (s === 'double') return 'Double';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <div className="space-y-8">
      {/* Risk Callout based on Enes Öztürk's text */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Kritik Uyarı & Risk Analizi
              </span>
              <span className="text-xs text-slate-400">• Eğitim örneği</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1.5">
              "Değişken veri tipi kullanımı kulağa konforlu gelse de büyük bir risk barındırır!"
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              ArrayList'ten eleman okurken, dönen veri her zaman <code className="text-amber-300 font-mono bg-slate-950 px-1 py-0.5 rounded">object</code> tipindedir.
              Hangi indekste hangi türün olduğunu <strong className="text-white">derleyici (compiler) bilemez</strong>.
              Yanlış bir tür dönüşümü (unboxing / casting), değerlerin statik türüne göre derleme sırasında kabul edilebilir; çalışırken <strong className="text-rose-400 font-mono">System.InvalidCastException</strong> fırlatabilir. İşlenmeyen istisna programı sonlandırabilir.
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-amber-200/80">
        Bu arayüz bir eğitim simülasyonudur; C# kodunu çalıştırmaz. Gösterilen cast sonuçları örnek veriler üzerinden modellenir.
      </p>

      {/* Interactive Cast Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Tip Dönüşümü (Casting) Test Laboratuvarı
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Enes Öztürk'ün örneğindeki 3 eleman üzerinde cast işlemi deneyerek hatayı gözlemleyin.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            dizi: ["Kedi", 99, true]
          </span>
        </div>

        {/* Step 1: Select element */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
            1. Adım: Hangi indeksteki elemanı okumak istiyorsunuz?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleItems.map((item) => {
              const isSelected = selectedIndex === item.index;
              return (
                <button
                  key={item.index}
                  onClick={() => {
                    setSelectedIndex(item.index);
                    setExecutionResult(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/60 shadow-md shadow-indigo-500/20'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">dizi[{item.index}]</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {item.actualType}
                    </span>
                  </div>
                  <div className="mt-2 text-base font-bold text-white font-mono">
                    {item.display}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    {item.isValueType ? '📦 Değer Tipi (Boxed)' : '🔗 Referans Tipi'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Target Cast Type */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
            2. Adım: Hangi tipe cast (dönüşüm) yapacaksınız?
          </label>
          <div className="flex flex-wrap gap-2">
            {(['string', 'int', 'bool', 'double'] as DataType[]).map((type) => {
              const isSelected = targetType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setTargetType(type);
                    setExecutionResult(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ({type})
                </button>
              );
            })}
          </div>
        </div>

        {/* Generated Code Preview and Run Button */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="font-mono text-xs">
              <span className="text-slate-500">// Derleyicinin kabul ettiği C# satırı:</span>
              <div className="mt-1 text-indigo-300">
                <span className="text-purple-400">{targetType}</span> veri = (<span className="text-purple-400">{targetType}</span>)dizi[{selectedIndex}];
              </div>
            </div>

            <button
              onClick={() => handleTestCast(selectedIndex, targetType)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30 flex items-center gap-2 shrink-0"
            >
              <Cpu className="w-4 h-4" />
              Dönüşümü Çalıştır (Execute)
            </button>
          </div>
        </div>

        {/* Execution Output */}
        {executionResult && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {executionResult.success ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-300 text-sm">
                    {executionResult.message}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-mono bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 mt-2">
                    <span className="text-emerald-400">Çıktı:</span> {sampleItems[selectedIndex].display}
                    <span className="text-slate-500 ml-2">// Bellekten başarıyla açıldı</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1">
                    <div className="font-bold text-rose-300 text-sm flex items-center justify-between">
                      <span>Çalışma Zamanı Hatası</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                        InvalidCastException
                      </span>
                    </div>
                    <p className="text-xs text-rose-200/90 mt-1">
                      {executionResult.message}
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-rose-900/60 font-mono text-[11px] text-rose-400/90 overflow-x-auto whitespace-pre">
                      {executionResult.stackTrace}
                    </div>
                    <div className="mt-3 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <strong className="text-white">Hatanın nedeni:</strong> dizi[{selectedIndex}] indeksindeki değer örnekte{' '}
                      <span className="text-amber-400 font-mono font-bold">{selectedItem.actualType}</span> saklarken siz kodda onu{' '}
                      <span className="text-rose-400 font-mono font-bold">{targetType}</span> olarak unbox etmeye çalıştınız.
                      CLR tür uyumsuzluğunda InvalidCastException fırlatır. Uygulama bu istisnayı yakalayıp işleyebilir.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visual Memory: Boxing vs Unboxing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <h4 className="font-bold text-white text-sm">Boxing (Kutulama) Nedir?</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <code className="text-amber-300 font-mono">int</code> veya <code className="text-amber-300 font-mono">bool</code> gibi değer tipleri object olarak kullanıldığında boxing ile bir nesneye dönüştürülür. Değerlerin fiziksel bellek yerleşimi bağlama ve çalışma zamanına bağlıdır.
          </p>
          <div className="my-4 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-slate-500">// dizi.Add(99); çağrıldığında:</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40 text-[11px]">
                Değer: 99 (int)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40 text-[11px]">
                Boxed object: System.Int32 [99]
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Boxing ek nesne ve dönüşüm maliyeti getirebilir. Performans etkisi kullanım biçimine ve çalışma zamanı optimizasyonlarına bağlıdır.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-indigo-400" />
            <h4 className="font-bold text-white text-sm">Unboxing (Kutudan Çıkarma) Nedir?</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kutulanmış <code className="text-indigo-300 font-mono">object</code> içindeki değerin uyumlu özgün değer tipine geri alınmasıdır.
          </p>
          <div className="my-4 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-slate-500">// int n = (int)dizi[1]; çağrıldığında:</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40 text-[11px]">
                Boxed object
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40 text-[11px]">
                int n = 99
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Kutulanmış değerin gerçek türü hedef değer tipiyle uyuşmuyorsa unboxing başarısız olur ve çalışma zamanı hatası oluşur.
          </p>
        </div>
      </div>

      {/* Comparison: ArrayList vs Generic List<T> */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h4 className="font-bold text-white text-base mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Modern C# Çözümü: ArrayList Yerine Generic List&lt;T&gt;
        </h4>
        <p className="text-xs text-slate-400 mb-6">
          Generic koleksiyonlar derleme zamanında tür denetimi sağlar. <code>List&lt;int&gt;</code> gibi değer tipi listelerinde boxing genellikle önlenir; diğer bağlamlardaki boxing davranışı ayrıca değerlendirilmelidir.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="p-3">Özellik</th>
                <th className="p-3 text-rose-400">ArrayList (Eski Yaklaşım)</th>
                <th className="p-3 text-emerald-400">List&lt;T&gt; (Önerilen Modern)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="p-3 font-semibold text-slate-200">Namespace</td>
                <td className="p-3 text-slate-400">System.Collections</td>
                <td className="p-3 text-indigo-300">System.Collections.Generic</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-200">Tip Güvenliği (Type Safety)</td>
                <td className="p-3 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  Yok (object saklar, runtime crash riski)
                </td>
                <td className="p-3 text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Tam Güvenli (Derleme anında kontrol)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-200">Boxing / Unboxing</td>
                <td className="p-3 text-amber-400">Var (Performans kaybı, GC baskısı)</td>
                <td className="p-3 text-emerald-400">Değer türü T için yok (örn. List&lt;int&gt;)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-200">Tip Dönüşümü (Cast)</td>
                <td className="p-3 text-slate-400">Zorunlu: (string)dizi[0]</td>
                <td className="p-3 text-indigo-300">Gereksiz: liste[0] doğrudan string döner</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-200">Örnek Tanımlama</td>
                <td className="p-3 text-slate-400">ArrayList dizi = new ArrayList();</td>
                <td className="p-3 text-indigo-300">List&lt;string&gt; liste = new List&lt;string&gt;();</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
