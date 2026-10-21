export interface DataTypeInfo {
  name: string;
  category: 'Tam Sayı' | 'Ondalıklı Sayı' | 'Metin / Karakter' | 'Mantıksal' | 'Tarih / Zaman' | 'Özel';
  csharpKeyword: string;
  dotnetType: string;
  sizeBytes: number | null;
  memoryType: 'Değer tipi' | 'Referans tipi';
  rangeDescription: string;
  exampleValue: string;
  goodUseCases: string;
  performanceNote?: string;
}

export interface VariableRule {
  id: number;
  title: string;
  shortDesc: string;
  explanation: string;
  validExamples: string[];
  invalidExamples: { code: string; reason: string }[];
  compilerErrorSnippet?: string;
  tip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DocLinkInfo {
  title: string;
  type: 'DateTime' | 'String';
  url: string;
  description: string;
  highlightedMembers: string[];
}
