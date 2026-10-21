import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/lessonsData';

export const QuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIndex
    });
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswers[currentQ.id] === undefined) return;

    const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
              BİLGİ TESTİ
            </span>
            <span className="text-xs text-slate-400">Enes Öztürk Değerlendirmesi</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            While ve ForEach Pratik Testi
          </h2>
        </div>

        {!quizCompleted && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">İlerleme</span>
              <span className="text-sm font-bold text-indigo-400 font-mono">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            <div className="w-24 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quiz Card */}
      {!quizCompleted ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Question Text */}
          <div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              Soru {currentQuestionIndex + 1}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {currentQ.question}
            </h3>
          </div>

          {/* Optional Code Snippet */}
          {currentQ.codeSnippet && (
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const isCorrectAnswer = currentQ.correctAnswer === idx;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 font-medium';
                } else {
                  optionStyle = 'bg-slate-950 border-slate-900 text-slate-600 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white shadow-md';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center font-mono text-xs font-semibold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on submit */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
              selectedAnswers[currentQ.id] === currentQ.correctAnswer
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-2">
                {selectedAnswers[currentQ.id] === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tebrikler, Doğru Cevap!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" /> Yanlış Cevap!
                  </>
                )}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">{currentQ.explanation}</p>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Anlık Skor: <strong className="text-indigo-400">{score}</strong> / {totalQuestions}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                Cevabı Onayla
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished & Certificate Card */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-1 shadow-2xl shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Award className="w-10 h-10 text-amber-400" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tebrikler! Testi Tamamladınız
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              While ve ForEach döngüleri konusundaki bilginizi başarıyla test ettiniz.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-sm text-slate-400">Başarı Skorunuz:</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">
              {score} / {totalQuestions}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              %{Math.round((score / totalQuestions) * 100)} Başarı
            </span>
          </div>

          {/* Local quiz result summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 max-w-lg mx-auto text-left relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-slate-300">KİŞİSEL TEST SONUCU</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">UYGULAMA İÇİ ÖZET</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Bu özet yalnızca bu testteki puanınızı gösterir; resmi sertifika, yeterlilik belgesi veya dışarıdan doğrulanmış sonuç değildir. Kod örnekleri C# derleyicisinde çalıştırılmaz.
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">Materyali hazırlayan</p>
                <p className="font-semibold text-indigo-300">Enes Öztürk</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500">Konu</p>
                <p className="text-xs font-mono text-slate-300">C# Loops Masterclass</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Testi Yeniden Başlat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
