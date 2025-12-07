import type { SortStep } from '../../types';

export const radixBucketSort = (array: number[]): SortStep[] => {
    // Essentially same as LSD Radix Sort in classical.
    // To make it distinct, let's say it uses Bucket Sort for the digits?
    // Radix Sort IS a bucket sort on digits.
    // We will replicate logic but maybe visualize differently or ensure it is clear.

    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps;

    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        let buckets: number[][] = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            buckets[digit].push(arr[i]);
            steps.push({
                array: [...arr],
                compared: [i, i],
                swapped: null,
                merged: null,
                pivot: null,
                metadata: { bucket: digit }
            });
        }

        let k = 0;
        for (let i = 0; i < 10; i++) {
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
    }

    return steps;
};
