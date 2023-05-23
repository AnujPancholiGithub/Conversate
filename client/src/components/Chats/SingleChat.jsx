import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/context";
import {
  Box,
  FormControl,
  Heading,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { getSender, getSenderFull } from "../../config/Chatlogics";
import ProfileModal from "../Misc/Profile.modal";
import UpdateGroupChatModal from "../Misc/UpdateGroupChatModal";
import ChatBody from "./ChatBody";
import axios from "axios";
import "./styles.css";
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3007";
var socket, selectedChatCompare;

const SingleChat = () => {
  const {
    fetchAgain,
    setFetchAgain,
    user,
    selectedChat,
    setSelectedChat,
    token,
  } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      return setSocketConnected(true);
    });
    socket.on("typingGoingOn", () => setIsTyping(true));
    socket.on("typingShouldOff", () => setIsTyping(false));
  }, []);

  const fetchMessages = async () => {
    console.log("fetchMessage singlechat: ", "Hello");
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://127.0.0.1:3007/api/messages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  const typingHandeler = async (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typingGoingOn", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("typingShouldOff", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendMessage = async (e) => {
    socket.emit("typingShouldOff", selectedChat._id);

    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://127.0.0.1:3007/api/messages",
          {
            content: newMessage,
            chatID: selectedChat._id,
          },
          config
        );
        console.log("data on single chat", data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("message recived via socket: ", newMessageRecieved);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //Notification time
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
            {<UpdateGroupChatModal fetchMessages={fetchMessages} />}
          </>
        )}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-end"}
        bg={"green.100"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {loading ? (
          <Spinner size={"lg"} margin={"auto"} />
        ) : (
          <>
            <div className="messages">
              <ChatBody messages={messages} />
            </div>
          </>
        )}

        <FormControl p={2} onKeyDown={sendMessage} isRequired mt={3}>
          {isTyping ? <div>Loading...</div> : <></>}
          <Input
            colorScheme="white"
            bg={"white"}
            mb={1}
            value={newMessage}
            borderRadius={20}
            p={4}
            onChange={typingHandeler}
          />
        </FormControl>
      </Box>
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
