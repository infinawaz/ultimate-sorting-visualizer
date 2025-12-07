import type { SortStep } from '../../types';

export const blockMergeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    // Simplified block merge logic - essentially bottom-up merge with visual emphasis on blocks

    const merge = (l: number, m: number, r: number) => {
        let i = l, j = m + 1, k = 0;
        let temp = new Array(r - l + 1);

        while (i <= m && j <= r) {
            steps.push({
                array: [...arr],
                compared: [i, j],
                swapped: null,
                merged: null,
                pivot: null,
                metadata: { algo: "Block Merge" }
            });
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= m) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];

        for (i = 0; i < temp.length; i++) {
            arr[l + i] = temp[i];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [l + i],
                pivot: null
            });
        }
    };

    // Iterate width 1, 2, 4, 8... (Block sizes)
    for (let width = 1; width < n; width *= 2) {
        for (let i = 0; i < n; i += 2 * width) {
            let left = i;
            let mid = i + width - 1;
            let right = Math.min(i + 2 * width - 1, n - 1);
            if (mid < right) {
                merge(left, mid, right);
            }
        }
    }

    return steps;
};
