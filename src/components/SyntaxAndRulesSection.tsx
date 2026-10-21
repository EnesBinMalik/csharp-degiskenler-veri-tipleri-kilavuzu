import React, { useState } from 'react';
import { VARIABLE_RULES, AUTHOR_NAME } from '../data/courseData';
import { VariableRule } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Terminal, Code2, Sparkles, HelpCircle } from 'lucide-react';

export const SyntaxAndRulesSection: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<VariableRule>(VARIABLE_RULES[0]);
  const [testInput, setTestInput] = useState<string>('ogrenci_notu');
  const [activePreset, setActivePreset] = useState<string>('ogrenci_notu');

  // Reserved keywords list in C#
  const CSHARP_KEYWORDS = [
    'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked',
    'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else',
    'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for',
    'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock',
    'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params',
    'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
    'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw',
    'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using',
    'virtual', 'void', 'volatile', 'while'
  ];

  // Mathematical and operator characters
  const OPERATORS = ['+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':', '.', ','];

  // Validation function simulating the C# Compiler lexer/parser
  const validateIdentifier = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      return {
        isValid: false,
        errorTitle: 'Boş Girdi',
        errorMessage: 'Lütfen test etmek için bir değişken adı veya tanım girin.',
        errorCode: 'CS1001'
      };
    }

    // Check if user entered a full declaration like "int sayi = 10;" or "string ad;"
    const isFullStatement = trimmed.includes(' ') && (
      trimmed.startsWith('int ') ||
      trimmed.startsWith('string ') ||
      trimmed.startsWith('char ') ||
      trimmed.startsWith('double ') ||
      trimmed.startsWith('float ') ||
      trimmed.startsWith('bool ') ||
      trimmed.startsWith('decimal ') ||
      trimmed.startsWith('DateTime ')
    );

    if (isFullStatement) {
      // Analyze full statement
      if (!trimmed.endsWith(';')) {
        return {
          isValid: false,
          errorTitle: 'Eksik Noktalı Virgül',
          errorMessage: 'C# ifadeleri mutlaka noktalı virgül (;) ile sonlanmalıdır.',
          errorCode: 'CS1002 (; expected)'
        };
      }

      // Check unassigned declaration like "int x;"
      if (!trimmed.includes('=')) {
        return {
          isValid: true,
          isWarning: true,
          errorTitle: 'Atama Yapılmadı (Değer Eksik)',
          errorMessage: 'Değişken tanımlandı ancak değer atanmadı. Bu değişken bir değer atanmadan Console.WriteLine vb. yerlerde kullanılırsa derleyici "CS0165: Use of unassigned local variable" hatası verecektir. Değişkenin başlangıç değeri olmalı veya null verilmelidir.',
          errorCode: 'CS0165 Uyarısı'
        };
      }

      // Extract the variable name part between type and =
      const parts = trimmed.split('=')[0].trim().split(/\s+/);
      if (parts.length > 2) {
        return {
          isValid: false,
          errorTitle: 'Değişken Adında Boşluk Var',
          errorMessage: `Değişken adları boşluk içeremez! "${parts.slice(1).join(' ')}" tek bir isim olmalıdır. Yalnızca alt tire (_) kullanılabilir.`,
          errorCode: 'CS1002 / CS1001'
        };
      }
      const varName = parts[1];
      return validateNameOnly(varName);
    }

    return validateNameOnly(trimmed);
  };

  const validateNameOnly = (name: string) => {
    // Rule 3: Contains space
    if (name.includes(' ')) {
      return {
        isValid: false,
        errorTitle: 'Kural 3 İhlali: Boşluk İçeremez',
        errorMessage: 'Değişken isimlerinde boşluk bırakılamaz. Yalnızca alt tire (_) ifadesi kullanılabilir (Örn: ogrenci_adi veya ogrenciAdi).',
        errorCode: 'CS1002 (; expected)'
      };
    }

    // Rule 2: Starts with number
    if (/^[0-9]/.test(name)) {
      return {
        isValid: false,
        errorTitle: 'Kural 2 İhlali: Rakamla Başlayamaz',
        errorMessage: `Değişken ismi bir rakamla (${name[0]}) başlayamaz. Rakam ancak ilk harften sonra gelebilir (Örn: sayi1, ogrenci2).`,
        errorCode: 'CS1001 (Identifier expected)'
      };
    }

    // Rule 4: Contains math operators
    for (const op of OPERATORS) {
      if (name.includes(op)) {
        return {
          isValid: false,
          errorTitle: 'Kural 4 İhlali: İşlem Operatörü İçeremez',
          errorMessage: `Değişken isminde "${op}" işlem operatörü kullanılamaz. Derleyici bunu matematiksel bir işlem olarak yorumlamaya çalışır. Tire (-) yerine alt tire (_) kullanmalısınız.`,
          errorCode: 'CS1073 (Unexpected token)'
        };
      }
    }

    // Rule 5: Reserved keywords
    if (CSHARP_KEYWORDS.includes(name.toLowerCase())) {
      if (name.startsWith('@')) {
        return {
          isValid: true,
          errorTitle: 'Verbatim Identifier (@) İle Kabul Edildi',
          errorMessage: `"${name}" bir rezerve anahtar sözcük olmasına rağmen başına @ işareti konularak geçerli kılındı. Ancak daha anlaşılır bir isim tercih edilmesi önerilir.`,
          errorCode: 'Geçerli (@ kaçışı)'
        };
      }
      return {
        isValid: false,
        errorTitle: 'Kural 5 İhlali: Rezerve Anahtar Kelime (Keyword)',
        errorMessage: `"${name}" C# dilinde özel bir amaca (class, namespace, int vb.) tahsis edilmiş rezerve anahtar kelimedir. Doğrudan değişken adı olarak kullanılamaz.`,
        errorCode: 'CS1001 / CS0100 (Keyword cannot be used as identifier)'
      };
    }

    // Rule 1 & General Validity
    return {
      isValid: true,
      errorTitle: 'Geçerli Değişken Adı',
      errorMessage: `"${name}" C# değişken tanımlama kurallarına tamamen uygundur. Derleyici bu değişkeni hatasız kabul eder.`,
      errorCode: 'CS_VALID'
    };
  };

  const validationResult = validateIdentifier(testInput);

  const presets = [
    { label: 'ogrenci_notu', value: 'ogrenci_notu', desc: 'Geçerli (Alt tireli)' },
    { label: '1sayi (Hatalı)', value: '1sayi', desc: 'Rakamla başlıyor' },
    { label: 'ad soyad (Hatalı)', value: 'ad soyad', desc: 'Boşluk içeriyor' },
    { label: 'kar-zarar (Hatalı)', value: 'kar-zarar', desc: 'İşlem operatörü (-)' },
    { label: 'class (Hatalı)', value: 'class', desc: 'Rezerve kelime' },
    { label: 'int puan; (Atanmamış)', value: 'int puan;', desc: 'Değer atanmamış' },
    { label: 'int sayi = 10; (Tam)', value: 'int sayi = 10;', desc: 'Kusursuz Tanım' }
  ];

  return (
    <section id="kurallar" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800">
      {/* Chapter Indicator */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 02</span>
          <span aria-hidden="true">·</span>
          <span>Sözdizimi & Kurallar</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Değişken Tanımlama Yapısı & 6 Altın Kural
        </h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          C# derleyicisinin değişkenleri nasıl tanıdığı, sözdizimi formülü ve kod yazarken dikkat etmemiz gereken katı kurallar.
        </p>
      </div>

      {/* Syntax Formula Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          Genel Sözdizimi Formülü
        </div>
        <h3 className="text-xl font-bold text-white mb-6">
          Değişken Tanımlama Yapısı
        </h3>

        {/* Large Formula Display */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-base sm:text-2xl text-white overflow-x-auto shadow-inner">
          <span className="text-blue-400 font-bold">(Değişken Türü)</span>{' '}
          <span className="text-emerald-400 font-bold">(Değişken Adı)</span>{' '}
          <span className="text-yellow-400 font-bold">=</span>{' '}
          <span className="text-amber-300 font-bold">(Değeri)</span>
          <span className="text-slate-400 font-bold">;</span>
        </div>

        {/* 4 Block Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/30">
            <span className="text-xs font-mono font-bold text-blue-400 block mb-1">
              1. Değişken Türü
            </span>
            <div className="text-xs text-slate-300 leading-relaxed">
              Değişkenin hangi türden değer kabul ettiğini belirtir (örn: <code className="text-cyan-300">int</code>, <code className="text-cyan-300">string</code>, <code className="text-cyan-300">char</code>).
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30">
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
              2. Değişken Adı
            </span>
            <div className="text-xs text-slate-300 leading-relaxed">
              Bellekteki adrese programcının erişmesini sağlayan benzersiz tanımlayıcı (identifier).
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-yellow-500/30">
            <span className="text-xs font-mono font-bold text-yellow-400 block mb-1">
              3. Atama Operatörü (=)
            </span>
            <div className="text-xs text-slate-300 leading-relaxed">
              Eşitliğin sağındaki değeri hesaplayıp sol taraftaki değişkenin bellek hücresine yazar.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30">
            <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
              4. Değeri & Noktalı Virgül
            </span>
            <div className="text-xs text-slate-300 leading-relaxed">
              Değişkene aktarılan sabit veya ifade. İfade mutlaka noktalı virgül (;) ile biter.
            </div>
          </div>
        </div>
      </div>

      {/* Live C# Syntax & Identifier Validator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/40 mb-16 shadow-lg shadow-cyan-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4" />
              <span>İnteraktif Sözdizimi Denetleyicisi</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Canlı C# Değişken İsmi & Kural Doğrulayıcı
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Aklınızdaki değişken adını yazın veya tam tanımı girin; derleyici kurallarını canlı simüle edelim.
            </p>
          </div>
        </div>

        {/* Quick presets */}
        <div className="mb-4">
          <span className="text-xs text-slate-400 font-medium block mb-2">Hızlı Test Örnekleri:</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setTestInput(p.value);
                  setActivePreset(p.value);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                  activePreset === p.value
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="relative mb-6">
          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-400 transition-colors">
            <span className="font-mono text-cyan-400 text-sm font-bold mr-3 select-none">C# &gt;</span>
            <input
              type="text"
              value={testInput}
              onChange={(e) => {
                setTestInput(e.target.value);
                setActivePreset('');
              }}
              placeholder="Örn: ogrenci_notu veya int sayi = 25;"
              className="w-full bg-transparent font-mono text-sm sm:text-base text-white focus:outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Validation Result Box */}
        <div
          className={`p-5 rounded-xl border transition-all ${
            validationResult.isValid
              ? validationResult.isWarning
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {validationResult.isValid ? (
              validationResult.isWarning ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-sm font-bold tracking-tight">
                  {validationResult.errorTitle}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-slate-300">
                  {validationResult.errorCode}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {validationResult.errorMessage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Golden Rules Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Değişken Tanımlarken Dikkat Edilmesi Gereken 6 Husus
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Derleyicinin katı sözdizimi denetiminden geçmek ve temiz kod standartlarını korumak için 6 temel kural.
        </p>

        {/* Rule selector buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {VARIABLE_RULES.map((rule) => {
            const isSelected = selectedRule.id === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className={`p-3 text-left rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[11px] font-bold text-cyan-400 block mb-0.5">
                  Kural 0{rule.id}
                </span>
                <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {rule.title.split(' ')[0]} {rule.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Rule Detail Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm font-mono">
              0{selectedRule.id}
            </span>
            <div>
              <h4 className="text-lg font-bold text-white">{selectedRule.title}</h4>
              <p className="text-xs text-slate-400">{selectedRule.shortDesc}</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {selectedRule.explanation}
          </p>

          {/* Valid vs Invalid Code Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Valid Column */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Geçerli Tanımlamalar (Kurala Uygun)</span>
              </div>
              <ul className="space-y-2">
                {selectedRule.validExamples.map((ex, idx) => (
                  <li key={idx} className="font-mono text-xs text-slate-200 bg-slate-900/80 p-2 rounded border border-slate-800">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            {/* Invalid Column */}
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-3">
                <XCircle className="w-4 h-4" />
                <span>Hatalı Kullanımlar (Derleyici Hatası)</span>
              </div>
              <div className="space-y-3">
                {selectedRule.invalidExamples.map((inv, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                    <pre className="font-mono text-xs text-rose-300 mb-1 whitespace-pre-wrap">
                      {inv.code}
                    </pre>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      ↳ {inv.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Tip */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-300">
            <span className="font-bold text-cyan-400 shrink-0">Eğitmen İpucu ({AUTHOR_NAME}):</span>
            <p className="leading-relaxed">{selectedRule.tip}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
