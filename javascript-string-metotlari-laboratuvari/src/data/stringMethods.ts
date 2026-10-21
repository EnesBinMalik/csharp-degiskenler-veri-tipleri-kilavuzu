/** String metotları için örnekler ve laboratuvar çalıştırıcıları. */

export type MethodCategory = 'search' | 'extraction' | 'transformation' | 'formatting' | 'analysis';

export interface MethodParam {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'regex';
  label: string;
  defaultVal: any;
  placeholder?: string;
  description: string;
}

export interface StringMethodInfo {
  id: string;
  name: string;
  signature: string;
  category: MethodCategory;
  categoryLabel: string;
  esVersion: string;
  returns: string;
  shortDesc: string;
  detailedDesc: string;
  proTip: string;
  defaultSample: string;
  params: MethodParam[];
  run: (str: string, params: Record<string, any>) => {
    result: any;
    resultType: string;
    code: string;
    explanation: string;
    isError?: boolean;
    highlightRange?: [number, number];
  };
  examples: Array<{
    title: string;
    code: string;
    output: string;
  }>;
}

export const CATEGORIES: Record<MethodCategory, { label: string; desc: string }> = {
  search: {
    label: 'Arama & Konum',
    desc: 'Metin içinde karakter, kelime veya desen arayan ve konum bildiren metotlar.',
  },
  extraction: {
    label: 'Kesme & Ayıklama',
    desc: 'Metinden belirli aralıktaki parçaları veya karakterleri çıkaran metotlar.',
  },
  transformation: {
    label: 'Dönüştürme & Değişim',
    desc: 'Metindeki karakterleri değiştiren, harf durumunu çeviren metotlar.',
  },
  formatting: {
    label: 'Doldurma & Düzenleme',
    desc: 'Boşlukları temizleyen, kenarları dolduran ve metni tekrarlayan metotlar.',
  },
  analysis: {
    label: 'Kodlama & Karşılaştırma',
    desc: 'Unicode kod noktaları, ASCII değerleri ve alfabetik sıralama metotları.',
  },
};

export const STRING_METHODS: StringMethodInfo[] = [
  // --- KESME & AYIKLAMA ---
  {
    id: 'slice',
    name: 'slice',
    signature: 'str.slice(startIndex[, endIndex])',
    category: 'extraction',
    categoryLabel: 'Kesme & Ayıklama',
    esVersion: 'ES3',
    returns: 'string',
    shortDesc: 'Metnin bir bölümünü startIndex ile endIndex (hariç) arasında keser ve yeni bir string döndürür.',
    detailedDesc: 'Modern JavaScript\'te en çok tercih edilen kesme metodudur. Negatif indeksleri destekler (örneğin -1 son karakteri belirtir). Eğer startIndex >= endIndex ise boş string döner.',
    proTip: 'Enes Öztürk Püf Noktası: substring() metodunun aksine slice(), başlangıç indeksi bitişten büyükse parametreleri otomatik takas ETMEZ ve negatif indeksleri dizinin sonundan hesaplar.',
    defaultSample: 'Enes Öztürk ile Modern JavaScript Geliştirme',
    params: [
      { name: 'start', type: 'number', label: 'Başlangıç İndeksi (startIndex)', defaultVal: 5, description: 'Kesmenin başlayacağı indeks (0 tabanlı veya negatif).' },
      { name: 'end', type: 'number', label: 'Bitiş İndeksi (endIndex)', defaultVal: 16, description: 'Kesmenin sonlanacağı indeks (hariçtir).' },
    ],
    run: (str, params) => {
      const start = Number(params.start) || 0;
      const end = params.end !== '' && params.end !== undefined ? Number(params.end) : undefined;
      const res = str.slice(start, end);

      // Calculate highlight range in positive indices
      const len = str.length;
      const realStart = start < 0 ? Math.max(0, len + start) : Math.min(start, len);
      let realEnd = end === undefined ? len : (end < 0 ? Math.max(0, len + end) : Math.min(end, len));
      if (realEnd < realStart) realEnd = realStart;

      return {
        result: res,
        resultType: 'string',
        code: end !== undefined ? `str.slice(${start}, ${end})` : `str.slice(${start})`,
        explanation: `İndeks [${realStart}, ${realEnd}) arası '${res}' kesildi. Orijinal metin değişmedi (${str.length} karakter).`,
        highlightRange: [realStart, realEnd],
      };
    },
    examples: [
      { title: 'Normal kesme', code: '"Merhaba Dünya".slice(0, 7)', output: '"Merhaba"' },
      { title: 'Negatif indeks ile son kelime', code: '"JavaScript".slice(-6)', output: '"Script"' },
      { title: 'Son karakteri hariç tutma', code: '"Enes Öztürk".slice(0, -6)', output: '"Enes "' },
    ],
  },
  {
    id: 'substring',
    name: 'substring',
    signature: 'str.substring(indexStart[, indexEnd])',
    category: 'extraction',
    categoryLabel: 'Kesme & Ayıklama',
    esVersion: 'ES1',
    returns: 'string',
    shortDesc: 'İki indeks arasındaki karakterleri alır. Negatif değerleri 0 kabul eder ve start > end ise takas eder.',
    detailedDesc: 'Tarihi bir metottur. indexStart > indexEnd durumunda parametreleri sessizce yer değiştirir (swapping). Negatif veya NaN değerler doğrudan 0 olarak yorumlanır.',
    proTip: 'Enes Öztürk Notu: Negatif indeks desteği istediğinizde substring yerine mutlaka slice() kullanın! substring(-3) çalıştırdığınızda negatif değer 0 kabul edilip tüm metin döner.',
    defaultSample: 'Frontend Mimarisi ve Kodlama Sanatı',
    params: [
      { name: 'start', type: 'number', label: 'indexStart', defaultVal: 9, description: 'Başlangıç indeksi (negatifler 0 sayılır).' },
      { name: 'end', type: 'number', label: 'indexEnd', defaultVal: 17, description: 'Bitiş indeksi (hariçtir).' },
    ],
    run: (str, params) => {
      const start = Number(params.start) || 0;
      const end = params.end !== '' && params.end !== undefined ? Number(params.end) : undefined;
      const res = str.substring(start, end);
      const effStart = Math.min(Math.max(0, start), str.length);
      const effEnd = end !== undefined ? Math.min(Math.max(0, end), str.length) : str.length;
      const realStart = Math.min(effStart, effEnd);
      const realEnd = Math.max(effStart, effEnd);
      return {
        result: res,
        resultType: 'string',
        code: end !== undefined ? `str.substring(${start}, ${end})` : `str.substring(${start})`,
        explanation: start > (end ?? str.length)
          ? `start (${start}) > end (${end}) olduğu için otomatik takas yapıldı: substring(${effEnd}, ${effStart})`
          : `İndeks [${realStart}, ${realEnd}) arası çekildi.`,
        highlightRange: [realStart, realEnd],
      };
    },
    examples: [
      { title: 'Parametre takası (Swap)', code: '"Öztürk".substring(4, 1)', output: '"ztü"' },
      { title: 'Negatif değerin 0 olması', code: '"Kod".substring(-2, 2)', output: '"Ko"' },
    ],
  },
  {
    id: 'at',
    name: 'at',
    signature: 'str.at(index)',
    category: 'extraction',
    categoryLabel: 'Kesme & Ayıklama',
    esVersion: 'ES2022',
    returns: 'string | undefined',
    shortDesc: 'Belirtilen indeksteki tek karakteri döndürür. Negatif indeksle sondan erişimi destekler.',
    detailedDesc: 'ES2022 ile gelen modern fonksiyondur. str.charAt(str.length - 1) yazmak yerine basitçe str.at(-1) yazarak son karaktere doğrudan ulaşabilirsiniz.',
    proTip: 'Enes Öztürk Tavsiyesi: Eski str[str.length - 1] veya str.charAt() yerine daima str.at(-1) kullanın; çok daha temiz ve okunabilirdir.',
    defaultSample: 'Fullstack Uzmanlığı',
    params: [
      { name: 'index', type: 'number', label: 'İndeks (index)', defaultVal: -1, description: 'Pozitif (0..n-1) veya negatif (-n..-1) indeks.' },
    ],
    run: (str, params) => {
      const idx = Number(params.index);
      const res = str.at(idx);
      const len = str.length;
      const positiveIdx = idx < 0 ? len + idx : idx;
      return {
        result: res ?? 'undefined',
        resultType: res ? 'string' : 'undefined',
        code: `str.at(${idx})`,
        explanation: idx < 0
          ? `Negatif indeks (${idx}) sonran hesaplandı: str.length (${len}) + (${idx}) = indeks ${positiveIdx}.`
          : `İndeks ${idx} üzerindeki karakter: '${res}'.`,
        highlightRange: positiveIdx >= 0 && positiveIdx < len ? [positiveIdx, positiveIdx + 1] : undefined,
      };
    },
    examples: [
      { title: 'Son karakteri alma', code: '"Enes".at(-1)', output: '"s"' },
      { title: 'Sondan ikinci karakter', code: '"TypeScript".at(-2)', output: '"p"' },
      { title: 'Geçersiz indeks', code: '"JS".at(10)', output: 'undefined' },
    ],
  },
  {
    id: 'charAt',
    name: 'charAt',
    signature: 'str.charAt(index)',
    category: 'extraction',
    categoryLabel: 'Kesme & Ayıklama',
    esVersion: 'ES1',
    returns: 'string',
    shortDesc: 'Belirtilen indeksteki karakteri döner. İndeks aralık dışındaysa boş string "" döner.',
    detailedDesc: 'Köşeli parantezden (str[i]) farkı, sınır aşımında undefined yerine "" döndürmesidir. Negatif indeksi desteklemez (boş string döner).',
    proTip: 'Enes Öztürk Notu: charAt(-1) çalıştırdığınızda sessizce "" döner ve hata fırlatmaz. Negatif erişim için daima .at() kullanın.',
    defaultSample: 'Algoritma Dünyası',
    params: [
      { name: 'index', type: 'number', label: 'İndeks (0 tabanlı)', defaultVal: 0, description: 'Aranacak karakterin indeksi.' },
    ],
    run: (str, params) => {
      const idx = Number(params.index) || 0;
      const res = str.charAt(idx);
      return {
        result: res,
        resultType: 'string',
        code: `str.charAt(${idx})`,
        explanation: idx >= str.length || idx < 0 ? `İndeks ${idx} sınır dışı olduğundan boş string "" döndü.` : `İndeks ${idx} konumundaki karakter: '${res}'.`,
        highlightRange: idx >= 0 && idx < str.length ? [idx, idx + 1] : undefined,
      };
    },
    examples: [
      { title: 'İlk karakter', code: '"Enes".charAt(0)', output: '"E"' },
      { title: 'Aralık dışı', code: '"Enes".charAt(99)', output: '""' },
    ],
  },
  {
    id: 'split',
    name: 'split',
    signature: 'str.split(separator[, limit])',
    category: 'extraction',
    categoryLabel: 'Kesme & Ayıklama',
    esVersion: 'ES3',
    returns: 'string[]',
    shortDesc: 'Metni bir ayırıcıya (separator veya Regex) göre parçalayıp bir diziye (array) çevirir.',
    detailedDesc: 'Ayırıcı olarak "" (boşluksuz) verilirse karakter karakter böler. Limit parametresi ile azami kaç eleman alınacağı sınırlandırılabilir.',
    proTip: 'Enes Öztürk Püf Noktası: Emojileri veya bileşik karakterleri parçalarken str.split("") yerine Array.from(str) veya [...str] kullanın; çünkü split surrogate pairleri bozabilir!',
    defaultSample: 'JavaScript,TypeScript,React,NodeJS,Tailwind',
    params: [
      { name: 'separator', type: 'string', label: 'Ayırıcı (separator)', defaultVal: ',', description: 'Metni bölecek karakter, dizi veya desen.' },
      { name: 'limit', type: 'number', label: 'Sınır (limit)', defaultVal: 5, description: 'En fazla kaç eleman üretileceği (isteğe bağlı).' },
    ],
    run: (str, params) => {
      const sep = params.separator ?? '';
      const limit = params.limit !== '' && params.limit !== undefined ? Number(params.limit) : undefined;
      const res = str.split(sep, limit);
      return {
        result: res,
        resultType: 'Array<' + typeof res[0] + '>',
        code: limit !== undefined ? `str.split(${JSON.stringify(sep)}, ${limit})` : `str.split(${JSON.stringify(sep)})`,
        explanation: `'${sep}' ayırıcısına göre ${res.length} adet elemanlı bir dizi üretildi.`,
      };
    },
    examples: [
      { title: 'Virgüle göre bölme', code: '"elma,armut,kiraz".split(",")', output: '["elma", "armut", "kiraz"]' },
      { title: 'Boşluksuz karakter bölme', code: '"Enes".split("")', output: '["E", "n", "e", "s"]' },
      { title: 'Limit kullanımı', code: '"a-b-c-d".split("-", 2)', output: '["a", "b"]' },
    ],
  },

  // --- ARAMA & KONUM ---
  {
    id: 'includes',
    name: 'includes',
    signature: 'str.includes(searchString[, position])',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES6/2015',
    returns: 'boolean',
    shortDesc: 'Metnin içinde aranan ifadenin geçip geçmediğini boolean (true / false) olarak döner.',
    detailedDesc: 'Büyük/küçük harf duyarlıdır (case-sensitive). İkinci parametre olan position ile aramanın hangi indeksten itibaren başlayacağı belirlenebilir.',
    proTip: 'Enes Öztürk Notu: Eski kodlardaki str.indexOf("x") !== -1 kontrolü yerine ES6 includes() kullanarak kodu çok daha okunabilir ve amacına uygun hale getirin.',
    defaultSample: 'Enes Öztürk yazılım ekosisteminde lider çözümler sunar.',
    params: [
      { name: 'search', type: 'string', label: 'Aranacak Metin (searchString)', defaultVal: 'Öztürk', description: 'Metin içinde varlığı sınanacak kelime.' },
      { name: 'pos', type: 'number', label: 'Başlangıç Pozisyonu (position)', defaultVal: 0, description: 'Aramanın başlayacağı indeks.' },
    ],
    run: (str, params) => {
      const search = params.search || '';
      const pos = Number(params.pos) || 0;
      const found = str.includes(search, pos);
      let highlight: [number, number] | undefined;
      if (found && search.length > 0) {
        const idx = str.indexOf(search, pos);
        if (idx !== -1) highlight = [idx, idx + search.length];
      }
      return {
        result: found,
        resultType: 'boolean',
        code: pos > 0 ? `str.includes(${JSON.stringify(search)}, ${pos})` : `str.includes(${JSON.stringify(search)})`,
        explanation: found
          ? `'${search}' ifadesi metin içerisinde indeks ${highlight?.[0]} konumunda bulundu.`
          : `'${search}' ifadesi belirtilen pozisyondan itibaren bulunamadı.`,
        highlightRange: highlight,
      };
    },
    examples: [
      { title: 'Var olan arama', code: '"JavaScript".includes("Script")', output: 'true' },
      { title: 'Harf duyarlılığı', code: '"JavaScript".includes("script")', output: 'false' },
      { title: 'Pozisyon atlama', code: '"abc abc".includes("abc", 2)', output: 'true' },
    ],
  },
  {
    id: 'indexOf',
    name: 'indexOf',
    signature: 'str.indexOf(searchValue[, fromIndex])',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES1',
    returns: 'number',
    shortDesc: 'Aranan ifadenin İLK geçtiği indeks numarasını döner. Bulunamazsa -1 döner.',
    detailedDesc: 'Metin soldan sağa taranır. fromIndex verilirse o indeksten itibaren ileriye doğru arama yapılır. Büyük/küçük harfe duyarlıdır.',
    proTip: 'Enes Öztürk Hatırlatması: -1 dönmesi bulunamadı demektir. İf kontrolü yaparken `if (str.indexOf("a"))` YAZMAYIN! Çünkü ilk karakter 0 döner ve 0 if içinde falsy sayılır!',
    defaultSample: 'Öğrenmek, keşfetmek ve üretmek hayatın özüdür.',
    params: [
      { name: 'search', type: 'string', label: 'Aranan (searchValue)', defaultVal: 'üretmek', description: 'İlk konumu aranacak metin.' },
      { name: 'fromIndex', type: 'number', label: 'fromIndex', defaultVal: 0, description: 'Aramanın başlatılacağı indeks.' },
    ],
    run: (str, params) => {
      const search = params.search ?? '';
      const from = Number(params.fromIndex) || 0;
      const idx = str.indexOf(search, from);
      return {
        result: idx,
        resultType: 'number',
        code: from > 0 ? `str.indexOf(${JSON.stringify(search)}, ${from})` : `str.indexOf(${JSON.stringify(search)})`,
        explanation: idx !== -1
          ? `'${search}' ilk olarak ${idx}. indekste başladı.`
          : `'${search}' bulunamadı (sonuç: -1).`,
        highlightRange: idx !== -1 ? [idx, idx + search.length] : undefined,
      };
    },
    examples: [
      { title: 'İlk eşleşme', code: '"banana".indexOf("a")', output: '1' },
      { title: 'Bulunamayan', code: '"banana".indexOf("z")', output: '-1' },
      { title: 'fromIndex ile', code: '"banana".indexOf("a", 2)', output: '3' },
    ],
  },
  {
    id: 'lastIndexOf',
    name: 'lastIndexOf',
    signature: 'str.lastIndexOf(searchValue[, fromIndex])',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES1',
    returns: 'number',
    shortDesc: 'Aranan ifadenin SON geçtiği indeks numarasını döner. Bulunamazsa -1 döner.',
    detailedDesc: 'Metin sağdan sola doğru taranır. fromIndex verilirse o indeksten geriye doğru arar.',
    proTip: 'Enes Öztürk Püf Noktası: Dosya uzantısını almak için dosyaAdı.lastIndexOf(".") kullanarak en son noktayı güvenle tespit edebilirsiniz.',
    defaultSample: 'rapor_2026_finans_son_surum.final.pdf',
    params: [
      { name: 'search', type: 'string', label: 'Aranan (searchValue)', defaultVal: '.', description: 'Son konumu aranacak metin.' },
      { name: 'fromIndex', type: 'number', label: 'fromIndex', defaultVal: 34, description: 'Geriye doğru aramanın başlayacağı son sınır.' },
    ],
    run: (str, params) => {
      const search = params.search ?? '';
      const from = params.fromIndex !== '' && params.fromIndex !== undefined ? Number(params.fromIndex) : str.length;
      const idx = str.lastIndexOf(search, from);
      return {
        result: idx,
        resultType: 'number',
        code: `str.lastIndexOf(${JSON.stringify(search)}, ${from})`,
        explanation: idx !== -1
          ? `'${search}' en son ${idx}. indekste tespit edildi.`
          : `'${search}' bulunamadı (-1).`,
        highlightRange: idx !== -1 ? [idx, idx + search.length] : undefined,
      };
    },
    examples: [
      { title: 'Son nokta tespiti', code: '"resim.min.png".lastIndexOf(".")', output: '9' },
      { title: 'Son a harfi', code: '"arkadaş".lastIndexOf("a")', output: '5' },
    ],
  },
  {
    id: 'startsWith',
    name: 'startsWith',
    signature: 'str.startsWith(searchString[, position])',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES6/2015',
    returns: 'boolean',
    shortDesc: 'Metnin belirli bir ifadeyle başlayıp başlamadığını doğrular.',
    detailedDesc: 'position parametresi (varsayılan 0) ile aramanın başlama noktası kaydırılabilir. URL, protokol (https://) veya ön ek kontrollerinde standarttır.',
    proTip: 'Enes Öztürk İpucu: Regex `^https` yazmak yerine str.startsWith("https://") kullanmak hem %300 daha hızlıdır hem de Regex derleme maliyeti yaratmaz.',
    defaultSample: 'https://enesozturk.dev/projeler',
    params: [
      { name: 'search', type: 'string', label: 'Ön Ek (searchString)', defaultVal: 'https://', description: 'Metnin bununla başlayıp başlamadığı kontrol edilir.' },
      { name: 'position', type: 'number', label: 'position', defaultVal: 0, description: 'Kontrolün yapılacağı indeks.' },
    ],
    run: (str, params) => {
      const search = params.search ?? '';
      const pos = Number(params.position) || 0;
      const ok = str.startsWith(search, pos);
      return {
        result: ok,
        resultType: 'boolean',
        code: pos > 0 ? `str.startsWith(${JSON.stringify(search)}, ${pos})` : `str.startsWith(${JSON.stringify(search)})`,
        explanation: ok
          ? `Metin, indeks ${pos} konumundan itibaren '${search}' ile başlıyor.`
          : `Metin, indeks ${pos} konumunda '${search}' ile başlamıyor.`,
        highlightRange: ok ? [pos, pos + search.length] : undefined,
      };
    },
    examples: [
      { title: 'Protokol kontrolü', code: '"https://api.site.com".startsWith("https://")', output: 'true' },
      { title: 'Pozisyon kaydırma', code: '"Merhaba Enes".startsWith("Enes", 8)', output: 'true' },
    ],
  },
  {
    id: 'endsWith',
    name: 'endsWith',
    signature: 'str.endsWith(searchString[, endPosition])',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES6/2015',
    returns: 'boolean',
    shortDesc: 'Metnin belirli bir ifadeyle bitip bitmediğini kontrol eder.',
    detailedDesc: 'endPosition (varsayılan str.length) metnin sanal uzunluğunu sınırlar. Dosya uzantısı doğrulamalarında (örn: .ts, .json) mükemmeldir.',
    proTip: 'Enes Öztürk Notu: endPosition parametresi başlangıcı değil, metnin "hangi indekse kadar sayılacağını" ifade eder.',
    defaultSample: 'kullanici_sozlesmesi_v2.pdf',
    params: [
      { name: 'search', type: 'string', label: 'Son Ek (searchString)', defaultVal: '.pdf', description: 'Metnin sonu bu ifadeyle mi bitiyor?' },
      { name: 'endPosition', type: 'number', label: 'endPosition', defaultVal: 27, description: 'Metnin değerlendirilecek sanal uzunluğu.' },
    ],
    run: (str, params) => {
      const search = params.search ?? '';
      const endPos = params.endPosition !== '' && params.endPosition !== undefined ? Number(params.endPosition) : str.length;
      const ok = str.endsWith(search, endPos);
      const startHighlight = endPos - search.length;
      return {
        result: ok,
        resultType: 'boolean',
        code: endPos !== str.length ? `str.endsWith(${JSON.stringify(search)}, ${endPos})` : `str.endsWith(${JSON.stringify(search)})`,
        explanation: ok ? `Metin '${search}' ekiyle başarıyla sonlanıyor.` : `Metin '${search}' ile sonlanmıyor.`,
        highlightRange: ok && startHighlight >= 0 ? [startHighlight, endPos] : undefined,
      };
    },
    examples: [
      { title: 'Dosya uzantısı kontrolü', code: '"script.ts".endsWith(".ts")', output: 'true' },
      { title: 'Son ek uyuşmazlığı', code: '"index.html".endsWith(".js")', output: 'false' },
    ],
  },
  {
    id: 'search',
    name: 'search',
    signature: 'str.search(regexp)',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES3',
    returns: 'number',
    shortDesc: 'Düzenli ifade (RegExp) ile eşleşen ilk konumun indeksini döner.',
    detailedDesc: 'String verilirse örtük olarak RegExp nesnesine dönüştürülür. Bulunamazsa -1 döner. RegExp g bayrağını yok sayar.',
    proTip: 'Enes Öztürk Püf Noktası: Sadece düz metin arıyorsanız indexOf() çok daha hızlıdır. search() metodunu sadece Regex deseni gerekiyorsa kullanın.',
    defaultSample: 'Enes Öztürk 1995 doğumlu bir mühendistir.',
    params: [
      { name: 'pattern', type: 'string', label: 'RegExp Deseni', defaultVal: '\\d{4}', description: 'Aranacak düzenli ifade deseni (örn: \\d{4} dört basamaklı yıl).' },
    ],
    run: (str, params) => {
      try {
        const regex = new RegExp(params.pattern || '');
        const idx = str.search(regex);
        const match = str.match(regex);
        return {
          result: idx,
          resultType: 'number',
          code: `str.search(/${params.pattern}/)`,
          explanation: idx !== -1 ? `/${params.pattern}/ deseni ile eşleşen ilk parça '${match?.[0]}' (${idx}. indekste) bulundu.` : 'Eşleşme bulunamadı (-1).',
          highlightRange: idx !== -1 && match ? [idx, idx + match[0].length] : undefined,
        };
      } catch (e: any) {
        return {
          result: -1,
          resultType: 'number',
          code: `str.search(/${params.pattern}/)`,
          explanation: `Hatalı RegExp deseni: ${e.message}`,
          isError: true,
        };
      }
    },
    examples: [
      { title: 'Rakam bulma', code: '"Oda 402".search(/\\d+/)', output: '4' },
      { title: 'Büyük harf arama', code: '"enesOzturk".search(/[A-Z]/)', output: '4' },
    ],
  },
  {
    id: 'match',
    name: 'match',
    signature: 'str.match(regexp)',
    category: 'search',
    categoryLabel: 'Arama & Konum',
    esVersion: 'ES3',
    returns: 'RegExpMatchArray | null',
    shortDesc: 'Bir metni düzenli ifadeye (RegExp) göre eşleştirir ve sonuç dizisini döner.',
    detailedDesc: 'Eğer RegExp /g bayrağı içermiyorsa, yakalama gruplarını (capture groups) ve index, input özelliklerini içeren zengin bir dizi döner. /g varsa tüm eşleşen metinlerin dizisini döner.',
    proTip: 'Enes Öztürk Tavsiyesi: Eğer tüm eşleşmeleri yakalama gruplarıyla (capture groups) birlikte almak isterseniz ES2020 matchAll() kullanın.',
    defaultSample: 'İletişim: enes@example.com ve destek@ozturk.org',
    params: [
      { name: 'pattern', type: 'string', label: 'RegExp Deseni', defaultVal: '[\\w.-]+@[\\w.-]+\\.\\w+', description: 'Eşleştirilecek Regex deseni.' },
      { name: 'flags', type: 'string', label: 'Bayraklar (Flags)', defaultVal: 'g', description: 'g (global), i (ignore case), m (multiline).' },
    ],
    run: (str, params) => {
      try {
        const regex = new RegExp(params.pattern, params.flags);
        const matches = str.match(regex);
        return {
          result: matches,
          resultType: matches ? 'Array<' + typeof matches[0] + '>' : 'null',
          code: `str.match(/${params.pattern}/${params.flags})`,
          explanation: matches
            ? `${matches.length} adet eşleşme yakalandı: [${matches.map(m => `"${m}"`).join(', ')}]`
            : 'Hiçbir eşleşme bulunamadı (null).',
        };
      } catch (e: any) {
        return {
          result: null,
          resultType: 'null',
          code: `str.match(...)`,
          explanation: `RegExp Hatası: ${e.message}`,
          isError: true,
        };
      }
    },
    examples: [
      { title: 'Tüm sayıları bulma', code: '"2024 ve 2026".match(/\\d+/g)', output: '["2024", "2026"]' },
      { title: 'Email yakalama', code: '"Test: a@b.com".match(/[\\w]+@[\\w.]+/)', output: '["a@b.com"]' },
    ],
  },

  // --- DÖNÜŞTÜRME & DEĞİŞİM ---
  {
    id: 'replace',
    name: 'replace',
    signature: 'str.replace(pattern, replacement)',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES3',
    returns: 'string',
    shortDesc: 'Metindeki aranan İLK eşleşmeyi yeni ifadeyle değiştirir ve yeni string döner.',
    detailedDesc: 'Eğer ilk parametre düz bir string ise SADECE İLK geçen yeri değiştirir! Hepsini değiştirmek için global RegExp (/g) veya ES2021 replaceAll() gerekir.',
    proTip: 'Enes Öztürk Önemli Uyarısı: JavaScript mülakatlarında en çok sorulan tuzaklardan biridir: "str.replace(\'a\', \'b\')" sadece ilk \'a\' harfini değiştirir, hepsini değil!',
    defaultSample: 'JavaScript harika bir dil ve JavaScript ile harikalar yaratılır.',
    params: [
      { name: 'pattern', type: 'string', label: 'Değişecek Metin (pattern)', defaultVal: 'JavaScript', description: 'Aranacak kelime.' },
      { name: 'replacement', type: 'string', label: 'Yeni Değer (replacement)', defaultVal: 'TypeScript', description: 'Yerine konulacak metin.' },
    ],
    run: (str, params) => {
      const pat = params.pattern ?? '';
      const rep = params.replacement ?? '';
      const res = str.replace(pat, rep);
      return {
        result: res,
        resultType: 'string',
        code: `str.replace(${JSON.stringify(pat)}, ${JSON.stringify(rep)})`,
        explanation: `Sadece İLK geçen '${pat}' ifadesi '${rep}' ile değiştirildi. Sonraki kopyalar dokunulmadan kaldı.`,
      };
    },
    examples: [
      { title: 'Sadece ilk kelimeyi değiştirme', code: '"elma elma".replace("elma", "armut")', output: '"armut elma"' },
      { title: 'Regex ile global değişim', code: '"1-2-3".replace(/-/g, ":")', output: '"1:2:3"' },
    ],
  },
  {
    id: 'replaceAll',
    name: 'replaceAll',
    signature: 'str.replaceAll(pattern, replacement)',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES2021',
    returns: 'string',
    shortDesc: 'Metin içerisindeki eşleşen TÜM parçaları yenisiyle değiştirir.',
    detailedDesc: 'ES2021 ile dile eklenmiştir. Artık tüm kopyaları değiştirmek için karmaşık RegExp (/g) yazmaya gerek kalmadan düz string ile tüm eşleşmeler değiştirilebilir.',
    proTip: 'Enes Öztürk Kuralı: replaceAll() içine RegExp verirseniz mutlaka \'g\' bayrağı koymalısınız, aksi halde TypeError fırlatılır!',
    defaultSample: 'Kırmızı araba, kırmızı elma ve kırmızı güller.',
    params: [
      { name: 'pattern', type: 'string', label: 'Tüm Değişecekler', defaultVal: 'kırmızı', description: 'Metindeki tüm kopyaları bulunup değiştirilecek kelime.' },
      { name: 'replacement', type: 'string', label: 'Yeni Değer', defaultVal: 'mavi', description: 'Yerine geçecek yeni ifade.' },
    ],
    run: (str, params) => {
      const pat = params.pattern ?? '';
      const rep = params.replacement ?? '';
      const res = str.replaceAll(pat, rep);
      return {
        result: res,
        resultType: 'string',
        code: `str.replaceAll(${JSON.stringify(pat)}, ${JSON.stringify(rep)})`,
        explanation: `Metindeki tüm '${pat}' eşleşmeleri (${(str.match(new RegExp(pat, 'g')) || []).length} adet) '${rep}' ile değiştirildi.`,
      };
    },
    examples: [
      { title: 'Tüm boşlukları tire yapma', code: '"enes ozturk studio".replaceAll(" ", "-")', output: '"enes-ozturk-studio"' },
      { title: 'Karakter temizliği', code: '"100.000.000".replaceAll(".", "")', output: '"100000000"' },
    ],
  },
  {
    id: 'toUpperCase',
    name: 'toUpperCase',
    signature: 'str.toUpperCase()',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES1',
    returns: 'string',
    shortDesc: 'Metindeki tüm harfleri BÜYÜK harfe dönüştürür.',
    detailedDesc: 'İngilizce alfabe kurallarına göre dönüştürür. Türkçe karakterler (özellikle küçük \'i\') için toLocaleUpperCase(\'tr-TR\') tercih edilmelidir.',
    proTip: 'Enes Öztürk Türkçe Uyarısı: "istanbul".toUpperCase() İngilizce kurallara göre "ISTANBUL" (noktalı I) üretir! Türkçe "İSTANBUL" için toLocaleUpperCase("tr-TR") kullanın.',
    defaultSample: 'Modern Web Mimarisi ve Enes Öztürk',
    params: [],
    run: (str) => {
      const res = str.toUpperCase();
      return {
        result: res,
        resultType: 'string',
        code: 'str.toUpperCase()',
        explanation: `Tüm harfler standart büyük harfe çevrildi.`,
      };
    },
    examples: [
      { title: 'Büyütme', code: '"javascript".toUpperCase()', output: '"JAVASCRIPT"' },
    ],
  },
  {
    id: 'toLowerCase',
    name: 'toLowerCase',
    signature: 'str.toLowerCase()',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES1',
    returns: 'string',
    shortDesc: 'Metindeki tüm harfleri KÜÇÜK harfe dönüştürür.',
    detailedDesc: 'Arama yaparken harf duyarlılığını kaldırmak (case-insensitive) için yaygın olarak metin.toLowerCase().includes(arama.toLowerCase()) şeklinde kullanılır.',
    proTip: 'Enes Öztürk Püf Noktası: Kullanıcı aramalarını karşılaştırırken her iki tarafı da toLowerCase() yaparak normalize edin.',
    defaultSample: 'ENES ÖZTÜRK YAZILIM MÜHENDİSLİĞİ',
    params: [],
    run: (str) => {
      const res = str.toLowerCase();
      return {
        result: res,
        resultType: 'string',
        code: 'str.toLowerCase()',
        explanation: 'Tüm harfler küçük harfe çevrildi.',
      };
    },
    examples: [
      { title: 'Küçültme', code: '"FULLSTACK DEVELOPER".toLowerCase()', output: '"fullstack developer"' },
    ],
  },
  {
    id: 'toLocaleUpperCase',
    name: 'toLocaleUpperCase',
    signature: 'str.toLocaleUpperCase([locales])',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES3',
    returns: 'string',
    shortDesc: 'Belirtilen dile/yerel ayarlara (locale) duyarlı olarak harfleri BÜYÜK harfe çevirir.',
    detailedDesc: 'Belirtilen locale için tanımlı büyük harfe dönüştürme kurallarını uygular. Türkçe metinleri Türkçe kurallarıyla dönüştürmek için "tr-TR" locale değerini verin.',
    proTip: 'Türkçe metinde `i` harfinin `İ` biçimine dönüşmesini istiyorsanız `str.toLocaleUpperCase("tr-TR")` kullanın. Locale duyarlı dönüşümün gerekip gerekmediği uygulamanın dil beklentisine bağlıdır.',
    defaultSample: 'istanbul, izmir ve ışık saçan şehirler',
    params: [
      { name: 'locale', type: 'string', label: 'Yerel Dil Kodu (locale)', defaultVal: 'tr-TR', description: 'tr-TR, en-US, de-DE vb.' },
    ],
    run: (str, params) => {
      const loc = params.locale || 'tr-TR';
      const res = str.toLocaleUpperCase(loc);
      return {
        result: res,
        resultType: 'string',
        code: `str.toLocaleUpperCase(${JSON.stringify(loc)})`,
        explanation: `'${loc}' yerel ayarlarına göre büyütüldü: Türkçe 'i' harfleri noktalı 'İ', 'ı' harfleri 'I' oldu.`,
      };
    },
    examples: [
      { title: 'Türkçe i -> İ dönüşümü', code: '"istanbul".toLocaleUpperCase("tr-TR")', output: '"İSTANBUL"' },
      { title: 'İngilizce i -> I farkı', code: '"istanbul".toUpperCase()', output: '"ISTANBUL"' },
    ],
  },
  {
    id: 'toLocaleLowerCase',
    name: 'toLocaleLowerCase',
    signature: 'str.toLocaleLowerCase([locales])',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES3',
    returns: 'string',
    shortDesc: 'Belirtilen yerel ayarlara duyarlı olarak harfleri KÜÇÜK harfe dönüştürür.',
    detailedDesc: 'Türkçe \'I\' harfinin \'ı\' (noktasız i) ve \'İ\' harfinin \'i\' olmasını sağlar.',
    proTip: 'Enes Öztürk Uyarısı: "IŞIK".toLowerCase() "işıki" yapabilir; "IŞIK".toLocaleLowerCase("tr-TR") ise doğru olan "ışık" çıktısını verir.',
    defaultSample: 'İSTANBUL VE IŞIKLI YOLLAR',
    params: [
      { name: 'locale', type: 'string', label: 'Yerel Dil Kodu (locale)', defaultVal: 'tr-TR', description: 'Dil kodu (örn: tr-TR).' },
    ],
    run: (str, params) => {
      const loc = params.locale || 'tr-TR';
      const res = str.toLocaleLowerCase(loc);
      return {
        result: res,
        resultType: 'string',
        code: `str.toLocaleLowerCase(${JSON.stringify(loc)})`,
        explanation: `'${loc}' yerel ayarlarına göre küçültüldü: 'I' -> 'ı' ve 'İ' -> 'i'.`,
      };
    },
    examples: [
      { title: 'Türkçe I -> ı', code: '"IŞIK".toLocaleLowerCase("tr-TR")', output: '"ışık"' },
    ],
  },
  {
    id: 'normalize',
    name: 'normalize',
    signature: 'str.normalize([form])',
    category: 'transformation',
    categoryLabel: 'Dönüştürme & Değişim',
    esVersion: 'ES6/2015',
    returns: 'string',
    shortDesc: 'Unicode Normalizasyon Formunu (NFC, NFD, NFKC, NFKD) uygular.',
    detailedDesc: 'Aksanlı veya birleşik Unicode karakterleri (örneğin e + ́ = é) standartlaştırarak karakter uzunluğu ve eşitlik karşılaştırmalarının tutarlı olmasını sağlar.',
    proTip: 'Enes Öztürk İpucu: Aksanları kaldırmak için `str.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")` muazzam bir yöntemdir!',
    defaultSample: 'Crème Brûlée & Café',
    params: [
      { name: 'form', type: 'string', label: 'Form (NFC, NFD, NFKC, NFKD)', defaultVal: 'NFD', description: 'Unicode ayrıştırma/birleştirme formu.' },
    ],
    run: (str, params) => {
      const form = params.form || 'NFC';
      const res = (str as any).normalize(form);
      return {
        result: res,
        resultType: 'string',
        code: `str.normalize(${JSON.stringify(form)})`,
        explanation: `Unicode metin ${form} formunda normalize edildi. Karakter uzunluğu: ${res.length}.`,
      };
    },
    examples: [
      { title: 'Ayrıştırma (Decomposition)', code: '"é".normalize("NFD")', output: '"e\\u0301" (uzunluk: 2)' },
    ],
  },

  // --- DOLDURMA & DÜZENLEME ---
  {
    id: 'trim',
    name: 'trim',
    signature: 'str.trim()',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES5',
    returns: 'string',
    shortDesc: 'Metnin hem BAŞINDAKİ hem SONUNDAKİ tüm boşlukları (ve satır sonlarını) temizler.',
    detailedDesc: 'Ortadaki boşluklara dokunmaz. Boşluk (space), tab (\\t), yeni satır (\\n, \\r) ve Unicode boşluk karakterlerinin tamamını temizler.',
    proTip: 'Enes Öztürk İpucu: Form girişlerinde kullanıcının yanlışlıkla eklediği baş ve son boşlukları engellemek için her zaman `input.trim()` yapın.',
    defaultSample: '   \n\t  Enes Öztürk Yazılım Tasarımı   \t\n  ',
    params: [],
    run: (str) => {
      const res = str.trim();
      return {
        result: res,
        resultType: 'string',
        code: 'str.trim()',
        explanation: `Baş ve sondaki gereksiz boşluklar atıldı. Orijinal uzunluk: ${str.length} -> Yeni uzunluk: ${res.length}.`,
      };
    },
    examples: [
      { title: 'Form girdisi temizleme', code: '"  kullanici@mail.com  ".trim()', output: '"kullanici@mail.com"' },
    ],
  },
  {
    id: 'trimStart',
    name: 'trimStart',
    signature: 'str.trimStart()',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES2019',
    returns: 'string',
    shortDesc: 'SADECE metnin BAŞINDAKİ (solundaki) boşlukları temizler. (Diğer adı: trimLeft).',
    detailedDesc: 'Metnin sonundaki boşluklar korunur. Satır girintilerini sıfırlamak için idealdir.',
    proTip: 'Enes Öztürk Notu: trimLeft() tarihi bir takma addır; modern standart ES2019 adı trimStart()\'tır.',
    defaultSample: '      <<< Kod Başlangıcı      ',
    params: [],
    run: (str) => {
      const res = str.trimStart();
      return {
        result: res,
        resultType: 'string',
        code: 'str.trimStart()',
        explanation: 'Sadece baştaki boşluklar silindi.',
      };
    },
    examples: [
      { title: 'Sol boşluk silme', code: '"   Enes".trimStart()', output: '"Enes"' },
    ],
  },
  {
    id: 'trimEnd',
    name: 'trimEnd',
    signature: 'str.trimEnd()',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES2019',
    returns: 'string',
    shortDesc: 'SADECE metnin SONUNDAKİ (sağındaki) boşlukları temizler. (Diğer adı: trimRight).',
    detailedDesc: 'Metnin solundaki boşluklara dokunulmaz, yalnızca kuyruk boşlukları kaldırılır.',
    proTip: 'Enes Öztürk Notu: Kod editörlerinde "trailing whitespace" (satır sonu gereksiz boşluklar) temizliği için trimEnd kullanılır.',
    defaultSample: '      Kod Bitişi >>>      ',
    params: [],
    run: (str) => {
      const res = str.trimEnd();
      return {
        result: res,
        resultType: 'string',
        code: 'str.trimEnd()',
        explanation: 'Sadece sondaki boşluklar temizlendi.',
      };
    },
    examples: [
      { title: 'Sağ boşluk silme', code: '"Öztürk   ".trimEnd()', output: '"Öztürk"' },
    ],
  },
  {
    id: 'padStart',
    name: 'padStart',
    signature: 'str.padStart(targetLength[, padString])',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES2017',
    returns: 'string',
    shortDesc: 'Metni BAŞTAN istenen hedef uzunluğa (targetLength) ulaşana kadar doldurur.',
    detailedDesc: 'Tarih, saat formatlama (örneğin gün/ay için 09, 05 gibi 2 haneli yapma) veya kredi kartı maskelemede baştan yıldız eklemede sıklıkla kullanılır.',
    proTip: 'Enes Öztürk Örneği: `String(tarih.getMonth() + 1).padStart(2, "0")` yazarak tek satırda sıfır dolgulu 2 basamaklı ay elde edebilirsiniz.',
    defaultSample: '42',
    params: [
      { name: 'targetLength', type: 'number', label: 'Hedef Uzunluk (targetLength)', defaultVal: 6, description: 'Metnin ulaşacağı toplam karakter sayısı.' },
      { name: 'padString', type: 'string', label: 'Dolgu Karakteri (padString)', defaultVal: '0', description: 'Boşlukları dolduracak metin.' },
    ],
    run: (str, params) => {
      const len = Number(params.targetLength) || str.length;
      const pad = params.padString !== undefined ? String(params.padString) : ' ';
      const res = str.padStart(len, pad);
      return {
        result: res,
        resultType: 'string',
        code: `str.padStart(${len}, ${JSON.stringify(pad)})`,
        explanation: `Metin baştan '${pad}' ile doldurularak toplam ${len} karaktere ulaştırıldı: '${res}'.`,
      };
    },
    examples: [
      { title: 'Sıfır dolgusu (Sipariş No)', code: '"7".padStart(5, "0")', output: '"00007"' },
      { title: 'Saat formatlama', code: '"9".padStart(2, "0")', output: '"09"' },
    ],
  },
  {
    id: 'padEnd',
    name: 'padEnd',
    signature: 'str.padEnd(targetLength[, padString])',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES2017',
    returns: 'string',
    shortDesc: 'Metni SONUNDAN istenen hedef uzunluğa ulaşana kadar belirtilen karakterle doldurur.',
    detailedDesc: 'Terminal çıktılarında kolon hizalama veya metin sonuna sabit noktalar/çizgiler eklemek için kullanılır.',
    proTip: 'Enes Öztürk Notu: targetLength metnin mevcut uzunluğundan küçük veya eşitse hiçbir dolgu yapılmaz ve orijinal metin döner.',
    defaultSample: 'Enes Öztürk',
    params: [
      { name: 'targetLength', type: 'number', label: 'Hedef Uzunluk', defaultVal: 20, description: 'Ulaşılmak istenen toplam uzunluk.' },
      { name: 'padString', type: 'string', label: 'Dolgu Karakteri', defaultVal: '.', description: 'Sona eklenecek karakterler.' },
    ],
    run: (str, params) => {
      const len = Number(params.targetLength) || str.length;
      const pad = params.padString !== undefined ? String(params.padString) : ' ';
      const res = str.padEnd(len, pad);
      return {
        result: res,
        resultType: 'string',
        code: `str.padEnd(${len}, ${JSON.stringify(pad)})`,
        explanation: `Metnin sonuna '${pad}' eklenerek ${len} uzunluğuna tamamlandı.`,
      };
    },
    examples: [
      { title: 'Tablo hizalama', code: '"Fiyat".padEnd(10, ".") + "150 TL"', output: '"Fiyat.....150 TL"' },
    ],
  },
  {
    id: 'repeat',
    name: 'repeat',
    signature: 'str.repeat(count)',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES6/2015',
    returns: 'string',
    shortDesc: 'Metni belirtilen count sayısı kadar peş peşe tekrarlar.',
    detailedDesc: 'Ayraç çizgileri oluşturma (örneğin "=".repeat(40)) veya görsel yıldızlama (örneğin "★".repeat(5)) için çok pratiktir. Negatif verilirse RangeError fırlatır.',
    proTip: 'Enes Öztürk İpucu: Kredi kartı maskelemesinde `"*".repeat(str.length - 4) + str.slice(-4)` harika bir tek satırlık çözümdür!',
    defaultSample: '★',
    params: [
      { name: 'count', type: 'number', label: 'Tekrar Sayısı (count)', defaultVal: 5, description: 'Pozitif tam sayı (0 veya daha büyük).' },
    ],
    run: (str, params) => {
      const count = Math.max(0, Number(params.count) || 0);
      try {
        const res = str.repeat(count);
        return {
          result: res,
          resultType: 'string',
          code: `str.repeat(${count})`,
          explanation: `'${str}' ifadesi ${count} defa tekrarlandı (Toplam ${res.length} karakter).`,
        };
      } catch (e: any) {
        return {
          result: '',
          resultType: 'string',
          code: `str.repeat(${count})`,
          explanation: `Hata: ${e.message}`,
          isError: true,
        };
      }
    },
    examples: [
      { title: 'Yıldız puanı', code: '"★".repeat(5)', output: '"★★★★★"' },
      { title: 'Ayırıcı çizgi', code: '"-".repeat(10)', output: '"----------"' },
    ],
  },
  {
    id: 'concat',
    name: 'concat',
    signature: 'str.concat(str2[, ...strN])',
    category: 'formatting',
    categoryLabel: 'Doldurma & Düzenleme',
    esVersion: 'ES1',
    returns: 'string',
    shortDesc: 'Bir veya daha fazla string parametresini ana metne uç uca ekler.',
    detailedDesc: 'Orijinal metni değiştirmez. Modern JavaScript\'te template literals (`${a} ${b}`) veya `+` operatörü performans ve okunabilirlik açısından daha çok tercih edilir.',
    proTip: 'Enes Öztürk Notu: concat() metodu yerine ES6 şablon dizgilerini (Template Literals: `${ad} ${soyad}`) kullanmak modern kodlama standardıdır.',
    defaultSample: 'Enes',
    params: [
      { name: 'str2', type: 'string', label: 'Eklenecek 1', defaultVal: ' ', description: 'Eklenecek birinci metin.' },
      { name: 'str3', type: 'string', label: 'Eklenecek 2', defaultVal: 'Öztürk', description: 'Eklenecek ikinci metin.' },
    ],
    run: (str, params) => {
      const s2 = params.str2 ?? '';
      const s3 = params.str3 ?? '';
      const res = str.concat(s2, s3);
      return {
        result: res,
        resultType: 'string',
        code: `str.concat(${JSON.stringify(s2)}, ${JSON.stringify(s3)})`,
        explanation: `Metinler başarıyla birleştirildi: '${res}'.`,
      };
    },
    examples: [
      { title: 'Ad soyad birleştirme', code: '"Enes".concat(" ", "Öztürk")', output: '"Enes Öztürk"' },
    ],
  },

  // --- KODLAMA & KARŞILAŞTIRMA ---
  {
    id: 'charCodeAt',
    name: 'charCodeAt',
    signature: 'str.charCodeAt(index)',
    category: 'analysis',
    categoryLabel: 'Kodlama & Karşılaştırma',
    esVersion: 'ES1',
    returns: 'number (0 - 65535)',
    shortDesc: 'Belirtilen indeksteki karakterin 16-bit UTF-16 sayısal kodunu (ASCII/Unicode) döner.',
    detailedDesc: 'İndeks aralık dışındaysa NaN döner. Harflerin ASCII tablosundaki yerini (örneğin \'A\' = 65, \'a\' = 97) veya şifreleme/hash hesaplamalarında kullanılır.',
    proTip: 'Enes Öztürk Hatırlatması: Emojiler gibi 65535\'ten büyük 32-bit Unicode kod noktaları için charCodeAt yerine codePointAt() kullanın.',
    defaultSample: 'Enes Öztürk',
    params: [
      { name: 'index', type: 'number', label: 'Karakter İndeksi', defaultVal: 0, description: 'Kodu sorgulanacak karakterin konumu.' },
    ],
    run: (str, params) => {
      const idx = Number(params.index) || 0;
      const code = str.charCodeAt(idx);
      const char = str.charAt(idx);
      return {
        result: isNaN(code) ? 'NaN' : code,
        resultType: 'number',
        code: `str.charCodeAt(${idx})`,
        explanation: !isNaN(code)
          ? `'${char}' karakterinin UTF-16 kodu: ${code} (Onluk) | 0x${code.toString(16).toUpperCase()} (Onaltılık)`
          : 'Geçersiz indeks; sonuç NaN.',
        highlightRange: idx >= 0 && idx < str.length ? [idx, idx + 1] : undefined,
      };
    },
    examples: [
      { title: 'Büyük A harfi', code: '"A".charCodeAt(0)', output: '65' },
      { title: 'Küçük a harfi', code: '"a".charCodeAt(0)', output: '97' },
    ],
  },
  {
    id: 'codePointAt',
    name: 'codePointAt',
    signature: 'str.codePointAt(index)',
    category: 'analysis',
    categoryLabel: 'Kodlama & Karşılaştırma',
    esVersion: 'ES6/2015',
    returns: 'number | undefined',
    shortDesc: 'Karakterin tam Unicode Code Point değerini (32-bit emojiler dahil) döndürür.',
    detailedDesc: 'charCodeAt\'in çözemediği çift baytlı surrogate pair karakterleri (emojiler, nadir semboller vb.) eksiksiz çözümler.',
    proTip: 'Enes Öztürk Notu: "🚀".charCodeAt(0) sadece 55357 (yarım surrogate) dönerken, "🚀".codePointAt(0) gerçek Unicode değeri olan 128640 döner!',
    defaultSample: '🚀 Kodlama Dünyası 💻',
    params: [
      { name: 'index', type: 'number', label: 'İndeks', defaultVal: 0, description: 'Unicode değeri sorgulanacak karakter.' },
    ],
    run: (str, params) => {
      const idx = Number(params.index) || 0;
      const cp = str.codePointAt(idx);
      return {
        result: cp ?? 'undefined',
        resultType: cp ? 'number' : 'undefined',
        code: `str.codePointAt(${idx})`,
        explanation: cp
          ? `Unicode Code Point: ${cp} (Hex: U+${cp.toString(16).toUpperCase()})`
          : 'Geçersiz indeks.',
        highlightRange: [idx, idx + 1],
      };
    },
    examples: [
      { title: 'Roket emojisi Unicode', code: '"🚀".codePointAt(0)', output: '128640 (U+1F680)' },
    ],
  },
  {
    id: 'localeCompare',
    name: 'localeCompare',
    signature: 'str.localeCompare(compareString[, locales[, options]])',
    category: 'analysis',
    categoryLabel: 'Kodlama & Karşılaştırma',
    esVersion: 'ES3',
    returns: 'number (-1, 0, 1)',
    shortDesc: 'İki metni dile özgü alfabetik sıralama kurallarına göre karşılaştırır.',
    detailedDesc: 'Dizileri alfabetik sıralarken (Array.prototype.sort) kullanılır. Negatifse referans metin önce gelir, 0 ise eşittir, pozitifse sonra gelir.',
    proTip: 'Enes Öztürk Önemli Kuralı: Türkçe isimleri standart `arr.sort()` ile sıralarsanız "Ç", "Ş", "İ", "Ö", "Ü" harfleri Z\'den sonraya atılır! Doğru Türkçe alfabetik sıralama için daima `arr.sort((a, b) => a.localeCompare(b, "tr"))` kullanın!',
    defaultSample: 'Çiğdem',
    params: [
      { name: 'compare', type: 'string', label: 'Karşılaştırılacak Metin', defaultVal: 'Deniz', description: 'İkinci metin.' },
      { name: 'locale', type: 'string', label: 'Dil Kodu (locales)', defaultVal: 'tr', description: 'Türkçe için "tr", İngilizce için "en".' },
    ],
    run: (str, params) => {
      const cmp = params.compare ?? '';
      const loc = params.locale || 'tr';
      const res = str.localeCompare(cmp, loc);
      let exp = '';
      if (res < 0) exp = `'${str}' kelimesi '${cmp}' kelimesinden alfabetik olarak ÖNCE gelir.`;
      else if (res > 0) exp = `'${str}' kelimesi '${cmp}' kelimesinden alfabetik olarak SONRA gelir.`;
      else exp = `Her iki kelime alfabetik olarak eşittir.`;

      return {
        result: res < 0 ? -1 : res > 0 ? 1 : 0,
        resultType: 'number',
        code: `str.localeCompare(${JSON.stringify(cmp)}, ${JSON.stringify(loc)})`,
        explanation: `${exp} (${loc} alfabe kuralları uygulandı).`,
      };
    },
    examples: [
      { title: 'Türkçe Ç vs D sıralaması', code: '"Çiğdem".localeCompare("Deniz", "tr")', output: '-1 (Ç önce gelir)' },
      { title: 'Eşitlik kontrolü', code: '"enes".localeCompare("enes")', output: '0' },
    ],
  },
];
