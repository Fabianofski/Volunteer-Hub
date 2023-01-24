
import React from "react";
import "../App.css";

function Nav() {
    return (
        <div className="nav">
            <a href="/" className="logo">VolunteerHub</a>
            <div className="nav-right">
            <a href="#search">Search</a>
            <a href="#about">About</a>
            <a href="/login">Login</a>
            <a href="/about">About</a>
            <a href="/privacy-policy">Privacy Policy</a>
            </div>
            </div>
       

  );
}

export default Nav;
