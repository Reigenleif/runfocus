import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

interface layoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
