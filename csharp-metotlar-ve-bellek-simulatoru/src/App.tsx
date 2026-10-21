/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MethodTheorySection } from './components/MethodTheorySection';
import { SyntaxBreakdown } from './components/SyntaxBreakdown';
import { ValueVsRefSection } from './components/ValueVsRefSection';
import { MemorySimulator } from './components/MemorySimulator';
import { CodePlayground } from './components/CodePlayground';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { Footer } from './components/Footer';

export default function App() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header onScrollTo={handleScrollTo} />

      <main className="flex-1">
        <HeroSection onExplore={handleScrollTo} />
        <MethodTheorySection />
        <SyntaxBreakdown />
        <ValueVsRefSection />
        <MemorySimulator />
        <CodePlayground />
        <KnowledgeQuiz />
      </main>

      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
}
