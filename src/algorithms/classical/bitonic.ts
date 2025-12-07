import type { SortStep } from '../../types';

export const bitonicSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    // Bitonic sort works best with power of 2. 
    // We will assume standard for visualization or it might fail on non-power-of-2 array sizes visually.

    const bitonicMerge = (low: number, cnt: number, dir: boolean) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            for (let i = low; i < low + k; i++) {
                steps.push({
                    array: [...arr],
                    compared: [i, i + k],
                    swapped: null,
                    merged: null,
                    pivot: null
                });

                const replace = dir ? (arr[i] > arr[i + k]) : (arr[i] < arr[i + k]);
                if (replace) {
                    [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
                    steps.push({
                        array: [...arr],
                        compared: [i, i + k],
                        swapped: [i, i + k],
                        merged: null,
                        pivot: null
                    });
                }
            }
            bitonicMerge(low, k, dir);
            bitonicMerge(low + k, k, dir);
        }
    };

    const bitonicSortRec = (low: number, cnt: number, dir: boolean) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            bitonicSortRec(low, k, !dir);
            bitonicSortRec(low + k, k, dir);
            bitonicMerge(low, cnt, dir);
        }
    };

    bitonicSortRec(0, arr.length, true); // true = ascending
    return steps;
};
