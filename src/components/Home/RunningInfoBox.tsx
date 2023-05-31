import { Flex, Image, Text } from "@chakra-ui/react";
import {
  RunningSequence,
  RunningStepType,
} from "../../util/redux/settingSlice";
import { useSelector } from "react-redux";
import { rootStateType } from "../../util/redux/store";

export interface RunningInfoBoxProps {
  sequence: RunningSequence;
  currentStep: RunningStepType | undefined;
}

export const RunningInfoBox = ({
  sequence,
  currentStep,
}: RunningInfoBoxProps) => {
  const setting = useSelector((state: rootStateType) => state.setting);

  const currentStepInfo = !currentStep
    ? null
    : setting.runningStepInfo.find(
        (stepInfo) => stepInfo.id === currentStep.id
      );

  return (
    <Flex w="100%" alignItems="center" flexDirection="column">
      <Text color="text.salmon" fontSize="1.5em">
        {sequence.name}
      </Text>
      {!currentStepInfo ? (
        <Flex w="20em" h="4em" />
      ) : (
        <Flex w="min(20em,90%)" h="4em" justifyContent="space-evenly" alignItems="center">
          <Image src={currentStepInfo.img} w="1.5em" h="1.5em" borderRadius="5px" />
          <Text >{currentStepInfo.name}</Text>
          <Text >{`x${currentStep!.reps}`}</Text>
        </Flex>
      )}
    </Flex>
  );
};
