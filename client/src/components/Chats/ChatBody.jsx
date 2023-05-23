import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import React, { useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/Chatlogics";
import { ChatState } from "../../context/context";
const ChatBody = ({ messages }) => {
  const scollToRef = useRef();
  console.log("message in chatbody: ", messages);
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages?.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                ml={3}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.profile}
              />
            </Tooltip>
          )}
          <span
            style={{
              backgroundColor: `${
                m.sender._id === user._id ? "#218AFF" : "#B9F5D0"
              }`,
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
              marginRight: "2%",
            }}
          >
            {m.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ChatBody;
