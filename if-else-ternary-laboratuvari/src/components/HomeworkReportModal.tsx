import React from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface HomeworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeworkReportModal: React.FC<HomeworkReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:p-0">
        {/* Top Modal Controls (No print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Kişisel Çalışma Özeti</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Assignment Paper Content */}
        <div className="p-8 sm:p-12 space-y-8 bg-slate-900 text-slate-200 print:bg-white print:text-slate-900 font-sans">
          {/* Header Banner */}
          <div className="border-b-2 border-slate-700 print:border-slate-300 pb-6 text-center">
            <div className="text-xs uppercase font-mono text-cyan-400 print:text-slate-600 font-bold tracking-widest">
              KİŞİSEL EĞİTİM ÇALIŞMASI
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-slate-900 mt-2">
              C# If-Else Yapısı ve Ternary If (? :) Operatörü Analizi
            </h1>
            <div className="mt-3 text-xs sm:text-sm text-slate-400 print:text-slate-600 flex flex-wrap justify-center gap-4">
              <span><strong>Ders:</strong> Algoritma ve Programlama</span>
              <span>·</span>
              <span><strong>Konu:</strong> Koşullu Dallanma ve Karar Mekanizmaları</span>
              <span>·</span>
              <span><strong>Dil:</strong> C#</span>
            </div>
          </div>

          {/* Author attribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-700/80 bg-slate-950/60 print:bg-slate-50 print:border-slate-300">
            <div>
              <div className="text-xs uppercase font-semibold text-slate-400 print:text-slate-600">Çalışmayı Hazırlayan</div>
              <div className="text-xl font-bold text-white print:text-slate-900 mt-0.5">Enes Öztürk</div>
              <div className="text-xs text-cyan-400 print:text-slate-700 font-mono mt-1">
                Öğrenci / Yazılım Geliştirici
              </div>
            </div>
            <div className="sm:text-right flex flex-col justify-center">
              <div className="text-xs text-slate-400 print:text-slate-600">Belge türü:</div>
              <div className="text-sm font-bold text-cyan-400 print:text-slate-700 mt-0.5">
                Kişisel çalışma özeti
              </div>
              <div className="text-xs text-slate-400 print:text-slate-500 font-mono mt-1">
                Tarih: {new Date().toLocaleDateString('tr-TR')}
              </div>
            </div>
          </div>

          {/* Section 1: Problem Statement */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-slate-900 border-b border-slate-800 print:border-slate-300 pb-2">
              1. Ödev Metni ve Problem Tanımı
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              Bu çalışmada, boolean tipinde tanımlanmış bir <code className="font-mono font-bold text-cyan-300 print:text-black">condition</code> değişkeninin değerine göre çıktı seçen <code className="font-mono font-bold">if-else</code> yapısı ile aynı örneğin <code className="font-mono font-bold text-cyan-300 print:text-black">ternary (? :)</code> ifadesiyle yazımı karşılaştırılır. Ternary kullanımı tek başına bir performans optimizasyonu değildir.
            </p>

            <div className="rounded-xl border border-slate-800 print:border-slate-300 bg-slate-950 print:bg-slate-100 p-4 font-mono text-xs text-slate-200 print:text-slate-900">
              <div className="text-slate-400 print:text-slate-600 mb-2 font-sans font-semibold text-xs">
                Ödevde Verilen Kaynak Kod:
              </div>
              <pre className="leading-relaxed">
{`bool condition = true;

if (condition)
{
    Console.WriteLine("Değişken: true");
}
else
{
    Console.WriteLine("Değişken: false");
}`}
              </pre>
            </div>
          </div>

          {/* Section 2: Ternary If Solution */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-slate-900 border-b border-slate-800 print:border-slate-300 pb-2">
              2. Ternary If (? :) Operatörü ile Çözüm
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              Koşullu operatörün sözdizimi <code className="font-mono font-semibold">Koşul ? Doğruysa_Dönecek_Değer : Yanlışsa_Dönecek_Değer</code> biçimindedir. Bu yapı bir deyim (statement) değil, değer üreten bir ifade (expression) olduğu için doğrudan <code className="font-mono">Console.WriteLine</code> içine verilebilir veya bir değişkene atanabilir.
            </p>

            <div className="rounded-xl border border-cyan-800/60 print:border-slate-300 bg-slate-950 print:bg-slate-100 p-4 font-mono text-xs text-cyan-200 print:text-slate-900">
              <div className="text-cyan-400 print:text-slate-600 mb-2 font-sans font-semibold text-xs">
                Enes Öztürk Tarafından Hazırlanan Ternary Karşılığı:
              </div>
              <pre className="leading-relaxed">
{`// 1. Doğrudan Konsola Yazdırma (Tek Satır):
bool condition = true;
Console.WriteLine(condition ? "Değişken: true" : "Değişken: false");

// 2. Bir Değişkene Atayarak Kullanma:
string sonuc = condition ? "Değişken: true" : "Değişken: false";
Console.WriteLine(sonuc);`}
              </pre>
            </div>
          </div>

          {/* Section 3: Summary of Differences */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white print:text-slate-900 border-b border-slate-800 print:border-slate-300 pb-2">
              3. Karşılaştırma ve Teknik Değerlendirme
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-800 print:border-slate-300 bg-slate-950/40 print:bg-white">
                <div className="font-bold text-blue-400 print:text-blue-800 mb-1">Klasik If-Else Avantajları</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-700 text-xs">
                  <li>Çok satırlı karmaşık iş mantığı barındırabilir.</li>
                  <li>İç içe döngüler ve try-catch blokları çalıştırabilir.</li>
                  <li>Birden çok <code className="font-mono">else if</code> basamağıyla kolay okunur.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 print:border-slate-300 bg-slate-950/40 print:bg-white">
                <div className="font-bold text-cyan-400 print:text-cyan-800 mb-1">Ternary If Avantajları</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-700 text-xs">
                  <li>Basit bir koşullu değer seçimini kısa biçimde ifade edebilir.</li>
                  <li>Değer ürettiği için atamalarda ve metot argümanlarında kullanılabilir.</li>
                  <li>Tercih, satır sayısından çok okunabilirliğe ve bağlama göre yapılmalıdır.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Document scope and author attribution */}
          <div className="pt-8 border-t-2 border-slate-700 print:border-slate-300 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs text-slate-400 print:text-slate-500 uppercase font-semibold">Bilgilendirme:</div>
              <p className="text-xs text-slate-300 print:text-slate-600 mt-1 max-w-md">
                Bu sayfa, <strong>Enes Öztürk</strong> tarafından hazırlanan kişisel bir eğitim çalışmasıdır; resmi teslim, kurum onayı veya öğretmen doğrulaması niteliği taşımaz. Örnekler tarayıcıda simüle edilir, C# kodu çalıştırılmaz.
              </p>
            </div>

            <div className="border-2 border-cyan-400 print:border-slate-900 rounded-xl p-4 text-center min-w-56 bg-cyan-950/20 print:bg-white">
              <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 print:text-slate-900 font-bold">
                HAZIRLAYAN
              </div>
              <div className="text-xl font-extrabold text-white print:text-slate-900 font-serif italic my-1">
                Enes Öztürk
              </div>
              <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">
                C# Kodlama & Mantıksal Tasarım
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions inside modal (No print) */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Kapat
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
