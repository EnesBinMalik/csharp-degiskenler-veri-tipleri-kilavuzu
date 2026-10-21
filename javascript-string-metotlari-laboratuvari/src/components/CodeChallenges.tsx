import React, { useState } from 'react';
import { CHALLENGES, Challenge } from '../data/challenges';
import {
  Play,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  Download,
  RotateCcw,
  Check,
} from 'lucide-react';

export const CodeChallenges: React.FC = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(CHALLENGES[0].id);

  const currentChallenge: Challenge =
    CHALLENGES.find((c) => c.id === selectedChallengeId) || CHALLENGES[0];

  // Code state per challenge
  const [codes, setCodes] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    CHALLENGES.forEach((c) => {
      init[c.id] = c.starterCode;
    });
    return init;
  });

  const [testResults, setTestResults] = useState<
    Array<{
      passed: boolean;
      label: string;
      expected: any;
      actual: any;
      error?: string;
    }>
  >([]);

  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Yazılım Geliştirici');

  const currentCode = codes[currentChallenge.id] || currentChallenge.starterCode;

  const handleCodeChange = (newCode: string) => {
    setCodes((prev) => ({
      ...prev,
      [currentChallenge.id]: newCode,
    }));
  };

  const handleResetCode = () => {
    handleCodeChange(currentChallenge.starterCode);
    setTestResults([]);
  };

  // Safe code runner for test cases
  const handleRunTests = () => {
    try {
      // Evaluate function definition safely
      // Wrap in a closure that returns the defined function
      const fnNameMatch = currentCode.match(/function\s+([a-zA-Z0-9_]+)/);
      const fnName = fnNameMatch ? fnNameMatch[1] : null;

      if (!fnName) {
        setTestResults([
          {
            passed: false,
            label: 'Sözdizimi Doğrulama',
            expected: 'Geçerli bir fonksiyon tanımı',
            actual: 'Fonksiyon adı tespit edilemedi',
            error: 'Lütfen kodunuzun "function fName(...)" formatında olduğundan emin olun.',
          },
        ]);
        return;
      }

      // Create runner
      // eslint-disable-next-line no-new-func
      const runner = new Function(`
        ${currentCode}
        return ${fnName};
      `)();

      const results = currentChallenge.testCases.map((tc) => {
        try {
          const actual = runner(...tc.input);
          const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
          return {
            passed,
            label: tc.label,
            expected: tc.expected,
            actual,
          };
        } catch (err: any) {
          return {
            passed: false,
            label: tc.label,
            expected: tc.expected,
            actual: 'Hata',
            error: err.message,
          };
        }
      });

      setTestResults(results);

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        setCompletedChallenges((prev) => new Set([...prev, currentChallenge.id]));
      }
    } catch (err: any) {
      setTestResults([
        {
          passed: false,
          label: 'Kod Derleme',
          expected: 'Çalıştırılabilir kod',
          actual: 'Sözdizimi Hatası',
          error: err.message,
        },
      ]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-400 mb-1 tracking-wider uppercase">
              Alıştırmalar & İnteraktif Pratik
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enes Öztürk String Meydan Okumaları
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-3xl leading-relaxed">
              Pratik örneklerle bilginizi sınayın. Tamamladığınız alıştırmaları gösteren kişisel ilerleme kartınızı oluşturabilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-xs text-right">
              <span className="text-slate-400 block">Tamamlanan:</span>
              <span className="font-mono text-indigo-400 font-bold">
                {completedChallenges.size} / {CHALLENGES.length}
              </span>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>İlerleme Kartını Görüntüle</span>
            </button>
          </div>
        </div>

        {/* Challenge Selection List */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CHALLENGES.map((ch) => {
            const isSelected = ch.id === selectedChallengeId;
            const isCompleted = completedChallenges.has(ch.id);

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChallengeId(ch.id);
                  setTestResults([]);
                  setShowHint(false);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    {ch.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {ch.category} · {ch.difficulty}
                  </div>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Challenge Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Challenge Brief & Hint (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-sm">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase">
                {currentChallenge.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">
                {currentChallenge.title}
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentChallenge.description}
            </p>

            {/* Hint Box */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'İpucunu Gizle' : 'İpucu Göster'}</span>
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-amber-950/30 border border-amber-900/60 rounded text-xs text-amber-200/90 leading-relaxed">
                  {currentChallenge.hint}
                </div>
              )}
            </div>

            {/* Author note */}
            <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/50 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enes Öztürk Çözüm Notu</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                {currentChallenge.authorNote}
              </p>
            </div>
          </div>

          {/* Test Cases Expectations List */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
            <h3 className="text-xs font-semibold text-slate-300">
              Gereken Test Senaryoları ({currentChallenge.testCases.length})
            </h3>
            <div className="space-y-2">
              {currentChallenge.testCases.map((tc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950 rounded border border-slate-800/80 text-[11px] font-mono space-y-1"
                >
                  <div className="text-slate-400 font-sans">{tc.label}</div>
                  <div className="text-slate-300">
                    Girdi: {JSON.stringify(tc.input)}
                  </div>
                  <div className="text-emerald-400">
                    Beklenen: {JSON.stringify(tc.expected)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Code Sandbox & Test Execution Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                JavaScript Çözüm Editörü
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Kodu Sıfırla</span>
                </button>
                <button
                  onClick={handleRunTests}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Testleri Çalıştır</span>
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              rows={11}
              spellCheck={false}
              className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-indigo-200 leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
            />
          </div>

          {/* Test Results Output Display */}
          {testResults.length > 0 && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  Test Sonuçları (
                  {testResults.filter((r) => r.passed).length} / {testResults.length} Başarılı)
                </span>
                {testResults.every((r) => r.passed) ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Tüm Testler Başarıyla Geçti!</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400">
                    Bazı testler başarısız oldu.
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs font-mono flex items-start justify-between gap-3 ${
                      tr.passed
                        ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-900/60 text-rose-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-sans font-bold">{tr.label}</div>
                      <div>Beklenen: {JSON.stringify(tr.expected)}</div>
                      <div>Gelen: {JSON.stringify(tr.actual)}</div>
                      {tr.error && (
                        <div className="text-rose-400 text-[11px]">{tr.error}</div>
                      )}
                    </div>
                    {tr.passed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Kişisel Öğrenme İlerleme Kartı
                </h3>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Kapat (✕)
              </button>
            </div>

            {/* Certificate Form input */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-300 shrink-0">
                Kart Sahibi:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono w-full focus:outline-none focus:border-indigo-500"
                placeholder="Adınız Soyadınız..."
              />
            </div>

            {/* Beautiful Certificate Canvas Layout */}
            <div
              id="certificate-print-area"
              className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-4 border-double border-amber-500/50 rounded-xl space-y-6 text-center shadow-inner relative overflow-hidden"
            >
              <div className="text-[10px] tracking-widest uppercase font-mono text-amber-400">
                STRING METOTLARI ÇALIŞMA ÖZETİ
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-white font-sans tracking-tight">
                  {studentName || 'Sayın Geliştirici'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Bu kart, uygulamadaki alıştırma ilerlemesini gösterir; resmi bir sertifika veya yetkinlik belgesi değildir.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 max-w-sm mx-auto border-t border-b border-slate-800 py-2">
                <div>
                  <span className="block text-slate-400">Tamamlanan</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {completedChallenges.size} / {CHALLENGES.length}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">İlerleme</span>
                  <span className="text-indigo-400 font-bold">
                    {Math.round((completedChallenges.size / CHALLENGES.length) * 100)}%
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">Tarih</span>
                  <span className="text-slate-300 font-bold">{new Date().toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Signature area */}
              <div className="flex justify-between items-end pt-4 px-4 text-left">
                <div className="text-[10px] text-slate-400 font-mono">
                  <span>Belge türü:</span>
                  <span className="text-slate-400 block">Kişisel çalışma özeti</span>
                </div>

                <div className="text-right">
                  <div className="font-serif italic text-lg text-amber-300 tracking-wide">
                    Uygulama içi ilerleme
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    Otomatik oluşturulur
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Yazdır / PDF Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
