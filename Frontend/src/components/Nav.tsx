
import React from "react";
import "../App.css";
import "../NavBar.css";
import {auth} from "../firebase";

function Nav({ currentUID }: { currentUID: string }) {
    return (
        <div className="nav">
            <div className="logo">
                <a href="/" >VolunteerHub</a>
             </div>
            <div></div>
            <a href="#search">Search</a>
            <a href="/about">About</a>
            <a href="/privacy-policy">Privacy Policy</a>
                {currentUID === "" ?
                    <a href="/login"> <img src="SignIn.png" alt="SignIn" width="90" height="35" /> </a> :
                    <a onClick={() => auth.signOut()} href={"#logout"}>Logout</a>
                    }
            </div>    
  );
}

export default Nav;
