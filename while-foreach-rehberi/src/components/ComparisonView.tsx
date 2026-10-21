import React, { useState } from 'react';
import {
  GitCompare,
  HelpCircle,
  Repeat,
  ListOrdered,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { COMPARISON_TABLE, LESSON_CONTENT } from '../data/lessonsData';

export const ComparisonView: React.FC<{ onSelectLoop: (tab: 'while' | 'foreach') => void }> = ({ onSelectLoop }) => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const scenarios = [
    {
      title: 'Kullanıcı doğru şifreyi girene kadar sorma',
      recommendation: 'While Döngüsü',
      code: `string sifre = "";
while (sifre != "1234")
{
    Console.Write("Şifreyi giriniz: ");
    sifre = Console.ReadLine();
}`,
      explanation: 'Kullanıcının şifreyi kaçıncı denemede doğru bileceği önceden belli değildir. İterasyon sayısı belirsiz ve koşula bağlı olduğu için While en uygun döngüdür.'
    },
    {
      title: 'Sepetteki ürünlerin fiyatlarını toplama',
      recommendation: 'ForEach Döngüsü',
      code: `decimal[] fiyatlar = { 49.99m, 120.50m, 15.00m };
decimal toplam = 0;

foreach (decimal fiyat in fiyatlar)
{
    toplam += fiyat;
}`,
      explanation: 'Dizideki her bir ürünün fiyatını sırayla okuyup toplamak için indekse gerek yoktur. ForEach dizinin tüm elemanlarını güvenle gezer.'
    },
    {
      title: '1\'den 100\'e kadar çift sayıları yazdırma',
      recommendation: 'For veya While Döngüsü',
      code: `// For ile:
for (int i = 2; i <= 100; i += 2)
{
    Console.WriteLine(i);
}`,
      explanation: 'Başlangıç (2), bitiş (100) ve adım sayısı (+2) tam olarak bellidir. Sayısal aralıklar için for veya while tercih edilir.'
    },
    {
      title: 'Oyun ana döngüsü (Oyun bitene kadar güncelleme)',
      recommendation: 'While Döngüsü',
      code: `bool oyunBitti = false;
while (!oyunBitti)
{
    GirdileriOku();
    FizikleriGuncelle();
    EkranaCiz();
}`,
      explanation: 'Oyunun ne zaman biteceği oyuncunun hamlelerine bağlıdır. Bir durum bayrağı (flag) false olana kadar while döngüsü çalışır.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner with Enes Öztürk quote */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30">
              MİMARİ VE MANTIK
            </span>
            <span className="text-xs text-slate-400">Enes Öztürk Ders Notları</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            While vs ForEach: Temel Farklar ve Karşılaştırma
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            C# programlamada döngü seçimi temiz kod ve algoritma verimliliği için kritiktir.
            <strong className="text-amber-400"> While</strong> döngüsü mantıksal bir koşul sağlandığı müddetçe çalışırken,
            <strong className="text-emerald-400"> ForEach</strong> döngüsü bir koleksiyonun ya da dizinin elemanları üzerinde tek tek dolaşır.
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onSelectLoop('while')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <Repeat className="w-4 h-4 text-amber-400" />
            While Simülatörünü Aç
          </button>
          <button
            onClick={() => onSelectLoop('foreach')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <ListOrdered className="w-4 h-4 text-emerald-400" />
            ForEach Simülatörünü Aç
          </button>
        </div>
      </div>

      {/* Side-by-Side Concept Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* While Card */}
        <div className="bg-slate-900 rounded-2xl border border-amber-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                WHILE DÖNGÜSÜ
              </span>
              <Repeat className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Koşul Odaklı Çalışma</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {LESSON_CONTENT.whileSection.definition}
            </p>

            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-amber-200/90 mb-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans">
                Kritik Kod Şablonu:
              </div>
              <div>int sayac = 1;</div>
              <div className="text-purple-400">while <span className="text-slate-200">(sayac &lt;= 5)</span></div>
              <div>{'{'}</div>
              <div className="pl-4 text-cyan-300">Console.WriteLine(sayac);</div>
              <div className="pl-4 text-rose-400">sayac++; <span className="text-slate-500">// Unutulursa sonsuz döngü!</span></div>
              <div>{'}'}</div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>İterasyon sayısı önceden bilinmediğinde kullanılır.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Sayaç manuel artırılmazsa <strong>sonsuz döngüye</strong> girer.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Koşul başta <code>false</code> ise gövde hiç çalışmaz.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => onSelectLoop('while')}
              className="text-xs text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              Canlı Simüle Et <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ForEach Card */}
        <div className="bg-slate-900 rounded-2xl border border-emerald-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                FOREACH DÖNGÜSÜ
              </span>
              <ListOrdered className="w-5 h-5 text-emerald-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Koleksiyon Odaklı Gezinme</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {LESSON_CONTENT.forEachSection.definition}
            </p>

            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-emerald-200/90 mb-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans">
                Kritik Kod Şablonu:
              </div>
              <div>int[] sayiDizisi = {'{'} 2, 4, 5, 1, 2, 4 {'}'};</div>
              <div>int toplam = 0;</div>
              <div className="text-purple-400">foreach <span className="text-slate-200">(int i in sayiDizisi)</span></div>
              <div>{'{'}</div>
              <div className="pl-4 text-emerald-300">toplam += i;</div>
              <div>{'}'}</div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Dizi veya koleksiyonun eleman sayısı kadar döner.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>İndeks takibine gerek kalmaz, hata yapma riskini azaltır.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>İterasyon değişkenine yeniden atama yapılamaz; bu, başvurulan nesnenin üyelerinin değiştirilemeyeceği anlamına gelmez.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => onSelectLoop('foreach')}
              className="text-xs text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              Canlı Simüle Et <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <GitCompare className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Detaylı Karşılaştırma Matrisi</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs">
                <th className="py-3 px-4 font-semibold">Özellik</th>
                <th className="py-3 px-4 font-semibold text-amber-400">While Döngüsü</th>
                <th className="py-3 px-4 font-semibold text-emerald-400">ForEach Döngüsü</th>
                <th className="py-3 px-4 font-semibold text-sky-400">Klasik For Döngüsü</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {COMPARISON_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{row.feature}</td>
                  <td className="py-3.5 px-4 text-slate-300">{row.while}</td>
                  <td className="py-3.5 px-4 text-slate-300">{row.forEach}</td>
                  <td className="py-3.5 px-4 text-slate-400">{row.for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Scenario Chooser */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">
              Hangi Döngüyü Seçmeliyim? (Senaryo Karar Motoru)
            </h3>
          </div>
          <span className="text-xs text-indigo-300 font-mono bg-indigo-500/10 px-2 py-1 rounded">
            Enes Öztürk Örnekleri
          </span>
        </div>

        {/* Scenario Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedScenario(idx)}
              className={`p-3 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                selectedScenario === idx
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="text-[10px] text-slate-500 uppercase mb-1">Örnek {idx + 1}</div>
              <div className="font-semibold line-clamp-2">{sc.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Scenario Detail Box */}
        <div className="bg-slate-950 rounded-xl border border-indigo-500/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Tavsiye Edilen Döngü:</span>
              <h4 className="text-base font-bold text-indigo-300 flex items-center gap-2 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {scenarios[selectedScenario].recommendation}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Neden Bu Döngü?
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {scenarios[selectedScenario].explanation}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Örnek C# Kodu:
              </p>
              <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
                {scenarios[selectedScenario].code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
