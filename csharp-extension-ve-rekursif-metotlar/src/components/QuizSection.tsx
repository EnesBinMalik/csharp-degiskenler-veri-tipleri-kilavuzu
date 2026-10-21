import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'extension' | 'recursion'>('all');

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (filterCategory === 'all') return true;
    return q.category === filterCategory;
  });

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // Answer locked
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Score calculations
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIndex]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctIndex === ansIndex;
  }).length;

  const scorePercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-8">

      {/* Title & Score Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Bilgi Ölçme & Pekiştirme</span>
            <span aria-hidden="true">·</span>
            <span>8 İleri Düzey Soru</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400">Etkileşimli Bilgi Testi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Metot Mimarisi Bilgi Sınavı
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Geleneksel extension metot kuralları ve rekürsif çağrı akışı hakkındaki bilginizi sınayın.
          </p>
        </div>

        {/* Score Card */}
        <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-xl p-3 px-4">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Başarı Durumu</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{correctCount} / {totalAnswered} Doğru</span>
              {totalAnswered > 0 && <span className="text-cyan-400 font-mono text-xs">(%{scorePercentage})</span>}
            </div>
          </div>
          <button
            onClick={handleResetQuiz}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Sınavı Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filterCategory === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          Tüm Sorular ({QUIZ_QUESTIONS.length})
        </button>
        <button
          onClick={() => setFilterCategory('extension')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filterCategory === 'extension' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          Extension Soruları
        </button>
        <button
          onClick={() => setFilterCategory('recursion')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filterCategory === 'recursion' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          Rekürsif Soruları
        </button>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`bg-slate-950 border rounded-2xl p-6 transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-800/60 shadow-sm'
                    : 'border-rose-800/60 shadow-sm'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-cyan-400 uppercase tracking-wider">
                  Soru {idx + 1} · {q.category === 'extension' ? 'Extension Metotlar' : 'Rekürsif Metotlar'}
                </span>
                {isAnswered && (
                  <span className={`font-semibold flex items-center gap-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{isCorrect ? 'Doğru Cevap' : 'Yanlış Cevap'}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-white mb-3 leading-snug">
                {q.question}
              </h3>

              {/* Optional Code Snippet */}
              {q.codeSnippet && (
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4 overflow-x-auto">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-bold';
                    } else if (optIdx === userAnswer) {
                      btnStyle = 'bg-rose-950/60 border-rose-600 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-400 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && optIdx === userAnswer && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Author Note */}
              {isAnswered && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs leading-relaxed animate-in fade-in duration-200">
                  <p className="text-slate-300">
                    <strong className="text-white">Çözüm Açıklaması: </strong>
                    {q.explanation}
                  </p>
                  <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{q.authorNote}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
