import type { SortStep } from '../../types';

class TreeNode {
    value: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    index: number; // Original index for visualization context if needed

    constructor(value: number, index: number) {
        this.value = value;
        this.index = index;
    }
}

export const treeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    let root: TreeNode | null = null;

    // Insert helper
    const insert = (node: TreeNode | null, value: number, index: number): TreeNode => {
        if (node === null) {
            return new TreeNode(value, index);
        }

        // Comparison visualization
        steps.push({
            array: [...arr],
            compared: [index, node.index], // Compare current item with node item
            swapped: null,
            merged: null,
            pivot: null
        });

        if (value < node.value) {
            node.left = insert(node.left, value, index);
        } else {
            node.right = insert(node.right, value, index);
        }
        return node;
    };

    // Build Tree
    for (let i = 0; i < arr.length; i++) {
        root = insert(root, arr[i], i);
    }

    // In-order traversal to refill array
    let k = 0;
    const inOrder = (node: TreeNode | null) => {
        if (node !== null) {
            inOrder(node.left);

            arr[k] = node.value;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k], // Overwrite with sorted value
                pivot: null
            });
            k++;

            inOrder(node.right);
        }
    };

    inOrder(root);

    return steps;
};
