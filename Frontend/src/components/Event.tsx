import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { Route, useParams } from "react-router-dom";
import "../App.css";
import "../Event.css";
import { EventModel } from "../model/EventModel";

async function addToDataBase(thisEventId: string | undefined, userId: string | undefined) {
  fetch(`http://localhost:3001/api/apply?userId=${userId}&eventId=${thisEventId}`, {
    method: "POST"
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    });
}

function Event({ currentUID }: { currentUID: string }) {
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
  function getUserId() {
    if (auth.currentUser?.uid != undefined) {
      return auth.currentUser?.uid;
    }
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addToDataBase(EventModel?.eventId, currentUID);
  };

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
              Organisator:{" "}
              <a href={`/profile/${EventModel?.organizer.uid}`}>{EventModel?.organizer.name}</a>
            </h2>
          </div>
          <div className="eventDescriptionRight">
            <div></div>
            <h2>
              {new Date(EventModel?.date || "").toLocaleDateString("de-DE")}, {EventModel?.time} Uhr
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
          <h2>
            Freie Plätze: {EventModel?.currentParticipants}/{EventModel?.maxParticipants}
          </h2>
        </div>
      </div>
      <button className="participate" type="submit" onClick={onSubmit}>
        <h2>Teilnehmen</h2>
      </button>
      <p>{auth.currentUser?.uid}</p>
    </div>
  );
}

export default Event;
