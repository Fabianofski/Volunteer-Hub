import React from "react";
import { EventModel } from "../../model/EventModel";
import "./EventCard.css";

function EventCard({ event }: { event: EventModel }) {
  return (
    <div className={"event"} style={{ position: "relative" }}>
      <img
        src={event.banner}
        alt={"Banner"}
        style={{ position: "absolute", left: 0, bottom: 0, height: "100%", width: "100%" }}
      />
      <div className={"backdrop"}></div>
      <div className={"content"}>
        <h2> {event.eventName} </h2>
        <div className={"details"}>
          <p className={"organizer"}>{event.organizer.name}</p>
          <p className={"date"}>{event.date}</p>
          <p className={"town"}>{event.location.town}</p>
        </div>
        <p>{event.about}</p>
      </div>
    </div>
  );
}

export default EventCard;
