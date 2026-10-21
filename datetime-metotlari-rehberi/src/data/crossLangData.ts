import { CrossLangItem, WorldClockCity } from '../types/datetime';

export const CROSS_LANG_ITEMS: CrossLangItem[] = [
  {
    operation: 'Şu Anki Tarih & Saat (Yerel)',
    description: 'Sistemin yerel saat dilimindeki anlık zamanı alma',
    javascript: 'new Date()',
    csharp: 'DateTime.Now',
    python: 'datetime.now()',
    sql: 'NOW() / CURRENT_TIMESTAMP',
  },
  {
    operation: 'UTC Zamanı Alma',
    description: 'Koordine evrensel zaman referansını alma',
    javascript: 'new Date().toISOString() / Date.now()',
    csharp: 'DateTime.UtcNow',
    python: 'datetime.now(timezone.utc)',
    sql: 'UTC_TIMESTAMP() / GETUTCDATE()',
  },
  {
    operation: 'Tarihe Gün Ekleme',
    description: 'Mevcut bir tarihe belirli gün sayısı ekleme',
    javascript: 'date.setDate(date.getDate() + 7)',
    csharp: 'date.AddDays(7) // Immutable',
    python: 'date + timedelta(days=7)',
    sql: 'DATE_ADD(tarih, INTERVAL 7 DAY)',
  },
  {
    operation: 'Ay Bilgisini Çekme',
    description: 'Yıl içerisindeki ay değerini alma',
    javascript: 'date.getMonth() + 1 // (0-11 olduğu için +1)',
    csharp: 'date.Month // (1-12)',
    python: 'date.month // (1-12)',
    sql: 'MONTH(tarih)',
  },
  {
    operation: 'ISO-8601 Formatına Çevirme',
    description: 'Uluslararası standart metin çıktısı üretme',
    javascript: 'date.toISOString()',
    csharp: 'date.ToString("o")',
    python: 'date.isoformat()',
    sql: 'DATE_FORMAT(tarih, "%Y-%m-%dT%T.%fZ")',
  },
  {
    operation: 'İki Tarih Arasındaki Gün Farkı',
    description: 'Tarih farkını gün bazında hesaplama',
    javascript: 'Math.floor((d2 - d1) / (1000 * 60 * 60 * 24))',
    csharp: '(d2 - d1).TotalDays',
    python: '(d2 - d1).days',
    sql: 'DATEDIFF(d2, d1)',
  },
  {
    operation: 'Unix Epoch Zaman Damgası',
    description: '1970 UTC’den bu yana geçen milisaniye/saniye',
    javascript: 'Date.now() // milisaniye',
    csharp: 'DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()',
    python: 'int(time.time() * 1000)',
    sql: 'UNIX_TIMESTAMP() * 1000',
  },
  {
    operation: 'String’den Tarihe Çevirme (Parse)',
    description: 'Metinsel veriyi tarih nesnesine dönüştürme',
    javascript: 'new Date("2026-10-21")',
    csharp: 'DateTime.Parse("2026-10-21")',
    python: 'datetime.fromisoformat("2026-10-21")',
    sql: 'STR_TO_DATE("2026-10-21", "%Y-%m-%d")',
  },
];

export const WORLD_CITIES: WorldClockCity[] = [
  {
    name: 'İstanbul',
    country: 'Türkiye',
    timeZone: 'Europe/Istanbul',
  },
  {
    name: 'Londra',
    country: 'Birleşik Krallık',
    timeZone: 'Europe/London',
  },
  {
    name: 'New York',
    country: 'ABD',
    timeZone: 'America/New_York',
  },
  {
    name: 'Tokyo',
    country: 'Japonya',
    timeZone: 'Asia/Tokyo',
  },
  {
    name: 'Berlin',
    country: 'Almanya',
    timeZone: 'Europe/Berlin',
  },
  {
    name: 'Sidney',
    country: 'Avustralya',
    timeZone: 'Australia/Sydney',
  },
];
