import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdReorder,
} from "react-icons/md";
import {
  RunningSequenceStepInfo,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useDrag, useDrop } from "react-dnd";
import { EditorUtilType } from "../../util/use-editor-util";

export const RunningStepTabDrop = ({
  swapStep,
  index,
}: {
  swapStep: (i:number, j:number) => void;
  index: number;
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "seq",
    drop: (item: { step: RunningStepType; index: number }) => {
        swapStep(item.index, index);
        console.log(item.index, index)
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  });

  return <Box w="100%" h={isOver ? "4em" : "1.5em"} ref={drop} />;
};

const ReorderButtons = ({
  editorUtil,
  index,
}: {
  editorUtil: EditorUtilType;
  index: number;
}) => {
  const { deleteStep, insertStep } = editorUtil;

  if (!editorUtil.seqState) {
    return <div />;
  }
  const currentStepInfo = editorUtil.seqState[index];
  const numberOfSteps = editorUtil.seqState.length || 0;
  const shiftBackward =
    index > 0
      ? () => {
          deleteStep(index);
          insertStep(index - 1)(currentStepInfo);
        }
      : () => {};
  const shiftForward =
    index < numberOfSteps - 1
      ? () => {
          deleteStep(index);
          insertStep(index + 1)(currentStepInfo);
        }
      : () => {};

  return (
    <Flex flexDir="column" w="2em" alignItems="center">
      <Box onClick={shiftBackward} cursor="pointer">
        {" "}
        <MdKeyboardArrowUp size="1.5em" color="black" />
      </Box>
      <Box onClick={shiftForward} cursor="pointer">
        {" "}
        <MdKeyboardArrowDown size="1.5em" color="black" />
      </Box>
    </Flex>
  );
};

export const RunningStepTab = ({
  runningStepInfo,
  runningStep,
  index,
  editorUtil,
}: {
  runningStepInfo: RunningSequenceStepInfo;
  runningStep: RunningStepType;
  index: number;
  editorUtil: EditorUtilType;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "seq",
    item: {
      step: runningStep,
      index: index,
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const { isReordering, swapStep } = editorUtil;

  return (
    <>
      <RunningStepTabDrop
        swapStep = {swapStep}
        index={index}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx="1em"
        p="1em"
        h="3em"
        border="1px solid rgba(0,0,0,0.2)"
        borderRadius="5px"
        boxShadow="4px 4px 4px rgba(0,0,0,0.25)"
        ref={drag}
        display={isDragging ? "none" : "flex"}
      >
        <Image src={runningStepInfo.img} w="2em" h="2em" />
        <Text>{`${runningStep.duration} ${runningStepInfo.name} x${runningStep.reps}`}</Text>
        {isReordering ? (
          <ReorderButtons editorUtil={editorUtil} index={index} />
        ) : (
          <MdReorder size="2em" />
        )}
      </Flex>
    </>
  );
};
