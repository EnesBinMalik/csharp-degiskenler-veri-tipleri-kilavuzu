import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthorSignature } from './components/AuthorSignature';
import { WhileVisualizer } from './components/WhileVisualizer';
import { ForEachVisualizer } from './components/ForEachVisualizer';
import { ComparisonView } from './components/ComparisonView';
import { Playground } from './components/Playground';
import { QuizSection } from './components/QuizSection';
import { TipsCard } from './components/TipsCard';
import { ActiveTab } from './types';
import { LESSON_CONTENT } from './data/lessonsData';
import { Repeat, ListOrdered, Sparkles, Terminal, Award, Lightbulb, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  // Full lesson notes formatted for clipboard
  const handleCopyNotes = () => {
    const fullNotes = `=========================================
C# DÖNGÜLER REHBERİ: WHILE VE FOREACH
Hazırlayan & Telif: Enes Öztürk
=========================================

1. WHILE DÖNGÜSÜ
----------------
${LESSON_CONTENT.whileSection.definition}

Örnek Kod:
int sayac = 1;
while (sayac <= 5)
{
    Console.WriteLine(sayac);
    sayac++;
}

Açıklama:
${LESSON_CONTENT.whileSection.explanation}


2. FOREACH DÖNGÜSÜ
------------------
${LESSON_CONTENT.forEachSection.definition}

Yazım Şekli:
foreach(değişkenTipi değişkenAdı in diziAdı)
{
    //Komutlar
}

Örnek Kod:
int[] sayiDizisi = {2,4,5,1,2,4};
int toplam = 0 ;

foreach(int i in sayiDizisi)
{
    toplam += i ;
}

Açıklama:
${LESSON_CONTENT.forEachSection.explanation}

=========================================
Hazırlayan: Enes Öztürk
=========================================`;

    navigator.clipboard.writeText(fullNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyNotes={handleCopyNotes}
        copied={copied}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Top Author Signature Banner */}
        <AuthorSignature variant="banner" />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <ComparisonView onSelectLoop={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'while' && (
          <WhileVisualizer />
        )}

        {activeTab === 'foreach' && (
          <ForEachVisualizer />
        )}

        {activeTab === 'playground' && (
          <Playground />
        )}

        {activeTab === 'quiz' && (
          <QuizSection />
        )}

        {activeTab === 'tips' && (
          <TipsCard />
        )}

        {/* Author attribution */}
        <AuthorSignature variant="card" />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p>
              C# Döngüler Rehberi • <strong className="text-slate-300 font-semibold">Hazırlayan: Enes Öztürk</strong>
            </p>
          </div>
          <p className="text-slate-400 font-serif italic text-sm">
            Tüm hakları saklıdır © {new Date().getFullYear()} Enes Öztürk
          </p>
        </div>
      </footer>
    </div>
  );
}
