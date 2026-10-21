import React, { useState } from 'react';
import { USER_INFO, CSHARP_FULL_SOURCE_CODE } from '../data/csharpExamples';
import { Copy, Check, Download, FileCode, UserCheck } from 'lucide-react';

export const HomeworkSubmission: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const repoUrl = 'https://github.com/EnesBinMalik/csharp-degiskenler-veri-tipleri-kilavuzu/tree/main/csharp-metot-overloading-out-parametreleri';
  const appUrl = typeof window !== 'undefined' ? window.location.href : repoUrl;

  const fullReportText = `====================================================================
ÖDEV TESLİM FORMU / C# DERSİ PROJE DETAYLARI
====================================================================
Öğrenci / Geliştirici : ${USER_INFO.author}
Konu                 : ${USER_INFO.topic}
Tarih                : ${USER_INFO.date}
Uygulama Sayfası Linki : ${appUrl}
GitHub Repo Linki    : ${repoUrl}
====================================================================

1. METOT OVERLOADING (AŞIRI YÜKLEME) NEDİR?
Metot overloading (aşırı yükleme), aynı sınıfta aynı isimde fakat farklı metot imzalarına (method signature) sahip birden çok metodun tanımlanabilmesidir. Bu sayede aynı işi farklı parametre kombinasyonları ile yapan metotlar tek bir isim altında düzenli bir biçimde toplanır.

2. METOT İMZASI NELERİ İÇERİR?
Metot overload ayrımında metot adı, tür parametre sayısı ve parametrelerin türü, sırası ve geçirme biçimi dikkate alınır.
ÖNEMLİ KURAL: Dönüş türü ve parametre adları overload ayrımı oluşturmaz. Yalnızca dönüş türünü değiştirerek bir metot aşırı yüklenemez; aksi durumda CS0111 oluşur.

3. KOD ÖRNEKLERİ (METOT OVERLOADING):
    public void EkranaYazdir(int deger)
    {
        Console.WriteLine(deger);
    }

    public void EkranaYazdir(string deger)
    {
        Console.WriteLine(deger);
    }

    public void EkranaYazdir(string deger1, string deger2)
    {
        Console.WriteLine(deger1 + deger2);
    }

4. OUT VE REF PARAMETRE KULLANIMI:
- out ve ref, çağıranın değişkenine dil düzeyinde başvuru sağlar; ham bellek adresi/işaretçi aktarımı değildir.
- Out olarak kullanılmak istenen değişken önüne mutlaka "out" yazılmalıdır.
- Out değişkeninin bir İLK DEĞERİ OLMAK ZORUNDA DEĞİLDİR (ref'te ise ilk değer zorunludur).
- Normal dönüş yollarının her birinde out parametresine değer atanmalıdır (CS0177).

Örnek Out Kullanımı:
    instance.Toplam(4, 8, out int toplam);

    public int Toplam(int a, int b, out int toplam)
    {
        toplam = a + b;
        return toplam;
    }

5. PROJE ÖZELLİKLERİ:
- İnteraktif metot overloading örnekleri ve temel imza doğrulayıcı
- out/ref parametre aktarımını anlatan kavramsal görselleştirme
- Geçersiz İmza Testi (CS0111 Geri Dönüş Tipi ve CS0663 Hata Doğrulayıcı)
- Önceden tanımlanmış konsol çıktıları ve int.TryParse örneği
- 5 Soruluk Ayrıntılı Bilgi Sınavı

Saygılarımla,
${USER_INFO.author}
====================================================================`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CSHARP_FULL_SOURCE_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([CSHARP_FULL_SOURCE_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Program.cs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-2">
          <span>Ödev &amp; Proje Teslim Portalı</span>
          <span aria-hidden="true">·</span>
          <span>Resmi Teslimat Belgesi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Ödev Teslim Paneli &amp; Proje Detayları
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
          Eğitim projesine ait açıklama, bağlantı ve örnek kaynak kodu.
        </p>
      </div>

      {/* Main Official Submission Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Watermark-free accent corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header & Author Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-400 font-mono tracking-wider uppercase">
              C# Ödev Teslim Kartı
            </span>
            <h3 className="text-xl font-bold text-white">{USER_INFO.topic}</h3>
            <div className="text-xs text-slate-400">
              {USER_INFO.course} · Teslim Tarihi: {USER_INFO.date}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Geliştirici / İmza</span>
              <span className="text-sm font-bold text-white">{USER_INFO.author}</span>
            </div>
          </div>
        </div>

        {/* Action Quick Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Live App Link Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Bu sayfanın bağlantısı:</span>
              <button
                onClick={handleCopyLink}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Kopyalandı' : 'Linki Kopyala'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 truncate">
              {appUrl}
            </div>
          </div>

          {/* GitHub Repo Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>GitHub Proje Deposu:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(repoUrl);
                }}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Repo Linkini Kopyala</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 truncate">
              {repoUrl}
            </div>
          </div>
        </div>

        {/* Submission Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-500/20"
          >
            {copiedReport ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedReport ? 'Teslim Raporu Kopyalandı!' : 'Tüm Teslim Metnini Kopyala'}</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Program.cs Dosyasını İndir</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <FileCode className="w-4 h-4" />}
            <span>{copiedCode ? 'C# Kodu Kopyalandı' : 'C# Kodunu Kopyala'}</span>
          </button>
        </div>

        {/* Source Code Viewer (Program.cs) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Program.cs (Tam Kaynak Kodu - Visual Studio / .NET CLI Uyumlu)</span>
            <span className="text-slate-400">Eğitim amaçlı C# örnek kodu</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <pre className="p-4 text-xs font-mono text-slate-300 max-h-96 overflow-y-auto leading-relaxed">
              <code>{CSHARP_FULL_SOURCE_CODE}</code>
            </pre>
          </div>
        </div>

        {/* Official Signature Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            Enes Öztürk tarafından hazırlanmıştır.
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[11px]">Teslim Eden:</span>
            <span className="font-bold text-amber-400 text-sm tracking-wide">
              Enes Öztürk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
