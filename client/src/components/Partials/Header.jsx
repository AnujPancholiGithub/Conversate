import React from "react";

import {
  Avatar,
  Box,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import SideDrawar from "./SideDrawar";
import { AiOutlineBell } from "react-icons/ai";
import { ChatState } from "../../context/context";
import ProfileModal from "../Misc/Profile.modal";

const Header = () => {
  const { user } = ChatState();

  console.log("userInfi:", user);
  return (
    <Box>
      <HStack justify={"space-around"} gap={20}>
        <Box>
          <SideDrawar />
        </Box>
        <Box>
          <Heading>Conversate</Heading>
        </Box>
        <HStack>
          <Menu>
            <MenuButton>
              <IconButton variant={"ghost"} boxSize={6} as={AiOutlineBell} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton>
              <Avatar boxSize={8} cursor={"pointer"} name={user.name}></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
