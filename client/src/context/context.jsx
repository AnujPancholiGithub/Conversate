import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("");
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState("");
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );
  const [fetchAgain, setFetchAgain] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    // Set initial user and token from local storage
    setToken(() => JSON.parse(localStorage.getItem("token")));
    setUser(() => JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      navigateTo("/auth");
    }
  }, [navigateTo, user]);

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
        fetchAgain,
        setFetchAgain,
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
