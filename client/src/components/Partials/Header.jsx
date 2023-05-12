import React from "react";

import {
  Avatar,
  Box,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Box>
      <HStack justify={"space-around"} gap={20}>
        <Box>
          <InputGroup>
            <Input placeContent={"Search"}></Input>
          </InputGroup>
        </Box>
        <Box>
          <Heading>Conversate</Heading>
        </Box>
        <HStack>
          <IconButton>Bell</IconButton>
          <Avatar></Avatar>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
