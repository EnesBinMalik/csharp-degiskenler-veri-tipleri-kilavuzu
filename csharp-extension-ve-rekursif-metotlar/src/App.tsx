import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { AuthorCard } from './components/AuthorCard';
import { TheorySection } from './components/TheorySection';
import { RecursionSimulator } from './components/RecursionSimulator';
import { ExtensionPlayground } from './components/ExtensionPlayground';
import { ComparisonSection } from './components/ComparisonSection';
import { QuizSection } from './components/QuizSection';
import { CheatsheetModal } from './components/CheatsheetModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* 1. Header (Strict Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Project attribution */}
        <AuthorCard />

        {/* Tab Views */}
        {activeTab === 'theory' && (
          <TheorySection
            onGoToRecursionSim={() => setActiveTab('recursion')}
            onGoToExtensionLab={() => setActiveTab('extension')}
          />
        )}

        {activeTab === 'recursion' && (
          <RecursionSimulator />
        )}

        {activeTab === 'extension' && (
          <ExtensionPlayground />
        )}

        {activeTab === 'comparison' && (
          <ComparisonSection />
        )}

        {activeTab === 'quiz' && (
          <QuizSection />
        )}

      </main>

      {/* Code Templates Cheatsheet Modal */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* Footer */}
      <Footer onTabChange={setActiveTab} />

    </div>
  );
}
