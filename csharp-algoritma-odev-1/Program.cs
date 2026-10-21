using System;
using System.Linq;

namespace Odev1_AlgoritmaSorulari
{
    /// <summary>
    /// Patika.dev / C# 101 - Ödev 1: Algoritma Soruları
    /// Geliştirici / Hazırlayan: Enes Öztürk
    /// Kaynak kodu: Enes Öztürk
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "C# 101 Ödev 1 - Enes Öztürk";
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("========================================================");
            Console.WriteLine("       C# 101 - ÖDEV 1: ALGORİTMA PRATİKLERİ            ");
            Console.WriteLine("       Hazırlayan / Geliştirici: Enes Öztürk            ");
            Console.WriteLine("========================================================");
            Console.ResetColor();

            bool devam = true;
            while (devam)
            {
                Console.WriteLine("\nLütfen çalıştırmak istediğiniz soruyu seçiniz:");
                Console.WriteLine("1 - Soru 1: n adet sayıdan çift olanları yazdırma");
                Console.WriteLine("2 - Soru 2: n adet sayıdan m'e eşit veya tam bölünenleri yazdırma");
                Console.WriteLine("3 - Soru 3: n adet kelimeyi sondan başa yazdırma");
                Console.WriteLine("4 - Soru 4: Cümledeki toplam kelime ve harf sayısını bulma");
                Console.WriteLine("5 - Tüm Soruları Sırayla Çalıştır");
                Console.WriteLine("0 - Çıkış");
                Console.Write("Seçiminiz: ");

                string secim = Console.ReadLine();
                Console.WriteLine();

                switch (secim)
                {
                    case "1":
                        Soru1();
                        break;
                    case "2":
                        Soru2();
                        break;
                    case "3":
                        Soru3();
                        break;
                    case "4":
                        Soru4();
                        break;
                    case "5":
                        Soru1();
                        Soru2();
                        Soru3();
                        Soru4();
                        break;
                    case "0":
                        devam = false;
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("Program sonlandırıldı. İyi çalışmalar dilerim! - Enes Öztürk");
                        Console.ResetColor();
                        break;
                    default:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("Geçersiz seçim! Lütfen 0-5 arasında bir değer giriniz.");
                        Console.ResetColor();
                        break;
                }
            }
        }

        #region Soru 1
        /// <summary>
        /// Soru 1:
        /// Bir konsol uygulamasında kullanıcıdan pozitif bir sayı girmesini isteyin (n).
        /// Sonrasında kullanıcıdan n adet pozitif sayı girmesini isteyin.
        /// Kullanıcının girmiş olduğu sayılardan çift olanlar console'a yazdırın.
        /// </summary>
        static void Soru1()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("--- [SORU 1] Çift Sayıları Bulma (Enes Öztürk) ---");
            Console.ResetColor();

            int n = PozitifSayiAl("Lütfen pozitif bir sayı giriniz (n): ");
            int[] sayilar = new int[n];

            for (int i = 0; i < n; i++)
            {
                sayilar[i] = PozitifSayiAl($"{i + 1}. pozitif sayıyı giriniz: ");
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n[Sonuç] Girilen sayılardan çift olanlar:");
            bool ciftBulundu = false;
            foreach (int sayi in sayilar)
            {
                if (sayi % 2 == 0)
                {
                    Console.Write(sayi + " ");
                    ciftBulundu = true;
                }
            }

            if (!ciftBulundu)
            {
                Console.WriteLine("(Girilen sayılar arasında çift sayı bulunamadı.)");
            }
            else
            {
                Console.WriteLine();
            }
            Console.ResetColor();
            Console.WriteLine("--------------------------------------------------\n");
        }
        #endregion

        #region Soru 2
        /// <summary>
        /// Soru 2:
        /// Bir konsol uygulamasında kullanıcıdan pozitif iki sayı girmesini isteyin (n, m).
        /// Sonrasında kullanıcıdan n adet pozitif sayı girmesini isteyin.
        /// Kullanıcının girmiş olduğu sayılardan m'e eşit yada tam bölünenleri console'a yazdırın.
        /// </summary>
        static void Soru2()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("--- [SORU 2] m'e Eşit veya Tam Bölünen Sayılar (Enes Öztürk) ---");
            Console.ResetColor();

            int n = PozitifSayiAl("Lütfen 1. pozitif sayıyı giriniz (n - eleman adedi): ");
            int m = PozitifSayiAl("Lütfen 2. pozitif sayıyı giriniz (m - bölen/hedef sayı): ");

            int[] sayilar = new int[n];
            for (int i = 0; i < n; i++)
            {
                sayilar[i] = PozitifSayiAl($"{i + 1}. pozitif sayıyı giriniz: ");
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\n[Sonuç] {m} sayısına eşit ya da tam bölünen sayılar:");
            bool eslesenBulundu = false;
            foreach (int sayi in sayilar)
            {
                // Sayı m'e eşit veya m'e tam bölünen (sayi % m == 0)
                if (sayi == m || sayi % m == 0)
                {
                    Console.Write(sayi + " ");
                    eslesenBulundu = true;
                }
            }

            if (!eslesenBulundu)
            {
                Console.WriteLine($"({m} sayısına eşit veya tam bölünen sayı bulunamadı.)");
            }
            else
            {
                Console.WriteLine();
            }
            Console.ResetColor();
            Console.WriteLine("--------------------------------------------------\n");
        }
        #endregion

        #region Soru 3
        /// <summary>
        /// Soru 3:
        /// Bir konsol uygulamasında kullanıcıdan pozitif bir sayı girmesini isteyin (n).
        /// Sonrasında kullanıcıdan n adet kelime girmesi isteyin.
        /// Kullanıcının girişini yaptığı kelimeleri sondan başa doğru console'a yazdırın.
        /// </summary>
        static void Soru3()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("--- [SORU 3] Kelimeleri Sondan Başa Yazdırma (Enes Öztürk) ---");
            Console.ResetColor();

            int n = PozitifSayiAl("Lütfen pozitif bir sayı giriniz (n - kelime adedi): ");
            string[] kelimeler = new string[n];

            for (int i = 0; i < n; i++)
            {
                while (true)
                {
                    Console.Write($"{i + 1}. kelimeyi giriniz: ");
                    string giris = Console.ReadLine();
                    if (!string.IsNullOrWhiteSpace(giris))
                    {
                        kelimeler[i] = giris.Trim();
                        break;
                    }
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Kelime boş bırakılamaz! Lütfen tekrar deneyiniz.");
                    Console.ResetColor();
                }
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n[Sonuç] Kelimelerin sondan başa doğru sıralanışı:");
            for (int i = n - 1; i >= 0; i--)
            {
                Console.WriteLine($"{kelimeler[i]}");
            }
            Console.ResetColor();
            Console.WriteLine("--------------------------------------------------\n");
        }
        #endregion

        #region Soru 4
        /// <summary>
        /// Soru 4:
        /// Bir konsol uygulamasında kullanıcıdan bir cümle yazması isteyin.
        /// Cümledeki toplam kelime ve harf sayısını console'a yazdırın.
        /// </summary>
        static void Soru4()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("--- [SORU 4] Toplam Kelime ve Harf Sayısı (Enes Öztürk) ---");
            Console.ResetColor();

            string cumle = "";
            while (true)
            {
                Console.Write("Lütfen bir cümle yazınız: ");
                cumle = Console.ReadLine();
                if (!string.IsNullOrWhiteSpace(cumle))
                {
                    break;
                }
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Cümle boş olamaz! Lütfen bir cümle giriniz.");
                Console.ResetColor();
            }

            // Kelime sayısını bulma (birden fazla ardışık boşluğu temizleyerek)
            string[] kelimeler = cumle.Split((char[])null, StringSplitOptions.RemoveEmptyEntries);
            int toplamKelime = kelimeler.Length;

            // Harf sayısını bulma (boşlukları hariç tutma)
            // Sadece alfabetik karakterler veya boşluk dışındaki karakterler
            int toplamHarf = 0;
            foreach (char c in cumle)
            {
                if (char.IsLetter(c))
                {
                    toplamHarf++;
                }
            }

            // Alternatif yaklaşım: Boşluk karakterleri dışındaki UTF-16 karakter sayısı
            string bosluksuz = new string(cumle.Where(c => !char.IsWhiteSpace(c)).ToArray());

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n[Sonuç Analizi]");
            Console.WriteLine($"Toplam Kelime Sayısı : {toplamKelime}");
            Console.WriteLine($"Toplam Harf Sayısı   : {toplamHarf} (Sadece harfler)");
            Console.WriteLine($"Boşluksuz Karakter   : {bosluksuz.Length}");
            Console.WriteLine($"Hazırlayan           : Enes Öztürk");
            Console.ResetColor();
            Console.WriteLine("--------------------------------------------------\n");
        }
        #endregion

        #region Yardımcı Metotlar
        /// <summary>
        /// Kullanıcıdan güvenli şekilde pozitif tam sayı alan yardımcı metot.
        /// </summary>
        static int PozitifSayiAl(string prompt)
        {
            int sayi;
            while (true)
            {
                Console.Write(prompt);
                string input = Console.ReadLine();

                if (int.TryParse(input, out sayi) && sayi > 0)
                {
                    return sayi;
                }

                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz.");
                Console.ResetColor();
            }
        }
        #endregion
    }
}
