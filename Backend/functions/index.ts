import {Response, Request} from "express";
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

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
