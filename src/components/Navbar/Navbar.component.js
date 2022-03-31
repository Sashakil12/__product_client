import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    
      <Flex
        bg="green.500"
        h="10vh"
        align="center"
        as="nav"
        justify="space-evenly"
      >
        <Link to="/">
          <Box as="span" color="white">
            Home
          </Box>
        </Link>
        <Link to="/products">
          <Box as="span" color="white">
            Products
          </Box>
        </Link>
        <Link to="/login">
          <Box as="span" color="white">
            Login
          </Box>
        </Link>
        <Link to="/logout">
          <Box as="span" color="white">
            logout
          </Box>
        </Link>
        
      </Flex>
    
  );
}

export default Navbar;
