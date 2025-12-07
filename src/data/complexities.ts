import type { ComplexityInfo } from "../types";

export const COMPLEXITIES: Record<string, ComplexityInfo> = {
    "bubble-sort": {
        name: "Bubble Sort",
        category: "comparison",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: true,
        inPlace: true,
        adaptive: true,
        notes: "Simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
    },
};
