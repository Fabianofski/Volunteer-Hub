import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { Route, useNavigate, useParams } from "react-router-dom";
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
  const [eventData, setEventData] = useState<EventModel>();
  const navigate = useNavigate();

  useEffect(() => {
    if (event) setEventData(event);
    if (!event)
      fetch(`/api/eventInformation?eventId=${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === null) navigate("/404");
          setEventData(data);
          document.title = `${data.eventName} - Volunteer-Hub`;
        });
  }, [eventId]);

  return (
    <div className="seite">
      {eventData ? (
        <EventPage eventData={eventData} currentUID={currentUID} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

function EventPage({ eventData, currentUID }: { eventData?: EventModel; currentUID: string }) {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addToDataBase(eventData?._id, currentUID);
  };

  return (
    <>
      <div className="eventpage">
        <div className="eventBanner">
          <img
            src={
              eventData?.banner ||
              "https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg"
            }
            alt="banner"
          />
        </div>
        <div className={"eventContent"}>
          <div className="eventDescription">
            <div className="eventDescriptionLeft">
              <h1>{eventData?.eventName || "Eventname"}</h1>
              <h2>
                Organisator:{" "}
                <a href={`/profile/${eventData?.organizer.uid}`}>{eventData?.alias || "Name"}</a>
              </h2>
            </div>
            <div className="eventDescriptionRight">
              <div></div>
              <h2>
                {new Date(eventData?.date || "").toLocaleDateString("de-DE")},{" "}
                {eventData?.time || "08:00"} Uhr
              </h2>
              <h2>
                {eventData?.location.street || "Musterstr."} {eventData?.location.houseNumber || 42}
              </h2>
              <h2>
                {eventData?.location.postalCode || 45723} {eventData?.location.town || "Berlin"}
              </h2>
            </div>
          </div>
          <MarkdownEditor.Markdown
            source={eventData?.about || "Beschreibung"}
            skipHtml={true}
            style={{ textAlign: "left", backgroundColor: "rgb(211, 211, 211)" }}
          />
          <div className="eventDescription">
            <h2>
              Freie Plätze: {eventData?.currentParticipants || 0}/{eventData?.maxParticipants || 99}
            </h2>
          </div>
        </div>
      </div>
      <button className="participate" type="submit" onClick={onSubmit}>
        <h2>Teilnehmen</h2>
      </button>
    </>
  );
}

export default Event;
