export type LoopPresetId = 'basic' | 'break' | 'continue' | 'infinite' | 'custom';

export type LoopStage =
  | 'idle'
  | 'init'
  | 'condition'
  | 'body_start'
  | 'break_check'
  | 'break_triggered'
  | 'continue_check'
  | 'continue_triggered'
  | 'body_print'
  | 'update'
  | 'limit_reached'
  | 'finished';

export interface ExecutionStep {
  stepIndex: number;
  iteration: number;
  stage: LoopStage;
  stageLabel: string;
  variableI: number;
  conditionMet: boolean;
  codeLineNumber: number; // 1-indexed for the active snippet
  explanation: string;
  outputLog: string[]; // Accumulated console output
  isBreak?: boolean;
  isContinue?: boolean;
}

export interface LoopConfig {
  startVal: number;
  conditionOp: '<=' | '<' | '>=' | '>';
  targetVal: number;
  stepType: 'inc' | 'dec' | 'inc2';
  hasBreak: boolean;
  breakVal: number;
  hasContinue: boolean;
  continueCondition: 'even' | 'odd' | 'specific';
  continueVal: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
