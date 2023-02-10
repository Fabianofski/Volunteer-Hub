import React from "react";
import "../App.css";
import "./NavBar.css";
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
      <div></div>
      {/* <a href="#search">Search</a>
      <a href="/about">About</a>
      <a href="/privacy-policy">Privacy Policy</a> */}
      <a href="/">Home</a>
      <a href="/events">Events</a>
      <a href="/myevents">My Events</a>
      <a href="/about">About</a>
      {currentUID === "" ? (
        <a href="/login">
          {" "}
          <img className="signinBtn" src="/signinBtn.svg" alt="SignIn" />{" "}
        </a>
      ) : (
        <a onClick={() => auth.signOut()} href={"#logout"}>
          Logout
        </a>
      )}
    </div>
  );
}

export default Nav;
