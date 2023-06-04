import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";
import {useState, useEffect, useCallback} from "react"
import { RunningStepType } from "./redux/settingSlice";
import { useProgressionReducer } from "./use-progression-reducer";

const TICK_PERIOD = 100;

export const useProgressionUtil = () => {
    const {setting} = useSelector((state: rootStateType) => state);

    const {state, initializeSteps,resetSteps,nextStep,togglePause,toggleStart,tick,recountTotalTimer} = useProgressionReducer()
    const {steps,currentStep, timerLeft, totalTimerLeft, timer, totalTimer, isStarted, isPaused,runningSequence} = state;

    useEffect(() => {
        if(!currentStep) {
            setTimeout(() => {
                initializeSteps()
            },500)
        }
    }, [state])
    
    // useEffect for timer
    useEffect(() => {
        if (!isStarted || isPaused) {
            return;
        }
        
        if (!currentStep) {
            return;
        }

        if (timerLeft > 0) {
            setTimeout(() => {
                tick(TICK_PERIOD)
            }, TICK_PERIOD);
            return;
        }

        if (totalTimerLeft > 0) {
            nextStep();
            recountTotalTimer();
        }
    }, [state])

    const currentTotalTimerPercent = (totalTimerLeft / totalTimer) * 100;
    const currentTimerPercent = (timerLeft / timer) * 100;

    return {
        currentStep,
        currentTimerLeft: Math.floor(timerLeft),
        currentTotalTimerPercent,
        totalTimerLeft,
        currentTimerPercent,
        isStarted,
        isPaused,
        runningSequence,
        toggleStart,
        togglePause,
    }
}
