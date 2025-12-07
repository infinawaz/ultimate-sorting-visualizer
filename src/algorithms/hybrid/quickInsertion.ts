import type { SortStep } from '../../types';

export const quickInsertionSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const THRESHOLD = 10;

    const insertionSortSub = (left: number, right: number) => {
        for (let i = left + 1; i <= right; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                steps.push({
                    array: [...arr],
                    compared: [j, j + 1],
                    swapped: [j, j + 1],
                    merged: null,
                    pivot: null,
                    metadata: { algo: "Insertion Fallback" }
                });
                j--;
            }
            arr[j + 1] = key;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [j + 1, j + 1],
                merged: null,
                pivot: null
            });
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

    const sort = (low: number, high: number) => {
        if (low < high) {
            if (high - low + 1 <= THRESHOLD) {
                insertionSortSub(low, high);
            } else {
                const pi = partition(low, high);
                sort(low, pi - 1);
                sort(pi + 1, high);
            }
        }
    };

    sort(0, arr.length - 1);
    return steps;
};
