import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Flex
      data-testId="navbar"
      bg="green.500"
      h="10vh"
      align="center"
      as="nav"
      justify="space-evenly"
    >
      <Link to="/"  data-testId="home-link">
        <Box as="span" color="white">
          Home
        </Box>
      </Link>
      <Link to="/products" data-testId="products-link">
        <Box as="span" color="white">
          Products
        </Box>
      </Link>
      <Link to="/login" data-testId="login-link">
        <Box as="span" color="white">
          Login
        </Box>
      </Link>
      <Link to="/logout" data-testId="logout-link">
        <Box as="span" color="white">
          logout
        </Box>
      </Link>
    </Flex>
  );
}

export default Navbar;
