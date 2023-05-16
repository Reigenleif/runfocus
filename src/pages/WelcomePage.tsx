import { Box, Flex, Text } from "@chakra-ui/react";
import { SettingSlice, useSettingActions } from "../util/redux/settingSlice";
import {useSelector} from "react-redux"

export const WelcomePage = () => {
  return (
    <Flex mt="4em" alignItems="center" flexDirection="column">
      <Text fontSize="4em">Welcome!</Text>
      <Text fontSize="1.6em" color="rgba(0,0,0,.6)">
        {"Fiction Institute of Technolgy’s\n#1 Learning Management System"}
      </Text>
    </Flex>
  );
};
