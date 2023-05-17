import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  RunningSequence,
  RunningSequenceStepInfo,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RunningStepTab } from "./RunningStepTab";
import { BtnEdit } from "./EditorButtons";
import { MdAddCircleOutline, MdCached, MdDelete } from "react-icons/md";
import { colors } from "../../theme";


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
  const [seq, setSeq] = useState<RunningSequenceType>();
  const [isReordering, setIsReordering] = useState(false);
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
              isReordering={isReordering}
            />
          );
        })}
        
      </Box>
      <Flex w="min(30em,90%)" justifyContent="space-between" my="1em">
        <BtnEdit Mdi={MdCached} color="black" onClick={toggleReordering}/>
        <BtnEdit Mdi={MdAddCircleOutline} color={colors.btnColor[1]} onClick={() => {}}/>
        <BtnEdit Mdi={MdDelete} color="salmon" onClick={() => {}}/>
      </Flex>
    </Flex>
  );
};
