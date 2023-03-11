import React, { useEffect, useState } from "react";
import { EventModel } from "../../model/EventModel";
import "./Events.css";
import EventCard from "./EventCard";

function Events() {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    fetch(`/api/eventList`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  }, []);

  return (
    <div className={"events"}>
      {events.map((event) => {
        return (
          <a href={`/event/${event._id}`}>
            <EventCard event={event} />
          </a>
        );
      })}
    </div>
  );
}

export default Events;
