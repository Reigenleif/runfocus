import { Box, Flex, Text } from "@chakra-ui/react";
import { EditorUI } from "../components/Editor/EditorUI";

export const EditorPage = () => {
  return (
    <Box bg="block" w="100vw" minH = "100vh">
      <Flex w="min(30em,90%)" flexDir="column" mx="auto">
        <Text w="100%" textAlign="center"> Running Sequence Editor</Text>
      </Flex>
      <EditorUI/>
    </Box>
  );
};
