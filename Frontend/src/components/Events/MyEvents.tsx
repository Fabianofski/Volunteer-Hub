import React, { useEffect, useState } from "react";
import { EventModel } from "../../model/EventModel";
import EventCard from "./EventCard";
import "./MyEvents.css";

function MyEvents() {
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
    <div style={{ minHeight: "100vh" }}>
      <h1>My Events</h1>

      <a href={"/create"} style={{ margin: "1rem" }}>
        <h2>Create new Event</h2>
      </a>

      <h2>Edit Events</h2>
      <div className={"myEvents"}>
        {events.map((event) => {
          return (
            <a href={`/edit/${event._id}`}>
              <EventCard event={event} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default MyEvents;
