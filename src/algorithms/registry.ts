import type { SortStep } from '../types';
import { bubbleSort } from './classical/bubble';
import { selectionSort } from './classical/selection';
import { insertionSort } from './classical/insertion';

export type AlgorithmFunction = (array: number[]) => SortStep[];

export const ALGORITHMS: Record<string, AlgorithmFunction> = {
    "bubble-sort": bubbleSort,
    "selection-sort": selectionSort,
    "insertion-sort": insertionSort,
};
