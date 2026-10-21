import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CoreAssignmentSection } from './components/CoreAssignmentSection.tsx';
import { ComparisonMatrix } from './components/ComparisonMatrix.tsx';
import { FlowchartVisualizer } from './components/FlowchartVisualizer.tsx';
import { InteractivePlayground } from './components/InteractivePlayground.tsx';
import { InteractiveQuiz } from './components/InteractiveQuiz.tsx';
import { HomeworkReportModal } from './components/HomeworkReportModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const scrollToExample = () => {
    const el = document.getElementById('odev-ornegi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Bar with 3-Zone contract */}
      <Header onOpenReport={() => setIsReportOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onScrollToExample={scrollToExample}
          onOpenReport={() => setIsReportOpen(true)}
        />

        <CoreAssignmentSection />

        <FlowchartVisualizer />

        <ComparisonMatrix />

        <InteractivePlayground />

        <InteractiveQuiz />
      </main>

      {/* Footer */}
      <Footer onOpenReport={() => setIsReportOpen(true)} />

      {/* Printable & Exportable Enes Öztürk Homework Report Modal */}
      <HomeworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
