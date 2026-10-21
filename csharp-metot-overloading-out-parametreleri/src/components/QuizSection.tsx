import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/csharpExamples';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-2">
          <span>Bölüm 5</span>
          <span aria-hidden="true">·</span>
          <span>Kendinizi Test Edin</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          C# Metot &amp; Parametre Bilgi Sınavı
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
          Metot imzası kuralları, derleme hataları ve out/ref parametre aktarımına ilişkin 5 soruluk
          hızlı pekiştirme sınavı.
        </p>
      </div>

      {/* Progress & Submit Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-xs text-slate-300">
          Cevaplanan: <strong className="text-sky-400">{answeredCount}</strong> / {QUIZ_QUESTIONS.length} Soru
        </div>

        <div className="flex items-center gap-3">
          {showResults ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sınavı Yeniden Başlat</span>
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              disabled={answeredCount === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
            >
              Sonuçları Gör ve Değerlendir
            </button>
          )}
        </div>
      </div>

      {/* Results Banner if submitted */}
      {showResults && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-500/40 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>Sınav Tamamlandı! Skorunuz: {score} / {QUIZ_QUESTIONS.length} (%{(score / QUIZ_QUESTIONS.length) * 100})</span>
          </div>
          <p className="text-xs text-slate-300">
            {score === QUIZ_QUESTIONS.length
              ? 'Tebrikler! Metot overloading ve out/ref parametreleri konularına tam hakimsiniz.'
              : 'Aşağıdaki ayrıntılı açıklamaları inceleyerek yanlış yaptığınız soruları pekiştirebilirsiniz.'}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-8">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl bg-slate-900/70 border transition-colors ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-500/50 bg-emerald-950/10'
                    : 'border-rose-500/50 bg-rose-950/10'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                  <span className="text-sky-400 font-mono mr-2">Soru {idx + 1}.</span>
                  {q.question}
                </h3>
                {showResults && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Doğru
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                        <XCircle className="w-4 h-4" /> Yanlış
                      </span>
                    )}
                  </div>
                )}
              </div>

              {q.codeSnippet && (
                <pre className="p-3 mb-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{q.codeSnippet}</code>
                </pre>
              )}

              {/* Options */}
              <div className="space-y-2 mt-4">
                {q.options.map((opt, oIdx) => {
                  let optStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (selected === oIdx) {
                    optStyle = 'bg-sky-950/50 border-sky-500 text-white font-medium';
                  }

                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium';
                    } else if (selected === oIdx && !isCorrect) {
                      optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-medium';
                    } else {
                      optStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-colors cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center border text-[11px] font-mono shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation box after submission */}
              {showResults && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-sky-400 block mb-1">Açıklama &amp; Çözüm:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
