import React, { useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VariableIntroSection } from './components/VariableIntroSection';
import { SyntaxAndRulesSection } from './components/SyntaxAndRulesSection';
import { DateTimeSection } from './components/DateTimeSection';
import { StringSection } from './components/StringSection';
import { InteractiveConsole } from './components/InteractiveConsole';
import { QuizSection } from './components/QuizSection';
import { AuthorSignatureFooter } from './components/AuthorSignatureFooter';

export default function App() {
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    const el = document.getElementById('test');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStart = () => {
    const el = document.getElementById('degisken-nedir');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3-Zone Top Bar */}
      <Header onOpenQuiz={scrollToQuiz} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onStartExplore={scrollToStart} onOpenQuiz={scrollToQuiz} />

        {/* Section 1: Değişken Nedir? & Char vs String Bellek Mimarisi */}
        <VariableIntroSection />

        {/* Section 2: Değişken Tanımlama Yapısı & 6 Altın Kural & Canlı Denetleyici */}
        <SyntaxAndRulesSection />

        {/* Section 3: DateTime Kütüphanesi & Microsoft Docs */}
        <DateTimeSection />

        {/* Section 4: String Kütüphanesi & Microsoft Docs */}
        <StringSection />

        {/* Section 5: İnteraktif C# Konsol Simülatörü */}
        <InteractiveConsole />

        {/* Section 6: Bilgi Testi & İmzalı Başarı Sertifikası */}
        <QuizSection />
      </main>

      {/* Footer & Author Enes Öztürk Signature Block */}
      <AuthorSignatureFooter />
    </div>
  );
}
