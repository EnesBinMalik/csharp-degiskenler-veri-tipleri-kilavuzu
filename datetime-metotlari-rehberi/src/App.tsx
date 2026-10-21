import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MethodCatalog } from './components/MethodCatalog';
import { LiveSandbox } from './components/LiveSandbox';
import { DateCalculator } from './components/DateCalculator';
import { WorldTimezones } from './components/WorldTimezones';
import { LanguageComparison } from './components/LanguageComparison';
import { BestPractices } from './components/BestPractices';
import { Footer } from './components/Footer';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DateTime App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h2 className="text-xl font-bold text-amber-400">DateTime Metotlar</h2>
            <p className="text-sm text-slate-300">
              Uygulama çalıştırılırken bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg hover:bg-amber-300 transition-colors"
            >
              Yeniden Yükle
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalog');

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'catalog') {
      scrollToSection('metot-katalogu', 'catalog');
    } else if (tab === 'sandbox') {
      scrollToSection('canli-laboratuvar', 'sandbox');
    } else if (tab === 'calculator') {
      scrollToSection('zaman-hesaplayici', 'calculator');
    } else if (tab === 'timezones') {
      scrollToSection('dunya-saatleri', 'timezones');
    } else if (tab === 'crosslang') {
      scrollToSection('coklu-dil-karsilastirma', 'crosslang');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {/* Sticky Header with 3-Zone Contract */}
        <Header activeTab={activeTab} setActiveTab={handleNavClick} />

        {/* Main Content Areas */}
        <main className="flex-1">
          {/* Hero with Real-Time Clock & Rotating Chronometer */}
          <HeroSection
            onExploreClick={() => scrollToSection('metot-katalogu', 'catalog')}
            onSandboxClick={() => scrollToSection('canli-laboratuvar', 'sandbox')}
          />

          {/* 1. Method Catalog with Live Code Execution */}
          <MethodCatalog />

          {/* 2. Interactive Live Algorithm Sandbox */}
          <LiveSandbox />

          {/* 3. Comprehensive Date Calculator & Format Generator */}
          <DateCalculator />

          {/* 4. World Timezones & Interactive Hour Scrubber */}
          <WorldTimezones />

          {/* 5. Cross-Language DateTime Matrix (JS, C#, Python, SQL) */}
          <LanguageComparison />

          {/* 6. Enes Öztürk's Golden Rules & Best Practices */}
          <BestPractices />
        </main>

        {/* Footer with Enes Öztürk Signature */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
