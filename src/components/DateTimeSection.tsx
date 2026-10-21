import React, { useState, useEffect } from 'react';
import { MICROSOFT_DOCS, AUTHOR_NAME } from '../data/courseData';
import { Calendar, Clock, ExternalLink, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

export const DateTimeSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeFormat, setActiveFormat] = useState<string>('dd.MM.yyyy HH:mm:ss');
  const [isLiveClock, setIsLiveClock] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>('DateTime.Now çalıştırıldı.');

  // Live clock ticker
  useEffect(() => {
    if (!isLiveClock) return;
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isLiveClock]);

  // Date manipulation helpers
  const handleAddDays = (days: number) => {
    setIsLiveClock(false);
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
    setLastAction(`tarih = tarih.AddDays(${days});`);
  };

  const handleAddMonths = (months: number) => {
    setIsLiveClock(false);
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + months);
    setCurrentDate(next);
    setLastAction(`tarih = tarih.AddMonths(${months});`);
  };

  const handleAddYears = (years: number) => {
    setIsLiveClock(false);
    const next = new Date(currentDate);
    next.setFullYear(next.getFullYear() + years);
    setCurrentDate(next);
    setLastAction(`tarih = tarih.AddYears(${years});`);
  };

  const handleResetToNow = () => {
    setIsLiveClock(true);
    setCurrentDate(new Date());
    setLastAction('tarih = DateTime.Now;');
  };

  const handleSetToToday = () => {
    setIsLiveClock(false);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setCurrentDate(today);
    setLastAction('tarih = DateTime.Today; // Saat 00:00:00');
  };

  // C# Format Simulation
  const formatDateTime = (date: Date, fmt: string) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const monthNames = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    switch (fmt) {
      case 'dd.MM.yyyy HH:mm:ss':
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dddd, d MMMM yyyy':
        return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${year}`;
      case 'HH:mm:ss':
        return `${hours}:${minutes}:${seconds}`;
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      default:
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  };

  const formattedValue = formatDateTime(currentDate, activeFormat);

  const turkishDays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dayOfWeek = turkishDays[currentDate.getDay()];
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const generatedCSharpCode = `// ${AUTHOR_NAME} - DateTime Örnek Kullanımı
DateTime suan = DateTime.Now;
DateTime formatli = ${lastAction.includes('tarih =') ? lastAction : 'DateTime.Now'};
string cikti = formatli.ToString("${activeFormat}");

Console.WriteLine($"Tarih: {cikti}");
Console.WriteLine($"Yıl: {formatli.Year}, Ay: {formatli.Month}, Gün: {formatli.Day}");
Console.WriteLine($"Haftanın Günü: {formatli.DayOfWeek}");`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSharpCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="datetime" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800">
      {/* Chapter Indicator */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Bölüm 03</span>
          <span aria-hidden="true">·</span>
          <span>Zaman & Takvim Mimarisi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          DateTime Kütüphanesi
        </h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          {MICROSOFT_DOCS.dateTime.officialNote}
        </p>
      </div>

      {/* Official Microsoft Docs Link Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span>Microsoft Resmi Dokümantasyonu</span>
              <span aria-hidden="true">·</span>
              <span>.NET Core 3.1 & .NET 8</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {MICROSOFT_DOCS.dateTime.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Datetime'ın tüm property (özellik) ve fonksiyonlarına doğrudan Microsoft Docs üzerinden yakından bakabilirsiniz.
            </p>
          </div>

          <a
            href={MICROSOFT_DOCS.dateTime.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm shadow-blue-500/20 whitespace-nowrap shrink-0 group"
          >
            <span>Microsoft Docs'ta İncele</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Interactive DateTime Playground */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Canlı Zaman Laboratuvarı</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              DateTime Simülatörü ve Format Test Edici
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Anlık saatle çalışın, tarihe gün/ay/yıl ekleyin ve farklı C# ToString() biçimlendirmelerini test edin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToNow}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isLiveClock
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>DateTime.Now (Canlı)</span>
            </button>
            <button
              onClick={handleSetToToday}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              DateTime.Today
            </button>
          </div>
        </div>

        {/* Current Active Date Display Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Visual Display */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Simüle Edilen Değer</span>
              </span>
              <span className="font-mono text-cyan-400 text-xs">
                Format: <code className="text-white">"{activeFormat}"</code>
              </span>
            </div>

            <div className="my-3 font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums overflow-x-auto py-1">
              {formattedValue}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
              <span>Son İşlem: <strong className="text-cyan-300 font-mono">{lastAction}</strong></span>
              <span className="text-slate-600">|</span>
              <span>Durum: {isLiveClock ? <span className="text-emerald-400 font-medium">Canlı Sayaç Açık</span> : <span className="text-amber-400 font-medium">Sabit Değer</span>}</span>
            </div>
          </div>

          {/* Key Properties Box */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
            <div className="font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">
              Okunan Özellikler (Properties)
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.Year (Yıl):</span>
              <span className="font-mono font-bold text-white tabular-nums">{currentDate.getFullYear()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.Month (Ay):</span>
              <span className="font-mono font-bold text-white tabular-nums">{currentDate.getMonth() + 1}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.Day (Gün):</span>
              <span className="font-mono font-bold text-white tabular-nums">{currentDate.getDate()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.DayOfWeek:</span>
              <span className="font-mono font-bold text-cyan-400">{dayOfWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.DayOfYear:</span>
              <span className="font-mono font-bold text-white tabular-nums">{dayOfYear}. gün</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">.TimeOfDay:</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {currentDate.toTimeString().split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Controls: Actions & Formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Method Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              Zaman Ekleme / Çıkarma Fonksiyonları (Methods):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleAddDays(1)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                +1 Gün (.AddDays)
              </button>
              <button
                onClick={() => handleAddDays(7)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                +7 Gün (1 Hafta)
              </button>
              <button
                onClick={() => handleAddDays(-1)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                -1 Gün (Dün)
              </button>
              <button
                onClick={() => handleAddMonths(1)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                +1 Ay (.AddMonths)
              </button>
              <button
                onClick={() => handleAddYears(1)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                +1 Yıl (.AddYears)
              </button>
              <button
                onClick={() => handleAddDays(30)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-colors"
              >
                +30 Gün
              </button>
            </div>
          </div>

          {/* Formats Selector */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              C# ToString() Format Şablonları:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Standart Tarih & Saat', fmt: 'dd.MM.yyyy HH:mm:ss' },
                { label: 'ISO Format (Veritabanı)', fmt: 'yyyy-MM-dd' },
                { label: 'Geniş Metinsel Tarih', fmt: 'dddd, d MMMM yyyy' },
                { label: 'Sadece Saat', fmt: 'HH:mm:ss' },
                { label: 'Eğik Çizgili Tarih', fmt: 'dd/MM/yyyy' }
              ].map((f) => (
                <button
                  key={f.fmt}
                  onClick={() => setActiveFormat(f.fmt)}
                  className={`p-2.5 text-left rounded-lg border transition-all text-xs ${
                    activeFormat === f.fmt
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[11px] text-white">{f.fmt}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{f.label}</div>
                </button>
              ))}
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

      {/* DateTime Properties & Methods Reference Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h4 className="text-base font-bold text-white mb-4">
            En Sık Başvurulan DateTime Özellikleri (Properties)
          </h4>
          <div className="space-y-3">
            {MICROSOFT_DOCS.dateTime.keyProperties.map((p) => (
              <div key={p.name} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-400">{p.name}</span>
                  <span className="text-[11px] font-mono text-slate-400">dönen: {p.type}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h4 className="text-base font-bold text-white mb-4">
            En Sık Başvurulan DateTime Metotları (Functions)
          </h4>
          <div className="space-y-3">
            {MICROSOFT_DOCS.dateTime.keyMethods.map((m) => (
              <div key={m.name} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-xs font-bold text-emerald-400 block mb-1">{m.name}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
