import { useQuery } from "react-query";
import React from "react";
import usePagination from "../../hooks/usePagination";
import { getPublicProducts } from "../../reactQueryFunctions/publicProducts";
import { Center, Spinner, Text, Flex } from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard/ProductCard.component";

function Home() {
  const { limit, skip } = usePagination(20, 0);
  const products = useQuery(
    ["list_public_products", limit, skip],
    getPublicProducts,
    { retry: 3 }
  );

  if (products.isLoading) {
    return (
      <Center mt="10vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (products.isError) {
    return (
      <Center mt="10vh">
        <Text fontSize="lg">Sorry! Can't not show products</Text>
      </Center>
    );
  }
  return (
    <>
      <Flex justify="center">
        {products.data.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </Flex>
    </>
  );
}

export default Home;
