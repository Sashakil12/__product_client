import logo from "./logo.svg";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component.js";
function App() {
  return (
    <>
    <Navbar/>
      <Flex>
        <Box h="100vh" bg="darkgray" width="15vw">
          Sidebar
        </Box>
        <Box h="100vh" bg="white" width="90vw">
          main
        </Box>
      </Flex>
    </>
  );
}

export default App;
