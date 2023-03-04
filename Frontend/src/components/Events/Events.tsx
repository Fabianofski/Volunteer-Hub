import React, { useEffect, useState } from "react";
import { EventModel } from "../../model/EventModel";
import "./Events.css";

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
          <a href={`/event/${event.eventId}`}>
            <div className={"event"} style={{ backgroundImage: `url(${event.banner})` }}>
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
          </a>
        );
      })}
    </div>
  );
}

export default Events;
