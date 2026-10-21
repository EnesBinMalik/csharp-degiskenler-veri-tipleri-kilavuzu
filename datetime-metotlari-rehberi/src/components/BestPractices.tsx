import React from 'react';
import { ShieldCheck, AlertCircle, Database, RefreshCw, Cpu, Layers } from 'lucide-react';

export const BestPractices: React.FC = () => {
  const principles = [
    {
      icon: Database,
      number: '01',
      title: 'Anları UTC, Takvim Niyetini Saat Dilimiyle Saklayın',
      rule: 'Kesin bir zaman anını saklarken UTC tabanlı bir değer kullanın. Gelecekteki yerel randevular için IANA saat dilimini (ör. Europe/Istanbul), yalnızca takvim gününü ifade eden değerler için tarih bilgisini de koruyun.',
      benefit: 'UTC geçmişteki bir zaman anını tutarlı biçimde gösterir; gelecekteki yerel saat kuralları ve doğum günü gibi saat dilimsiz tarihler içinse tek başına yeterli değildir.',
    },
    {
      icon: AlertCircle,
      number: '02',
      title: 'Sıfır Tabanlı Ay İndeksine Dikkat Edin',
      rule: 'JavaScript Date motorunda Ocak ayı 0, Aralık ayı 11’dir. getMonth() çağırdığınızda dönen değere kullanıcı arayüzünde daima +1 ekleyin.',
      benefit: 'new Date(2026, 1, 15) çağrısı 15 Ocak değil, 15 Şubat anlamına gelir. C# ve Python API’lerinin çoğunda ay numarası 1’den başlar.',
    },
    {
      icon: RefreshCw,
      number: '03',
      title: 'Date Nesnesinin Değişebilirliği (Mutability)',
      rule: 'setDate(), setHours() gibi metotlar orijinal Date nesnesini doğrudan değiştirir (mutates in-place).',
      benefit: 'Orijinal veriyi bozmamak için önce const yeniTarih = new Date(eskiTarih.getTime()) şeklinde klonlama yapın veya saf fonksiyonlar yazın.',
    },
    {
      icon: Cpu,
      number: '04',
      title: 'Yaz Saati (DST) ve 86.400.000 ms Yanılgısı',
      rule: 'Geçen 24 saat ile yerel takvimde bir sonraki gün aynı şey değildir; yaz saati geçişlerinde bir yerel gün 23 veya 25 saat sürebilir.',
      benefit: 'Takvim günü eklemek için yerel tarih bileşenleriyle işlem yapın. Belirli bir IANA saat diliminde tarih/saat kuralı gerekiyorsa saat dilimini destekleyen bir API veya kütüphane kullanın.',
    },
    {
      icon: Layers,
      number: '05',
      title: 'Yerleşik Intl API’lerini Değerlendirin',
      rule: 'Intl.DateTimeFormat ve Intl.RelativeTimeFormat tarih/saat yerelleştirmesi için çalışma zamanında sağlanan seçeneklerdir; ek bir tarih kütüphanesi gerekmeyebilir.',
      benefit: 'Desteklenen locale ve biçimler JavaScript çalışma zamanına bağlıdır. Aynı biçimlendiriciyi döngülerde yeniden kullanmak gereksiz nesne oluşturmayı azaltabilir.',
    },
    {
      icon: ShieldCheck,
      number: '06',
      title: 'Tarih Metinlerinde Biçimi Açıkça Belirtin',
      rule: 'Standart dışı "10/12/2026" gibi girdiler bölgesel ayarlara göre farklı yorumlanabilir. ISO biçimindeki tarih-saat metinleri de saat dilimi gösterimine dikkat edilerek kullanılmalıdır.',
      benefit: 'Bir takvim tarihi için YYYY-MM-DD; UTC anı için açık Z işareti veya saat farkı kullanın. Yerel tarih-saat yorumunu ayrıca tanımlayın.',
    },
  ];

  return (
    <section id="ilkeler-ve-rehber" className="py-12 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header with signature stamp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs text-amber-400 font-medium tracking-wide">
              Mimari İlkeler
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              DateTime İçin Uygulama Notları
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Üretim ortamlarında (production) tarih ve zaman yönetiminde yapılan en kritik 6 mimari hata ve profesyonel çözüm reçetesi.
            </p>
          </div>

          <div className="flex items-center gap-2.5 p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl text-xs text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Genel teknik rehber</span>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {p.number}. İlke
                    </span>
                    <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {p.rule}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-300 font-semibold block mb-0.5">
                    Neden Önemli?
                  </strong>
                  {p.benefit}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
