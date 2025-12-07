import type { SortStep } from '../../types';

export const oddEvenSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let sorted = false;

    while (!sorted) {
        sorted = true;

        // Odd phase
        for (let i = 1; i <= n - 2; i = i + 2) {
            steps.push({
                array: [...arr],
                compared: [i, i + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
                steps.push({
                    array: [...arr],
                    compared: [i, i + 1],
                    swapped: [i, i + 1],
                    merged: null,
                    pivot: null,
                });
            }
        }

        // Even phase
        for (let i = 0; i <= n - 2; i = i + 2) {
            steps.push({
                array: [...arr],
                compared: [i, i + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
                steps.push({
                    array: [...arr],
                    compared: [i, i + 1],
                    swapped: [i, i + 1],
                    merged: null,
                    pivot: null,
                });
            }
        }
    }

    return steps;
};
