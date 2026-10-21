import { SandboxRecipe } from '../types/datetime';
import {
  calculateDateDifference,
  isLeapYear,
  getLastDayOfMonth,
  getWeekRange,
  getWeekOfYear,
  getRelativeTimeString,
  parseLocalDateInput,
} from '../utils/dateHelpers';

export const SANDBOX_RECIPES: SandboxRecipe[] = [
  {
    id: 'business-days',
    title: 'İki Tarih Arasındaki İş Günü Sayısı',
    description: 'Hafta sonlarını (Cumartesi-Pazar) otomatik atlayarak net mesai günlerini hesaplar.',
    category: 'Hesaplama',
    defaultInputs: {
      startDate: '2026-10-01',
      endDate: '2026-10-31',
    },
    inputLabels: {
      startDate: { label: 'Başlangıç Tarihi', type: 'date' },
      endDate: { label: 'Bitiş Tarihi', type: 'date' },
    },
    codeTemplate: `function hesaplaIsGunu(baslangicStr, bitisStr) {
      const [baslangicYil, baslangicAy, baslangicGun] = baslangicStr.split("-").map(Number);
      const [bitisYil, bitisAy, bitisGun] = bitisStr.split("-").map(Number);
      const baslangic = new Date(baslangicYil, baslangicAy - 1, baslangicGun);
      const bitis = new Date(bitisYil, bitisAy - 1, bitisGun);
  let isGunu = 0;
  let haftaSonu = 0;

  const imlec = new Date(baslangic);
  while (imlec <= bitis) {
    const gun = imlec.getDay(); // 0 = Pazar, 6 = Cumartesi
    if (gun !== 0 && gun !== 6) {
      isGunu++;
    } else {
      haftaSonu++;
    }
    imlec.setDate(imlec.getDate() + 1);
  }
  return { isGunu, haftaSonu };
}`,
    run: (inputs) => {
      const start = parseLocalDateInput(String(inputs.startDate));
      const end = parseLocalDateInput(String(inputs.endDate));
      const diff = calculateDateDifference(start, end);
      const weekendDays = diff.totalDays + 1 - diff.businessDays;

      return {
        result: `${diff.businessDays} Net İş Günü (Toplam ${diff.totalDays + 1} takvim günü)`,
        metrics: [
          { label: 'İş Günü', value: diff.businessDays },
          { label: 'Hafta Sonu Günü', value: Math.max(0, weekendDays) },
          { label: 'Toplam Takvim Günü', value: diff.totalDays + 1 },
          { label: 'Hafta Sayısı', value: diff.weeks },
        ],
        explanation: 'Döngü her günü tek tek gezer; getDay() değeri 0 (Pazar) ve 6 (Cumartesi) olmayan günleri iş günü sayacına ekler.',
      };
    },
  },
  {
    id: 'last-day-of-month',
    title: 'Ayın Son Gününü ve Gün Sayısını Bulma',
    description: 'JavaScript Date motorunun "0. Gün" hilesini kullanarak ayın son takvim gününü bulur.',
    category: 'Pratik Taktik',
    defaultInputs: {
      year: 2026,
      month: 10,
    },
    inputLabels: {
      year: { label: 'Yıl', type: 'number' },
      month: { label: 'Ay (1-12)', type: 'number' },
    },
    codeTemplate: `// Ayın son gününü bulmanın en zarif yolu:
// Bir sonraki ayın 0. günü = Bu ayın son günü!
function ayinSonGununuBul(yil, ayNo) {
  // ayNo 1-12 arasındaysa:
  const sonGunTarihi = new Date(yil, ayNo, 0);
  return {
    sonGunSayisi: sonGunTarihi.getDate(),
    haftaninGunu: sonGunTarihi.toLocaleDateString("tr-TR", { weekday: "long" })
  };
}`,
    run: (inputs) => {
      const year = Number(inputs.year);
      const month = Number(inputs.month);
      const lastDay = getLastDayOfMonth(year, month);
      const dayName = lastDay.toLocaleDateString('tr-TR', { weekday: 'long' });
      const monthName = lastDay.toLocaleDateString('tr-TR', { month: 'long' });

      return {
        result: `${year} ${monthName} ayı ${lastDay.getDate()} gün çeker (Son gün: ${dayName})`,
        metrics: [
          { label: 'Toplam Gün', value: lastDay.getDate() },
          { label: 'Son Gün İsmi', value: dayName },
          { label: 'Artık Yıl mı?', value: isLeapYear(year) ? 'Evet' : 'Hayır' },
          { label: 'Yerel Tarih', value: `${year}-${String(month).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}` },
        ],
        explanation: 'new Date(2026, 10, 0) ifadesinde gün yerine 0 verildiğinde, JavaScript otomatik olarak bir önceki ayın son gününe geri sarar. Bu sayede 28, 29, 30, 31 gün kontrollerine gerek kalmaz.',
      };
    },
  },
  {
    id: 'countdown-formatter',
    title: 'Geri Sayım & Kalan Süre Formatlayıcı',
    description: 'Belirli bir hedef zamana kadar kalan gün, saat, dakika ve saniyeyi insan dostu formatlar.',
    category: 'Arayüz / UX',
    defaultInputs: {
      targetDate: '2026-12-31T23:59',
    },
    inputLabels: {
      targetDate: { label: 'Hedef Tarih & Saat', type: 'text' },
    },
    codeTemplate: `function kalanSureyiFormatla(hedefTarih) {
  const simdi = new Date().getTime();
  const hedef = new Date(hedefTarih).getTime();
  const fark = hedef - simdi;

  if (fark <= 0) return "Süre doldu!";

  const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
  const saat = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const dakika = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
  const saniye = Math.floor((fark % (1000 * 60)) / 1000);

  return \`\${gun} gün \${saat} saat \${dakika} dk \${saniye} sn\`;
}`,
    run: (inputs) => {
      const target = new Date(String(inputs.targetDate));
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();

      if (diffMs <= 0) {
        return {
          result: 'Süre doldu veya geçmiş bir tarih!',
          metrics: [
            { label: 'Durum', value: 'Geçmiş Tarih' },
            { label: 'Geçen Gün', value: Math.abs(Math.floor(diffMs / 86400000)) },
          ],
          explanation: 'Hedef tarih şu andan önce olduğu için negatif fark oluştu.',
        };
      }

      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs % 86400000) / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);

      return {
        result: `${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye kaldı`,
        metrics: [
          { label: 'Kalan Gün', value: days },
          { label: 'Kalan Saat', value: hours },
          { label: 'Kalan Dakika', value: minutes },
          { label: 'Toplam Saat', value: Math.floor(diffMs / 3600000) },
        ],
        explanation: 'Kalan milisaniye değeri modülo (%) operatörü ile katman katman gün, saat, dakika ve saniyeye ayrıştırılır.',
      };
    },
  },
  {
    id: 'exact-age-calculator',
    title: 'Hassas Yaş & Süre Hesaplayıcı',
    description: 'Doğum tarihinden itibaren tam kaç yıl, kaç ay ve kaç gün geçtiğini artık yılları gözeterek hesaplar.',
    category: 'Hesaplama',
    defaultInputs: {
      birthDate: '1998-05-19',
    },
    inputLabels: {
      birthDate: { label: 'Doğum Tarihi', type: 'date' },
    },
    codeTemplate: `function hassasYasHesapla(dogumTarihiStr) {
      const [yilDogum, ayDogum, gunDogum] = dogumTarihiStr.split("-").map(Number);
      const dogum = new Date(yilDogum, ayDogum - 1, gunDogum);
  const bugun = new Date();

  let yil = bugun.getFullYear() - dogum.getFullYear();
  let ay = bugun.getMonth() - dogum.getMonth();
  let gun = bugun.getDate() - dogum.getDate();

  if (gun < 0) {
    ay--;
    const oncekiAySonu = new Date(bugun.getFullYear(), bugun.getMonth(), 0);
    gun += oncekiAySonu.getDate();
  }
  if (ay < 0) {
    yil--;
    ay += 12;
  }
  return { yil, ay, gun };
}`,
    run: (inputs) => {
      const birth = parseLocalDateInput(String(inputs.birthDate));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diff = calculateDateDifference(birth, today);

      return {
        result: `${diff.breakdown.years} Yıl, ${diff.breakdown.months} Ay, ${diff.breakdown.days} Günlük`,
        metrics: [
          { label: 'Yıl', value: diff.breakdown.years },
          { label: 'Ay', value: diff.breakdown.months },
          { label: 'Gün', value: diff.breakdown.days },
          { label: 'Yaşanan Toplam Gün', value: diff.totalDays },
        ],
        explanation: 'Sadece yıl farkını almak doğum günü henüz gelmemişse 1 yaş fazla gösterir. Gün ve ay negatifse bir önceki ayın gün sayısını ekleyip ayı bir eksiltmek gerekir.',
      };
    },
  },
  {
    id: 'week-range',
    title: 'Haftanın Başlangıç ve Bitiş Tarihlerini Bulma',
    description: 'Herhangi bir tarihin ait olduğu haftanın Pazartesi (00:00) ve Pazar (23:59) aralığını üretir.',
    category: 'Pratik Taktik',
    defaultInputs: {
      selectedDate: '2026-10-21',
    },
    inputLabels: {
      selectedDate: { label: 'Seçili Tarih', type: 'date' },
    },
    codeTemplate: `function haftaninAraliginiBul(tarih) {
      const [yil, ay, gun] = tarih.split("-").map(Number);
      const d = new Date(yil, ay - 1, gun);
  const gun = d.getDay(); // 0 = Pazar
  const pazartesiFarki = gun === 0 ? -6 : 1 - gun;

  const pazartesi = new Date(d);
  pazartesi.setDate(d.getDate() + pazartesiFarki);

  const pazar = new Date(pazartesi);
  pazar.setDate(pazartesi.getDate() + 6);

  return { baslangic: pazartesi, bitis: pazar };
}`,
    run: (inputs) => {
      const date = parseLocalDateInput(String(inputs.selectedDate));
      const range = getWeekRange(date);

      const formatOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'short',
      };

      return {
        result: `${range.start.toLocaleDateString('tr-TR', formatOptions)} — ${range.end.toLocaleDateString('tr-TR', formatOptions)}`,
        metrics: [
          { label: 'Hafta Başlangıcı', value: range.start.toLocaleDateString('tr-TR') },
          { label: 'Hafta Bitişi', value: range.end.toLocaleDateString('tr-TR') },
          { label: 'Yılın Kaçıncı Haftası (ISO)', value: getWeekOfYear(date) },
        ],
        explanation: 'Pazar günü JavaScript getDay() fonksiyonunda 0 döner. Türkiye/ISO standardında hafta Pazartesi başladığı için Pazar günü -6 gün geri, diğer günler ise (1 - gun) kadar ötelenir.',
      };
    },
  },
  {
    id: 'relative-time-intl',
    title: 'Intl.RelativeTimeFormat ile Dinamik Zaman',
    description: 'Modern tarayıcı API’si ile harici kütüphane gerektirmeden doğal dilde göreceli zaman üretir.',
    category: 'Modern API',
    defaultInputs: {
      offsetDays: -3,
    },
    inputLabels: {
      offsetDays: { label: 'Gün Değeri (Negatif = Geçmiş, Pozitif = Gelecek)', type: 'number' },
    },
    codeTemplate: `// Harici moment.js / day.js olmadan saf JavaScript!
const rtf = new Intl.RelativeTimeFormat("tr-TR", { numeric: "auto" });

// -1 -> "dün", 1 -> "yarın", -5 -> "5 gün önce"
console.log(rtf.format(-3, "day"));
console.log(rtf.format(2, "hour"));`,
    run: (inputs) => {
      const offset = Number(inputs.offsetDays);
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + offset);

      const rtf = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' });
      const text = rtf.format(offset, 'day');

      return {
        result: `Çıktı: "${text}"`,
        metrics: [
          { label: 'Sayısal Değer', value: offset },
          { label: 'Zaman Birimi', value: 'Gün (day)' },
          { label: 'Oluşan Tarih', value: targetDate.toLocaleDateString('tr-TR') },
        ],
        explanation: 'numeric: "auto" parametresi sayesinde -1 için "1 gün önce" yerine "dün", +1 için "yarın" gibi doğal Türkçe sözcükler otomatik seçilir.',
      };
    },
  },
];
