export type DataType = 'int' | 'string' | 'double' | 'bool';

export interface MemoryCell {
  index: number;
  address: string;
  value: string | number | boolean;
  isHighlighted?: boolean;
  isActive?: boolean;
  isError?: boolean;
}

export interface ArrayDeclarationExample {
  id: string;
  title: string;
  code: string;
  type: DataType;
  description: string;
  explanation: string;
  defaultElements: Array<{ index: number; value: string | number }>;
}

export interface LoopStepState {
  step: number;
  currentI: number;
  currentValue: number;
  runningTotal: number;
  codeLine: number;
  consoleLogs: string[];
  isCompleted: boolean;
  statusMessage: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
