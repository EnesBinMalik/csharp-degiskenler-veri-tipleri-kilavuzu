import React, { useState } from 'react';
import { CHALLENGES } from '../../data/challenges';
import { Challenge } from '../../types';
import { CheckCircle2, XCircle, AlertCircle, Sparkles, HelpCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const BugHunterView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showRefactored, setShowRefactored] = useState(false);

  const currentChallenge = CHALLENGES[currentIdx];
  const selectedOption = currentChallenge.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setSubmitted(true);
    if (isCorrect) {
      setScore((s) => s + 100);
    }
  };

  const handleNext = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
      setShowRefactored(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setSubmitted(false);
    setShowRefactored(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Enes Öztürk'ün Kod Denetim Odası</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Açık Avcısı: Koddaki Tuzakları Yakalayın
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            "Hızlıca kodu yazıp geçmek doğru bir yaklaşım değildir. Kod bloğunun açıklarını düşünmeliyiz."
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Skor</span>
            <span className="text-lg font-bold font-mono text-indigo-400">{score} Puan</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Soru</span>
            <span className="text-lg font-bold font-mono text-slate-200">
              {currentIdx + 1} / {CHALLENGES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Challenge Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
              Meydan Okuma #{currentIdx + 1}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">{currentChallenge.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{currentChallenge.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                currentChallenge.difficulty === 'Kolay'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : currentChallenge.difficulty === 'Orta'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {currentChallenge.difficulty}
            </span>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed">
          <div className="text-slate-500 text-[11px] pb-2 mb-2 border-b border-slate-900 flex items-center justify-between">
            <span>Denetlenecek Kod Parçası</span>
            <span className="text-amber-400/80">Açığı Tespit Edin 🔍</span>
          </div>
          <pre>{currentChallenge.code}</pre>
        </div>

        {/* Question & Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            {currentChallenge.question}
          </h4>

          <div className="space-y-2 pt-1">
            {currentChallenge.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              let optionStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-slate-300';

              if (submitted) {
                if (option.isCorrect) {
                  optionStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
                } else {
                  optionStyle = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-indigo-500 bg-indigo-950/50 text-white ring-1 ring-indigo-500';
              }

              return (
                <button
                  key={option.id}
                  disabled={submitted}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <div className="mt-0.5">
                    {submitted && option.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : submitted && isSelected && !option.isCorrect ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-indigo-400 bg-indigo-600' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    )}
                  </div>
                  <span className="flex-1 leading-relaxed">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {submitted && selectedOption && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tebrikler! Doğru Teşhis (+100 Puan)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Yanlış Tespit! Kodun Açığını Yeniden İnceleyin</span>
                </>
              )}
            </div>
            <p className="leading-relaxed">{selectedOption.feedback}</p>

            {/* Pro Tip */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>{currentChallenge.proTip}</span>
            </div>
          </div>
        )}

        {/* Toggle Safe Refactored Code */}
        {submitted && (
          <div>
            <button
              onClick={() => setShowRefactored(!showRefactored)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
            >
              <span>{showRefactored ? 'Çözüm Kodunu Gizle' : 'Güvenli (Refactored) Çözüm Kodunu Gör'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {showRefactored && (
              <div className="mt-3 p-4 rounded-xl border border-indigo-900/40 bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                <div className="text-slate-500 text-[11px] pb-2 mb-2 border-b border-slate-900">
                  // Enes Öztürk'ün Önerdiği Güvenli Kod Bloğu:
                </div>
                <pre>{currentChallenge.fixedCode}</pre>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white text-xs hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Meydan Okumayı Sıfırla</span>
          </button>

          <div className="flex items-center gap-3">
            {!submitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all"
              >
                Cevabı Onayla
              </button>
            ) : currentIdx < CHALLENGES.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Sonraki Soruya Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Tüm Soruları Tamamladınız!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
