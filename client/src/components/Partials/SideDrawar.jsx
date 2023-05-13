import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { ChatState } from "../../context/context";
import UserList from "../User/UserList";
import LoadingList from "../Misc/LoadingList";

const SideDrawar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { token, selectedChat, setSelectedChat, setChats, chats } = ChatState();
  console.log("token: ", token);

  const searchChat = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `http://127.0.0.1:3007/api/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSearchResult(result.data);

      if (result.status === 200) {
        setLoading(false);
      }

      console.log("result", result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handelChats = async (userID) => {
    console.log("handel chat clicked: ", userID);
    setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.post(
        `http://127.0.0.1:3007/api/chats`,
        { userID },
        config
      );
      const { data } = result;
      console.log("handel chat clicked: ", result.data);
      if (!chats.find((c) => c._id == result.data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);

      onClose();
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Tooltip label={"serach users"} hasArrow>
        <InputGroup ref={btnRef} onClick={onOpen} colorScheme="teal">
          <Input
            variant="filled"
            placeContent={"Search"}
            placeholder="Search"
            _placeholder={{ opacity: 1, color: "blue.500" }}
          ></Input>
          <InputRightElement>
            <Icon as={BiSearchAlt} boxSize={6} />
          </InputRightElement>
        </InputGroup>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <InputGroup>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Type here..."
              />
              <InputRightElement onClick={searchChat}>
                <Icon cursor={"pointer"} as={BiSearchAlt} boxSize={6} />
              </InputRightElement>
            </InputGroup>
            <Box>
              {loading ? (
                <LoadingList />
              ) : (
                searchResult?.map((user) => {
                  return (
                    <UserList
                      user={user}
                      handleFunction={() => handelChats(user._id)}
                    />
                  );
                })
              )}
            </Box>
            {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={onClose} colorScheme="blue">
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawar;
