import { Button } from "@chakra-ui/react";

interface BtnMainProps {
  isSelected?: boolean;
  children: JSX.Element | string;
  [key: string]: any
}
export const BtnMain = ({ isSelected, children, ...props }: BtnMainProps) => {
  return (
    <Button
      bg={isSelected ? "fb" : "cloud"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="10px"
      border="0.1px solid black"
      h="1.8em"
      pb="0.2em"
      px="1.2em"
      color={isSelected ? "white" : "black"}
      fontSize="1.2em"
      {...props}
      _hover={{ bg: "clouder", border: "0.1px solid black"}}
      _active={{ bg: "fb", border: "0.1px solid black"}}
    >
      {children}
    </Button>
  );
};
