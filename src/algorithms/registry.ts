import type { SortStep } from '../types';
import { bubbleSort } from './classical/bubble';

export type AlgorithmFunction = (array: number[]) => SortStep[];

export const ALGORITHMS: Record<string, AlgorithmFunction> = {
    "bubble-sort": bubbleSort,
};
