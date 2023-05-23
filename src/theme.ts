import { extendTheme } from "@chakra-ui/react";

export const colors = {
  blue : {
    100: "#B4E1FF",
  },
  block : "#B4E1FF",
  iconActive : "#736CED",
  btnHover: "#E5E5E5",
  btnColor: {
    1: "#736CED",
  },
  circleProgress: {
    inner: "#736CED",
    outer: "#4ADE00",
  }
};

const theme = extendTheme({ colors });

export default theme