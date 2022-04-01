import React,{useContext} from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../context/authContext';
import Sidebar from "../../components/Sidebar/Sidebar.component";

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
      <Sidebar/>
      <Box h="100vh" bg="white" width="90vw">
        main
      </Box>
    </Flex>
  );
}

export default Products;
