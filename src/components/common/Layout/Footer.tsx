import { Box, Flex } from "@chakra-ui/react";
import { MdFormatListBulleted, MdHome } from "react-icons/md";
import theme from "../../../theme";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const nav = useNavigate()

    const homeClickHandler = () => {
        nav("/")
    }

    const settingsClickHandler = () => {
        nav("/settings")
    }

    const isHome = window.location.pathname === "/"
    const isSettings = window.location.pathname === "/settings"
  return (
    <Flex
      w="100%"
      h="4em"
      justifyContent="space-evenly"
      alignItems="center"
      px="2em"
      position="absolute"
      top="calc(100vh - 4em)"
      zIndex="10"
      bg="block"
    >
      <Box _hover={{cursor:"pointer"}} onClick={homeClickHandler}>
        <MdHome size="2em" color={isHome ? theme.colors.iconActive : "white"} />
      </Box>
      <Box bg="white" w="1px" h="70%"/>
      <Box _hover={{cursor:"pointer"}} onClick={settingsClickHandler}>
        <MdFormatListBulleted size="2em" color={isSettings ? theme.colors.iconActive : "white"} />
      </Box>
    </Flex>
  );
};
