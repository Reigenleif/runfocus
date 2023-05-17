import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { MdReorder } from "react-icons/md";
import {
  RunningSequenceStepInfo,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useDrag, useDrop } from "react-dnd";

export const RunningStepTabDrop = ({
  insertStep,
  deleteStep,
}: {
  insertStep: (step: RunningStepType) => void;
  deleteStep: (at: number) => void;
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "seq",
    drop: (item: { step: RunningStepType; index: number }) => {
      insertStep(item.step);
      deleteStep(item.index + 1);
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  });

  return <Box w="100%" h={isOver ? "4em" : "1.5em"} ref={drop} />;
};

export const RunningStepTab = ({
  runningStepInfo,
  runningStep,
  insertStep,
  deleteStep,
  index,
  isReordering
}: {
  runningStepInfo: RunningSequenceStepInfo;
  runningStep: RunningStepType;
  insertStep: (step: RunningStepType) => void;
  deleteStep: (at: number) => void;
  index: number;
  isReordering: boolean;
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

  return (
    <>
      <RunningStepTabDrop insertStep={insertStep} deleteStep={deleteStep} />
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
        {isReordering ?  : <MdReorder size="2em" /> }
      </Flex>
    </>
  );
};
