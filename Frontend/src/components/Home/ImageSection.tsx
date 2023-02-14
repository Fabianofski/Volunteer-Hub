import React from "react";
import "./ImageSection.css";

function ImageSection() {
  return (
    <div className="main-container">
      <div className="image1">
        <img src="/assets/event1.jpg" alt="Image 1" />
      </div>
      <div className="image2">
        <img src="/assets/event2.jpg" alt="Image 2" />
      </div>
      <div className="image3">
        <img src="/assets/event3.jpg" alt="Image 3" />
      </div>
    </div>
  );
}

export default ImageSection;
