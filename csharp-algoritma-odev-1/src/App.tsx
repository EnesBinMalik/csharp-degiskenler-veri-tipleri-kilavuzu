import React, { useState } from 'react';
import { Header } from './components/Header';
import { TerminalConsole } from './components/TerminalConsole';
import { Visualizer } from './components/Visualizer';
import { CodeViewer } from './components/CodeViewer';
import { AlgorithmNotes } from './components/AlgorithmNotes';
import { SignatureCard } from './components/SignatureCard';
import { Terminal, Eye, Code, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'visualizer' | 'code' | 'notes'>('terminal');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar adhering to 3-zone contract */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>C# 101 DERSİ</span>
              <span className="text-slate-600">·</span>
              <span>PATİKA.DEV ALGORİTMA PRATİKLERİ</span>
              <span className="text-slate-600">·</span>
              <span>ENES ÖZTÜRK TARAFINDAN HAZIRLANDI</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-100" style={{ textWrap: 'balance' }}>
              C# Ödev 1: Algoritma Soruları & İnteraktif Konsol
            </h1>

            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Kullanıcıdan alınan sayılar ve kelimeler üzerinde çift sayı filtreleme, $m$'e bölünebilme,
              dizi ters sıralama ve cümledeki kelime/harf sayımı algoritmalarının tarayıcı simülasyonu. Etkileşimli konsol C# kodunu çalıştırmaz; kaynak kodunu indirip .NET SDK ile ayrıca çalıştırabilirsiniz.
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'terminal'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Konsol</span>
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'visualizer'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Görsel Analiz</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>C# Kodları</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notlar</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="flex-1">
          {activeTab === 'terminal' && <TerminalConsole />}
          {activeTab === 'visualizer' && <Visualizer />}
          {activeTab === 'code' && <CodeViewer />}
          {activeTab === 'notes' && <AlgorithmNotes />}
        </div>

        {/* Attribution */}
        <SignatureCard />
      </main>

      {/* Footer adhering strictly to Anti-Slop (No fake telemetry tickers) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>C# 101 Algoritma Ödev 1</span>
            <span aria-hidden="true">·</span>
            <span>Hazırlayan: <strong className="text-slate-300 font-semibold">Enes Öztürk</strong></span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Tarayıcı tabanlı eğitim simülasyonu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
