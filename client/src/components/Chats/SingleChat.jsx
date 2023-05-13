import React from "react";
import { ChatState } from "../../context/context";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { getSender, getSenderFull } from "../../config/Chatlogics";
import ProfileModal from "../Misc/Profile.modal";
import UpdateGroupChatModal from "../Misc/UpdateGroupChatModal";
const SingleChat = () => {
  const { fetchAgain, setFetchAgain, user, selectedChat, setSelectedChat } =
    ChatState();

  return selectedChat ? (
    <>
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        {" "}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<FaArrowAltCircleLeft />}
          onClick={() => setSelectedChat("")}
        />
        {!selectedChat.isGroupChat ? (
          <>
            {getSender(user, selectedChat.users)}
            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
          </>
        ) : (
          <>
            {selectedChat.chatName.toUpperCase()}
            {<UpdateGroupChatModal />}
          </>
        )}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-end"}
        p={3}
        bg={"green.100"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        // overflowY={"hidden"}
      ></Box>
    </>
  ) : (
    <>
      {" "}
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        margin={"auto"}
        justifyContent={{ base: "center" }}
        alignItems="center"
      >
        {"Hello Start Your chat...:)"}
      </Text>
    </>
  );
};

export default SingleChat;
