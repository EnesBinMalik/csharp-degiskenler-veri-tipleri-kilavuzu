export interface MemoryVariable {
  id: string;
  name: string;
  type: string;
  value: number | string;
  address: string;
  scope: 'Main' | 'ArttırVeTopla' | 'Metot';
  isRef?: boolean;
  pointsTo?: string; // address it references
  status?: 'normal' | 'updated' | 'pointing' | 'destroyed';
}

export interface SimulationStep {
  stepNumber: number;
  codeLine: number; // 1-based index in the active snippet
  title: string;
  description: string;
  activeScope: 'Main' | 'ArttırVeTopla' | 'End';
  mainVars: {
    x: number;
    y: number;
    sonuc?: number;
  };
  methodVars?: {
    x: number;
    y: number;
    returnValue?: number;
  };
  isRefMode: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MethodTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  signature: string;
  code: string;
  usesRef: boolean;
  initialParams: Record<string, number>;
}
