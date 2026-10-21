import React, { useState } from 'react';
import { Layers, Zap, Scale, Check, X, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<'helper_vs_ext' | 'iter_vs_rec'>('helper_vs_ext');
  const [benchmarkN, setBenchmarkN] = useState<number>(5);

  return (
    <div className="space-y-8">

      {/* Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Yazılım Mimarisi Karşılaştırması</span>
            <span aria-hidden="true">·</span>
            <span>Tasarım Kararları & Verimlilik</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400">Enes Öztürk Kriterleri</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Mimari ve Performans Analizi
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Hangi durumda extension metot, hangi durumda klasik helper; ne zaman rekürsiyon, ne zaman iteratif döngü tercih edilmelidir?
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setSelectedComp('helper_vs_ext')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedComp === 'helper_vs_ext'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Helper Class vs Extension
          </button>
          <button
            onClick={() => setSelectedComp('iter_vs_rec')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedComp === 'iter_vs_rec'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            İteratif (Döngü) vs Rekürsif
          </button>
        </div>
      </div>

      {/* Comparison 1: Helper Class vs Extension Methods */}
      {selectedComp === 'helper_vs_ext' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Traditional Helper */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-300">Geleneksel Static Helper</h3>
                <span className="text-xs text-slate-400 font-mono">Helper.Method(obj)</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4">
                <span className="text-purple-400">bool</span> result = <span className="text-amber-300">NumberHelper</span>.<span className="text-blue-400">IsEven</span>(deger);
              </div>

              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Düşük Keşfedilebilirlik:</strong> Geliştirici <code className="text-slate-300">NumberHelper</code> sınıfının adını önceden bilmek zorundadır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>İç İçe Parantez Karmaşası:</strong> Birden fazla işlemde kod ters okunur: <code className="text-slate-300">StringHelper.Upper(StringHelper.Trim(s))</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Basit, tek seferlik matematik formüllerinde sınıfları gereksiz kirletmez.</span>
                </li>
              </ul>
            </div>

            {/* C# Extension Method */}
            <div className="bg-slate-950 border border-cyan-800/40 rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>C# Extension Metot</span>
                  <span className="text-xs text-cyan-400 font-normal">Uygun olduğunda</span>
                </h3>
                <span className="text-xs text-cyan-400 font-mono">obj.Method()</span>
              </div>

              <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-800/60 font-mono text-xs text-cyan-200 mb-4">
                <span className="text-purple-400">bool</span> result = deger.<span className="text-cyan-300 font-bold">IsEvenNumber</span>();
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Doğal IntelliSense:</strong> Değişkenin ardına nokta (.) koyulduğu an otomatik listelenir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Soldan Sağa Akıcı Okuma (Fluent):</strong> <code className="text-cyan-300">s.Trim().ToUpper().ToUrlSlug()</code> zinciri kurulabilir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>LINQ kütüphanesinin (<code className="text-cyan-300">.Where().Select()</code>) temel taşıdır.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Enes Öztürk Mimari Tavsiyesi */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 space-y-2">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Extension Metot Seçimi:</span>
            </div>
            <p className="leading-relaxed">
              "Bir metot alıcı tipin doğal bir yeteneği gibi okunacaksa extension olarak tanımlamak uygun olabilir. Dış servis, veritabanı veya uygulama iş mantığı bağımlılıkları genellikle servis tasarımına daha uygundur."
            </p>
          </div>
        </div>
      )}

      {/* Comparison 2: Iterative vs Recursive */}
      {selectedComp === 'iter_vs_rec' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Iterative */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-200">İteratif Yaklaşım (For / While)</h3>
                <span className="text-xs text-emerald-400 font-mono">Ek çağrı derinliği yok</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4 leading-relaxed">
                <span className="text-purple-400">int</span> sonuc = 1;{'\n'}
                <span className="text-purple-400">for</span> (<span className="text-purple-400">int</span> i = 1; i &lt;= n; i++){'\n'}
                {'    '}sonuc *= i;
              </div>

              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>Stack Bellek Tüketimi:</span>
                  <span className="text-emerald-400 font-mono font-bold">Ek özyinelemeli çağrı yok</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>StackOverflow Riski:</span>
                  <span className="text-emerald-400 font-bold">Özyineleme kaynaklı risk yok</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>Fonksiyon Çağrı Yükü:</span>
                  <span className="text-slate-300 font-mono">Özyinelemeli çağrı yok</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Ağaç Yapılarında Kod Zorluğu:</span>
                  <span className="text-rose-400 font-medium">Karmaşık ve Çok Satırlı</span>
                </div>
              </div>
            </div>

            {/* Recursive */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-white">Rekürsif Yaklaşım (Özyinelemeli)</h3>
                <span className="text-xs text-amber-400 font-mono">Özyinelemeli Faktöriyel</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4 leading-relaxed">
                <span className="text-purple-400">if</span> (n &lt;= 1) <span className="text-purple-400">return</span> 1;{'\n'}
                <span className="text-purple-400">return</span> n * Faktoryel(n - 1);
              </div>

              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>Stack Bellek Tüketimi:</span>
                  <span className="text-amber-400 font-mono font-bold">Bu örnekte O(n)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>StackOverflow Riski:</span>
                  <span className="text-rose-400 font-bold">Derinliğe ve ortama bağlı</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span>Fonksiyon Çağrı Yükü:</span>
                  <span className="text-slate-300 font-mono">Ek çağrı maliyeti olabilir</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Ağaç Yapılarında Kod Zorluğu:</span>
                  <span className="text-emerald-400 font-medium">Son derece zarif ve sade</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Stack Footprint Calculator */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Kavramsal Çağrı Derinliği Karşılaştırması (n = {benchmarkN})</span>
            </h4>

            <div className="flex items-center gap-4 mb-4">
              <label className="text-xs text-slate-400">Örnek n Değerini Seçin:</label>
              {[3, 5, 10, 20].map((val) => (
                <button
                  key={val}
                  onClick={() => setBenchmarkN(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    benchmarkN === val ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  n = {val}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 mb-1">İteratif Döngüde:</div>
                <div className="text-emerald-400 font-bold text-sm">Özyinelemeli çağrı yok</div>
                <div className="text-[11px] text-slate-400 mt-1">Bu döngü örneğinde her yineleme yeni bir rekürsif çağrı oluşturmaz.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 mb-1">Rekürsif Çağrıda:</div>
                <div className="text-amber-400 font-bold text-sm">Faktöriyel örneğinde en çok {benchmarkN} etkin çağrı</div>
                <div className="text-[11px] text-slate-400 mt-1">Görüntülenen derinlik kavramsaldır; sabit çerçeve boyutu veya bayt ölçümü değildir.</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
