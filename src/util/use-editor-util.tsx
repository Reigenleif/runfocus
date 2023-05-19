import { useState, useEffect } from "react";
import {
  RunningSequence,
  RunningStepType,
  useSettingActions,
} from "./redux/settingSlice";
import { useSelector } from "react-redux";
import { SettingState } from "./redux/settingSlice";

export const UseEditorUtil = ({}) => {
  const [seqState, setSeqState] = useState<RunningStepType[]>();
  const [isReordering, setIsReordering] = useState(false);

  const { setting } = useSelector((s: { setting: SettingState }) => s);

  useEffect(() => {
    if (setting.runningSequenceID) {
      setSeqState((s) => {
        const newSeq = setting.runningSequenceList.find(
          (v: RunningSequence) => v.id === setting.runningSequenceID
        );
        if (!newSeq) {
          return s;
        }
        return newSeq.steps;
      });
    } else {
      setSeqState(setting.runningSequenceList[0].steps);
    }
  }, [setting]);

  const addStep = (step: RunningStepType) => {
    setSeqState((st) => {
      if (!st) {
        return st;
      }
      let s: RunningStepType[] = [...st];
      s.push(step);
      return s;
    });
  };

  const insertStep = (at: number) => (step: RunningStepType) => {
    setSeqState((st) => {
      if (!st) {
        return st;
      }
      let s: RunningStepType[] = [...st];
      s.splice(at, 0, step);
      return s;
    });
  };

  const deleteStep = (at: number) => {
    setSeqState((s) => {
      if (!s) {
        return;
      }
      console.log(at);
      const newSteps = s.filter((v, i) => i != at);
      return newSteps;
    });
  };

  const swapStep = (i: number, j: number) => {
    if (seqState && j == seqState.length) {
      addStep(seqState[i]);
      deleteStep(i);
    } else if (seqState && i == seqState.length) {
      addStep(seqState[j]);
      deleteStep(j);
    }

    setSeqState((s) => {
      if (!s) {
        return;
      }
      const newSteps = [...s];
      const temp = newSteps[i];
      newSteps[i] = newSteps[j];
      newSteps[j] = temp;
      return newSteps;
    });
  };

  const toggleReordering = () => {
    setIsReordering((v) => !v);
  };
  return {
    seqState,
    isReordering,
    setIsReordering,
    setSeqState,
    addStep,
    insertStep,
    deleteStep,
    toggleReordering,
    swapStep,
  };
};

export type EditorUtilType = ReturnType<typeof UseEditorUtil>;
