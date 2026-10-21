# C# For Döngüsü, Break ve Continue Rehberi

Enes Öztürk tarafından hazırlanan, `for` döngüsünün akışını ve `break` / `continue` ifadelerini örneklerle anlatan etkileşimli Türkçe eğitim uygulaması.

## İçerik

- `for` döngüsünün başlatma, koşul ve güncelleme adımları
- `break` ve `continue` davranışlarını adım adım gösteren tarayıcı simülatörü
- Döngü akış şeması, konu notları ve kısa test
- Hazır senaryolar ve özelleştirilebilir örnek değerler

## Teknolojiler

- React 19 ve TypeScript
- Vite ve Tailwind CSS
- Lucide React

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Kurulum ve çalıştırma

Bu klasörde komutları çalıştırın:

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

Simülatör, seçilen örneklerin adımlarını ve beklenen konsol çıktılarını tarayıcıda gösterir; C# kodunu derlemez veya çalıştırmaz, `dotnet run` ya da CLR kullanmaz. Özelleştirilebilir senaryoların gösterimi, arayüzü korumak için en fazla 25 döngü iterasyonuyla sınırlıdır. Sınıra ulaşılırsa uygulama bunu normal döngü tamamlanmasından ayrı belirtir.

`for(;;)` ifadesinde üç bölüm de boş bırakılmıştır; koşul bölümü boş olduğundan kontrol açısından true kabul edilir. Böyle bir döngü, `break` gibi bir çıkış yolu yoksa devam eder. `continue`, mevcut iterasyonun kalan gövde komutlarını atlar; `for` döngüsünde sonraki koşul kontrolünden önce güncelleme bölümü çalışır.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
