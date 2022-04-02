import React, { useContext, useState } from "react";
import { Flex, Box,Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/authContext";
import Sidebar from "../../components/Sidebar/Sidebar.component";
import ProductsTable from "./../../components/ProductsTable/ProductsTable.component";
import productContext from "./../../context/productContext";
import { hasAuthenticatedUser } from './../../utils/hasUser';

function Products() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
const [selected, setSelected] = useState([])
if(!hasAuthenticatedUser()){
    return(
      <Flex>
        <Text>
          You are not logged in please log in!
        </Text>
      </Flex>
    )
}  

return (
    <Flex>
      <productContext.Provider value={{selected, setSelected}}>
        <Sidebar />
        <ProductsTable />
      </productContext.Provider>
    </Flex>
  );
}

export default Products;
