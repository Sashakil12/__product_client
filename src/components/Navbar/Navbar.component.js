import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Navbar() {
  return (
    <Router>
    <Flex bg="green.500" h="10vh" align="center" as="nav" justify="space-evenly">
      <Box as="a" color="white" href="/">
        

        
        Home
      </Box>
      <Box as="a" color="white" href="/products">
        Products
      </Box>
      <Box as="a" color="white" href="/login">
        Login
      </Box>
      <Box as="a" color="white" href="/logout">
        Logout
      </Box>
    </Flex>
    </Router>
  );
}

export default Navbar;
