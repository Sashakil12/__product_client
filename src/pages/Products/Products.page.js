import React,{useContext} from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../context/authContext';

function Products() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!auth.authenticated) {
      return navigate("/auth");
    }

    return;
  }, [auth]);

  return (
    <Flex>
      <Box h="100vh" bg="darkgray" width="15vw">
        Sidebar
      </Box>
      <Box h="100vh" bg="white" width="90vw">
        main
      </Box>
    </Flex>
  );
}

export default Products;
