import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight } from 'lucide-react';
import { QuizQuestion } from '../types/loop';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "C# dilinde 'for(;;)' ifadesi ne anlama gelir?",
    options: [
      "Sözdizimi (syntax) hatası verir ve derlenmez.",
      "Sonsuz döngüyü ifade eder.",
      "Sadece 1 kez çalışan döngüdür.",
      "Gövdesi olmayan boş döngüdür."
    ],
    correctAnswer: 1,
    explanation: "For döngüsünün 2 ifadesi ve 1 koşulu boş bırakılabilir; aralardaki ';' işaretleri korunduğu sürece 'for(;;)' sonsuz bir döngü oluşturur."
  },
  {
    id: 2,
    question: "Aşağıdaki kod parçası çalıştırıldığında konsol çıktısı ne olur?",
    codeSnippet: `for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0)
        continue;
    Console.WriteLine(i);
}`,
    options: [
      "1'den 10'a kadar tüm sayılar (1, 2, 3, ... 10)",
      "Yalnızca çift sayılar (2, 4, 6, 8, 10)",
      "Yalnızca tek sayılar (1, 3, 5, 7, 9)",
      "Hiçbir şey yazdırmaz"
    ],
    correctAnswer: 2,
    explanation: "i çift olduğunda (i % 2 == 0) 'continue' komutu o anki iterasyonu sonlandırarak Console.WriteLine satırını atlar. Bu nedenle yalnızca tek sayılar (1, 3, 5, 7, 9) yazdırılır."
  },
  {
    id: 3,
    question: "İç içe iki for döngüsü kullanıldığında en içteki döngüde çalışan 'break' ifadesi ne yapar?",
    options: [
      "Programı tamamen durdurur.",
      "Her iki döngüyü de anında sonlandırır.",
      "Yalnızca içinde bulunduğu ilk (en içteki) döngüyü sonlandırır.",
      "Dıştaki döngüyü sonlandırır, içteki döngü devam eder."
    ],
    correctAnswer: 2,
    explanation: "Kritik kural: İç içe döngülerde break anahtar kelimesi yalnızca içinde bulunduğu ilk döngüyü sonlandırır. Dış döngü akışına devam eder."
  },
  {
    id: 4,
    question: "Aşağıdaki kodun konsola yazdıracağı son sayı hangisidir?",
    codeSnippet: `for (int i = 1; i <= 10; i++)
{
    if (i == 7)
        break;
    Console.WriteLine(i);
}`,
    options: [
      "6",
      "7",
      "10",
      "Hiçbiri, sonsuz döngüye girer"
    ],
    correctAnswer: 0,
    explanation: "i değeri 7 olduğunda önce if(i == 7) kontrolü sağlanır ve break çalışarak döngüden çıkılır. Bu nedenle 7 sayısı Console.WriteLine'a ulaşamaz; konsola yazdırılan son sayı 6'dır."
  },
  {
    id: 5,
    question: "For döngüsünde 'ifade2' (örneğin i++) ne zaman çalıştırılır?",
    options: [
      "Döngüye ilk girildiğinde, koşuldan önce.",
      "Döngü gövdesindeki komutlar tamamlandıktan (veya continue çağrıldıktan) sonra.",
      "Yalnızca break komutu çalıştığında.",
      "Yalnızca döngü tamamen bittiğinde."
    ],
    correctAnswer: 1,
    explanation: "ifade2 döngü sayacının artırıldığı ya da azaltıldığı ifadedir ve her iterasyonun komutları yürütüldükten sonra çalışarak sayacı günceller."
  }
];

export const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const selectedAnswer = selectedAnswers[currentIdx];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionIdx,
    });
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.filter(
    (q, idx) => selectedAnswers[idx] === q.correctAnswer
  ).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            Döngü & Akış Kontrolü Testi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ders notlarında öğrendiğiniz kavramları ve çıktı tahminlerini sınayın
          </p>
        </div>
        {!showResults && (
          <span className="text-xs font-mono text-slate-400">
            Soru <strong className="text-white">{currentIdx + 1}</strong> / {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!showResults ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          {/* Question Text */}
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Soru {currentIdx + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Optional Code Snippet */}
          {question.codeSnippet && (
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs sm:text-sm text-yellow-100 overflow-x-auto leading-relaxed">
              <pre>{question.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctAnswer;

              let optionClass = 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  optionClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-200 font-medium';
                } else if (isSelected) {
                  optionClass = 'border-rose-500 bg-rose-950/30 text-rose-200';
                } else {
                  optionClass = 'border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionClass}`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer explanation card */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
              selectedAnswer === question.correctAnswer
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            }`}>
              <div className="font-bold mb-1">
                {selectedAnswer === question.correctAnswer ? 'Tebrikler, Doğru Cevap!' : 'Yanlış Cevap'}
              </div>
              <p className="text-slate-300">{question.explanation}</p>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500">
              {isAnswered ? 'Cevabınızı kontrol ettiniz' : 'Seçeneğinize tıklayın'}
            </span>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">Test Tamamlandı!</h3>
            <p className="text-sm text-slate-400 mt-1">
              For Döngüsü, Break ve Continue konusundaki başarınız:
            </p>
          </div>

          <div className="py-4">
            <span className="text-5xl font-black text-indigo-400 font-mono tabular-nums">
              {correctCount}
            </span>
            <span className="text-2xl text-slate-500 font-mono"> / {QUIZ_QUESTIONS.length}</span>
            <p className="text-xs text-slate-400 mt-2">
              {correctCount === QUIZ_QUESTIONS.length
                ? 'Kusursuz! Konuyu mükemmel kavramışsınız.'
                : correctCount >= 3
                ? 'Gayet iyi! Notları bir kez daha gözden geçirerek tam puan alabilirsiniz.'
                : 'Biraz daha pratik yaparak döngü mekanizmasını pekiştirebilirsiniz.'}
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testi Yeniden Başlat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
