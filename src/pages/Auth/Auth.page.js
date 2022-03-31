import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LogIn from './../../components/LogIn/LogIn.component.js';
import SignUp from './../../components/Register/Register.component';


function Auth() {
  return (
    <Tabs>
      <TabList>
        <Tab>Log In</Tab>
        <Tab>Register/ Sign Up</Tab>
        
      </TabList>

      <TabPanels>
        <TabPanel>
          <LogIn/>
        </TabPanel>
        <TabPanel>
          <SignUp/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Auth;
