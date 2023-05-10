import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { BtnMain } from "../buttons";
import { MdReorder, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import { Slide } from "../../../util/entrance-animation";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMobile] = useMediaQuery("(max-width: 640px)");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const navigate = useNavigate()

  const loginNav = () => {
    navigate("/login")
  }
  const signupNav = () => {
    navigate("/signup")
  }
  const homeNav = () => {
    navigate("/")
  }

  const MobileControlToggler = () => {
    const controlToggleHandler = () => {
      setIsDropdownActive(!isDropdownActive);
    };

    return (
      <Button onClick={controlToggleHandler}>
        {isDropdownActive ? (
          <MdKeyboardArrowUp fontSize="2em" />
        ) : (
          <MdReorder fontSize="2em" />
        )}
      </Button>
    );
  };

  return (
    <Flex
      w="100vw"
      h="3.4em"
      boxShadow="0 1px 0px"
      bg="block"
      justifyContent="space-between"
      alignItems="center"
      px="2em"
      position="relative"
      zIndex="10"
    >
      {isDropdownActive && isMobile && (
        <Box position="absolute">
          <Slide from="top">
            <Flex
              w="100vw"
              h="7em"
              ml="-2em"
              bg="block"
              justifyContent="space-evenly"
              alignItems="center"
              flexDirection="column"
              pos="absolute"
              top="2em"
              boxShadow="0 1px 0px"
            >
              <BtnMain w="5em" onClick={loginNav}>Login</BtnMain>
              <BtnMain w="5em" onClick={signupNav}>SignUp</BtnMain>
            </Flex>
          </Slide>
        </Box>
      )}

      <Box>
        <Text fontSize="1.6em" onClick={homeNav} cursor="pointer">EDUGRAM</Text>
      </Box>
      {isMobile ? (
        <MobileControlToggler />
      ) : (
        <Flex w="15em" justifyContent="space-around">
          <BtnMain onClick={loginNav}>Login</BtnMain>
          <BtnMain onClick={signupNav}>SignUp</BtnMain>
        </Flex>
      )}
    </Flex>
  );
};
