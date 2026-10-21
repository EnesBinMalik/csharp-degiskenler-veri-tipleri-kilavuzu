# C# Extension ve Rekürsif Metotlar Rehberi

Enes Öztürk tarafından hazırlanan, geleneksel C# extension metot sözdizimini ve rekürsif algoritmaları etkileşimli örneklerle anlatan Türkçe eğitim uygulaması.

## İçerik

- Geleneksel extension metotların bildirim kuralları ve örnekleri
- Extension metot kuralları için sınırlı tarayıcı tabanlı metin denetimi
- Önceden tanımlı örnekler için tarayıcı simülasyonları
- Fibonacci, faktöriyel, üs alma ve metin ters çevirme çağrı akışı görselleştirmeleri
- Rekürsif ve iteratif yaklaşımlar için kavramsal karşılaştırma
- Bilgi sınavı ve kod şablonları

## Teknolojiler

- React 19 ve TypeScript
- Vite
- Tailwind CSS
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

## Teknik doğruluk ve kapsam

Uygulamadaki extension metot denetleyicisi tam bir C# ayrıştırıcısı değildir; yalnızca bazı metinsel kuralları kontrol eder ve kodun derlendiğini garanti etmez. Laboratuvardaki Çalıştır düğmesi, seçili örneğin tarayıcıda tanımlı TypeScript simülasyonunu çalıştırır; metin alanındaki C# kodunu derlemez veya yürütmez.

Çağrı yığını görselleştirmeleri ve derin rekürsiyon gösterimi kavramsaldır. Bunlar CLR'yi çalıştırmaz, gerçek bellek kullanımını ölçmez veya gerçek bir `StackOverflowException` oluşturmaz. Gerçek çağrı yığını sınırı ortama ve çağrıların özelliklerine bağlıdır; sabit yığın kapasitesi ya da çağrı başına sabit bayt maliyeti varsayılamaz. .NET'in kuyruk çağrı optimizasyonu da her durumda garanti edilmez.

Örnekler, geleneksel C# extension metot biçimini (`this` ilk parametrede) kullanır. Bu sözdiziminde metot static, sınıf ise iç içe olmayan ve generic olmayan bir static sınıf olmalıdır. Extension çağrısı, nesnenin ilk argüman olarak verildiği static metot çağrısı olarak çözümlenir; genişletilen tipe gerçek bir üye eklenmez.

## Atıf ve lisans

© 2026 Enes Öztürk. Kaynak arşivinde bu proje için bir lisans belirtilmemiştir.
