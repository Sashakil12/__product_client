import React from 'react'
import { Flex,Box } from '@chakra-ui/react';

function Products() {
  return (
    <Flex>
    <Box h="100vh" bg="darkgray" width="15vw">
      Sidebar
    </Box>
    <Box h="100vh" bg="white" width="90vw">
      main
    </Box>
  </Flex>
  )
}

export default Products