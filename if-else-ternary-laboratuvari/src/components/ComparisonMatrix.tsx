import React from 'react';
import { CheckCircle2, AlertTriangle, Layers, Zap, Code, ShieldCheck } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="karsilastirma" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-10">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          Teorik & Pratik Karşılaştırma · Enes Öztürk
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          If-Else Yapısı ile Ternary If (? :) Arasındaki Farklar
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-3xl">
          Her iki yapı da koşula göre seçim yapabilir; ancak türleri, kullanım biçimleri ve ifade ettikleri işler farklıdır. Örnekler kavramsaldır, derleyici veya performans karşılaştırması değildir.
        </p>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl mb-12">
        <table className="w-full text-left text-xs sm:text-sm font-sans">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300">
              <th className="py-4 px-6 font-semibold">Özellik</th>
              <th className="py-4 px-6 font-semibold text-blue-400">If - Else Yapısı</th>
              <th className="py-4 px-6 font-semibold text-cyan-400">Ternary If (? :) Operatörü</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            <tr>
              <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-slate-400" />
                <span>Programlama Türü</span>
              </td>
              <td className="py-4 px-6">
                <span className="font-mono text-xs bg-slate-800/80 text-blue-300 px-2 py-0.5 rounded">Statement (Deyim)</span>
                <p className="text-xs text-slate-400 mt-1">Bir eylem gerçekleştirir, bloklar çalıştırır; doğrudan bir değer üretip değişkene atanamaz.</p>
              </td>
              <td className="py-4 px-6">
                <span className="font-mono text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/40">Expression (İfade)</span>
                <p className="text-xs text-slate-400 mt-1">Geriye bir değer döner; return ifadelerinde, değişken atamalarında veya metot parametresi olarak doğrudan verilebilir.</p>
              </td>
            </tr>

            <tr>
              <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Kod Uzunluğu & Sözdizimi</span>
              </td>
              <td className="py-4 px-6">
                <span>Çok satırlı bloklar ve süslü parantezler <code className="text-slate-200 font-mono">{'{ }'}</code> kullanabilir.</span>
              </td>
              <td className="py-4 px-6">
                <span>Çoğunlukla kısa biçimde yazılır:</span> <code className="text-cyan-300 font-mono">koşul ? doğru : yanlış</code>
              </td>
            </tr>

            <tr>
              <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-400" />
                <span>Derleme & Performans</span>
              </td>
              <td className="py-4 px-6">
                <span>Üretilen IL, ifadenin bağlamına ve derleyiciye bağlıdır; bu laboratuvar IL çıktısını incelemez.</span>
              </td>
              <td className="py-4 px-6">
                <span>Performans hakkında genel bir sonuç çıkarılamaz. Bu basit örnekte biçimi okunabilirliğe göre seçin; hız iddiası için gerçek bir derleme ve ölçüm gerekir.</span>
              </td>
            </tr>

            <tr>
              <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Çoklu Satır & Metot Çağrısı</span>
              </td>
              <td className="py-4 px-6 text-emerald-300">
                Birden fazla komut, döngü, try-catch veya nesne oluşturma işlemlerini gövdesinde rahatça barındırabilir.
              </td>
              <td className="py-4 px-6 text-amber-300">
                Yalnızca tek bir değer veya tek bir metot çıktısı döndürmek için tasarlanmıştır. Karmaşık blok kodlar yazılamaz.
              </td>
            </tr>

            <tr>
              <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-400" />
                <span>İç İçe Kullanım (Nesting)</span>
              </td>
              <td className="py-4 px-6">
                <code className="text-blue-300 font-mono">else if</code> basamakları ile kolayca genişletilebilir, okunabilirliği korunur.
              </td>
              <td className="py-4 px-6 text-rose-300">
                İç içe ternary ifadeler okunabilirliği düşürebilir. Karmaşık koşullarda <code className="font-mono">if-else</code> veya <code className="font-mono">switch</code> tercih etmek daha anlaşılır olabilir.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Ne zaman If-Else? */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ne Zaman If-Else Tercih Edilmeli?</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Koşula bağlı olarak birden çok satırlık işlem veya iş mantığı (business logic) çalıştırılacaksa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>3 veya daha fazla farklı koşul kontrolü gerekiyorsa (<code className="text-slate-200 font-mono">else if</code> merdiveni).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Geriye doğrudan bir değer dönmek yerine bir döngü başlatılacak veya istisna (exception) fırlatılacaksa.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
            Örnek: Dosya kaydetme, veritabanı bağlantısı açma/kapatma.
          </div>
        </div>

        {/* Card 2: Ne zaman Ternary? */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ne Zaman Ternary (? :) Tercih Edilmeli?</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Basit ikili durumlarda (True / False) doğrudan bir değişkene değer atanacağı zaman.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span><code className="text-slate-200 font-mono">Console.WriteLine()</code> veya <code className="text-slate-200 font-mono">return</code> içinde tek satırda karar verilmek istendiğinde.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Kısa bir koşullu değer seçimi ifadeyi daha anlaşılır kılıyorsa.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
            Örnek: <code className="text-cyan-300">condition ? "true" : "false"</code> (Ödev örneğimiz).
          </div>
        </div>
      </div>
    </section>
  );
};
