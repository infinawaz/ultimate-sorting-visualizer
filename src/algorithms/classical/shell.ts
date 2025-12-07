import type { SortStep } from '../../types';

export const shellSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;

            steps.push({
                array: [...arr],
                compared: [i, i], // Highlight starting element
                swapped: null,
                merged: null,
                pivot: null,
            });

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                steps.push({
                    array: [...arr],
                    compared: [j, j - gap],
                    swapped: null,
                    merged: null,
                    pivot: null,
                });

                arr[j] = arr[j - gap];

                steps.push({
                    array: [...arr],
                    compared: [j, j - gap],
                    swapped: [j, j - gap],
                    merged: null,
                    pivot: null,
                });
            }
            arr[j] = temp;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [j, j], // Highlight placement
                merged: null,
                pivot: null,
            });
        }
    }

    return steps;
};
