import React, { useState } from 'react';
import { QUIZ_QUESTIONS, AUTHOR_NAME } from '../data/courseData';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ArrowRight, Check } from 'lucide-react';

interface QuizSectionProps {
  onRestartCourse?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onRestartCourse }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Yazılım Geliştirici');

  const question = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIdx: number) => {
    if (selectedAnswers[question.id] !== undefined) return; // Already answered
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionIdx }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
    setIsCompleted(false);
  };

  // Score calculation
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctIndex === ansIdx;
  }).length;

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercentage >= 60;

  return (
    <section id="test" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-b border-slate-800">
      {/* Chapter Indicator */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 06</span>
          <span aria-hidden="true">·</span>
          <span>Değerlendirme & Pekiştirme</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Değişkenler & Kütüphaneler Bilgi Testi
        </h2>
        <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
          {AUTHOR_NAME} tarafından hazırlanan bu 8 soruluk test ile öğrendiklerinizi sınayın ve imzalı başarı sertifikanızı alın.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-4 border-b border-slate-800">
            <span className="font-semibold text-slate-300">
              Soru {currentIdx + 1} / {totalQuestions}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold tabular-nums">
                Doğru: {correctCount}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                İlerleme: %{Math.round(((currentIdx + 1) / totalQuestions) * 100)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
              {question.question}
            </h3>

            {question.codeSnippet && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 mb-4">
                {question.codeSnippet}
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[question.id] === oIdx;
              const hasAnswered = selectedAnswers[question.id] !== undefined;
              const isCorrect = oIdx === question.correctIndex;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/50 border-slate-800/50 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {showResult && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 mb-6 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Çözüm & Açıklama:</span>
              </div>
              <p>{question.explanation}</p>
            </div>
          )}

          {/* Next / Submit Button */}
          {selectedAnswers[question.id] !== undefined && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm shadow-cyan-500/20"
              >
                <span>{currentIdx < totalQuestions - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completion View & Certificate */
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Test Tamamlandı!</h3>
          <p className="text-sm text-slate-400 mb-6">
            {totalQuestions} sorudan <strong className="text-white font-mono">{correctCount}</strong> tanesini doğru yanıtladınız.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 mb-8">
            <span className="text-xs text-slate-400">Başarı Puanınız:</span>
            <span
              className={`font-mono text-2xl font-extrabold tabular-nums ${
                isPassed ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              %{scorePercentage}
            </span>
            <span className="text-xs text-slate-500">
              ({isPassed ? 'Başarılı' : 'Geliştirilmeli'})
            </span>
          </div>

          {/* Certificate if passed */}
          {isPassed && (
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border-2 border-cyan-500/40 text-left max-w-2xl mx-auto mb-8 relative shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                    KURS TAMAMLAMA BELGESİ · RESMİ AKREDİTASYON DEĞİLDİR
                  </div>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    C# & .NET Değişkenler ve Veri Tipleri Başarı Belgesi
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-cyan-500/50 flex items-center justify-center font-serif text-cyan-300 text-lg font-bold">
                  ★
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-slate-400">Sertifika Sahibi:</span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Adınızı ve Soyadınızı Yazın"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <p className="leading-relaxed text-slate-300">
                  Bu belge, yukarıda adı geçen katılımcının bu web sayfasındaki C# bilgi testini tamamladığını gösterir.
                  Bu öz değerlendirme belgesi resmi bir yeterlilik, akreditasyon veya uzmanlık sertifikası değildir.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-6 border-t border-slate-800 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Tarih</span>
                    <span className="font-mono text-xs text-slate-300">
                      {new Date().toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">İçerik Hazırlayan</span>
                    <div className="font-serif italic text-base text-cyan-300 font-bold mt-1">
                      {AUTHOR_NAME}
                    </div>
                    <span className="text-[10px] text-slate-400 block">Kılavuzun Yazarı</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testi Tekrar Çöz</span>
            </button>
            <a
              href="#degisken-nedir"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Ders Konularını Tekrar İncele
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
