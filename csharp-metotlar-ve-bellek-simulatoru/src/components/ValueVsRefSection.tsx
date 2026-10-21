import React, { useState } from 'react';
import { Database, Binary, KeyRound, AlertTriangle, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { VALUE_TYPES } from '../data/methodData';

export const ValueVsRefSection: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredTypes = VALUE_TYPES.filter(t =>
    t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.size.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.range.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="deger-ref" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 03</span>
          <span aria-hidden="true">·</span>
          <span>Bellek Yönetimi &amp; Parametre Aktarımı</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Değerle Aktarım ve ref Anahtar Kelimesi
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          C#'ta parametreler varsayılan olarak değerle aktarılır. <strong className="text-emerald-400">Değer türlerinde</strong>
          değer kopyalanır; <strong className="text-indigo-400">ref</strong> kullanıldığında çağıranın değişkeni metoda başvuru olarak iletilir.
        </p>
      </div>

      {/* Side-by-Side Dual Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Pass by Value Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Binary className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Değer Türleri (Değerle Aktarım)</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Varsayılan Davranış</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Değer türü bir argüman varsayılan olarak aktarıldığında parametre, argümanın değerini alır. Örneğin <code>int</code>
            parametresine yapılan atama çağırandaki değişkeni değiştirmez. Bu, fiziksel olarak belirli bir bellek alanı
            ayrıldığını veya bit düzeyinde kopyalama yapıldığını garanti etmez.
          </p>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-2 text-xs">
            <div className="text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Argüman değişkeni korunur:</strong> Değer türü parametresine yapılan atama, <code>ref</code> ya da <code>out</code> kullanılmadıkça çağırandaki değişkeni değiştirmez.</span>
            </div>
            <div className="text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Kapsam:</strong> Parametre, metot gövdesi içinde kullanılır; fiziksel saklama ve geri kazanım ayrıntıları çalışma zamanına bağlıdır.</span>
            </div>
          </div>
        </div>

        {/* Pass by Ref Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">ref Kullanımı (Değişkene Başvuru)</h3>
            </div>
            <span className="text-xs font-mono text-indigo-400">Değişkene başvuru</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            <code>ref</code> parametresi, çağıranın değişkenini metot içinde aynı değişkene başvuru üzerinden kullanır.
            Bu, C# işaretçisi ya da ham bellek adresi aktarıldığı anlamına gelmez.
          </p>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-3 text-xs">
            <div className="text-slate-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Kural 1:</strong> Referans olarak iletilmek istenen değişkenin önüne hem çağırırken hem de metot tanımında <code className="text-amber-300 font-bold">ref</code> yazılmalıdır.</span>
            </div>
            <div className="text-slate-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Kural 2:</strong> <code>ref</code> ile iletilen değişken çağrıdan önce atanmış olmalıdır. <code>out</code> parametresinde ise metot dönmeden önce değer atanmalıdır.</span>
            </div>
            <div className="text-rose-300 bg-rose-950/30 p-2.5 rounded border border-rose-900/50">
              ⚠️ <strong>Kritik Uyarı:</strong> Çağrıldığı yerdeki değişken kalıcı olarak değişeceği için <em>ref</em> anahtar kelimesi kullanılırken çok dikkatli olunmalıdır.
            </div>
          </div>
        </div>
      </div>

      {/* Value Types Grid & Filter Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>C# Değer Türleri (Value Types) Referans Listesi</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Değer türleri varsayılan olarak değerle aktarılır. Çağıran değişkenin kendisini metoda iletmek için <em>ref</em> kullanılabilir.
            </p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Tip adına veya boyuta göre ara..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono">
              <tr>
                <th className="px-5 py-3 font-semibold">Tip Adı</th>
                <th className="px-5 py-3 font-semibold">Tür boyutu / not</th>
                <th className="px-5 py-3 font-semibold">Değer Aralığı / Açıklama</th>
                <th className="px-5 py-3 font-semibold">Örnek Tanım</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {filteredTypes.map((vt) => (
                <tr key={vt.name} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3 font-bold text-cyan-400">{vt.name}</td>
                  <td className="px-5 py-3 text-slate-300 tabular-nums">{vt.size}</td>
                  <td className="px-5 py-3 text-slate-400">{vt.range}</td>
                  <td className="px-5 py-3 text-emerald-300/90">{vt.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-xs text-slate-500 border-t border-slate-800">
          Listelenen boyutlar türlerin temsil bilgisine ilişkindir; gerçek değişken/nesne bellek maliyetini, çalışma zamanı yerleşimini veya hizalamayı göstermez. Yapıların boyutu alanlarına ve yerleşim kurallarına bağlıdır.
        </p>
      </div>
    </section>
  );
};
