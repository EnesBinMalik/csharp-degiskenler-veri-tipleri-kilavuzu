import React, { useState } from 'react';
import { DATA_TYPES, AUTHOR_NAME } from '../data/courseData';
import { DataTypeInfo } from '../types';
import { Cpu, Database, Layers, Zap, Info, Check, Copy } from 'lucide-react';

export const VariableIntroSection: React.FC = () => {
  const [recordCount, setRecordCount] = useState<number>(50000);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedType, setSelectedType] = useState<DataTypeInfo>(DATA_TYPES[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['Tümü', 'Metin / Karakter', 'Tam Sayı', 'Ondalıklı Sayı', 'Mantıksal', 'Tarih / Zaman'];

  const filteredTypes = selectedCategory === 'Tümü'
    ? DATA_TYPES
    : DATA_TYPES.filter(t => t.category === selectedCategory);

  const utf16PayloadBytes = recordCount * 2;
  const utf16PayloadMB = (utf16PayloadBytes / (1024 * 1024)).toFixed(2);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="degisken-nedir" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800">
      {/* Editorial Chapter Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 01</span>
          <span aria-hidden="true">·</span>
          <span>Temel Kavramlar & Bellek Mimarisi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Değişken Nedir?
        </h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          Uygulama geliştirirken verileri bellekte geçici olarak depoladığımız isimlendirilmiş veri tutucuları.
        </p>
      </div>

      {/* Primary Quote from User's Prompt */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/70 border border-cyan-500/30 relative mb-12 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-3 text-slate-200">
            <blockquote className="text-base sm:text-lg italic leading-relaxed text-slate-100">
              "Değişkenler bizim uygulama geliştirirken kullandığımız veri tutucularımızdır. Kullandığımız verinin tipine ve büyüklüğüne bağlı olarak doğru veri tipini seçiyor olmak önemli. Örneğin sadece tek bir karakter tutmaya ihtiyacımız varsa o veri için Char veri tipinizi tanımlamak yeterli olacaktır. String tipinde bir değişken kullanmak gereksizdir. Uygulamanın performansı açısından doğru veri tiplerine karar verebilmek önemlidir."
            </blockquote>
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 pt-1">
              <span>— {AUTHOR_NAME}</span>
              <span aria-hidden="true">·</span>
              <span>Ders Notu & Temel İlke</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Char vs String memory illustration */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Performans & Bellek Laboratuvarı</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              char ve string: veri türü ve bellek kavramları
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              char ve string türlerinin anlamını ve bellek maliyetinin neden bağlama göre değiştiğini görün.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Örnek Veri Boyutu:</span>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-sm font-semibold tabular-nums">
              {recordCount.toLocaleString('tr-TR')} Kayıt
            </span>
          </div>
        </div>

        {/* Record count slider */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>1,000 Kayıt (Küçük Liste)</span>
            <span className="text-cyan-400 font-semibold">{recordCount.toLocaleString('tr-TR')} Öğe</span>
            <span>200,000 Kayıt (Büyük Veritabanı)</span>
          </div>
          <input
            type="range"
            min="1000"
            max="200000"
            step="1000"
            value={recordCount}
            onChange={(e) => setRecordCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />
        </div>

        {/* Side-by-side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Char Box */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ÖNERİLEN
                </span>
                <span className="font-mono text-base font-bold text-white">char cinsiyet = 'E';</span>
              </div>
              <span className="text-xs font-mono text-slate-400">2 Byte / Kayıt</span>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              <code>char</code>, tek bir 16 bitlik UTF-16 kod birimini tutan bir <strong className="text-white">değer türüdür</strong>.
              Tam bellek konumu onu barındıran bağlama bağlıdır.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tür sınıfı:</span>
                <span className="text-emerald-400 font-medium">Değer türü</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Öğe Başına Bellek:</span>
                <span className="font-mono text-slate-200">2 Byte (UTF-16)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Ham değer verisi:</span>
                <span className="font-mono text-emerald-300 font-bold tabular-nums">
                  {utf16PayloadMB} MB ({utf16PayloadBytes.toLocaleString('tr-TR')} Byte)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Ayrı nesne maliyeti:</span>
                <span className="text-emerald-400 font-medium">char değeri için yok</span>
              </div>
            </div>
          </div>

          {/* String Box */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  METİN TÜRÜ
                </span>
                <span className="font-mono text-base font-bold text-white">string cinsiyet = "E";</span>
              </div>
              <span className="text-xs font-mono text-slate-400">2 Byte / UTF-16 kod birimi*</span>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              <code>string</code>, sıfır veya daha fazla karakterlik metni temsil eden değiştirilemez bir <strong className="text-white">referans türüdür</strong>.
              Nesne ve referans maliyeti çalışma zamanına ve veri yapısına bağlıdır.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tür sınıfı:</span>
                <span className="text-rose-400 font-medium">Referans türü</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Öğe Başına Bellek:</span>
                <span className="font-mono text-slate-200">Sabit değil</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Ham karakter verisi:</span>
                <span className="font-mono text-rose-300 font-bold tabular-nums">
                  {utf16PayloadMB} MB ({utf16PayloadBytes.toLocaleString('tr-TR')} Byte metin verisi)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nesne maliyeti:</span>
                <span className="text-rose-400 font-medium">Çalışma zamanı ve kullanıma bağlı</span>
              </div>
            </div>
          </div>
        </div>

        {/* The payload calculation deliberately excludes runtime-specific object and collection overhead. */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 font-bold">
              ✓
            </div>
            <div>
              <span className="font-semibold text-slate-200">Bellek hesabını doğru yorumlayın:</span>
              <p className="text-slate-400 mt-0.5">
                {recordCount.toLocaleString('tr-TR')} tek birimlik UTF-16 karakterin ham içerik boyutu
                <strong className="text-white font-mono"> {utf16PayloadMB} MB ({utf16PayloadBytes.toLocaleString('tr-TR')} bayt)</strong> eder.
                Bu örnek nesne başlığı, referans, dizi ve hizalama maliyetlerini hesaplamaz; sabit RAM tasarrufu veya GC yükü iddia etmez.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Types Catalog */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">C# Veri Tipleri Kataloğu</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Boyutlar türün tanımlı değer genişliğini gösterir; toplam nesne veya uygulama belleğini göstermez.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredTypes.map((t) => {
            const isSelected = selectedType.name === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setSelectedType(t)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-cyan-400">{t.csharpKeyword}</span>
                    <span className="text-[11px] text-slate-400">({t.dotnetType})</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 tabular-nums">
                    {t.sizeBytes === null ? 'Değişken' : `${t.sizeBytes} Byte`}
                  </span>
                </div>

                <div className="text-xs text-slate-300 line-clamp-2 mb-3">
                  {t.rangeDescription}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{t.memoryType}</span>
                  <span className="font-mono text-cyan-300/80">{t.exampleValue}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Type Detailed Inspector */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400">
                {selectedType.csharpKeyword.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white font-mono">{selectedType.csharpKeyword}</h4>
                  <span className="text-xs text-slate-400 font-mono">({selectedType.dotnetType})</span>
                  <span className="text-xs text-cyan-400">· {selectedType.category}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedType.rangeDescription}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="text-slate-500">Tür boyutu</span>
                <div className="font-mono font-bold text-white tabular-nums">{selectedType.sizeBytes === null ? 'Değişken' : `${selectedType.sizeBytes} Byte`}</div>
              </div>
              <div className="text-right border-l border-slate-800 pl-4">
                <span className="text-slate-500">Tür sınıfı</span>
                <div className="font-semibold text-cyan-400">{selectedType.memoryType}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="font-semibold text-slate-300 block mb-1">Ne Zaman Kullanılmalı?</span>
              <p className="text-slate-400 leading-relaxed">{selectedType.goodUseCases}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="font-semibold text-cyan-400 block mb-1">Performans Notu</span>
              <p className="text-slate-400 leading-relaxed">{selectedType.performanceNote}</p>
            </div>
          </div>

          {/* Sample code snippet */}
          <div className="relative p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800/80 flex items-center justify-between">
            <code>
              <span className="text-cyan-400">{selectedType.csharpKeyword}</span> ornekVeri = {selectedType.exampleValue};
            </code>
            <button
              onClick={() => handleCopy(`${selectedType.csharpKeyword} ornekVeri = ${selectedType.exampleValue};`)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
