import express from "express";
import webpush from "web-push";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

webpush.setVapidDetails(
  "mailto:phuong.ctp15@gmail.com",
  process.env.publicVapidKey,
  process.env.privateVapidKey
);

app.post("/subscribe", async (req, res) => {
  // get pushSubscription object
  const subscription = req.body;
  console.log("sub:", subscription);
  // Send error code 201 - resource created
  res.status(201).json({
    message: "Notification sent!",
  });

  // create payload
  const payload = JSON.stringify({ title: "Push Notification Test" });

  // pass object into sendNotification
  webpushf
    .sendNotiication(subscription, payload)
    .then(console.log("Success send notification!"))
    .catch((error) => console.log("send notification ERROR:", error));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
