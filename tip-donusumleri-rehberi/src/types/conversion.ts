/**
 * C# Tip Dönüşümleri Veri Tipleri ve Yapılandırması
 * Hazırlayan: Enes Öztürk
 */

export type DataType =
  | 'byte'
  | 'sbyte'
  | 'short'
  | 'ushort'
  | 'int'
  | 'uint'
  | 'long'
  | 'ulong'
  | 'float'
  | 'double'
  | 'decimal'
  | 'char'
  | 'bool'
  | 'string'
  | 'object';

export interface TypeMetadata {
  id: DataType;
  name: string;
  clrType: string;
  bytes: number;
  bits: number;
  category: 'tam_sayi' | 'kesirli' | 'metin' | 'mantiksal' | 'referans';
  minValue: string;
  maxValue: string;
  description: string;
  typeClassification: 'Değer türü' | 'Referans türü';
}

export const TYPE_DETAILS: Record<DataType, TypeMetadata> = {
  byte: {
    id: 'byte',
    name: 'byte',
    clrType: 'System.Byte',
    bytes: 1,
    bits: 8,
    category: 'tam_sayi',
    minValue: '0',
    maxValue: '255',
    description: 'İşaretsiz 8-bit tam sayı. Bellekte 1 bayt yer kaplar.',
    typeClassification: 'Değer türü',
  },
  sbyte: {
    id: 'sbyte',
    name: 'sbyte',
    clrType: 'System.SByte',
    bytes: 1,
    bits: 8,
    category: 'tam_sayi',
    minValue: '-128',
    maxValue: '127',
    description: 'İşaretli 8-bit tam sayı. Bellekte 1 bayt yer kaplar.',
    typeClassification: 'Değer türü',
  },
  short: {
    id: 'short',
    name: 'short',
    clrType: 'System.Int16',
    bytes: 2,
    bits: 16,
    category: 'tam_sayi',
    minValue: '-32,768',
    maxValue: '32,767',
    description: 'İşaretli 16-bit tam sayı. Bellekte 2 bayt yer kaplar.',
    typeClassification: 'Değer türü',
  },
  ushort: {
    id: 'ushort',
    name: 'ushort',
    clrType: 'System.UInt16',
    bytes: 2,
    bits: 16,
    category: 'tam_sayi',
    minValue: '0',
    maxValue: '65,535',
    description: 'İşaretsiz 16-bit tam sayı.',
    typeClassification: 'Değer türü',
  },
  int: {
    id: 'int',
    name: 'int',
    clrType: 'System.Int32',
    bytes: 4,
    bits: 32,
    category: 'tam_sayi',
    minValue: '-2,147,483,648',
    maxValue: '2,147,483,647',
    description: 'İşaretli 32-bit tam sayı. C# dilinde en çok kullanılan sayısal tip.',
    typeClassification: 'Değer türü',
  },
  uint: {
    id: 'uint',
    name: 'uint',
    clrType: 'System.UInt32',
    bytes: 4,
    bits: 32,
    category: 'tam_sayi',
    minValue: '0',
    maxValue: '4,294,967,295',
    description: 'İşaretsiz 32-bit tam sayı.',
    typeClassification: 'Değer türü',
  },
  long: {
    id: 'long',
    name: 'long',
    clrType: 'System.Int64',
    bytes: 8,
    bits: 64,
    category: 'tam_sayi',
    minValue: '-9,223,372,036,854,775,808',
    maxValue: '9,223,372,036,854,775,807',
    description: 'İşaretli 64-bit tam sayı. Çok büyük tam sayı değerleri için.',
    typeClassification: 'Değer türü',
  },
  ulong: {
    id: 'ulong',
    name: 'ulong',
    clrType: 'System.UInt64',
    bytes: 8,
    bits: 64,
    category: 'tam_sayi',
    minValue: '0',
    maxValue: '18,446,744,073,709,551,615',
    description: 'İşaretsiz 64-bit tam sayı.',
    typeClassification: 'Değer türü',
  },
  float: {
    id: 'float',
    name: 'float',
    clrType: 'System.Single',
    bytes: 4,
    bits: 32,
    category: 'kesirli',
    minValue: '±1.5 x 10^-45',
    maxValue: '±3.4 x 10^38',
    description: '32-bit tek duyarlıklı (single precision) kayan noktalı sayı. (~6-9 basamak hassasiyet)',
    typeClassification: 'Değer türü',
  },
  double: {
    id: 'double',
    name: 'double',
    clrType: 'System.Double',
    bytes: 8,
    bits: 64,
    category: 'kesirli',
    minValue: '±5.0 × 10^-324',
    maxValue: '±1.7 × 10^308',
    description: '64-bit çift duyarlıklı (double precision) kayan noktalı sayı. (~15-17 basamak hassasiyet)',
    typeClassification: 'Değer türü',
  },
  decimal: {
    id: 'decimal',
    name: 'decimal',
    clrType: 'System.Decimal',
    bytes: 16,
    bits: 128,
    category: 'kesirli',
    minValue: '±1.0 × 10^-28',
    maxValue: '±7.9228 × 10^28',
    description: '128-bit yüksek hassasiyetli finansal hesaplama tipi. (~28-29 basamak)',
    typeClassification: 'Değer türü',
  },
  char: {
    id: 'char',
    name: 'char',
    clrType: 'System.Char',
    bytes: 2,
    bits: 16,
    category: 'metin',
    minValue: "U+0000 ('\\0')",
    maxValue: "U+FFFF ('\\uffff')",
    description: '16-bit tek bir Unicode karakteri saklar.',
    typeClassification: 'Değer türü',
  },
  bool: {
    id: 'bool',
    name: 'bool',
    clrType: 'System.Boolean',
    bytes: 1,
    bits: 8,
    category: 'mantiksal',
    minValue: 'false (0)',
    maxValue: 'true (1)',
    description: 'Mantıksal doğruluk değeri (true veya false).',
    typeClassification: 'Değer türü',
  },
  string: {
    id: 'string',
    name: 'string',
    clrType: 'System.String',
    bytes: 0,
    bits: 0,
    category: 'metin',
    minValue: '0 karakter (boş)',
    maxValue: '~2 milyar karakter',
    description: 'Unicode karakter dizisini temsil eden değişmez bir referans türüdür.',
    typeClassification: 'Referans türü',
  },
  object: {
    id: 'object',
    name: 'object',
    clrType: 'System.Object',
    bytes: 0,
    bits: 0,
    category: 'referans',
    minValue: 'null',
    maxValue: 'Herhangi bir nesne referansı',
    description: '.NET tip hiyerarşisinin kök nesnesi. Tüm tipler dolaylı olarak object türevidir.',
    typeClassification: 'Referans türü',
  },
};

// C# Resmi Implicit (Bilinçsiz) Dönüşüm Tablosu
export const IMPLICIT_CONVERSIONS: Record<DataType, DataType[]> = {
  sbyte: ['short', 'int', 'long', 'float', 'double', 'decimal'],
  byte: ['short', 'ushort', 'int', 'uint', 'long', 'ulong', 'float', 'double', 'decimal'],
  short: ['int', 'long', 'float', 'double', 'decimal'],
  ushort: ['int', 'uint', 'long', 'ulong', 'float', 'double', 'decimal'],
  int: ['long', 'float', 'double', 'decimal'],
  uint: ['long', 'ulong', 'float', 'double', 'decimal'],
  long: ['float', 'double', 'decimal'],
  ulong: ['float', 'double', 'decimal'],
  char: ['ushort', 'int', 'uint', 'long', 'ulong', 'float', 'double', 'decimal'],
  float: ['double'],
  double: [],
  decimal: [],
  bool: [],
  string: ['object'],
  object: [],
};

export type ConversionMethod =
  | 'implicit'
  | 'explicit_cast'
  | 'convert_class'
  | 'parse'
  | 'try_parse'
  | 'to_string'
  | 'boxing_unboxing';

export interface ScenarioPreset {
  id: string;
  title: string;
  description: string;
  sourceType: DataType;
  targetType: DataType;
  value: string;
  method: ConversionMethod;
  checkedMode?: boolean;
  category: 'implicit' | 'explicit' | 'error_overflow' | 'special';
  badge: string;
}

export const PRESET_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'prompt_int_to_float',
    title: 'int -> float (Prompt Örneği)',
    description: "float a; int b = 25; a = b; (Float daha yüksek kapasiteli olduğundan kendiliğinden gerçekleşir)",
    sourceType: 'int',
    targetType: 'float',
    value: '25',
    method: 'implicit',
    category: 'implicit',
    badge: 'Implicit (Bilinçsiz)',
  },
  {
    id: 'prompt_short_to_int',
    title: 'short -> int (Prompt Örneği)',
    description: "short x = 10; int y; y = x; (Integer, short'a göre daha büyük alanı saklayabilir)",
    sourceType: 'short',
    targetType: 'int',
    value: '10',
    method: 'implicit',
    category: 'implicit',
    badge: 'Implicit (Bilinçsiz)',
  },
  {
    id: 'overflow_int_to_byte',
    title: 'Taşma & Veri Kaybı: int 300 -> (byte)',
    description: "Byte maksimum 255 alabilir! 300 atanırsa bit kesilmesi olur: 300 % 256 = 44!",
    sourceType: 'int',
    targetType: 'byte',
    value: '300',
    method: 'explicit_cast',
    checkedMode: false,
    category: 'error_overflow',
    badge: 'Bit Taşması (Overflow)',
  },
  {
    id: 'checked_overflow',
    title: 'checked { (byte)300 } - İstisna Yakalama',
    description: "checked bloğu taşma olduğunda sessizce veri kaybetmek yerine OverflowException fırlatır.",
    sourceType: 'int',
    targetType: 'byte',
    value: '300',
    method: 'explicit_cast',
    checkedMode: true,
    category: 'error_overflow',
    badge: 'checked Bloğu',
  },
  {
    id: 'double_to_int_cast',
    title: 'Kayan Noktalı Kesilme: double 3.99 -> (int)',
    description: "Cast operatörü yuvarlama yapmaz; ondalık kısmı doğrudan atar ve 3 üretir.",
    sourceType: 'double',
    targetType: 'int',
    value: '3.99',
    method: 'explicit_cast',
    category: 'explicit',
    badge: 'Cast Kesilmesi',
  },
  {
    id: 'string_to_int_parse',
    title: 'string "1923" -> int.Parse()',
    description: "Metinsel bir sayıyı matematiksel tam sayıya çevirme.",
    sourceType: 'string',
    targetType: 'int',
    value: '1923',
    method: 'parse',
    category: 'explicit',
    badge: 'int.Parse',
  },
  {
    id: 'string_invalid_try_parse',
    title: 'int.TryParse("yuz-yirmi-uc")',
    description: "Geçersiz metin durumunda programın çökmesini engeller, false döner ve 0 atar.",
    sourceType: 'string',
    targetType: 'int',
    value: 'yuz-yirmi-uc',
    method: 'try_parse',
    category: 'special',
    badge: 'int.TryParse (Güvenli)',
  },
  {
    id: 'convert_vs_parse_null',
    title: 'Convert.ToInt32(null) -> 0',
    description: "Convert sınıfı null aldığında 0 döndürür, int.Parse(null) ise ArgumentNullException patlatır!",
    sourceType: 'string',
    targetType: 'int',
    value: 'null',
    method: 'convert_class',
    category: 'special',
    badge: 'Convert vs Parse (Null)',
  },
  {
    id: 'boxing_unboxing_flow',
    title: 'Boxing & Unboxing: int 42 -> object -> int',
    description: "Değer tipini Heap'e paketleme (Boxing) ve cast ile geri çıkarma (Unboxing).",
    sourceType: 'int',
    targetType: 'object',
    value: '42',
    method: 'boxing_unboxing',
    category: 'special',
    badge: 'Boxing / Unboxing',
  },
];
