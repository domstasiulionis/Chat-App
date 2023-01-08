import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

import "./Join.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join">
      <div className="join-container-inner">
        <h1 className="join__heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            type="text"
            className="Join__input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            type="text"
            className="Join__input"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&${room}`}>
          <button className="join-btn" type="submit">
            Enter
            <BsArrowRight className="join-btn__arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
