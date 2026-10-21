import CSHARP_FULL_CODE from "../../Program.cs?raw";
export { CSHARP_FULL_CODE };

export const PROJECT_ATTRIBUTION = {
  name: 'Enes Öztürk',
  assignment: 'C# 101 - Ödev 1: Algoritma Soruları',
};

export const QUESTION_DETAILS = [
  {
    id: 'q1',
    number: 1,
    title: 'Çift Sayıları Bulma',
    task: 'Kullanıcıdan pozitif bir sayı girmesini isteyin (n). Sonrasında kullanıcıdan n adet pozitif sayı girmesini isteyin. Kullanıcının girmiş olduğu sayılardan çift olanları console\'a yazdırın.',
    algorithm: 'n elemanlı dizi oluşturulur. Her eleman n > 0 ve number % 2 == 0 koşuluna göre filtrelenir.',
    complexity: 'Zaman Karmaşıklığı: O(n) · Alan Karmaşıklığı: O(n)',
    codeSnippet: `static void Soru1()
{
    int n = PozitifSayiAl("Lütfen pozitif bir sayı giriniz (n): ");
    int[] sayilar = new int[n];

    for (int i = 0; i < n; i++)
    {
        sayilar[i] = PozitifSayiAl($"\${i + 1}. pozitif sayıyı giriniz: ");
    }

    Console.WriteLine("\\nGirilen sayılardan çift olanlar:");
    foreach (int sayi in sayilar)
    {
        if (sayi % 2 == 0)
            Console.Write(sayi + " ");
    }
    Console.WriteLine();
}`,
  },
  {
    id: 'q2',
    number: 2,
    title: "m'e Eşit veya Tam Bölünenler",
    task: "Kullanıcıdan pozitif iki sayı girmesini isteyin (n, m). Sonrasında kullanıcıdan n adet pozitif sayı girmesini isteyin. Kullanıcının girmiş olduğu sayılardan m'e eşit ya da tam bölünenleri console'a yazdırın.",
    algorithm: 'n adet sayı alınır; her sayı için (sayi == m || sayi % m == 0) mantıksal kontrolü uygulanır.',
    complexity: 'Zaman Karmaşıklığı: O(n) · Alan Karmaşıklığı: O(n)',
    codeSnippet: `static void Soru2()
{
    int n = PozitifSayiAl("Lütfen 1. pozitif sayıyı giriniz (n): ");
    int m = PozitifSayiAl("Lütfen 2. pozitif sayıyı giriniz (m): ");

    int[] sayilar = new int[n];
    for (int i = 0; i < n; i++)
    {
        sayilar[i] = PozitifSayiAl($"\${i + 1}. pozitif sayıyı giriniz: ");
    }

    Console.WriteLine($"\\n\${m} sayısına eşit ya da tam bölünen sayılar:");
    foreach (int sayi in sayilar)
    {
        if (sayi == m || sayi % m == 0)
            Console.Write(sayi + " ");
    }
    Console.WriteLine();
}`,
  },
  {
    id: 'q3',
    number: 3,
    title: 'Kelimeleri Sondan Başa Yazdırma',
    task: "Kullanıcıdan pozitif bir sayı girmesini isteyin (n). Sonrasında kullanıcıdan n adet kelime girmesini isteyin. Kullanıcının girişini yaptığı kelimeleri sondan başa doğru console'a yazdırın.",
    algorithm: 'n boyutunda string dizisi tanımlanır. Dizi tersten taranarak (for int i = n - 1; i >= 0; i--) ekrana basılır.',
    complexity: 'Zaman Karmaşıklığı: O(n) · Alan Karmaşıklığı: O(n)',
    codeSnippet: `static void Soru3()
{
    int n = PozitifSayiAl("Lütfen pozitif bir sayı giriniz (n): ");
    string[] kelimeler = new string[n];

    for (int i = 0; i < n; i++)
    {
        Console.Write($"\${i + 1}. kelimeyi giriniz: ");
        kelimeler[i] = Console.ReadLine();
    }

    Console.WriteLine("\\nKelimelerin sondan başa doğru sıralanışı:");
    for (int i = n - 1; i >= 0; i--)
    {
        Console.WriteLine(kelimeler[i]);
    }
}`,
  },
  {
    id: 'q4',
    number: 4,
    title: 'Cümledeki Kelime ve Harf Sayısı',
    task: "Kullanıcıdan bir cümle yazmasını isteyin. Cümledeki toplam kelime ve harf sayısını console'a yazdırın.",
    algorithm: 'Cümle boşluk karakterlerine göre parçalanarak kelime sayısı alınır. Harf sayısı char.IsLetter kontrolüyle hesaplanır.',
    complexity: 'Zaman Karmaşıklığı: O(L) [L: Karakter uzunluğu] · Alan: O(L) [Kelimeleri saklama dahil]',
    codeSnippet: `static void Soru4()
{
    Console.Write("Lütfen bir cümle yazınız: ");
    string cumle = Console.ReadLine();

    // Toplam kelime sayısı
    string[] kelimeler = cumle.Split((char[])null, StringSplitOptions.RemoveEmptyEntries);
    int kelimeSayisi = kelimeler.Length;

    // Toplam harf sayısı (sadece alfabetik harfler)
    int harfSayisi = 0;
    foreach (char c in cumle)
    {
        if (char.IsLetter(c))
            harfSayisi++;
    }

    Console.WriteLine($"Toplam Kelime Sayısı: \${kelimeSayisi}");
    Console.WriteLine($"Toplam Harf Sayısı  : \${harfSayisi}");
    Console.WriteLine("Hazırlayan: Enes Öztürk");
}`,
  },
];
