import type { SortStep } from '../../types';

export const mergeInsertionSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const THRESHOLD = 10;

    const insertionSortSub = (left: number, right: number) => {
        for (let i = left + 1; i <= right; i++) {
            let temp = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                steps.push({
                    array: [...arr],
                    compared: [j, j + 1],
                    swapped: [j, j + 1],
                    merged: null,
                    pivot: null,
                    metadata: { algo: "Insertion Phase" }
                });
                j--;
            }
            arr[j + 1] = temp;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [j + 1, j + 1], // Place
                merged: null,
                pivot: null
            });
        }
    };

    const merge = (start: number, mid: number, end: number) => {
        // Standard merge logic (same as merge.ts basically)
        // To save space/time in this giant prompt we assume similar logic
        // Copy-paste simplified for completeness
        let leftArr = arr.slice(start, mid + 1);
        let rightArr = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;
        while (i < leftArr.length && j < rightArr.length) {
            steps.push({
                array: [...arr],
                compared: [start + i, mid + 1 + j],
                swapped: null,
                merged: null,
                pivot: null
            });
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            k++;
        }
        while (i < leftArr.length) {
            arr[k++] = leftArr[i++];
            steps.push({ array: [...arr], compared: null, swapped: null, merged: [k - 1], pivot: null });
        }
        while (j < rightArr.length) {
            arr[k++] = rightArr[j++];
            steps.push({ array: [...arr], compared: null, swapped: null, merged: [k - 1], pivot: null });
        }
    };

    const sort = (start: number, end: number) => {
        if (end - start + 1 <= THRESHOLD) {
            insertionSortSub(start, end);
            return;
        }

        const mid = Math.floor((start + end) / 2);
        sort(start, mid);
        sort(mid + 1, end);
        merge(start, mid, end);
    };

    sort(0, arr.length - 1);
    return steps;
};
