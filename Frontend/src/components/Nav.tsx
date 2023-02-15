import React from "react";
import "../App.css";
import "./Nav.css";
import { auth } from "../firebase";

function Nav({ currentUID }: { currentUID: string }) {
  return (
    <div className="nav">
      <div className="logo">
        <a href="/">
          <img src="logo.svg" width={20}></img>
          VolunteerHub
        </a>
      </div>
      <input id="menuBtn" type="checkbox"></input>
      <div className="list">
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
