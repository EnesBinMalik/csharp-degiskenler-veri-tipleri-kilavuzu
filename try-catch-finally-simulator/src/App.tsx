import React, { useState } from 'react';
import { Header } from './components/Header';
import { SimulatorView } from './components/Simulator/SimulatorView';
import { LogicErrorsView } from './components/LogicErrors/LogicErrorsView';
import { BugHunterView } from './components/BugHunter/BugHunterView';
import { BestPracticesView } from './components/BestPractices/BestPracticesView';
import { EnesManifestoModal } from './components/EnesManifestoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'logic-errors' | 'bug-hunter' | 'best-practices'>('simulator');
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenManifesto={() => setIsManifestoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'simulator' && (
          <SimulatorView onOpenManifesto={() => setIsManifestoOpen(true)} />
        )}
        {activeTab === 'logic-errors' && <LogicErrorsView />}
        {activeTab === 'bug-hunter' && <BugHunterView />}
        {activeTab === 'best-practices' && <BestPracticesView />}
      </main>

      {/* Footer with Enes Öztürk Signature */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-xs">
              {'<T>'}
            </div>
            <span className="text-slate-300 font-medium">
              Try-Catch-Finally ve Mantıksal Hatalar Simülatörü
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400">Enes Öztürk tarafından hazırlandı</span>
          </div>

          <p className="text-center md:text-right text-slate-400 max-w-md">
            "Yazdığımız kod bloğunun açıklarını düşünmemiz ve bu açıklar için önlemler alıyor olmamız gerekiyor."
          </p>
        </div>
        <p className="mt-4 text-center text-slate-600">
          © 2026 Enes Öztürk. Tüm hakları saklıdır.
        </p>
      </footer>

      {/* Manifesto Modal */}
      <EnesManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />
    </div>
  );
}
