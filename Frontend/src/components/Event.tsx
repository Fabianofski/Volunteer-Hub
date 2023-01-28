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
  <Route path="/event/:eventId" element={<Event />} />
  const { eventId } = useParams();
  const [EventData, setEventData] = useState<EventData>();

  fetch(`/api/eventInformation?eventId=${eventId}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setEventData(data);
      });
  return (
    <div className="eventpage">
      <div className="eventBanner">
      <img src={"https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg"}alt="banner"/>
      </div>
      <div className="eventText">
        {EventData?.eventName}
        ewfhbiakcvuwqiek
      </div>
    </div>
  );
}

export default Event;
