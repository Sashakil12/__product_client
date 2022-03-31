import React from "react";
import {
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import LogIn from "./../../components/LogIn/LogIn.component.js";
import SignUp from "./../../components/Register/Register.component";

function Auth() {
  return (
    <Center mt="3vh" minW="80vw">
      <Tabs>
        <TabList justifyContent={"center"}>
          <Tab>Log In</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LogIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}

export default Auth;
