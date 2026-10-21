import React from 'react';
import {
  AlertTriangle,
  Lightbulb,
  Ban,
  Flame,
  Zap,
  CheckCircle2,
  BookOpen,
  Feather
} from 'lucide-react';

export const TipsCard: React.FC = () => {
  const tips = [
    {
      icon: AlertTriangle,
      color: 'amber',
      title: 'While Döngüsünde Sonsuz Döngü (Infinite Loop) Tuzağı',
      desc: 'While döngüsünde en sık yapılan acemi hatası, gövde içerisinde sayaç ya da kontrol değişkenini artırmayı veya güncellemeyi unutmaktır.',
      code: `// HATALI KULLANIM (Sonsuz Döngü):
int sayac = 1;
while (sayac <= 5)
{
    Console.WriteLine(sayac);
    // sayac++ UNUTULDU! (Program donar)
}

// DOĞRU KULLANIM:
int sayac = 1;
while (sayac <= 5)
{
    Console.WriteLine(sayac);
    sayac++; // Her turda sayaç ilerletilmeli
}`,
      note: 'Enes Öztürk Notu: While döngüsü yazarken koşulu yazdıktan hemen sonra gövdedeki artırma/güncelleme satırını yazmayı alışkanlık haline getirin.'
    },
    {
      icon: Ban,
      color: 'rose',
      title: 'Foreach İterasyon Değişkeni Değiştirilemez (Read-Only)',
      desc: 'Foreach iterasyon değişkenine yeniden atama yapamazsınız. Bu, başvurulan nesnenin değiştirilebilir üyeleri için aynı kuralın geçerli olduğu anlamına gelmez.',
      code: `int[] sayilar = { 10, 20, 30 };

foreach (int sayi in sayilar)
{
    // HATA: Cannot assign to 'sayi' because it is a 'foreach iteration variable'
    // sayi = sayi * 2;
}

// Dizi elemanlarını değiştirmek istiyorsanız klasik 'for' kullanın:
for (int i = 0; i < sayilar.Length; i++)
{
    sayilar[i] = sayilar[i] * 2; // Bu geçerlidir.
}`,
      note: 'Enes Öztürk Notu: Dizi elemanlarını indeks üzerinden güncellemek istiyorsanız klasik for döngüsü kullanabilirsiniz.'
    },
    {
      icon: Flame,
      color: 'orange',
      title: 'Foreach Esnasında Listeyi Değiştirmeyin (InvalidOperationException)',
      desc: 'Bir List üzerinde foreach ile gezinirken koleksiyonun yapısını değiştirmek enumerator hatasına yol açabilir. Gezinilen koleksiyonun yapısını değiştirmeyin.',
      code: `List<string> isimler = new List<string> { "Ali", "Ayşe", "Mehmet" };

foreach (var isim in isimler)
{
    // HATA VERİR: Collection was modified; enumeration operation may not execute.
    // if (isim == "Ali") isimler.Remove(isim);
}`,
      note: 'Enes Öztürk Notu: Eleman silme/filtreleme işlemleri için LINQ (.Where()) ya da tersten çalışan for döngüsü kullanın.'
    },
    {
      icon: Zap,
      color: 'cyan',
      title: 'Break ve Continue Komutlarının Döngülerdeki Gücü',
      desc: 'Tüm C# döngülerinde (while, for, foreach) akışı kontrol etmek için "break" ve "continue" kullanılır.',
      code: `// 1. break: Döngüyü anında sonlandırır ve dışarı çıkar
while (true)
{
    if (kosul) break;
}

// 2. continue: O anki iterasyonun kalanını atlar, sonraki tura geçer
foreach (int sayi in sayilar)
{
    if (sayi % 2 == 0) continue; // Çift sayıları atla, tekleri işle
    Console.WriteLine(sayi);
}`,
      note: 'Enes Öztürk Notu: Gereksiz döngü turlarından kaçınmak CPU kaynaklarını korur.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              PÜF NOKTALARI
            </span>
            <span className="text-xs text-slate-400">Temiz Kod & Best Practices</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Enes Öztürk'ün Altın Döngü Kuralları
          </h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
          Mülakatlarda ve gerçek projelerde en sık sorulan kritik detaylar
        </div>
      </div>

      {/* Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-${item.color}-500/15 text-${item.color}-400 border border-${item.color}-500/30`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-slate-200 mb-4 overflow-x-auto">
                  <pre className="text-slate-300">{item.code}</pre>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 p-3 rounded-lg border border-amber-500/20">
                <Feather className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="italic">{item.note}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
