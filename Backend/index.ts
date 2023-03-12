require("dotenv").config();
import { Response, Request } from "express";
import { User } from "./model/User";
import { EventModel } from "./model/EventModel";
import { EventFilter } from "./model/EventFilter";

const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongo = require("./mongo");
const { ObjectId } = require("mongodb");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/api/profileInformation", async (req: Request<{ uid: string }>, res: Response) => {
  try {
    const uid = req.query.uid;
    const user = await mongo.getDocument("users", { _id: uid });
    res.json(user);
  } catch (e: any) {
    console.log(e);
    res.json(null);
  }
});

app.post("/api/signUp/", jsonParser, async (req: Request<User>, res: Response) => {
  try {
    const user: User = req.body as User;
    console.log("Create new User!");
    await mongo.createUser(user);
    res.send({ status: "Success" });
  } catch (e: any) {
    console.log(e);
    res.send({ status: "Failed" });
  }
});

app.post(
  "/api/apply/",
  async (req: Request<{ userId: string; eventId: string }>, res: Response) => {
    const eventId: string = <string>req.query.eventId;
    const userId: string = <string>req.query.userId;
    try {
      console.log(`User: ${userId} applied for Event: ${eventId}`);
      res.send({ status: "Success", response: `User: ${userId} applied for Event: ${eventId}` });
    } catch (e: any) {
      console.log(e);
      res.send({
        status: "Failed",
        response: `User: ${userId} couldn't apply for Event: ${eventId}`
      });
    }
  }
);

app.get("/api/eventInformation", async (req: Request<{ eventId: string }>, res: Response) => {
  try {
    const eventId: string = <string>req.query.eventId;
    const event = await mongo.getDocument("events", { _id: new ObjectId(eventId) });
    res.json(event);
  } catch (e: any) {
    console.log(e);
    res.json(null);
  }
});

app.get("/api/eventList/", jsonParser, async (req: Request<EventFilter>, res: Response) => {
  try {
    const eventFilters = req.body as EventFilter;
    const events = await mongo.getEvents(eventFilters);
    res.json(events);
  } catch (e: any) {
    console.log(e);
    res.json([]);
  }
});

app.post("/api/createEvent/", jsonParser, async (req: Request, res: Response) => {
  try {
    console.log("create");
    const event: EventModel = req.body as EventModel;
    await mongo.updateEvent(event);
    res.send({ status: "Success" });
  } catch (e: any) {
    console.log(e);
    res.send({ status: "Failed" });
  }
});

app.put("/api/editEvent/", jsonParser, async (req: Request, res: Response) => {
  try {
    const event: EventModel = req.body as EventModel;
    await mongo.updateEvent(event, event._id);
    res.send({ status: "Success" });
  } catch (e: any) {
    console.log(e);
    res.send({ status: "Failed" });
  }
});

app.listen(PORT, () => console.log("Listening ..."));
