import { useSelector } from "react-redux";
import { rootStateType } from "./redux/store";
import {useState, useEffect, useCallback} from "react"
import { RunningStepType } from "./redux/settingSlice";

export const useProgressionUtil = () => {
    const {setting} = useSelector((state: rootStateType) => state);
    const {runningStepInfo} = setting;

    const [currentStep, setCurrentStep] = useState<RunningStepType>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [steps, setSteps] = useState<RunningStepType[]>([]);
    const [currentTimer, setCurrentTimer] = useState(0);
    const [currentTimerLeft, setCurrentTimerLeft] = useState(0);
    const [totalTimer, setTotalTimer] = useState(0);
    const [totalTimerLeft, setTotalTimerLeft] = useState(0);
    

    useEffect(() => {

        if (setting.runningSequenceID) {
            setSteps(setting.runningSequenceList.find(v => v.id === setting.runningSequenceID)?.steps ?? [])
        } else {
            setSteps(setting.runningSequenceList[0].steps)
        }

        let cntTime = 0;
        for (let i = 0; i < steps.length; i++) {
            cntTime += steps[i].duration * steps[i].reps;
        }
        setTotalTimer(cntTime);
        setTotalTimerLeft(cntTime);

        setCurrentStep(steps[0]);
        setCurrentTimer(steps[0].duration);
    }, [setting])


    const resetSteps = useCallback(() => {
        setSteps(setting.runningSequenceList[0].steps);
        setCurrentStep(setting.runningSequenceList[0].steps[0]);
        setCurrentTimer(setting.runningSequenceList[0].steps[0].duration);
    },[setting])

    const nextStep = useCallback(() => {
        if (!currentStep) {
            return;
        }

        if (currentStep.reps > 0) {
            setCurrentStep({
                ...currentStep,
                reps: currentStep.reps - 1
            })
            setCurrentTimer(currentStep.duration);
            return;
        }

        if (currentIndex + 1 >= steps.length) {
            return;
        }

        setCurrentIndex(currentIndex + 1);
        setCurrentStep(steps[currentIndex + 1]);
        setCurrentTimer(steps[currentIndex + 1].duration);
        setCurrentIndex(currentIndex + 1)
    }, [currentStep, currentIndex, steps])

    const prevStep = useCallback(() => {
        if (currentIndex - 1 < 0) {
            return;
        }

        setCurrentIndex(currentIndex - 1);
        setCurrentStep(steps[currentIndex - 1]);
        setCurrentTimer(steps[currentIndex - 1].duration);
    }, [currentIndex, steps])

    const skipStep = useCallback(() => {
        if (!currentStep) {
            return;
        }

        if (currentIndex + 1 >= steps.length) {
            return;
        }

        setCurrentIndex(currentIndex + 1);
        setCurrentStep(steps[currentIndex + 1]);
        setCurrentTimer(steps[currentIndex + 1].duration);
        setCurrentIndex(currentIndex + 1)
    }, [currentStep, currentIndex, steps])

    const recountTotalTimer = useCallback(() => {
        let cntTime = 0;
        for (let i = currentIndex; i < steps.length; i++) {
            cntTime += steps[i].duration * steps[i].reps;
        }
        setTotalTimerLeft(cntTime);
    }, [currentIndex, steps])

    // useEffect for timer
    useEffect(() => {
        if (!currentStep) {
            return;
        }

        if (currentTimerLeft > 0) {
            const timer = setTimeout(() => {
                setCurrentTimerLeft(currentTimerLeft - 1);
                setTotalTimerLeft(totalTimerLeft - 1);
            }, 1000);
            return;
        }

        if (totalTimerLeft > 0) {
            setCurrentTimerLeft(currentTimer);
            recountTotalTimer();
            nextStep();
        }
    }, [currentTimerLeft, totalTimerLeft, currentStep, currentTimer, recountTotalTimer, nextStep])

        

    const currentTotalTimerAngle = (totalTimerLeft / totalTimer) * 360;
    const currentTimerAngle = (currentTimerLeft / currentTimer) * 360;

    return {
        currentStep,
        currentTotalTimerAngle,
        currentTimerAngle,
    }
}
