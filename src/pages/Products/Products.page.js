import React,{useContext} from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../context/authContext';
import Sidebar from "../../components/Sidebar/Sidebar.component";
import ProductsTable from './../../components/ProductsTable/ProductsTable.component';

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
    <Flex >
      <Sidebar/>
      <ProductsTable/>
    </Flex>
  );
}

export default Products;
