import React from "react";
import { useContext } from "react";
import productContext from "./../../context/productContext";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../../reactQueryFunctions/productList";
function DeleteProduct({ limit, skip }) {
  const productsCtx = useContext(productContext);
  console.log("delete", productsCtx);
  const product = useMutation("delete-product", deleteProduct);
  const qC = useQueryClient();
  const toast = useToast();
  const onClick = () => {
    const key = "delete-expense";
    product.mutate(
      { ids: productsCtx.selected, setSelected: productsCtx.setSelected },
      {
        onSuccess: (data, vars, ctx) => {
          console.log(data, vars, ctx);
          qC.invalidateQueries(["fetch-products", limit, skip]);

          return toast({
            title: "Deleted product(s) successfully...",
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError: (error, vars, ctx) => {
          return toast({
            title: error.message || "Falied to delete product(s)...",
            description: "",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <>
      <Button
        disabled={!productsCtx.selected.length}
        color="white"
        bg="red.500"
        onClick={onClick}
        m="1px"
      >
        Delete Product
      </Button>
    </>
  );
}

export default DeleteProduct;
