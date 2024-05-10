import express from "express";
import { addReviewToListing, getHouse, getListOfHouses } from "./mock-db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My awesome idealista portal");
});

app.get("/api/listings", async (req, res) => {
  const listingList = await getListOfHouses();
  res.send(listingList);
});

app.get("/api/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listingId = id;
  const listing = await getHouse(listingId);
  res.send(listing);
});

app.post("/api/listings", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const { _id, reviewer_id, reviewer_name, comments } = req.body;
  const newReview = await addReviewToListing(_id, reviewer_id, reviewer_name, comments);
  res.status(201).send(newReview);
});

app.listen(3000, () => {
  console.log("Server ready at port 3000");
});
