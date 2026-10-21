import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MemoryModelVisualizer } from './components/MemoryModelVisualizer';
import { ArrayDeclarationExplorer } from './components/ArrayDeclarationExplorer';
import { ArrayIndexAccessLab } from './components/ArrayIndexAccessLab';
import { LoopExecutionSimulator } from './components/LoopExecutionSimulator';
import { AlgorithmPlayground } from './components/AlgorithmPlayground';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-slate-950">
      {/* Top Bar adhering to strict 3-zone contract */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartSimulation={() => scrollToSection('donguler')}
          onExploreMemory={() => scrollToSection('bellek')}
        />

        {/* Section 1: Memory Model & Zero-Based Index */}
        <MemoryModelVisualizer />

        {/* Section 2: Array Declarations & 3 C# Forms */}
        <ArrayDeclarationExplorer />

        {/* Section 3: Indexing & Boundary Safety (IndexOutOfRangeException) */}
        <ArrayIndexAccessLab />

        {/* Section 4: For Loop & Array Execution Simulator (Step-by-step C# debugger) */}
        <LoopExecutionSimulator />

        {/* Section 5: Common Array Algorithms (Min/Max, Search, Reverse) */}
        <AlgorithmPlayground />

        {/* Section 6: Knowledge Check Quiz */}
        <QuizSection />
      </main>

      {/* Footer with Enes Öztürk Signature */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
