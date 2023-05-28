import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";

export const Progression = () => {
  return (
    <Flex w="100%" h="35em" flexDir="column" alignItems="center">
      <Flex w="20em" h="20em" justifyContent="center">
        <Box w="20em" h="20em" position="relative">
          <CircularProgress
            value={80}
            color="circleProgress.inner"
            size="17em"
            thickness="0.5em"
            fontSize="1rem"
            top="1.5em"
            left="1.5em"
          />
          <CircularProgress
            value={90}
            color="circleProgress.outer"
            size="20em"
            thickness="0.5em"
            fontSize="1rem"
            position="absolute"
            top="0"
            left="0"
          />
          <Flex w="100%" position="absolute" top="8.5em">
            <Text fontSize="2em" fontWeight="bold" textAlign="center" w="100%" color="text.violet">START</Text>
          </Flex>
        </Box>
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
