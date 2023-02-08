import React, { useState } from "react";
import "../App.css";
import "./EditEvent.css";
import { useParams } from "react-router-dom";
import InputField from "./Authentication/InputField";
import { InputValidation } from "./Authentication/InputValidation";

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
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  let inputValidation = new InputValidation();

  return (
    <div className={"editView"}>
      <form>
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
          value={description}
          setValue={setDescription}
          type={"textarea"}
          placeholder={"Beschreibung"}
          isInputValid={inputValidation.inputIsNotEmpty}
          className={"col-span-max"}
        />
      </form>
    </div>
  );
}

export default EditEvent;
