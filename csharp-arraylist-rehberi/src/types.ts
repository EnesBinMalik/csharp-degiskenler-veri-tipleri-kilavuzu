export type DataType = 'string' | 'int' | 'bool' | 'double' | 'object';

export interface ArrayListItem {
  id: string;
  value: any;
  displayValue: string;
  type: DataType;
  isBoxed: boolean;
  addedAt: number;
}

export interface CastResult {
  success: boolean;
  message: string;
  exceptionType?: string;
  outputValue?: string;
  actualType: DataType;
  targetType: DataType;
}
