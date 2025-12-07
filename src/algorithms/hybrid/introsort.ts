import type { SortStep } from '../../types';

export const introsort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];

    // Heap Sort helper
    const heapify = (n: number, i: number, base: number) => {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        // Visualize relative to base
        if (l < n && arr[base + l] > arr[base + largest]) largest = l;
        if (r < n && arr[base + r] > arr[base + largest]) largest = r;

        if (largest !== i) {
            // Swap relative
            [arr[base + i], arr[base + largest]] = [arr[base + largest], arr[base + i]];
            steps.push({
                array: [...arr],
                compared: [base + i, base + largest],
                swapped: [base + i, base + largest],
                merged: null,
                pivot: null,
                metadata: { algo: "Heap Fallback" }
            });
            heapify(n, largest, base);
        }
    };

    const heapSortSub = (low: number, high: number) => {
        let n = high - low + 1;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(n, i, low);
        }
        for (let i = n - 1; i > 0; i--) {
            [arr[low], arr[low + i]] = [arr[low + i], arr[low]];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [low, low + i],
                merged: null,
                pivot: null,
                metadata: { algo: "Heap Fallback" }
            });
            heapify(i, 0, low);
        }
    };

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            steps.push({
                array: [...arr],
                compared: [j, high],
                swapped: null,
                merged: null,
                pivot: high
            });
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({
                    array: [...arr],
                    compared: null,
                    swapped: [i, j],
                    merged: null,
                    pivot: high
                });
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({
            array: [...arr],
            compared: null,
            swapped: [i + 1, high],
            merged: null,
            pivot: i + 1
        });
        return i + 1;
    };

    const sort = (low: number, high: number, depthLimit: number) => {
        if (high - low < 0) return;

        if (depthLimit === 0) {
            heapSortSub(low, high);
            return;
        }

        const p = partition(low, high);
        sort(low, p - 1, depthLimit - 1);
        sort(p + 1, high, depthLimit - 1);
    };

    const depthLimit = Math.floor(2 * Math.log(arr.length));
    sort(0, arr.length - 1, depthLimit);

    return steps;
};
