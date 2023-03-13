import React, { useEffect, useState } from "react";
import { EventModel } from "../../model/EventModel";
import "./Events.css";
import EventCard from "./EventCard";

function Events() {
  document.title = `Events - Volunteer-Hub`;

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
    <div className="eventsPage">
      <h1>Current Events</h1>
      <h3>Register here for future events.</h3>
      <div className={"events"}>
        {events.map((event) => {
          return (
            <a href={`/event/${event._id}`}>
              <EventCard event={event} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
