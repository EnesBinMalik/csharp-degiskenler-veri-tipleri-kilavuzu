import React from 'react';
import { BookOpen, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { QUESTION_DETAILS } from '../data/csharpCode';

export const AlgorithmNotes: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          C# Algoritma Çözüm Analizi & Mühendislik Yaklaşımı
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Bu ödevde yer alan 4 algoritma sorusu, temel veri tipleri, döngüler, dizi (array) manipülasyonu,
          koşullu ifadeler (<code className="text-cyan-300 font-mono">if / else</code>) ve metin işleme metotlarını
          kapsamlı şekilde test etmektedir.
        </p>
      </div>

      {/* 4 Questions Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUESTION_DETAILS.map((q) => (
          <div
            key={q.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  Soru {q.number}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {q.complexity}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-2">{q.title}</h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{q.task}</p>

              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs font-sans text-slate-300 leading-relaxed">
                <strong className="text-slate-200 block mb-1">Algoritmik Adımlar:</strong>
                {q.algorithm}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Geliştirici: Enes Öztürk</span>
              <span className="text-emerald-400">Optimize Çözüm</span>
            </div>
          </div>
        ))}
      </div>

      {/* Critical Edge Cases & Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4" />
            Önemli Uç Durumlar (Edge Cases) ve Önlemler
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Pozitif Sayı Doğrulaması:</strong> Kullanıcı $0$ veya negatif bir sayı girdiğinde program çökmek yerine hata mesajı verip tekrar girdi istemektedir (<code className="font-mono text-cyan-300">PozitifSayiAl</code> metodu).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Sıfıra Bölünme Hatası (DivideByZero):</strong> Soru 2'de $m$ sayısının daima pozitif tam sayı ($m &gt; 0$) olması garanti altına alınmıştır.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Çoklu Boşluk Ayrıştırması:</strong> Soru 4'te cümle içerisindeki ardışık birden fazla boşluk veya sekme karakteri <code className="font-mono text-cyan-300">StringSplitOptions.RemoveEmptyEntries</code> ile elenir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Türkçe Karakter Desteği:</strong> Harf sayımında sadece ASCII değil, Türkçe karakterler (ç, ğ, ı, ö, ş, ü, vb.) <code className="font-mono text-cyan-300">char.IsLetter</code> ile doğru sayılmaktadır.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <h4 className="text-xs font-semibold text-cyan-400 flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4" />
            Karmaşıklık ve Performans (Big-O)
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-bold shrink-0">O(n)</span>
              <span>
                <strong>Soru 1, 2 ve 3:</strong> Dizi üzerinde tek bir döngü taranarak işlem tamamlanır; doğrusal zaman karmaşıklığı ile en yüksek verimlilik sağlanır.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-emerald-400 font-bold shrink-0">O(L)</span>
              <span>
                <strong>Soru 4:</strong> Metin uzunluğu ($L$) kadar karakter tek seferde taranarak kelime ve harf tespiti yapılır.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-cyan-400 font-bold shrink-0">Bellek</span>
              <span>
                Kullanıcıdan alınan veriler dinamik olarak boyutlandırılan C# dizilerinde (<code className="font-mono text-slate-400">new int[n]</code> / <code className="font-mono text-slate-400">new string[n]</code>) tutulur.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
