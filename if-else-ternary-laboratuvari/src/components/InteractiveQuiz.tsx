import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData.ts';
import { CheckCircle, XCircle, RotateCcw, Award, HelpCircle } from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <section id="quiz" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            Ödev Pekiştirme Testi · Enes Öztürk
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Bilgi Ölçme & Alıştırma Testi
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
            C# If-Else ve Ternary operatörü bilginizi 5 soruluk bu interaktif test ile sınayın.
          </p>
        </div>

        {/* Score & Reset Actions */}
        <div className="flex items-center gap-3">
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Doğru Sayısı: </span>
              <strong className="text-cyan-400 text-sm">
                {score} / {QUIZ_QUESTIONS.length}
              </strong>
            </div>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500/50 bg-slate-900/90'
                    : 'border-rose-500/50 bg-slate-900/90'
                  : 'border-slate-800 bg-slate-900/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
                    {qIndex + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {q.question}
                  </h3>
                </div>

                {isAnswered && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Doğru</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800/60">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Yanlış</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Optional Code Snippet inside Question */}
              {q.codeSnippet && (
                <pre className="my-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 hover:text-white';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold';
                    } else if (optIdx === userChoice) {
                      btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-300 line-through';
                    } else {
                      btnStyle = 'border-slate-800/50 bg-slate-950/40 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 text-left rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answer */}
              {isAnswered && (
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-200">Açıklama: </strong>
                    {q.explanation}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {allAnswered && (
        <div className="mt-8 p-6 rounded-2xl border border-cyan-500/50 bg-cyan-950/30 text-center">
          <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-white">Tebrikler! Testi Tamamladınız</h4>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Toplam {QUIZ_QUESTIONS.length} sorudan <strong className="text-cyan-400">{score} tanesini</strong> doğru bildiniz.
            Enes Öztürk'ün hazırladığı C# Karar Yapıları ödev konusu başarıyla pekiştirildi.
          </p>
        </div>
      )}
    </section>
  );
};
