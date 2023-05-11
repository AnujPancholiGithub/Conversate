import React, { useState } from "react";
import { ChatState } from "../context/context";
import { Button, Box } from "@chakra-ui/react";
import SideDrawar from "../components/Partials/SideDrawar";
import MyChat from "../components/Chats/MyChat";
import ChatBox from "../components/Chats/ChatBox";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box>
      {user && <SideDrawar />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
