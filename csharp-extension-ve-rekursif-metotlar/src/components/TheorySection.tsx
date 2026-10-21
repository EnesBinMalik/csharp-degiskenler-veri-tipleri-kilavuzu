import React, { useState } from 'react';
import { extensionTheory, recursionTheory, authorData } from '../data/theoryContent';
import { Copy, Check, BookOpen, Layers, ArrowRight, AlertTriangle, ShieldCheck, Cpu, Code2 } from 'lucide-react';

interface TheorySectionProps {
  onGoToRecursionSim: () => void;
  onGoToExtensionLab: () => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({
  onGoToRecursionSim,
  onGoToExtensionLab
}) => {
  const [activeTopic, setActiveTopic] = useState<'all' | 'extension' | 'recursion'>('all');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-12">

      {/* Hero Intro */}
      <section className="relative">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>C# Programlama Dili</span>
          <span aria-hidden="true">·</span>
          <span>İleri Düzey Metot Yapıları</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-400">Türkçe Eğitim Rehberi</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Extension ve Rekürsif Metotlar Rehberi
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          C# dünyasında kod tekrarını azaltmaya yardımcı olan akıcı <strong>Extension Metotlar</strong> ile <strong>Rekürsif Fonksiyonların</strong> çağrı akışlarını, kullanım alanlarını ve temel tasarım ilkelerini keşfedin.
        </p>

        {/* Filter Controls (Segmented Tabs) */}
        <div className="mt-6 flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit">
          <button
            onClick={() => setActiveTopic('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTopic === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tüm Konular
          </button>
          <button
            onClick={() => setActiveTopic('extension')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTopic === 'extension'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Extension Metotlar
          </button>
          <button
            onClick={() => setActiveTopic('recursion')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTopic === 'recursion'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Rekürsif Metotlar
          </button>
        </div>
      </section>

      {/* Part 1: Extension Metotlar */}
      {(activeTopic === 'all' || activeTopic === 'extension') && (
        <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Bölüm 1: Genişletilebilir Mimari
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {extensionTheory.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {extensionTheory.subtitle}
              </p>
            </div>

            <button
              onClick={onGoToExtensionLab}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>Extension Laboratuvarını Aç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
            <p className="text-base text-slate-200">
              {extensionTheory.introduction}
            </p>
          </div>

          {/* 3 Golden Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Extension Metot Yazarken Dikkat Edilmesi Gereken 3 Altın Kural</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extensionTheory.rules.map((rule) => (
                <div key={rule.ruleNumber} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-sm flex items-center justify-center mb-3">
                      {rule.ruleNumber}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{rule.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{rule.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <code className="text-[11px] font-mono text-cyan-300 bg-slate-900 px-2 py-1 rounded block truncate">
                      {rule.code}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example from Prompt */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span>Örnek Metot: IsEvenNumber (Çift Sayı Kontrolü)</span>
              </h3>
              <button
                onClick={() => copyToClipboard(extensionTheory.promptExampleCode, 'prompt_ext')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors cursor-pointer"
              >
                {copiedSnippet === 'prompt_ext' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'prompt_ext' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-slate-200 leading-relaxed">
                <code>
                  <span className="text-purple-400">public static class</span> <span className="text-amber-300">MyExtensionClass</span>{'\n'}
                  {'{'}{'\n'}
                  {'    '}<span className="text-purple-400">public static bool</span> <span className="text-blue-400">IsEvenNumber</span>(<span className="text-purple-400">this int</span> <span className="text-cyan-200">value</span>){'\n'}
                  {'    '}{'{'}{'\n'}
                  {'        '}<span className="text-purple-400">if</span> (value % 2 == 0){'\n'}
                  {'            '}<span className="text-purple-400">return true</span>;{'\n'}
                  {'        '}<span className="text-purple-400">else</span>{'\n'}
                  {'            '}<span className="text-purple-400">return false</span>;{'\n'}
                  {'    '}{'}'}{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            {/* Practical Usage */}
            <div className="bg-cyan-950/20 border border-cyan-800/40 rounded-xl p-4">
              <div className="text-xs font-semibold text-cyan-300 mb-2">Örnek Kullanım ve Derleyici Mekanizması:</div>
              <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
                <code>
                  <span className="text-purple-400">int</span> deger = 123;{'\n'}
                  <span className="text-purple-400">bool</span> isEven = deger.<span className="text-blue-400">IsEvenNumber</span>(); <span className="text-slate-400">// false döner</span>{'\n\n'}
                  <span className="text-slate-400">// Yaklaşık olarak şu static metot çağrısına eşdeğerdir:</span>{'\n'}
                  <span className="text-slate-400">// bool isEven = MyExtensionClass.IsEvenNumber(deger);</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Workflow Guide */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Enes Öztürk'ün Tavsiyesi: Extension Metot Yazma İş Akışı</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              {extensionTheory.workflow.map((step, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/70">
                  {step}
                </div>
              ))}
            </div>
          </div>

        </article>
      )}

      {/* Part 2: Rekürsif Metotlar */}
      {(activeTopic === 'all' || activeTopic === 'recursion') && (
        <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Bölüm 2: Öz-Yinelemeli Algoritmalar
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {recursionTheory.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {recursionTheory.subtitle}
              </p>
            </div>

            <button
              onClick={onGoToRecursionSim}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>Call Stack Simülatörünü Aç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
            <p className="text-base text-slate-200">
              {recursionTheory.introduction}
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recursionTheory.mechanics.map((mech, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                    0{idx + 1}. İlke
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{mech.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{mech.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* StackOverflowException Warning Callout (Anti-slop clean hairline border) */}
          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-rose-200">
                Derin Rekürsiyon ve Çağrı Yığını Riski
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rekürsif çağrılar, uygulamanın çağrı zincirini derinleştirebilir. Zincir sonlanmazsa veya çok derinleşirse çalışma ortamının sınırı aşılabilir ve <code>StackOverflowException</code> gibi ciddi bir hata oluşabilir. Gerçek yığın boyutu ve çağrı başına kullanım sabit değildir. Bu sayfadaki görseller kavramsaldır; CLR'yi çalıştırmaz veya gerçek bellek kullanımını ölçmez.
              </p>
            </div>
          </div>

          {/* Fibonacci Code from Prompt */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Örnek Metot: FibonacciSerisi(int sayi)</span>
              </h3>
              <button
                onClick={() => copyToClipboard(recursionTheory.fibonacciCode, 'fib_code')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors cursor-pointer"
              >
                {copiedSnippet === 'fib_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'fib_code' ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-slate-200 leading-relaxed">
                <code>
                  <span className="text-purple-400">static int</span> <span className="text-blue-400">FibonacciSerisi</span>(<span className="text-purple-400">int</span> <span className="text-cyan-200">sayi</span>){'\n'}
                  {'{'}{'\n'}
                  {'    '}<span className="text-purple-400">if</span> (sayi == 0){'\n'}
                  {'        '}<span className="text-purple-400">return 0</span>;{'\n'}
                  {'    '}<span className="text-purple-400">else if</span> (sayi == 1){'\n'}
                  {'        '}<span className="text-purple-400">return 1</span>;{'\n'}
                  {'    '}<span className="text-purple-400">else</span>{'\n'}
                  {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">FibonacciSerisi</span>(sayi - 1) + <span className="text-blue-400">FibonacciSerisi</span>(sayi - 2);{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            {/* Paper Exercise Note */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span className="text-cyan-400 font-semibold">Tavsiye: </span>
                {recursionTheory.paperExerciseAdvice}
              </div>
              <button
                onClick={onGoToRecursionSim}
                className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
              >
                Görsel Simülatörde Canlandır
              </button>
            </div>
          </div>

        </article>
      )}

    </div>
  );
};
