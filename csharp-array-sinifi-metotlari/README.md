# C# Array Sınıfı ve Metotları

Enes Öztürk tarafından hazırlanan, C# `System.Array` metotlarını örnekler, etkileşimli dizi laboratuvarı ve konu testleriyle anlatan Türkçe eğitim uygulaması.

## İçerik

- `Array.Sort`, `Array.Clear`, `Array.Reverse` ve `Array.IndexOf`
- `Array.Resize<T>`, `Array.BinarySearch` ve `Array.Fill<T>`
- Sayısal ve metinsel dizilerle laboratuvar örnekleri
- Örnek C# kodu ve tarayıcı simülasyonu
- Stack/heap kavramlarına dair sadeleştirilmiş bellek anlatımı
- Bilgi testi

## Teknolojiler

- React 19 ve TypeScript
- Vite ve Tailwind CSS
- Motion ve Lucide React

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Kurulum ve çalıştırma

Bu klasörde:

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde açılır.

## Denetim ve üretim derlemesi

```bash
npm run lint
npm run build
npm run preview
```

`npm run lint`, TypeScript denetimini; `npm run build`, üretim derlemesini çalıştırır. `npm run preview`, derleme çıktısını yerel olarak sunar.

## Kapsam ve doğruluk

Laboratuvar ve konsol panelleri örnek C# işlemlerinin beklenen etkilerini tarayıcıda simüle eder; C# derleyicisi veya .NET çalışma zamanı çalıştırmaz. Kod panelinde gösterilen C# kodu örnektir. Dizi hücreleri gerçek bellek adreslerini veya toplam bayt maliyetini göstermez; Stack/heap görünümü sadeleştirilmiş kavramsal bir çizimdir.

`Array.Resize<T>` farklı uzunluk istendiğinde yeni bir dizi örneği oluşturup sığan elemanları kopyalar; `ref` parametresi çağıranın dizi değişkenini yeni örneğe atar. Eski dizi başka bir yerde kullanılmıyorsa erişilemez hale gelebilir; Garbage Collector belleği hemen geri alacağı garanti edilmez. `Array.BinarySearch` için dizi aynı karşılaştırıcıya göre önceden sıralanmış olmalıdır.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
