import React, { useState } from "react";
import { ChatState } from "../context/context";
import { Button, Box, Heading } from "@chakra-ui/react";
import SideDrawar from "../components/Partials/SideDrawar";
import MyChat from "../components/Chats/MyChat";
import ChatBox from "../components/Chats/ChatBox";

const ChatPage = () => {
  const { user, fetchAgain, setFetchAgain } = ChatState();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      flexDirection={"row"}
      bg={"red"}
    >
      {user && <MyChat />}
      {user && <ChatBox />}
    </Box>
  );
};

export default ChatPage;
