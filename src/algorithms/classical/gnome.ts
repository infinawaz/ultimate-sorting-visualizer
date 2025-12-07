import type { SortStep } from '../../types';

export const gnomeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let index = 0;

    while (index < n) {
        if (index === 0) {
            index++;
        }

        steps.push({
            array: [...arr],
            compared: [index, index - 1],
            swapped: null,
            merged: null,
            pivot: null,
        });

        if (arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            steps.push({
                array: [...arr],
                compared: [index, index - 1],
                swapped: [index, index - 1],
                merged: null,
                pivot: null,
            });
            index--;
        }
    }

    return steps;
};
