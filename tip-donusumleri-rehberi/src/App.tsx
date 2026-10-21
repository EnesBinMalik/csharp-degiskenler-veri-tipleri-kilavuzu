import { useState } from 'react';
import { Header, TabType } from './components/Header';
import { ConceptsGuide } from './components/ConceptsGuide';
import { InteractiveLab } from './components/InteractiveLab';
import { BitMemoryVisualizer } from './components/BitMemoryVisualizer';
import { TypeHierarchyMatrix } from './components/TypeHierarchyMatrix';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { DataType, ConversionMethod } from './types/conversion';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('guide');

  // Shared state for transferring presets from guide to the interactive lab
  const [labInitialSource, setLabInitialSource] = useState<DataType>('int');
  const [labInitialTarget, setLabInitialTarget] = useState<DataType>('float');
  const [labInitialValue, setLabInitialValue] = useState<string>('25');
  const [labInitialMethod, setLabInitialMethod] = useState<ConversionMethod>('implicit');

  const handleLoadPreset = (
    source: DataType,
    target: DataType,
    val: string,
    method: ConversionMethod
  ) => {
    setLabInitialSource(source);
    setLabInitialTarget(target);
    setLabInitialValue(val);
    setLabInitialMethod(method);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Header with Navigation and Author Credit */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'guide' && (
          <ConceptsGuide
            onLoadPreset={handleLoadPreset}
            onGoToTab={(tab: TabType) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'lab' && (
          <InteractiveLab
            key={`${labInitialSource}-${labInitialTarget}-${labInitialValue}-${labInitialMethod}`}
            initialSource={labInitialSource}
            initialTarget={labInitialTarget}
            initialValue={labInitialValue}
            initialMethod={labInitialMethod}
          />
        )}

        {activeTab === 'visualizer' && <BitMemoryVisualizer />}

        {activeTab === 'matrix' && <TypeHierarchyMatrix />}

        {activeTab === 'quiz' && <QuizSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
