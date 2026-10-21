import { QuizQuestion } from '../types';

export const LESSON_CONTENT = {
  author: 'Enes Öztürk',
  title: 'While ve ForEach Döngüleri',
  subtitle: 'C# Programlama Dilinde Koşullu ve Koleksiyonel Döngü Yapıları',
  description: 'Koşullar sağlandıkça çalışan While döngüsü ile koleksiyon ve dizi elemanlarını tek tek işleyen ForEach döngüsünün kapsamlı rehberi ve interaktif simülatörü.',

  whileSection: {
    title: 'While Döngüsü',
    definition: 'Koşullar sağlandıkça komut satırlarının çalıştırılmasını sağlar. For döngüsünden farklı olarak iterasyon sayısı belli değildir.',
    codeSnippet: `int sayac = 1;
while (sayac <= 5)
{
    Console.WriteLine(sayac);
    sayac++;
}`,
    explanation: "Yukarıdaki örnekte bir while döngüsü görüyoruz. sayac başlangıçta 1 olarak verilmiş. Ve sayaç 5 den küçük veya 5'e eşit olduğu sürece console'a sayacın değerini yazdıracak. Ve her döngü sonunda sayacın değerini bir arttıracak.",
    syntax: `while (koşul)
{
    // Koşul doğru (true) olduğu sürece
    // çalışacak kod blokları
}`,
    keyPoints: [
      'Koşul kontrolü döngünün başında yapılır. Koşul en başta false ise döngü gövdesi hiç çalışmaz.',
      'İterasyon sayısı önceden bilinmediğinde (kullanıcı girdi verene kadar, dosya sonuna gelinene kadar vb.) idealdir.',
      'Sonsuz döngü (Infinite loop) riskine dikkat edilmelidir; döngü bloğu içinde koşulu false yapacak bir güncelleme (örn: sayac++) yer almalıdır.'
    ]
  },

  forEachSection: {
    title: 'ForEach Döngüsü',
    definition: 'Foreach döngüsü diziler ve koleksiyonlarla döngüsel işlemler yapmak için kullanılır. Yapısı while ve for döngüsünden biraz farklıdır. Döngünün ne kadar devam edeceğini kullanılan dizi veya koleksiyonun eleman sayısı belirler. Her bir elaman için bir iterasyon gerçekleşir.',
    syntax: `foreach(değişkenTipi değişkenAdı in diziAdı)
{
    //Komutlar
}`,
    codeSnippet: `int[] sayiDizisi = {2,4,5,1,2,4};
int toplam = 0 ;

foreach(int i in sayiDizisi)
{
    toplam += i ;
}`,
    explanation: 'Yukarıdaki örnekte foreach döngüsü kullanarak dizinin elemanlarını topladık. sayiDizisi içindeki 6 elemanın her biri sırasıyla i değişkenine atanır ve toplam değişkenine eklenir. Döngü bittiğinde toplam 18 olur.',
    keyPoints: [
      'Döngünün dönüş sayısını dizi veya koleksiyondaki toplam eleman adedi otomatik belirler.',
      'İndeks (index) yönetimi veya sayac takibi gerektirmez, kodun okunabilirliğini ve güvenliğini artırır.',
      'Döngü iterasyon değişkenine yeniden atama yapılamaz. Bu, başvurulan nesnenin üyelerini değiştirmekle aynı kısıtlama değildir.'
    ]
  }
};

export const COMPARISON_TABLE = [
  {
    feature: 'Temel Amaç',
    while: 'Belirli bir mantıksal koşul doğru (true) olduğu sürece çalışır.',
    forEach: 'Bir dizi veya koleksiyondaki her bir elemanı sırayla ziyaret eder.',
    for: 'Belirlenmiş bir başlangıç, bitiş ve adım sayısıyla çalışır.'
  },
  {
    feature: 'İterasyon Sayısı',
    while: 'Önceden bilinmez (belirsiz, koşula bağlı).',
    forEach: 'Dizideki/koleksiyondaki eleman sayısı kadardır.',
    for: 'Genellikle önceden hesaplanabilir veya bellidir.'
  },
  {
    feature: 'İndeks Kullanımı',
    while: 'Manuel olarak sayaç değişkeniyle yönetilir.',
    forEach: 'İndekse doğrudan ihtiyaç duymaz, elemanı verir.',
    for: 'Döngü indeks değişkeni (i = 0; i < n; i++) ile çalışır.'
  },
  {
    feature: 'Eleman Değiştirme',
    while: 'Dizi indeksine erişiliyorsa değiştirilebilir.',
    forEach: 'İterasyon değişkenine yeniden atama yapılamaz; koleksiyon elemanlarını güncelleme kuralları koleksiyon türüne bağlıdır.',
    for: 'Dizi indeksi üzerinden dizi[i] = yeniDeger yapılabilir.'
  },
  {
    feature: 'En Uygun Senaryo',
    while: 'Kullanıcı doğru şifreyi girene kadar, oyun döngüleri, akış okuma.',
    forEach: 'Listelerdeki tüm nesneleri ekrana yazdırma, toplam/ortalama alma.',
    for: 'Matematiksel seriler, tersine dönme, ikişer ikişer atlama.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Aşağıdaki While döngüsü çalıştığında ekrana hangi sayılar yazdırılır?",
    codeSnippet: `int sayac = 1;
while (sayac <= 3)
{
    Console.Write(sayac + " ");
    sayac++;
}`,
    options: ["1 2 3", "1 2", "0 1 2 3", "Sonsuz döngüye girer"],
    correctAnswer: 0,
    explanation: "sayac=1 iken yazdırılır ve 2 olur, sayac=2 iken yazdırılır ve 3 olur, sayac=3 iken (3 <= 3 true) yazdırılır ve 4 olur. sayac=4 olduğunda (4 <= 3 false) döngü sonlanır. Ekrana '1 2 3 ' yazılır."
  },
  {
    id: 2,
    question: "Foreach döngüsünün kaç kez çalışacağını ne belirler?",
    codeSnippet: `foreach(var eleman in koleksiyon) { ... }`,
    options: [
      "Kullanılan dizi veya koleksiyonun eleman sayısı",
      "Kullanıcının klavyeden girdiği sayı",
      "While koşulunun sonucu",
      "Daima en fazla 10 kez çalışır"
    ],
    correctAnswer: 0,
    explanation: "Foreach döngüsünde iterasyon adedini dizinin ya da koleksiyonun eleman sayısı belirler. Her bir eleman için döngü 1 kez çalışır."
  },
  {
    id: 3,
    question: "Aşağıdaki kod parçasının çıktısı ne olur?",
    codeSnippet: `int[] sayiDizisi = {2, 4, 5, 1, 2, 4};
int toplam = 0;

foreach(int i in sayiDizisi)
{
    toplam += i;
}
Console.WriteLine(toplam);`,
    options: ["18", "16", "6", "Hata verir"],
    correctAnswer: 0,
    explanation: "2 + 4 + 5 + 1 + 2 + 4 = 18. Her iterasyonda eleman 'toplam' değişkenine eklenir."
  },
  {
    id: 4,
    question: "Aşağıdaki kod parçasında nasıl bir problem meydana gelir?",
    codeSnippet: `int x = 1;
while (x <= 5)
{
    Console.WriteLine(x);
    // x değişkeni artırılmadı
}`,
    options: [
      "Sonsuz döngü (Infinite loop) oluşur ve program donar",
      "Kod derleme hatası verir",
      "Ekrana sadece bir kere 1 yazar ve biter",
      "x otomatik olarak kendiliğinden artar"
    ],
    correctAnswer: 0,
    explanation: "x değişkeni artırılmadığı için değeri sürekli 1 kalır. 1 <= 5 koşulu her zaman 'true' olacağından döngü durmaksızın 1 yazdırır (Sonsuz Döngü)."
  },
  {
    id: 5,
    question: "Foreach döngüsü içerisindeki döngü değişkeni hakkında hangisi DOĞRUDUR?",
    codeSnippet: `foreach(int i in sayilar)
{
    // i = 10; -> Bu satır ne yapar?
}`,
    options: [
      "foreach iterasyon değişkenine doğrudan yeniden atama yapılamaz; derleme hatası verir",
      "i değişkenine yeni değer atanabilir ve dizideki eleman değişir",
      "Foreach sadece string dizileri ile çalışır",
      "Foreach iterasyon değişkeni dizi indeksini tutar ve sıfırdan başlar"
    ],
    correctAnswer: 0,
    explanation: "C#'ta foreach iterasyon değişkenine yeniden atama yapılamaz. Başvurulan nesnenin değiştirilebilir üyeleri veya koleksiyonun yapısı için ayrı kurallar geçerlidir."
  }
];

export const PLAYGROUND_TEMPLATES = [
  {
    id: 'while-standard',
    title: 'Varsayılan While (1\'den 5\'e Sayım)',
    type: 'while' as const,
    initialVal: 1,
    limit: 5,
    step: 1,
    description: 'Enes Öztürk ders notundaki klasik while örneği.'
  },
  {
    id: 'while-even',
    title: 'Çift Sayıları Sayma (2, 4, 6, 8, 10)',
    type: 'while' as const,
    initialVal: 2,
    limit: 10,
    step: 2,
    description: 'Sayaç ikişer ikişer artırılarak 10\'a kadar olan çift sayılar yazdırılır.'
  },
  {
    id: 'while-countdown',
    title: 'Geriye Doğru Sayım (5\'ten 1\'e)',
    type: 'while-down' as const,
    initialVal: 5,
    limit: 1,
    step: 1,
    description: 'sayac >= 1 koşulu ile geriye doğru sayma simülasyonu.'
  },
  {
    id: 'foreach-sum',
    title: 'Dizi Elemanlarını Toplama',
    type: 'foreach' as const,
    array: [2, 4, 5, 1, 2, 4],
    description: 'Enes Öztürk ders notundaki {2,4,5,1,2,4} dizisinin toplamı (toplam = 18).'
  },
  {
    id: 'foreach-grades',
    title: 'Not Ortalaması & En Yüksek Not',
    type: 'foreach' as const,
    array: [85, 90, 78, 95, 60],
    description: 'Öğrenci sınav notlarının foreach ile toplanması ve değerlendirilmesi.'
  }
];
