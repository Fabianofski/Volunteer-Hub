import React, { useEffect } from "react";
import { useState } from "react";
import { Route, useParams } from "react-router-dom";
import "../App.css";
import "../Event.css";
import { EventModel } from "../model/EventModel";

function Event() {
  const { eventId } = useParams();
  const [EventModel, setEventData] = useState<EventModel>();

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
          <img src={EventModel?.banner} alt="banner" />
        </div>
        <div className="eventDescription">
          <div className="eventDescriptionLeft">
            <h1>{EventModel?.eventName}</h1>
            <h2>
              Organizator: <a href="/profile/req.query.uid">{EventModel?.organizer.name}</a>
            </h2>
          </div>
          <div className="eventDescriptionRight">
            <div></div>
            <h2>
              {new Date(EventModel?.date).toLocaleDateString("de-DE")}, {EventModel?.time} Uhr
            </h2>
            <h2>
              {EventModel?.location.street} {EventModel?.location.houseNumber}{" "}
            </h2>
            <h2>
              {EventModel?.location.postalCode} {EventModel?.location.town}
            </h2>
          </div>
        </div>
        <h3>{EventModel?.about}</h3>
        <div className="eventDescription">
          <h2>Freie Plätze: 2/{EventModel?.maxParticipants}</h2>
        </div>
      </div>
      <div className="participate">
        <h2>Teilnehmen</h2>
      </div>
    </div>
  );
}

export default Event;
