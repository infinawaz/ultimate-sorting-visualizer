import type { SortStep } from '../../types';

export const bucketInsertionSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    if (arr.length === 0) return steps;

    const n = arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketCount = Math.floor(Math.sqrt(n)) || 5;
    const range = (max - min) / bucketCount;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    // Distribute
    for (let i = 0; i < n; i++) {
        let idx = Math.floor((arr[i] - min) / range);
        if (idx === bucketCount) idx--; // Max value
        buckets[idx].push(arr[i]);
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
            metadata: { bucket: idx }
        });
    }

    // Sort buckets with Insertion and Gather
    let k = 0;
    for (let i = 0; i < bucketCount; i++) {
        // Insertion sort on bucket 'i'
        // To visualize, we pull bucket into main array?
        // Or just sort internal and write back.
        // We'll write back UNSORTED bucket first, then visualize sort in main array?
        // Or just sort internally.

        // Let's sort internally and visualize the overwrite as "sorted chunk"
        buckets[i].sort((a, b) => a - b); // Using JS sort for simplicity or implement insertion?
        // Hybrid explicit: let's use valid insertion loop logic on the bucket array for correctness
        for (let b = 1; b < buckets[i].length; b++) {
            let temp = buckets[i][b];
            let j = b - 1;
            while (j >= 0 && buckets[i][j] > temp) {
                buckets[i][j + 1] = buckets[i][j];
                j--;
            }
            buckets[i][j + 1] = temp;
        }

        // Write back
        for (let val of buckets[i]) {
            arr[k] = val;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            k++;
        }
    }

    return steps;
};
