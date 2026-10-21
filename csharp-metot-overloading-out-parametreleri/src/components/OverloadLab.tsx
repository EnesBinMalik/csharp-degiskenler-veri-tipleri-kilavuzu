import React, { useState } from 'react';
import { OVERLOAD_METHODS } from '../data/csharpExamples';
import { CheckCircle2, AlertTriangle, Play, RefreshCw, Terminal, ArrowRight, Info } from 'lucide-react';

export const OverloadLab: React.FC = () => {
  // Simulator State
  const [selectedMethodId, setSelectedMethodId] = useState<string>('ov-int');
  const [inputValue1, setInputValue1] = useState<string>('100');
  const [inputValue2, setInputValue2] = useState<string>('Enes ');
  const [inputValue3, setInputValue3] = useState<string>('Öztürk');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[Simülasyon]: Üç EkranaYazdir overload örneği hazır.',
    '[Hazır]: Örnek bir çağrı seçin ve temsilî konsol çıktısını görüntüleyin.',
  ]);

  // Return type experiment toggle
  const [showReturnTypeError, setShowReturnTypeError] = useState<boolean>(false);

  const activeMethod = OVERLOAD_METHODS.find((m) => m.id === selectedMethodId) || OVERLOAD_METHODS[0];

  const handleExecute = () => {
    const timestamp = new Date().toLocaleTimeString('tr-TR');
    let callString = '';
    let outputString = '';

    if (selectedMethodId === 'ov-int') {
      const trimmedValue = inputValue1.trim();
      const num = Number(trimmedValue);
      if (!/^[+-]?\d+$/.test(trimmedValue) || !Number.isInteger(num) || num < -2147483648 || num > 2147483647) {
        setConsoleLogs((prev) => [
          ...prev,
          `[${timestamp}] ⚠️ Simülasyon: "${inputValue1}" geçerli bir C# int değeri değil.`,
        ]);
        return;
      }
      callString = `instance.EkranaYazdir(${num});`;
      outputString = `${num}`;
    } else if (selectedMethodId === 'ov-string') {
      callString = `instance.EkranaYazdir("${inputValue2}");`;
      outputString = `${inputValue2}`;
    } else {
      callString = `instance.EkranaYazdir("${inputValue2}", "${inputValue3}");`;
      outputString = `${inputValue2}${inputValue3}`;
    }

    setConsoleLogs((prev) => [
      ...prev,
      `[${timestamp}] Çağrı: ${callString}`,
      `[${timestamp}] Çıktı >> ${outputString}`,
    ]);
  };

  const handleClearLogs = () => {
    setConsoleLogs(['[Konsol Temizlendi]']);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-2">
          <span>Bölüm 1</span>
          <span aria-hidden="true">·</span>
          <span>C# Nesne Yönelimli Programlama</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Metot Overloading (Aşırı Yükleme)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Method overloading, metot imzasının (Method Signature) değiştirilerek aynı isimdeki bir metodun
          farklı parametre kombinasyonlarıyla birden çok versiyonunun oluşturulmasıdır.
        </p>
      </div>

      {/* Signature Anatomy Box */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <span>C# Metot İmzası (Method Signature) Anatomisi</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          C# overload kuralları metot adı ve parametre listesini dikkate alır. Bu uygulama parametre türlerini ve temel geçirme biçimlerini gösterir:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/30">
            <div className="flex items-center justify-between text-xs text-sky-400 font-semibold mb-1">
              <span>1. Metot Adı</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-xs text-slate-300 mt-2 font-mono">EkranaYazdir</p>
            <p className="text-xs text-slate-400 mt-1">İsimler aynı olmalıdır ki overloading olsun.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/30">
            <div className="flex items-center justify-between text-xs text-sky-400 font-semibold mb-1">
              <span>2. Parametre Sayısı</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-xs text-slate-300 mt-2 font-mono">1 parametre vs 2 parametre</p>
            <p className="text-xs text-slate-400 mt-1">Parametre sayısı farklı olabilir.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/30">
            <div className="flex items-center justify-between text-xs text-sky-400 font-semibold mb-1">
              <span>3. Parametre Tipleri</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-xs text-slate-300 mt-2 font-mono">int vs string</p>
            <p className="text-xs text-slate-400 mt-1">Veri tipleri farklıysa aynı sayıda parametre kabul edilir.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 bg-rose-950/10">
            <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-1">
              <span>Geri Dönüş Tipi</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-xs text-rose-300 mt-2 font-mono">void / int / string</p>
            <p className="text-xs text-rose-300/80 mt-1 font-medium">İmzaya DAHİL DEĞİLDİR! Hata verir.</p>
          </div>
        </div>
      </div>

      {/* Interactive Overload Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overload Selector & Source Code */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">
              Kullanıcının Verdiği 3 Overload Versiyonu
            </h3>
            <span className="text-xs text-slate-400">Aktif Seçim: {activeMethod.name}</span>
          </div>

          {/* Interactive Method Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OVERLOAD_METHODS.map((method, idx) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                  selectedMethodId === method.id
                    ? 'bg-sky-950/40 border-sky-500/80 text-white shadow-sm shadow-sky-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="text-xs font-semibold text-sky-400 mb-1">
                  Overload #{idx + 1}
                </div>
                <div className="font-mono text-xs font-bold truncate">
                  ({method.parameters.map((p) => p.type).join(', ')})
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate">
                  {method.description}
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                Metotlar.cs · {activeMethod.id}
              </span>
              <span className="text-sky-400 font-medium">Metot İmzası Geçerli</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{activeMethod.codeSnippet}</code>
            </pre>
          </div>

          {/* Input Controls for testing */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-slate-200">
              Parametre Değerlerini Belirleyin &amp; Çağrıyı Test Edin:
            </div>

            {selectedMethodId === 'ov-int' && (
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-mono">
                  int deger:
                </label>
                <input
                  type="number"
                  value={inputValue1}
                  onChange={(e) => setInputValue1(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                  placeholder="Örn: 42"
                />
              </div>
            )}

            {selectedMethodId === 'ov-string' && (
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-mono">
                  string deger:
                </label>
                <input
                  type="text"
                  value={inputValue2}
                  onChange={(e) => setInputValue2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                  placeholder="Örn: Merhaba Dünya"
                />
              </div>
            )}

            {selectedMethodId === 'ov-string-two' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-mono">
                    string deger1:
                  </label>
                  <input
                    type="text"
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                    placeholder="Örn: Enes "
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-mono">
                    string deger2:
                  </label>
                  <input
                    type="text"
                    value={inputValue3}
                    onChange={(e) => setInputValue3(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                    placeholder="Örn: Öztürk"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleExecute}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Metodu Çağır ve Konsola Yazdır</span>
            </button>
          </div>
        </div>

        {/* Right Column: Console & Derleyici Analizörü */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Simüle Edilen Konsol Çıktısı</span>
            </h3>
            <button
              onClick={handleClearLogs}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Temizle</span>
            </button>
          </div>

          {/* Console Window */}
          <div className="rounded-xl border border-slate-800 bg-black/80 font-mono text-xs overflow-hidden h-72 flex flex-col shadow-inner">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-slate-400 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span>Tarayıcı konsol simülasyonu</span>
            </div>
            <div className="p-4 overflow-y-auto space-y-1.5 flex-1 text-slate-300">
              {consoleLogs.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.includes('Çıktı >>')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('Hata')
                      ? 'text-rose-400'
                      : 'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Critical Rule Callout: Return Type is NOT part of signature */}
          <div className="p-5 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Önemli Kural: Geri Dönüş Tipi
              </span>
              <button
                onClick={() => setShowReturnTypeError(!showReturnTypeError)}
                className="text-xs px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition-colors cursor-pointer"
              >
                {showReturnTypeError ? 'Simülasyonu Kapat' : 'Hata Senaryosunu Gör'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dönüş türü ve parametre adları overload ayrımı oluşturmaz. Aynı ad ve parametre listesiyle yalnızca dönüş türünü değiştirerek ikinci bir metot tanımlanamaz.
            </p>

            {showReturnTypeError && (
              <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-rose-500/40 text-xs font-mono space-y-2">
                <div className="text-rose-400 font-semibold">
                  CS0111: Type 'Metotlar' already defines a member called 'EkranaYazdir' with the same parameter types
                </div>
                <div className="text-slate-400 text-xs">
                  // HATA VEREN KOD:<br />
                  public void EkranaYazdir(int deger) &#123; ... &#125;<br />
                  public int EkranaYazdir(int deger) &#123; return deger; &#125; // ❌ CS0111!
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  <strong>Neden?</strong> Overload çözümlemesi çağrının metot adı ve argümanlarına göre yapılır; dönüş türü farklı olması aynı parametre listesiyle ikinci bir metot imzası oluşturmaz.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
