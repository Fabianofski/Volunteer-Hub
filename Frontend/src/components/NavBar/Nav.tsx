import React, { useState } from "react";
import "../../App.css";
import "./Nav.css";
import { auth } from "../../firebase";

function Nav({ currentUID }: { currentUID: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="nav">
      <div className="logo">
        <a href="/">
          <img src="/logo.svg" width={20}></img>
          VolunteerHub
        </a>
      </div>
      <div className={`nav-icon ${active ? "open" : ""}`} onClick={() => setActive(!active)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`list ${active ? "show" : ""}`}>
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/myevents">My Events</a>
        <a href="/about">About</a>
        <div style={{ width: "8rem" }}>
          {currentUID === "" ? (
            <a href="/login">
              <div className="signInBtn">Sign In</div>
            </a>
          ) : (
            <a className="logOut" onClick={() => auth.signOut()} href={"#logout"}>
              Logout
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
