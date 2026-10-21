import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Bug, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

export const LogicErrorsView: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'discount' | 'average' | 'precedence' | 'balance'>('discount');

  // Interactive inputs for interactive demo
  const [discountPrice, setDiscountPrice] = useState<number>(1000);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  const [exam1, setExam1] = useState<number>(60);
  const [exam2, setExam2] = useState<number>(80);

  const [balance, setBalance] = useState<number>(500);
  const [withdraw, setWithdraw] = useState<number>(1200);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2 text-rose-400 font-semibold text-xs tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Mühendislik Perspektifi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Try-Catch Her Şeyi Çözer mi? <span className="text-rose-400">Hayır.</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Yazılım geliştiriciliğinde en büyük yanılgı, tüm kodu devasa bir <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs">try-catch</code> içine alarak "güvende" olduğunu sanmaktır.
            Çalışma zamanı istisnaları programı durdurur ve bağırır; fakat <strong>mantıksal hatalar (logic errors)</strong> sessizce çalışmaya devam eder ve telafisi zor felaketlere yol açar.
          </p>
        </div>
      </div>

      {/* The 3 Error Types Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type 1: Syntax / Compile-time */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                TÜR 1
              </span>
              <span className="text-xs text-amber-400 font-medium">Derleme Zamanı</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Sözdizimi Hataları (Syntax)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programlama dilinin gramer kurallarının ihlalidir. Noktalı virgül unutulması, süslü parantez kapanmaması veya tip uyuşmazlığı.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800/80">
              <div className="text-slate-500">// Derlenmez: CS1002</div>
              <div className="text-rose-300">int x = "merhaba"; <span className="text-rose-500">❌</span></div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">Tehlike Derecesi:</span> En Düşük. Derleyici kodu çalıştırmayı reddeder.
          </div>
        </div>

        {/* Type 2: Runtime Exceptions */}
        <div className="rounded-2xl border border-indigo-900/40 bg-slate-900/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                TÜR 2
              </span>
              <span className="text-xs text-indigo-400 font-medium">Çalışma Zamanı</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">İstisnalar (Runtime Exceptions)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kod dil kurallarına uygundur ve derlenir. Ancak çalışırken beklenmedik bir durum oluşur (Sıfıra bölme, string'i sayıya çevirememek, null nesne).
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800/80">
              <div className="text-slate-500">// Çalışırken Çöker (Crash)</div>
              <div className="text-amber-300">int a = int.Parse("abc"); <span className="text-amber-500">💥</span></div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="text-indigo-400 font-semibold">Çözüm:</span> <code className="text-indigo-300 font-mono">try-catch-finally</code> ve <code className="text-indigo-300 font-mono">TryParse</code>.
          </div>
        </div>

        {/* Type 3: Logic Errors */}
        <div className="rounded-2xl border border-rose-900/50 bg-slate-900/90 p-5 flex flex-col justify-between ring-1 ring-rose-500/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                TÜR 3 · EN TEHLİKELİ
              </span>
              <span className="text-xs text-rose-400 font-bold">Mantıksal Hata</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Mantıksal Hatalar (Logic Errors)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kod sorunsuz derlenir, çalışma anında HİÇBİR istisna fırlatmaz. Try-catch sıfır hata raporlar! Fakat üretilen sonuç tamamen YANLIŞTIR.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800/80">
              <div className="text-slate-500">// Try-catch fark edemez!</div>
              <div className="text-rose-400 font-medium">tutar = fiyat + indirim; <span className="text-rose-500 font-bold">⚠️</span></div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-300">
            <span className="text-rose-400 font-bold">Enes Öztürk Uyarısı:</span> "Hızlıca yazıp geçmeyin. Kodun açıklarını düşünüp test edin."
          </div>
        </div>
      </div>

      {/* Interactive Logic Lab */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-indigo-400" />
              İnteraktif Mantıksal Hata Laboratuvarı
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Farklı senaryolarda mantıksal hataların try-catch'e rağmen nasıl gizlendiğini canlı test edin.
            </p>
          </div>

          {/* Scenario tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedDemo('discount')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedDemo === 'discount'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              İndirim Hesabı
            </button>
            <button
              onClick={() => setSelectedDemo('precedence')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedDemo === 'precedence'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ortalama & Öncelik
            </button>
            <button
              onClick={() => setSelectedDemo('balance')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedDemo === 'balance'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bakiye Açığı
            </button>
          </div>
        </div>

        {/* Demo 1: Discount Logic Error */}
        {selectedDemo === 'discount' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Canlı Girdileri Değiştirin:</span>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Ürün Fiyatı: {discountPrice} TL</label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">İndirim Oranı: %{discountPercent}</label>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="5"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-slate-300">
                <span className="font-semibold text-indigo-300 block mb-1">Geliştiricinin Yazdığı Kod:</span>
                <code className="text-slate-300 font-mono block">
                  double indirimliFiyat = fiyat + (fiyat * oran / 100);
                </code>
                <p className="text-slate-400 mt-2 text-[11px]">
                  Dikkat: Eksi (-) yerine artı (+) yazılmış. Derleyici bu kuralı bilemez!
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Buggy Output */}
                <div className="p-4 rounded-xl border border-rose-800/60 bg-rose-950/30">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>MANTIKSAL HATALI KOD</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-rose-200">
                    {discountPrice + (discountPrice * discountPercent) / 100} TL
                  </div>
                  <p className="text-xs text-rose-300/80 mt-1">
                    % {discountPercent} indirim yapılması gerekirken fiyat %{discountPercent} ZAMLANDI!
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Try-Catch Durumu: "Hata Yok"
                  </div>
                </div>

                {/* Correct Output */}
                <div className="p-4 rounded-xl border border-emerald-800/60 bg-emerald-950/30">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>OLMASI GEREKEN DOĞRU</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-200">
                    {discountPrice - (discountPrice * discountPercent) / 100} TL
                  </div>
                  <p className="text-xs text-emerald-300/80 mt-1">
                    Müşteriye doğru uygulanan indirimli tutar.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    Formül: <code className="text-indigo-300 font-mono">fiyat - indirim</code>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Analiz:</strong> Try-catch bu hesaplamayı sarmalasa bile <code className="text-indigo-300 font-mono">catch</code> bloğu asla tetiklenmez. Çünkü işlemci açısından 1000 + 250 işlemi tamamen geçerli bir aritmetiktir.
              </div>
            </div>
          </div>
        )}

        {/* Demo 2: Precedence Logic Error */}
        {selectedDemo === 'precedence' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Not Girdileri:</span>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">1. Sınav: {exam1}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={exam1}
                    onChange={(e) => setExam1(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">2. Sınav: {exam2}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={exam2}
                    onChange={(e) => setExam2(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-slate-300">
                <span className="font-semibold text-indigo-300 block mb-1">Hatalı Parantez Önceliği:</span>
                <code className="text-rose-300 font-mono block">
                  double ort = not1 + not2 / 2;
                </code>
                <p className="text-slate-400 mt-2 text-[11px]">
                  İşlem önceliği gereği önce <code className="text-indigo-300 font-mono">not2 / 2</code> hesaplanır, sonra <code className="text-indigo-300 font-mono">not1</code> eklenir!
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-800/60 bg-rose-950/30">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>HATALI SONUÇ</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-rose-200">
                    {exam1 + exam2 / 2}
                  </div>
                  <p className="text-xs text-rose-300/80 mt-1">
                    Öğrenci 100 üzerinden {exam1 + exam2 / 2} alarak imkansız bir nota ulaştı!
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-800/60 bg-emerald-950/30">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>DOĞRU FORMÜL</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-200">
                    {(exam1 + exam2) / 2}
                  </div>
                  <p className="text-xs text-emerald-300/80 mt-1">
                    Formül: <code className="text-emerald-300 font-mono">(not1 + not2) / 2</code>
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Çıkarım:</strong> Hızlıca kodu yazıp geçmek yerine matematiksel öncelikleri kontrol etmek ve birim testler (Unit Tests) yazmak bu hataların yegane panzehiridir.
              </div>
            </div>
          </div>
        )}

        {/* Demo 3: Balance Logic Error */}
        {selectedDemo === 'balance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Banka Para Çekme:</span>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mevcut Bakiye: {balance} TL</label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Çekilmek İstenen: {withdraw} TL</label>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="100"
                    value={withdraw}
                    onChange={(e) => setWithdraw(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-rose-800/60 bg-rose-950/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-400">Try-Catch İçindeki Bakiye Açığı</span>
                  <span className="text-[11px] font-mono text-rose-300 bg-rose-900/40 px-2 py-0.5 rounded">
                    Bakiye - Çekilen
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-rose-200">
                  Yeni Bakiye: {balance - withdraw} TL {balance < withdraw && '(EKSİYE DÜŞTÜ!)'}
                </div>
                <p className="text-xs text-rose-300/80 mt-1.5 leading-relaxed">
                  Geliştirici <code className="text-rose-200 font-mono">try &#123; bakiye -= cekilen; &#125; catch &#123; ... &#125;</code> yazmıştır.
                  {balance < withdraw
                    ? ' Müşteri hesabında olmayan parayı çekti! Try-catch hata fırlatmadı, banka zarara uğradı.'
                    : ' Bakiye yeterli olduğu için işlem başarılı oldu.'}
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Çözüm (Defensive Programming):</strong>
                <code className="text-emerald-400 font-mono block mt-1">
                  if (cekilen &gt; bakiye) throw new InvalidOperationException("Yetersiz bakiye!");
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Philosophy Callout from Enes Öztürk */}
      <div className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 text-indigo-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">
            Enes Öztürk'ün Savunmacı Kodlama (Defensive Programming) Kuralı
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Kod yazmak bir metin yazmak değil, bir mimari kurmaktır.
            Hızlıca kodu yazıp geçmek yerine, <strong>'Kullanıcı buraya geçersiz ne girebilir?'</strong>,
            <strong> 'Sistem sınırları ne zaman zorlanabilir?'</strong> ve <strong>'Matematiksel koşullar ne zaman patlayabilir?'</strong> sorularını kendimize sormalıyız.
            Try-catch bir hava yastığıdır; ancak emniyetli sürüşü sağlayacak olan sürücünün dikkati ve mantığıdır."
          </p>
        </div>
      </div>
    </div>
  );
};
