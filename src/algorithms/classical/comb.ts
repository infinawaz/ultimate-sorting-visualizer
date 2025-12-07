import type { SortStep } from '../../types';

export const combSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let gap = n;
    let shrunk = true;

    while (gap !== 1 || shrunk) {
        gap = Math.floor(gap / 1.3);
        if (gap < 1) gap = 1;

        shrunk = false;

        for (let i = 0; i < n - gap; i++) {
            steps.push({
                array: [...arr],
                compared: [i, i + gap],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                shrunk = true;
                steps.push({
                    array: [...arr],
                    compared: [i, i + gap],
                    swapped: [i, i + gap],
                    merged: null,
                    pivot: null,
                });
            }
        }
    }

    return steps;
};
