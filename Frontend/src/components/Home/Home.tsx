import React from "react";
import "../../App.css";
import "./Home.css";
import "./ImageSection";
import ImageSection from "./ImageSection";

function Home() {
  return (
    <div className="layout">
      {/* <h1 style={{ color: "red" }}>TODO!</h1> */}
      <div className="headings">
        <h1>Werde Teil der Lösung!</h1>
        <h2>Starte jetzt als Freiwilliger Helfer.</h2>
      </div>
      {/* <ImageSection /> */}
      <div className="section1"></div>
      <div className="section2"></div>
      <div className="section3"></div>
    </div>
  );
}

export default Home;
