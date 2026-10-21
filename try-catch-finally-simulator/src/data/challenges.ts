import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Kullanıcı Yaşı Girişi ve Dönüşüm Açığı',
    difficulty: 'Kolay',
    code: `public void YasKaydet()
{
    Console.Write("Lütfen yaşınızı girin: ");
    int yas = int.Parse(Console.ReadLine());
    
    if (yas >= 18) {
        Console.WriteLine("Kayıt onaylandı.");
    }
}`,
    bugType: 'runtime',
    description: 'Bir form ekranında kullanıcıdan yaş bilgisi alınıp reşit olup olmadığı kontrol ediliyor.',
    question: 'Bu kod bloğunun en kritik açığı nedir ve kullanıcı hangi girdiyi verirse uygulama patlar?',
    options: [
      {
        id: 'opt-1',
        text: 'Kullanıcı "on sekiz" veya boşluk girerse int.Parse FormatException fırlatıp uygulamayı çökertir.',
        isCorrect: true,
        feedback: 'Tebrikler! Kullanıcı klavyeden harf, boşluk veya özel karakter girdiğinde int.Parse doğrudan FormatException fırlatır ve program try-catch olmadığı için çöker.'
      },
      {
        id: 'opt-2',
        text: 'if koşulunda >= yerine > kullanılmadığı için mantıksal hata vardır.',
        isCorrect: false,
        feedback: '18 yaş reşit kabul edildiği için >= doğru bir kontroldür. Asıl tehlike kullanıcının sayı yerine metin girmesidir.'
      },
      {
        id: 'opt-3',
        text: 'Console.Write yerine Console.WriteLine kullanılmadığı için derleme hatası verir.',
        isCorrect: false,
        feedback: 'Console.Write geçerli bir C# metodudur, aynı satırda imleci tutar. Derleme hatası oluşturmaz.'
      }
    ],
    fixedCode: `public void YasKaydet()
{
    Console.Write("Lütfen yaşınızı girin: ");
    string girdi = Console.ReadLine();
    
    if (int.TryParse(girdi, out int yas) && yas >= 0)
    {
        if (yas >= 18)
            Console.WriteLine("Kayıt onaylandı.");
        else
            Console.WriteLine("18 yaşından küçükler kayıt olamaz.");
    }
    else
    {
        Console.WriteLine("Geçersiz yaş girişi yapıldı!");
    }
}`,
    proTip: 'Enes Öztürk Tavsiyesi: Kullanıcıdan gelen hiçbir veriye güvenmeyin (Zero Trust). Parse yerine her zaman TryParse ve aralık kontrolleri (örn: yaş negatif olamaz) ekleyin.'
  },
  {
    id: 'ch-2',
    title: 'Banka Para Transferi Mantıksal Açığı',
    difficulty: 'Orta',
    code: `public void ParaTransferi(Hesap gonderen, Hesap alici, decimal miktar)
{
    try
    {
        gonderen.Bakiye -= miktar;
        alici.Bakiye += miktar;
        Console.WriteLine("Transfer tamamlandı.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Bir hata oluştu: " + ex.Message);
    }
}`,
    bugType: 'logic',
    description: 'İki banka hesabı arasında para transferi yapılıyor. Try-catch bloğu mevcut.',
    question: 'Bu kod bloğunda try-catch olmasına rağmen hangi MANTIKSAL HATA ve güvenlik açığı gizlidir?',
    options: [
      {
        id: 'opt-1',
        text: 'Gönderenin bakiyesinin transfer miktarına yetip yetmediği (Bakiye >= miktar) kontrol edilmemiştir!',
        isCorrect: true,
        feedback: 'Harika tespit! Eğer gönderenin 100 TL\'si varken 5000 TL transfer ederse bakiye -4900 TL olur. Try-catch hiçbir istisna fırlatmaz çünkü negatif bakiye matematiksel olarak geçerlidir ama banka için felakettir!'
      },
      {
        id: 'opt-2',
        text: 'decimal veri tipi para birimlerinde kullanılamaz.',
        isCorrect: false,
        feedback: 'Aksine, decimal para birimleri ve finansal işlemler için en yüksek hassasiyete sahip doğru türdür.'
      },
      {
        id: 'opt-3',
        text: 'Catch bloğunda loglama yapılmadığı için kod derlenmez.',
        isCorrect: false,
        feedback: 'Catch bloğunun içeriği derleme hatası oluşturmaz.'
      }
    ],
    fixedCode: `public void ParaTransferi(Hesap gonderen, Hesap alici, decimal miktar)
{
    if (miktar <= 0)
        throw new ArgumentException("Transfer miktarı pozitif olmalıdır.");
        
    if (gonderen.Bakiye < miktar)
        throw new InvalidOperationException("Yetersiz bakiye!");

    try
    {
        gonderen.Bakiye -= miktar;
        alici.Bakiye += miktar;
        Console.WriteLine("Transfer başarıyla tamamlandı.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("İşlem sırasında beklenmedik hata: " + ex.Message);
        throw; // Hatanın üst katmana bildirilmesi
    }
}`,
    proTip: 'Enes Öztürk Tavsiyesi: "Try-catch mantıksal hataları yakalamaz." Kod üzerinde düşünerek iş kuralı (business logic) kontrollerini try bloğundan önce yapmalısınız.'
  },
  {
    id: 'ch-3',
    title: 'Dosya Okuma ve Kaynak Sızıntısı (Finally Eksikliği)',
    difficulty: 'Orta',
    code: `public void GunlukDosyasiOku(string dosyaYolu)
{
    StreamReader okuyucu = new StreamReader(dosyaYolu);
    string icerik = okuyucu.ReadToEnd();
    // İşlemler yapılıyor ve hata fırlatılabilir...
    int karakterSayisi = int.Parse(icerik.Substring(0, 5));
    okuyucu.Close();
}`,
    bugType: 'resource-leak',
    description: 'Bir dosya açılıp okunuyor, ancak ortada bir istisna fırlatılırsa okuyucu.Close() satırına asla ulaşılamıyor.',
    question: 'Bu kod parçasındaki en büyük tehlike nedir?',
    options: [
      {
        id: 'opt-1',
        text: 'Substring veya Parse sırasında hata olursa dosya açık kalır (File Lock & Memory Leak) ve dosya kilitlenir.',
        isCorrect: true,
        feedback: 'Doğru! Eğer 4. satırda bir hata olursa 5. satırdaki okuyucu.Close() çalıştırılamaz. Dosya işletim sisteminde kilitli kalır ve bellek sızar. Çözüm finally bloğu veya using deyimidir!'
      },
      {
        id: 'opt-2',
        text: 'StreamReader sınıfı Türkçe karakterleri okuyamaz.',
        isCorrect: false,
        feedback: 'StreamReader varsayılan olarak UTF-8 destekler, Türkçe karakterleri rahatça okur.'
      },
      {
        id: 'opt-3',
        text: 'ReadToEnd metodu sadece tek bir satır okur.',
        isCorrect: false,
        feedback: 'ReadToEnd dosyanın tamamını sonuna kadar okur.'
      }
    ],
    fixedCode: `public void GunlukDosyasiOku(string dosyaYolu)
{
    // Modern C# using bildirimi (Otomatik Dispose/Finally mekanizması)
    using (StreamReader okuyucu = new StreamReader(dosyaYolu))
    {
        string icerik = okuyucu.ReadToEnd();
        if (int.TryParse(icerik.Substring(0, Math.Min(5, icerik.Length)), out int karakterSayisi))
        {
            Console.WriteLine("Karakter: " + karakterSayisi);
        }
    } // Normal kapsam çıkışında kaynak kapatılır.
}`,
    proTip: 'Enes Öztürk Tavsiyesi: Veritabanı bağlantıları, ağ soketleri ve dosya tanıtıcıları (handles) gibi kaynakları mutlaka finally bloğunda veya "using" deyimi içinde kapatın.'
  },
  {
    id: 'ch-4',
    title: 'Dizi İndeks Taşması (Off-By-One Mantıksal / Çalışma Zamanı Hatası)',
    difficulty: 'Kolay',
    code: `public void ElemanlariYazdir(int[] sayilar)
{
    try
    {
        for (int i = 0; i <= sayilar.Length; i++)
        {
            Console.WriteLine(sayilar[i]);
        }
    }
    catch (IndexOutOfRangeException)
    {
        Console.WriteLine("Dizi bitti.");
    }
}`,
    bugType: 'runtime',
    description: 'Bir geliştirici döngü kontrolünü i <= sayilar.Length yazarak dizinin son elemanından sonra hata fırlatılmasını bekliyor.',
    question: 'Bu kod parçasındaki kötü geliştirici alışkanlığı (Anti-Pattern) nedir?',
    options: [
      {
        id: 'opt-1',
        text: 'İstisnaları (Exception) normal akış kontrolü (flow control) olarak kullanmak çok maliyetli ve hatalı bir yaklaşımdır.',
        isCorrect: true,
        feedback: 'Mükemmel! C# ve diğer dillerde IndexOutOfRangeException bir akış kontrol aracı değildir. Döngü koşulu i < sayilar.Length olmalıdır. Exception fırlatıp yakalamak binlerce kat daha yavaştır.'
      },
      {
        id: 'opt-2',
        text: 'Console.WriteLine döngü içerisinde çağrılamaz.',
        isCorrect: false,
        feedback: 'Döngü içinde Console.WriteLine serbestçe çağrılabilir.'
      },
      {
        id: 'opt-3',
        text: 'Dizi indeksleri 1\'den başladığı için ilk eleman atlanır.',
        isCorrect: false,
        feedback: 'C#\'ta diziler 0 tabanlıdır (zero-indexed). i = 0 ilk elemandır.'
      }
    ],
    fixedCode: `public void ElemanlariYazdir(int[] sayilar)
{
    // Doğru ve temiz yaklaşım: İstisna fırlatmadan sınırları korumak
    for (int i = 0; i < sayilar.Length; i++)
    {
        Console.WriteLine(sayilar[i]);
    }
    
    // Veya daha da güvenli:
    // foreach (var sayi in sayilar) Console.WriteLine(sayi);
}`,
    proTip: 'Enes Öztürk Tavsiyesi: İstisnalar (Exceptions) istisnai durumlar içindir. Beklenen veya döngü bitişi gibi normal durumları yönetmek için try-catch kullanmayın.'
  }
];
