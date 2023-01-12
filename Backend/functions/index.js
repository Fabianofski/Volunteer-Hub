const functions = require("firebase-functions");
const express = require("express");

const app = express();
const PORT = 3001;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/api/ping", async (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log("Listening ..."));
exports.app = functions.https.onRequest(app);
