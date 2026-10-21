import { DataTypeInfo, VariableRule, QuizQuestion } from '../types';

export const AUTHOR_NAME = 'Enes Öztürk';
export const COURSE_TITLE = 'C# & .NET Değişkenler ve Veri Tipleri Kılavuzu';

export const MICROSOFT_DOCS = {
  dateTime: {
    title: 'System.DateTime Yapısı (.NET)',
    url: 'https://learn.microsoft.com/tr-tr/dotnet/api/system.datetime',
    description: 'Anlık zamanı, tarih hesaplamalarını, saat dilimlerini ve takvim işlemlerini yöneten en temel .NET struct veri tipidir.',
    officialNote: 'DateTime ve String veri tiplerlerini yazılım geliştirirken çok kullanıyoruz. İlerleyen derslerde sadece bu kütüphaneleri kullanarak bolca örnek yapacağız. Ama öncesinde daha yakından bakmanın faydalı olacağını düşünüyorum.',
    keyProperties: [
      { name: 'DateTime.Now', type: 'DateTime', desc: 'Sisteminizin yerel saat ve tarih bilgisini anlık olarak getirir.' },
      { name: 'DateTime.Today', type: 'DateTime', desc: 'Günün saat bilgisini 00:00:00 olarak sıfırlayıp sadece tarihi döner.' },
      { name: 'DateTime.UtcNow', type: 'DateTime', desc: 'Evrensel koordineli saat (UTC) cinsinden geçerli zamanı getirir.' },
      { name: 'Year, Month, Day', type: 'int', desc: 'Tarihin yıl, ay (1-12) ve gün bileşenlerini ayrı tam sayılar olarak verir.' },
      { name: 'Hour, Minute, Second', type: 'int', desc: 'Saatin saat, dakika ve saniye bileşenlerini okur.' },
      { name: 'DayOfWeek', type: 'DayOfWeek', desc: 'Haftanın hangi günü olduğunu enum (Pazartesi, Salı..) olarak döner.' },
      { name: 'DayOfYear', type: 'int', desc: 'Yılın kaçıncı günü olduğunu (1-366) belirtir.' },
      { name: 'TimeOfDay', type: 'TimeSpan', desc: 'Günün başlangıcından geçen süreyi (TimeSpan) temsil eder.' }
    ],
    keyMethods: [
      { name: 'AddDays(double)', desc: 'Tarihe belirtilen gün miktarını ekler (negatif değer ile çıkarma yapar).' },
      { name: 'AddMonths(int)', desc: 'Tarihe belirtilen ay miktarını ekler veya çıkarır.' },
      { name: 'AddYears(int)', desc: 'Tarihe belirtilen yıl kadar ekleme yapar.' },
      { name: 'AddHours / AddMinutes', desc: 'Zaman bileşenlerine saat veya dakika ekler.' },
      { name: 'ToString(format)', desc: 'Tarihi özel format şablonlarına ("dd.MM.yyyy HH:mm:ss") dönüştürür.' },
      { name: 'ToShortDateString()', desc: 'Kısa tarih biçiminde (örn: 21.10.2026) string döner.' },
      { name: 'DateTime.IsLeapYear(year)', desc: 'Belirtilen yılın artık yıl (366 gün) olup olmadığını kontrol eder.' },
      { name: 'DateTime.Parse(string)', desc: 'String metni geçerli bir DateTime nesnesine dönüştürür.' }
    ]
  },
  string: {
    title: 'System.String Sınıfı (.NET)',
    url: 'https://learn.microsoft.com/tr-tr/dotnet/api/system.string',
    description: 'Metinsel verileri tutan, değiştirilemez (immutable) bir .NET referans türüdür.',
    officialNote: 'System.String özellikleri ve metotları için Microsoft Learn resmi API başvuru kaynağıdır.',
    keyProperties: [
      { name: 'Length', type: 'int', desc: 'Metindeki UTF-16 kod birimlerinin sayısını döner.' },
      { name: 'Chars[index]', type: 'char', desc: 'Metindeki belirli bir indeksteki tek bir karakteri okur (örn: metin[0]).' }
    ],
    keyMethods: [
      { name: 'ToUpper() / ToLower()', desc: 'Tüm harfleri büyük veya küçük harfe çevirir.' },
      { name: 'Trim() / TrimStart() / TrimEnd()', desc: 'Metnin başındaki ve sonundaki gereksiz boşlukları temizler.' },
      { name: 'Contains(subStr)', desc: 'Metin içinde aranan bir kelime veya ifadenin geçip geçmediğini (true/false) döner.' },
      { name: 'StartsWith / EndsWith', desc: 'Metnin belirli bir ifadeyle başlayıp başlamadığını denetler.' },
      { name: 'Substring(start, length)', desc: 'Belirtilen başlangıç indeksinden itibaren istenen uzunlukta parçayı çeker.' },
      { name: 'IndexOf / LastIndexOf', desc: 'Aranan karakter veya kelimenin ilk/son geçtiği sıfır tabanlı indeks numarasını döner.' },
      { name: 'Replace(old, new)', desc: 'Metin içindeki belirli bir karakteri veya kelimeyi yenisiyle değiştirir.' },
      { name: 'Split(char)', desc: 'Metni belirli bir karaktere göre parçalayarak dizi (string[]) olarak döndürür.' },
      { name: 'string.Join(delimiter, array)', desc: 'Bir dizideki elemanları aralarına ayraç koyarak tek bir string haline getirir.' },
      { name: 'string.IsNullOrEmpty(str)', desc: 'Metnin null veya boş ("") olup olmadığını kontrol eder.' },
      { name: 'string.IsNullOrWhiteSpace(str)', desc: 'Metnin null, boş veya yalnızca boşluklardan oluşup oluşmadığını denetler.' }
    ]
  }
};

export const DATA_TYPES: DataTypeInfo[] = [
  {
    name: 'char',
    category: 'Metin / Karakter',
    csharpKeyword: 'char',
    dotnetType: 'System.Char',
    sizeBytes: 2,
    memoryType: 'Değer tipi',
    rangeDescription: 'Tek bir 16-bit UTF-16 kod birimi (\'A\', \'9\', \'?\', \'ğ\')',
    exampleValue: "'E'",
    goodUseCases: 'Cinsiyet (\'E\'/\'K\'), menü seçimi, tek harfli durum kodları, harf notları (\'A\', \'B\').',
    performanceNote: 'char 2 baytlık UTF-16 kod birimi tutar. Bir değişkenin Stack veya Heap üzerindeki konumu, onu barındıran yapıya ve çalışma zamanına bağlıdır.'
  },
  {
    name: 'string',
    category: 'Metin / Karakter',
    csharpKeyword: 'string',
    dotnetType: 'System.String',
    sizeBytes: null,
    memoryType: 'Referans tipi',
    rangeDescription: 'Değişken uzunlukta UTF-16 metin; karakter verisinin ve nesne maliyetinin boyutu uygulamaya bağlıdır',
    exampleValue: '"Enes Öztürk"',
    goodUseCases: 'İsimler, cümleler, adresler, e-posta, paragraflar.',
    performanceNote: 'String değiştirilemez bir referans türüdür. Gerçek bellek maliyeti runtime, metin uzunluğu, referansın bulunduğu yapı ve nesne hizalaması gibi etkenlere bağlı olduğundan tek bir sabit bayt değeri yoktur.'
  },
  {
    name: 'byte',
    category: 'Tam Sayı',
    csharpKeyword: 'byte',
    dotnetType: 'System.Byte',
    sizeBytes: 1,
    memoryType: 'Değer tipi',
    rangeDescription: '0 ile 255 arası işaretsiz tam sayılar',
    exampleValue: '255',
    goodUseCases: 'İkili dosya okuma, RGB renk değerleri (0-255), mikroişlemci verileri.',
    performanceNote: 'byte 1 bayttır; tür seçimini beklenen aralık ve alan tasarımı belirlemelidir. Bir değişkenin fiziksel konumu bağlama bağlıdır.'
  },
  {
    name: 'short',
    category: 'Tam Sayı',
    csharpKeyword: 'short',
    dotnetType: 'System.Int16',
    sizeBytes: 2,
    memoryType: 'Değer tipi',
    rangeDescription: '-32.768 ile 32.767 arası',
    exampleValue: '1984',
    goodUseCases: 'Yıl değerleri, küçük sensör ölçümleri, bellek kısıtlı IoT cihazları.',
    performanceNote: 'short 2 baytlık bir tam sayı türüdür. Yerleşim ve toplam bellek tüketimi kullanım bağlamına bağlıdır.'
  },
  {
    name: 'int',
    category: 'Tam Sayı',
    csharpKeyword: 'int',
    dotnetType: 'System.Int32',
    sizeBytes: 4,
    memoryType: 'Değer tipi',
    rangeDescription: '-2.147.483.648 ile 2.147.483.647 arası (~2.1 Milyar)',
    exampleValue: '42',
    goodUseCases: 'Döngü sayaçları, kullanıcı yaşları, ürün adetleri, standart tam sayılar.',
    performanceNote: 'int, C# içinde yaygın varsayılan tam sayı türüdür. Performans farkları için gerçek iş yükünü ölçün.'
  },
  {
    name: 'long',
    category: 'Tam Sayı',
    csharpKeyword: 'long',
    dotnetType: 'System.Int64',
    sizeBytes: 8,
    memoryType: 'Değer tipi',
    rangeDescription: '-9.223.372.036.854.775.808 ile 9.223.372.036.854.775.807 arası',
    exampleValue: '9876543210123L',
    goodUseCases: 'Büyük sayaçlar, zaman damgaları ve int aralığını aşan sayısal değerler.',
    performanceNote: 'long 8 baytlık bir tam sayı türüdür. Değer aralığı ihtiyaca uyduğunda kullanın; veritabanı kimlik türünü şemaya göre seçin.'
  },
  {
    name: 'float',
    category: 'Ondalıklı Sayı',
    csharpKeyword: 'float',
    dotnetType: 'System.Single',
    sizeBytes: 4,
    memoryType: 'Değer tipi',
    rangeDescription: '7 basamak hassasiyet (32-bit kayan nokta)',
    exampleValue: '3.14f',
    goodUseCases: 'Grafik motorları, oyun fiziği (hız, açı, koordinat), sensör verileri.',
    performanceNote: 'float 32 bit kayan noktalı sayıdır. Sayısal literal için f soneki, float türünde atamayı açıkça belirtir.'
  },
  {
    name: 'double',
    category: 'Ondalıklı Sayı',
    csharpKeyword: 'double',
    dotnetType: 'System.Double',
    sizeBytes: 8,
    memoryType: 'Değer tipi',
    rangeDescription: '15-16 basamak hassasiyet (64-bit kayan nokta)',
    exampleValue: '123.456789',
    goodUseCases: 'Bilimsel hesaplamalar, matematiksel formüller, standart ondalıklı işlemler.',
    performanceNote: 'C# içinde ondalıklı sayıların varsayılan tipidir.'
  },
  {
    name: 'decimal',
    category: 'Ondalıklı Sayı',
    csharpKeyword: 'decimal',
    dotnetType: 'System.Decimal',
    sizeBytes: 16,
    memoryType: 'Değer tipi',
    rangeDescription: '28-29 basamak kesin doğruluk (128-bit taban-10)',
    exampleValue: '1999.99m',
    goodUseCases: 'Finans, muhasebe, bankacılık, para birimleri, vergi hesapları.',
    performanceNote: 'decimal ondalık tabanlı aritmetik için uygundur; sonlu hassasiyeti ve taşma sınırı vardır. Para uygulamalarında yuvarlama ve iş kurallarını ayrıca tanımlayın.'
  },
  {
    name: 'bool',
    category: 'Mantıksal',
    csharpKeyword: 'bool',
    dotnetType: 'System.Boolean',
    sizeBytes: 1,
    memoryType: 'Değer tipi',
    rangeDescription: 'Yalnızca true veya false',
    exampleValue: 'true',
    goodUseCases: 'Yetki kontrolleri (isAdmin), işlem durumu (isCompleted), açık/kapalı anahtarlar.',
    performanceNote: '1 byte. Koşul ifadelerinin (if/else) temel yapı taşıdır.'
  },
  {
    name: 'DateTime',
    category: 'Tarih / Zaman',
    csharpKeyword: 'DateTime',
    dotnetType: 'System.DateTime',
    sizeBytes: 8,
    memoryType: 'Değer tipi',
    rangeDescription: '01.01.0001 00:00:00 ile 31.12.9999 23:59:59 arası',
    exampleValue: 'DateTime.Now',
    goodUseCases: 'Kayıt tarihi, son giriş zamanı, randevu takvimi, log zaman damgaları.',
    performanceNote: 'DateTime bir değer türüdür. Yerleşimi onu içeren yerel değişken, alan veya koleksiyon gibi yapıya bağlıdır.'
  }
];

export const VARIABLE_RULES: VariableRule[] = [
  {
    id: 1,
    title: 'Büyük / Küçük Harf Duyarlılığı (Case Sensitive)',
    shortDesc: 'Değişkenler harf büyüklüklerine göre tamamen farklı adreslere işaret eder.',
    explanation: 'C# dilinde büyük ve küçük harfler derleyici tarafından farklı karakter kodları olarak algılanır. Aynı harflerden oluşan ancak harf büyüklükleri farklı olan değişkenler tamamen ayrı iki farklı değişken sayılır.',
    validExamples: [
      'int yas = 25;',
      'int Yas = 30; // "yas" ile "Yas" aynı anda var olabilir!',
      'string adSoyad = "Enes";',
      'string ADSOYAD = "Öztürk";'
    ],
    invalidExamples: [
      {
        code: 'int toplam = 100;\nConsole.WriteLine(Toplam);',
        reason: 'Derleyici "Toplam" adında bir değişken bulamaz (CS0103: The name \'Toplam\' does not exist in the current context).'
      }
    ],
    tip: 'C# standartlarında yerel değişkenlerde camelCase (örn: ogrenciNotu), sınıflarda ve metodlarda PascalCase (örn: OgrenciNotuHesapla) kullanılır.'
  },
  {
    id: 2,
    title: 'Rakamla Başlayamaz',
    shortDesc: 'Değişken ismi bir sayı veya rakamla (0-9) başlayamaz.',
    explanation: 'Derleyici kaynak kodunu parse ederken ilk karakter bir rakam ise bunu sayısal bir sabit (literal) olarak okumaya başlar. Bu yüzden değişken isimlerinin ilk karakteri mutlaka bir harf veya alt tire (_) olmalıdır. Sonraki karakterlerde rakam serbesttir.',
    validExamples: [
      'int sayi1 = 10;',
      'string ogrenci2 = "Ali";',
      'double x1 = 3.5, x2 = 7.8;',
      'int _1inciSinav = 90;'
    ],
    invalidExamples: [
      {
        code: 'int 1sayi = 10;',
        reason: 'Rakamla başladığı için derleyici sözdizimi hatası verir (CS1001: Identifier expected).'
      },
      {
        code: 'string 2ogrenci = "Veli";',
        reason: 'Değişken adı rakamla başlatılamaz.'
      }
    ],
    tip: 'Eğer sıralı değişkenler kullanıyorsanız rakamı daima sona veya ortaya ekleyin: "vize1", "finalNotu2".'
  },
  {
    id: 3,
    title: 'Boşluk İçeremez (Yalnızca Alt Tire "_" Kullanılabilir)',
    shortDesc: 'Değişken adlarında boşluk (space) bulunamaz.',
    explanation: 'C# derleyicisi boşluğu kelimeleri ve ifadeleri birbirinden ayıran bir sınır (token delimiter) olarak algılar. Bir değişken adının arasına boşluk koyduğunuzda derleyici ikinci kelimeyi yeni bir tip veya bilinmeyen bir sözdizimi sanır.',
    validExamples: [
      'string kullanici_adi = "enes_ozturk";',
      'string kullaniciAdi = "enesOzturk";',
      'int _gizliSayac = 0;',
      'double toplam_tutar_tl = 1500.50;'
    ],
    invalidExamples: [
      {
        code: 'string kullanici adi = "enes";',
        reason: 'Boşluk olduğu için derleyici "adi" kelimesini anlamlandıramaz (CS1002: ; expected).'
      },
      {
        code: 'int ogrenci numarasi = 105;',
        reason: 'Değişken ismi tek bir parça (identifier) olmak zorundadır.'
      }
    ],
    tip: 'Boşluk yerine kelimeleri birleştirmek için alt tire (_) kullanabilir veya en çok tercih edilen yöntem olan camelCase yapısını (ogrenciNumarasi) uygulayabilirsiniz.'
  },
  {
    id: 4,
    title: 'Matematiksel ve İşlem Operatörleri Kullanılamaz',
    shortDesc: 'İsimler +, -, *, /, %, &, |, ! gibi işlem işaretleri içeremez.',
    explanation: 'Değişken isimlerinde +, -, *, /, %, &, |, !, <, >, = gibi aritmetik ve mantıksal operatörler yer alamaz. Çünkü derleyici bu karakterleri değişken adının parçası olarak değil, iki değer arasında yapılan bir matematiksel veya mantıksal işlem olarak yorumlar.',
    validExamples: [
      'int kar_zarar = 5000;',
      'int karVeZarar = 5000;',
      'double toplam_arti_kdv = 1180;',
      'int netToplam = 250;'
    ],
    invalidExamples: [
      {
        code: 'int kar-zarar = 5000;',
        reason: 'Derleyici bunu "kar eksi zarar" matematik işlemi sanar (CS1073: Unexpected token \'-\').'
      },
      {
        code: 'int toplam+kdv = 120;',
        reason: 'Artı işareti bir toplama işlemi operatörüdür, değişken isminde yer alamaz.'
      }
    ],
    tip: 'Tire (-) yerine mutlaka alt tire (_) kullanın. Eksi işareti en sık yapılan acemi hatasıdır.'
  },
  {
    id: 5,
    title: 'Özel ve Rezerve İsimler (Keywords) Kullanılamaz',
    shortDesc: 'class, namespace, int, static, return gibi C# anahtar kelimeleri doğrudan isim olamaz.',
    explanation: 'C# dilinin kendi sözdizimini oluşturmak için rezerve ettiği özel anahtar kelimeler (keywords) vardır (örn: class, namespace, static, void, int, string, return, if, else, while, for). Bu kelimeler derleyicinin temel yapı taşları olduğu için doğrudan değişken ismi olarak atanamazlar.',
    validExamples: [
      'string dersSinifi = "10-A";',
      'string adAlani = "Proje.Models";',
      'int @class = 5; // İlla gerekiyorsa önüne @ (verbatim) işareti konarak kullanılabilir!'
    ],
    invalidExamples: [
      {
        code: 'string class = "10-A";',
        reason: '"class" kelimesi C# dilinde sınıf tanımlamak için ayrılmış bir anahtar kelimedir.'
      },
      {
        code: 'int namespace = 42;',
        reason: '"namespace" C# isim uzayı tanımlayıcısıdır.'
      }
    ],
    tip: 'Gerektiğinde değişkenin başına @ sembolü koyarak rezerve kelimeleri kullanabilirsiniz (`string @event = "Tıklama";`), ancak en temiz yol açıklayıcı bir isim seçmektir (`string etkinlikAdi;`).'
  },
  {
    id: 6,
    title: 'Değer Atama Zorunluluğu (Definite Assignment & Null)',
    shortDesc: 'Değişkenlerin her zaman bir değeri olmak zorundadır, yoksa null tanımlanmalıdır.',
    explanation: 'C# derleyicisi "Definite Assignment" (Kesin Atama) kuralını uygular. Metot içerisinde tanımlanan yerel (local) bir değişken değer atanmadan kullanılmaya çalışılırsa derleyici hata verir. Değer henüz bilinmiyorsa referans tipler için `null`, değer tipleri için varsayılan değer atanmalıdır.',
    validExamples: [
      'int sayi = 0; // Varsayılan değer verildi',
      'string metin = null; // Henüz değeri yoksa null atanabilir',
      'string baslik = string.Empty; // Boş metin ("")',
      'int? bosOlabilirSayi = null; // Nullable değer tipi'
    ],
    invalidExamples: [
      {
        code: 'int puan;\nConsole.WriteLine(puan);',
        reason: 'Ataması yapılmayan yerel değişken kullanıldığında derleyici derlemeyi durdurur (CS0165: Use of unassigned local variable \'puan\').'
      },
      {
        code: 'string ad;\nint uzunluk = ad.Length;',
        reason: 'Atama yapılmadığı için nesne örneğine erişilemez (CS0165).'
      }
    ],
    tip: 'Değişkeni tanımladığınız anda ona anlamlı bir başlangıç değeri verin (`int sayac = 0;`). Böylece beklenmeyen hataların ve boş referans istisnalarının (NullReferenceException) önüne geçersiniz.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Sadece tek bir karakter (örneğin cinsiyet bilgisi \'E\' veya \'K\') tutmak istediğimizde hangi veri tipini seçmek bellek ve performans açısından en doğrudur?',
    options: [
      'string - Çünkü ileride kelimeye dönüşebilir.',
      'char - Tek bir UTF-16 kod birimini temsil etmek için tasarlanmış değer türüdür.',
      'int - Karakterin ASCII kodunu tutmak daha iyidir.',
      'byte - Çünkü 1 byte ile her şeyi tutabiliriz.'
    ],
    correctIndex: 1,
    explanation: 'Tek bir UTF-16 kod birimi tutmak için char; sıfır veya daha fazla karakterden oluşan metin için string kullanılır. Değer/referans türü ayrımı, her değişkenin fiziksel olarak Stack ya da Heap üzerinde bulunduğu anlamına gelmez; kesin bellek tasarrufu bağlama ve çalışma zamanına bağlıdır.'
  },
  {
    id: 2,
    question: 'Aşağıdaki değişken tanımlamalarından hangisi C# derleyicisi tarafından GEÇERLİ kabul edilir ve hatasız derlenir?',
    codeSnippet: '// Hangi tanımlama C# kurallarına tamamen uygundur?',
    options: [
      'int 1inciSinav = 85;',
      'string ogrenci adi = "Mehmet";',
      'double kar-zarar = 1450.75;',
      'string ogrenci_adi = "Mehmet";'
    ],
    correctIndex: 3,
    explanation: 'Değişken isimleri rakamla başlayamaz (1inciSinav geçersiz), boşluk içeremez (ogrenci adi geçersiz) ve eksi gibi işlem operatörleri içeremez (kar-zarar geçersiz). Alt tire (_) kullanımı ise geçerlidir.'
  },
  {
    id: 3,
    question: 'C# dilinde "Case Sensitive" özelliği ne anlama gelir?',
    options: [
      'Değişkenlerin sadece İngilizce karakterlerle yazılması gerektiğini belirtir.',
      'Büyük ve küçük harflerin farklı algılandığını, örneğin "yas" ve "Yas" isimlerinin iki farklı değişken olduğunu ifade eder.',
      'Değişkenlerin yalnızca büyük harfle yazılması zorunluluğunu belirtir.',
      'Değişken isimlerinde hiçbir harf kullanılamayacağı anlamına gelir.'
    ],
    correctIndex: 1,
    explanation: 'Case Sensitive (büyük/küçük harf duyarlılığı), derleyicinin "sayi", "Sayi" ve "SAYI" tanımlarını bellekte tamamen farklı üç değişken olarak işlemesidir.'
  },
  {
    id: 4,
    question: 'C# derleyicisinde yerel bir değişken tanımlayıp değer atamadan kullanmaya kalkışırsanız (Örn: int puan; Console.WriteLine(puan);) ne gerçekleşir?',
    options: [
      'Otomatik olarak 0 değeri ekrana yazdırılır.',
      'Program çalışırken aniden çöker (Runtime Crash).',
      'Derleyici hata verir ve kod derlenmez (CS0165: Use of unassigned local variable).',
      'C# derleyicisi değişkeni otomatik olarak string türüne çevirir.'
    ],
    correctIndex: 2,
    explanation: 'C# dilinde "Definite Assignment" kuralı vardır. Değeri atanmamış bir yerel değişken kullanılırsa derleyici CS0165 derleme hatası vererek programın derlenmesini engeller. Değişkenin başlangıç değeri olmalı veya null atanmalıdır.'
  },
  {
    id: 5,
    question: 'DateTime kütüphanesinde mevcut sistemin yerel anlık tarih ve saatini milisaniyelerine kadar elde etmek için hangi özellik (property) kullanılır?',
    options: [
      'DateTime.Today',
      'DateTime.Now',
      'DateTime.UtcNow',
      'DateTime.CurrentTime'
    ],
    correctIndex: 1,
    explanation: 'DateTime.Now o anki yerel saat ve tarihi verir. DateTime.Today ise saat kısmını 00:00:00 olarak sıfırlar.'
  },
  {
    id: 6,
    question: 'String kütüphanesinde bir metnin hem başındaki hem sonundaki gereksiz boşlukları silmek için hangi fonksiyon kullanılır?',
    options: [
      'metin.Clear()',
      'metin.RemoveSpaces()',
      'metin.Trim()',
      'metin.Substring(0)'
    ],
    correctIndex: 2,
    explanation: 'Trim() metodu string\'in başındaki ve sonundaki tüm boşluk (whitespace) karakterlerini temizleyerek yeni bir string döndürür.'
  },
  {
    id: 7,
    question: 'Aşağıdaki kelimelerden hangisi C# dilinde doğrudan değişken ismi olarak KULLANILAMAZ (önüne @ işareti konmadığı sürece)?',
    options: [
      'class',
      'dersAdi',
      'sinifMevcudu',
      'notOrtalamasi'
    ],
    correctIndex: 0,
    explanation: '"class" kelimesi C# dilinin sınıf tanımlama rezerve anahtar sözcüğüdür (keyword). Doğrudan değişken ismi yapılamaz; sadece @class şeklinde kaçışla kullanılabilir.'
  },
  {
    id: 8,
    question: 'Değişken tanımlama yapısı C# dilinde hangi genel formülle ifade edilir?',
    options: [
      '(Değeri) = (Değişken Adı) (Değişken Türü);',
      '(Değişken Türü) (Değişken Adı) = (Değeri);',
      'var -> (Değeri) : (Değişken Adı);',
      '(Değişken Adı) : (Değişken Türü) = (Değeri);'
    ],
    correctIndex: 1,
    explanation: 'Enes Öztürk ders anlatımında belirtildiği gibi: C# dilinde değişken tanımlama yapısı "(Değişken Türü) (Değişken Adı) = (Değeri);" şeklindedir (Örn: int sayi = 10;).'
  }
];
