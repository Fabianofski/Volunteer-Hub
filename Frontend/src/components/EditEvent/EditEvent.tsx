import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "./EditEvent.css";
import "../Authentication/InputField.css";
import InputField from "../Authentication/InputField";
import { InputValidation } from "../Authentication/InputValidation";
import { EventModel } from "../../model/EventModel";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { defaultMarkdown } from "./defaultMarkdown";
import { commands } from "./MarkdownCommands";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function EditEvent({ currentUID }: { currentUID: string }) {
  const { eventId } = useParams();

  useEffect(() => {
    // Confirmation before leaving site to prevent accidental data loss
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [mode, setMode] = useState("edit");
  const [event, setEvent] = useState<EventModel>({
    maxParticipants: 0,
    minParticipants: 0,
    alias: "",
    time: "",
    about: defaultMarkdown,
    banner: "",
    date: tomorrow,
    eventId: "",
    eventName: "",
    location: {
      street: "",
      houseNumber: "",
      postalCode: 0,
      town: ""
    },
    organizer: {
      uid: currentUID,
      name: ""
    }
  });
  if (eventId) console.log(eventId);

  return (
    <div className={"editPage"}>
      <SetViewMode setMode={setMode} />
      {mode === "edit" ? <EditView event={event} /> : <h1>Preview</h1>}
    </div>
  );
}

function SetViewMode({ setMode }: { setMode: React.Dispatch<string> }) {
  return (
    <div className={"viewMode"}>
      <a href="Frontend/src/components#edit" onClick={() => setMode("edit")}>
        Edit
      </a>
      <a href="Frontend/src/components#preview" onClick={() => setMode("preview")}>
        Preview
      </a>
    </div>
  );
}

function EditView({ event }: { event: EventModel }) {
  const [eventName, setEventName] = useState<string>(event.eventName);
  const [organizer, setOrganizer] = useState<string>(event.alias);
  const [date, setDate] = useState<string>(event.date.toISOString().substring(0, 10));
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
    setAllInputsValid(invalidForm === null && unsetForm === null);
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
    town
  ]);

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
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-1"}
          />
          <InputField
            value={postalCode}
            setValue={setPostalCode}
            type={"number"}
            placeholder={"PLZ"}
            isInputValid={inputValidation.inputIsNotEmpty}
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
          title="Please fill in all the required fields">
          Create
        </button>
      </form>
    </div>
  );
}

export default EditEvent;