import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const ProfileModal = ({ user, childern }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {childern ? (
        <span onClick={onOpen}>{childern}</span>
      ) : (
        <IconButton onClick={onOpen} as={AiOutlineEye}></IconButton>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="https://th.bing.com/th/id/OIP.UxSJWsPP7oKuoUAwqvJQnAHaG-?pid=ImgDet&rs=11"></Image>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"space-around"}>
            <Text>{user.email}</Text>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
