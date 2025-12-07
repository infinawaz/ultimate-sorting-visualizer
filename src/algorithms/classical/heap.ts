import type { SortStep } from '../../types';

export const heapSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    const heapify = (n: number, i: number) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        // Highlight comparison
        if (l < n) {
            steps.push({
                array: [...arr],
                compared: [largest, l],
                swapped: null,
                merged: null,
                pivot: null,
            });
            if (arr[l] > arr[largest]) {
                largest = l;
            }
        }

        if (r < n) {
            steps.push({
                array: [...arr],
                compared: [largest, r],
                swapped: null,
                merged: null,
                pivot: null,
            });
            if (arr[r] > arr[largest]) {
                largest = r;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            // Swap for heapify
            steps.push({
                array: [...arr],
                compared: [i, largest],
                swapped: [i, largest],
                merged: null,
                pivot: null,
            });

            heapify(n, largest);
        }
    };

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        // Swap root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({
            array: [...arr],
            compared: null,
            swapped: [0, i],
            merged: null,
            pivot: null,
        });

        heapify(i, 0);
    }

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
