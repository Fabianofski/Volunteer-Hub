import { Response, Request } from "express";
import { User } from "./model/User";
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

app.get(
  "/api/profileInformation",
  async (req: Request<{ uid: string }>, res: Response) => {
    const uid = req.query.uid;
    console.log(uid);
    res.json({
      uid: uid,
      firstname: "Daniel",
      lastname: "Smith",
      dateOfBirth: "05.12.2000",
      email: "daniel.smith@gmail.com",
      tel: "0176 / 12345656",
      role: "volunteer",
    });
  }
);

app.get(
  "/api/eventInformation",
  async (req: Request<{ eventId: string }>, res: Response) => {
    const eventId = req.query.eventId;
    res.json({
      eventId: eventId,
      eventName: "Floorball Turnier",
      organizer: {
        uid: "534jkkl",
        name: "Peter Klaus",
      },
      date: "02.03.2023",
      location: "Berlin",
      about:
        "Am 02.03.2023 findet in Berlin ein Floorball-Turnier statt. Erlebe spannende Spiele und unterstütze die Teilnehmer bei ihrem Kampf um den ersten Platz. Treffe Gleichgesinnte und genieße die Atmosphäre des Turniers. Komm vorbei und sei Teil des Floorball-Erlebnisses in Berlin.",
      banner:
        "https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg",
    });
  }
);

app.post("/api/signUp/", async (req: Request<User>, res: Response) => {
  for (let propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      console.log(propName, req.query[propName]);
    }
  }
  res.send({ status: "Success" });
});

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
