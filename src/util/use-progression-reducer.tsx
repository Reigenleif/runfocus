import { useReducer } from "react";
import { RunningSequence, RunningStepType } from "./redux/settingSlice";
import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";

export type ProgresssionStateType = {
    runningSequence: RunningSequence,
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


    const reducer = (prevState: ProgresssionStateType, action: any) => {
        let s = {...prevState}
        

        switch (action.type) {
            case "INITIALIZE_STEPS":
                if (setting.runningSequenceID) {
                    s.runningSequence = setting.runningSequenceList[setting.runningSequenceID]
                } else {
                    s.runningSequence = setting.runningSequenceList[0]
                }

                s.steps = s.runningSequence.steps
                
                let cntTime = 0;
                for (let i = 0; i < s.steps.length; i++) {
                    cntTime += s.steps[i].duration * s.steps[i].reps;
                }
                s.totalTimer = cntTime;
                s.totalTimerLeft = cntTime;

                s.currentStep = {...s.steps[0]}
                s.currentIndex = 0;
                s.timer = s.steps[0].duration;
                s.timerLeft = s.steps[0].duration;
                break
            case "RESET_STEPS":
                
                s.currentStep = {...s.steps[0]}
                s.timer = s.steps[0].duration;
                s.timerLeft = s.steps[0].duration;
                break
            case "NEXT_STEP":
                if (!s.currentStep) {
                    break
                }
        
                if (s.currentStep.reps > 0) {
                    s.currentStep.reps -= 1
                    s.timer = s.currentStep.duration;
                    s.timerLeft = s.currentStep.duration;
                    break
                }
        
                if (s.currentIndex + 1 >= s.steps.length) {
                    s.isStarted = false;
                    s.isPaused = true;
                    break
                }
        
                s.currentIndex += 1;
                s.currentStep = {...s.steps[s.currentIndex]};
                s.timer = s.currentStep.duration;  
                s.timerLeft = s.currentStep.duration;
                break   
            case "PREV_STEP":
                if (s.currentIndex - 1 < 0) {
                    break
                }
            
                s.currentIndex -= 1;
                s.currentStep = {...s.steps[s.currentIndex]};
                s.timer = s.currentStep.duration; 
                s.timerLeft = s.currentStep.duration;
                break
            case "TOGGLE_START":
                s.currentStep = {...s.steps[s.currentIndex]};
                s.timer = s.steps[0].duration;
                s.timerLeft = s.currentStep.duration;
                s.isStarted = !s.isStarted;
                s.isPaused = false;
                break
            case "TOGGLE_PAUSE":
                s.isPaused = !s.isPaused;
                break
            case "RECOUNT_TOTAL_TIMER":
                let cntTime2 = 0;
                if (s.currentStep) {
                    cntTime2 += s.currentStep.duration * s.currentStep.reps;
                }

                for (let i = s.currentIndex + 1; i < s.steps.length; i++) {
                    cntTime2 += s.steps[i].duration * s.steps[i].reps;
                }
                s.totalTimerLeft = cntTime2;
                break
            case "TICK":
                s.timerLeft -= action.payload.tickPeriod/1000;
                s.totalTimerLeft -= action.payload.tickPeriod/1000;
                break
        }
        // console.log(s)
        // console.log(action)
        return s
    }

    const [state, dispatch] = useReducer(reducer, {
        runningSequence: {name: "", id: 0, steps: []},
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
        tick: (tickPeriod: number) => dispatch({type: "TICK", payload: {tickPeriod}}),
    }
}