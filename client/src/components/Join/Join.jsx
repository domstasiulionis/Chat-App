import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join-container">
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
            className="Join__input Join__input--room"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&${room}`}>
          <button className="join__btn" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
