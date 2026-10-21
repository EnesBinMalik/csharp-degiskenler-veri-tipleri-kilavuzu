import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Sparkles } from 'lucide-react';
import { METHOD_TEMPLATES } from '../data/methodData';

export const CodePlayground: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('swap_numbers');
  const selectedTemplate = METHOD_TEMPLATES.find(t => t.id === selectedTemplateId) || METHOD_TEMPLATES[0];

  // Template execution states
  const [paramA, setParamA] = useState<number>(10);
  const [paramB, setParamB] = useState<number>(25);
  const [executionOutput, setExecutionOutput] = useState<{
    before: string;
    after: string;
    returned?: string;
    trace: string[];
  } | null>(null);

  const handleRunAlgorithm = () => {
    if (selectedTemplate.id === 'swap_numbers') {
      let a = paramA;
      let b = paramB;
      const trace: string[] = [
        `Başlangıç Main: a = ${a}, b = ${b}`,
        `SayilariTakasEt(ref a, ref b) çağrıldı. Parametreler çağıranın a ve b değişkenlerine başvuruyor.`,
        `Metot içi: int gecici = a (${a}) saklandı.`,
        `Metot içi: a = b (${b}) atandı -> çağıranın a değeri ${b} oldu.`,
        `Metot içi: b = gecici (${a}) atandı -> çağıranın b değeri ${a} oldu.`,
        `Metottan çıkıldı (void). Lifetime sona erdi.`
      ];
      setExecutionOutput({
        before: `a = ${paramA}, b = ${paramB}`,
        after: `a = ${b}, b = ${a}`,
        returned: 'void (Değer dönmedi, doğrudan değişkenler takaslandı)',
        trace
      });
    } else if (selectedTemplate.id === 'value_protection') {
      let sayi = paramA;
      let kopya = sayi;
      let kare = kopya * kopya;
      const trace: string[] = [
        `Başlangıç Main: sayi = ${sayi}`,
        `KareAl(sayi) çağrıldı. int parametresine sayi değerinin kopyası aktarıldı.`,
        `Metot parametresinin simüle edilen değeri = ${kopya}.`,
        `Metot içi: sayi = sayi * sayi (${kare}) hesaplandı.`,
        `Metot içi: return ${kare} ile sonuç teslim edildi.`,
        `Metot tamamlandı; parametre kapsamı sona erdi. Çağırandaki sayi değişmedi (${paramA}).`
      ];
      setExecutionOutput({
        before: `sayi = ${paramA}`,
        after: `sayi = ${paramA} (KORUNDU!)`,
        returned: `sonuc = ${kare}`,
        trace
      });
    } else {
      let x = paramA;
      let y = paramB;
      let newX = x + 1;
      let newY = y + y;
      let sum = newX + newY;
      const trace: string[] = [
        `Başlangıç Main: x = ${x}, y = ${y}`,
        `ArttırVeTopla(ref x, ref y) çağrıldı.`,
        `x += 1 -> Main.x ${newX} oldu.`,
        `y += y -> Main.y ${newY} oldu.`,
        `return (${newX} + ${newY}) = ${sum}`,
        `Metot sonlandı.`
      ];
      setExecutionOutput({
        before: `x = ${paramA}, y = ${paramB}`,
        after: `x = ${newX}, y = ${newY}`,
        returned: `sonuc = ${sum}`,
        trace
      });
    }
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 05</span>
          <span aria-hidden="true">·</span>
          <span>Pratik Kod Laboratuvarı</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Farklı Algoritmalar ve Metot Pratikleri
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          C# dünyasında en sık karşılaşılan metot şablonlarını seçin, parametreleri değiştirin ve
          bellek izini (execution trace) anında gözlemleyin.
        </p>
      </div>

      {/* Template Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {METHOD_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => {
              setSelectedTemplateId(tmpl.id);
              setExecutionOutput(null);
              if (tmpl.id === 'swap_numbers') {
                setParamA(10);
                setParamB(25);
              } else if (tmpl.id === 'value_protection') {
                setParamA(7);
              } else {
                setParamA(3);
                setParamB(4);
              }
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTemplateId === tmpl.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {tmpl.name}
          </button>
        ))}
      </div>

      {/* Algorithm Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Snippet Box */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>{selectedTemplate.signature}</span>
            </span>
            <span className="text-slate-500 text-[11px] font-mono">
              {selectedTemplate.usesRef ? 'ref Aktif' : 'Değer Tipi'}
            </span>
          </div>

          <pre className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 overflow-x-auto bg-slate-950/50">
            {selectedTemplate.code}
          </pre>

          <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
            💡 {selectedTemplate.description}
          </div>
        </div>

        {/* Live Test & Execution Trace Box */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
              Canlı Değer Girişi &amp; Yürütme
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {selectedTemplate.id === 'value_protection' ? 'Parametre (sayi):' : 'Parametre 1:'}
                </label>
                <input
                  type="number"
                  value={paramA}
                  onChange={(e) => setParamA(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {selectedTemplate.id !== 'value_protection' && (
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Parametre 2:</label>
                  <input
                    type="number"
                    value={paramB}
                    onChange={(e) => setParamB(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleRunAlgorithm}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-cyan-950/40"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Metodu Çağır &amp; Bellek İzini Çıkart</span>
            </button>
          </div>

          {/* Trace Results */}
          {executionOutput ? (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Önce: <strong className="text-white">{executionOutput.before}</strong></span>
                <span className="text-slate-400">Sonra: <strong className="text-cyan-400">{executionOutput.after}</strong></span>
              </div>
              <div className="text-amber-300 text-[11px]">
                {executionOutput.returned}
              </div>
              <div className="space-y-1 pt-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Adım Adım Çalışma Günlüğü:</div>
                {executionOutput.trace.map((t, idx) => (
                  <div key={idx} className="text-slate-300 text-[11px] leading-tight">
                    <span className="text-cyan-500 mr-1.5">›</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500 font-mono">
              Yukarıdaki butona tıklayarak algoritmanın bellek çıktısını test edin.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
