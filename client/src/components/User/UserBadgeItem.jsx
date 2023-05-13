import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";

const UserBadgeItem = ({ user, handelDelete }) => {
  console.log("profile", user);
  return (
    <>
      <Flex gap={1} width={"50%"}>
        <Avatar
          flex={2}
          size={"sm"}
          src={
            user.profile
              ? user.profile
              : "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png"
          }
        />
        <Box flex={10} fontSize={"sm"} size={"sm"} ml="3">
          <Text cursor={"progress"} fontSize={"sm"} fontWeight="bold">
            {user.name}
            <Badge
              cursor={"pointer"}
              size={"sm"}
              ml="1"
              colorScheme="red"
              onClick={() => handelDelete()}
            >
              X
            </Badge>
          </Text>
          <Text fontSize="sm">UI Engineer</Text>
        </Box>
      </Flex>
    </>
  );
};

export default UserBadgeItem;
