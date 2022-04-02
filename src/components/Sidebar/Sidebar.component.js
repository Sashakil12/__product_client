import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { HamburgerIcon, PhoneIcon } from "@chakra-ui/icons";

function Sidebar() {
  return (
    <>
      <Flex
        h="100vh"
        bg="blackAlpha.800"
        minW="170px"
        direction="column"
        justify={"start"}
        align="start"
      >
        <Button
          color={"white"}
          ml="2vw"
          variant="unstyled"
          leftIcon={<HamburgerIcon color={"white"} />}
        >
          Product List
        </Button>
        <Button
          color={"white"}
          ml="2vw"
          variant="unstyled"
          leftIcon={<PhoneIcon color={"white"} />}
        >
          Contacts
        </Button>
      </Flex>
    </>
  );
}

export default Sidebar;
