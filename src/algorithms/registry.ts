import type { SortStep } from '../types';
import { bubbleSort } from './classical/bubble';
import { selectionSort } from './classical/selection';
import { insertionSort } from './classical/insertion';
import { mergeSort } from './classical/merge';

export type AlgorithmFunction = (array: number[]) => SortStep[];

export const ALGORITHMS: Record<string, AlgorithmFunction> = {
    "bubble-sort": bubbleSort,
    "selection-sort": selectionSort,
    "insertion-sort": insertionSort,
    "merge-sort": mergeSort,
};
