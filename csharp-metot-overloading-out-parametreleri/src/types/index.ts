export type ActiveTab = 'overloading' | 'out-ref' | 'console' | 'signature-validator' | 'quiz' | 'submission';

export interface OverloadMethod {
  id: string;
  name: string;
  parameters: { name: string; type: string }[];
  returnType: string;
  description: string;
  codeSnippet: string;
}

export interface MemoryFrame {
  methodName: string;
  variables: {
    name: string;
    type: string;
    value: string | number;
    address: string;
    isReference?: boolean;
    refersTo?: string;
    isOut?: boolean;
    status: 'uninitialized' | 'assigned' | 'passed';
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
