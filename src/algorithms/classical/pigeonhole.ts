import type { SortStep } from '../../types';

export const pigeonholeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;

    const holes: number[][] = Array.from({ length: range }, () => []);

    // Scatter
    for (let i = 0; i < arr.length; i++) {
        holes[arr[i] - min].push(arr[i]);
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
        });
    }

    // Gather
    let k = 0;
    for (let i = 0; i < range; i++) {
        while (holes[i].length > 0) {
            arr[k] = holes[i].shift()!;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            k++;
        }
    }

    return steps;
};
