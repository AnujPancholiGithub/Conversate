import React from "react";
import { ChatState } from "../../context/context";
import { IconButton, Text } from "@chakra-ui/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
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
        d="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        {" "}
        <IconButton
          d={{ base: "flex", md: "none" }}
          icon={<FaArrowAltCircleLeft />}
          onClick={() => setSelectedChat("")}
        />
      </Text>
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
        d="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        {"Hello Start Your chat...:)"}
      </Text>
    </>
  );
};

export default SingleChat;
