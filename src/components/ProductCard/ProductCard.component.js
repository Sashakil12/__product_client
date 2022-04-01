import {
  Image,
  Box,
  Button,
  Text,
  Tag,
  Badge,
  Flex,
  TagLeftIcon,
  Icon,
} from "@chakra-ui/react";
import { IoMdPricetag } from "react-icons/io";
import { AiTwotoneStar } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";

import { Link, navigate } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log(product);

  return (
    <Flex
      data-testid="product-card"
      direction="column"
      alignItems="center"
      flexBasis={["100%", "50%", "30%"]}
      bg="green"
      p={5}
      borderRadius={5}
      m={5}
    >
      <Text my={5} fontSize="xl" color="white">
        {product.name}
      </Text>
      <Flex justify="space-between" wrap="wrap">
        <Tag my={1} size="lg">
          <TagLeftIcon as={IoMdPricetag} />${product.unitPrice}
        </Tag>
        <Tag my={1} size="lg">
          <TagLeftIcon as={IoBagHandleOutline} />
          {product.categoryMName}
        </Tag>
      </Flex>
    </Flex>
  );
}
