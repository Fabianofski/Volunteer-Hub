import React from "react";
import "../App.css";

function Footer({setIsCookieAnswered}) {
  return (
    <div className="footer">
      <a href="/about">About</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );
}

export default Footer;
