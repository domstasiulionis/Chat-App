import { useState } from "react";
import io from "socket.io-client";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

const socket = io.connect(`https://chat-app-0fn5.onrender.com/`);

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [entered, setEntered] = useState(false);

  const joinRoom = () => {
    setEntered(true);
    if (name !== "" && room !== "") {
      setTimeout(() => {
        socket.emit("join", room);
        setShowChat(true);
      }, 700);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <Join
          setName={setName}
          setRoom={setRoom}
          room={room}
          name={name}
          joinRoom={joinRoom}
          entered={entered}
        />
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}

export default App;
