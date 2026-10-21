import React, { useState, useCallback } from 'react';
import { ArrayElement, DataType, ExecutionLog, MethodKey } from './types/arrayTypes';
import { Header } from './components/Header';
import { ArrayMemoryVisualizer } from './components/ArrayMemoryVisualizer';
import { MethodControls } from './components/MethodControls';
import { ConsoleOutput } from './components/ConsoleOutput';
import { CSharpCodeViewer } from './components/CSharpCodeViewer';
import { MethodGuideView } from './components/MethodGuideView';
import { QuizSection } from './components/QuizSection';
import { MemoryDeepDive } from './components/MemoryDeepDive';
import { Sparkles, Terminal, Code, Cpu } from 'lucide-react';

// Initial prompt values: { 1, 3, 4, 9, 8, 7 }
const INITIAL_PROMPT_ARRAY = [1, 3, 4, 9, 8, 7];

export default function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'guide' | 'quiz' | 'architecture'>('playground');
  const [dataType, setDataType] = useState<DataType>('int');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [lastActionCode, setLastActionCode] = useState<string>('// Henüz metot çalıştırılmadı');

  // Visualizer temporary animation states
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null);
  const [clearedRange, setClearedRange] = useState<{ start: number; count: number } | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [mirrorCenter, setMirrorCenter] = useState<number | null>(null);

  const makeElements = useCallback((values: (number | string | null)[]): ArrayElement[] => {
    return values.map((val, idx) => {
      return {
        id: `el-${idx}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        value: val,
        status: 'default',
        originalIndex: idx
      };
    });
  }, []);

  const [elements, setElements] = useState<ArrayElement[]>(() => makeElements(INITIAL_PROMPT_ARRAY));

  // Console Execution Logs
  const [logs, setLogs] = useState<ExecutionLog[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString('tr-TR'),
      code: 'int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };',
      output: 'Tarayıcı simülasyonu hazır. Length: 6, Tip: System.Int32[]\nEnes Öztürk C# Laboratuvarına Hoş Geldiniz!',
      type: 'info'
    }
  ]);

  const addLog = (code: string, output: string, type: 'info' | 'success' | 'warn' | 'result' = 'info', method?: MethodKey) => {
    const newLog: ExecutionLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
      code,
      output,
      type,
      method
    };
    setLogs(prev => [...prev, newLog]);
  };

  // Reset to prompt example { 1, 3, 4, 9, 8, 7 }
  const handleResetToPromptExample = () => {
    const initialElements = makeElements(INITIAL_PROMPT_ARRAY);
    setDataType('int');
    setElements(initialElements);
    setActiveMethod(null);
    setScanningIndex(null);
    setComparingIndices(null);
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(null);
    setLastActionCode('int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };');
    addLog(
      'int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };',
      'Dizi başlangıç durumuna sıfırlandı: { 1, 3, 4, 9, 8, 7 }',
      'info'
    );
  };

  // Method 1: Array.Sort
  const handleSort = (descending = false) => {
    if (elements.length === 0) return;
    setIsAnimating(true);
    setActiveMethod(descending ? 'Array.Sort + Reverse' : 'Array.Sort');
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(null);

    // Copy array
    const sortedVals = [...elements.map(e => e.value)].sort((a, b) => {
      if (a === null || b === null) {
        return a === b ? 0 : a === null ? -1 : 1;
      }
      if (typeof a === 'number' && typeof b === 'number') {
        return descending ? b - a : a - b;
      }
      const strA = String(a).toLocaleLowerCase('tr-TR');
      const strB = String(b).toLocaleLowerCase('tr-TR');
      return descending ? strB.localeCompare(strA, 'tr-TR') : strA.localeCompare(strB, 'tr-TR');
    });

    const newElems = makeElements(sortedVals);
    setElements(newElems);

    const codeSnippet = descending
      ? 'Array.Sort(sayiDizisi);\n            Array.Reverse(sayiDizisi);'
      : 'Array.Sort(sayiDizisi);';
    setLastActionCode(codeSnippet);

    const formattedList = '{ ' + sortedVals.join(', ') + ' }';
    addLog(
      codeSnippet,
      `Dizi sıralandı (${descending ? 'Büyükten Küçüğe' : 'Küçükten Büyüğe'}).\nSonuç: ${formattedList}`,
      'success',
      'Sort'
    );

    setTimeout(() => {
      setIsAnimating(false);
      setActiveMethod(null);
    }, 600);
  };

  // Method 2: Array.Clear
  const handleClear = (startIndex: number, length: number) => {
    if (elements.length === 0) return;
    setIsAnimating(true);
    setActiveMethod('Array.Clear');
    setFoundIndex(null);
    setMirrorCenter(null);

    // Validate bounds
    const validStart = Math.max(0, Math.min(startIndex, elements.length - 1));
    const validCount = Math.max(0, Math.min(length, elements.length - validStart));

    setClearedRange({ start: validStart, count: validCount });

    const defaultValue = dataType === 'int' ? 0 : null;

    const updated = elements.map((el, idx) => {
      if (idx >= validStart && idx < validStart + validCount) {
        return {
          ...el,
          value: defaultValue,
          status: 'cleared' as const
        };
      }
      return el;
    });

    setElements(updated);

    const codeSnippet = `Array.Clear(sayiDizisi, ${validStart}, ${validCount});`;
    setLastActionCode(codeSnippet);

    const resultList = '{ ' + updated.map(e => e.value ?? 'null').join(', ') + ' }';
    addLog(
      codeSnippet,
      `${validStart}. indexten başlayarak ${validCount} adet eleman temizlendi (${defaultValue} yapıldı).\nDizi boyutu değişmedi (Length: ${elements.length}).\nSonuç: ${resultList}`,
      'warn',
      'Clear'
    );

    setTimeout(() => {
      setIsAnimating(false);
      setActiveMethod(null);
      // Keep clearedRange briefly visible for educational clarity
    }, 1200);
  };

  // Method 3: Array.Reverse
  const handleReverse = () => {
    if (elements.length === 0) return;
    setIsAnimating(true);
    setActiveMethod('Array.Reverse');
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(elements.length / 2);

    const reversedVals = [...elements.map(e => e.value)].reverse();
    const newElems = makeElements(reversedVals);
    setElements(newElems);

    const codeSnippet = 'Array.Reverse(sayiDizisi);';
    setLastActionCode(codeSnippet);

    const resultList = '{ ' + reversedVals.join(', ') + ' }';
    addLog(
      codeSnippet,
      `Dizi aynalandı / tersyüz edildi.\nİlk eleman sonuncu, son eleman ilk eleman oldu.\nSonuç: ${resultList}`,
      'success',
      'Reverse'
    );

    setTimeout(() => {
      setIsAnimating(false);
      setActiveMethod(null);
      setMirrorCenter(null);
    }, 1200);
  };

  // Method 4: Array.IndexOf (with animated scanner)
  const handleIndexOf = (targetValue: number | string) => {
    if (elements.length === 0) return;
    setIsAnimating(true);
    setActiveMethod('Array.IndexOf');
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(null);

    let currentIndex = 0;
    const targetStr = String(targetValue).trim();

    // Scan through indices step-by-step
    const interval = setInterval(() => {
      if (currentIndex >= elements.length) {
        clearInterval(interval);
        setScanningIndex(null);
        setIsAnimating(false);
        setActiveMethod(null);

        // Not found
        const codeSnippet = `int index = Array.IndexOf(sayiDizisi, ${targetValue});`;
        setLastActionCode(codeSnippet);
        addLog(
          codeSnippet,
          `Değer (${targetValue}) dizide bulunamadı!\nC# Array.IndexOf metodu -1 değerini döndürdü.`,
          'warn',
          'IndexOf'
        );
        return;
      }

      setScanningIndex(currentIndex);

      if (String(elements[currentIndex].value) === targetStr) {
        clearInterval(interval);
        setFoundIndex(currentIndex);
        setScanningIndex(null);
        setIsAnimating(false);
        setActiveMethod(null);

        const codeSnippet = `int index = Array.IndexOf(sayiDizisi, ${targetValue});`;
        setLastActionCode(codeSnippet);
        addLog(
          codeSnippet,
          `Aranan "${targetValue}" değeri bulundu!\nDöndürülen İndeks: ${currentIndex} (sayiDizisi[${currentIndex}])`,
          'success',
          'IndexOf'
        );
      } else {
        currentIndex++;
      }
    }, 280);
  };

  // Method 5: Array.Resize
  const handleResize = (newSize: number) => {
    setIsAnimating(true);
    setActiveMethod('Array.Resize');
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(null);

    const oldLength = elements.length;
    let newValues: (number | string | null)[] = [];
    const defaultValue = dataType === 'int' ? 0 : null;

    if (newSize < 0 || !Number.isInteger(newSize)) {
      setIsAnimating(false);
      setActiveMethod(null);
      return;
    }

    if (newSize > oldLength) {
      // Growing: copy old values, pad with defaults
      newValues = [...elements.map(e => e.value)];
      for (let i = oldLength; i < newSize; i++) {
        newValues.push(defaultValue);
      }
    } else {
      // Shrinking: truncate
      newValues = elements.slice(0, newSize).map(e => e.value);
    }

    const newElems = makeElements(newValues);
    // Mark newly added elements
    if (newSize > oldLength) {
      for (let i = oldLength; i < newSize; i++) {
        newElems[i].status = 'newly-added';
      }
    }
    setElements(newElems);

    const codeSnippet = `Array.Resize<${dataType}>(ref sayiDizisi, ${newSize});`;
    setLastActionCode(codeSnippet);

    const resultList = '{ ' + newValues.map(value => value ?? 'null').join(', ') + ' }';
    let commentary = '';
    if (newSize > oldLength) {
      commentary = `Dizi ${oldLength} elemandan ${newSize} elemana genişletildi.\nArray.Resize davranışı tarayıcıda simüle edildi.\nYeni hücreler türün varsayılan değerini (${defaultValue}) gösterir.\n"ref" parametresi dizi değişkeninin yeni diziye atanmasını sağlar.\nSonuç: ${resultList}`;
    } else {
      commentary = `Dizi ${oldLength} elemandan ${newSize} elemana küçültüldü.\nSondaki ${oldLength - newSize} eleman kırpıldı.\nSonuç: ${resultList}`;
    }

    addLog(codeSnippet, commentary, 'success', 'Resize');

    setTimeout(() => {
      setIsAnimating(false);
      setActiveMethod(null);
    }, 800);
  };

  // Direct element assignment: sayiDizisi[index] = value;
  const handleSetElement = (index: number, value: number | string) => {
    if (index < 0 || index >= elements.length) {
      addLog(
        `sayiDizisi[${index}] = ${value};`,
        `Hata: IndexOutOfRangeException! Dizi boyutu ${elements.length}, verilen indeks (${index}) sınırların dışında.`,
        'warn'
      );
      return;
    }

    const updated = elements.map((el, idx) => {
      if (idx === index) {
        return { ...el, value, status: 'highlight' as const };
      }
      return el;
    });

    setElements(updated);

    const codeSnippet = `sayiDizisi[${index}] = ${dataType === 'string' ? `"${value}"` : value};`;
    setLastActionCode(codeSnippet);

    addLog(
      codeSnippet,
      `${index}. indeksteki eleman "${value}" olarak güncellendi.`,
      'info'
    );
  };

  // Load Presets
  const handleLoadPreset = (
    preset: 'prompt' | 'names' | 'random' | 'custom',
    customValues?: (number | string)[],
    type: DataType = 'int'
  ) => {
    let vals: (number | string)[] = [];
    let selType: DataType = type;

    if (preset === 'prompt') {
      vals = [1, 3, 4, 9, 8, 7];
      selType = 'int';
    } else if (preset === 'names') {
      vals = ['Ahmet', 'Zeynep', 'Can', 'Burak', 'Elif'];
      selType = 'string';
    } else if (preset === 'random') {
      vals = [42, 17, 88, 5, 23, 99];
      selType = 'int';
    } else if (preset === 'custom' && customValues) {
      vals = customValues;
      selType = type;
    }

    setDataType(selType);
    const newElems = makeElements(vals);
    setElements(newElems);
    setActiveMethod(null);
    setScanningIndex(null);
    setComparingIndices(null);
    setClearedRange(null);
    setFoundIndex(null);
    setMirrorCenter(null);

    const codeSnippet = `${selType}[] sayiDizisi = { ${vals.map(v => selType === 'string' ? `"${v}"` : v).join(', ')} };`;
    setLastActionCode(codeSnippet);
    addLog(codeSnippet, `Dizi yüklendi: { ${vals.join(', ')} }`, 'info');
  };

  // Handler for jumping from Guide to Lab
  const handleTryMethodInPlayground = (method: MethodKey) => {
    setActiveTab('playground');
    // Preload appropriate state
    if (method === 'Sort') {
      handleLoadPreset('prompt');
      setTimeout(() => handleSort(false), 300);
    } else if (method === 'Clear') {
      handleLoadPreset('prompt');
      setTimeout(() => handleClear(2, 2), 300);
    } else if (method === 'Reverse') {
      handleLoadPreset('prompt');
      setTimeout(() => handleReverse(), 300);
    } else if (method === 'IndexOf') {
      handleLoadPreset('prompt');
      setTimeout(() => handleIndexOf(7), 300);
    } else if (method === 'Resize') {
      handleLoadPreset('prompt');
      setTimeout(() => handleResize(12), 300);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetToPromptExample={handleResetToPromptExample}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: İnteraktif Laboratuvar (Visual Playground) */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            {/* Visualizer Area */}
            <ArrayMemoryVisualizer
              elements={elements}
              dataType={dataType}
              activeMethod={activeMethod}
              scanningIndex={scanningIndex}
              comparingIndices={comparingIndices}
              clearedRange={clearedRange}
              foundIndex={foundIndex}
              mirrorCenter={mirrorCenter}
              onElementClick={(idx) => {
                const cur = elements[idx]?.value;
                const promptVal = window.prompt(`${idx}. indeks için yeni değer girin:`, String(cur));
                if (promptVal !== null) {
                  const parsed = dataType === 'int' ? Number(promptVal) : promptVal;
                  handleSetElement(idx, parsed);
                }
              }}
            />

            {/* Interactive Method Controls */}
            <MethodControls
              onSort={handleSort}
              onClear={handleClear}
              onReverse={handleReverse}
              onIndexOf={handleIndexOf}
              onResize={handleResize}
              onSetElement={handleSetElement}
              onLoadPreset={handleLoadPreset}
              onReset={handleResetToPromptExample}
              arrayLength={elements.length}
              dataType={dataType}
              isAnimating={isAnimating}
            />

            {/* Side-by-side: C# Program Code & Console Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CSharpCodeViewer
                currentValues={elements.map(e => e.value)}
                dataType={dataType}
                lastActionCode={lastActionCode}
              />

              <ConsoleOutput
                logs={logs}
                onClearLogs={() => setLogs([])}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Konu Anlatımı & Metot Kılavuzu */}
        {activeTab === 'guide' && (
          <MethodGuideView
            onTryMethodInPlayground={handleTryMethodInPlayground}
          />
        )}

        {/* Tab 3: Sınav & Pratik Test */}
        {activeTab === 'quiz' && (
          <QuizSection />
        )}

        {/* Tab 4: Stack & Heap Bellek Mimarisi */}
        {activeTab === 'architecture' && (
          <MemoryDeepDive />
        )}
      </main>

      {/* Crafted by Enes Öztürk Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>C# System.Array İnteraktif Eğitim Laboratuvarı</span>
          </div>

          <div className="flex items-center gap-2 font-medium">
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Enes Öztürk
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">El Emeği ile Geliştirilmiştir</span>
          </div>

          <div className="font-mono text-slate-500 text-[11px]">
            C# System.Array • Tarayıcı simülasyonu
          </div>
        </div>
      </footer>
    </div>
  );
}
