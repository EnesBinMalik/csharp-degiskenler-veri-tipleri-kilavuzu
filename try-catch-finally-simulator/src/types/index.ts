export type BlockType = 'try' | 'catch' | 'finally' | 'outside';

export interface CodeLine {
  lineNumber: number;
  code: string;
  block: BlockType;
  explanation: string;
}

export interface ExecutionStep {
  stepIndex: number;
  lineNumber: number;
  block: BlockType;
  description: string;
  variables: Record<string, string | number | null | undefined>;
  consoleOutput?: {
    type: 'input' | 'output' | 'error' | 'success' | 'system';
    text: string;
  };
  isErrorTrigger?: boolean;
  exceptionThrown?: {
    name: string;
    message: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  shortDescription: string;
  category: 'user-prompt' | 'runtime-error' | 'multiple-catch' | 'logic-error' | 'defensive';
  inputs: {
    id: string;
    label: string;
    defaultValue: string;
    placeholder: string;
    type?: string;
  }[];
  presets: {
    label: string;
    values: Record<string, string>;
    expectedOutcome: 'success' | 'exception' | 'logic-error';
    tag: string;
  }[];
  lines: CodeLine[];
  generateSteps: (inputs: Record<string, string>) => ExecutionStep[];
  didYouKnow: string;
  authorNote: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Kolay' | 'Orta' | 'İleri';
  code: string;
  bugType: 'runtime' | 'logic' | 'syntax' | 'resource-leak';
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  fixedCode: string;
  proTip: string;
}
