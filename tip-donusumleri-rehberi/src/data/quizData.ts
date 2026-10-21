/**
 * Tip Dönüşümleri Test Soruları
 * Hazırlayan: Enes Öztürk
 */

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: 'Implicit' | 'Explicit' | 'Overflow' | 'Convert/Parse' | 'Boxing';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Implicit',
    question: "Aşağıdaki kod parçası çalıştırıldığında ne olur?",
    codeSnippet: `short x = 10;\nint y;\ny = x;`,
    options: [
      "Derleme hatası verir, çünkü açıkça (int) cast edilmemiştir.",
      "Sorunsuz çalışır, çünkü int veri tipi short'a göre bellekte daha geniş alan tutar (Implicit Conversion).",
      "Bellek taşması (OverflowException) fırlatır.",
      "x değişkeninin değeri 0 olur."
    ],
    correctIndex: 1,
    explanation: "Doğru! C# short türünden int türüne örtük dönüşüme izin verir. Örtük dönüşümün gerekçesi yalnızca türlerin bellek boyutları değildir; dilin dönüşüm kuralları belirleyicidir.",
  },
  {
    id: 2,
    topic: 'Implicit',
    question: "Aşağıdaki kod satırında neden tip dönüşümü gerekmeksizin kendiliğinden atama yapılır?",
    codeSnippet: `float a;\nint b = 25;\na = b;`,
    options: [
      "Çünkü float ve int bellekte aynı bit genişliğinde olsalar da float çok daha geniş sayı aralığını saklayabilir.",
      "Çünkü C# dilinde tüm sayı tipleri birbirine otomatik çevrilir.",
      "Çünkü 25 sayısı 100'den küçüktür.",
      "Çünkü float tam sayıdır."
    ],
    correctIndex: 0,
    explanation: "Doğru! int (32-bit) ve float (32-bit) aynı bit sayısına sahip olsa da float kayan noktalı (IEEE 754) gösterim sayesinde ~3.4 x 10^38 değerine kadar saklayabilir. Bu nedenle int -> float ataması örtük (implicit) olarak kendiliğinden gerçekleşir.",
  },
  {
    id: 3,
    topic: 'Overflow',
    question: "Aşağıdaki unchecked C# kodu çalıştırıldığında ekrana ne yazdırılır?",
    codeSnippet: `int sayi = 300;\nbyte b = (byte)sayi;\nConsole.WriteLine(b);`,
    options: [
      "300",
      "255",
      "44",
      "System.OverflowException fırlatılır"
    ],
    correctIndex: 2,
    explanation: "Doğru! byte tipi 0-255 arası (8-bit) değer tutar. 300 sayısı 32-bitte '00000001 00101100' iken byte'a cast edildiğinde en sağdaki 8 bit ('00101100' = 44) alınır. Matematiksel olarak 300 % 256 = 44 olur.",
  },
  {
    id: 4,
    topic: 'Convert/Parse',
    question: "Aşağıdaki iki satırın çalışması arasındaki fark nedir?",
    codeSnippet: `string deger = null;\nint a = Convert.ToInt32(deger);\nint b = int.Parse(deger);`,
    options: [
      "İkisi de 0 değerini döndürür.",
      "İkisi de ArgumentNullException fırlatır.",
      "Convert.ToInt32(null) 0 döndürür, int.Parse(null) ise ArgumentNullException fırlatır.",
      "int.Parse(null) 0 döndürür, Convert.ToInt32(null) ise hata fırlatır."
    ],
    correctIndex: 2,
    explanation: "Mükemmel! C# mülakatlarının gözdesi: Convert sınıfı null parametre aldığında hedef tipin varsayılan değerini (int için 0) üretir. int.Parse ise null gördüğünde doğrudan ArgumentNullException fırlatarak uygulamayı patlatır.",
  },
  {
    id: 5,
    topic: 'Explicit',
    question: "Kullanıcıdan alınan metinsel bir sayıyı int'e çevirirken uygulamanın geçersiz girdilerde çökmesini engellemek için en iyi yöntem hangisidir?",
    options: [
      "(int)metin operatörü kullanmak",
      "int.Parse(metin) kullanmak",
      "int.TryParse(metin, out int sonuc) kullanmak",
      "metin.ToString() demek"
    ],
    correctIndex: 2,
    explanation: "Doğru! int.TryParse geçerli girdi için true döndürüp out değişkenine sonucu yazar; geçersiz girdi için false döndürür ve out değişkenine varsayılan değerini atar. Performans sonuçları kullanım örüntüsüne ve çalışma zamanına bağlıdır.",
  },
  {
    id: 6,
    topic: 'Boxing',
    question: "Aşağıdaki kod parçasında hangi bellek işlemi gerçekleşir?",
    codeSnippet: `int sayi = 100;\nobject kutu = sayi;\nint geri = (int)kutu;`,
    options: [
      "Yalnızca Stack üzerinde kopyalama yapılır.",
      "Önce değer object olarak kullanılır (Boxing), sonra kutulanmış değer özgün türüne dönüştürülür (Unboxing).",
      "Sadece derleme zamanında tip ismi değişir, bellekte hiçbir işlem yapılmaz.",
      "Garbage Collector nesneyi hemen siler."
    ],
    correctIndex: 1,
    explanation: "Tebrikler! int değerinin object olarak kullanılmasına 'Boxing' (Kutulama), kutulanmış değerin tekrar int türüne dönüştürülmesine 'Unboxing' (Kutudan çıkarma) denir. Boxing kutulanmış bir nesne oluşturur; gereksiz kutulama performans ve bellek maliyeti doğurabilir.",
  },
];
