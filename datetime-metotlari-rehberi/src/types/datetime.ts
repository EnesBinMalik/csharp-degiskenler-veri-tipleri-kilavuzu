export type MethodCategory =
  | 'all'
  | 'olusturma'
  | 'get'
  | 'set'
  | 'format'
  | 'hesaplama'
  | 'intl';

export interface MethodItem {
  id: string;
  name: string;
  category: 'olusturma' | 'get' | 'set' | 'format' | 'hesaplama' | 'intl';
  categoryLabel: string;
  summary: string;
  syntax: string;
  returnType: string;
  parameters?: { name: string; type: string; description: string }[];
  exampleCode: string;
  pitfalls?: string;
  csharpEquivalent?: string;
  pythonEquivalent?: string;
  sqlEquivalent?: string;
  tags: string[];
}

export interface SandboxRecipe {
  id: string;
  title: string;
  description: string;
  category: string;
  defaultInputs: Record<string, string | number>;
  inputLabels: Record<string, { label: string; type: 'date' | 'number' | 'text' }>;
  codeTemplate: string;
  run: (inputs: Record<string, string | number>) => {
    result: string;
    metrics: { label: string; value: string | number }[];
    explanation: string;
  };
}

export interface CrossLangItem {
  operation: string;
  description: string;
  javascript: string;
  csharp: string;
  python: string;
  sql: string;
}

export interface WorldClockCity {
  name: string;
  country: string;
  timeZone: string;
}
