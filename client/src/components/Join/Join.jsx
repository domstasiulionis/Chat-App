import React from "react";

import "./Join.scss";

import { BsArrowRight } from "react-icons/bs";

const Join = ({ setName, setRoom, joinRoom, entered, name, room }) => {
  return (
    <div className="join">
      <div className={`join-inner ${entered ? "join-inner--expanded" : ""}`}>
        <h3 className={`join__heading ${entered ? "fade-out" : ""}`}>Join</h3>
        <input
          type="text"
          placeholder="Name"
          className={`${entered ? "fade-out" : ""}`}
          onKeyDown={(event) => {
            if ((event.key === "Enter") & (room !== "") & (name !== "")) {
              joinRoom();
            }
          }}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room"
          className={`${entered ? "fade-out" : ""}`}
          onKeyDown={(event) => {
            if ((event.key === "Enter") & (room !== "") & (name !== "")) {
              joinRoom();
            }
          }}
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button
          className={`join-btn ${entered ? "fade-out" : ""}`}
          onClick={!name || !room ? "" : joinRoom}>
          Enter
          <BsArrowRight
            className={`join-btn--arrow ${entered ? "fade-out" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Join;
