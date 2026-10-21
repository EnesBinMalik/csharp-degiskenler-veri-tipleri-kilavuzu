import { MethodItem } from '../types/datetime';

export const DATETIME_METHODS: MethodItem[] = [
  {
    id: 'new-date',
    name: 'new Date()',
    category: 'olusturma',
    categoryLabel: 'Oluşturma',
    summary: 'Sistem saatine veya verilen parametrelere göre yeni bir Date nesnesi oluşturur.',
    syntax: 'new Date()\nnew Date(value)\nnew Date(year, monthIndex [, day [, hours [, minutes [, seconds [, ms]]]]])',
    returnType: 'Date nesnesi',
    parameters: [
      { name: 'değer (opsiyonel)', type: 'string | number', description: 'Unix milisaniyesi veya ISO 8601 tarih metni.' },
      { name: 'year, monthIndex...', type: 'number', description: 'Yıl (örn: 2026) ve sıfır tabanlı ay (0 = Ocak).' },
    ],
    exampleCode: `// 1. Şimdiki an
const suan = new Date();

// 2. ISO-8601 string ile
const ozelTarih = new Date("2026-10-29T09:30:00Z");

// 3. Bileşenler ile (Ay: 9 = Ekim)
const cumhuriyetBayrami = new Date(2026, 9, 29, 9, 0, 0);

console.log("Şu an:", suan.toISOString());
console.log("Cumhuriyet:", cumhuriyetBayrami.toLocaleDateString("tr-TR"));`,
    pitfalls: 'new Date(2026, 1) çağrısı Şubat ayını temsil eder (Ocak = 0). YYYY-MM-DD biçimindeki tarih-only metin UTC olarak yorumlanır; yerel takvim tarihi gerekiyorsa bileşenleri yerel Date constructor ile kullanın.',
    csharpEquivalent: 'DateTime.Now / new DateTime(2026, 10, 29, 9, 0, 0)',
    pythonEquivalent: 'datetime.now() / datetime(2026, 10, 29, 9, 0, 0)',
    sqlEquivalent: 'CURRENT_TIMESTAMP / NOW()',
    tags: ['oluşturma', 'constructor', 'tarih', 'now', 'init'],
  },
  {
    id: 'date-now',
    name: 'Date.now()',
    category: 'olusturma',
    categoryLabel: 'Oluşturma',
    summary: '1 Ocak 1970 00:00:00 UTC (Unix Epoch) tarihinden itibaren geçen toplam milisaniyeyi döner.',
    syntax: 'Date.now(): number',
    returnType: 'number (Unix Epoch ms)',
    exampleCode: `const baslangic = Date.now();

// Bir işlem süresi ölçümü (Benchmark)
let toplam = 0;
for (let i = 0; i < 1000000; i++) {
  toplam += i;
}

const gecenSure = Date.now() - baslangic;
console.log("Geçen milisaniye:", gecenSure + "ms");
console.log("Şu anki Epoch:", Date.now());`,
    pitfalls: 'new Date() nesnesi oluşturmadan doğrudan sayı döndürdüğü için performans kritik kodlarda nesne tahsisini (heap allocation) önler.',
    csharpEquivalent: 'DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()',
    pythonEquivalent: 'time.time() * 1000',
    sqlEquivalent: 'UNIX_TIMESTAMP() * 1000',
    tags: ['epoch', 'timestamp', 'performans', 'benchmark', 'zaman damgası'],
  },
  {
    id: 'date-parse',
    name: 'Date.parse()',
    category: 'olusturma',
    categoryLabel: 'Oluşturma',
    summary: 'Tarih içeren bir metni ayrıştırarak 1 Ocak 1970 UTC’den itibaren geçen milisaniyeyi döner.',
    syntax: 'Date.parse(dateString): number',
    returnType: 'number (ms veya geçersizse NaN)',
    parameters: [
      { name: 'dateString', type: 'string', description: 'ISO 8601 veya RFC 2822 uyumlu tarih metni.' },
    ],
    exampleCode: `const ms = Date.parse("2026-10-21T15:45:00Z");
const gecersiz = Date.parse("gecersiz-tarih");

console.log("Ayrıştırılan ms:", ms);
console.log("Geçersiz kontrol:", Number.isNaN(gecersiz) ? "Hatalı format" : ms);`,
    pitfalls: 'Tarayıcılar standart dışı tarih formatlarını farklı yorumlayabilir. Güvenlik ve tutarlılık için daima ISO 8601 (YYYY-MM-DDTHH:mm:ssZ) formatı kullanılmalıdır.',
    csharpEquivalent: 'DateTime.Parse("2026-10-21") / DateTime.TryParse()',
    pythonEquivalent: 'datetime.fromisoformat("2026-10-21")',
    sqlEquivalent: 'STR_TO_DATE("2026-10-21", "%Y-%m-%d")',
    tags: ['parse', 'ayrıştırma', 'string to date', 'iso'],
  },
  {
    id: 'date-utc',
    name: 'Date.UTC()',
    category: 'olusturma',
    categoryLabel: 'Oluşturma',
    summary: 'Verilen yıl, ay ve gün parametrelerini UTC standart zamanında değerlendirip milisaniye değerini üretir.',
    syntax: 'Date.UTC(year, monthIndex [, day [, hours [, minutes [, seconds [, ms]]]]]): number',
    returnType: 'number (UTC Epoch ms)',
    exampleCode: `// 2026 yılının ilk saniyesinin UTC milisaniyesi
const utcMs = Date.UTC(2026, 0, 1, 0, 0, 0);
const utcTarih = new Date(utcMs);

console.log("UTC Milisaniye:", utcMs);
console.log("ISO Gösterim:", utcTarih.toISOString());`,
    pitfalls: 'new Date(year, month) yerel saat dilimini kullanırken, Date.UTC() doğrudan UTC saat dilimi referansını baz alır.',
    csharpEquivalent: 'new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)',
    pythonEquivalent: 'datetime(2026, 1, 1, tzinfo=timezone.utc)',
    sqlEquivalent: 'UTC_TIMESTAMP()',
    tags: ['utc', 'zaman dilimi', 'global', 'koordine evrensel zaman'],
  },
  {
    id: 'get-full-year',
    name: 'getFullYear() / getUTCFullYear()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Tarihin 4 haneli yıl bilgisini döndürür.',
    syntax: 'date.getFullYear(): number\ndate.getUTCFullYear(): number',
    returnType: 'number (örn: 2026)',
    exampleCode: `const tarih = new Date();
const yerelYil = tarih.getFullYear();
const utcYil = tarih.getUTCFullYear();

console.log("Yerel Yıl:", yerelYil);
console.log("UTC Yıl:", utcYil);`,
    pitfalls: 'Eski getYear() metodu 1900 tabanlı 2 haneli yıl döndürdüğü için kullanımdan kaldırılmıştır (deprecated). Daima getFullYear() kullanın.',
    csharpEquivalent: 'date.Year',
    pythonEquivalent: 'date.year',
    sqlEquivalent: 'YEAR(tarih)',
    tags: ['yıl', 'sene', 'year', 'get'],
  },
  {
    id: 'get-month',
    name: 'getMonth() / getUTCMonth()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Ay bilgisini 0 ile 11 arasında sıfır tabanlı (zero-indexed) bir sayı olarak döndürür.',
    syntax: 'date.getMonth(): number (0-11)\ndate.getUTCMonth(): number',
    returnType: 'number (0: Ocak ... 11: Aralık)',
    exampleCode: `const tarih = new Date();
const ayIndeksi = tarih.getMonth();
const gercekAyNo = ayIndeksi + 1; // İnsanların okuyacağı 1-12 formatı

const aylar = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

console.log("Sıfır tabanlı indeks:", ayIndeksi);
console.log("Doğal Ay Numarası:", gercekAyNo);
console.log("Ay Adı:", aylar[ayIndeksi]);`,
    pitfalls: 'JavaScript’te en yaygın hata: Ocak ayı 0, Aralık ayı 11’dir! Kullanıcıya sunarken daima + 1 eklemeyi unutmayın.',
    csharpEquivalent: 'date.Month (1 tabanlıdır: 1-12)',
    pythonEquivalent: 'date.month (1 tabanlıdır: 1-12)',
    sqlEquivalent: 'MONTH(tarih) (1-12)',
    tags: ['ay', 'month', 'sıfır-tabanlı', 'kritik-tuzak'],
  },
  {
    id: 'get-date',
    name: 'getDate() / getUTCDate()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Tarihin ay içerisindeki gününü (1-31) döndürür.',
    syntax: 'date.getDate(): number (1-31)',
    returnType: 'number (1-31)',
    exampleCode: `const bugun = new Date();
console.log("Ayın kaçıncı günü:", bugun.getDate());

// Ayın son günü kontrolü
const yarin = new Date(bugun);
yarin.setDate(bugun.getDate() + 1);
if (yarin.getDate() === 1) {
  console.log("Bugün ayın son günü!");
}`,
    pitfalls: 'getDate() ayın gününü (1-31) verirken, getDay() haftanın gününü (0-6) verir. İkisini karıştırmayın!',
    csharpEquivalent: 'date.Day',
    pythonEquivalent: 'date.day',
    sqlEquivalent: 'DAY(tarih) / DAYOFMONTH(tarih)',
    tags: ['gün', 'ayın günü', 'date', 'day of month'],
  },
  {
    id: 'get-day',
    name: 'getDay() / getUTCDay()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Haftanın gününü 0 (Pazar) ile 6 (Cumartesi) arasında döndürür.',
    syntax: 'date.getDay(): number (0-6)',
    returnType: 'number (0: Pazar, 1: Pazartesi ... 6: Cumartesi)',
    exampleCode: `const tarih = new Date();
const gunIndeks = tarih.getDay();

const gunIsimleri = [
  "Pazar", "Pazartesi", "Salı", "Çarşamba",
  "Perşembe", "Cuma", "Cumartesi"
];

const haftaSonuMu = (gunIndeks === 0 || gunIndeks === 6);

console.log("Gün Adı:", gunIsimleri[gunIndeks]);
console.log("Hafta sonu mu?", haftaSonuMu ? "Evet" : "Hayır");`,
    pitfalls: 'Batı takvim geleneğine göre Pazar = 0’dır. Türkiye ve ISO standardında hafta Pazartesi ile başlar; bu sebeple iş günü hesaplarken indeksleri eşleştirin.',
    csharpEquivalent: 'date.DayOfWeek (enum: Sunday=0, Monday=1)',
    pythonEquivalent: 'date.weekday() (0=Monday, 6=Sunday)',
    sqlEquivalent: 'DAYOFWEEK(tarih) (1=Sunday, 7=Saturday)',
    tags: ['haftanın günü', 'pazar', 'pazartesi', 'hafta sonu'],
  },
  {
    id: 'get-time-parts',
    name: 'getHours(), getMinutes(), getSeconds()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Tarih nesnesinin saat (0-23), dakika (0-59), saniye (0-59) ve milisaniye (0-999) bileşenlerini çeker.',
    syntax: 'date.getHours(): number\ndate.getMinutes(): number\ndate.getSeconds(): number\ndate.getMilliseconds(): number',
    returnType: 'number',
    exampleCode: `const simdi = new Date();
const saat = String(simdi.getHours()).padStart(2, '0');
const dakika = String(simdi.getMinutes()).padStart(2, '0');
const saniye = String(simdi.getSeconds()).padStart(2, '0');
const ms = String(simdi.getMilliseconds()).padStart(3, '0');

console.log(\`Dijital Saat: \${saat}:\${dakika}:\${saniye}.\${ms}\`);`,
    pitfalls: 'Yerel saat dilimindeki saat ile UTC saat farklıdır. Sunucu ve istemci senkronizasyonunda getUTCHours() tercih edilmelidir.',
    csharpEquivalent: 'date.Hour, date.Minute, date.Second',
    pythonEquivalent: 'date.hour, date.minute, date.second',
    sqlEquivalent: 'HOUR(tarih), MINUTE(tarih), SECOND(tarih)',
    tags: ['saat', 'dakika', 'saniye', 'milisaniye', 'zaman'],
  },
  {
    id: 'get-time',
    name: 'getTime()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Tarih nesnesinin 1 Ocak 1970 UTC’den itibaren geçen milisaniyesini döndürür.',
    syntax: 'date.getTime(): number',
    returnType: 'number (Unix ms)',
    exampleCode: `const tarih1 = new Date("2026-10-01");
const tarih2 = new Date("2026-10-21");

// İki tarih arasındaki gün farkı
const farkMs = tarih2.getTime() - tarih1.getTime();
const gunFarki = farkMs / (1000 * 60 * 60 * 24);

console.log("Milisaniye Farkı:", farkMs);
console.log("Gün Farkı:", gunFarki + " gün");`,
    pitfalls: 'Date nesnelerini == veya === ile doğrudan karşılaştıramazsınız (referans eşitliği bakar). Daima .getTime() değerlerini karşılaştırın.',
    csharpEquivalent: 'new DateTimeOffset(date).ToUnixTimeMilliseconds()',
    pythonEquivalent: 'int(date.timestamp() * 1000)',
    sqlEquivalent: 'UNIX_TIMESTAMP(tarih)',
    tags: ['epoch', 'timestamp', 'karşılaştırma', 'fark'],
  },
  {
    id: 'get-timezone-offset',
    name: 'getTimezoneOffset()',
    category: 'get',
    categoryLabel: 'Okuma (Getters)',
    summary: 'Kullanıcının yerel saati ile UTC arasındaki farkı dakika cinsinden döner (UTC - Yerel).',
    syntax: 'date.getTimezoneOffset(): number',
    returnType: 'number (dakika cinsinden fark)',
    exampleCode: `const suan = new Date();
const offsetDakika = suan.getTimezoneOffset();
const offsetSaat = -(offsetDakika / 60);

console.log("Dakika Farkı:", offsetDakika);
console.log(\`UTC Farkı: UTC\${offsetSaat >= 0 ? '+' : ''}\${offsetSaat}\`);`,
    pitfalls: 'İşaret tersine çalışır! Türkiye UTC+3 olduğu için getTimezoneOffset() -180 döner. Bu yüzden saat hesaplarken eksi ile çarpmak gerekir.',
    csharpEquivalent: 'TimeZoneInfo.Local.GetUtcOffset(date)',
    pythonEquivalent: 'datetime.now().astimezone().utcoffset()',
    sqlEquivalent: 'TIMEDIFF(NOW(), UTC_TIMESTAMP())',
    tags: ['timezone', 'saat dilimi', 'offset', 'utc'],
  },
  {
    id: 'set-date-methods',
    name: 'setDate(), setMonth(), setFullYear()',
    category: 'set',
    categoryLabel: 'Düzenleme (Setters)',
    summary: 'Tarih nesnesinin belirli bir parçasını değiştirir. Taşmaları (overflow) otomatik hesaplar.',
    syntax: 'date.setDate(dayValue)\ndate.setMonth(monthIndex [, dayValue])\ndate.setFullYear(year [, month [, day]])',
    returnType: 'number (yeni Epoch ms)',
    exampleCode: `const tarih = new Date("2026-05-15");

// 1. Tarihe 20 gün ekleme
tarih.setDate(tarih.getDate() + 20);
console.log("20 gün sonra (Haziran'a taşar):", tarih.toISOString().split('T')[0]);

// 2. Bir ayın son gününü bulma taktiği (gün parametresi 0 verilir)
const mayisSonGun = new Date(2026, 5, 0); // 5 = Haziran; 0. gün = Mayıs'ın son günü
console.log("Mayıs ayının son günü:", mayisSonGun.getDate());`,
    pitfalls: 'setDate() ve diğer setter metotları mevcut Date nesnesini doğrudan değiştirir (mutable). Orijinal tarihi korumak için önce new Date(eskiTarih) ile kopyalayın.',
    csharpEquivalent: 'date.AddDays(20) (C# immutable’dır, yeni kopya döner)',
    pythonEquivalent: 'date + timedelta(days=20)',
    sqlEquivalent: 'DATE_ADD(tarih, INTERVAL 20 DAY)',
    tags: ['tarih ekleme', 'mutate', 'set', 'matematik', 'taktik'],
  },
  {
    id: 'to-iso-string',
    name: 'toISOString()',
    category: 'format',
    categoryLabel: 'Formatlama',
    summary: 'Tarihi uluslararası standart ISO-8601 formatında (YYYY-MM-DDTHH:mm:ss.sssZ) metne çevirir.',
    syntax: 'date.toISOString(): string',
    returnType: 'string (ISO 8601 UTC)',
    exampleCode: `const bugun = new Date();
const iso = bugun.toISOString();

console.log("Tam ISO Formatı:", iso);
console.log("Yalnızca Tarih (YYYY-MM-DD):", iso.split('T')[0]);
console.log("Yalnızca Saat (UTC):", iso.split('T')[1].replace('Z', ''));`,
    pitfalls: 'Daima UTC saatini temsil eder ("Z" işareti Zulu / UTC demektir). Kullanıcının yerel saatiyle uyuşmasını beklemeyin.',
    csharpEquivalent: 'date.ToUniversalTime().ToString("o")',
    pythonEquivalent: 'date.isoformat()',
    sqlEquivalent: 'DATE_FORMAT(tarih, "%Y-%m-%dT%H:%i:%sZ")',
    tags: ['iso', 'standart', 'rest api', 'json', 'utc'],
  },
  {
    id: 'to-locale-date-string',
    name: 'toLocaleDateString()',
    category: 'format',
    categoryLabel: 'Formatlama',
    summary: 'Tarihi kullanıcının bölgesel ayarlarına (locale) ve seçeneklerine göre biçimlendirir.',
    syntax: 'date.toLocaleDateString([locales [, options]]): string',
    returnType: 'string (Bölgesel Tarih Metni)',
    exampleCode: `const tarih = new Date("2026-10-29T12:00:00");

// 1. Standart Türkçe
console.log("TR Standart:", tarih.toLocaleDateString("tr-TR"));

// 2. Detaylı Türkçe
console.log("TR Detaylı:", tarih.toLocaleDateString("tr-TR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}));

// 3. Farklı diller
console.log("İngilizce (US):", tarih.toLocaleDateString("en-US", { dateStyle: "full" }));
console.log("Almanca:", tarih.toLocaleDateString("de-DE", { dateStyle: "long" }));`,
    pitfalls: 'Locale belirtilmezse sunucunun veya tarayıcının varsayılan sistem dili kullanılır. Tutarlı UI için her zaman hedef locale parametresini ("tr-TR") verin.',
    csharpEquivalent: 'date.ToString("D", new CultureInfo("tr-TR"))',
    pythonEquivalent: 'babel.dates.format_date(date, locale="tr_TR")',
    sqlEquivalent: 'DATE_FORMAT(tarih, "%d.%m.%Y")',
    tags: ['bölgesel', 'locale', 'türkçe', 'i18n', 'tarih metni'],
  },
  {
    id: 'intl-datetimeformat',
    name: 'Intl.DateTimeFormat',
    category: 'intl',
    categoryLabel: 'Modern Intl API',
    summary: 'Yüksek performanslı ve çok dilli tarih/saat biçimlendirme sağlayan modern ECMAScript standardı.',
    syntax: 'new Intl.DateTimeFormat(locale, options).format(date)',
    returnType: 'string / formatted parts',
    exampleCode: `const simdi = new Date();

// Yüksek performanslı tek seferlik formatter örneği
const trBicimlendirici = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "full",
  timeStyle: "medium",
  timeZone: "Europe/Istanbul"
});

console.log("İstanbul Saati:", trBicimlendirici.format(simdi));

// Tokyo zaman diliminde aynı an
const tokyoBicimlendirici = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "full",
  timeStyle: "medium",
  timeZone: "Asia/Tokyo"
});
console.log("Tokyo Saati:", tokyoBicimlendirici.format(simdi));`,
    pitfalls: 'Tekrarlanan biçimlendirmelerde Intl.DateTimeFormat nesnesini yeniden kullanmak gereksiz oluşturma maliyetini azaltabilir; performans farkı çalışma zamanına ve kullanıma bağlıdır.',
    csharpEquivalent: 'TimeZoneInfo.ConvertTimeBySystemTimeZoneId(...)',
    pythonEquivalent: 'date.astimezone(ZoneInfo("Europe/Istanbul"))',
    sqlEquivalent: 'CONVERT_TZ(tarih, "UTC", "Europe/Istanbul")',
    tags: ['intl', 'modern', 'ecmascript', 'timezone', 'performans'],
  },
  {
    id: 'intl-relativetimeformat',
    name: 'Intl.RelativeTimeFormat',
    category: 'intl',
    categoryLabel: 'Modern Intl API',
    summary: '"3 gün önce", "5 dakika sonra", "yarın" gibi doğal dilde göreceli zaman ifadeleri üretir.',
    syntax: 'new Intl.RelativeTimeFormat(locale, { numeric: "auto" | "always" }).format(value, unit)',
    returnType: 'string (Göreceli Zaman Metni)',
    exampleCode: `const rtf = new Intl.RelativeTimeFormat("tr-TR", { numeric: "auto" });

console.log("Örnek 1:", rtf.format(-1, "day"));   // "dün"
console.log("Örnek 2:", rtf.format(1, "day"));    // "yarın"
console.log("Örnek 3:", rtf.format(-3, "day"));   // "3 gün önce"
console.log("Örnek 4:", rtf.format(45, "minute")); // "45 dakika içinde"
console.log("Örnek 5:", rtf.format(-2, "month")); // "2 ay önce"`,
    pitfalls: 'Parametre sırası: Önce sayı (negatif = geçmiş, pozitif = gelecek), sonra zaman birimi ("second", "minute", "hour", "day", "week", "month", "year") verilir.',
    csharpEquivalent: 'Humanizer kütüphanesi (date.Humanize())',
    pythonEquivalent: 'arrow.humanize() / humanize.naturaltime()',
    sqlEquivalent: 'Özel fonksiyon gerektirir',
    tags: ['relative', 'insan dostu', 'dün', 'yarın', 'önce', 'sonra'],
  },
  {
    id: 'date-difference-math',
    name: 'Tarih Farkı & Aritmetik',
    category: 'hesaplama',
    categoryLabel: 'Matematik & Hesaplama',
    summary: 'İki tarih arasındaki geçen süreyi milisaniyeden saniye, dakika, saat ve 24 saatlik gün birimlerine dönüştürme.',
    syntax: 'const diffDays = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));',
    returnType: 'number',
    exampleCode: `const t1 = new Date("2026-06-01T00:00:00");
const t2 = new Date("2026-06-15T18:30:00");

const farkMs = t2.getTime() - t1.getTime();
const toplamSaat = Math.floor(farkMs / (1000 * 60 * 60));
const toplamGun = Math.floor(farkMs / (1000 * 60 * 60 * 24));
const kalanSaat = toplamSaat % 24;

console.log(\`Fark: \${toplamGun} gün \${kalanSaat} saat\`);`,
    pitfalls: 'Yaz saati (DST) geçiş günlerinde bir gün 23 veya 25 saat olabilir. Sadece 86400000 ms bölmek 1 saatlik sapmaya neden olabilir.',
    csharpEquivalent: 'TimeSpan fark = t2 - t1; fark.TotalDays',
    pythonEquivalent: 'delta = t2 - t1; delta.days',
    sqlEquivalent: 'DATEDIFF(t2, t1)',
    tags: ['fark', 'aritmetik', 'gün farkı', 'timespan', 'duration'],
  },
];
