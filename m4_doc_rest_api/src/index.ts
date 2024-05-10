import express from "express";
import { getHouse } from "./mock-db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("My awesome books portal");
});

app.listen(3000, () => {
  console.log("Server ready at port 3000");
  // getHouse("10006546").then((house) => console.log(`Query getHouse(): `, JSON.stringify(house)));
});
