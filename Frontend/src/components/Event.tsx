import React from "react";
import "../App.css";
import {useParams} from "react-router-dom";

function Event() {
  const { eventId } = useParams();
  
  return (
    <h1>EVENT { eventId }</h1>
  );
}

export default Event;
