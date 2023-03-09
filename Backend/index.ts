require("dotenv").config();
import { Response, Request } from "express";
import { User } from "./model/User";
import { EventModel } from "./model/EventModel";
import { EventFilter } from "./model/EventFilter";
import { defaultMarkdown } from "./defaultMarkdown";

const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mysql = require("./mysql");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/api/profileInformation", async (req: Request<{ uid: string }>, res: Response) => {
  const uid = req.query.uid;
  res.json({
    uid: uid,
    firstname: "Daniel",
    lastname: "Smith",
    dateOfBirth: "05.12.2000",
    email: "daniel.smith@gmail.com",
    tel: "0176 / 12345656",
    role: "volunteer"
  });
});

const dummyEvent: EventModel = {
  eventId: "7434672",
  eventName: "Floorball Turnier",
  organizer: {
    uid: "534jkkl",
    name: "Peter Klaus"
  },
  alias: "Caritas",
  date: "2023-02-14",
  time: "08:00",
  maxParticipants: 10,
  minParticipants: 3,
  currentParticipants: 0,
  location: {
    street: "Example Street",
    houseNumber: "34",
    postalCode: 13566,
    town: "Berlin"
  },
  about: defaultMarkdown,
  banner:
    "https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg"
};

app.get("/api/eventInformation", async (req: Request<{ eventId: string }>, res: Response) => {
  const eventId: string = <string>req.query.eventId;
  let dummy = dummyEvent;
  dummy.eventId = eventId ? eventId : "";
  res.json(dummy);
});

app.get("/api/eventList/", jsonParser, async (req: Request<EventFilter>, res: Response) => {
  console.log(req.body);
  const eventFilters = req.body as EventFilter;
  const events: EventModel[] = [];
  const amount: number = Number(eventFilters?.amount || 6);
  for (let i = 0; i < amount; i++) {
    events.push(dummyEvent);
  }
  res.json(events);
});

app.post("/api/signUp/", jsonParser, async (req: Request<User>, res: Response) => {
  const user: User = req.body as User;
  console.log(user);
  res.send({ status: "Success" });
});

app.post("/api/createEvent/", jsonParser, async (req: Request, res: Response) => {
  console.log("create");
  const event: EventModel = req.body as EventModel;
  console.log(event);
  res.send({ status: "Success" });
});

app.put("/api/editEvent/", jsonParser, async (req: Request, res: Response) => {
  const event: EventModel = req.body as EventModel;
  console.log("edit");
  console.log(event);
  res.send({ status: "Success" });
});
app.post(
  "/api/apply/",
  async (req: Request<{ userId: string; eventId: string }>, res: Response) => {
    const eventId: string = <string>req.query.eventId;
    const userId: string = <string>req.query.userId;
    console.log(`User: ${userId} applied for Event: ${eventId}`);
    res.send({ response: `User: ${userId} applied for Event: ${eventId}` });
  }
);

app.listen(PORT, () => console.log("Listening ..."));