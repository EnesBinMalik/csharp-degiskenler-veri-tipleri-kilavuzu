import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'extension',
    question: "C# dilinde bir metodun 'Extension Metot' olabilmesi için sınıf ve metot bildiriminde hangi anahtar kelime zorunludur?",
    options: [
      "abstract",
      "static",
      "sealed",
      "virtual"
    ],
    correctIndex: 1,
    explanation: "Extension metotlar mutlaka static bir sınıf içinde ve kendileri de static olarak tanımlanmalıdır. Bir nesne örneğine ihtiyaç duyulmadan derleyici tarafından tanınırlar.",
    authorNote: "Enes Öztürk: Unutmayın, static class ve static method zorunludur; ancak çağrılırken sanki o nesnenin bir üye metoduymuş (instance method) gibi çağrılır."
  },
  {
    id: 2,
    category: 'extension',
    question: "Aşağıdaki C# extension metot parametre tanımlarından hangisi derleme hatası verir (Geçersizdir)?",
    codeSnippet: `// 1: public static void Test1(this string a, int b)
// 2: public static void Test2(this int a, this string b)
// 3: public static void Test3(this double a)
// 4: public static void Test4(this List<int> a)`,
    options: [
      "1. Tanım",
      "2. Tanım (İki parametrede 'this')",
      "3. Tanım",
      "4. Tanım"
    ],
    correctIndex: 1,
    explanation: "Bir extension metodunda yalnız ve yalnızca 1 adet 'this' anahtar kelimesi bulunabilir ve o da ilk parametrede yer almak zorundadır (CS1100 derleyici hatası).",
    authorNote: "Enes Öztürk: Extension metotlar sadece tek bir tipi genişletebilir. Birden fazla 'this' yazmak C# dil kurallarına aykırıdır."
  },
  {
    id: 3,
    category: 'recursion',
    question: "Rekürsif çağrı zinciri hiçbir zaman sonlanmazsa ne meydana gelebilir?",
    options: [
      "Program derlenmez (Syntax error)",
      "Çağrı yığını tükenerek StackOverflowException gibi ciddi bir hata oluşabilir",
      "Program sonsuz döngüde arka planda sessizce bekler",
      "Garbage Collector fonksiyonu bellekten otomatik temizler"
    ],
    correctIndex: 1,
    explanation: "Sonlanmayan çağrı zinciri büyümeyi sürdürür ve çalışma ortamının çağrı yığını sınırını aşabilir. Gerçek sınır platforma ve çağrı özelliklerine bağlıdır.",
    authorNote: "Rekürsif algoritmanın her çağrıda sonlanma koşuluna yaklaşabildiğini doğrulayın."
  },
  {
    id: 4,
    category: 'recursion',
    question: "Verilen FibonacciSerisi(int sayi) metodunda sayi = 3 girildiğinde fonksiyon toplam kaç kez çağrılır?",
    codeSnippet: `static int FibonacciSerisi(int sayi) {
    if (sayi == 0) return 0;
    else if (sayi == 1) return 1;
    else return FibonacciSerisi(sayi - 1) + FibonacciSerisi(sayi - 2);
}`,
    options: [
      "3 kez",
      "4 kez",
      "5 kez",
      "6 kez"
    ],
    correctIndex: 2,
    explanation: "Fib(3) çağrısı -> Fib(2) ve Fib(1) çağırır. Fib(2) ise Fib(1) ve Fib(0) çağırır. Toplam çağrılar: Fib(3), Fib(2), Fib(1), Fib(0) ve Fib(3)'ün sağ kolundaki Fib(1) = 5 kez.",
    authorNote: "Enes Öztürk: Bu dallanma nedeniyle sade Fibonacci 2^n karmaşıklığa sahiptir. Kağıt üzerinde ağaç çizerek incelemenizi bu yüzden öneriyorum."
  },
  {
    id: 5,
    category: 'extension',
    question: "Geleneksel extension metot sözdizimindeki aşağıdaki çağrı, hangi static metot çağrısına eşdeğer olarak çözümlenir?",
    codeSnippet: `int deger = 123;
bool isEven = deger.IsEvenNumber();`,
    options: [
      "bool isEven = int.IsEvenNumber(deger);",
      "bool isEven = MyExtensionClass.IsEvenNumber(deger);",
      "bool isEven = deger.Invoke('IsEvenNumber');",
      "bool isEven = RuntimeHelper.Call(deger);"
    ],
    correctIndex: 1,
    explanation: "Geleneksel extension metot çağrısı, alıcı nesnenin ilk argüman olarak verildiği static metoda eşdeğer biçimde çözümlenir. Üretilen IL ayrıntıları derleyici uygulamasına bağlıdır.",
    authorNote: "Enes Öztürk: Extension metotlar nesnenin içine kod eklemez; çağrı sözdizimini akıcı ve okunabilir kılar."
  },
  {
    id: 6,
    category: 'recursion',
    question: "Aşağıdaki faktöriyel metodundaki hata nedir?",
    codeSnippet: `static int Faktoryel(int n) {
    return n * Faktoryel(n - 1);
}`,
    options: [
      "Çarpma işlemi yapılamaz",
      "Fonksiyon static olamaz",
      "Taban durumu (n <= 1 durumu) yazılmadığı için sonsuza dek çağrılır",
      "Dönüş tipi int değil string olmalıdır"
    ],
    correctIndex: 2,
    explanation: "Fonksiyon n değerini her çağrıda azaltır ancak hiçbir durma koşulu içermez. Çağrı zinciri uygulamanın çağrı yığını sınırını aşabilir.",
    authorNote: "Enes Öztürk: Rekürsif bir fonksiyon yazarken parmaklarınız klavyede ilk olarak taban durumunu (Base Case) yazmalıdır."
  },
  {
    id: 7,
    category: 'extension',
    question: "Eğer bir sınıfta hem aynı isimde bir üye metot (Instance Method) hem de aynı isimde bir Extension Metot varsa derleyici hangisini öncelikli çalıştırır?",
    options: [
      "Extension Metot önceliklidir",
      "Sınıfın kendi üye metodu (Instance Method) önceliklidir",
      "Derleyici kararsız kalıp derleme hatası verir (Ambiguity Error)",
      "Rastgele biri seçilir"
    ],
    correctIndex: 1,
    explanation: "Uygun bir instance üye metot çağrıyı karşılıyorsa extension metotlara başvurulmaz. Extension metotlar instance üyeleri geçersiz kılmaz veya override etmez.",
    authorNote: "Enes Öztürk: Bu çok önemli bir mülakat sorusudur. Extension metotlar asla var olan üye metotları ezemez (override edemez)."
  },
  {
    id: 8,
    category: 'recursion',
    question: "Aşağıdakilerden hangisi rekürsif metot kullanmak için en doğal ve uygun problem türlerinden biridir?",
    options: [
      "Dizideki 5 sayıyı sırayla ekrana yazdırmak",
      "İç içe klasör ve alt dizin ağacında (Folder/Directory Tree) dosya aramak",
      "İki sayıyı toplamak",
      "Veritabanından 10 kaydı çekip for döngüsüyle listelemek"
    ],
    correctIndex: 1,
    explanation: "Ağaç (Tree), Graf (Graph) ve dosya sistemi gibi dallanmalı hiyerarşik veri yapılarında her alt dalın kendisi de bir ağaç olduğu için rekürsif yaklaşım en zarif çözümdür.",
    authorNote: "Enes Öztürk: Hiyerarşik ve fraktal doğaya sahip problemlerde rekürsiyon kodu onlarca satırdan tek bir fonksiyona indirir."
  }
];
