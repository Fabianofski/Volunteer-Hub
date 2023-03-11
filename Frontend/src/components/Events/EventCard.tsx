import React from "react";
import { EventModel } from "../../model/EventModel";
import "./EventCard.css";

function EventCard({ event }: { event: EventModel }) {
  return (
    <div className={"event"}>
      <img src={event.banner} alt={"Banner"} />
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
