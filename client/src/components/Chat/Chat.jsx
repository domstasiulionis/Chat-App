import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Chat.scss";
import "./Bg.scss";

function Chat({ socket, name, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="bg-animation">
        <div className="bg"></div>
      </div>
      <div className="chat-box">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message">
            {messageList.map((msg) => {
              return (
                <div
                  className="message-container"
                  id={name === msg.author ? "author" : "other"}>
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-extra">
                      <p id="time">{msg.time}</p>
                      <p id="author">{msg.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-send">
          <input
            type="text"
            placeholder="Enter message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button className="chat-send__button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
