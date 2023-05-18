import { useState, useEffect } from "react";
import {
  RunningSequence,
  RunningStepType,
  useSettingActions,
} from "../../util/redux/settingSlice";
import { useSelector } from "react-redux";
import { SettingState } from "../../util/redux/settingSlice";

export const UseEditorUtil = ({}) => {
  const [seqState, setSeqState] = useState<RunningStepType[]>();
  const [isReordering, setIsReordering] = useState(false);

  const setting = useSelector((s: SettingState) => s);

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
    setSeqState((s) => {
      s?.push(step);
      return s;
    });
  };

  const insertStep = (at: number) => (step: RunningStepType) => {
    setSeqState((st) => {
      if (!st) {
        return st;
      }
      let s: RunningStepType[] = [...st];
      console.log(s);
      s.splice(at, 0, step);
      const newSt: RunningStepType[] = [...st];
      return newSt;
    });
  };

  const deleteStep = (at: number) => {
    setSeqState((s) => {
      if (!s) {
        return;
      }
      const newSteps = s.filter((v, i) => i != at);
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
  };
};
