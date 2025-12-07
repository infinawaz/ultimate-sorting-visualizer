import { describe, it, expect } from 'vitest';
import { ALGORITHMS } from '../algorithms/registry';

describe('Sorting Algorithms', () => {
    const generateRandomArray = (length: number, min: number, max: number) => {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
    };

    const isSorted = (arr: number[]) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
        }
        return true;
    };

    Object.entries(ALGORITHMS).forEach(([name, algoFunc]) => {
        it(`should sort correctly using ${name}`, () => {
            const arr = generateRandomArray(50, 1, 100);
            const steps = algoFunc([...arr]); // Run algorithm

            expect(steps.length).toBeGreaterThan(0);

            const lastStep = steps[steps.length - 1];
            const sortedArr = lastStep.array;

            expect(isSorted(sortedArr)).toBe(true);
            // Double check against JS sort
            const expected = [...arr].sort((a, b) => a - b);
            expect(sortedArr).toEqual(expected);
        });

        it(`should handle empty array for ${name}`, () => {
            const steps = algoFunc([]);
            if (steps.length > 0) {
                expect(steps[steps.length - 1].array).toEqual([]);
            } else {
                // Some implementations might return empty steps, which is fine
                expect(steps).toEqual([]);
            }
        });

        it(`should handle already sorted array for ${name}`, () => {
            const arr = [1, 2, 3, 4, 5];
            const steps = algoFunc([...arr]);
            const lastStep = steps[steps.length - 1];
            expect(lastStep.array).toEqual(arr);
        });

        it(`should handle reverse sorted array for ${name}`, () => {
            const arr = [5, 4, 3, 2, 1];
            const steps = algoFunc([...arr]);
            const lastStep = steps[steps.length - 1];
            expect(lastStep.array).toEqual([1, 2, 3, 4, 5]);
        });
    });
});
