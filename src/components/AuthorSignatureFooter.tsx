import React from 'react';
import { AUTHOR_NAME, MICROSOFT_DOCS } from '../data/courseData';
import { ExternalLink, Code2, Heart, BookOpen, Sparkles } from 'lucide-react';

export const AuthorSignatureFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Signature Block */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400 text-xl font-mono shrink-0 shadow-inner">
                EÖ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{AUTHOR_NAME}</h3>
                  <span className="text-[11px] text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    Eğitmen & Yazar
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  "Değişkenler bizim uygulama geliştirirken kullandığımız veri tutucularımızdır. Doğru veri tipi tercihi, uygulamanızın bellek yönetimini ve işlemci performansını doğrudan belirler."
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">
                Eğitim İmzası
              </span>
              <div className="font-serif italic text-2xl font-bold text-cyan-400">
                Enes Öztürk
              </div>
              <span className="text-[11px] text-slate-400 mt-1">C# & .NET Eğitimi Özel Serisi</span>
            </div>
          </div>
        </div>

        {/* Microsoft Documentation Quick Reference Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Resmi Kaynak
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              System.DateTime API Dokümantasyonu
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Tarih, saat ve takvim işlemlerinin tüm property ve metotları için Microsoft Docs.
            </p>
            <a
              href={MICROSOFT_DOCS.dateTime.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline break-all"
            >
              learn.microsoft.com/tr-tr/dotnet/api/system.datetime
            </a>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Resmi Kaynak
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              System.String API Dokümantasyonu
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Metin dizileri, manipülasyon ve arama fonksiyonları için Microsoft Docs.
            </p>
            <a
              href={MICROSOFT_DOCS.string.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline break-all"
            >
              learn.microsoft.com/tr-tr/dotnet/api/system.string
            </a>
          </div>
        </div>

        {/* Quiet Bottom Copyright & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>C# & .NET Değişkenler Kılavuzu</span>
            <span aria-hidden="true">·</span>
            <span>{AUTHOR_NAME} İmzalı İçerik</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#degisken-nedir" className="hover:text-slate-300 transition-colors">
              Değişken Nedir?
            </a>
            <a href="#kurallar" className="hover:text-slate-300 transition-colors">
              Kurallar
            </a>
            <a href="#datetime" className="hover:text-slate-300 transition-colors">
              DateTime
            </a>
            <a href="#string" className="hover:text-slate-300 transition-colors">
              String
            </a>
            <a href="#test" className="hover:text-slate-300 transition-colors">
              Test
            </a>
          </div>
        </div>
        <p className="mt-5 text-center text-[11px] text-slate-600">
          © 2026 {AUTHOR_NAME}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};
