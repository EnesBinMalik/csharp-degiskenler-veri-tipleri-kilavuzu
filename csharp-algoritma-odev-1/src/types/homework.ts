export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'all';

export interface QuestionInfo {
  id: QuestionId;
  title: string;
  shortDesc: string;
  problemPrompt: string;
  inputDescription: string;
  outputDescription: string;
  badge: string;
}

export interface TerminalLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'error' | 'divider' | 'banner';
  text: string;
  highlight?: boolean;
}

export interface Q1State {
  n: number | null;
  numbers: number[];
  evenNumbers: number[];
}

export interface Q2State {
  n: number | null;
  m: number | null;
  numbers: number[];
  matchedNumbers: number[];
}

export interface Q3State {
  n: number | null;
  words: string[];
  reversedWords: string[];
}

export interface Q4State {
  sentence: string;
  wordCount: number;
  letterCount: number;
  words: string[];
}
