import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Image,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import React from "react";

const UserList = ({ user, handleFunction }) => {
  console.log("user in list ", user);
  return (
    <>
      <VStack onClick={handleFunction}>
        <Card>
          <CardBody
            display={"flex"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            bg={"gray.200"}
          >
            <Heading size={"sm"}>{user.name}</Heading>
            <Avatar
              boxSize="20%"
              objectFit="contain"
              src={user.profile}
            ></Avatar>
          </CardBody>
        </Card>
        <Divider />
      </VStack>
    </>
  );
};

export default UserList;
