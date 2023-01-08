import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";

import "./Chat.scss";

let socket;

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const ENDPOINT = "localhost:3001";

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    setName(searchParams.get("name"));
    setRoom(searchParams.get("room"));

    socket = io(ENDPOINT);
    socket.emit("join", { room, name });

    console.log(socket);
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
