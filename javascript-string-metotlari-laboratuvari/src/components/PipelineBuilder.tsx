import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  ArrowDown,
  Sparkles,
  RotateCcw,
  GitBranch,
} from 'lucide-react';

interface PipelineStep {
  id: string;
  method: 'trim' | 'trimStart' | 'trimEnd' | 'toLowerCase' | 'toUpperCase' | 'slice' | 'replace' | 'replaceAll' | 'padStart' | 'padEnd' | 'repeat';
  arg1?: any;
  arg2?: any;
}

const AVAILABLE_METHODS: Array<{
  value: PipelineStep['method'];
  label: string;
  takesArgs: number;
  arg1Label?: string;
  arg1Default?: any;
  arg2Label?: string;
  arg2Default?: any;
}> = [
  { value: 'trim', label: '.trim()', takesArgs: 0 },
  { value: 'trimStart', label: '.trimStart()', takesArgs: 0 },
  { value: 'trimEnd', label: '.trimEnd()', takesArgs: 0 },
  { value: 'toLowerCase', label: '.toLowerCase()', takesArgs: 0 },
  { value: 'toUpperCase', label: '.toUpperCase()', takesArgs: 0 },
  {
    value: 'slice',
    label: '.slice(start, end)',
    takesArgs: 2,
    arg1Label: 'start',
    arg1Default: 0,
    arg2Label: 'end',
    arg2Default: 20,
  },
  {
    value: 'replace',
    label: '.replace(pattern, new)',
    takesArgs: 2,
    arg1Label: 'pattern',
    arg1Default: ' ',
    arg2Label: 'new',
    arg2Default: '-',
  },
  {
    value: 'replaceAll',
    label: '.replaceAll(pattern, new)',
    takesArgs: 2,
    arg1Label: 'pattern',
    arg1Default: ' ',
    arg2Label: 'new',
    arg2Default: '-',
  },
  {
    value: 'padStart',
    label: '.padStart(length, char)',
    takesArgs: 2,
    arg1Label: 'hedef uzunluk',
    arg1Default: 16,
    arg2Label: 'dolgu',
    arg2Default: '*',
  },
  {
    value: 'padEnd',
    label: '.padEnd(length, char)',
    takesArgs: 2,
    arg1Label: 'hedef uzunluk',
    arg1Default: 20,
    arg2Label: 'dolgu',
    arg2Default: '.',
  },
  {
    value: 'repeat',
    label: '.repeat(count)',
    takesArgs: 1,
    arg1Label: 'tekrar',
    arg1Default: 2,
  },
];

const PRESETS = [
  {
    name: 'SEO URL Slug Üretici',
    initial: '   Enes Öztürk ile 2026 Mimarisi ve Kodlama Sanatı!   ',
    steps: [
      { id: '1', method: 'trim' as const },
      { id: '2', method: 'toLowerCase' as const },
      { id: '3', method: 'replaceAll' as const, arg1: ' ', arg2: '-' },
      { id: '4', method: 'slice' as const, arg1: 0, arg2: 30 },
    ],
  },
  {
    name: 'Kredi Kartı Maskeleme',
    initial: '5528790011223344',
    steps: [
      { id: '1', method: 'slice' as const, arg1: -4, arg2: undefined },
      { id: '2', method: 'padStart' as const, arg1: 16, arg2: '*' },
    ],
  },
  {
    name: 'Telefon Numarası Temizleyici',
    initial: '+90 (555) 123-4567',
    steps: [
      { id: '1', method: 'replaceAll' as const, arg1: ' ', arg2: '' },
      { id: '2', method: 'replaceAll' as const, arg1: '(', arg2: '' },
      { id: '3', method: 'replaceAll' as const, arg1: ')', arg2: '' },
      { id: '4', method: 'replaceAll' as const, arg1: '-', arg2: '' },
    ],
  },
];

export const PipelineBuilder: React.FC = () => {
  const [initialText, setInitialText] = useState<string>(
    '   Enes Öztürk ile 2026 Mimarisi ve Kodlama Sanatı!   '
  );

  const [steps, setSteps] = useState<PipelineStep[]>([
    { id: '1', method: 'trim' },
    { id: '2', method: 'toLowerCase' },
    { id: '3', method: 'replaceAll', arg1: ' ', arg2: '-' },
    { id: '4', method: 'slice', arg1: 0, arg2: 30 },
  ]);

  const [copiedCode, setCopiedCode] = useState(false);

  // Compute step by step transformations
  const pipelineTrace = useMemo(() => {
    let current = initialText;
    const trace: Array<{
      stepId: string;
      method: string;
      input: string;
      output: string;
      codeExpr: string;
    }> = [];

    for (const step of steps) {
      const before = current;
      let expr = `.${step.method}()`;

      try {
        if (step.method === 'trim') current = current.trim();
        else if (step.method === 'trimStart') current = current.trimStart();
        else if (step.method === 'trimEnd') current = current.trimEnd();
        else if (step.method === 'toLowerCase') current = current.toLowerCase();
        else if (step.method === 'toUpperCase') current = current.toUpperCase();
        else if (step.method === 'slice') {
          const s = Number(step.arg1) || 0;
          const e = step.arg2 !== '' && step.arg2 !== undefined ? Number(step.arg2) : undefined;
          current = current.slice(s, e);
          expr = e !== undefined ? `.slice(${s}, ${e})` : `.slice(${s})`;
        } else if (step.method === 'replace') {
          const pat = step.arg1 ?? '';
          const rep = step.arg2 ?? '';
          current = current.replace(pat, rep);
          expr = `.replace(${JSON.stringify(pat)}, ${JSON.stringify(rep)})`;
        } else if (step.method === 'replaceAll') {
          const pat = step.arg1 ?? '';
          const rep = step.arg2 ?? '';
          current = current.replaceAll(pat, rep);
          expr = `.replaceAll(${JSON.stringify(pat)}, ${JSON.stringify(rep)})`;
        } else if (step.method === 'padStart') {
          const len = Number(step.arg1) || current.length;
          const pad = step.arg2 !== undefined ? String(step.arg2) : ' ';
          current = current.padStart(len, pad);
          expr = `.padStart(${len}, ${JSON.stringify(pad)})`;
        } else if (step.method === 'padEnd') {
          const len = Number(step.arg1) || current.length;
          const pad = step.arg2 !== undefined ? String(step.arg2) : ' ';
          current = current.padEnd(len, pad);
          expr = `.padEnd(${len}, ${JSON.stringify(pad)})`;
        } else if (step.method === 'repeat') {
          const c = Math.max(0, Number(step.arg1) || 1);
          current = current.repeat(c);
          expr = `.repeat(${c})`;
        }
      } catch (err: any) {
        current = `[Hata: ${err.message}]`;
      }

      trace.push({
        stepId: step.id,
        method: step.method,
        input: before,
        output: current,
        codeExpr: expr,
      });
    }

    return {
      trace,
      finalOutput: current,
    };
  }, [initialText, steps]);

  // Generate complete chained code expression
  const fullCodeExpression = useMemo(() => {
    const chain = pipelineTrace.trace.map((t) => t.codeExpr).join('');
    return `const cikti = metin${chain};`;
  }, [pipelineTrace]);

  const handleAddStep = () => {
    const newStep: PipelineStep = {
      id: Date.now().toString(),
      method: 'trim',
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const handleUpdateMethod = (id: string, newMethod: PipelineStep['method']) => {
    const meta = AVAILABLE_METHODS.find((m) => m.value === newMethod);
    setSteps(
      steps.map((s) =>
        s.id === id
          ? {
              ...s,
              method: newMethod,
              arg1: meta?.arg1Default,
              arg2: meta?.arg2Default,
            }
          : s
      )
    );
  };

  const handleUpdateArg = (id: string, argKey: 'arg1' | 'arg2', val: any) => {
    setSteps(
      steps.map((s) => (s.id === id ? { ...s, [argKey]: val } : s))
    );
  };

  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setInitialText(preset.initial);
    setSteps(
      preset.steps.map((s, idx) => ({
        ...s,
        id: (idx + 1).toString(),
      }))
    );
  };

  const handleCopy = () => {
    const fullSnippet = `// Enes Öztürk Zincirleme String Hattı\nconst metin = ${JSON.stringify(
      initialText
    )};\n${fullCodeExpression}\nconsole.log(cikti); // "${pipelineTrace.finalOutput}"`;
    navigator.clipboard.writeText(fullSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-mono text-indigo-400 mb-1 tracking-wider uppercase">
          Metot Hattı & Kompozisyon
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Zincirleme Metot Hattı (Method Chainer)
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl leading-relaxed">
          String metotlarını ardışık adımlar halinde zincirleyin (Method Chaining). Her adımda metnin
          nasıl dönüştüğünü ara çıktılarla adım adım izleyin ve tek tıkla üretim seviyesinde kod
          alın.
        </p>

        {/* Presets Row */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 text-xs shrink-0">Hazır Hatlar:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadPreset(p)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Initial Input Field */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">
            Hattın Başlangıç Girdisi (Raw Input)
          </label>
          <button
            onClick={() =>
              setInitialText('   Enes Öztürk ile 2026 Mimarisi ve Kodlama Sanatı!   ')
            }
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Varsayılana Dön</span>
          </button>
        </div>
        <input
          type="text"
          value={initialText}
          onChange={(e) => setInitialText(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-indigo-200 focus:outline-none focus:border-indigo-500"
          placeholder="İşlenecek ham metni yazın..."
        />
      </div>

      {/* Interactive Step Nodes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-slate-300 flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span>İşlem Adımları Sırası ({steps.length} Adım)</span>
          </span>
          <button
            onClick={handleAddStep}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adım Ekle</span>
          </button>
        </div>

        {steps.map((step, index) => {
          const stepTrace = pipelineTrace.trace[index];
          const methodMeta = AVAILABLE_METHODS.find((m) => m.value === step.method);

          return (
            <div key={step.id} className="relative group">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <select
                      value={step.method}
                      onChange={(e) =>
                        handleUpdateMethod(step.id, e.target.value as any)
                      }
                      className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono font-semibold text-indigo-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {AVAILABLE_METHODS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>

                    <span className="text-xs font-mono text-slate-400">
                      {stepTrace?.codeExpr}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveStep(step.id)}
                    className="self-end sm:self-auto p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Adımı Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Method Arguments Inputs if any */}
                {methodMeta && methodMeta.takesArgs > 0 && (
                  <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                    <span className="text-slate-400 font-medium">Parametreler:</span>
                    <div className="flex items-center gap-2">
                      <label className="text-slate-400 font-mono">
                        {methodMeta.arg1Label}:
                      </label>
                      <input
                        type="text"
                        value={step.arg1 ?? ''}
                        onChange={(e) =>
                          handleUpdateArg(step.id, 'arg1', e.target.value)
                        }
                        className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded font-mono text-white text-xs w-28 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {methodMeta.takesArgs > 1 && (
                      <div className="flex items-center gap-2">
                        <label className="text-slate-400 font-mono">
                          {methodMeta.arg2Label}:
                        </label>
                        <input
                          type="text"
                          value={step.arg2 ?? ''}
                          onChange={(e) =>
                            handleUpdateArg(step.id, 'arg2', e.target.value)
                          }
                          className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded font-mono text-white text-xs w-28 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Intermediate Output Display */}
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Ara Çıktı:</span>
                  <span className="text-emerald-300 truncate max-w-xl">
                    "{stepTrace?.output}"
                  </span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center my-1">
                  <ArrowDown className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Aggregated Result & Code Box */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Nihai Zincirleme Sonucu
              </h3>
              <p className="text-xs text-slate-400">
                {steps.length} metot arka arkaya çalıştırıldı.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {pipelineTrace.finalOutput.length} Karakter
          </span>
        </div>

        {/* Final output text */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
          <div className="text-xs text-slate-400 mb-1 font-mono">Sonuç Metni:</div>
          <div className="font-mono text-lg text-emerald-300 break-all select-all">
            "{pipelineTrace.finalOutput}"
          </div>
        </div>

        {/* Complete Generated JS Expression */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              JavaScript Zincirleme Kod Sözdizimi (Copy-ready):
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-indigo-300 overflow-x-auto">
            {fullCodeExpression}
          </pre>
        </div>
      </div>
    </div>
  );
};
