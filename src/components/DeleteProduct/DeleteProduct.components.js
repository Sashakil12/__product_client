import React from "react";
import { useContext } from "react";
import productContext from "./../../context/productContext";
import { Button } from "@chakra-ui/react";

function DeleteProduct() {
  const productsCtx = useContext(productContext);
  console.log("delete", productsCtx);
  
  
  return (
    <>
      <Button
        color="white"
        bg="red.500"
        // onClick={() => setSkip(skip + limit)}
        m="1px"
      >
        Delete Product
      </Button>
    </>
  );
}

export default DeleteProduct;
