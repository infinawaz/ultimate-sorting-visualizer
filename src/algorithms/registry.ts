import type { SortStep } from '../types';
import { bubbleSort } from './classical/bubble';
import { selectionSort } from './classical/selection';
import { insertionSort } from './classical/insertion';
import { mergeSort } from './classical/merge';
import { quickSort } from './classical/quick';
import { heapSort } from './classical/heap';
import { countingSort } from './classical/counting';
import { radixSort } from './classical/radix';
import { bucketSort } from './classical/bucket';
import { shellSort } from './classical/shell';
import { gnomeSort } from './classical/gnome';
import { cocktailShakerSort } from './classical/cocktail';
import { oddEvenSort } from './classical/oddEven';
import { combSort } from './classical/comb';

export type AlgorithmFunction = (array: number[]) => SortStep[];

export const ALGORITHMS: Record<string, AlgorithmFunction> = {
    "bubble-sort": bubbleSort,
    "selection-sort": selectionSort,
    "insertion-sort": insertionSort,
    "merge-sort": mergeSort,
    "quick-sort": quickSort,
    "heap-sort": heapSort,
    "counting-sort": countingSort,
    "radix-sort": radixSort,
    "bucket-sort": bucketSort,
    "shell-sort": shellSort,
    "gnome-sort": gnomeSort,
    "cocktail-sort": cocktailShakerSort,
    "odd-even-sort": oddEvenSort,
    "comb-sort": combSort,
};
