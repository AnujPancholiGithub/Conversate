import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState({
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    _id: "2",
    name: "John Doe",
  });
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [token, setToken] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    setUser(userInfo);
    setToken(token);
    if (!userInfo || userInfo == null) {
      navigateTo("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigateTo]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        token,
        setFetchAgain,
        fetchAgain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
