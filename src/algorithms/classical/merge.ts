import type { SortStep } from '../../types';

export const mergeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];

    const merge = (start: number, mid: number, end: number) => {
        const leftArr = arr.slice(start, mid + 1);
        const rightArr = arr.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        while (i < leftArr.length && j < rightArr.length) {
            // Comparison step
            steps.push({
                array: [...arr],
                compared: [start + i, mid + 1 + j],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                steps.push({
                    array: [...arr],
                    compared: [start + i, mid + 1 + j],
                    swapped: null,
                    merged: [k], // Highlight index being overwritten
                    pivot: null,
                });
                i++;
            } else {
                arr[k] = rightArr[j];
                steps.push({
                    array: [...arr],
                    compared: [start + i, mid + 1 + j],
                    swapped: null,
                    merged: [k], // Highlight index being overwritten
                    pivot: null,
                });
                j++;
            }
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null,
            });
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null,
            });
            j++;
            k++;
        }
    };

    const mergeSortRec = (start: number, end: number) => {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            mergeSortRec(start, mid);
            mergeSortRec(mid + 1, end);
            merge(start, mid, end);
        }
    };

    mergeSortRec(0, arr.length - 1);

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
