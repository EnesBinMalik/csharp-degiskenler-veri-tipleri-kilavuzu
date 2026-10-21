import React from 'react';
import {
  Cpu,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Code,
  Zap,
  PackageOpen,
  FlaskConical,
  HelpCircle,
  Binary,
} from 'lucide-react';
import { DataType } from '../types/conversion';

interface ConceptsGuideProps {
  onLoadPreset: (source: DataType, target: DataType, val: string, method: any) => void;
  onGoToTab: (tab: any) => void;
}

export const ConceptsGuide: React.FC<ConceptsGuideProps> = ({ onLoadPreset }) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Hero Introduction Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Bellek Mimarisi & Veri Tipleri
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tip Dönüşümleri (Type Conversions) Nedir?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              C# tür dönüşümleri, bir değerin başka bir türün beklediği yerde kullanılmasını sağlar. Dönüşümün izinli olup olmadığı ve olası hassasiyet ya da aralık etkileri tür kurallarına bağlıdır.
            </p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-center min-w-[240px]">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
              Hazırlayan & Düzenleyen
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-1.5">
              Enes Öztürk
            </div>
            <p className="text-xs text-indigo-300 mt-1">
              C# Tip Güvenliği ve Bellek Yönetimi Notları
            </p>
          </div>
        </div>

        {/* Why Type Conversion banner */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg flex items-start gap-3">
            <span className="text-indigo-400 font-bold text-base mt-0.5">🧠</span>
            <div>
              <strong className="text-white block font-semibold mb-0.5">Neden Dönüşüm Yaparız?</strong>
              Çoğu zaman uygulama yazarken farklı veri tipleri ile çalışmak durumunda kalırız (Örn: Kullanıcıdan alınan metinsel bir sayıyı matematiksel işleme sokmak).
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg flex items-start gap-3">
            <span className="text-emerald-400 font-bold text-base mt-0.5">⚡</span>
            <div>
              <strong className="text-white block font-semibold mb-0.5">İki Temel Yöntem</strong>
              Temel dönüşüm biçimleri <strong>Implicit (örtük)</strong> ve <strong>Explicit (açık)</strong> dönüşümlerdir.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: IMPLICIT CONVERSION */}
      <section className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Implicit Conversion <span className="text-sm font-medium text-slate-400">(Örtük Dönüşüm)</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium">
                Otomatik • Kendiliğinden • Hassasiyet kaybı olabilir
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Dilin İzin Verdiği Dönüşüm
          </span>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            C# dil kurallarının izin verdiği bir türden diğerine açık cast yazmadan atama yapılabilmesidir. Örtük dönüşüm her zaman daha geniş bir bellek alanına geçiş anlamına gelmez; örneğin <code>int</code> değerinin <code>float</code> türüne dönüşmesi aralığı korusa da büyük tam sayılarda hassasiyet kaybettirebilir.
          </p>
        </div>

        {/* Visual Metaphor: Cups */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" /> Örtük Dönüşüm Örneği
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm">
              <span className="font-semibold text-emerald-300 block mb-1">short → int (Implicit)</span>
              <p className="text-slate-300">
                <code>short</code> değerinden <code>int</code> türüne C# dil kurallarıyla örtük dönüşüm yapılabilir.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-300 block mb-1">Önemli Ayrım</span>
              <p className="text-slate-400">
                Bazı işaretli tamsayı dönüşümlerinde işaret biti genişletilir. Bu, bütün örtük dönüşümlerin kayıpsız olduğu anlamına gelmez.
              </p>
            </div>
          </div>
        </div>

        {/* Prompts' Examples Highlighted */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-400" /> Örnek Senaryolar ve Kod Analizi:
          </h4>

          {/* Example 1: float a; int b = 25; a = b; */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>Örnek 1: int → float Dönüşümü</span>
              <button
                onClick={() => onLoadPreset('int', 'float', '25', 'implicit')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5" /> Laboratuvarda Çalıştır
              </button>
            </div>
            <div className="p-4 font-mono text-xs sm:text-sm space-y-1">
              <div className="text-emerald-400 font-semibold">
                float a; int b = 25; a = b;
              </div>
              <div className="text-slate-400 text-xs pt-2 font-sans">
                💡 <strong>Açıklama:</strong> C# bu örtük dönüşüme izin verir; ancak <code>float</code> yaklaşık 7 basamak hassasiyet taşır. Büyük <code>int</code> değerleri birebir temsil edilemeyebilir.
              </div>
            </div>
          </div>

          {/* Example 2: short x = 10; int y; y = x; */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>Örnek 2: short → int Dönüşümü</span>
              <button
                onClick={() => onLoadPreset('short', 'int', '10', 'implicit')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5" /> Laboratuvarda Çalıştır
              </button>
            </div>
            <div className="p-4 font-mono text-xs sm:text-sm space-y-1">
              <div className="text-emerald-400 font-semibold">
                short x = 10; int y; y = x;
              </div>
              <div className="text-slate-400 text-xs pt-2 font-sans">
                💡 <strong>Açıklama:</strong> C# <code>short</code> türünden <code>int</code> türüne örtük dönüşüme izin verir; gerekçe yalnızca türlerin bellek boyutları değildir.
              </div>
            </div>
          </div>
        </div>

        {/* The Implicit Hierarchy Ladder */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
            C# Otomatik (Implicit) Dönüşüm Yolu
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold">
            {['byte', 'short', 'int', 'long', 'float', 'double'].map((t, i, arr) => (
              <React.Fragment key={t}>
                <span className="px-2.5 py-1 rounded-md bg-indigo-900/40 border border-indigo-700/50 text-indigo-200">
                  {t}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Bu yalnızca bazı örnek yolları gösterir; eksiksiz dönüşüm tablosu değildir. Örtük dönüşüm aralığı korusa bile hassasiyet kaybı olabilir.
          </p>
        </div>
      </section>

      {/* SECTION 2: EXPLICIT CONVERSION */}
      <section className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Explicit Conversion <span className="text-sm font-medium text-slate-400">(Bilinçli ya da Açık Dönüşüm)</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-400 font-medium">
                Geliştirici Müdahalesi Şart • Veri Kaybı / Taşma Riski Mevcut
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Dikkat Gerektirir
          </span>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            Explicit dönüşüm için geliştirici açık bir dönüşüm işlemi yazar. Bu gereklilik yalnızca hedef alanın daha küçük olmasından kaynaklanmaz; C# tür kuralları, hassasiyet ve olası aralık etkileri de dönüşüm kararını etkiler.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            Dönüşüm için C# ortamında farklı yöntemler mevcuttur:
          </p>
        </div>

        {/* 4 Major Methods of Explicit Conversion */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Method A: Cast Operator */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Yöntem 1</span>
              <button
                onClick={() => onLoadPreset('int', 'byte', '300', 'explicit_cast')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                Dene <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Cast Operatörü (Tür Parantezi)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Değişkenin veya değerin önüne parantez içerisinde hedef tip yazılarak yapılır: <code>(hedefTip)değer</code>.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 space-y-1">
              <div>int sayi = 300;</div>
              <div>byte b = (byte)sayi; // Bit taşması! b = 44 olur</div>
              <div>double pi = 3.99;</div>
              <div>int tam = (int)pi; // Kesilme! tam = 3 olur</div>
            </div>
            <div className="text-[11px] text-amber-300/90 bg-amber-950/20 border border-amber-900/40 p-2.5 rounded">
              ⚠️ <strong>Uyarı:</strong> Kayan noktalı değerden tam sayıya cast, kesir kısmını sıfıra doğru keser. Integral türler arasındaki daraltma davranışı hedef türe ve checked bağlamına bağlıdır.
            </div>
          </div>

          {/* Method B: checked / unchecked */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Güvenlik</span>
              <button
                onClick={() => onLoadPreset('int', 'byte', '300', 'explicit_cast')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                Dene <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" /> checked & unchecked Blokları
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Taşma denetiminin davranışı bağlama ve derleme ayarlarına bağlıdır. Uygun integral işlemler ve dönüşümler için <code>checked</code> bağlamı taşmayı görünür kılabilir.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 space-y-1">
              <div className="text-rose-400">checked</div>
              <div>&#123;</div>
              <div className="pl-4">int x = 300;</div>
              <div className="pl-4">byte y = (byte)x; // OverflowException!</div>
              <div>&#125;</div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800">
              💡 Güvenilir uygulamalarda aralık denetimini ve hata davranışını kullanım gereksinimlerine göre ayrıca tasarlayın.
            </div>
          </div>

          {/* Method C: Convert Sınıfı */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Yöntem 2</span>
              <button
                onClick={() => onLoadPreset('string', 'int', 'null', 'convert_class')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                Dene <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <PackageOpen className="w-4 h-4 text-blue-400" /> Convert Sınıfı
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              .NET&apos;in <code>System.Convert</code> sınıfı geniş dönüşüm desteği sağlar. Taşma olursa istisna fırlatır, ayrıca <code>null</code> değer aldığında 0 döndürür.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 space-y-1">
              <div>string metin = &quot;123&quot;;</div>
              <div>int sayi = Convert.ToInt32(metin);</div>
              <div>string bos = null;</div>
              <div className="text-emerald-400">Convert.ToInt32(bos); // 0 döner (Hata vermez!)</div>
            </div>
            <div className="text-[11px] text-blue-300/90 bg-blue-950/20 border border-blue-900/40 p-2.5 rounded">
              🎯 Ondalık sayıları tam sayıya çevirirken Banker&apos;s Rounding (en yakın çift sayıya yuvarlama) kuralını uygular.
            </div>
          </div>

          {/* Method D: Parse & TryParse */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Yöntem 3</span>
              <button
                onClick={() => onLoadPreset('string', 'int', 'yuz-yirmi-uc', 'try_parse')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                Dene <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" /> Parse & TryParse Metotları
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Yalnızca <strong>string</strong> tipindeki verileri ilgili tipe ayrıştırmak için kullanılır.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 space-y-1">
              <div>int a = int.Parse(&quot;45&quot;); // &quot;abc&quot; verilirse FormatException!</div>
              <div className="text-emerald-400">// GÜVENLİ YOL (Tavsiye edilen):</div>
              <div>bool ok = int.TryParse(&quot;abc&quot;, out int sonuc);</div>
              <div className="text-slate-400">// ok = false, sonuc = 0 (Çökme yok!)</div>
            </div>
            <div className="text-[11px] text-emerald-300/90 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded">
              TryParse geçersiz girdiyi istisna yerine dönüş değeriyle bildirir; performans sonuçları kullanım örüntüsüne ve çalışma zamanına göre değişir.
            </div>
          </div>
        </div>

        {/* Bonus Section: Boxing and Unboxing */}
        <div className="bg-slate-950 p-6 rounded-xl border border-indigo-950/60 relative overflow-hidden">
          <div className="flex items-center gap-2 text-indigo-400 text-xs uppercase font-bold tracking-wider mb-2">
            <Binary className="w-4 h-4" /> İleri Seviye Bellek Kavramı
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Boxing (Kutulama) & Unboxing (Kutudan Çıkarma)
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            C# dilinde tüm tipler <code>System.Object</code> sınıfından türer.
            Bir değer türü değerini <code>object</code> veya uygun bir arayüz referansı olarak kullanmaya <strong>Boxing</strong>; kutulanmış değeri özgün değer türüne geri dönüştürmeye <strong>Unboxing</strong> denir. Boxing, kutulanmış bir nesne oluşturur; değerlerin stack/heap yerleşimi değişkenin bağlamına ve çalışma zamanına bağlıdır.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-slate-200 grid sm:grid-cols-2 gap-4">
            <div>
              <span className="text-indigo-400 block font-bold mb-1">// 1. Boxing</span>
              <div>int sayi = 42;</div>
              <div className="text-slate-400">object obj = sayi; // Otomatik kutulama</div>
            </div>
            <div>
              <span className="text-indigo-400 block font-bold mb-1">// 2. Unboxing</span>
              <div>int geri = (int)obj; // Açık cast zorunlu!</div>
              <div className="text-slate-400">// short x = (short)obj; // InvalidCastException!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Quote / Signoff */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 text-center space-y-2">
        <p className="text-slate-300 text-sm italic">
          &ldquo;Tür dönüşümlerinin kurallarını ve sınırlarını anlamak, taşma ve hassasiyet sorunlarını fark etmeye yardımcı olur.&rdquo;
        </p>
        <div className="text-xs font-semibold text-indigo-400 tracking-wide uppercase pt-1">
          — Enes Öztürk
        </div>
      </div>
    </div>
  );
};
