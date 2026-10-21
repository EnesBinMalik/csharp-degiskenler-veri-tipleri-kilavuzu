import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Simulator } from './components/Simulator';
import { LessonNotes } from './components/LessonNotes';
import { Flowchart } from './components/Flowchart';
import { Quiz } from './components/Quiz';
import { AuthorSignature } from './components/AuthorSignature';
import { Play, BookOpen, GitBranch, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'lessons' | 'flowchart' | 'quiz'>('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar following contract */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Hero Header */}
      <Hero
        onStartSimulator={() => setActiveTab('simulator')}
        onReadLessons={() => setActiveTab('lessons')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Döngü Simülatörü</span>
            </button>

            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'lessons'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Konu Anlatımı & Notlar</span>
            </button>

            <button
              onClick={() => setActiveTab('flowchart')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'flowchart'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Akış Şeması (Flowchart)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Test & Alıştırma</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <span>Yazar:</span>
            <span className="font-semibold text-slate-300">Enes Öztürk</span>
          </div>
        </div>

        {/* Tab Viewport */}
        <div>
          {activeTab === 'simulator' && <Simulator onGoToFlowchart={() => setActiveTab('flowchart')} />}
          {activeTab === 'lessons' && <LessonNotes />}
          {activeTab === 'flowchart' && <Flowchart />}
          {activeTab === 'quiz' && <Quiz />}
        </div>
      </main>

      {/* Signature Footer */}
      <AuthorSignature />
    </div>
  );
}
