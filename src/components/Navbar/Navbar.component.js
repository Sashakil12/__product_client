import React, { useContext } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { sessionInit } from "./../../utils/sessionInit";
import { AuthContext } from "./../../context/authContext";
import LogOut from './../LogOut/LogOut.component';

function Navbar() {
  // useEffect(()=>{
  // //  sessionInit()
  // },[authenticated])
  // console.log(authenticated)
  return (
    <AuthContext.Consumer>
      {({ authenticated, setauthenticated }) => {
        console.log("auth ctx", authenticated);
        return (
          <Flex
            data-testid="navbar"
            bg="green.500"
            h="10vh"
            align="center"
            as="nav"
            justify="space-evenly"
          >
            <Link to="/" data-testid="home-link">
              <Box as="span" color="white">
                Home
              </Box>
            </Link>
            <Link to="/products" data-testid="products-link">
              <Box as="span" color="white">
                Products
              </Box>
            </Link>
            {!authenticated && (
              <Link to="/auth" data-testid="login-link">
                <Box as="span" color="white">
                  Login
                </Box>
              </Link>
            )}
            {authenticated && (
              <LogOut/>
            )}
          </Flex>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Navbar;
