import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface layoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <Box fontFamily="'Arimo', sans-serif" fontWeight="bold" maxHeight="100vh">
      <Navbar />
      {children}
      <Footer/>
    </Box>
  );
};

export default Layout;
