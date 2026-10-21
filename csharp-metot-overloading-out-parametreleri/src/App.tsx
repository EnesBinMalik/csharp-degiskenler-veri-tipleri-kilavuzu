import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OverloadLab } from './components/OverloadLab';
import { OutRefVisualizer } from './components/OutRefVisualizer';
import { SignatureValidator } from './components/SignatureValidator';
import { ConsoleRunner } from './components/ConsoleRunner';
import { QuizSection } from './components/QuizSection';
import { HomeworkSubmission } from './components/HomeworkSubmission';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overloading');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Strict Top Bar Contract Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Educational Flow */}
      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <HeroSection setActiveTab={setActiveTab} />

        {/* Tab navigation pills/segmented buttons */}
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('overloading')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'overloading'
                  ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              1. Metot Overloading
            </button>
            <button
              onClick={() => setActiveTab('out-ref')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'out-ref'
                  ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              2. Out &amp; Ref Aktarım Şeması
            </button>
            <button
              onClick={() => setActiveTab('signature-validator')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'signature-validator'
                  ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              3. İmza Doğrulayıcı (CS0111 Testi)
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'console'
                  ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              4. İnteraktif Konsol
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              5. Bilgi Sınavı
            </button>
            <button
              onClick={() => setActiveTab('submission')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'submission'
                  ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-950/30'
              }`}
            >
              ★ Ödev Teslim Paneli (Enes Öztürk)
            </button>
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="pb-12">
          {activeTab === 'overloading' && <OverloadLab />}
          {activeTab === 'out-ref' && <OutRefVisualizer />}
          {activeTab === 'signature-validator' && <SignatureValidator />}
          {activeTab === 'console' && <ConsoleRunner />}
          {activeTab === 'quiz' && <QuizSection />}
          {activeTab === 'submission' && <HomeworkSubmission />}
        </div>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
