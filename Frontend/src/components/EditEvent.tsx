import React, { ChangeEvent, useEffect, useState } from "react";
import "../App.css";
import "./EditEvent.css";
import { useParams } from "react-router-dom";
import InputField from "./Authentication/InputField";
import { InputValidation } from "./Authentication/InputValidation";
import "./Authentication/InputField.css";
import MDEditor from "@uiw/react-md-editor";

function EditEvent() {
  const { eventId } = useParams();
  const [mode, setMode] = useState("edit");

  return (
    <div className={"editPage"}>
      <SetViewMode setMode={setMode} />
      {mode === "edit" ? <EditView /> : <h1>Preview</h1>}
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

function EditView({}) {
  const [eventName, setEventName] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [minParticipantNumber, setMinParticipantNumber] = useState<number>(0);
  const [maxParticipantNumber, setMaxParticipantNumber] = useState<number>(0);
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  let inputValidation = new InputValidation();

  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const invalidForm = document.querySelector(".invalid");
    setAllInputsValid(invalidForm === null);
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
    state
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
            value={state}
            setValue={setState}
            type={"text"}
            placeholder={"Stadt"}
            isInputValid={inputValidation.inputIsNotEmpty}
            className={"col-span-2"}
          />
        </div>
        <h2 style={{ textAlign: "left" }}>Beschreibung</h2>
        <div data-color-mode={"light"} className={"textInput"}>
          <MDEditor
            height={300}
            value={description}
            onChange={(e) => setDescription(e as string)}
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
