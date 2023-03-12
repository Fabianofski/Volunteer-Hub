import React, { useEffect, useState } from "react";
import { EventModel } from "../../model/EventModel";
import EventCard from "./EventCard";
import "./MyEvents.css";

function MyEvents() {
  document.title = `My Events - Volunteer-Hub`;

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
    <div style={{ minHeight: "100vh" }} className="myEventsMain">
      <h1>My Events</h1>
      <h3>Manage your current Events.</h3>

      <a href={"/create"} className="createBtn">
        <div>Create new Event</div>
      </a>

      <h2 style={{ textAlign: "left" }}>Edit your Events</h2>
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
