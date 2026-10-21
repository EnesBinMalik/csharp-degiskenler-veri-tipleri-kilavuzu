import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Terminal } from 'lucide-react';

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const templates = [
    {
      key: 'ext_template',
      title: 'Standart C# Extension Metot Şablonu (Guard Clause Korumalı)',
      code: `public static class Extensions
{
    /// <summary>
    /// Genişletilen tipe yeni işlev kazandıran extension metot şablonu.
    /// </summary>
    public static TResult MyExtension<TSource, TResult>(this TSource source, object parameter)
    {
        // 1. Guard Clause: Null referans kontrolü
        if (source == null)
            throw new ArgumentNullException(nameof(source), "Genişletilen kaynak nesne null olamaz.");

        // 2. İş mantığı
        TResult result = default;
        // ... algoritma ...

        return result;
    }
}`
    },
    {
      key: 'rec_template',
      title: 'Güvenli Rekürsif Metot Şablonu (StackOverflow Korumalı)',
      code: `public static class RecursionHelper
{
    /// <summary>
    /// Taban durumu korumalı güvenli özyinelemeli fonksiyon şablonu.
    /// </summary>
    public static int SafeRecursion(int n, int maxDepth = 1000)
    {
        // 1. Derinlik Güvenlik Kilidi (StackOverflow önleyici guard)
        if (maxDepth <= 0)
            throw new InvalidOperationException("Maksimum rekürsiyon derinliği aşıldı!");

        // 2. Taban Durumu (Base Condition) - MUTLAKA İLK SIRADA
        if (n <= 0)
            return 0;
        if (n == 1)
            return 1;

        // 3. İlerleme & Kendini Çağırma (Recursive Step)
        return n + SafeRecursion(n - 1, maxDepth - 1);
    }
}`
    },
    {
      key: 'prompt_snippets',
      title: 'Prompt Referans Kodları (IsEvenNumber & FibonacciSerisi)',
      code: `// --- 1. EXTENSION METOT ÖRNEĞİ ---
public static class MyExtensionClass
{
    public static bool IsEvenNumber(this int value)
    {
        if (value % 2 == 0)
            return true;
        else
            return false;
    }
}
// Kullanım: int deger = 123; bool isEven = deger.IsEvenNumber();

// --- 2. REKÜRSİF METOT ÖRNEĞİ ---
static int FibonacciSerisi(int sayi)
{
    if (sayi == 0)
        return 0;
    else if (sayi == 1)
        return 1;
    else
        return FibonacciSerisi(sayi - 1) + FibonacciSerisi(sayi - 2);
}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              C# Extension & Rekürsif Kod Şablonları (Enes Öztürk)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6">
          {templates.map((tpl) => (
            <div key={tpl.key} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{tpl.title}</span>
                </h4>
                <button
                  onClick={() => copyCode(tpl.code, tpl.key)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  {copiedKey === tpl.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                <pre><code>{tpl.code}</code></pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Enes Öztürk Özel C# Mühendislik Dokümanı</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
