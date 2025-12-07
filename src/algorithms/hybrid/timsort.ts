import type { SortStep } from '../../types';

export const timSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    const RUN = 8; // Small run for visualization visualization

    // Insertion Sort for runs
    const insertionSortRun = (left: number, right: number) => {
        for (let i = left + 1; i <= right; i++) {
            let temp = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > temp) {
                steps.push({
                    array: [...arr],
                    compared: [j, j + 1],
                    swapped: [j, j + 1],
                    merged: null,
                    pivot: null,
                    metadata: { algo: "Insertion Run" }
                });
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [j + 1, j + 1],
                merged: null,
                pivot: null,
                metadata: { algo: "Insertion Run" }
            });
        }
    };

    // Merge runs
    const mergeRuns = (l: number, m: number, r: number) => {
        let len1 = m - l + 1;
        let len2 = r - m;
        let leftArr = new Array(len1);
        let rightArr = new Array(len2);

        for (let x = 0; x < len1; x++) leftArr[x] = arr[l + x];
        for (let x = 0; x < len2; x++) rightArr[x] = arr[m + 1 + x];

        let i = 0, j = 0, k = l;
        while (i < len1 && j < len2) {
            steps.push({
                array: [...arr],
                compared: [l + i, m + 1 + j],
                swapped: null,
                merged: null,
                pivot: null,
                metadata: { algo: "Merge Run" }
            });

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                steps.push({
                    array: [...arr],
                    compared: null,
                    swapped: null,
                    merged: [k],
                    pivot: null
                });
                i++;
            } else {
                arr[k] = rightArr[j];
                steps.push({
                    array: [...arr],
                    compared: null,
                    swapped: null,
                    merged: [k],
                    pivot: null
                });
                j++;
            }
            k++;
        }

        while (i < len1) {
            arr[k] = leftArr[i];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            i++; k++;
        }
        while (j < len2) {
            arr[k] = rightArr[j];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            j++; k++;
        }
    };

    for (let i = 0; i < n; i += RUN) {
        insertionSortRun(i, Math.min(i + RUN - 1, n - 1));
    }

    for (let size = RUN; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                mergeRuns(left, mid, right);
            }
        }
    }

    return steps;
};
