# C# ArrayList Rehberi

Enes Öztürk'e atfedilen ArrayList eğitim içeriğini; kapasite, tür güvenliği, boxing/unboxing ve `List<T>` karşılaştırmasıyla etkileşimli olarak inceleyin.

## İçerik

- `ArrayList` ve sabit boyutlu dizilerin karşılaştırması
- Öğeler ekleyip çıkararak kapasite değişimini gösteren görselleştirici
- `object` üzerinden okuma ve hatalı cast senaryoları
- Boxing/unboxing kavramları ve `List<T>` ile karşılaştırma
- C# örnek kodları ve kısa bilgi testi

Simülatör, C# kodunu derleyip çalıştırmaz; konsol çıktıları eğitim amacıyla önceden hazırlanmıştır. Kapasite büyüme örneği yaygın .NET uygulama davranışını modeller. Kesin büyüme stratejisi uygulama ayrıntısıdır; boş bir `ArrayList` ilk oluşturulduğunda kapasitesi `0` olur ve ilk öğe eklendiğinde kapasite genellikle `4`'e çıkar.

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Çalıştırma

Bu klasörde:

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu `http://localhost:3000` adresinde açılır.

## Denetim ve derleme

```bash
npm run lint
npm run build
npm run preview
```

Kaynak arşivinde bu proje için eşlik eden lisans dosyası bulunmadığından bu entegrasyonda lisans koşulu tanımlanmamıştır.
