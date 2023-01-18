import React from "react";
import "../App.css";

function Nav() {
  return (
    <div className="nav">
      <a href={"/"} className={"logo"}>VolunteerHub</a>
      <a href={"/login"}>Login</a>
    </div>
  );
}

export default Nav;
