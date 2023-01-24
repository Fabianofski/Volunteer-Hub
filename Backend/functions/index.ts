import {Response, Request} from "express";
import {User} from "./model/User";
const functions = require("firebase-functions");
const express = require("express");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/ping", async (req:Request, res:Response) => {
  res.send("pong");
});

app.get("/api/profileInformation", async (req:Request<{uid: string}>, res:Response) => {
  const uid = req.query.uid;
  res.json({
    uid: uid,
    firstname: "Daniel",
    lastname: "Smith",
    dateOfBirth: "05.12.2000",
    email: "daniel.smith@gmail.com",
    tel: "0176 / 12345656",
    role: "volunteer",
  });
});

app.post("/api/signUp/", async (req: Request<User>, res: Response) => {
  for (let propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      console.log(propName, req.query[propName]);
    }
  }
  res.send({status: "Success"});
});

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
