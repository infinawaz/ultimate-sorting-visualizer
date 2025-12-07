import type { SortStep } from '../../types';

export const pancakeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    const flip = (k: number) => {
        let left = 0;
        let right = k;
        while (left < right) {
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [left, right],
                merged: null,
                pivot: null
            });
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    };

    for (let currSize = n; currSize > 1; currSize--) {
        // Find max in arr[0..currSize-1]
        let mi = 0;
        for (let i = 0; i < currSize; i++) {
            steps.push({
                array: [...arr],
                compared: [i, mi],
                swapped: null,
                merged: null,
                pivot: null
            });
            if (arr[i] > arr[mi]) {
                mi = i;
            }
        }

        if (mi !== currSize - 1) {
            // Move max to beginning
            if (mi !== 0) {
                flip(mi); // Flip updates array and pushes swap steps
            }
            // Move max to end
            flip(currSize - 1);
        }
    }

    return steps;
};
