import React, { useState, useEffect, useRef } from 'react';
import Bars from './Bars';
import Controls from './Controls';
import { generateRandomArray } from '../utils/visualizerUtils';
import type { SortStep } from '../types';
import { COMPLEXITIES } from '../data/complexities';
import { ALGORITHMS } from '../algorithms/registry';

const Visualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<string>('');
    const [speed, setSpeed] = useState<number>(50);
    const [arraySize, setArraySize] = useState<number>(30);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [steps, setSteps] = useState<SortStep[]>([]);

    // Ref to track if we should continue the loop
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    useEffect(() => {
        handleGenerateNewArray();
        // Default to first algorithm if available
        const keys = Object.keys(COMPLEXITIES);
        if (keys.length > 0) setAlgorithm(keys[0]);
    }, []);

    // Re-generate array when size changes
    useEffect(() => {
        handleGenerateNewArray();
    }, [arraySize]);

    const handleGenerateNewArray = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setSteps([]);
        const newArr = generateRandomArray(arraySize, 5, 500);
        setArray(newArr);
    };

    const handleRun = async () => {
        if (steps.length === 0) {
            const algoFunc = ALGORITHMS[algorithm];
            if (!algoFunc) {
                console.error(`Algorithm ${algorithm} not found`);
                return;
            }

            const generatedSteps = algoFunc([...array]);
            setSteps(generatedSteps);
            // Proceed to setPlaying
        }

        setIsPlaying(true);
    };

    const handleTogglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            handleRun();
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        // Reset array to initial state (step 0 array if available, or just keeping current unsorted)
        if (steps.length > 0) {
            setArray(steps[0].array);
        }
    };

    // Animation Loop
    useEffect(() => {
        let timer: number;
        if (isPlaying && steps.length > 0 && currentStep < steps.length) {
            timer = setTimeout(() => {
                const step = steps[currentStep];
                setArray(step.array);
                setCurrentStep(prev => prev + 1);
            }, Math.max(0, 500 - speed)); // Invert speed mapping roughly
        } else if (currentStep >= steps.length) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, speed]);

    const currentDisplayStep = steps[currentStep - 1] || {
        array,
        compared: null,
        swapped: null,
        merged: null,
        pivot: null
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 text-white p-4 gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Ultimate Sorting Visualizer
            </h1>

            <Controls
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                speed={speed}
                setSpeed={setSpeed}
                arraySize={arraySize}
                setArraySize={setArraySize}
                generateNewArray={handleGenerateNewArray}
                isPlaying={isPlaying}
                togglePlay={handleTogglePlay}
                reset={handleReset}
            />

            <Bars
                array={currentDisplayStep.array}
                compared={currentDisplayStep.compared}
                swapped={currentDisplayStep.swapped}
                merged={currentDisplayStep.merged}
                pivot={currentDisplayStep.pivot}
            />

            <div className="text-sm text-gray-500">
                Step: {currentStep} / {steps.length}
            </div>
        </div>
    );
};

export default Visualizer;
