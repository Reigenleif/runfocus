import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  RunningSequence,
  RunningSequenceStepInfo,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RunningStepTab } from "./RunningStepTab";


interface EditorState {
  seq: RunningSequence;
}

const BLANK_EDITOR_STATE: EditorState = {
  seq: {
    id: 0,
    name: "BLANK",
    steps: [],
  },
};


export const EditorUI = () => {
  const [state, setState] = useState<EditorState>();
  const { setting } = useSelector((state: any) => state);
  useEffect(() => {
    if (setting.runningSequenceID) {
      setState({
        seq: setting.runningSequenceList.find(
          (sequ: RunningSequence) => sequ.id === setting.runningSequenceID
        ),
      });
    } else {
      setState({ seq: setting.runningSequenceList[0] });
    }
  }, [setting]);
  if (!state) {
    return <div />;
  }

  const addStep = (step: RunningStepType) => {
    setState((s) => {
      s?.seq.steps.push(step)
      return s;
    })
  }

  const insertStep = (at: number) => (step: RunningStepType) => {
    setState((st) => {
      if (!st) {
        return st
      }
      let s: RunningStepType[] = [...st.seq.steps]
      console.log(s)
      s.splice(at,0,step);
      const newSt: EditorState = {...st,seq : { 
        ...st.seq,
        steps: s
      }}
      return newSt
    })
  }

  const deleteStep = (at: number) => {
    setState((s) => {
      if(!s) {
        return
      }
      const newSteps= s.seq.steps.filter((v,i) => i != at);
      if (newSteps) {
        s.seq.steps = newSteps
      }
      return s 
    })
  }

  return (
    <Flex  mt="1em" alignItems="center" w="100%" flexDir="column">
      <Box w="min(30em,90%)" borderRadius="5px" bg="white" h="65vh" overflowY="scroll">
        {state.seq.steps.map((step, i) => {
          return (
            <RunningStepTab
              runningStep={step}
              runningStepInfo={setting.runningStepInfo.find(
                (v: RunningSequenceStepInfo) => v.id === step.id
              )}
              insertStep={insertStep(i)}
              deleteStep={deleteStep}
              key={i}
              index={i}
            />
          );
        })}
        
      </Box>
      <Flex w="min(30em,90%)" justifyContent="space-between">

      </Flex>
    </Flex>
  );
};
