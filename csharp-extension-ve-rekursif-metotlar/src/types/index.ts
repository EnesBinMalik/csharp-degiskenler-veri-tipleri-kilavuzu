export type TabType = 'theory' | 'recursion' | 'extension' | 'comparison' | 'quiz';

export interface AuthorProfile {
  name: string;
  role: string;
  title: string;
  bio: string;
  quote: string;
  tips: string[];
}

export type RecursionAlgorithm = 'fibonacci' | 'factorial' | 'power' | 'reverse' | 'overflow_demo';

export interface StackFrame {
  id: string;
  functionName: string;
  params: Record<string, string | number>;
  callDescription: string;
  depth: number;
  returnValue?: string | number;
  state: 'calling' | 'waiting' | 'returning' | 'completed';
  activeLine: number;
  explanation: string;
}

export interface RecursionStep {
  stepIndex: number;
  description: string;
  stack: StackFrame[];
  treeNodes: TreeNode[];
  activeLine: number;
  highlightVar?: { name: string; value: string | number };
  isComplete?: boolean;
  isOverflow?: boolean;
}

export interface TreeNode {
  id: string;
  label: string;
  result?: string | number;
  depth: number;
  parentId?: string;
  status: 'active' | 'waiting' | 'resolved' | 'error';
}

export interface ExtensionMethodRule {
  id: string;
  title: string;
  description: string;
  csharpCode: string;
  isValid: boolean;
  errorCode?: string;
}

export interface ExtensionPreset {
  id: string;
  name: string;
  targetType: string;
  returnType: string;
  description: string;
  code: string;
  sampleInput: string | number;
  execute: (input: any) => { result: string | number | boolean; steps: string[] };
}

export interface QuizQuestion {
  id: number;
  category: 'extension' | 'recursion';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  authorNote: string;
}
