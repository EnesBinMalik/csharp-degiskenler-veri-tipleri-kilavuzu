import { QuizQuestion } from '../types.ts';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Aşağıdaki kod parçası çalıştırıldığında konsola hangi çıktı yazılır?',
    codeSnippet: `bool condition = false;

if (condition)
{
    Console.WriteLine("Değişken: true");
}
else
{
    Console.WriteLine("Değişken: false");
}`,
    options: [
      'Değişken: true',
      'Değişken: false',
      'Hata verir (Compile Error)',
      'Konsola hiçbir şey yazılmaz',
    ],
    correctIndex: 1,
    explanation: 'condition değişkeni false olduğu için if bloğu atlanır ve doğrudan else bloğundaki Console.WriteLine("Değişken: false"); satırı çalışır.',
  },
  {
    id: 2,
    question: 'Ternary If (Üçlü Koşul Operatörü) sözdiziminin doğru sıralaması hangisidir?',
    codeSnippet: `// Sözdizimi Şablonu:
[?] ve [:] işaretleri nasıl kullanılır?`,
    options: [
      'Koşul : Doğruysa_Değer ? Yanlışsa_Değer',
      'Koşul ? Doğruysa_Değer : Yanlışsa_Değer',
      'Doğruysa_Değer ? Koşul : Yanlışsa_Değer',
      'Yanlışsa_Değer : Doğruysa_Değer ? Koşul',
    ],
    correctIndex: 1,
    explanation: 'Ternary operatörünün sözdizimi her zaman: (koşul) ? (koşul doğruysa dönecek değer) : (koşul yanlışsa dönecek değer); şeklindedir.',
  },
  {
    id: 3,
    question: 'Aşağıdaki If-Else bloğunu tek satırda Ternary If ile yazmak isteyen bir geliştirici hangi ifadeyi kullanmalıdır?',
    codeSnippet: `int puan = 80;
string sonuc;
if (puan >= 50)
    sonuc = "Geçti";
else
    sonuc = "Kaldı";`,
    options: [
      'string sonuc = puan >= 50 : "Geçti" ? "Kaldı";',
      'string sonuc = (puan >= 50) ? "Geçti" : "Kaldı";',
      'string sonuc = "Geçti" ? puan >= 50 : "Kaldı";',
      'string sonuc = if (puan >= 50) ? "Geçti" : "Kaldı";',
    ],
    correctIndex: 1,
    explanation: 'Ternary if bir "ifade" (expression) olduğu için doğrudan değişken atamasında sağ tarafta `(puan >= 50) ? "Geçti" : "Kaldı";` olarak atanabilir.',
  },
  {
    id: 4,
    question: 'If-Else yapısı ile Ternary If operatörü arasındaki temel farklardan biri nedir?',
    options: [
      'Ternary If her durumda daha hızlı çalışır.',
      'If-Else bir ifade (expression), Ternary If ise bir deyimdir (statement).',
      'Ternary If bir değer döndüren ifadedir (expression); If-Else ise bir kod bloğu çalıştıran deyimdir (statement).',
      'C# dilinde Ternary If içinde boolean koşul kullanılamaz.',
    ],
    correctIndex: 2,
    explanation: 'If-else bir deyimdir (statement); kendi başına değer üreten bir ifade olarak değişkene atanamaz, ancak dalların içinde atama yapılabilir. Ternary If bir ifade (expression) olduğu için hesapladığı değer doğrudan atanabilir.',
  },
  {
    id: 5,
    question: 'Temiz Kod (Clean Code) standartlarına göre iç içe (nested) 3-4 katlı Ternary If kullanımı hakkında hangisi doğrudur?',
    options: [
      'Tavsiye edilir, çünkü kod dosyasının boyutunu küçültür.',
      'Tavsiye edilmez, çünkü okunabilirliği (readability) ve hata ayıklamayı ciddi derecede zorlaştırır; bu durumda if-else if veya switch tercih edilmelidir.',
      'C# derleyicisi iç içe Ternary If yazımına kesinlikle izin vermez.',
      'Ternary operatörü yalnızca bool tipiyle çalışır, sayılarla kullanılamaz.',
    ],
    correctIndex: 1,
    explanation: 'İç içe (nested) ternary if ifadeleri okunabilirliği düşürebilir. Karmaşık dallanmalarda `if - else if - else` veya C# 8.0+ `switch expression` daha anlaşılır bir seçenek olabilir.',
  },
];
