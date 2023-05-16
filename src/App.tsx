import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/Layout";
import { LoginPage } from "./pages/LoginPage";
import { WelcomePage } from "./pages/WelcomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { EditorPage } from "./pages/EditorPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/editor" element={<EditorPage/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
