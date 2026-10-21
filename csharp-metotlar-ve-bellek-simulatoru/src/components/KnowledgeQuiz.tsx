import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/methodData';

export const KnowledgeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const userChoice = selectedAnswers[currentQ.id];
  const isAnswered = userChoice !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(selectedAnswers[QUIZ_QUESTIONS[currentIdx + 1].id] !== undefined);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === Number(qId));
    return question && question.correctAnswer === ans ? acc + 1 : acc;
  }, 0);

  return (
    <section id="test" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 06</span>
          <span aria-hidden="true">·</span>
          <span>Öğrenmeyi Pekiştirme</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Metotlar ve ref Bilgi Değerlendirmesi
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          Metot kurallarını, değer kopyalamayı ve ref bellek semantiğini ne kadar iyi kavradığınızı
          5 soruluk interaktif test ile ölçün.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Soru {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>Skor: {score} Doğru</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = userChoice === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let btnStyle = 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-900';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 text-slate-500 border-slate-900';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answered */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold font-mono text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Teknik Açıklama:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-800">
            {isAnswered && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen with Enes Öztürk Certificate Seal */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 mx-auto flex items-center justify-center text-cyan-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400">
              Enes Öztürk İmzalı Başarı Sertifikası
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Değerlendirme Tamamlandı!
            </h3>
            <p className="text-slate-300 text-sm">
              Tebrikler! Toplam {QUIZ_QUESTIONS.length} sorudan <strong className="text-cyan-400 font-bold">{score} doğru</strong> cevap verdiniz.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-400">Başarı Oranı: %{Math.round((score / QUIZ_QUESTIONS.length) * 100)}</div>
            <div className="text-emerald-400">
              {score >= 4
                ? '⭐ C# Metot ve ref belleği konusunda mükemmel seviyedesiniz!'
                : '💡 Konuları pekiştirmek için bellek simülatörünü tekrar inceleyebilirsiniz.'}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Testi Tekrar Başlat</span>
          </button>
        </div>
      )}
    </section>
  );
};
