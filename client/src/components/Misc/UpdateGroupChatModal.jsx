import React, { useEffect } from "react";
import { ChatState } from "../../context/context";
import { FaEye as ViewIcon } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import UserList from "../User/UserList";
import UserBadgeItem from "../User/UserBadgeItem";

const UpdateGroupChatModal = ({ fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const {
    selectedChat,
    token,
    setSelectedChat,
    user,
    fetchAgain,
    setFetchAgain,
  } = ChatState();

  useEffect(() => {
    const handelSearch = setTimeout(() => {
      if (search) {
        searchQuery();
      }
    }, 1000);
    return () => clearTimeout(handelSearch);
  }, [search]);
  const searchQuery = async () => {
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
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.put(
        `http://127.0.0.1:3007/api/chats/groups/add-user`,

        {
          newUserID: userToAdd._id,
          groupID: selectedChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        setSelectedChat(result.data);
        setLoading(false);
      } else {
        return;
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleRemove = async (userToReomve, admin) => {
    if (selectedChat.groupAdmin._id === userToReomve._id && !admin) {
      toast({
        title: "Oops! You can't remove yourself",
        description:
          "As the admin of this group, you cannot remove yourself. If you want to leave the group, You Can!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    if (selectedChat.users.length == 2 && !admin) {
      toast({
        title: "Uh oh! Group is getting small",
        description:
          "We recommend leaving the group and finding a new one to keep the conversation lively!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.put(
        `http://127.0.0.1:3007/api/chats/groups/remove-user`,

        {
          newUserID: userToReomve._id,
          groupID: selectedChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200 && !admin) {
        setSelectedChat(result.data);
        setLoading(false);
      } else if (admin) {
        setSelectedChat();
        onClose();
        return;
      } else {
        return;
      }
      fetchMessages();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Remove User",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handelRename = async () => {
    setRenameLoading(true);
    if (!groupChatName) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://127.0.0.1:3007/api/chats/rename`,
        {
          newName: groupChatName,
          groupID: selectedChat._id,
        },
        config
      );

      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
    setRenameLoading(false);
  };

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => {
                  return setGroupChatName(e.target.value);
                }}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handelRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mt={3}
                onChange={(e) => {
                  return setSearch(e.target.value);
                }}
              />
            </FormControl>
            <Flex flexDir={loading ? "row" : "column"}>
              {loading ? (
                <Spinner size="lg" margin={"auto"} />
              ) : (
                searchResult?.map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                return handleRemove(user, true);
              }}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
