import React from 'react';
import { Cpu, Layers, HardDrive, Zap } from 'lucide-react';

export const MemoryDeepDive: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          C# Bellek Kavramları
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Diziler ve Bellek: Kavramsal Model
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          C# dizileri referans türüdür. Stack ve heap çizimleri öğretim amaçlı sadeleştirmelerdir: bir dizi değişkeninin fiziksel konumu, adresi ve toplam bellek maliyeti bu görselden çıkarılamaz; yerleşim bağlama ve çalışma zamanına bağlıdır.
        </p>
      </div>

      {/* Visual Diagram: Stack vs Heap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stack Block */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white">
                STACK (Yığın Bellek)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Yerel değişken örneği
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 relative">
              <span className="text-[10px] font-mono text-slate-500 block">Değişken Adı:</span>
              <div className="font-mono text-sm font-bold text-cyan-300 mt-1">
                int[] sayiDizisi
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">                Kavramsal başvuru:</span>
                <span className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  sayiDizisi → dizi
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bu şema bir adresi, pointer boyutunu veya yerel değişkenlerin her zaman stack'te bulunduğunu iddia etmez.
            </p>
          </div>
        </div>

        {/* Heap Block */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <h3 className="font-mono text-sm font-bold text-white">
                HEAP (Öbek Bellek)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Dinamik & Çöp Toplayıcı (GC)
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40">
              <span className="text-[10px] font-mono text-slate-500 block">Örnek değer dizisi (temsili)</span>
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                {[1, 3, 4, 9, 8, 7].map((num, i) => (
                  <div key={i} className="flex-1 min-w-[36px] p-1.5 rounded bg-slate-900 border border-slate-700 text-center font-mono">
                    <div className="text-[9px] text-slate-500">[{i}]</div>
                    <div className="text-xs font-bold text-emerald-300">{num}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-2 text-right">
                Eleman sayısı: 6
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bir dizinin elemanları sıralı biçimde tutulur. İndeksle elemana erişim sabit zamanlıdır; bu çizim gerçek adresleri veya dizinin toplam bellek maliyetini göstermez.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Dive into Array.Resize ref parameter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Array.Resize Neden "ref" Alır ve Arka Planda Ne Olur?
          </h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Birçok geliştirici diziyi yeniden boyutlandırdığında var olan bellek bloğunun genişlediğini zanneder.
          <strong>Bir dizi örneğinin uzunluğu oluşturulduktan sonra değiştirilemez.</strong> <code>Array.Resize</code> farklı uzunlukta yeni bir dizi oluşturur ve verilen dizi değişkenini bu diziye atar.
        </p>

        {/* Step by step flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              1. ADIM
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1">Yeni Dizi Tahsisi</h4>
            <p className="text-[11px] text-slate-400">
              İstenen uzunlukta yeni bir dizi oluşturulur.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
              2. ADIM
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1">Veri Kopyalama</h4>
            <p className="text-[11px] text-slate-400">
              Eski dizideki elemanlar yeni diziye kopyalanır. Büyütüldüyse kalan hücrelere 0 yazılır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              3. ADIM (ref Rolü)
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1">Referans Güncelleme</h4>
            <p className="text-[11px] text-slate-400">
              <code className="text-emerald-300 font-bold">ref</code> parametresi, çağıranın dizi değişkeninin yeni diziye atanmasını sağlar.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
              4. ADIM (GC)
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1">Çöp Toplama</h4>
            <p className="text-[11px] text-slate-400">
              Eski dizi başka bir yerde kullanılmıyorsa erişilemez hale gelebilir; belleğin ne zaman geri alınacağı Garbage Collector'a bağlıdır.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mt-4 text-xs font-mono text-slate-300">
          <div className="text-slate-500">// C# örneği (bu kod çalıştırılmaz):</div>
          <div>int[] sayiDizisi = {'{ 1, 3, 4, 9, 8, 7 }'};</div>
          <div>Array.Resize&lt;int&gt;(<span className="text-amber-400 font-bold">ref</span> sayiDizisi, 12);</div>
          <div>sayiDizisi[6] = 10;</div>
        </div>
        <p className="text-xs text-amber-200">
          Simülasyon notu: gerçek bellek adresi gösterilmez. Eski dizinin belleği, artık erişilebilir olmadığı takdirde bile GC tarafından hemen geri alınacağı garanti edilmez.
        </p>
      </div>

      {/* Author note */}
      <div className="text-center py-4 border-t border-slate-800 text-xs text-slate-400">
        Hazırlayan: <span className="text-cyan-300 font-semibold">Enes Öztürk</span> • C# Temel Veri Yapıları ve Algoritma Dizisi
      </div>
    </div>
  );
};
