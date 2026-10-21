export interface CodeScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  variableName: string;
  variableType: 'bool' | 'number' | 'string';
  defaultValue: boolean | number | string;
  inputConfig?: {
    min?: number;
    max?: number;
    step?: number;
    label?: string;
  };
  getIfElseCode: (val: any) => string;
  getTernaryCode: (val: any) => string;
  getOutput: (val: any) => string;
  conditionExplanation: (val: any) => string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
