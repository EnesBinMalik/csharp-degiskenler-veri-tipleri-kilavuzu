/** JavaScript String metotları laboratuvarı. */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MethodLab } from './components/MethodLab';
import { CharacterInspector } from './components/CharacterInspector';
import { PipelineBuilder } from './components/PipelineBuilder';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CodeChallenges } from './components/CodeChallenges';
import { CheatSheetModal } from './components/CheatSheetModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'lab' | 'inspector' | 'pipeline' | 'comparison' | 'challenges'
  >('lab');
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'lab' && <MethodLab />}
        {activeTab === 'inspector' && <CharacterInspector />}
        {activeTab === 'pipeline' && <PipelineBuilder />}
        {activeTab === 'comparison' && <ComparisonMatrix />}
        {activeTab === 'challenges' && <CodeChallenges />}
      </main>

      <Footer
        setActiveTab={setActiveTab}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
}
