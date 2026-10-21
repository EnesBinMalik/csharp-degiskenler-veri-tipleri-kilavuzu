# Try-Catch-Finally Simülatörü

Enes Öztürk tarafından hazırlanan, C# istisna yönetimi ve mantıksal hataları örneklerle anlatan etkileşimli Türkçe eğitim uygulaması.

## İçerik

- Try/catch/finally akışını adım adım gösteren örnek senaryolar
- Mantıksal hata örnekleri ve hata bulma meydan okumaları
- İstisna yakalama ve kaynak temizleme için pratikler

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

Bu uygulama örnek C# akışlarını tarayıcıda önceden tanımlı simülasyonlarla gösterir; C# kodu derlemez veya çalıştırmaz. Senaryolardaki akış, .NET çalışma zamanının tüm istisna ve süreç sonlandırma davranışlarını modellemez. `finally` bloğu normal exception akışında temizleme için kullanılır; süreç sonlandırması, çevre koşulları veya `finally` içindeki yeni bir istisna gibi durumlarda çalışmasının mutlak garantisi yoktur.

Hata örnekleri eğitim amaçlıdır. Gerçek uygulamalarda kaynak yönetimi için uygun olduğunda `using`/`IDisposable` desenlerini tercih edin, yalnızca beklenen istisnaları yakalayın ve girdileri iş kurallarına göre doğrulayın. Performansla ilgili sonuçlar uygulamaya ve çalışma zamanına bağlıdır; bu simülatör kıyaslama yapmaz.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
