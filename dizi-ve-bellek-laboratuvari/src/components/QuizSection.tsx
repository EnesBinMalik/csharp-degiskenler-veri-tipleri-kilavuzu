import React, { useState } from 'react';
import { QuizQuestion } from '../types/array-lesson';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: '5 elemanlı bir dizinin ilk ve son elemanlarının indeks numaraları sırasıyla hangileridir?',
    options: [
      '1 ve 5',
      '0 ve 4',
      '0 ve 5',
      '1 ve 4',
    ],
    correctIndex: 1,
    explanation: 'Enes Öztürk: "Dizi index\'i 0\'dan başlar. Yani 5 elemanlı bir dizinin ilk elemanı 0. indextedir, sonuncu elemanı 4. indextedir."',
  },
  {
    id: 2,
    question: 'int[] sayilar = new int[10]; sayilar[2] = 12; ifadesinde 12 değeri dizinin kaçıncı elemanına atanmıştır?',
    options: [
      '2. elemanına',
      '3. elemanına',
      '1. elemanına',
      '12. elemanına',
    ],
    correctIndex: 1,
    explanation: 'Diziler 0-tabanlı olduğu için 0. indeks 1. elemandır, 1. indeks 2. elemandır ve 2. indeks 3. elemandır.',
  },
  {
    id: 3,
    question: 'string[] renkler = {"Mavi","Kırmızı","Sarı","Yeşil"}; dizisinde renkler[1] çağrıldığında hangi renk döner?',
    options: [
      'Mavi',
      'Kırmızı',
      'Sarı',
      'Yeşil',
    ],
    correctIndex: 1,
    explanation: 'renkler[0] "Mavi" iken, renkler[1] 2. sıradaki "Kırmızı" rengini getirir.',
  },
  {
    id: 4,
    question: 'Sabit uzunluklu bir C# dizisinin eleman sayısı ne zaman belirlenir?',
    options: [
      'Program kapatılırken',
      'Dizi örneği oluşturulurken',
      'Veri tabanı bağlandığı anda',
      'Hiçbir zaman belirlenmek zorunda değildir',
    ],
    correctIndex: 1,
    explanation: 'Bir C# dizisinin uzunluğu dizi örneği oluşturulurken belirlenir ve daha sonra değiştirilemez.',
  },
  {
    id: 5,
    question: 'For döngüsü kullanmasaydık 20 elemanlı bir dizinin değerlerini kullanıcıdan almak için ne yapmamız gerekirdi?',
    options: [
      'Otomatik yapay zeka doldururdu',
      '20 defa Console.ReadLine() yazmamız gerekirdi',
      'Dizi bellekte kaybolurdu',
      'Sadece 1 satır yeterli olurdu',
    ],
    correctIndex: 1,
    explanation: 'Enes Öztürk: "For döngüsü kullanmasaydık 20 defa Console.ReadLine() yazmamız gerekiyordu. Döngü ve dizilerin gücünü birleştirerek sadece birkaç satırda problemimizi çözdük."',
  },
];

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

  const score = questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <section id="quiz" className="py-16 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>Bölüm 06</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-400">Pekiştirme Sınavı</span>
            <span aria-hidden="true">·</span>
            <span>Konu Değerlendirmesi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Bilgilerini Sına: Dizi ve Döngü Testi
          </h2>
          <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
            Dizi indeksleme, bellek kavramları ve döngüleri ne kadar iyi kavradığını 5 soruluk bu interaktif testle ölç.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-sky-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      {q.question}
                    </h3>
                  </div>

                  {showResults && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Doğru
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          Yanlış
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        style = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected) {
                        style = 'bg-red-950/50 border-red-500 text-red-300 font-semibold';
                      }
                    } else if (isSelected) {
                      style = 'bg-sky-950/60 border-sky-400 text-white font-semibold ring-1 ring-sky-400';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !showResults && (
                          <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card when results shown */}
                {showResults && (
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-sky-400 font-semibold flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Açıklama:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Evaluation Controls */}
        <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {Object.keys(userAnswers).length} / {questions.length} soru yanıtlandı.
          </div>

          <div className="flex items-center gap-3">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                Sonuçları Değerlendir
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Skor: <span className="text-sky-400 font-bold">{score} / {questions.length}</span>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Tekrar Çöz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
