import type { SortStep } from '../../types';

export const quickSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        // Highlight pivot
        steps.push({
            array: [...arr],
            compared: null,
            swapped: null,
            merged: null,
            pivot: high,
        });

        for (let j = low; j < high; j++) {
            // Comparison
            steps.push({
                array: [...arr],
                compared: [j, high],
                swapped: null,
                merged: null,
                pivot: high,
            });

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                // Swap
                steps.push({
                    array: [...arr],
                    compared: [j, high],
                    swapped: [i, j],
                    merged: null,
                    pivot: high,
                });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        // Pivot moves to correct spot
        steps.push({
            array: [...arr],
            compared: null,
            swapped: [i + 1, high],
            merged: null,
            pivot: i + 1,
        });

        return i + 1;
    };

    const quickSortRec = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            quickSortRec(low, pi - 1);
            quickSortRec(pi + 1, high);
        }
    };

    quickSortRec(0, arr.length - 1);

    // Final sorted state
    steps.push({
        array: [...arr],
        compared: null,
        swapped: null,
        merged: null,
        pivot: null,
    });

    return steps;
};
