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
import { cycleSort } from './classical/cycle';
import { pancakeSort } from './classical/pancake';
import { stoogeSort } from './classical/stooge';
import { bitonicSort } from './classical/bitonic';
import { treeSort } from './classical/tree';
import { pigeonholeSort } from './classical/pigeonhole';
import { strandSort } from './classical/strand';
import { bingoSort } from './classical/bingo';
import { timSort } from './hybrid/timsort';
import { introsort } from './hybrid/introsort';
import { mergeInsertionSort } from './hybrid/mergeInsertion';
import { quickInsertionSort } from './hybrid/quickInsertion';
import { dualPivotQuickSort } from './hybrid/dualPivotQuick';
import { blockMergeSort } from './hybrid/blockMerge';
import { adaptiveRadixSort } from './hybrid/adaptiveRadix';
import { bucketInsertionSort } from './hybrid/bucketInsertion';
import { radixBucketSort } from './hybrid/radixBucket';

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
    "cycle-sort": cycleSort,
    "pancake-sort": pancakeSort,
    "stooge-sort": stoogeSort,
    "bitonic-sort": bitonicSort,
    "tree-sort": treeSort,
    "pigeonhole-sort": pigeonholeSort,
    "strand-sort": strandSort,
    "bingo-sort": bingoSort,
    "timsort": timSort,
    "introsort": introsort,
    "merge-insertion-sort": mergeInsertionSort,
    "quick-insertion-sort": quickInsertionSort,
    "dual-pivot-quick-sort": dualPivotQuickSort,
    "block-merge-sort": blockMergeSort,
    "adaptive-radix-sort": adaptiveRadixSort,
    "bucket-insertion-sort": bucketInsertionSort,
    "radix-bucket-sort": radixBucketSort,
};
