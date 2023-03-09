import React from "react";
import "../../App.css";
import "./Home.css";
import "./ImageSection";
import ImageSection from "./ImageSection";

function Home() {
  return (
    <div className="layout">      
      {/* <ImageSection /> */}
      <div className="section1">
        <div className="hero">
          <div className="headings">
            <h1>The Power of one, the impact of many</h1>
            <h2>Start volunteering today - with VolunteerHub</h2>
            <a className="registerBtnA" href="/signup">
              <div className="registerBtn">Create Account</div>
            </a>
          </div>
          <img src="/assets/hero_section_image.svg"></img>
        </div>
      </div>       
      <div className="section2">
        <div className="text">
          <h2>Giving back never goes out of style!</h2>
          <p>Together we have already achieved multiple goals that wouldn't have been possible without us! We are doing our best to connect people with other people or organizations to move something together as a community. <br /> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <br /> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>        
        <ImageSection/>
      </div>
      <div className="section3"></div>
    </div>
  );
}

export default Home;
