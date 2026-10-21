import { Scenario, ExecutionStep } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'user-prompt-parse',
    title: '1. Temel int.Parse Toplama (Örnek Kod)',
    shortDescription: 'Konsoldan alınan iki değerin tam sayıya çevrilip toplanması ve FormatException yönetimi.',
    category: 'user-prompt',
    inputs: [
      { id: 'inputA', label: '1. Sayı (Console.ReadLine)', defaultValue: '25', placeholder: 'Sayı veya metin yazın...' },
      { id: 'inputB', label: '2. Sayı (Console.ReadLine)', defaultValue: '15', placeholder: 'Sayı veya metin yazın...' }
    ],
    presets: [
      {
        label: 'Doğru Girdi (25 + 15)',
        values: { inputA: '25', inputB: '15' },
        expectedOutcome: 'success',
        tag: 'Sorunsuz Akış'
      },
      {
        label: 'Hatalı Girdi A ("abc" + 15)',
        values: { inputA: 'abc', inputB: '15' },
        expectedOutcome: 'exception',
        tag: 'FormatException'
      },
      {
        label: 'Hatalı Girdi B (25 + "xyz")',
        values: { inputA: '25', inputB: 'xyz' },
        expectedOutcome: 'exception',
        tag: 'FormatException (2. adımda)'
      },
      {
        label: 'Boş Girdi ("" + 10)',
        values: { inputA: '', inputB: '10' },
        expectedOutcome: 'exception',
        tag: 'ArgumentNullException'
      },
      {
        label: 'Sayı Taşması ("9999999999")',
        values: { inputA: '9999999999', inputB: '5' },
        expectedOutcome: 'exception',
        tag: 'OverflowException'
      }
    ],
    lines: [
      { lineNumber: 1, code: 'try', block: 'try', explanation: 'Hata oluşabilecek kod bloğunun başlangıcı.' },
      { lineNumber: 2, code: '{', block: 'try', explanation: 'Try bloğu açılış parantezi.' },
      { lineNumber: 3, code: '    int a = int.Parse(Console.ReadLine());', block: 'try', explanation: 'Kullanıcının girdiği ilk metni tam sayıya dönüştürür. Metin sayı değilse FormatException fırlatılır!' },
      { lineNumber: 4, code: '', block: 'try', explanation: '' },
      { lineNumber: 5, code: '    int b = int.Parse(Console.ReadLine());', block: 'try', explanation: 'Kullanıcının girdiği ikinci metni tam sayıya dönüştürür. Hata olursa sonraki satırlar atlanır.' },
      { lineNumber: 6, code: '', block: 'try', explanation: '' },
      { lineNumber: 7, code: '    int c = a + b;', block: 'try', explanation: 'İki sayıyı toplar ve c değişkenine atar.' },
      { lineNumber: 8, code: '', block: 'try', explanation: '' },
      { lineNumber: 9, code: '    Console.WriteLine(c);', block: 'try', explanation: 'Toplam sonucunu konsola yazdırır.' },
      { lineNumber: 10, code: '}', block: 'try', explanation: 'Try bloğunun kapanış parantezi.' },
      { lineNumber: 11, code: 'catch(Exception ex)', block: 'catch', explanation: 'Try bloğunda herhangi bir hata meydana gelirse akış hemen buraya sıçrar.' },
      { lineNumber: 12, code: '{', block: 'catch', explanation: 'Catch bloğu açılışı.' },
      { lineNumber: 13, code: '    Console.WriteLine("Bir Hata Oluştu: " + ex.Message);', block: 'catch', explanation: 'Yakalanan hatanın mesajını ekrana basar.' },
      { lineNumber: 14, code: '}', block: 'catch', explanation: 'Catch bloğu kapanışı.' },
      { lineNumber: 15, code: 'finally', block: 'finally', explanation: 'Normal exception akışında, kaynak temizliği gibi kodların yer aldığı blok.' },
      { lineNumber: 16, code: '{', block: 'finally', explanation: 'Finally bloğu açılışı.' },
      { lineNumber: 17, code: '    Console.WriteLine("İşlem tamamlandı.");', block: 'finally', explanation: 'Her durumda çalışarak işlemin bittiğini bildirir.' },
      { lineNumber: 18, code: '}', block: 'finally', explanation: 'Finally bloğu kapanışı.' }
    ],
    generateSteps: (inputs: Record<string, string>) => {
      const steps: ExecutionStep[] = [];
      const rawA = inputs.inputA ?? '';
      const rawB = inputs.inputB ?? '';

      // Step 1: try
      steps.push({
        stepIndex: 1,
        lineNumber: 1,
        block: 'try',
        description: 'Çalışma `try` bloğuna girdi. Hata takip mekanizması devrede.',
        variables: { a: 'tanımsız', b: 'tanımsız', c: 'tanımsız', ex: 'null' },
        consoleOutput: { type: 'system', text: '[Sistem]: Try bloğu başlatıldı...' }
      });

      // Parse A logic
      const isAEmpty = rawA.trim() === '';
      const numA = Number(rawA);
      const isANaN = isNaN(numA) || isAEmpty;
      const isAOverflow = !isANaN && (numA > 2147483647 || numA < -2147483648);

      if (isANaN || isAOverflow) {
        const exName = isAEmpty ? 'ArgumentNullException' : isAOverflow ? 'OverflowException' : 'FormatException';
        const exMsg = isAEmpty
          ? 'Değer null veya boş olamaz. (Parameter "s")'
          : isAOverflow
          ? 'Değer, Int32 türünün minimum veya maksimum sınırını aştı.'
          : `Girdi dizesi doğru biçimde değildi: "${rawA}"`;

        steps.push({
          stepIndex: 2,
          lineNumber: 3,
          block: 'try',
          description: `Satır 3: Console.ReadLine() '${rawA}' değerini getirdi. int.Parse('${rawA}') başarısız oldu!`,
          variables: { a: 'HATA!', b: 'tanımsız', c: 'tanımsız', ex: 'null' },
          consoleOutput: { type: 'input', text: `> ${rawA}` },
          isErrorTrigger: true,
          exceptionThrown: { name: exName, message: exMsg }
        });

        // Jump to catch
        steps.push({
          stepIndex: 3,
          lineNumber: 11,
          block: 'catch',
          description: `İSTİSNA YAKALANDI: Try bloğundaki kalan satırlar (5, 7, 9) ATLANDI! Akış 'catch(Exception ex)' bloğuna yönlendirildi.`,
          variables: { a: 'tanımsız', b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'error', text: `[Fırlatılan İstisna]: System.${exName}` }
        });

        steps.push({
          stepIndex: 4,
          lineNumber: 13,
          block: 'catch',
          description: `Catch bloğu çalıştırılıyor: Hata mesajı konsola yazdırılıyor.`,
          variables: { a: 'tanımsız', b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'error', text: `Bir Hata Oluştu: ${exMsg}` }
        });

        // Finally
        steps.push({
          stepIndex: 5,
          lineNumber: 15,
          block: 'finally',
          description: `Bu simülasyonda akış 'finally' bloğuna ulaştı. Gerçek süreç sonlandırma koşulları burada modellenmez.`,
          variables: { a: 'tanımsız', b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'system', text: '[Sistem]: Finally bloğuna geçildi.' }
        });

        steps.push({
          stepIndex: 6,
          lineNumber: 17,
          block: 'finally',
          description: `Finally bloğundaki temizleme / bilgilendirme komutu çalıştı.`,
          variables: { a: 'tanımsız', b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'success', text: 'İşlem tamamlandı.' }
        });

        return steps;
      }

      // A parsed successfully
      const parsedA = parseInt(rawA, 10);
      steps.push({
        stepIndex: 2,
        lineNumber: 3,
        block: 'try',
        description: `Satır 3: 1. Girdi başarıyla tam sayıya çevrildi: int a = ${parsedA}`,
        variables: { a: parsedA, b: 'tanımsız', c: 'tanımsız', ex: 'null' },
        consoleOutput: { type: 'input', text: `> ${rawA}` }
      });

      // Parse B logic
      const isBEmpty = rawB.trim() === '';
      const numB = Number(rawB);
      const isBNaN = isNaN(numB) || isBEmpty;
      const isBOverflow = !isBNaN && (numB > 2147483647 || numB < -2147483648);

      if (isBNaN || isBOverflow) {
        const exName = isBEmpty ? 'ArgumentNullException' : isBOverflow ? 'OverflowException' : 'FormatException';
        const exMsg = isBEmpty
          ? 'Değer null veya boş olamaz. (Parameter "s")'
          : isBOverflow
          ? 'Değer, Int32 türünün minimum veya maksimum sınırını aştı.'
          : `Girdi dizesi doğru biçimde değildi: "${rawB}"`;

        steps.push({
          stepIndex: 3,
          lineNumber: 5,
          block: 'try',
          description: `Satır 5: int.Parse('${rawB}') başarısız oldu! İstisna fırlatıldı.`,
          variables: { a: parsedA, b: 'HATA!', c: 'tanımsız', ex: 'null' },
          consoleOutput: { type: 'input', text: `> ${rawB}` },
          isErrorTrigger: true,
          exceptionThrown: { name: exName, message: exMsg }
        });

        steps.push({
          stepIndex: 4,
          lineNumber: 11,
          block: 'catch',
          description: `İSTİSNA YAKALANDI: Satır 7 (toplama) ve Satır 9 (yazdırma) ATLANDI! catch bloğuna girildi.`,
          variables: { a: parsedA, b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'error', text: `[Fırlatılan İstisna]: System.${exName}` }
        });

        steps.push({
          stepIndex: 5,
          lineNumber: 13,
          block: 'catch',
          description: `Catch bloğu hatayı ekrana basıyor.`,
          variables: { a: parsedA, b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'error', text: `Bir Hata Oluştu: ${exMsg}` }
        });

        steps.push({
          stepIndex: 6,
          lineNumber: 15,
          block: 'finally',
          description: `Finally bloğuna girildi. Hata yakalanmış olsa da bu blok çalışır.`,
          variables: { a: parsedA, b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'system', text: '[Sistem]: Finally bloğu tetiklendi.' }
        });

        steps.push({
          stepIndex: 7,
          lineNumber: 17,
          block: 'finally',
          description: `Finally bloğu tamamlandı.`,
          variables: { a: parsedA, b: 'tanımsız', c: 'tanımsız', ex: `${exName}: ${exMsg}` },
          consoleOutput: { type: 'success', text: 'İşlem tamamlandı.' }
        });

        return steps;
      }

      // Both parsed successfully!
      const parsedB = parseInt(rawB, 10);
      steps.push({
        stepIndex: 3,
        lineNumber: 5,
        block: 'try',
        description: `Satır 5: 2. Girdi başarıyla tam sayıya çevrildi: int b = ${parsedB}`,
        variables: { a: parsedA, b: parsedB, c: 'tanımsız', ex: 'null' },
        consoleOutput: { type: 'input', text: `> ${rawB}` }
      });

      const sum = parsedA + parsedB;
      steps.push({
        stepIndex: 4,
        lineNumber: 7,
        block: 'try',
        description: `Satır 7: Toplama işlemi yapılıyor: c = ${parsedA} + ${parsedB} = ${sum}`,
        variables: { a: parsedA, b: parsedB, c: sum, ex: 'null' }
      });

      steps.push({
        stepIndex: 5,
        lineNumber: 9,
        block: 'try',
        description: `Satır 9: Sonuç konsola yazdırılıyor: ${sum}`,
        variables: { a: parsedA, b: parsedB, c: sum, ex: 'null' },
        consoleOutput: { type: 'output', text: `${sum}` }
      });

      // No error, skip catch!
      steps.push({
        stepIndex: 6,
        lineNumber: 15,
        block: 'finally',
        description: `HATA OLMADI. 'catch' bloğu tamamen atlandı ve doğrudan 'finally' bloğuna gelindi.`,
        variables: { a: parsedA, b: parsedB, c: sum, ex: 'null' },
        consoleOutput: { type: 'system', text: '[Sistem]: Catch atlandı. Finally bloğuna geçildi.' }
      });

      steps.push({
        stepIndex: 7,
        lineNumber: 17,
        block: 'finally',
        description: `Finally bloğu çalıştırıldı: Ekrana işlem tamamlandı yazıldı.`,
        variables: { a: parsedA, b: parsedB, c: sum, ex: 'null' },
        consoleOutput: { type: 'success', text: 'İşlem tamamlandı.' }
      });

      return steps;
    },
    didYouKnow: 'Kullanıcı girdisinde beklenen biçim hatalarını int.TryParse ile dönüş değerini kontrol ederek ele alabilirsiniz; performans farkı kullanım örüntüsüne bağlıdır.',
    authorNote: 'Yukarıdaki örnekte konsoldan girilen veri sayıya dönüştürülemeyen bir string olabilir. Bu durumda kod patlar. Kod yazarken bu tarz açıkları düşünüp önlemler almak kıdemli geliştiriciliğin ilk adımıdır.'
  },
  {
    id: 'divide-by-zero',
    title: '2. Sıfıra Bölme Hatası (DivideByZeroException)',
    shortDescription: 'Matematiksel bir istisna olan 0\'a bölme durumunun try-catch ile yakalanması.',
    category: 'runtime-error',
    inputs: [
      { id: 'inputA', label: 'Bölünen Sayı (Pay)', defaultValue: '100', placeholder: 'Sayı girin...' },
      { id: 'inputB', label: 'Bölen Sayı (Payda)', defaultValue: '0', placeholder: 'Sayı girin...' }
    ],
    presets: [
      { label: 'Sıfıra Bölme (100 / 0)', values: { inputA: '100', inputB: '0' }, expectedOutcome: 'exception', tag: 'DivideByZeroException' },
      { label: 'Normal Bölme (100 / 4)', values: { inputA: '100', inputB: '4' }, expectedOutcome: 'success', tag: 'Hatasız' }
    ],
    lines: [
      { lineNumber: 1, code: 'try', block: 'try', explanation: 'Bölme işlemi yapılacak try bloğu.' },
      { lineNumber: 2, code: '{', block: 'try', explanation: '' },
      { lineNumber: 3, code: '    int pay = int.Parse(Console.ReadLine());', block: 'try', explanation: 'Pay değerini alır.' },
      { lineNumber: 4, code: '    int payda = int.Parse(Console.ReadLine());', block: 'try', explanation: 'Payda değerini alır.' },
      { lineNumber: 5, code: '    int sonuc = pay / payda;', block: 'try', explanation: 'Eğer payda 0 ise CLR anında DivideByZeroException fırlatır!' },
      { lineNumber: 6, code: '    Console.WriteLine("Sonuç: " + sonuc);', block: 'try', explanation: 'Sonucu yazar.' },
      { lineNumber: 7, code: '}', block: 'try', explanation: '' },
      { lineNumber: 8, code: 'catch (DivideByZeroException dex)', block: 'catch', explanation: 'Spesifik olarak sıfıra bölme hatasını yakalar.' },
      { lineNumber: 9, code: '{', block: 'catch', explanation: '' },
      { lineNumber: 10, code: '    Console.WriteLine("Hata: Bir sayı 0\'a bölünemez!");', block: 'catch', explanation: 'Kullanıcı dostu özel hata mesajı.' },
      { lineNumber: 11, code: '}', block: 'catch', explanation: '' },
      { lineNumber: 12, code: 'finally', block: 'finally', explanation: 'Her halükarda kaynak temizliği ve loglama.' },
      { lineNumber: 13, code: '{', block: 'finally', explanation: '' },
      { lineNumber: 14, code: '    Console.WriteLine("Hesaplama oturumu kapatıldı.");', block: 'finally', explanation: 'Garantili çalışan kapanış kodu.' },
      { lineNumber: 15, code: '}', block: 'finally', explanation: '' }
    ],
    generateSteps: (inputs: Record<string, string>) => {
      const steps: ExecutionStep[] = [];
      const pay = parseInt(inputs.inputA || '0', 10);
      const payda = parseInt(inputs.inputB || '0', 10);

      steps.push({
        stepIndex: 1,
        lineNumber: 1,
        block: 'try',
        description: 'Try bloğuna girildi.',
        variables: { pay: 'tanımsız', payda: 'tanımsız', sonuc: 'tanımsız' },
        consoleOutput: { type: 'system', text: '[Sistem]: Bölme işlemi başlatıldı.' }
      });

      steps.push({
        stepIndex: 2,
        lineNumber: 3,
        block: 'try',
        description: `Pay okundu: ${pay}`,
        variables: { pay, payda: 'tanımsız', sonuc: 'tanımsız' },
        consoleOutput: { type: 'input', text: `Pay: ${pay}` }
      });

      steps.push({
        stepIndex: 3,
        lineNumber: 4,
        block: 'try',
        description: `Payda okundu: ${payda}`,
        variables: { pay, payda, sonuc: 'tanımsız' },
        consoleOutput: { type: 'input', text: `Payda: ${payda}` }
      });

      if (payda === 0) {
        steps.push({
          stepIndex: 4,
          lineNumber: 5,
          block: 'try',
          description: `KRİTİK HATA: ${pay} / 0 işlemi yapılamaz! İşlemci ve CLR 'DivideByZeroException' fırlattı.`,
          variables: { pay, payda, sonuc: 'HATA!' },
          isErrorTrigger: true,
          exceptionThrown: { name: 'DivideByZeroException', message: 'Sıfıra bölme girişiminde bulunuldu.' }
        });

        steps.push({
          stepIndex: 5,
          lineNumber: 8,
          block: 'catch',
          description: `'catch (DivideByZeroException dex)' bloğu özel olarak bu hatayı yakaladı.`,
          variables: { pay, payda, dex: 'DivideByZeroException' },
          consoleOutput: { type: 'error', text: '[İstisna]: System.DivideByZeroException' }
        });

        steps.push({
          stepIndex: 6,
          lineNumber: 10,
          block: 'catch',
          description: `Özel hata mesajı yazdırılıyor.`,
          variables: { pay, payda, dex: 'DivideByZeroException' },
          consoleOutput: { type: 'error', text: "Hata: Bir sayı 0'a bölünemez!" }
        });
      } else {
        const res = Math.floor(pay / payda);
        steps.push({
          stepIndex: 4,
          lineNumber: 5,
          block: 'try',
          description: `Bölme başarılı: ${pay} / ${payda} = ${res}`,
          variables: { pay, payda, sonuc: res }
        });

        steps.push({
          stepIndex: 5,
          lineNumber: 6,
          block: 'try',
          description: `Sonuç konsola yazdırılıyor.`,
          variables: { pay, payda, sonuc: res },
          consoleOutput: { type: 'output', text: `Sonuç: ${res}` }
        });
      }

      steps.push({
        stepIndex: steps.length + 1,
        lineNumber: 12,
        block: 'finally',
        description: `Bu simülasyonda normal akış finally bloğuna ulaşır.`,
        variables: { pay, payda },
        consoleOutput: { type: 'system', text: '[Sistem]: Finally bloğu devrede.' }
      });

      steps.push({
        stepIndex: steps.length + 1,
        lineNumber: 14,
        block: 'finally',
        description: `Oturum kapatıldı mesajı ekrana verildi.`,
        variables: { pay, payda },
        consoleOutput: { type: 'success', text: 'Hesaplama oturumu kapatıldı.' }
      });

      return steps;
    },
    didYouKnow: 'Ondalıklı sayılarda (double veya float) sıfıra bölme istisna fırlatmaz; `Infinity` (Sonsuz) veya `NaN` değerini üretir. DivideByZeroException tam sayılarda (int, long) fırlatılır.',
    authorNote: 'Kullanıcının bölen kısmına 0 girmesi çok yaygın bir durumdur. Kodumuzu yazarken "kullanıcı kesinlikle 0 girmeyecektir" varsayımıyla hareket edemeyiz.'
  },
  {
    id: 'logic-error-discount',
    title: '3. Mantıksal Hata (Try-Catch\'in Yakalayamadığı Açık!)',
    shortDescription: 'Kod sorunsuz çalışır, sıfır istisna fırlatılır ama yanlış formül yüzünden müşteri zarara uğrar!',
    category: 'logic-error',
    inputs: [
      { id: 'fiyat', label: 'Ürün Fiyatı (TL)', defaultValue: '1000', placeholder: 'Örn: 1000' },
      { id: 'indirimOrani', label: 'İndirim Yüzdesi (%)', defaultValue: '20', placeholder: 'Örn: 20' }
    ],
    presets: [
      { label: 'Mantıksal Hatalı Kod (İndirim yerine zam!)', values: { fiyat: '1000', indirimOrani: '20' }, expectedOutcome: 'logic-error', tag: 'Mantıksal Hata' },
      { label: 'Yüksek İndirim (500 TL, %50)', values: { fiyat: '500', indirimOrani: '50' }, expectedOutcome: 'logic-error', tag: 'Hatalı Sonuç' }
    ],
    lines: [
      { lineNumber: 1, code: 'try', block: 'try', explanation: 'Hesaplama try bloğu.' },
      { lineNumber: 2, code: '{', block: 'try', explanation: '' },
      { lineNumber: 3, code: '    double fiyat = double.Parse(fiyatStr);', block: 'try', explanation: 'Fiyatı okur.' },
      { lineNumber: 4, code: '    double oran = double.Parse(oranStr);', block: 'try', explanation: 'İndirim oranını okur.' },
      { lineNumber: 5, code: '    // MANTIKSAL HATA: Geliştirici eksi yerine artı yazmış!', block: 'try', explanation: 'DİKKAT: Hızlıca yazıp geçilmiş kod. Sözdizimi geçerli ama mantık yanlış!' },
      { lineNumber: 6, code: '    double odenecekTutar = fiyat + (fiyat * oran / 100);', block: 'try', explanation: 'İndirim yapılması gerekirken fiyata ZAM yapılıyor!' },
      { lineNumber: 7, code: '    Console.WriteLine("Ödenecek Tutar: " + odenecekTutar + " TL");', block: 'try', explanation: 'Hatalı sonuç ekrana yazılır.' },
      { lineNumber: 8, code: '}', block: 'try', explanation: '' },
      { lineNumber: 9, code: 'catch(Exception ex)', block: 'catch', explanation: 'Try-catch burada hiçbir hata YAKALAYAMAZ çünkü çalışma zamanı hatası yoktur!' },
      { lineNumber: 10, code: '{', block: 'catch', explanation: '' },
      { lineNumber: 11, code: '    Console.WriteLine("Hata: " + ex.Message);', block: 'catch', explanation: 'Burası asla çalışmaz!' },
      { lineNumber: 12, code: '}', block: 'catch', explanation: '' },
      { lineNumber: 13, code: 'finally', block: 'finally', explanation: 'Normal exception akışında kontrol bu bloğa ulaşır.' },
      { lineNumber: 14, code: '{', block: 'finally', explanation: '' },
      { lineNumber: 15, code: '    Console.WriteLine("Sipariş faturası hazırlandı.");', block: 'finally', explanation: 'Sistem hatayı bilmeden faturayı basar.' },
      { lineNumber: 16, code: '}', block: 'finally', explanation: '' }
    ],
    generateSteps: (inputs: Record<string, string>) => {
      const steps: ExecutionStep[] = [];
      const fiyat = parseFloat(inputs.fiyat || '1000');
      const oran = parseFloat(inputs.indirimOrani || '20');

      steps.push({
        stepIndex: 1,
        lineNumber: 1,
        block: 'try',
        description: 'Try bloğuna girildi.',
        variables: { fiyat: 'tanımsız', oran: 'tanımsız', odenecekTutar: 'tanımsız' },
        consoleOutput: { type: 'system', text: '[Sistem]: Sipariş hesaplaması başladı.' }
      });

      steps.push({
        stepIndex: 2,
        lineNumber: 3,
        block: 'try',
        description: `Fiyat okundu: ${fiyat} TL`,
        variables: { fiyat, oran: 'tanımsız' },
        consoleOutput: { type: 'input', text: `Fiyat: ${fiyat}` }
      });

      steps.push({
        stepIndex: 3,
        lineNumber: 4,
        block: 'try',
        description: `İndirim oranı okundu: %${oran}`,
        variables: { fiyat, oran },
        consoleOutput: { type: 'input', text: `İndirim Oranı: %${oran}` }
      });

      const yanlisTutar = fiyat + (fiyat * oran / 100);
      const dogruTutar = fiyat - (fiyat * oran / 100);

      steps.push({
        stepIndex: 4,
        lineNumber: 6,
        block: 'try',
        description: `MANTIKSAL HATA GERÇEKLEŞTİ! Formül: ${fiyat} + (${fiyat} * ${oran}/100) = ${yanlisTutar} TL. (Doğrusu ${dogruTutar} TL olmalıydı!). Try-catch bunu fark edemez!`,
        variables: { fiyat, oran, odenecekTutar: yanlisTutar, 'Olması Gereken': dogruTutar }
      });

      steps.push({
        stepIndex: 5,
        lineNumber: 7,
        block: 'try',
        description: `Hatalı tutar müşteriye yansıtıldı: ${yanlisTutar} TL`,
        variables: { fiyat, oran, odenecekTutar: yanlisTutar },
        consoleOutput: { type: 'output', text: `Ödenecek Tutar: ${yanlisTutar} TL (UYARI: %${oran} indirim yerine zam yapıldı!)` }
      });

      steps.push({
        stepIndex: 6,
        lineNumber: 13,
        block: 'finally',
        description: `Catch bloğu atlandı çünkü hiçbir Exception fırlatılmadı. Finally bloğuna geçildi.`,
        variables: { fiyat, oran, odenecekTutar: yanlisTutar },
        consoleOutput: { type: 'system', text: '[Sistem]: Catch bloğu atlandı (Hata yok sanıldı).' }
      });

      steps.push({
        stepIndex: 7,
        lineNumber: 15,
        block: 'finally',
        description: `Finally bloğu çalıştı ve hatalı işlem tamamlandı damgası vurdu.`,
        variables: { fiyat, oran, odenecekTutar: yanlisTutar },
        consoleOutput: { type: 'success', text: 'Sipariş faturası hazırlandı.' }
      });

      return steps;
    },
    didYouKnow: 'İstisna işleme, kodun beklenen sonucu üretip üretmediğini doğrulamaz; iş kurallarını ayrıca test edin.',
    authorNote: 'Enes Öztürk: "Hızlıca kodu yazıp geçmek doğru bir yaklaşım değildir. Try-catch tek başına bir kurtarıcı değildir; mantıksal hatalar sessizce sistemde kalır. Kodun açıklarını düşünüp birim testlerle desteklemeliyiz."'
  },
  {
    id: 'defensive-tryparse',
    title: '4. Enes Öztürk\'ün Güvenli Çözümü: int.TryParse Deseni',
    shortDescription: 'Try-catch maliyetine girmeden önce girdiyi önceden doğrulayan savunmacı programlama yaklaşımı.',
    category: 'defensive',
    inputs: [
      { id: 'inputVal', label: 'Dönüştürülecek Değer', defaultValue: '42', placeholder: 'Herhangi bir metin veya sayı...' }
    ],
    presets: [
      { label: 'Geçerli Sayı ("42")', values: { inputVal: '42' }, expectedOutcome: 'success', tag: 'Başarılı Doğrulama' },
      { label: 'Geçersiz Metin ("yüz yirmi")', values: { inputVal: 'yüz yirmi' }, expectedOutcome: 'success', tag: 'Zarif Yönetim (No Crash)' }
    ],
    lines: [
      { lineNumber: 1, code: 'string input = Console.ReadLine();', block: 'outside', explanation: 'Kullanıcıdan girdi alınır.' },
      { lineNumber: 2, code: 'int sayi;', block: 'outside', explanation: 'Dönüşen sayıyı tutacak değişken.' },
      { lineNumber: 3, code: 'if (int.TryParse(input, out sayi))', block: 'try', explanation: 'TryParse: Sayıya dönüşürse true döner ve değeri sayi değişkenine atar, ASLA istisna fırlatmaz!' },
      { lineNumber: 4, code: '{', block: 'try', explanation: '' },
      { lineNumber: 5, code: '    Console.WriteLine("Dönüşüm Başarılı! Karesi: " + (sayi * sayi));', block: 'try', explanation: 'Güvenli işlem.' },
      { lineNumber: 6, code: '}', block: 'try', explanation: '' },
      { lineNumber: 7, code: 'else', block: 'catch', explanation: 'Geçersiz veri gelirse istisna fırlatmadan zarifçe (graceful) karşılanır.' },
      { lineNumber: 8, code: '{', block: 'catch', explanation: '' },
      { lineNumber: 9, code: '    Console.WriteLine("Hatalı Giriş: Lütfen geçerli bir tam sayı giriniz.");', block: 'catch', explanation: 'Geçersiz girdi kullanıcıya bildirilir.' },
      { lineNumber: 10, code: '}', block: 'catch', explanation: '' }
    ],
    generateSteps: (inputs: Record<string, string>) => {
      const steps: ExecutionStep[] = [];
      const val = inputs.inputVal ?? '';

      steps.push({
        stepIndex: 1,
        lineNumber: 1,
        block: 'outside',
        description: `Girdi okundu: "${val}"`,
        variables: { input: val, sayi: 'tanımsız' },
        consoleOutput: { type: 'input', text: `> ${val}` }
      });

      const parsed = parseInt(val, 10);
      const isSuccess = !isNaN(parsed) && val.trim() !== '' && String(parsed) === val.trim();

      steps.push({
        stepIndex: 2,
        lineNumber: 3,
        block: isSuccess ? 'try' : 'catch',
        description: `int.TryParse("${val}", out sayi) çalıştırıldı. Sonuç: ${isSuccess ? 'true' : 'false'}. Hata fırlatılmadı!`,
        variables: { input: val, sayi: isSuccess ? parsed : 0, 'TryParse Sonucu': isSuccess ? 'true' : 'false' }
      });

      if (isSuccess) {
        steps.push({
          stepIndex: 3,
          lineNumber: 5,
          block: 'try',
          description: `Güvenli hesaplama: ${parsed} * ${parsed} = ${parsed * parsed}`,
          variables: { input: val, sayi: parsed, sonuc: parsed * parsed },
          consoleOutput: { type: 'success', text: `Dönüşüm Başarılı! Karesi: ${parsed * parsed}` }
        });
      } else {
        steps.push({
          stepIndex: 3,
          lineNumber: 9,
          block: 'catch',
          description: `Else bloğu devreye girdi. Program hiç çökmeden kullanıcıya kibar bir uyarı gösterildi.`,
          variables: { input: val, sayi: 0 },
          consoleOutput: { type: 'error', text: 'Hatalı Giriş: Lütfen geçerli bir tam sayı giriniz.' }
        });
      }

      return steps;
    },
    didYouKnow: 'TryParse, beklenen ayrıştırma başarısızlığını istisna yerine bool dönüş değeriyle bildirir.',
    authorNote: 'Enes Öztürk: "Hata yakalamak iyidir, ancak hatayı baştan öngörüp oluşmasını engellemek (Defensive Programming) çok daha üstün bir mühendislik yaklaşımıdır."'
  }
];
