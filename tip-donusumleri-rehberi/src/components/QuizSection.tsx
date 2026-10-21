import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFinished, setShowFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const hasAnswered = selectedAnswers[currentIndex] !== undefined;
  const isCorrect = selectedAnswers[currentIndex] === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: idx,
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ansIdx
  ).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            Tip Dönüşümleri Bilgi Sınavı (Quiz)
          </h2>
          <p className="text-sm text-slate-400">
            Öğrendiklerinizi test edin: Implicit, Explicit, Bit taşması, TryParse ve Boxing soruları.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start">
          Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
        </div>
      </div>

      {showFinished ? (
        /* Results Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mx-auto shadow-xl">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Tebrikler! Testi Tamamladınız
            </h3>
            <p className="text-slate-300 text-sm">
              {QUIZ_QUESTIONS.length} sorudan <strong>{correctCount}</strong> tanesini doğru yanıtladınız.
            </p>
          </div>

          <div className="text-3xl font-black text-indigo-400 font-mono">
            %{Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)} Başarı Oranı
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-400">
            {correctCount === QUIZ_QUESTIONS.length
              ? '🏆 Harika! Tip dönüşümleri, bellek yönetimi ve taşma mekanizmalarına tamamen hakimsiniz.'
              : correctCount >= 4
              ? '👏 Çok iyi! Birkaç ince detayı rehberden tekrar gözden geçirerek tam puan alabilirsiniz.'
              : '📘 Konu anlatımı ve laboratuvar bölümlerini tekrar incelemenizi öneririz.'}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Testi Yeniden Başlat
          </button>
        </div>
      ) : (
        /* Question Card */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
            <span className="text-slate-400 font-semibold">
              Soru {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
              Konu: {currentQ.topic}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Code Snippet if question has one */}
            {currentQ.codeSnippet && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-indigo-300 whitespace-pre">
                {currentQ.codeSnippet}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              const isOptionCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

              if (hasAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-semibold';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasAnswered && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Explanation Feedback */}
          {hasAnswered && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                isCorrect
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                  : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Harika, Doğru Cevap!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Yanlış Seçenek!</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation / Next Button */}
          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>
                  {currentIndex === QUIZ_QUESTIONS.length - 1
                    ? 'Sonuçları Gör'
                    : 'Sonraki Soru'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
