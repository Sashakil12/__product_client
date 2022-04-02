import React, { useContext } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Text,
  Spinner,
  Checkbox,
  Button,
  Box,
} from "@chakra-ui/react";
import usePagination from "../../hooks/usePagination";
import { useQuery } from "react-query";
import { fetchProducts } from "../../reactQueryFunctions/productList";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import AddProduct from "../AddProduct/AddProduct.component";
import DeleteProduct from "../DeleteProduct/DeleteProduct.components";
import productContext from "./../../context/productContext";
import SelectProduct from "./../SelectProduct/SelectProduct.component";
import UpdateProduct from "./../UpdateProduct/UpdateProduct.components";

function ProductsTable() {
  const { limit, skip, setSkip, setLimit } = usePagination(10, 0);
  const products = useQuery(["fetch-products", limit, skip], fetchProducts);
  const productCtx = useContext(productContext);
  if (products.isLoading) {
    return (
      <Center>
        <Spinner ml="35vw" size="xl" />
      </Center>
    );
  }
  if (products.isError) {
    return (
      <Flex justify="center">
        <Text mx="auto" fontSize="lg">
          {products.error.message || "Sorry! Can't not show products"}
        </Text>
      </Flex>
    );
  }

  return (
    <Box data-testid="product-table" bg="white" width="90vw">
      <TableContainer>
        {products.data.length === 0 ? (
          <Center>
            <Text fontSize="lg">No products!</Text>
          </Center>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th> Product Name</Th>
                <Th isNumeric>Category ID</Th>
                <Th>Category Name</Th>
                <Th isNumeric>Unit Price</Th>
                <Th>Status</Th>
                <Th>Available since</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.data.map((product, i) => (
                <>
                  <Tr key={product.name + i}>
                    <Td>
                      <SelectProduct id={product._id} key={"chk" + i} />
                      {product.name}
                    </Td>
                    <Td isNumeric>{product.categoryId}</Td>
                    <Td>{product.categoryName}</Td>
                    <Td isNumeric>{product.unitPrice}</Td>
                    <Td>{product.status}</Td>
                    <Td>{dayjs(product.createdAt).format("DD/MM/YYYY")}</Td>
                    <Td>
                      <UpdateProduct
                        limit={limit}
                        skip={skip}
                        key={"update" + i}
                        product={product}
                      />
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
        )}
        <Flex m="2vh" justify={"start"}>
          <Button
            onClick={() => setSkip(skip === 0 ? 0 : skip - limit)}
            m="1px"
            leftIcon={<ChevronLeftIcon />}
          >
            Prev
          </Button>
          <Button
            onClick={() => setSkip(skip + limit)}
            m="1px"
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </Flex>
        <Flex m="2vh" justify={"start"}>
          <AddProduct data-testid="add-product" />
          <DeleteProduct
            data-testid="delete-product"
            limit={limit}
            skip={skip}
          />
        </Flex>
      </TableContainer>
    </Box>
  );
}

export default ProductsTable;
