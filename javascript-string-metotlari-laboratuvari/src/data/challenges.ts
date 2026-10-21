/** String metotları alıştırmaları ve örnek testler. */

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Kolay' | 'Orta' | 'İleri';
  description: string;
  category: string;
  starterCode: string;
  hint: string;
  authorNote: string;
  testCases: Array<{
    input: any[];
    expected: any;
    label: string;
  }>;
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'mask-credit-card',
    title: '1. Kredi Kartı Maskeleme (padStart & slice)',
    difficulty: 'Kolay',
    category: 'Güvenlik & Biçimlendirme',
    description: '16 haneli bir kart numarasının son 4 hanesi hariç tüm karakterlerini yıldız (*) ile maskeleyin. Çıktı toplam 16 karakter olmalıdır.',
    starterCode: `function maskCard(cardNumber) {
  // Enes Öztürk İpucu: slice(-4) ve padStart(16, "*") kombinasyonu mükemmeldir.
  const lastFour = cardNumber.slice(-4);
  return lastFour.padStart(16, '*');
}`,
    hint: 'cardNumber.slice(-4) son 4 karakteri alır. .padStart(cardNumber.length, "*") ile kalan kısmı yıldızla doldurabilirsiniz.',
    authorNote: 'Enes Öztürk Notu: slice(-4) negatif indeksi son derece hızlı çalışır ve padStart sabit uzunluklu maskeler için standart çözümdür.',
    testCases: [
      { input: ['1234567812345678'], expected: '************5678', label: 'Standart 16 hane' },
      { input: ['5528790011223344'], expected: '************3344', label: 'MasterCard serisi' },
      { input: ['4000123456789010'], expected: '************9010', label: 'Visa serisi' },
    ],
  },
  {
    id: 'slugify-url',
    title: '2. SEO Uyumlu URL Slug Üretici',
    difficulty: 'Orta',
    category: 'Web Geliştirme & SEO',
    description: 'Bir makale başlığını Türkçe karakterleri dönüştürerek, boşlukları tire (-) yaparak ve küçük harfe çevirerek SEO dostu URL slug\'a dönüştürün.',
    starterCode: `function generateSlug(title) {
  // Adım 1: Küçük harfe çevirip boşlukları trim edin
  // Adım 2: Türkçe karakterleri (ç, ğ, ı, ö, ş, ü) İngilizce karşılıklarıyla değiştirin
  // Adım 3: Boşlukları tireye çevirin
  let res = title.trim().toLowerCase();
  const trMap = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
  for (let key in trMap) {
    res = res.replaceAll(key, trMap[key]);
  }
  return res.replaceAll(' ', '-');
}`,
    hint: 'replaceAll() ve toLowerCase() kullanarak tüm Türkçe harfleri ve boşlukları dönüştürün.',
    authorNote: 'Enes Öztürk Notu: Modern web projelerinde slug üretimi için replaceAll() ile karakter haritalandırması performans açısından en temiz yaklaşımdır.',
    testCases: [
      { input: ['Enes Öztürk ile Modern JavaScript'], expected: 'enes-ozturk-ile-modern-javascript', label: 'Türkçe harfli başlık' },
      { input: ['Geleceğin Yazılım Çözümleri'], expected: 'gelecegin-yazilim-cozumleri', label: 'Yumuşak g ve noktasız ı' },
    ],
  },
  {
    id: 'title-case',
    title: '3. Başlık Formatlayıcı (Title Case)',
    difficulty: 'Orta',
    category: 'Metin Dönüştürme',
    description: 'Verilen cümledeki her kelimenin ilk harfini büyük, diğer harflerini küçük yapacak fonksiyonu yazın.',
    starterCode: `function toTitleCase(sentence) {
  // Enes Öztürk İpucu: split(" ") ile kelimelere ayırıp map içinde charAt(0).toUpperCase() + slice(1) yapabilirsiniz.
  return sentence
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}`,
    hint: 'Cümleyi split(" ") ile ayırın, her kelimenin ilk harfini toUpperCase(), geri kalanını .slice(1).toLowerCase() yapıp .join(" ") ile birleştirin.',
    authorNote: 'Enes Öztürk Notu: charAt(0) boş kelimelerde hata vermez, slice(1) ise ilk karakterden sonrasını güvenle alır.',
    testCases: [
      { input: ['enes öztürk yazılım stüdyosu'], expected: 'Enes Öztürk Yazılım Stüdyosu', label: 'Küçük harfli isim' },
      { input: ['jAVASCRIPT vE tYPESCRIPT'], expected: 'Javascript Ve Typescript', label: 'Karışık harf durumu' },
    ],
  },
  {
    id: 'palindrome-check',
    title: '4. Palindrom Denetleyicisi',
    difficulty: 'Kolay',
    category: 'Algoritma',
    description: 'Verilen metnin tersten okunuşu ile düz okunuşunun aynı olup olmadığını (büyük/küçük harf ve boşlukları yok sayarak) bulun.',
    starterCode: `function isPalindrome(text) {
  // Boşlukları temizleyip küçültün, ardından tersten okunuşla kıyaslayın
  const cleaned = text.toLowerCase().replaceAll(' ', '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}`,
    hint: 'replaceAll(" ", "") ve toLowerCase() ile normalize edin, sonra split("").reverse().join("") ile tersiyle karşılaştırın.',
    authorNote: 'Enes Öztürk Notu: String immutability gereği ters çevirme için Array metodlarına başvurmak (split -> reverse -> join) en pratik yöntemdir.',
    testCases: [
      { input: ['ey edip adanada pide ye'], expected: true, label: 'Meşhur Türkçe palindrom' },
      { input: ['radar'], expected: true, label: 'Tek kelime palindrom' },
      { input: ['javascript'], expected: false, label: 'Palindrom olmayan kelime' },
    ],
  },
  {
    id: 'extract-domain',
    title: '5. E-Postadan Alan Adı (Domain) Çıkarma',
    difficulty: 'Kolay',
    category: 'Ayıklama',
    description: 'Bir e-posta adresinden sadece alan adını (örn: "destek@enesozturk.dev" -> "enesozturk.dev") slice veya split kullanarak ayıklayın.',
    starterCode: `function extractDomain(email) {
  // indexOf("@") ile @ işaretinin yerini bulup slice() ile sonrasını alın
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return '';
  return email.slice(atIndex + 1);
}`,
    hint: 'email.indexOf("@") + 1 ile slice yaparak @ işaretinden sonraki kısmı alabilirsiniz.',
    authorNote: 'Enes Öztürk Notu: split("@")[1] de çalışır ancak slice() ekstra dizi tahsisi yapmadığı için bellek dostudur.',
    testCases: [
      { input: ['iletisim@enesozturk.dev'], expected: 'enesozturk.dev', label: 'Özel alan adı' },
      { input: ['ogrenci@universite.edu.tr'], expected: 'universite.edu.tr', label: 'Uzun alan adı' },
    ],
  },
  {
    id: 'truncate-with-ellipsis',
    title: '6. Metin Kısaltma ve Üç Nokta Ekleme',
    difficulty: 'Kolay',
    category: 'UI & Metin Kontrolü',
    description: 'Eğer metin maxLen uzunluğunu aşıyorsa, maxLen karakterde kesip sonuna "..." ekleyin. Aşmıyorsa olduğu gibi döndürün.',
    starterCode: `function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}`,
    hint: 'text.length > maxLen ise text.slice(0, maxLen) alıp sonuna "..." ekleyin.',
    authorNote: 'Enes Öztürk Notu: UI kartlarında metin kırpma yaparken trimEnd() kullanmak nokta öncesinde çirkin bir boşluk kalmasını engeller.',
    testCases: [
      { input: ['Enes Öztürk Yazılım Mimarisi', 10], expected: 'Enes Öztü...', label: '10 karakterlik kısaltma' },
      { input: ['Kısa Metin', 20], expected: 'Kısa Metin', label: 'Limitten kısa metin' },
    ],
  },
];
