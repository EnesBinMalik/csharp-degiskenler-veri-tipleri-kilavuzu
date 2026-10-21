export type DataType = 'int' | 'string';

export interface ArrayElement {
  id: string;
  value: number | string | null;
  status?: 'default' | 'highlight' | 'comparing' | 'swapping' | 'cleared' | 'found' | 'scanning' | 'newly-added' | 'marked-for-removal';
  originalIndex?: number;
}

export type MethodKey = 'Sort' | 'Clear' | 'Reverse' | 'IndexOf' | 'Resize' | 'BinarySearch' | 'Fill' | 'Copy';

export interface MethodInfo {
  key: MethodKey;
  name: string;
  signature: string;
  shortDesc: string;
  fullDesc: string;
  syntax: string;
  timeComplexity: string;
  spaceComplexity: string;
  promptExampleCode: string;
  sampleArray: (number | string)[];
  sampleType: DataType;
  parameters: {
    name: string;
    type: string;
    description: string;
  }[];
  keyPoints: string[];
  notes?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  code: string;
  output: string;
  method?: MethodKey;
  type: 'info' | 'success' | 'warn' | 'result';
}

export interface QuizQuestion {
  id: number;
  title: string;
  csharpCode: string;
  initialArray: (number | string)[];
  dataType: DataType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedMethod: MethodKey;
}
