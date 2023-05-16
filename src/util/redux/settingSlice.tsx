import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export interface RunningSequenceStepInfo {
    id: number,
    name: string,
    img: string,
} 

export interface RunningStepType {
    id: number,
    duration: number,
    reps: number,
}

export interface RunningSequence {
    id: number,
    name: string,
    steps: RunningStepType[],
}

export interface SettingState {
    timerVoiceNotification: boolean,
    timerRingtone: boolean,
    timerVibration: boolean,
    runningSequenceID: number | null,
    runningSequenceList: RunningSequence[],
    runningStepInfo: RunningSequenceStepInfo[],
}

const DUMMY_SEQUENCE_INFO: RunningSequenceStepInfo[] = [
    {
      id: 0,
      name: "Jogging",
      img: "/running.png",
    },
    {
      id: 1,
      name: "Walking",
      img: "/running.png",
    },
    {
      id: 2,
      name: "Sprinting",
      img: "/running.png",
    },
  ];
  
  const DUMMY_SEQUENCE_DATA: RunningSequence[] = [
    {
      id: 0,
      name: "Morning Jog",
      steps: [
        {
          id: 0,
          duration: 60,
          reps: 3,
        },
        {
          id: 1,
          duration: 30,
          reps: 3,
        },
      ],
    },
    {
      id: 1,
      name: "Evening Run",
      steps: [
        {
          id: 2,
          duration: 60,
          reps: 3,
        },
        {
          id: 1,
          duration: 30,
          reps: 3,
        },{
          id: 2,
          duration: 60,
          reps: 4,
        },
        {
          id: 1,
          duration: 30,
          reps: 5,
        },{
          id: 2,
          duration: 60,
          reps: 3,
        },
        {
          id: 1,
          duration: 30,
          reps: 3,
        },{
          id: 2,
          duration: 60,
          reps: 4,
        },
        {
          id: 1,
          duration: 30,
          reps: 5,
        },{
          id: 2,
          duration: 60,
          reps: 3,
        },
        {
          id: 1,
          duration: 30,
          reps: 3,
        },{
          id: 2,
          duration: 60,
          reps: 4,
        },
        {
          id: 1,
          duration: 30,
          reps: 5,
        },{
          id: 2,
          duration: 60,
          reps: 3,
        },
        {
          id: 1,
          duration: 30,
          reps: 3,
        },{
          id: 2,
          duration: 60,
          reps: 4,
        },
        {
          id: 1,
          duration: 30,
          reps: 5,
        },
      ],
    },
  ];

const INITIAL_SETTING: SettingState = {
    timerVoiceNotification: true,
    timerRingtone: true,
    timerVibration: true,
    runningSequenceID: 1,
    runningSequenceList: DUMMY_SEQUENCE_DATA,
    runningStepInfo: DUMMY_SEQUENCE_INFO,
}

export const SettingSlice = createSlice({
    name: "setting",
    initialState: INITIAL_SETTING,
    reducers: {
        toggleTimerVoiceNotification(s) {
            s.timerVoiceNotification = !s.timerVoiceNotification
        },
        toggleTimerRingtone(s) {
            s.timerRingtone = !s.timerRingtone
        },
        toggleTimerVibration(s) {
            s.timerVibration = !s.timerVibration
        },
        setRunningSequence(s, a: {payload: number}) {
            s.runningSequenceID = a.payload
        },
        addRunningSequence(s, a : {payload: RunningSequence}) {
            a.payload.id = s.runningSequenceList.length
            s.runningSequenceList.push(a.payload)
        },
        removeRunningSequenceByID(s, a : {payload: number}) {
            s.runningSequenceList = s.runningSequenceList.filter((v) => v.id !== a.payload)
        },
        editRunningSequenceByID(s, a : {payload: RunningSequence}) {
            s.runningSequenceList = s.runningSequenceList.map((v) => v.id === a.payload.id ? a.payload : v)
        },
       
    }
})

export const SettingActions = SettingSlice.actions


export const useSettingActions = () => {
    const dispatch = useDispatch()
    const actions: { [index: string] : any} = {}
    actions.toggleTimerVoiceNotification = () => dispatch(SettingActions.toggleTimerVoiceNotification())
    actions.toggleTimerRingtone = () => dispatch(SettingActions.toggleTimerRingtone())
    actions.toggleTimerVibration = () => dispatch(SettingActions.toggleTimerVibration())
    actions.setRunningSequence = (id: number) => dispatch(SettingActions.setRunningSequence(id))
    actions.addRunningSequence = (runningSequence: RunningSequence) => dispatch(SettingActions.addRunningSequence(runningSequence))
    actions.removeRunningSequenceByID = (id: number) => dispatch(SettingActions.removeRunningSequenceByID(id))
    actions.editRunningSequenceByID = (runningSequence: RunningSequence) => dispatch(SettingActions.editRunningSequenceByID(runningSequence))
    return actions
}