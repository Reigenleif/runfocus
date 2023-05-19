import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  RunningSequence,
  RunningSequenceStepInfo,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RunningStepTab, RunningStepTabDrop } from "./RunningStepTab";
import { BtnEdit } from "./EditorButtons";
import { MdAddCircleOutline, MdCached, MdDelete } from "react-icons/md";
import { colors } from "../../theme";
import { UseEditorUtil } from "../../util/use-editor-util";

export const EditorUI = () => {
  const editorUtil = UseEditorUtil({});
  const { seqState, toggleReordering, swapStep, deleteStep } = editorUtil;

  const { setting } = useSelector((state: any) => state);

  if (!seqState) {
    return <div />;
  }

  console.log(seqState)

  return (
    <Flex mt="1em" alignItems="center" w="100%" flexDir="column">
      <Box
        w="min(30em,90%)"
        borderRadius="5px"
        bg="white"
        h="65vh"
        overflowY="scroll"
      >
        {seqState.map((step: RunningStepType, i) => {
          return (
            <RunningStepTab
              runningStep={step}
              runningStepInfo={setting.runningStepInfo.find(
                (v: RunningSequenceStepInfo) => v.id === step.id
              )}
              editorUtil={editorUtil}
              key={i}
              index={i}
            />
          );
        })}
        <RunningStepTabDrop swapStep={swapStep} index={seqState.length} />
      </Box>
      <Flex w="min(30em,90%)" justifyContent="space-between" my="1em">
        <BtnEdit Mdi={MdCached} color="black" onClick={toggleReordering} />
        <BtnEdit
          Mdi={MdAddCircleOutline}
          color={colors.btnColor[1]}
          onClick={() => {}}
        />
        <BtnEdit Mdi={MdDelete} color="salmon" onClick={() => {}} />
      </Flex>
    </Flex>
  );
};
