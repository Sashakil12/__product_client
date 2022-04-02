import React, { useContext, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/authContext";
import Sidebar from "../../components/Sidebar/Sidebar.component";
import ProductsTable from "./../../components/ProductsTable/ProductsTable.component";
import productContext from "./../../context/productContext";

function Products() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!auth.authenticated) {
      return navigate("/auth");
    }
    return;
  }, []);
const [selected, setSelected] = useState([])
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
