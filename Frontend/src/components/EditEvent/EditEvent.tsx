import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "./EditEvent.css";
import "../Authentication/InputField.css";
import InputField from "../Authentication/InputField";
import { InputValidation } from "../Authentication/InputValidation";
import { EventModel } from "../../model/EventModel";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { commands } from "./MarkdownCommands";
import { defaultEvent } from "./defaultEvent";
import Event from "../Event";

function EditEvent({ currentUID }: { currentUID: string }) {
  const { eventId } = useParams();
  addConfirmationBeforeReload(currentUID);
  const [mode, setMode] = useState("edit");
  const [event, setEvent] = useState<EventModel>(defaultEvent);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (eventId === undefined) setDataLoaded(true);
    else
      fetch(`/api/eventInformation?eventId=${eventId}&userId=${currentUID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEvent(data);
          setDataLoaded(true);
        });
  }, [eventId, setDataLoaded]);

  return (
    <div className={"editPage"}>
      {currentUID === "" ? (
        <>
          <h2> Du musst angemeldet sein bevor du ein Event erstellen kannst </h2>
          <a href="/login">
            <img src="/SignIn.png" alt="SignIn" width="180" height="70" />
          </a>
        </>
      ) : (
        <>
          {dataLoaded ? (
            <>
              <SetViewMode setMode={setMode} />
              {mode === "edit" ? (
                <EditView
                  event={event}
                  setEvent={setEvent}
                  eventId={eventId || ""}
                  currentUID={currentUID}
                />
              ) : (
                <Event currentUID={currentUID} event={event} />
              )}
            </>
          ) : (
            <h2>Loading..</h2>
          )}
        </>
      )}
    </div>
  );
}

function SetViewMode({ setMode }: { setMode: React.Dispatch<string> }) {
  return (
    <div className={"viewMode"}>
      <a href="#edit" onClick={() => setMode("edit")}>
        Edit
      </a>
      <a href="#preview" onClick={() => setMode("preview")}>
        Preview
      </a>
    </div>
  );
}

function EditView({
  event,
  setEvent,
  eventId,
  currentUID
}: {
  event: EventModel;
  setEvent: React.Dispatch<EventModel>;
  eventId: string;
  currentUID: string;
}) {
  const [eventName, setEventName] = useState<string>(event.eventName);
  const [organizer, setOrganizer] = useState<string>(event.alias);
  const [date, setDate] = useState<string>(event.date);
  const [time, setTime] = useState<string>(event.time);
  const [minParticipantNumber, setMinParticipantNumber] = useState<number>(event.minParticipants);
  const [maxParticipantNumber, setMaxParticipantNumber] = useState<number>(event.maxParticipants);
  const [street, setStreet] = useState<string>(event.location.street);
  const [houseNumber, setHouseNumber] = useState<string>(event.location.houseNumber);
  const [postalCode, setPostalCode] = useState<number>(event.location.postalCode);
  const [town, setTown] = useState<string>(event.location.town);
  const [description, setDescription] = useState<string>(event.about);

  let inputValidation = new InputValidation();
  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const unsetForm = document.querySelector(".unset");
    const invalidForm = document.querySelector(".invalid");
    const valid = invalidForm === null && unsetForm === null;
    setAllInputsValid(valid);
    setEvent({
      maxParticipants: maxParticipantNumber,
      minParticipants: minParticipantNumber,
      currentParticipants: 0,
      alias: organizer,
      time: time,
      about: description,
      banner: "",
      date: date,
      eventId: eventId,
      eventName: eventName,
      location: {
        street: street,
        houseNumber: houseNumber,
        postalCode: postalCode,
        town: town
      },
      organizer: {
        uid: currentUID,
        name: ""
      }
    });
  }, [
    eventName,
    organizer,
    date,
    time,
    minParticipantNumber,
    maxParticipantNumber,
    street,
    houseNumber,
    postalCode,
    town,
    description
  ]);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const event: EventModel = {
      maxParticipants: maxParticipantNumber,
      minParticipants: minParticipantNumber,
      currentParticipants: 0,
      alias: organizer,
      time: time,
      about: description,
      banner: "",
      date: date,
      eventId: eventId,
      eventName: eventName,
      location: {
        street: street,
        houseNumber: houseNumber,
        postalCode: postalCode,
        town: town
      },
      organizer: {
        uid: currentUID,
        name: ""
      }
    };
    const endpoint =
      eventId === ""
        ? `http://localhost:3001/api/createEvent`
        : `http://localhost:3001/api/editEvent`;
    fetch(endpoint, {
      method: eventId === "" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      });
  };

  return (
    <div className={"editView"}>
      <form>
        <h2 style={{ textAlign: "left" }}>Allgemein</h2>
        <div className={"inputGrid"}>
          <InputField
            value={eventName}
            setValue={setEventName}
            type={""}
            placeholder={"Eventname"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-4"}
          />
          <InputField
            value={date}
            setValue={setDate}
            type={"date"}
            placeholder={"Datum"}
            isInputValid={inputValidation.dateIsInFuture}
            className={"col-span-1"}
          />
          <InputField
            value={time}
            setValue={setTime}
            type={"time"}
            placeholder={"Uhrzeit"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-1"}
          />
          <InputField
            value={organizer}
            setValue={setOrganizer}
            type={""}
            placeholder={"Organisator"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-2"}
          />
          <InputField
            value={minParticipantNumber}
            setValue={setMinParticipantNumber}
            type={"number"}
            placeholder={"Teilnehmer (Min)"}
            isInputValid={inputValidation.inputIsGreaterThanZero}
            className={"col-span-2"}
          />
          <InputField
            value={maxParticipantNumber}
            setValue={setMaxParticipantNumber}
            type={"number"}
            placeholder={"Teilnehmer (Max)"}
            isInputValid={inputValidation.inputIsGreaterThanZero}
            className={"col-span-2"}
          />
        </div>
        <h2 style={{ textAlign: "left" }}>Standort</h2>
        <div className={"inputGrid"}>
          <InputField
            value={street}
            setValue={setStreet}
            type={"text"}
            placeholder={"Straße"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-2"}
          />
          <InputField
            value={houseNumber}
            setValue={setHouseNumber}
            type={"text"}
            placeholder={"Nummer"}
            isInputValid={inputValidation.inputIsGreaterThanZero}
            className={"col-span-1"}
          />
          <InputField
            value={postalCode}
            setValue={setPostalCode}
            type={"number"}
            placeholder={"PLZ"}
            isInputValid={inputValidation.inputIsGreaterThanZero}
            className={"col-span-1"}
          />
          <InputField
            value={town}
            setValue={setTown}
            type={"text"}
            placeholder={"Stadt"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-2"}
          />
        </div>
        <h2 style={{ textAlign: "left" }}>Beschreibung</h2>
        <div data-color-mode={"light"} className={"textInput"}>
          <MarkdownEditor
            height={"500"}
            value={description}
            visible={true}
            toolbars={commands}
            onChange={(e: any) => setDescription(e as string)}
          />
        </div>
        <button
          type="submit"
          disabled={!allInputsValid}
          title="Please fill in all the required fields"
          onClick={submitForm}>
          {eventId === "" ? "Create" : "Apply"}
        </button>
      </form>
    </div>
  );
}

function addConfirmationBeforeReload(currentUID: string) {
  useEffect(() => {
    // Confirmation before leaving site to prevent accidental data loss
    const unloadCallback = (event: any) => {
      if (currentUID !== "") {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [currentUID]);
}

export default EditEvent;
