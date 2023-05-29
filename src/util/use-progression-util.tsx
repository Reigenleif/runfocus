import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";
import {useState, useEffect, useCallback} from "react"
import { RunningStepType } from "./redux/settingSlice";
import { useProgressionReducer } from "./use-progression-reducer";

const TICK_PERIOD = 100;

export const useProgressionUtil = () => {
    const {setting} = useSelector((state: rootStateType) => state);
    const {runningStepInfo} = setting;

    const {state, initializeSteps,initializeTimer,resetSteps,nextStep,togglePause,toggleStart,tick,dispatch} = useProgressionReducer()
    const {steps,currentStep, timerLeft, totalTimerLeft, timer, totalTimer, isStarted, isPaused} = state;

    useEffect(() => {
        initializeSteps()
        // if (!steps[0]) {
        //     setTimeout(() => {
        //         initializeSteps()
        //     }, 1000)
        //     return;
        // }
        initializeTimer()
        setTimeout(()=> {
            dispatch({type: "TICK"})
        },1000)
    }, [steps])
    console.log(isStarted)
    // useEffect for timer
    useEffect(() => {
        console.log(timerLeft, totalTimerLeft, currentStep)
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

        
    }, [state, isStarted, isPaused, timerLeft, totalTimerLeft, currentStep])

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
