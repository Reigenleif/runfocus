import { Flex } from "@chakra-ui/react";
import { Md10Mp } from "react-icons/md";

interface BtnEditProps {
  onClick: () => void;
  Mdi: typeof Md10Mp;
  color: string;
}

export const BtnEdit = ({ onClick, Mdi, color }: BtnEditProps) => {
  return (
    <Flex
      onClick={onClick}
      cursor="pointer"
      bg="white"
      borderRadius="5px"
      w="30%"
      py="0.2em"
      justifyContent="center"
      alignItems="center"
      transition="0.3s"
      _hover={{ bg: "btnHover" }}
    >
      <Mdi size="2em" color={color} />
    </Flex>
  );
};

interface ReorderButtons {
    EditorKit: 
}