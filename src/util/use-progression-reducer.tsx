import { useReducer } from "react";
import { RunningStepType } from "./redux/settingSlice";
import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";

export type ProgresssionStateType = {
    isStarted: boolean,
    isPaused: boolean,
    currentStep: RunningStepType | undefined,
    currentIndex: number,
    steps: RunningStepType[],
    timer: number,
    timerLeft: number,
    totalTimer: number,
    totalTimerLeft: number,
}



export const useProgressionReducer = () => {
    const setting = useSelector((state: rootStateType) => state.setting);


    const reducer = (s: ProgresssionStateType, action: any) => {
        console.log(action.type,"CALLED",s.isStarted)

        switch (action.type) {
            case "INITIALIZE_STEPS":
                if (setting.runningSequenceID) {
                    s.steps = setting.runningSequenceList[setting.runningSequenceID].steps;
                } else {
                    s.steps = setting.runningSequenceList[0].steps;
                }
                return s
            case "INITIALIZE_TIMER" :
                let cntTime = 0;
                for (let i = 0; i < s.steps.length; i++) {
                    cntTime += s.steps[i].duration * s.steps[i].reps;
                }
                s.totalTimer = cntTime;
                s.totalTimerLeft = cntTime;

                s.currentStep = s.steps[0];
                s.currentIndex = 0;
                s.timer = s.steps[0].duration;
                
                return s
            case "RESET_STEPS":
                s.steps = setting.runningSequenceList[0].steps;
                s.currentStep = setting.runningSequenceList[0].steps[0];
                s.timer = setting.runningSequenceList[0].steps[0].duration;
                return s
            case "NEXT_STEP":
                if (!s.currentStep) {
                    return s;
                }
        
                if (s.currentStep.reps > 0) {
                    s.currentStep.reps -= 1
                    s.timer = s.currentStep.duration;
                    return s;
                }
        
                if (s.currentIndex + 1 >= s.steps.length) {
                    s.isStarted;
                    return s;
                }
        
                s.currentIndex += 1;
                s.currentStep = s.steps[s.currentIndex];
                s.timer = s.steps[s.currentIndex].duration;     
            case "PREV_STEP":
                if (s.currentIndex - 1 < 0) {
                    return s;
                }
            
                s.currentIndex -= 1;
                s.currentStep = s.steps[s.currentIndex];
                s.timer = s.steps[s.currentIndex].duration;
                return s;
            case "TOGGLE_START":
                s.steps = setting.runningSequenceList[0].steps;
                s.currentStep = setting.runningSequenceList[0].steps[0];
                s.timer = setting.runningSequenceList[0].steps[0].duration;
                s.isStarted = !s.isStarted;
                s.isPaused = false;
                return s;
            case "TOGGLE_PAUSE":
                s.isPaused = !s.isPaused;
                return s;
            case "RECOUNT_TOTAL_TIMER":
                let cntTime2 = 0;
                for (let i = 0; i < s.steps.length; i++) {
                    cntTime2 += s.steps[i].duration * s.steps[i].reps;
                }
                s.totalTimer = cntTime2;
                s.totalTimerLeft = cntTime2;
                return s;
            case "TICK":
                s.timerLeft -= action.payload.tickPeriod/1000;
                s.totalTimerLeft -= action.payload.tickPeriod/1000;
                return s;
                

        }
        return s
    }

    const [state, dispatch] = useReducer(reducer, {
        isStarted: false,
        isPaused: true,
        currentStep: undefined,
        currentIndex: 0,
        steps: [],
        timer: 0,
        timerLeft: 0,
        totalTimer: 0,
        totalTimerLeft: 0,
    });

    return {state: state, 
        initializeSteps: () => dispatch({type: "INITIALIZE_STEPS"}),
        initializeTimer: () => dispatch({type: "INITIALIZE_TIMER"}),
        toggleStart: () => dispatch({type: "TOGGLE_START"}),
        togglePause: () => dispatch({type: "TOGGLE_PAUSE"}),
        nextStep: () => dispatch({type: "NEXT_STEP"}),
        prevStep: () => dispatch({type: "PREV_STEP"}),
        resetSteps: ()  => dispatch({type: "RESET_STEPS"}),
        recountTotalTimer: () => dispatch({type: "RECOUNT_TOTAL_TIMER"}),
        tick: (tickPeriod: number) => dispatch({type: "TICK", payload: tickPeriod}),
        dispatch
    }
}