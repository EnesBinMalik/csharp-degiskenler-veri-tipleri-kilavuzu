import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (hasAnsweredCurrent) return; // Prevent re-answering
    const newAnswers = { ...selectedAnswers, [currentQuestion.id]: optIdx };
    setSelectedAnswers(newAnswers);

    // If answer is correct and last question, trigger confetti
    if (optIdx === currentQuestion.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    if (Object.keys(newAnswers).length === QUIZ_QUESTIONS.length) {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(qId));
    return q && q.correctIndex === ansIdx;
  }).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Progress & Score Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              C# Array Metotları Bilgi Sınavı
            </h2>
            <p className="text-xs text-slate-400">
              Metotların bellek ve çıktı mantığını pekiştirmek için hazırlanmış pratik test.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            Soru: <span className="text-cyan-400 font-bold">{currentIdx + 1}</span> / {QUIZ_QUESTIONS.length}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            Doğru: <span className="text-emerald-400 font-bold">{correctCount}</span> / {QUIZ_QUESTIONS.length}
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Testi Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/80">
            {currentQuestion.title} • {currentQuestion.relatedMethod}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            ID: #{currentQuestion.id}
          </span>
        </div>

        {/* C# Code Snippet for question */}
        {currentQuestion.csharpCode && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200">
            <pre>
              <code>{currentQuestion.csharpCode}</code>
            </pre>
          </div>
        )}

        {/* Question Text */}
        <h3 className="text-base font-semibold text-slate-100 leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
            const isCorrect = optIdx === currentQuestion.correctIndex;
            const showFeedback = hasAnsweredCurrent;

            let buttonStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50';

            if (showFeedback) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[11px] text-slate-400">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {showFeedback && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Box (Revealed after selecting answer) */}
        {hasAnsweredCurrent && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Açıklama:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            Önceki Soru
          </button>

          {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Sonraki Soru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Testi Tekrar Başlat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
