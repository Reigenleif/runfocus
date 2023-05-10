import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/Layout";
import { LoginPage } from "./pages/LoginPage";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
