import React, { useState } from 'react';
import { BookOpen, Copy, Check, AlertCircle, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const LessonNotes: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const snippet1 = `for(ifade1; kosul; ifade2)
{
    komut1;
    komut2;
}`;

  const snippet2 = `for (int i = 0; i <= 12; i++)
{
    Console.WriteLine(i);
}`;

  const snippet3 = `for (;;) // Sonsuz döngü
{
    // Döngü koşulsuz olarak sürekli çalışır
}`;

  const snippet4 = `for (;;) // Sonsuz döngü
{
    string? input = Console.ReadLine();
    if (input == "7")
        break;
    Console.WriteLine(input);
}
// Kod buradan devam eder.`;

  const snippet5 = `for (int i = 0; i < 3; i++) // Dış döngü
{
    for (int j = 0; j < 5; j++) // İç döngü
    {
        if (j == 2)
            break; // SADECE içteki 'j' döngüsünü kırar!
        Console.WriteLine($"i: {i}, j: {j}");
    }
    // Dıştaki 'i' döngüsü çalışmaya devam eder
}`;

  const snippet6 = `for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0)
        continue;
    Console.WriteLine(i);
}`;

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
          <span>Kapsamlı Ders Rehberi</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>C# Dilinde Döngüler ve Akış Kontrolü</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-emerald-400 font-semibold">Enes Öztürk</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          For Döngüsü, Break & Continue Anahtar Kelimeleri
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
          Programlamada belirli komutların bir şart doğrultusunda tekrarlanmasını sağlayan
          en temel ve güçlü kontrol yapısı For döngüsüdür. Bu rehberde           for döngüsünün 2 ifade ve 1 koşul
          bileşenlerini ve akışı yönlendiren break ve continue mekanizmalarını inceliyoruz.
        </p>
      </div>

      {/* Chapter 1: For Loop Anatomy */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
            BÖLÜM 1
          </span>
          <h3 className="text-xl font-bold text-white">For Döngüsünün Temel Anatomisi</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Örnek bir for döngüsü <strong>2 ifade</strong> ve <strong>1 koşul</strong>dan oluşur:
        </p>

        {/* Code block */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Sözdizimi (Syntax) Yapısı</span>
            <button
              onClick={() => copyCode('snip1', snippet1)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedId === 'snip1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'snip1' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto leading-relaxed">
            {snippet1}
          </pre>
        </div>

        {/* Explanations of 3 parts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400">ifade1 (Başlatma)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Döngünün sayacının tanımlandığı ve atamasının yapıldığı ifadedir. Döngü başında yalnızca bir kez çalışır.
            </p>
            <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Örnek: int i = 0;
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400">koşul (Devam Şartı)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Döngünün devam etme koşuludur. Bu koşul sağlandığı (true olduğu) sürece döngü gövdesi tekrar eder.
            </p>
            <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Örnek: i &lt;= 12;
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">ifade2 (Sayaç Değişimi)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Döngü sayacının artırım ya da azaltım şeklini belirten ifadedir. Her iterasyonun sonunda çalıştırılır.
            </p>
            <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Örnek: i++, i--, i += 2
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Critical Rule & Infinite Loop */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
            ÖNEMLİ KURAL
          </span>
          <h3 className="text-xl font-bold text-white">Noktalı Virgül & Sonsuz Döngü Kuralları</h3>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-sm leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Noktalı Virgül ( ; ) Kuralı:</span>
          </div>
          <p>
            For döngüsünü oluşturan bu 2 ifade ve 1 koşulun <strong>bir kısmı ya da tamamı boş bırakılabilir</strong>,
            ancak aralardaki <code className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-amber-300">;</code> işareti
            <strong> mutlaka kullanılmalıdır</strong>!
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Sonsuz Döngü Yazımı</span>
            <button
              onClick={() => copyCode('snip3', snippet3)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedId === 'snip3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'snip3' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto leading-relaxed">
            {snippet3}
          </pre>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          <code className="text-indigo-300 font-mono">for(;;)</code> ifadesi koşul belirtilmediği için daima doğru (true) kabul edilir ve döngü sonsuza kadar devam eder. Bu tür döngülerden çıkış genellikle döngü içerisindeki bir <code className="text-rose-400 font-mono">break</code> ifadesi ile sağlanır.
        </p>
      </section>

      {/* Chapter 3: Break Keyword */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 border border-rose-800/80 px-2 py-0.5 rounded">
            BÖLÜM 2
          </span>
          <h3 className="text-xl font-bold text-white">Break Anahtar Kelimesi</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Break</strong> ifadesi döngü içerisinden çıkmak istenildiğinde kullanılır. Şart sağlandığında döngü o anda kırılır ve sonraki kod satırına geçilir.
        </p>

        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Break Örneği (Console Girişi 7 Olunca Çıkış)</span>
            <button
              onClick={() => copyCode('snip4', snippet4)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedId === 'snip4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'snip4' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-rose-200 overflow-x-auto leading-relaxed">
            {snippet4}
          </pre>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Yukarıdaki örnekte console'dan girilen değer <strong>7'ye eşit ise döngü derhal sonlandırılır</strong> ve kontrol döngüden sonraki satıra devredilir.
        </p>

        {/* Nested loops warning */}
        <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 text-sm font-semibold">
            <Layers className="w-4 h-4 text-rose-400" />
            <span>Kritik Not: İç İçe Döngülerde Break Davranışı</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            İç içe döngüler kullanıldığında break ifadesi <strong>yalnızca içinde bulunduğu ilk döngüyü sonlandırır</strong>. Dış döngü kendi iterasyonlarına kesintisiz devam eder.
          </p>

          <div className="rounded-lg bg-slate-950 p-3 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            {snippet5}
          </div>
        </div>
      </section>

      {/* Chapter 4: Continue Keyword */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
            BÖLÜM 3
          </span>
          <h3 className="text-xl font-bold text-white">Continue Anahtar Kelimesi</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Kullanım amacı break ifadesine benzer ama <strong>continue sadece mevcut iterasyonu sonlandırır</strong>. Döngü tamamen bitmez, doğrudan bir sonraki iterasyondan (sayaç artırımından) devam eder.
        </p>

        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Continue Örneği (Tek Sayıları Yazdırma)</span>
            <button
              onClick={() => copyCode('snip6', snippet6)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedId === 'snip6' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'snip6' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-sm text-amber-200 overflow-x-auto leading-relaxed">
            {snippet6}
          </pre>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong>Çalışma Prensibi:</strong> Yukarıdaki örnekte <code className="text-amber-300 font-mono">i</code> çift sayıya eşit olduğunda (<code className="text-amber-300 font-mono">i % 2 == 0</code>), döngünün o anki iterasyonu sonlanacaktır. Sonrasında gelen <code className="text-indigo-300 font-mono">Console.WriteLine(i)</code> satırı atlanır ve doğrudan <code className="text-emerald-300 font-mono">i++</code> yapılarak sonraki sayıya geçilir.
          <br /><br />
          Bu durumda konsola <strong>1 ile 10 arasındaki tek sayılar (1, 3, 5, 7, 9)</strong> yazdırılacaktır.
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">Break ve Continue Karşılaştırması</h3>
        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Kriter</th>
                <th className="py-3 px-4 text-rose-400">Break</th>
                <th className="py-3 px-4 text-amber-400">Continue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Döngü Durumu</td>
                <td className="py-3 px-4 text-rose-300">Döngüyü tamamen sonlandırır</td>
                <td className="py-3 px-4 text-amber-300">Sadece o anki adımı atlar, döngü sürer</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Sonraki Adım</td>
                <td className="py-3 px-4">Döngünün dışındaki ilk komuta geçer</td>
                <td className="py-3 px-4">ifade2 (sayaç güncelleme) çalıştırılır</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">İç İçe Döngülerde</td>
                <td className="py-3 px-4">Yalnızca içinde bulunduğu ilk döngüyü kırar</td>
                <td className="py-3 px-4">Yalnızca içinde bulunduğu ilk döngünün iterasyonunu atlar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Tipik Kullanım</td>
                <td className="py-3 px-4">Aranan eleman bulunduğunda aramayı bitirme</td>
                <td className="py-3 px-4">Filtreleme, geçersiz değerleri es geçme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Signature & Author Section */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-500/20 text-slate-300 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              Eğitmen Notu & Tavsiyeler
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-400">
            Hazırlayan: Enes Öztürk
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          "For döngüsü kullanırken sayacın başlangıç (ifade1), bitiş (koşul) ve artış (ifade2) mantığını kafanızda bir çizelge gibi canlandırın. Sonsuz döngü riskine karşı her zaman koşulun bir gün 'false' olacağından ya da uygun bir 'break' noktası barındırdığından emin olun. Temiz kod yazarken gereksiz break ve continue kullanımından kaçınmak, kodun takip edilebilirliğini katbekat artıracaktır."
        </p>
        <div className="pt-2 text-right">
          <span className="text-xs italic text-slate-400 font-mono">
            — Enes Öztürk
          </span>
        </div>
      </section>
    </div>
  );
};
