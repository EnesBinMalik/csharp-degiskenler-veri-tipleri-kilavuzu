import React, { useState } from 'react';
import { Layers, CheckCircle2, SplitSquareVertical, Clock, Sparkles } from 'lucide-react';

export const MethodTheorySection: React.FC = () => {
  const [codeMode, setCodeMode] = useState<'with_methods' | 'monolithic'>('with_methods');

  return (
    <section id="teori" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 01</span>
          <span aria-hidden="true">·</span>
          <span>Temel Kavramlar &amp; Mimari</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Metot Nedir ve Neden Kullanılır?
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          Metotları, programı daha küçük, mantıklı ve yönetilebilir alt parçalara ayrıştırmak için kullanırız.
          Büyük ve karmaşık bir işi tek bir blok içinde yazmak yerine, her biri tek bir sorumluluğa odaklanan
          küçük parçalara bölmek en doğru yazılım mühendisliği yaklaşımıdır.
        </p>
      </div>

      {/* 3 Core Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">1. Modüler Ayrıştırma</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Karmaşık problemleri küçük fonksiyonel bloklara böler. Bir hata olduğunda tüm kodu taramak yerine,
            yalnızca ilgili metoda odaklanıp sorunu çözebilirsiniz.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">2. Kod Tekrarını Önleme (DRY)</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Don't Repeat Yourself! Aynı algoritmayı 5 farklı yerde tekrar tekrar yazmak yerine tek bir metotta
            tanımlar, ihtiyaç duyduğunuz her noktada o metodu çağırırsınız.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">3. Kapsam ve Yaşam Süresi</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Metot içindeki yerel değişkenlerin kapsamı metot gövdesiyle sınırlıdır. Fiziksel bellek yerleşimi
            derleyiciye ve çalışma zamanına bağlıdır; her yerel değişkenin Stack'te tutulduğu garanti edilmez.
          </p>
        </div>
      </div>

      {/* Class Membership & Static vs Instance Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-amber-400"></span>
            <span>Sınıf ve Nesneye Bağımlılık</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            C# dilinde metotlar tek başlarına bağımsız bir dosya boşluğunda yaşayamazlar. Mutlaka bir
            <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono mx-1">class</code>
            (veya struct) içerisinde tanımlanmak zorundadırlar.
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">Örnek (Instance) Metotlar:</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Sınıftan bir nesne üretilerek erişilir:
              </p>
              <pre className="text-xs font-mono text-cyan-300">
Matematik islemci = new Matematik();
int sonuc = islemci.Topla(5, 10);
              </pre>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">Static Metotlar:</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Nesne oluşturmadan doğrudan sınıf adı üzerinden erişilir (<code className="text-amber-300">SinifAdi.MetotIsmi</code>):
              </p>
              <pre className="text-xs font-mono text-emerald-300">
int sonuc = Matematik.Topla(5, 10); // Static çağrı
              </pre>
            </div>
          </div>
        </div>

        {/* Variable scope and lifetime */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-indigo-400"></span>
            <span>Değişkenlerin Kapsamı (Scope) ve Yaşam Süresi</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Metotlar içinde tanımlanan değişkenler <strong className="text-white">yerel (local)</strong> değişkenlerdir.
            Dış dünyadan görünmezler ve programın başından sonuna kadar yaşamazlar:
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
            <div className="text-slate-500">// Metot çağrıldığında kavramsal bir çağrı çerçevesi oluşur:</div>
            <div>public void OrnekMetot() {'{'}</div>
            <div className="pl-4 text-cyan-300">int geciciSayac = 0; <span className="text-slate-500">// Yerel değişken tanımlandı</span></div>
            <div className="pl-4 text-cyan-300">geciciSayac += 5;</div>
            <div className="pl-4 text-amber-300">return; <span className="text-slate-500">// METOTTAN ÇIKILDI!</span></div>
            <div>{'}'}</div>
            <div className="text-rose-400/90 pt-1">
              // geciciSayac bu kapsamın dışından artık erişilemez.
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded border border-slate-800">
            💡 <strong>Enes Öztürk'ün Notu:</strong> Kapsam, bir yerel değişkene kodun hangi bölümünden erişilebileceğini belirler. Derleyici ve çalışma zamanı, değişkenin fiziksel saklanma biçimini optimize edebilir.
          </div>
        </div>
      </div>

      {/* Interactive Code Comparison: Monolithic vs Modular */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-medium">Canlı Mimari Karşılaştırması</div>
            <div className="text-sm font-semibold text-white">Spagetti Kod vs Metotlu Temiz Kod</div>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setCodeMode('with_methods')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                codeMode === 'with_methods'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ✅ Metotlu Yaklaşım (Tavsiye Edilen)
            </button>
            <button
              onClick={() => setCodeMode('monolithic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                codeMode === 'monolithic'
                  ? 'bg-rose-500 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ❌ Metotsuz (Tekrarlı &amp; Spagetti)
            </button>
          </div>
        </div>

        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          {codeMode === 'with_methods' ? (
            <div className="space-y-3 text-slate-300">
              <div className="text-emerald-400 font-semibold">// ✅ METOTLU MİMARİ: Temiz, okunabilir, 1 kere yaz 100 kere çağır:</div>
              <pre className="text-cyan-300">
{`// Tek bir yerde tanımlanır:
public int ArttırVeTopla(ref int x, ref int y)
{
    x += 1;
    y += y;
    return (x + y);
}

// Programın istediğimiz yerinde tek satırla güvenle çağrılır:
int a = 3, b = 4;
int sonuc1 = instance.ArttırVeTopla(ref a, ref b);

int k = 10, m = 20;
int sonuc2 = instance.ArttırVeTopla(ref k, ref m);`}
              </pre>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                ✨ <strong>Avantaj:</strong> Algoritma değiştiğinde sadece tek bir metodu güncellersiniz, tüm program anında uyum sağlar.
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-slate-300">
              <div className="text-rose-400 font-semibold">// ❌ METOTSUZ MONOLİTİK YAKLAŞIM: Kod tekrarı, karmaşa ve yüksek hata riski:</div>
              <pre className="text-rose-300/80">
{`// 1. İşlem için:
int a = 3;
int b = 4;
a += 1;
b += b;
int sonuc1 = a + b;

// 2. İşlem için AYNI kodları kopyala-yapıştır yapıyoruz:
int k = 10;
int m = 20;
k += 1;
m += m;
int sonuc2 = k + m;

// 50 yerde yapılacak olsa 250 satır kod kopyalanacak ve bir kural değiştiğinde 50 yeri elle güncellemek gerekecek!`}
              </pre>
              <div className="text-xs text-rose-400/90 pt-2 border-t border-slate-800">
                ⚠️ <strong>Dezavantaj:</strong> Okunabilirlik sıfır, kod kirliliği tavan, bakım maliyeti inanılmaz derecede yüksek.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
