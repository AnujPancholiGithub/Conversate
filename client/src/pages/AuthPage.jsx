import {
  Container,
  Box,
  Image,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useSearchParams } from "react-router-dom";
const token = localStorage.getItem("token");

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(1);
  useEffect(() => {
    if (token) {
      console.log("Logged in");
    }
  }, []);

  return (
    <Container
      display={"flex"}
      flexDirection="column"
      justifyContent={"space-between"}
      h="100vh"
      w={"100vh"}
    >
      <Box textAlign={"center"} flex={1}>
        <Heading mt={8}>Conversate!</Heading>
      </Box>
      <Box flex={4}>
        <Tabs defaultIndex={tabIndex}>
          <TabList>
            <Tab _selected={{ color: "white", bg: "blue.500" }} flex={1}>
              Login
            </Tab>
            <Tab _selected={{ color: "white", bg: "green.400" }} flex={1}>
              Signup
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <Signup setTabIndex={setTabIndex} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthPage;
