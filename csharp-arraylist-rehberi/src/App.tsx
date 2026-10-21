import React, { useState } from 'react';
import { ArticleView } from './components/ArticleView';
import { CapacityVisualizer } from './components/CapacityVisualizer';
import { TypeSafetyDemo } from './components/TypeSafetyDemo';
import { CodePlayground } from './components/CodePlayground';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { AuthorSignature } from './components/AuthorSignature';
import {
  BookOpen,
  Layers,
  ShieldAlert,
  Terminal,
  HelpCircle,
  Sparkles,
  Boxes,
  Code2,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'article' | 'visualizer' | 'typesafety' | 'playground' | 'quiz'
  >('article');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Subject */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">ArrayList Nedir?</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-md font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  C# .NET
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Dinamik Diziler & Bellek Yönetimi Rehberi
              </p>
            </div>
          </div>

          {/* Author attribution in Navbar */}
          <div className="flex items-center gap-3">
            <AuthorSignature variant="inline" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-900">
            <button
              onClick={() => setActiveTab('article')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'article'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Makale & Anlatım</span>
            </button>

            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'visualizer'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Kapasite Laboratuvarı (4➔8)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500/20 text-amber-300 font-mono">
                Canlı
              </span>
            </button>

            <button
              onClick={() => setActiveTab('typesafety')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'typesafety'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Tip Güvenliği & Risk Simülatörü</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'playground'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>C# Konsol & Kod</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Bilgi Testi</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Highlights Strip */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Örnek büyüme:</span>
            <span className="text-slate-300">Boş kapasite 0 | İlk öğede genellikle 4 | Sonrasında uygulamaya bağlı artış</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="hidden sm:inline">ArrayList dizi = new ArrayList();</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">dizi.Add("Kedi"); dizi.Add(99); dizi.Add(true);</span>
            <span>•</span>
            <span className="text-indigo-400">Yazar: Enes Öztürk</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'article' && (
          <ArticleView
            onNavigateToSimulator={() => setActiveTab('visualizer')}
            onNavigateToTypeSafety={() => setActiveTab('typesafety')}
          />
        )}

        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-indigo-400" />
                  Dinamik Kapasite & Bellek Simülatörü
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enes Öztürk'ün belirttiği gibi: Başlangıçta 4 slot ayrılır. 5. eleman eklendiğinde arka planda kapasite 8'e katlanır!
                </p>
              </div>
              <AuthorSignature variant="compact" />
            </div>
            <CapacityVisualizer />
          </div>
        )}

        {activeTab === 'typesafety' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-rose-400" />
                  Tip Güvenliği Riski & Boxing / Unboxing
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  "Listeden okuduğunuz verinin tipini bilmemek güvenli bir yaklaşım değildir. Tip dönüşümleri sırasında hata ihtimalini arttırır." — Enes Öztürk
                </p>
              </div>
              <AuthorSignature variant="compact" />
            </div>
            <TypeSafetyDemo />
          </div>
        )}

        {activeTab === 'playground' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-emerald-400" />
                  C# Kod Editörü & Canlı Konsol Terminali
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enes Öztürk'ün kod örneklerini çalıştırın, kapasite büyümesini ve runtime hatalarını inceleyin.
                </p>
              </div>
              <AuthorSignature variant="compact" />
            </div>
            <CodePlayground />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <KnowledgeQuiz />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-400 font-bold font-mono text-xs">
              EÖ
            </div>
            <div>
              <p className="text-slate-300 font-medium">
                ArrayList Nedir? — Enes Öztürk
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                C# & .NET Koleksiyonlar Eğitim ve İnteraktif Görselleştirme Projesi
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-400">System.Collections.ArrayList</span>
            <span>•</span>
            <span className="text-emerald-400">Dinamik Boyutlandırma</span>
            <span>•</span>
            <span className="text-amber-400">Boxing & Unboxing</span>
            <span>•</span>
            <span className="text-indigo-400">List&lt;T&gt; Alternatifi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
