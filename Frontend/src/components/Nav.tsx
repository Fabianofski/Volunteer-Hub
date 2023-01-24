import React from "react";
import "../App.css";
import {auth} from "../firebase";

function Nav({currentUID} : {currentUID: string}) {

  return (
    <div className="nav">
      <a href="/" className="logo">VolunteerHub</a>
      { currentUID === "" ?
        <a href="/login">Login</a> :
        <a onClick={() => auth.signOut()} href={"#logout"}>Logout</a>
      }
    </div>
  );
}

export default Nav;
