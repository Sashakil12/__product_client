import React from "react";
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

function ProductsTable() {
  const { limit, skip, setSkip, setLimit } = usePagination(10, 0);
  const products = useQuery(["fetch-products", limit, skip], fetchProducts);

  if (products.isLoading) {
    return (
      <Center>
        <Spinner ml="35vw" size="xl" />
      </Center>
    );
  }
  if (products.isError) {
    return (
      <Center>
        <Text fontSize="lg">Sorry! Can't not show products</Text>
      </Center>
    );
  }

  return (
    <Box bg="white" width="90vw">
      <TableContainer>
        {products.data.length === 0 ? (
          <Center>
            <Text fontSize="lg">No products!</Text>
          </Center>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox mr="2px" />
                  Product Name
                </Th>
                <Th isNumeric>Category ID</Th>
                <Th>Category Name</Th>
                <Th isNumeric>Unit Price</Th>
                <Th>Status</Th>
                <Th>Available since</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.data.map((product, i) => (
                <>
                  
                    
                    <Tr key={product.name + i}>
                      <Td><Checkbox mx="1" />{product.name}</Td>
                      <Td isNumeric>{product.categoryId}</Td>
                      <Td>{product.categoryName}</Td>
                      <Td isNumeric>{product.unitPrice}</Td>
                      <Td>{product.status}</Td>
                      <Td>{dayjs(product.createdAt).format("DD/MM/YYYY")}</Td>
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
          <AddProduct/>
          <Button
            color="white"
            bg="red.500"
            onClick={() => setSkip(skip + limit)}
            m="1px"
          >
            Delete Product
          </Button>
        </Flex>
      </TableContainer>
    </Box>
  );
}

export default ProductsTable;
