
import React from "react";
import "../App.css";
import {auth} from "../firebase";

function Nav({currentUID} : {currentUID: string}) {
    return (
        <div className="nav">
            <a href="/" className="logo">VolunteerHub</a>
            <div className="nav-right">
            {currentUID === "" ?
                <a href="/login">Login</a> :
                <a onClick={() => auth.signOut()} href={"#logout"}>Logout</a>
            }
            
            <a href="#search">Search</a>
            <a href="/about">About</a>
            <a href="/privacy-policy">Privacy Policy</a>
            </div>
            </div>
  );
}

export default Nav;
