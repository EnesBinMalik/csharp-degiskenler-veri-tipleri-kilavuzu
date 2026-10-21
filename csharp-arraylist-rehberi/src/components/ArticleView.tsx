import React from 'react';
import { AuthorSignature } from './AuthorSignature';
import {
  BookOpen,
  Layers,
  Zap,
  Code2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  Cpu,
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface ArticleViewProps {
  onNavigateToSimulator: () => void;
  onNavigateToTypeSafety: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  onNavigateToSimulator,
  onNavigateToTypeSafety,
}) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const codeSnippet = `// Enes Öztürk - ArrayList Temel Kullanım Örneği
using System;
using System.Collections;

class Program
{
    static void Main()
    {
        // Farklı veri tiplerini tutabilen dinamik boyutlu dizi
        ArrayList dizi = new ArrayList();

        dizi.Add("Kedi");  // string
        dizi.Add(99);      // int (boxing uygulanır)
        dizi.Add(true);    // bool (boxing uygulanır)

        // new ArrayList() başlangıçta Capacity = 0'dır.
        // İlk Add() sonrasında yaygın .NET uygulamasında Capacity = 4 olur.
        Console.WriteLine($"Eleman Sayısı: {dizi.Count}");
        Console.WriteLine($"Kapasite: {dizi.Capacity}");
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Header Banner */}
      <header className="space-y-4 pb-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
            C# & .NET Koleksiyonları
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-400">Veri Yapıları & Bellek Yönetimi</span>
          <span className="text-slate-400">•</span>
          <AuthorSignature variant="inline" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          ArrayList Nedir?
        </h1>

        <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
          Farklı türlerde nesneleri saklayabilen, gerektiğinde iç dizisinin kapasitesini artıran ArrayList'i; tür güvenliği riskleri ve modern alternatifleriyle inceliyoruz.
        </p>

        <div className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-indigo-500 border-r border-y border-slate-800 text-sm text-slate-300">
          `ArrayList` farklı türlerde nesneler tutabilir ve öğe ekleyip çıkarmaya göre büyüyebilir. Elemanları `object` olarak alındığından, okurken türü doğru denetlemek gerekir.
        </div>
      </header>

      {/* Section 1: Standart Diziler vs ArrayList */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Standart Diziler ile ArrayList Arasındaki Fark
          </h2>
        </div>

        <div className="prose prose-invert text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Standart dizilerde (<code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">string[]</code>, <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">int[]</code>) <strong className="text-white">aynı tipte verileri</strong> bir arada tutarız ve uzunlukları oluşturulurken belirlenir. Uzunluğu değiştirmek için yeni bir dizi oluşturup öğeleri kopyalamak gerekir.
          </p>
          <p className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <strong className="text-indigo-300">ArrayList tam olarak bu noktada farklılaşır:</strong>
            <br />
            <span className="block mt-2">
              • Farklı veri tiplerini (<code className="text-emerald-400 font-mono">string</code>, <code className="text-blue-400 font-mono">int</code>, <code className="text-purple-400 font-mono">bool</code>, <code className="text-amber-400 font-mono">object</code>) tek bir ArrayList içerisinde saklayabilirsiniz.
            </span>
            <span className="block mt-1">
              • Eleman ekleyerek (<code className="text-slate-200 font-mono">.Add()</code>) ve çıkararak (<code className="text-slate-200 font-mono">.Remove()</code>) boyutunu <strong className="text-white">dinamik olarak</strong> değiştirebilirsiniz.
            </span>
          </p>
        </div>

        {/* Visual Comparison Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>STANDART DİZİ (Array)</span>
              <span className="text-rose-400">Sabit Boyut</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>❌ Boyut başlangıçta sabittir (örn: <code className="text-indigo-300">new int[5]</code>).</li>
              <li>❌ Yalnızca tek bir veri tipi kabul eder.</li>
              <li>✅ Tip güvenlidir (Type Safe) ve hızlıdır.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-300 mb-2">
              <span>ARRAYLIST</span>
              <span className="text-emerald-400">Dinamik Boyut</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>✅ İstenildiği kadar eleman eklenebilir / çıkarılabilir.</li>
              <li>✅ Farklı tipler bir arada bulunabilir.</li>
              <li>⚠️ Tip güvenliği yoktur (object depolar) ve boxing maliyeti vardır.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Dinamik Kapasite ve İkiye Katlama */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Kapasite ve Büyüme Örneği (0 ➔ 4 ➔ 8)
          </h2>
        </div>

        <div className="text-slate-300 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>
            Parametresiz oluşturulan boş bir <code>ArrayList</code>'in kapasitesi <strong className="text-indigo-300 font-mono text-lg font-bold">0</strong>'dır. Yaygın .NET uygulamasında ilk öğe eklendiğinde kapasite <strong className="text-indigo-300 font-mono">4</strong>'e çıkar.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <Zap className="w-4 h-4" />
              <span>Kapasite Aşımı Anı:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Bu örnek büyüme düzeninde 4 slot dolduğunda kapasite <strong className="text-white">8</strong>'e çıkar; 5. öğe bu yeni alana eklenir. Kapasiteyi artırma stratejisi .NET'in uygulama ayrıntısıdır, sabit API garantisi değildir.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Büyüme gerektiğinde yeni bir iç dizi ayrılır ve mevcut öğeler kopyalanır. Simülatör, yaygın olarak görülen 4'ten 8'e büyümeyi örnekler; farklı .NET sürümleri veya başlangıç kapasitesi farklı sonuç verebilir.
          </p>
        </div>

        {/* Action Button to Launch Visualizer */}
        <div className="pt-2">
          <button
            onClick={onNavigateToSimulator}
            className="group px-4 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-semibold transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
            <span>Kapasite artışını simülatörde gör</span>
            <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Section 3: Kod Örneği */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Örnek Kod İncelemesi
          </h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base">
          Enes Öztürk'ün yazısında paylaştığı orijinal kod örneğini inceleyelim:
        </p>

        {/* Code Box */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
              <span className="ml-2 text-slate-300 font-medium">ArrayListOrnek.cs</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
            <span className="text-slate-500">// ArrayList tanımlama</span><br />
            <span className="text-indigo-400">ArrayList</span> dizi = <span className="text-purple-400">new</span> <span className="text-indigo-400">ArrayList</span>();<br /><br />
            <span className="text-slate-500">// Farklı veri tiplerindeki elemanları ekleme</span><br />
            dizi.<span className="text-emerald-400">Add</span>(<span className="text-amber-300">"Kedi"</span>);   <span className="text-slate-500">// string veri tipi</span><br />
            dizi.<span className="text-emerald-400">Add</span>(<span className="text-blue-300">99</span>);       <span className="text-slate-500">// integer veri tipi (Boxed)</span><br />
            dizi.<span className="text-emerald-400">Add</span>(<span className="text-purple-400">true</span>);     <span className="text-slate-500">// bool veri tipi (Boxed)</span>
          </div>

          <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Yukarıdaki örnekte string, integer ve bool veri tipindeki verileri aynı koleksiyona koyduk.</span>
          </div>
        </div>
      </section>

      {/* Section 4: Değişken Veri Tipi Riskleri ve Tip Güvenliği */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Değişken Veri Tipi Kullanımının Riskleri
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Enes Öztürk'ün Vurguladığı Önemli Tehdit:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed italic">
            "Değişken veri tipi kullanımı kulağa ilk etapta çok konforlu gelse de risk barındırır. Listeden okuduğunuz verinin tipinin ne olduğunu bilmemek güvenli bir yaklaşım değildir. Tip dönüşümleri sırasında hata ihtimalini arttırır."
          </p>
        </div>

        <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            Neden risklidir?
          </p>
          <ul className="space-y-2 list-disc list-inside text-sm text-slate-300 pl-2">
            <li>
              <strong className="text-white">Tip Bilgisinin Kaybı:</strong> ArrayList elemanları <code className="text-indigo-300 font-mono">object</code> olarak tutar. Diziye eklenen nesnenin gerçekte ne olduğu derleme aşamasında doğrulanmaz.
            </li>
            <li>
              <strong className="text-white">Çalışma Zamanı (Runtime) Hatası:</strong> Örneğin ilk eleman bir metinken onu <code className="text-rose-400 font-mono">(int)dizi[0]</code> olarak dönüştürmeye çalışırsanız derleyici bu object dönüşümünü kabul edebilir; çalışırken <strong className="text-rose-400 font-mono">InvalidCastException</strong> fırlatılır. Hata işlenmezse uygulama sonlanabilir.
            </li>
            <li>
              <strong className="text-white">Boxing & Unboxing:</strong> <code className="text-indigo-300 font-mono">99</code> veya <code className="text-indigo-300 font-mono">true</code> gibi değer tipleri <code>object</code> olarak saklanırken boxing uygulanır. Bu işlem ek nesne maliyeti getirebilir; bellek yerleşimi ve performans etkisi çalışma zamanına ve bağlama bağlıdır.
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            onClick={onNavigateToTypeSafety}
            className="group px-4 py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold transition flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
            <span>Tip dönüşümü hatasını (InvalidCastException) canlı simülatörde test et</span>
            <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Author Signature Section */}
      <footer className="pt-8 border-t border-slate-800">
        <AuthorSignature variant="card" />
      </footer>
    </article>
  );
};
