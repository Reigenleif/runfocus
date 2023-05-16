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
  const homeNav = () => {
    navigate("/")
  }
  

  return (
    <Flex
      w="100vw"
      h="4em"
      justifyContent="center"
      alignItems="center"
      px="2em"
      position="relative"
      zIndex="10"
      bg="block"
    >
      <Box>
        <Text fontSize="3em" onClick={homeNav} cursor="pointer" color="white" fontWeight="bold" textAlign="center">Runfocus</Text>
      </Box>
    </Flex>
  );
};
