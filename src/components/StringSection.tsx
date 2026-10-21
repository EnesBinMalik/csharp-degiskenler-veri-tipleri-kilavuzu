import React, { useState } from 'react';
import { MICROSOFT_DOCS, AUTHOR_NAME } from '../data/courseData';
import { Type, ExternalLink, Scissors, Sparkles, Copy, Check, FileText } from 'lucide-react';

export const StringSection: React.FC = () => {
  const [inputText, setInputText] = useState<string>('  Enes Öztürk - C# Yazılım Geliştirme  ');
  const [lastOperation, setLastOperation] = useState<string>('Trim()');
  const [resultText, setResultText] = useState<string>('Enes Öztürk - C# Yazılım Geliştirme');
  const [returnType, setReturnType] = useState<string>('string');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Operations
  const handleOperation = (op: string) => {
    setLastOperation(op);
    switch (op) {
      case 'ToUpper()':
        setResultText(inputText.toUpperCase());
        setReturnType('string');
        break;
      case 'ToLower()':
        setResultText(inputText.toLowerCase());
        setReturnType('string');
        break;
      case 'Trim()':
        setResultText(inputText.trim());
        setReturnType('string');
        break;
      case 'TrimStart()':
        setResultText(inputText.trimStart());
        setReturnType('string');
        break;
      case 'TrimEnd()':
        setResultText(inputText.trimEnd());
        setReturnType('string');
        break;
      case 'Length':
        setResultText(inputText.length.toString());
        setReturnType('int');
        break;
      case 'Contains("C#")':
        setResultText(inputText.includes('C#') ? 'True' : 'False');
        setReturnType('bool');
        break;
      case 'StartsWith("Enes")':
        setResultText(inputText.trim().startsWith('Enes') ? 'True (Trim sonrasında)' : 'False (Boşlukla başlıyor)');
        setReturnType('bool');
        break;
      case 'Substring(0, 11)':
        const trimmed = inputText.trim();
        setResultText(trimmed.length >= 11 ? trimmed.substring(0, 11) : trimmed);
        setReturnType('string');
        break;
      case 'Replace("C#", ".NET 8")':
        setResultText(inputText.replace(/C#/g, '.NET 8'));
        setReturnType('string');
        break;
      case 'Split(\'-\')':
        const parts = inputText.split('-').map(s => `"${s.trim()}"`);
        setResultText(`[ ${parts.join(', ')} ]`);
        setReturnType('string[]');
        break;
      case 'string.IsNullOrWhiteSpace()':
        const isWhite = !inputText || inputText.trim().length === 0;
        setResultText(isWhite ? 'True' : 'False');
        setReturnType('bool');
        break;
      default:
        setResultText(inputText);
        setReturnType('string');
    }
  };

  const generatedCSharpCode = `// ${AUTHOR_NAME} - String Kütüphanesi Örnek Kullanımı
string metin = "${inputText}";

// Yapılan İşlem: ${lastOperation}
${
  returnType === 'string'
    ? `string sonuc = metin.${lastOperation};`
    : returnType === 'int'
    ? `int sonuc = metin.${lastOperation};`
    : returnType === 'bool'
    ? `bool sonuc = ${lastOperation.startsWith('string.') ? lastOperation.replace('()', '(metin)') : `metin.${lastOperation}`};`
    : `string[] sonuc = metin.${lastOperation};`
}

Console.WriteLine($"Sonuç: {sonuc}");
Console.WriteLine($"Uzunluk: {metin.Length}");`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSharpCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="string" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800">
      {/* Chapter Indicator */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 04</span>
          <span aria-hidden="true">·</span>
          <span>Metin İşleme & String Türü</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          String Kütüphanesi (System.String)
        </h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          {MICROSOFT_DOCS.string.description}
        </p>
      </div>

      {/* Official Microsoft Docs Link Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>Microsoft Resmi Dokümantasyonu</span>
              <span aria-hidden="true">·</span>
              <span>.NET API Başvurusu</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {MICROSOFT_DOCS.string.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              String kütüphanesinin fonksiyonlarına yakından bakmak için resmi Microsoft dokümanları en zengin API referansını sunar.
            </p>
          </div>

          <a
            href={MICROSOFT_DOCS.string.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm shadow-emerald-500/20 whitespace-nowrap shrink-0 group"
          >
            <span>Microsoft Docs'ta İncele</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Immutability & Heap Concept Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Kritik Mimari Bilgi</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          String İmmutability (Değiştirilemezlik) İlkesi
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          C# dilinde bir String nesnesi oluşturulduktan sonra bellekteki içeriği asla değiştirilemez (Immutable).
          <code className="text-cyan-300 mx-1">metin.ToUpper()</code> veya <code className="text-cyan-300 mx-1">metin.Replace()</code> çağırdığınızda mevcut metin değişmez;
          genellikle yeni bir string sonucu döner; ancak ara nesne oluşturma ve bellek maliyeti çalışma zamanı uygulamasına ve çağrıya bağlıdır.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
          <div className="text-slate-500">// ❌ Hatalı Beklenti (Değişiklik boşa gider):</div>
          <div>string ad = "enes";</div>
          <div>ad.ToUpper(); <span className="text-rose-400">// "ad" hala "enes"tir! Çünkü geri dönen yeni string bir değişkene atanmadı.</span></div>
          <div className="mt-2 text-slate-500">// ✅ Doğru Kullanım (Yeni referans atanmalı):</div>
          <div>string buyukAd = ad.ToUpper(); <span className="text-emerald-400">// "ENES"</span></div>
        </div>
      </div>

      {/* Interactive Live String Lab */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <Scissors className="w-4 h-4" />
              <span>İnteraktif String Laboratuvarı</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Canlı Metin İşleme ve Metot Test İstasyonu
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Aşağıdaki metni değiştirin, fonksiyon butonlarına tıklayın ve sonucun anlık nasıl değiştiğini görün.
            </p>
          </div>
        </div>

        {/* Input Text Box */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Girdi Metni (Test String):
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setResultText(e.target.value);
              setLastOperation('(Doğrudan Girdi)');
              setReturnType('string');
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 font-mono text-sm sm:text-base text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Action Buttons Grid */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-slate-300 block mb-3">
            Uygulanabilir String Metotları:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '.Trim()', op: 'Trim()' },
              { label: '.ToUpper()', op: 'ToUpper()' },
              { label: '.ToLower()', op: 'ToLower()' },
              { label: '.Length', op: 'Length' },
              { label: '.TrimStart()', op: 'TrimStart()' },
              { label: '.TrimEnd()', op: 'TrimEnd()' },
              { label: '.Contains("C#")', op: 'Contains("C#")' },
              { label: '.StartsWith("Enes")', op: 'StartsWith("Enes")' },
              { label: '.Substring(0, 11)', op: 'Substring(0, 11)' },
              { label: '.Replace("C#", ".NET 8")', op: 'Replace("C#", ".NET 8")' },
              { label: '.Split(\'-\')', op: 'Split(\'-\')' },
              { label: 'string.IsNullOrWhiteSpace()', op: 'string.IsNullOrWhiteSpace()' }
            ].map((btn) => (
              <button
                key={btn.op}
                onClick={() => handleOperation(btn.op)}
                className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                  lastOperation === btn.op
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Output Card */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              İşlem Sonucu ({lastOperation})
            </span>
            <span className="font-mono text-cyan-400">Dönüş Türü: <code className="text-white font-bold">{returnType}</code></span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-base sm:text-xl text-emerald-300 overflow-x-auto whitespace-pre">
            {resultText}
          </div>

          {/* Character Indices breakdown */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300">Karakter Dizi Görünümü (Char Array & Indeksler):</span>
              <span className="font-mono tabular-nums text-slate-400">Toplam: {inputText.length} Karakter</span>
            </div>
            <div className="flex gap-1 overflow-x-auto py-2 font-mono text-xs">
              {Array.from(inputText.slice(0, 30)).map((char, idx) => (
                <div key={idx} className="flex flex-col items-center bg-slate-900 border border-slate-800 rounded p-1 min-w-[28px] shrink-0">
                  <span className="text-[10px] text-slate-500 tabular-nums">{idx}</span>
                  <span className="font-bold text-white text-xs">
                    {char === ' ' ? '␣' : char}
                  </span>
                </div>
              ))}
              {inputText.length > 30 && (
                <div className="flex items-center justify-center text-slate-500 px-2 text-xs">
                  +{inputText.length - 30} daha...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generated C# Code Snippet */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              Üretilen C# Kaynak Kodu
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed p-2 bg-slate-900/60 rounded">
            {generatedCSharpCode}
          </pre>
        </div>
      </div>

      {/* String Methods Reference Matrix */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
        <h4 className="text-base font-bold text-white mb-4">
          En Sık Kullanılan String Fonksiyonları & Açıklamaları
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MICROSOFT_DOCS.string.keyMethods.map((m) => (
            <div key={m.name} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-mono text-xs font-bold text-cyan-400 block mb-1">{m.name}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
