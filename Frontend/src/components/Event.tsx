import React, { useEffect } from "react";
import { useState } from "react";
import { Route, useParams } from "react-router-dom";
import "../App.css";
import "../Event.css"

interface EventData{
  eventId:string;
  eventName:string;
  organizer:{
    uid:string;
    name:string;
  }
  date:string;
  location:string;
  about:string;
  banner:string;
}

 function Event() {
  const { eventId } = useParams();
  const [EventData, setEventData] = useState<EventData>();

  useEffect(() => {
    fetch(`/api/eventInformation?eventId=${eventId}`)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setEventData(data);
        });
  }, [eventId]);

  return (
    <div className="seite">
    <div className="eventpage">
      <div className="eventBanner">
      <img src={EventData?.banner}alt="banner"/>
      </div>
      <div className="eventDescription">
       <h1> {EventData?.eventName}</h1>
        <h2>{EventData?.date}</h2>
      
      </div>
      <h1>{EventData?.about}</h1>
       </div>
      <div className="participate">
       <h2>Teilnehmen</h2> 
      </div>
      </div>
  );
}

export default Event;
