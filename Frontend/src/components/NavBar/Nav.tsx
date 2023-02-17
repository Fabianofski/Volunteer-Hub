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
      <div
        className={`nav-icon ${active ? "open" : ""}`}
        // onClick={() => document.querySelector(".nav-icon")?.classList.toggle("active")}>
        onClick={() => setActive(!active)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`list ${active ? "show" : ""}`}>
        {/* <a href="#search">Search</a>
        <a href="/about">About</a>
        <a href="/privacy-policy">Privacy Policy</a> */}
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/myevents">My Events</a>
        <a href="/about">About</a>
        {currentUID === "" ? (
          <a href="/login">
            <div className="signInBtn">Sign In</div>
            {/* {" "}
            <img className="signinBtn" src="/signinBtn.svg" alt="SignIn" />{" "} */}
          </a>
        ) : (
          <a className="logOut" onClick={() => auth.signOut()} href={"#logout"}>
            Logout
          </a>
        )}
      </div>
    </div>
  );
}

export default Nav;
