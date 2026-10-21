import React, { useState } from 'react';
import { GitBranch, ArrowDown, RotateCcw, ShieldAlert, FastForward, CheckCircle2 } from 'lucide-react';

interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  codeExample: string;
  type: 'start' | 'condition' | 'body' | 'break' | 'continue' | 'update' | 'end';
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'init',
    title: '1. Başlatma (ifade1)',
    subtitle: 'Örn: int i = 0;',
    detail: 'Döngü sayacının tanımlandığı ve ilk değer atamasının yapıldığı ifadedir. Bu ifade döngü ömrü boyunca YALNIZCA BİR KEZ, en başta çalıştırılır. Boş bırakılabilir fakat sonrasındaki ";" işareti zorunludur.',
    codeExample: 'int i = 0;',
    type: 'start',
  },
  {
    id: 'condition',
    title: '2. Koşul Kontrolü (koşul)',
    subtitle: 'Örn: i <= 12',
    detail: 'Döngünün devam etme şartıdır. Her iterasyon başında bu koşul değerlendirilir. Eğer sonuç true ise döngü gövdesine girilir; false ise döngü derhal biter. Boş bırakılırsa (for(;;)) daima true kabul edilir.',
    codeExample: 'i <= 12;',
    type: 'condition',
  },
  {
    id: 'body',
    title: '3. Döngü Gövdesi (Komutlar)',
    subtitle: '{ komut1; komut2; }',
    detail: 'Koşul sağlandığı sürece çalışacak olan kod blokudur. Burada Console.WriteLine veya mantıksal if kontrolleri yer alır.',
    codeExample: 'Console.WriteLine(i);',
    type: 'body',
  },
  {
    id: 'break',
    title: 'Break Ayrımı',
    subtitle: 'if (i == 7) break;',
    detail: 'Döngü içerisinden anında çıkmak istendiğinde kullanılır. Döngüyü tamamen bitirir. İç içe döngülerde yalnızca içinde bulunduğu İLK (en içteki) döngüyü sonlandırır.',
    codeExample: 'if (i == 7) break;',
    type: 'break',
  },
  {
    id: 'continue',
    title: 'Continue Ayrımı',
    subtitle: 'if (i % 2 == 0) continue;',
    detail: 'Mevcut iterasyonu o anda sonlandırır. Gövdedeki kalan komutları atlayarak doğrudan sayaç artırımına (ifade2) zıplar. Döngüyü bitirmez, bir sonraki adıma geçer.',
    codeExample: 'if (i % 2 == 0) continue;',
    type: 'continue',
  },
  {
    id: 'update',
    title: '4. Sayaç Güncelleme (ifade2)',
    subtitle: 'Örn: i++, i--, i += 2',
    detail: 'Her başarılı iterasyonun veya continue çağrısının ardından çalışır. Sayacın artırım ya da azaltım şeklini belirler. Ardından akış tekrar 2. adımdaki koşul kontrolüne döner.',
    codeExample: 'i++',
    type: 'update',
  },
  {
    id: 'end',
    title: 'Döngü Sonu (Exit)',
    subtitle: 'Program akışı devam eder',
    detail: 'Koşul false olduğunda ya da break komutu çalıştığında döngü bloğundan çıkılır ve döngüden sonraki satırlardan çalışmaya devam edilir.',
    codeExample: '// Kod buradan devam eder.',
    type: 'end',
  },
];

export const Flowchart: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('condition');

  const activeNode = FLOW_NODES.find((n) => n.id === activeNodeId) || FLOW_NODES[0];

  return (
    <div className="space-y-6">
      {/* Title description */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            For Döngüsü Yaşam Döngüsü & Akış Mantığı
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Bir for döngüsünün arka planda nasıl işlediğini ve break / continue sapmalarını inceleyin
          </p>
        </div>
        <span className="text-xs text-slate-400">
          Bir bloğa tıklayarak detaylı açıklamasını görüntüleyin
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Visual Flow Diagram (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="max-w-md mx-auto space-y-4">
            {/* Step 1: Init */}
            <button
              onClick={() => setActiveNodeId('init')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                activeNodeId === 'init'
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-950/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Adım 1 · Başlatma
                </span>
                <span className="text-[11px] text-slate-500 font-mono">1 Kez Çalışır</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">ifade1 (int i = 0;)</div>
              <div className="text-xs text-slate-400 mt-0.5">Sayaç değişkeni oluşturulur ve atanır.</div>
            </button>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* Step 2: Condition Decision */}
            <div className="relative">
              <button
                onClick={() => setActiveNodeId('condition')}
                className={`w-full p-4 rounded-xl border text-left transition-all relative z-10 ${
                  activeNodeId === 'condition'
                    ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-950/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Adım 2 · Şart Karar Noktası
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">True / False ?</span>
                </div>
                <div className="text-sm font-bold text-white mt-1">koşul (i &lt;= 12)</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Koşul sağlandığı sürece döngü devam eder.
                </div>
              </button>

              {/* False exit branch line indicator */}
              <div className="text-[11px] font-mono text-rose-400 text-right pr-2 pt-1">
                Eğer FALSE ise ➔ Döngü Biter
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-emerald-500/80">
              <div className="flex items-center gap-1 text-xs font-mono">
                <ArrowDown className="w-4 h-4" />
                <span>Eğer TRUE ise</span>
              </div>
            </div>

            {/* Step 3: Body & Sub-branches */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <button
                onClick={() => setActiveNodeId('body')}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  activeNodeId === 'body'
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-semibold text-purple-400">Adım 3 · Gövde Komutları</div>
                <div className="text-sm font-bold text-white mt-0.5">Console.WriteLine(i); vb.</div>
              </button>

              {/* Divergence: Break vs Continue */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setActiveNodeId('break')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeNodeId === 'break'
                      ? 'bg-rose-500/20 border-rose-500'
                      : 'bg-slate-900/90 border-slate-800 hover:border-rose-900/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>break;</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Döngüyü anında bitirir ve dışarı çıkar.
                  </div>
                </button>

                <button
                  onClick={() => setActiveNodeId('continue')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeNodeId === 'continue'
                      ? 'bg-amber-500/20 border-amber-500'
                      : 'bg-slate-900/90 border-slate-800 hover:border-amber-900/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <FastForward className="w-3.5 h-3.5" />
                    <span>continue;</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Kalan komutları atlar, sayaç artırımına geçer.
                  </div>
                </button>
              </div>
            </div>

            {/* Down arrow to update */}
            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 4: Update (ifade2) */}
            <button
              onClick={() => setActiveNodeId('update')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                activeNodeId === 'update'
                  ? 'bg-emerald-600/20 border-emerald-500 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Adım 4 · Sayaç Güncelleme
                </span>
                <span className="text-[11px] text-indigo-400 font-mono flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Koşula Geri Döner
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-1">ifade2 (i++, i--)</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Sayaç artırılır/azaltılır ve doğrudan 2. adıma (koşula) zıplanır.
              </div>
            </button>

            {/* Final Exit */}
            <button
              onClick={() => setActiveNodeId('end')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                activeNodeId === 'end'
                  ? 'bg-slate-800 border-slate-600'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-medium text-slate-400">Döngü Sonu</div>
              <div className="text-sm font-semibold text-slate-300">
                Program akışı döngü sonrasındaki kodlardan devam eder.
              </div>
            </button>
          </div>
        </div>

        {/* Right Explanatory Detail Card (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs uppercase font-mono text-indigo-400 tracking-wider">
              Bileşen İncelemesi
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{activeNode.title}</h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{activeNode.subtitle}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Mekanizma & Detaylı Açıklama
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeNode.detail}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              C# Kod Örneği
            </h4>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
              <code>{activeNode.codeExample}</code>
            </div>
          </div>

          {/* Special Author Advice for each node */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <span>Enes Öztürk'ün İpucu Notu:</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeNode.id === 'init' &&
                'ifade1 kısmında birden fazla değişken tanımlanabilir: "for (int i = 0, j = 10; i < j; i++, j--)". Ancak iyi bir kod okunabilirliği için sayacı sade tutmak tavsiye edilir.'}
              {activeNode.id === 'condition' &&
                'Koşul her iterasyonda tekrar hesaplanır. Eğer koşulda karmaşık metot çağrısı yaparsanız (örn: i < liste.Hesapla()), her adımda o metot çağrılır. Bu nedenle performans için değerleri sabit tutmak önemlidir.'}
              {activeNode.id === 'body' &&
                'Tek satırlı döngülerde küme parantezleri { } zorunlu olmasa da, temiz kod ve beklenmedik mantık hatalarını önlemek için daima parantez kullanılması önerilir.'}
              {activeNode.id === 'break' &&
                'ÖNEMLİ KURAL: İç içe döngülerde (nested loops) break çağrıldığında yalnızca İÇİNDE BULUNDUĞU ilk döngüyü sonlandırır, dıştaki döngü akmaya devam eder!'}
              {activeNode.id === 'continue' &&
                'Continue komutu döngüyü bitirmez; "bu turu pas geç, bir sonraki sayıya atla" anlamına gelir. Continue çağrıldığında ifade2 (i++) yine de çalışır!'}
              {activeNode.id === 'update' &&
                'Sayaç sadece 1 artmak zorunda değildir. i += 2 (ikişer ikişer), i -= 5 veya i *= 2 şeklinde herhangi bir matematiksel değişim yazılabilir.'}
              {activeNode.id === 'end' &&
                'Döngüden çıkış anında sayaç değişkeni (int i) for parantezinde tanımlandıysa yerel kapsama (scope) sahiptir ve döngü dışından erişilemez.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
