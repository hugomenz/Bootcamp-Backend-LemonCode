import { Router } from "express";
import { addReviewToListing, getHouse, getListOfHouses } from "./mock-db.js";

export const listingsApi = Router();

listingsApi.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    let listingList = await getListOfHouses();

    if (page && pageSize) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, listingList.length);
      listingList = listingList.slice(startIndex, endIndex);
    }

    res.send(listingList);
  } catch (error) {
    next(error);
  }
});

listingsApi.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listingId = id;
  const listing = await getHouse(listingId);
  res.send(listing);
});

listingsApi.post("/", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const { _id, reviewer_id, reviewer_name, comments } = req.body;
  const newReview = await addReviewToListing(_id, reviewer_id, reviewer_name, comments);
  res.status(201).send(newReview);
});
