require("dotenv").config();
import { Response, Request } from "express";
import { User } from "./model/User";
import { EventModel } from "./model/EventModel";
import { EventFilter } from "./model/EventFilter";
import { defaultMarkdown } from "./defaultMarkdown";

const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongo = require("./mongo");

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

app.get("/api/eventInformation", async (req: Request<{ eventId: string }>, res: Response) => {
  const eventId: string = <string>req.query.eventId;
  const event = await mongo.getDocument("events", { _id: eventId });
  res.json(event);
});

app.get("/api/eventList/", jsonParser, async (req: Request<EventFilter>, res: Response) => {
  const eventFilters = req.body as EventFilter;
  const events = await mongo.getEvents(eventFilters);
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
  await mongo.updateEvent(event, "456");
  res.send({ status: "Success" });
});

app.put("/api/editEvent/", jsonParser, async (req: Request, res: Response) => {
  const event: EventModel = req.body as EventModel;
  console.log(event._id);
  await mongo.updateEvent(event, event._id);
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
