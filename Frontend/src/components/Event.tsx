import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { Route, useParams } from "react-router-dom";
import "../App.css";
import "../Event.css";
import { EventModel } from "../model/EventModel";
import MarkdownEditor from "@uiw/react-markdown-editor";

async function addToDataBase(thisEventId: string | undefined, userId: string | undefined) {
  fetch(`http://localhost:3001/api/apply?userId=${userId}&eventId=${thisEventId}`, {
    method: "POST"
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    });
}

function Event({ currentUID, event }: { currentUID: string; event?: EventModel }) {
  const { eventId } = useParams();
  const [EventModel, setEventData] = useState<EventModel>();

  useEffect(() => {
    if (event) setEventData(event);
    if (!event)
      fetch(`/api/eventInformation?eventId=${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEventData(data);
        });
  }, [eventId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addToDataBase(EventModel?.eventId, currentUID);
  };

  return (
    <div className="seite">
      <div className="eventpage">
        <div className="eventBanner">
          <img
            src={
              EventModel?.banner ||
              "https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg"
            }
            alt="banner"
          />
        </div>
        <div className={"eventContent"}>
          <div className="eventDescription">
            <div className="eventDescriptionLeft">
              <h1>{EventModel?.eventName || "Eventname"}</h1>
              <h2>
                Organisator:{" "}
                <a href={`/profile/${EventModel?.organizer.uid}`}>
                  {EventModel?.organizer.name || "Name"}
                </a>
              </h2>
            </div>
            <div className="eventDescriptionRight">
              <div></div>
              <h2>
                {new Date(EventModel?.date || "").toLocaleDateString("de-DE")},{" "}
                {EventModel?.time || "08:00"} Uhr
              </h2>
              <h2>
                {EventModel?.location.street || "Musterstr."}{" "}
                {EventModel?.location.houseNumber || 42}
              </h2>
              <h2>
                {EventModel?.location.postalCode || 45723} {EventModel?.location.town || "Berlin"}
              </h2>
            </div>
          </div>
          <MarkdownEditor.Markdown
            source={EventModel?.about || "Beschreibung"}
            skipHtml={true}
            style={{ textAlign: "left", backgroundColor: "#5e5e5e" }}
          />
          <div className="eventDescription">
            <h2>
              Freie Plätze: {EventModel?.currentParticipants || 0}/
              {EventModel?.maxParticipants || 99}
            </h2>
          </div>
        </div>
      </div>
      <button className="participate" type="submit" onClick={onSubmit}>
        <h2>Teilnehmen</h2>
      </button>
    </div>
  );
}

export default Event;
