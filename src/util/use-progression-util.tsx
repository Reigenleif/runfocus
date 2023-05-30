import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";
import {useState, useEffect, useCallback} from "react"
import { RunningStepType } from "./redux/settingSlice";
import { useProgressionReducer } from "./use-progression-reducer";

const TICK_PERIOD = 100;

export const useProgressionUtil = () => {
    const {setting} = useSelector((state: rootStateType) => state);

    const {state, initializeSteps,resetSteps,nextStep,togglePause,toggleStart,tick,dispatch} = useProgressionReducer()
    const {steps,currentStep, timerLeft, totalTimerLeft, timer, totalTimer, isStarted, isPaused} = state;

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
        }
    }, [state])

    const currentTotalTimerPercent = (totalTimerLeft / totalTimer) * 100;
    const currentTimerPercent = (timerLeft / timer) * 100;

    return {
        currentStep,
        currentTimerLeft: timerLeft.toFixed(0),
        currentTotalTimerPercent,
        totalTimerLeft: totalTimerLeft.toFixed(0),
        currentTimerPercent,
        isStarted,
        isPaused,
        toggleStart,
        togglePause,
    }
}
