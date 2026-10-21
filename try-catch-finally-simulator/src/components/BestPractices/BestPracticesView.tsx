import React from 'react';
import { BookOpen, Check, X, Shield, Terminal, Zap, Cpu, AlertTriangle, FileCode } from 'lucide-react';

export const BestPracticesView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Mimari Rehber</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Savunmacı Programlama (Defensive Programming) Altın Kuralları
        </h2>
        <p className="mt-2 text-slate-300 text-sm leading-relaxed max-w-3xl">
          Bir yazılımcının kalitesi, sadece çalışan kod yazmasıyla değil; öngörülemeyen kullanıcı davranışları, beklenmedik veri girişleri ve donanım kesintileri karşısında uygulamanın sergilediği dirençle ölçülür.
        </p>
      </div>

      {/* Rule 1: TryParse vs Parse */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase">KURAL 1</span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Kullanıcı Girişlerinde Parse Yerine TryParse Tercih Edin
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Kullanıcı girdisindeki geçersiz biçim beklenen bir durumsa TryParse sonucu açıkça bildirir; istisnaları olağan akış kontrolü olarak kullanmayın.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Bad */}
          <div className="p-4 rounded-xl border border-rose-900/50 bg-rose-950/20 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <X className="w-4 h-4" /> Kötü / Pahalı Yaklaşım
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`try
{
    int sayi = int.Parse(Console.ReadLine());
    // işlem...
}
catch (FormatException)
{
    Console.WriteLine("Hatalı sayı!");
}`}
            </pre>
            <p className="text-rose-300/80 text-[11px] font-sans">
              Geçersiz girdi beklenen bir durumsa TryParse, sonucu dönüş değeriyle ele almayı kolaylaştırır.
            </p>
          </div>

          {/* Good */}
          <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Check className="w-4 h-4" /> Doğru / Savunmacı Yaklaşım
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`if (int.TryParse(Console.ReadLine(), out int sayi))
{
    // işlem...
}
else
{
    Console.WriteLine("Hatalı sayı!");
}`}
            </pre>
            <p className="text-emerald-300/80 text-[11px] font-sans">
              Geçersiz biçim false ile bildirilir; performans farkı için gerçek uygulamada ölçüm yapın.
            </p>
          </div>
        </div>
      </div>

      {/* Rule 2: Exception Hierarchy and Multiple Catch */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase">KURAL 2</span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Catch Bloklarında Hiyerarşiye Dikkat Edin (Spesifikten Genele)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Önce spesifik istisna sınıflarını yakalayın, en alta genel <code className="text-indigo-300">Exception</code> sınıfını koyun.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <pre>
{`try
{
    int a = int.Parse(Console.ReadLine());
    int b = int.Parse(Console.ReadLine());
    int sonuc = a / b;
}
catch (FormatException fex)
{
    // 1. Önce veri tipi dönüşüm hatasını yakala
    Console.WriteLine("Lütfen harf değil, sadece sayı girin.");
}
catch (DivideByZeroException dex)
{
    // 2. Ardından sıfıra bölme hatasını yakala
    Console.WriteLine("Bölen sayı 0 olamaz.");
}
catch (OverflowException oex)
{
    // 3. Çok büyük sayı girişini yakala
    Console.WriteLine("Girdiğiniz sayı kabul edilebilir sınırları aştı.");
}
catch (Exception ex)
{
    // 4. En son öngörülemeyen diğer tüm hataları yakala
    Console.WriteLine("Beklenmedik bir hata oluştu: " + ex.Message);
}`}
          </pre>
        </div>
      </div>

      {/* Rule 3: Pokemon Exception Handling & Swallowing */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-rose-400 uppercase">KURAL 3 · KRİTİK HATA</span>
          <h3 className="text-base font-bold text-white mt-0.5">
            İstisnaları Sessizce Yutmayın (Pokemon Exception Handling)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            İçi boş <code className="text-rose-300 font-mono">catch &#123; &#125;</code> yazmak hatayı çözmez, sadece görünmez yapar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl border border-rose-900/50 bg-rose-950/20 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <X className="w-4 h-4" /> Korkunç Alışkanlık
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`try
{
    VeritabaniKaydet();
}
catch
{
    // Hiçbir şey yapma, kullanıcı anlamasın (!)
}`}
            </pre>
            <p className="text-rose-300/80 text-[11px] font-sans">
              Kayıt başarısız olsa bile sessiz kalır, veri kaybı haftalarca fark edilemez.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Check className="w-4 h-4" /> Doğru Yaklaşım
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`try
{
    VeritabaniKaydet();
}
catch (SqlException ex)
{
    _logger.LogError(ex, "Veritabanı kayıt hatası");
    throw; // veya kullanıcıya anlamlı hata dön
}`}
            </pre>
            <p className="text-emerald-300/80 text-[11px] font-sans">
              Hata loglanır, geliştirici haberdar olur ve sistem şeffaf kalır.
            </p>
          </div>
        </div>
      </div>

      {/* Rule 4: Resource Cleanup & Using Statement */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">KURAL 4</span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Kaynakları Mutlaka Finally veya "using" ile Kapatın
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Dosya ve akış gibi IDisposable kaynakları için uygun olduğunda using kullanın; kaynak temizliği kapsam ve süreç yaşam döngüsü içinde ele alınmalıdır.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
          <div className="text-slate-500 pb-1 mb-2 border-b border-slate-900">
            // C# using bildirimi Dispose çağrısını kapsam sonuna bağlar:
          </div>
          <pre>
{`// Modern C# Sentaksı:
using var stream = new FileStream("rapor.txt", FileMode.Open);
// Stream ile işlem yap...
// Normal kapsam çıkışında Dispose çağrılır.`}
          </pre>
        </div>
      </div>
    </div>
  );
};
