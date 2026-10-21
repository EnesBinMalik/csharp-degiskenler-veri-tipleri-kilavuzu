import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const KnowledgeQuiz: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      question: "ArrayList'in standart dizilerden (Array) en belirgin farkı nedir?",
      options: [
        "Sadece sayılardan oluşan verileri kabul etmesi",
        "Farklı veri tiplerini saklayabilmesi ve boyutunun dinamik olarak değişebilmesi",
        "Verileri sadece ters sırada sıralayabilmesi",
        "Boyutunun her zaman baştan sabitlenmesi gerekmesi",
      ],
      correctIndex: 1,
      explanation: "Standart dizilerde aynı tipte ve sabit boyutta eleman tutulurken, ArrayList farklı türleri (string, int, bool vs.) saklayabilir ve boyutu dinamik olarak genişler.",
    },
    {
      id: 2,
      question: "Parametresiz oluşturulan boş bir ArrayList'in Capacity değeri nedir?",
      options: ["0", "2", "4", "10"],
      correctIndex: 0,
      explanation: "Boş ArrayList başlangıçta Capacity = 0 kullanır. Yaygın .NET uygulamasında ilk öğe eklendiğinde kapasite 4'e çıkar.",
    },
    {
      id: 3,
      question: "Örnekte 4 kapasiteli ArrayList'e 5. öğe eklenirken ne gösterilir?",
      options: [
        "Hata verir ve elemanı eklemez",
        "Kapasite sadece 1 artarak 5 olur",
        "Yaygın büyüme örneğinde kapasite 8'e çıkar",
        "Eski elemanlar silinir",
      ],
      correctIndex: 2,
      explanation: "Bu simülatör, 4'ten 8'e büyüyen yaygın .NET uygulama davranışını örnekler. Kesin kapasite artış stratejisi API garantisi değildir.",
    },
    {
      id: 4,
      question: "Değişken veri tiplerini ArrayList içinde saklamak neden risk barındırır?",
      options: [
        "Bilgisayarın ekran kartını çok yorar",
        "Listeden okunan verinin türü garanti olmadığından, tip dönüşümü (cast) sırasında InvalidCastException ile uygulamanın çökmesine yol açabilir",
        "Yalnızca tek karakterli kelimeleri saklayabilir",
        "Hiçbir risk barındırmaz, modern yazılımda her zaman ArrayList tercih edilir",
      ],
      correctIndex: 1,
      explanation: "ArrayList elemanları object olarak tutar. Hangi indekste ne olduğunu derleyici bilemez; yanlış tür dönüşümünde çalışma zamanında uygulama çöker.",
    },
  ];

  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
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

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            ArrayList Bilgi Değerlendirmesi
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enes Öztürk'ün yazısındaki kritik bilgileri pekiştiren 4 soruluk mini test.
          </p>
        </div>

        {showResults && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Yeniden Başlat
          </button>
        )}
      </div>

      {/* Result Card when submitted */}
      {showResults && (
        <div className={`p-6 rounded-2xl border ${
          score >= 3
            ? 'bg-emerald-950/40 border-emerald-500/40'
            : 'bg-amber-950/40 border-amber-500/40'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${score >= 3 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                {score === 4 ? 'Tebrikler! Mükemmel Skor: 4 / 4' : `Sonuç: ${score} / 4 Doğru`}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {score >= 3
                  ? 'ArrayList çalışma mantığını, kapasite katlanmasını ve tip güvenliği risklerini çok iyi kavradınız.'
                  : 'Bazı noktalarda eksikler var. Enes Öztürk\'ün makalesini ve interaktif simülatörü tekrar inceleyebilirsiniz.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = isAnswered && selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-bold text-white">
                  <span className="text-indigo-400 mr-2">{idx + 1}.</span>
                  {q.question}
                </span>

                {showResults && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  let btnStyle = 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-semibold';
                    } else if (isThisSelected) {
                      btnStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-300';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'border-indigo-500 bg-indigo-950/60 text-white font-medium shadow-md shadow-indigo-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <span className="text-[10px] font-mono opacity-50 ml-2">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-semibold text-indigo-400">Açıklama:</span> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!showResults && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <span>Cevapları Kontrol Et ({Object.keys(userAnswers).length}/{questions.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
