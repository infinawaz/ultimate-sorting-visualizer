import React, { useState, useEffect, useRef } from 'react';
import type { SortStep } from '../types';
import { ALGORITHMS } from '../algorithms/registry';
import { COMPLEXITIES } from '../data/complexities';
import { generateRandomArray } from '../utils/visualizerUtils';
import Controls from './Controls';
import Bars from './Bars';
import { ComplexityPanel } from './ComplexityPanel';

const Visualizer: React.FC = () => {
    const [algorithm, setAlgorithm] = useState<string>('');
    const [speed, setSpeed] = useState<number>(50);
    const [arraySize, setArraySize] = useState<number>(30);
    const [array, setArray] = useState<number[]>([]);
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
        setSteps([]);
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
            }, Math.max(0, 1000 - speed)); // Invert speed mapping roughly
        } else if (currentStep >= steps.length) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps, speed]);

    const currentDisplayStep = steps[currentStep - 1] || {
        array,
        compared: [],
        swapped: [],
        merged: [],
        pivot: -1
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
            {/* Header */}
            <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center shadow-md z-10">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Ultimate Sorting Visualizer
                </h1>
                <div className="text-xs text-gray-500">
                    {steps.length > 0 ? `Step ${currentStep} / ${steps.length}` : 'Ready'}
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">

                {/* Left Sidebar: Controls */}
                <div className="lg:col-span-3 bg-gray-800 border-r border-gray-700 overflow-y-auto p-4 custom-scrollbar">
                    <Controls
                        algorithm={algorithm}
                        setAlgorithm={setAlgorithm}
                        arraySize={arraySize}
                        setArraySize={setArraySize}
                        speed={speed}
                        setSpeed={setSpeed}
                        generateNewArray={handleGenerateNewArray}
                        togglePlay={handleTogglePlay}
                        isPlaying={isPlaying}
                        reset={handleReset}
                    />
                </div>

                {/* Center: Visualization */}
                <div className="lg:col-span-6 bg-gray-900 p-4 flex flex-col items-center justify-center relative border-r border-gray-700">
                    <div className="w-full h-full flex items-end justify-center px-4 pb-8 pt-4">
                        <Bars
                            array={currentDisplayStep.array}
                            compared={currentDisplayStep.compared}
                            swapped={currentDisplayStep.swapped}
                            pivot={currentDisplayStep.pivot}
                            merged={currentDisplayStep.merged}
                        />
                    </div>
                </div>

                {/* Right Sidebar: Complexity Info */}
                <div className="lg:col-span-3 bg-gray-800 border-l border-gray-700 overflow-y-auto p-4 custom-scrollbar">
                    <ComplexityPanel info={COMPLEXITIES[algorithm]} />
                </div>

            </div>
        </div>
    );
};

export default Visualizer;
