import React, { useState } from 'react';
import {
  TYPE_DETAILS,
  IMPLICIT_CONVERSIONS,
  DataType,
} from '../types/conversion';
import {
  Layers,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export const TypeHierarchyMatrix: React.FC = () => {
  const [search, setSearch] = useState('');
  const [compSource, setCompSource] = useState<DataType>('short');
  const [compTarget, setCompTarget] = useState<DataType>('int');

  const typesList = Object.values(TYPE_DETAILS);

  const filteredTypes = typesList.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.clrType.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const isImplicit = IMPLICIT_CONVERSIONS[compSource]?.includes(compTarget);
  const srcMeta = TYPE_DETAILS[compSource];
  const trgMeta = TYPE_DETAILS[compTarget];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            C# Türleri ve Dönüşüm Matrisi
          </h2>
          <p className="text-sm text-slate-400">
            C# türlerinin boyutları, CLR karşılıkları ve dilde tanımlı örtük dönüşüm yolları.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start">
          Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
        </div>
      </div>

      {/* Interactive Two-Type Checker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Search className="w-4 h-4 text-indigo-400" /> Hızlı Geçiş Kontrolü (Type A &rarr; Type B)
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">
              Kaynak Tip (A):
            </label>
            <select
              value={compSource}
              onChange={(e) => setCompSource(e.target.value as DataType)}
              aria-label="Kaynak Veri Tipi"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
            >
              {typesList.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.typeClassification === 'Referans türü' ? 'boyut bağlama bağlı' : `${t.bits} bit`})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">
              Hedef Tip (B):
            </label>
            <select
              value={compTarget}
              onChange={(e) => setCompTarget(e.target.value as DataType)}
              aria-label="Hedef Veri Tipi"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
            >
              {typesList.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.bits} bit)
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <span className="text-xs text-slate-400 font-medium block mb-1">
              Dönüşüm Durumu:
            </span>
            <div
              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                isImplicit
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
              }`}
            >
              {isImplicit ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Implicit (Kendiliğinden)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Explicit (Açık Cast/Convert)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick verdict explanation */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300 font-mono">
          {isImplicit ? (
            <span className="text-emerald-400">
              ✅ <code>{compSource}</code> ({srcMeta.typeClassification === 'Referans türü' ? 'boyut bağlama bağlı' : `${srcMeta.bits}-bit`}) &rarr; <code>{compTarget}</code> ({trgMeta.typeClassification === 'Referans türü' ? 'boyut bağlama bağlı' : `${trgMeta.bits}-bit`}):
              Bu örtük dönüşüm C# dilinde tanımlıdır; kayan noktalı hedeflerde hassasiyet kaybı yine de olabilir.
            </span>
          ) : (
            <span className="text-amber-400">
              ⚠️ <code>{compSource}</code> &rarr; <code>{compTarget}</code>:
              {compSource === 'string'
                ? ` Metin tipleri sayısal tiplere implicit atanamaz. Parse() veya Convert kullanılmalı.`
                : ` Kapasite daralması veya tip uyumsuzluğu riski vardır. Açıkça (${compTarget}) cast veya Convert sınıfı gereklidir.`}
            </span>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tip ara (int, byte, float, string...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {filteredTypes.length} Veri Tipi Listelendi
        </span>
      </div>

      {/* Types Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">C# Anahtar Sözcük</th>
                <th className="px-4 py-3">.NET CLR Tipi</th>
                <th className="px-4 py-3">Bellek (Boyut)</th>
                <th className="px-4 py-3">Tür Sınıflandırması</th>
                <th className="px-4 py-3">Değer Aralığı (Min .. Max)</th>
                <th className="px-4 py-3">Otomatik (Implicit) Geçebileceği Tipler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTypes.map((t) => {
                const implicitTargets = IMPLICIT_CONVERSIONS[t.id] || [];
                return (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-indigo-300">
                      {t.name}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {t.clrType}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-semibold">
                        {t.typeClassification === 'Referans türü' ? 'Boyut bağlama bağlı' : `${t.bits} bit (${t.bytes} bayt)`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          t.typeClassification === 'Değer türü'
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/50'
                            : 'bg-purple-950/40 text-purple-300 border border-purple-900/50'
                        }`}
                      >
                        {t.typeClassification}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-[11px] max-w-[200px] truncate" title={`${t.minValue} .. ${t.maxValue}`}>
                      {t.minValue} .. {t.maxValue}
                    </td>
                    <td className="px-4 py-3">
                      {implicitTargets.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {implicitTargets.map((target) => (
                            <span
                              key={target}
                              className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-[10px]"
                            >
                              {target}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-600 text-[10px] italic">
                          Yok (Açık dönüşüm şart)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Değer/referans türü sınıflandırması, belirli bir değişkenin stack veya heap üzerinde bulunduğunu göstermez. Gerçek bellek yerleşimi bağlama ve çalışma zamanına bağlıdır.
      </p>
    </div>
  );
};
