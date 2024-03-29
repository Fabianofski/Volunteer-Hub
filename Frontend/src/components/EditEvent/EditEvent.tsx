import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { uploadToStorage } from "../../firebase";

function EditEvent({ currentUID }: { currentUID: string }) {
  const { eventId } = useParams();
  addConfirmationBeforeReload(currentUID);
  const [mode, setMode] = useState("edit");
  const [event, setEvent] = useState<EventModel>(defaultEvent);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `Create - Volunteer-Hub`;
    if (eventId === undefined) setDataLoaded(true);
    else
      fetch(`/api/eventInformation?eventId=${eventId}&userId=${currentUID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === null) navigate("/404");
          setEvent(data);
          setDataLoaded(true);
          document.title = `Edit: ${data.eventName} - Volunteer-Hub`;
        });
  }, [eventId, setDataLoaded]);

  return (
    <div className={"editPage"}>
      {currentUID === "" ? (
        <>
          <h2>You have to be signed in to edit events.</h2>
          <a className="signInBtnHref" href="/login">
            <div className="signInBtn">Sign In</div>
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
                  eventId={eventId}
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
  eventId: string | undefined;
  currentUID: string;
}) {
  const [_banner, _setBanner] = useState<string>(event.banner);
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

  const setBanner = (file: File) => {
    console.log(file);
    uploadToStorage(`${currentUID}`, file, "image").then((url) => {
      console.log(url);
      _setBanner(url);
    });
  };

  let inputValidation = new InputValidation();
  const [allInputsValid, setAllInputsValid] = useState(false);
  useEffect(() => {
    const unsetForm = document.querySelector(".unset");
    const invalidForm = document.querySelector(".invalid");
    const valid = invalidForm === null && unsetForm === null;
    setAllInputsValid(valid);
    setEvent({
      _id: eventId,
      maxParticipants: maxParticipantNumber,
      minParticipants: minParticipantNumber,
      currentParticipants: 0,
      alias: organizer,
      time: time,
      about: description,
      banner: _banner || "",
      date: date,
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
    _banner,
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
    console.log(event);
    const endpoint = eventId === undefined ? `/api/createEvent` : `/api/editEvent`;
    fetch(endpoint, {
      method: eventId === undefined ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        alert(result.status);
      });
  };

  return (
    <div className={"editView"}>
      <form>
        <h2 style={{ textAlign: "left" }}>Allgemein</h2>
        <div className={"inputGrid"}>
          <div className={"col-span-max"}>
            <img
              src={_banner}
              alt={"EventBanner"}
              style={{ width: "100%", height: "15rem", objectFit: "cover" }}
            />
            <input
              type={"file"}
              id={"bannerInput"}
              onChange={(e) => {
                if (e.target.files) setBanner(e.target.files[0]);
              }}
              accept={"image/*"}
              style={{ display: "none" }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("bannerInput")?.click();
              }}>
              Banner austauschen
            </button>
          </div>

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
            style={{ width: "95vw", maxWidth: "60rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={!allInputsValid}
          title="Please fill in all the required fields"
          onClick={submitForm}>
          {eventId === undefined ? "Create" : "Apply"}
        </button>
      </form>
    </div>
  );
}

function addConfirmationBeforeReload(currentUID: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
