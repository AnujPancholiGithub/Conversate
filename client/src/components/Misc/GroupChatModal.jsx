import React, { useEffect, useState } from "react";
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
  useToast,
  FormControl,
  Input,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { ChatState } from "../../context/context";
import axios from "axios";
import UserList from "../User/UserList";
import UserBadgeItem from "../User/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats, token } = ChatState();

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

      console.log("result", result.data);
    } catch (error) {
      console.log("error", error);
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

  const handelSubmit = async (vale) => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `http://127.0.0.1:3007/api/chats/groups`,
        {
          groupName: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handelGroup = async (userToAdd) => {
    console.log("user in list  handelgroup", userToAdd);
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: `This user is already added`,
        description: "Failed to add",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handelDelete = (removeUser) => {
    console.log(
      `🚀 ~> file: GroupChatModal.jsx:103 ~> handleDelete ~> `,
      removeUser
    );

    setSelectedUsers(
      selectedUsers.filter((sel) => {
        return sel._id !== removeUser._id;
      })
    );
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group chats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="chat name"
                mb={3}
                value={groupChatName}
                onChange={(e) => {
                  return setGroupChatName(e.target.value);
                }}
              ></Input>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users eg: Anuj, Pawan ,Dipu"
                mb={3}
                value={search}
                onChange={(e) => {
                  return setSearch(e.target.value);
                }}
              ></Input>
            </FormControl>
            <Flex wrap={"wrap"} direction={"row"}>
              {selectedUsers.map((user) => {
                return (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handelDelete(user)}
                  />
                );
              })}
            </Flex>

            {loading ? (
              <Spinner />
            ) : (
              searchResult?.slice(0, 4).map((user) => {
                return (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handelGroup(user)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handelSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
