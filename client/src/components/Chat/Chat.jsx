import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";

import "./Chat.scss";

let socket;

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const ENDPOINT = "localhost:3001";

  useEffect(() => {
    setName(searchParams.get("name"));
    setRoom(searchParams.get("room"));

    socket = io(ENDPOINT);
    socket.emit("join", { name, room });

    console.log(socket);
  }, [searchParams, ENDPOINT]);

  return (
    <div>
      <h1>{name}</h1>
      <h1>{room}</h1>
    </div>
  );
};

export default Chat;
