/** JavaScript string metotları karşılaştırmaları ve örnekler. */

export interface ComparisonScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  defaultInput: string;
  param1Label: string;
  param1Default: any;
  param2Label: string;
  param2Default: any;
  competitors: Array<{
    name: string;
    signature: string;
    run: (input: string, p1: any, p2: any) => { result: any; note: string; status: 'ok' | 'warning' | 'error' };
    pros: string[];
    cons: string[];
  }>;
  summaryTable: Array<{
    feature: string;
    details: Record<string, string>;
  }>;
  authorVerdict: string;
}

export const COMPARISONS: ComparisonScenario[] = [
  {
    id: 'slice-vs-substring',
    title: 'slice() vs substring()',
    badge: 'En Çok Karıştırılan İkili',
    description: 'JavaScript mülakatlarının ve kodlama dünyasının en meşhur ikilisi. Negatif indekslerde ve start > end durumlarında radikal biçimde farklı davranırlar.',
    defaultInput: 'EnesÖztürk2026',
    param1Label: 'start (veya indexStart)',
    param1Default: 9,
    param2Label: 'end (veya indexEnd)',
    param2Default: 4,
    competitors: [
      {
        name: 'str.slice(start, end)',
        signature: 'slice(start, end)',
        run: (input, p1, p2) => {
          const s = Number(p1);
          const e = p2 !== '' && p2 !== undefined ? Number(p2) : undefined;
          const res = input.slice(s, e);
          const isFlipped = e !== undefined && s > e && s >= 0 && e >= 0;
          return {
            result: JSON.stringify(res),
            note: isFlipped ? 'start > end olduğu için boş string "" döndü (takas yapmaz!).' : 'Belirtilen indeks aralığı alındı.',
            status: isFlipped ? 'warning' : 'ok',
          };
        },
        pros: ['Negatif indeksleri dizinin sonundan başlayarak kusursuz destekler.', 'Öngörülebilir davranış (asla gizlice parametre takası yapmaz).', 'Modern JavaScript ve TypeScript standardıdır.'],
        cons: ['start > end ise "" döner, takas beklemez.'],
      },
      {
        name: 'str.substring(start, end)',
        signature: 'substring(start, end)',
        run: (input, p1, p2) => {
          const s = Number(p1);
          const e = p2 !== '' && p2 !== undefined ? Number(p2) : undefined;
          const res = input.substring(s, e);
          const swapped = e !== undefined && s > e;
          return {
            result: JSON.stringify(res),
            note: swapped ? `start > end olduğu için parametreleri otomatik TAKAS etti! (substring(${e}, ${s}) gibi davrandı)` : 'Aralık alındı.',
            status: swapped ? 'warning' : 'ok',
          };
        },
        pros: ['Başlangıç/bitiş sıralaması karışmışsa otomatik toparlar.'],
        cons: ['Negatif değerleri sessizce 0 yapar; sondan kesmeye izin vermez.', 'Parametre takası bazen gizli mantık hatalarına (bug) yol açar.'],
      },
    ],
    summaryTable: [
      { feature: 'Negatif İndeks Desteği', details: { 'slice()': 'Evet (sondan sayar: -1 son karakterdir)', 'substring()': 'Hayır (negatifi 0 kabul eder)' } },
      { feature: 'start > end Davranışı', details: { 'slice()': 'Boş string "" döner', 'substring()': 'Parametreleri otomatik takas eder (swap)' } },
      { feature: 'ECMAScript Standardı', details: { 'slice()': 'Modern & Önerilen', 'substring()': 'Tarihi (ES1 mirası)' } },
    ],
    authorVerdict: 'Enes Öztürk Kararı: İstisnasız her projede slice() kullanmanızı tavsiye ediyorum. Negatif indeks desteği ve parametre takası yapmayan kararlı yapısı sayesinde beklenmedik hataları önler.',
  },
  {
    id: 'char-at-vs-bracket-vs-at',
    title: 'charAt() vs str[i] vs at()',
    badge: 'Karakter Erişim Savaşı',
    description: 'Bir metinden tek bir karaktere ulaşmanın 3 farklı yolu. Sınır aşımı (out-of-bounds) ve negatif indeks tepkileri tamamen farklıdır.',
    defaultInput: 'Enes',
    param1Label: 'index (indeks)',
    param1Default: -1,
    param2Label: '(Kullanılmıyor)',
    param2Default: '',
    competitors: [
      {
        name: 'str.at(index)',
        signature: 'at(index)',
        run: (input, p1) => {
          const idx = Number(p1);
          const res = input.at(idx);
          return {
            result: res !== undefined ? JSON.stringify(res) : 'undefined',
            note: idx < 0 ? `Sondan indeks hesaplandı (${input.length + idx}. indeks).` : 'İndeks okundu.',
            status: 'ok',
          };
        },
        pros: ['Negatif indeksle sondan erişim (at(-1) son harftir).', 'Modern ES2022 standardı.', 'Dizilerle (Array) birebir aynı API sözleşmesi.'],
        cons: ['Çok eski tarayıcılarda (IE11 vb.) polyfill gerekebilir.'],
      },
      {
        name: 'str.charAt(index)',
        signature: 'charAt(index)',
        run: (input, p1) => {
          const idx = Number(p1);
          const res = input.charAt(idx);
          return {
            result: JSON.stringify(res),
            note: idx < 0 || idx >= input.length ? 'Negatif veya sınır dışı indekste BOŞ STRING "" döner.' : 'İndeks okundu.',
            status: idx < 0 ? 'warning' : 'ok',
          };
        },
        pros: ['Her zaman string döner, asla undefined dönmez.', 'Çok eski ES1 uyumluluğu.'],
        cons: ['Negatif indeksi desteklemez (boş string verir).'],
      },
      {
        name: 'str[index]',
        signature: 'str[index]',
        run: (input, p1) => {
          const idx = Number(p1);
          const res = input[idx];
          return {
            result: res !== undefined ? JSON.stringify(res) : 'undefined',
            note: idx < 0 || idx >= input.length ? 'Geçersiz indekste undefined döner.' : 'Doğrudan indeks okundu.',
            status: idx < 0 ? 'warning' : 'ok',
          };
        },
        pros: ['En kısa ve hızlı yazım biçimi.'],
        cons: ['Negatif indeks desteklemez, sınır aşımında undefined döner.'],
      },
    ],
    summaryTable: [
      { feature: 'Negatif İndeks (str.at(-1))', details: { 'at()': 'Destekler (son harfi verir)', 'charAt()': '"" (boş string döner)', 'str[i]': 'undefined döner' } },
      { feature: 'Sınır Aşımı (Out of bounds)', details: { 'at()': 'undefined', 'charAt()': '"" (boş string)', 'str[i]': 'undefined' } },
      { feature: 'ES Sürümü', details: { 'at()': 'ES2022', 'charAt()': 'ES1', 'str[i]': 'ES5' } },
    ],
    authorVerdict: 'Enes Öztürk Kararı: Sondan karakter alırken str.at(-1) kesinlikle en temiz ve modern yaklaşımdır. Pozitif indekslerde ise str[i] hız ve kısalık için idealdir.',
  },
  {
    id: 'replace-vs-replaceall',
    title: 'replace() vs replaceAll()',
    badge: 'Tümünü Değiştirme Karmaşası',
    description: 'String parametre verildiğinde replace sadece İLK eşleşmeyi değiştirirken, replaceAll tüm metni tarar.',
    defaultInput: 'enes ozturk ile enes ozturk kodlama',
    param1Label: 'Değişecek İfade',
    param1Default: 'enes',
    param2Label: 'Yerine Gelecek İfade',
    param2Default: 'kral',
    competitors: [
      {
        name: 'str.replace(str, newStr)',
        signature: 'replace(pattern, replacement)',
        run: (input, p1, p2) => {
          const res = input.replace(p1, p2);
          return {
            result: JSON.stringify(res),
            note: 'Düz metin verildiğinde SADECE İLK eşleşme değiştirildi! Sonraki kopyalar kaldı.',
            status: 'warning',
          };
        },
        pros: ['Sadece ilk örneği değiştirmek isteniyorsa idealdir.', 'Regex ile tüm bayrakları esnekçe destekler.'],
        cons: ['String verildiğinde tümünü değiştirmemesi geliştiricilerin en sık yaptığı hatadır.'],
      },
      {
        name: 'str.replaceAll(str, newStr)',
        signature: 'replaceAll(pattern, replacement)',
        run: (input, p1, p2) => {
          const res = input.replaceAll(p1, p2);
          return {
            result: JSON.stringify(res),
            note: 'Metindeki TÜM eşleşmeler tek hamlede dönüştürüldü.',
            status: 'ok',
          };
        },
        pros: ['Regex (/g) yazma zorunluluğunu ortadan kaldırır.', 'Tüm kopyaları net ve hatasız biçimde günceller.'],
        cons: ['Regex ile kullanılırsa zorunlu olarak /g bayrağı gerektirir, aksi halde hata verir.'],
      },
    ],
    summaryTable: [
      { feature: 'Düz Metin Eşleşme Sayısı', details: { 'replace()': 'Sadece ilk eşleşme (1 adet)', 'replaceAll()': 'Tüm eşleşmeler' } },
      { feature: 'Regex Bayrak Zorunluluğu', details: { 'replace()': 'İsteğe bağlı', 'replaceAll()': 'Regex ise /g zorunludur' } },
      { feature: 'Eklenme Yılı', details: { 'replace()': 'ES3 (1999)', 'replaceAll()': 'ES2021' } },
    ],
    authorVerdict: 'Enes Öztürk Kararı: Bir metindeki tüm boşlukları veya karakterleri değiştirmek istiyorsanız regex kaçış karakterleriyle uğraşmak yerine modern `replaceAll()` kullanın.',
  },
  {
    id: 'indexof-vs-includes',
    title: 'indexOf() vs includes()',
    badge: 'Varlık Kontrolü Karşılaştırması',
    description: 'Bir ifadenin metinde olup olmadığını kontrol ederken hangisini kullanmalısınız?',
    defaultInput: 'TypeScript ve JavaScript Ustası Enes Öztürk',
    param1Label: 'Aranan İfade',
    param1Default: 'Enes',
    param2Label: 'fromIndex / position',
    param2Default: 0,
    competitors: [
      {
        name: 'str.includes(search, pos)',
        signature: 'includes(search, pos)',
        run: (input, p1, p2) => {
          const res = input.includes(p1, Number(p2) || 0);
          return {
            result: String(res),
            note: res ? 'Doğrudan boolean true döndü.' : 'Bulunamadı: false.',
            status: 'ok',
          };
        },
        pros: ['Doğrudan true/false döner.', 'Koşul yapılarında (if) sıfır tuzak riski.', 'Kodu okuyan kişi için %100 niyet belirtir.'],
        cons: ['Eşleşmenin kaçıncı karakterde olduğunu söylemez.'],
      },
      {
        name: 'str.indexOf(search, pos)',
        signature: 'indexOf(search, pos)',
        run: (input, p1, p2) => {
          const res = input.indexOf(p1, Number(p2) || 0);
          return {
            result: String(res),
            note: res !== -1 ? `Bulundu, indeks: ${res}` : 'Bulunamadı (-1)',
            status: res === 0 ? 'warning' : 'ok',
          };
        },
        pros: ['Eşleşmenin başlangıç indeks numarasını tam olarak verir.'],
        cons: ['if (str.indexOf("x")) yazılırsa ve kelime 0. indeksteyse falsy sayılır, gizli bug oluşturur!'],
      },
    ],
    summaryTable: [
      { feature: 'Dönüş Tipi', details: { 'includes()': 'boolean (true / false)', 'indexOf()': 'number (indeks veya -1)' } },
      { feature: 'Kullanım Amacı', details: { 'includes()': 'Sadece varlık sorgulamak', 'indexOf()': 'Konum (indeks) öğrenmek' } },
    ],
    authorVerdict: 'Enes Öztürk Kararı: İndekse ihtiyacınız yoksa ASLA `indexOf("x") !== -1` yazmayın. Daima `str.includes("x")` kullanın. Daha temiz, daha deklaratif ve hatasızdır.',
  },
];
