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
import { AuthContext } from "../../context/authContext.js";

function Auth() {
  return (
    <Center mt="3vh" minW="80vw">
      <Tabs data-testid="auth-tab">
        <TabList justifyContent={"center"}>
          <Tab data-testid="login-tab">Log In</Tab>
          <Tab data-testid="signup-tab">Sign Up</Tab>
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
