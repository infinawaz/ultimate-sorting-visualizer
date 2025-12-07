import type { SortStep } from '../../types';

export const cocktailShakerSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    let swapped = true;
    let start = 0;
    let end = arr.length;

    while (swapped) {
        swapped = false;

        // Forward pass
        for (let i = start; i < end - 1; ++i) {
            steps.push({
                array: [...arr],
                compared: [i, i + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                steps.push({
                    array: [...arr],
                    compared: [i, i + 1],
                    swapped: [i, i + 1],
                    merged: null,
                    pivot: null,
                });
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        // Backward pass
        for (let i = end - 1; i >= start; i--) {
            steps.push({
                array: [...arr],
                compared: [i, i + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                steps.push({
                    array: [...arr],
                    compared: [i, i + 1],
                    swapped: [i, i + 1],
                    merged: null,
                    pivot: null,
                });
            }
        }

        start++;
    }

    return steps;
};
