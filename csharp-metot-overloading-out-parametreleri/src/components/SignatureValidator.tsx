import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface ParamDef {
  id: string;
  type: string;
  modifier: 'none' | 'out' | 'ref';
  name: string;
}

export const SignatureValidator: React.FC = () => {
  // Method 1 definition
  const [m1Name, setM1Name] = useState<string>('Hesapla');
  const [m1Return, setM1Return] = useState<string>('void');
  const [m1Params, setM1Params] = useState<ParamDef[]>([
    { id: '1', type: 'int', modifier: 'none', name: 'sayi' },
  ]);

  // Method 2 definition
  const [m2Name, setM2Name] = useState<string>('Hesapla');
  const [m2Return, setM2Return] = useState<string>('int');
  const [m2Params, setM2Params] = useState<ParamDef[]>([
    { id: '2', type: 'int', modifier: 'none', name: 'sayi' },
  ]);

  // Quick preset loader
  const loadPreset = (presetKey: string) => {
    if (presetKey === 'return-type-error') {
      setM1Name('EkranaYazdir');
      setM1Return('void');
      setM1Params([{ id: 'p1', type: 'int', modifier: 'none', name: 'deger' }]);
      setM2Name('EkranaYazdir');
      setM2Return('int');
      setM2Params([{ id: 'p2', type: 'int', modifier: 'none', name: 'deger' }]);
    } else if (presetKey === 'valid-overload') {
      setM1Name('EkranaYazdir');
      setM1Return('void');
      setM1Params([{ id: 'p1', type: 'int', modifier: 'none', name: 'deger' }]);
      setM2Name('EkranaYazdir');
      setM2Return('void');
      setM2Params([{ id: 'p2', type: 'string', modifier: 'none', name: 'deger' }]);
    } else if (presetKey === 'ref-out-conflict') {
      setM1Name('Islem');
      setM1Return('void');
      setM1Params([{ id: 'p1', type: 'int', modifier: 'ref', name: 'x' }]);
      setM2Name('Islem');
      setM2Return('void');
      setM2Params([{ id: 'p2', type: 'int', modifier: 'out', name: 'x' }]);
    } else if (presetKey === 'param-count') {
      setM1Name('EkranaYazdir');
      setM1Return('void');
      setM1Params([{ id: 'p1', type: 'string', modifier: 'none', name: 'deger' }]);
      setM2Name('EkranaYazdir');
      setM2Return('void');
      setM2Params([
        { id: 'p2', type: 'string', modifier: 'none', name: 'deger1' },
        { id: 'p3', type: 'string', modifier: 'none', name: 'deger2' },
      ]);
    }
  };

  // Evaluation logic
  const evaluateSignatures = () => {
    if (m1Name.trim() !== m2Name.trim()) {
      return {
        status: 'different-names',
        badge: 'Farklı Metotlar',
        badgeColor: 'text-slate-400 bg-slate-900 border-slate-700',
        message: 'Metot isimleri farklı olduğundan bu metotlar birbirinin overload versiyonu değildir.',
        isValid: true,
      };
    }

    // Compare parameter count
    if (m1Params.length !== m2Params.length) {
      return {
        status: 'valid-overload',
        badge: '✅ Geçerli Overload',
        badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40',
        message: `Tebrikler! Parametre sayıları farklı (${m1Params.length} vs ${m2Params.length}). C# derleyicisi bu iki metodu başarıyla ayırt eder.`,
        isValid: true,
      };
    }

    // Check ref vs out sole difference (CS0663)
    let refOutOnlyDiff = true;
    for (let i = 0; i < m1Params.length; i++) {
      const p1 = m1Params[i];
      const p2 = m2Params[i];
      if (p1.type !== p2.type) {
        refOutOnlyDiff = false;
        break;
      }
      if (
        !(
          (p1.modifier === 'ref' && p2.modifier === 'out') ||
          (p1.modifier === 'out' && p2.modifier === 'ref')
        )
      ) {
        refOutOnlyDiff = false;
      }
    }

    if (refOutOnlyDiff && m1Params.length > 0) {
      return {
        status: 'error-cs0663',
        badge: '❌ Hata: CS0663',
        badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-500/40',
        message:
          'C# Derleme Hatası (CS0663): Yalnızca "ref" ve "out" farkına dayalı metot aşırı yüklemesi yapılamaz. Her ikisi de çalışma zamanı imzasında aynı by-reference parametre türüne karşılık gelir.',
        isValid: false,
      };
    }

    // Check parameter types and modifiers
    let exactParamMatch = true;
    for (let i = 0; i < m1Params.length; i++) {
      const p1 = m1Params[i];
      const p2 = m2Params[i];
      if (p1.type !== p2.type || p1.modifier !== p2.modifier) {
        exactParamMatch = false;
        break;
      }
    }

    if (exactParamMatch) {
      // If params are exact match, return type difference doesn't save it!
      if (m1Return !== m2Return) {
        return {
          status: 'error-cs0111',
          badge: '❌ Derleme Hatası: CS0111',
          badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-500/40',
          message: `Geri dönüş türü (${m1Return} vs ${m2Return}) overload ayrımı oluşturmaz. Derleyici "CS0111: Type already defines a member called '${m1Name}' with the same parameter types" hatası verir.`,
          isValid: false,
        };
      } else {
        return {
          status: 'error-duplicate',
          badge: '❌ Hata: CS0111 (Kopya Metot)',
          badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-500/40',
          message:
            'Her iki metodun adı, parametre sayısı, parametre türleri ve geçirme biçimleri tamamen aynı! Parametre adları farklı olsa bile overload ayrımı oluşmaz.',
          isValid: false,
        };
      }
    }

    // Types are different
    return {
      status: 'valid-overload',
      badge: '✅ Geçerli Overload',
      badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40',
      message:
        'Tebrikler! Parametre türleri veya geçirme biçimleri farklı olduğundan bu örneklerde metotlar overload oluşturur. Gerçek çağrı çözümlemesi argümanlara ve dönüştürme kurallarına bağlıdır.',
      isValid: true,
    };
  };

  const evaluation = evaluateSignatures();

  const addParam = (method: 1 | 2) => {
    const newP: ParamDef = {
      id: Math.random().toString(),
      type: 'string',
      modifier: 'none',
      name: `param${(method === 1 ? m1Params.length : m2Params.length) + 1}`,
    };
    if (method === 1) setM1Params([...m1Params, newP]);
    else setM2Params([...m2Params, newP]);
  };

  const removeParam = (method: 1 | 2, id: string) => {
    if (method === 1) setM1Params(m1Params.filter((p) => p.id !== id));
    else setM2Params(m2Params.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-2">
          <span>Bölüm 3</span>
          <span aria-hidden="true">·</span>
          <span>C# Derleyici Kuralları</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Metot İmzası &amp; Overload Doğrulayıcı
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          İki metot tanımı oluşturarak temel C# overload kurallarını inceleyin. Bu arayüz örnekleri kontrol eder; C# derleyicisini çalıştırmaz.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium mr-1">Hazır Deneyler:</span>
        <button
          onClick={() => loadPreset('return-type-error')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40 transition-colors cursor-pointer"
        >
          🚨 Sadece Dönüş Tipi Değişirse (CS0111)
        </button>
        <button
          onClick={() => loadPreset('valid-overload')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 transition-colors cursor-pointer"
        >
          ✨ Tip Değişimi: int vs string
        </button>
        <button
          onClick={() => loadPreset('param-count')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-950/40 border border-sky-500/40 text-sky-300 hover:bg-sky-900/40 transition-colors cursor-pointer"
        >
          ✨ Sayı Değişimi: 1 vs 2 Parametre
        </button>
        <button
          onClick={() => loadPreset('ref-out-conflict')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/40 transition-colors cursor-pointer"
        >
          ⚠️ Yalnızca ref vs out Farkı (CS0663)
        </button>
      </div>

      {/* Comparison Grid: Method 1 vs Method 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method 1 Builder */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
              Metot Versiyonu #1
            </span>
            <button
              onClick={() => addParam(1)}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
            >
              + Parametre Ekle
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Geri Dönüş Tipi:
              </label>
              <select
                value={m1Return}
                onChange={(e) => setM1Return(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none"
              >
                <option value="void">void</option>
                <option value="int">int</option>
                <option value="string">string</option>
                <option value="bool">bool</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Metot Adı:
              </label>
              <input
                type="text"
                value={m1Name}
                onChange={(e) => setM1Name(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Parameters List */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-400">Parametreler ({m1Params.length}):</div>
            {m1Params.length === 0 && (
              <div className="text-xs text-slate-500 italic p-2 rounded bg-slate-950/60">
                Parametre yok (Parametresiz metot)
              </div>
            )}
            {m1Params.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono"
              >
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                <select
                  value={p.modifier}
                  onChange={(e) => {
                    const mod = e.target.value as 'none' | 'out' | 'ref';
                    setM1Params(m1Params.map((item) => (item.id === p.id ? { ...item, modifier: mod } : item)));
                  }}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-amber-300 focus:outline-none"
                >
                  <option value="none">(normal)</option>
                  <option value="out">out</option>
                  <option value="ref">ref</option>
                </select>
                <select
                  value={p.type}
                  onChange={(e) => {
                    setM1Params(m1Params.map((item) => (item.id === p.id ? { ...item, type: e.target.value } : item)));
                  }}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-sky-300 focus:outline-none"
                >
                  <option value="int">int</option>
                  <option value="string">string</option>
                  <option value="double">double</option>
                  <option value="bool">bool</option>
                </select>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => {
                    setM1Params(m1Params.map((item) => (item.id === p.id ? { ...item, name: e.target.value } : item)));
                  }}
                  className="flex-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white focus:outline-none"
                />
                <button
                  onClick={() => removeParam(1, p.id)}
                  className="text-rose-400 hover:text-rose-300 px-1 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Generated C# Signature */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">// Metot Bildirimi:</span>
            <div className="text-sky-300 mt-0.5">
              public {m1Return} {m1Name}(
              {m1Params
                .map((p) => `${p.modifier !== 'none' ? p.modifier + ' ' : ''}${p.type} ${p.name}`)
                .join(', ')}
              )
            </div>
          </div>
        </div>

        {/* Method 2 Builder */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Metot Versiyonu #2 (Aday Overload)
            </span>
            <button
              onClick={() => addParam(2)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
            >
              + Parametre Ekle
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Geri Dönüş Tipi:
              </label>
              <select
                value={m2Return}
                onChange={(e) => setM2Return(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none"
              >
                <option value="void">void</option>
                <option value="int">int</option>
                <option value="string">string</option>
                <option value="bool">bool</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Metot Adı:
              </label>
              <input
                type="text"
                value={m2Name}
                onChange={(e) => setM2Name(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Parameters List */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-400">Parametreler ({m2Params.length}):</div>
            {m2Params.length === 0 && (
              <div className="text-xs text-slate-500 italic p-2 rounded bg-slate-950/60">
                Parametre yok (Parametresiz metot)
              </div>
            )}
            {m2Params.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono"
              >
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                <select
                  value={p.modifier}
                  onChange={(e) => {
                    const mod = e.target.value as 'none' | 'out' | 'ref';
                    setM2Params(m2Params.map((item) => (item.id === p.id ? { ...item, modifier: mod } : item)));
                  }}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-amber-300 focus:outline-none"
                >
                  <option value="none">(normal)</option>
                  <option value="out">out</option>
                  <option value="ref">ref</option>
                </select>
                <select
                  value={p.type}
                  onChange={(e) => {
                    setM2Params(m2Params.map((item) => (item.id === p.id ? { ...item, type: e.target.value } : item)));
                  }}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-sky-300 focus:outline-none"
                >
                  <option value="int">int</option>
                  <option value="string">string</option>
                  <option value="double">double</option>
                  <option value="bool">bool</option>
                </select>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => {
                    setM2Params(m2Params.map((item) => (item.id === p.id ? { ...item, name: e.target.value } : item)));
                  }}
                  className="flex-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white focus:outline-none"
                />
                <button
                  onClick={() => removeParam(2, p.id)}
                  className="text-rose-400 hover:text-rose-300 px-1 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Generated C# Signature */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">// Metot Bildirimi:</span>
            <div className="text-amber-300 mt-0.5">
              public {m2Return} {m2Name}(
              {m2Params
                .map((p) => `${p.modifier !== 'none' ? p.modifier + ' ' : ''}${p.type} ${p.name}`)
                .join(', ')}
              )
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Evaluation Verdict */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              C# Kural Simülasyonu:
            </span>
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold border ${evaluation.badgeColor}`}
            >
              {evaluation.badge}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
          {evaluation.message}
        </p>

        {/* Comparison Summary Bar */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">İmza 1 (İsim + Parametreler)</span>
            <span className="font-mono text-sky-400">
              {m1Name}({m1Params.map((p) => `${p.modifier !== 'none' ? p.modifier + ' ' : ''}${p.type}`).join(',')})
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">İmza 2 (İsim + Parametreler)</span>
            <span className="font-mono text-amber-400">
              {m2Name}({m2Params.map((p) => `${p.modifier !== 'none' ? p.modifier + ' ' : ''}${p.type}`).join(',')})
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Geri Dönüş Tipi Durumu</span>
            <span className="font-mono text-slate-300">
              {m1Return === m2Return ? 'Aynı' : `Farklı (${m1Return} vs ${m2Return})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
