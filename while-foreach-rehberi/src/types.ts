export interface WhileStep {
  stepIndex: number;
  line: number;
  sayac: number;
  conditionResult: boolean;
  explanation: string;
  consoleOutput?: string;
  isFinished?: boolean;
}

export interface ForEachStep {
  stepIndex: number;
  line: number;
  elementIndex: number;
  currentElement: number;
  previousTotal: number;
  currentTotal: number;
  explanation: string;
  consoleOutput?: string;
  isFinished?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type ActiveTab = 'overview' | 'while' | 'foreach' | 'playground' | 'quiz' | 'tips';
