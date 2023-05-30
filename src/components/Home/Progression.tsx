import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";
import { useProgressionUtil } from "../../util/use-progression-util";

export const Progression = () => {
  const {
    currentStep,
    currentTimerLeft,
    currentTimerPercent,
    totalTimerLeft,
    currentTotalTimerPercent,
    toggleStart,
    togglePause,
    isStarted,
    isPaused,
  } = useProgressionUtil();

  return (
    <Flex w="100%" h="35em" flexDir="column" alignItems="center">
      <Flex w="20em" h="20em" justifyContent="center">
        <Box
          w="20em"
          h="20em"
          position="relative"
          cursor="pointer"
          onClick={isStarted ? togglePause : toggleStart}
        >
          <CircularProgress
            value={currentTimerPercent}
            color="circleProgress.inner"
            size="17em"
            thickness="0.5em"
            fontSize="1rem"
            top="1.5em"
            left="1.5em"
            transition="none"
          />
          <CircularProgress
            value={currentTotalTimerPercent}
            color="circleProgress.outer"
            size="20em"
            thickness="0.5em"
            fontSize="1rem"
            position="absolute"
            top="0"
            left="0"
          />
          <Flex w="100%" position="absolute" top="8.5em">
            <Text
              fontSize="2em"
              fontWeight="bold"
              textAlign="center"
              w="100%"
              color="text.violet"
            >
              {!isPaused && isStarted ? currentTimerLeft : "START"}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Flex w="100%" h="2em">
        <Text
          fontSize="2em"
          textAlign="center"
          w="100%"
          color="text.salmon"
          onClick={isPaused ? toggleStart : () => {}}
        >
          {isStarted && isPaused ? "STOP" : totalTimerLeft}
        </Text>
      </Flex>
      <Text fontSize="1.5em" color="text.salmon" textAlign="center" mt="1em">
        You Have not ran today
      </Text>
      <Text fontSize="1.5em" color="text.violet" textAlign="center" mt="1em">
        Total length ran : 0.0km
      </Text>
    </Flex>
  );
};
