import { Router } from "express";
import { listingRepository } from "#dals/index.js";
import {
  mapHouseDetailFromModelToApi,
  mapHouseListFromModelToApi,
  mapReviewFromModelToApi,
} from "./listing.mappers.js";

export const listingsApi = Router();

listingsApi.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const listingList = await listingRepository.getListOfHouses(page, pageSize);

    res.send(mapHouseListFromModelToApi(listingList));
  } catch (error) {
    next(error);
  }
});

listingsApi.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await listingRepository.getHouse(id);
    res.send(mapHouseDetailFromModelToApi(listing));
  } catch (error) {
    next(error);
  }
});

listingsApi.post("/", async (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body));
    const { _id, reviewer_id, reviewer_name, comments } = req.body;
    const newReview = await listingRepository.addReviewToListing(_id, reviewer_id, reviewer_name, comments);
    res.status(201).send(mapReviewFromModelToApi(newReview));
  } catch (error) {
    next(error);
  }
});

listingsApi.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, bedrooms, beds, bathrooms, street } = req.body;

    const currentListing = await listingRepository.getHouse(id);

    if (!currentListing) {
      return res.status(404).send({ message: "Listing not found" });
    }

    const updatedData = {
      ...currentListing,
      title: title ?? currentListing.name,
      description: description ?? currentListing.description,
      bedrooms: bedrooms ?? currentListing.bedrooms,
      beds: beds ?? currentListing.beds,
      bathrooms: bathrooms ?? currentListing.bathrooms,
      address: {
        ...currentListing.address,
        street: street ?? currentListing.address.street,
      },
    };

    Object.keys(updatedData).forEach((key) => updatedData[key] === undefined && delete updatedData[key]);
    Object.keys(updatedData.address).forEach(
      (key) => updatedData.address[key] === undefined && delete updatedData.address[key]
    );

    const updatedListing = await listingRepository.updateHouseDetails(id, updatedData);

    res.send(mapHouseDetailFromModelToApi(updatedListing));
  } catch (error) {
    next(error);
  }
});
