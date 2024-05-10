import { ListingRepository } from "./listing.repository.js";
import { db } from "../mock-data.js";

export const mockRepository: ListingRepository = {
  getListOfHouses: async () => db.listings,
  getHouse: async (id: string) => db.listings.find((b) => b._id === id),
  addReviewToListing: async (_id: string, reviewer_id: string, reviewer_name: string, comments: string) => {
    const listing = db.listings.find((listing) => listing._id === _id);
    if (!listing) {
      throw new Error("Listing not found");
    }
    const newReview = {
      _id: `rev-${listing.reviews.length + 1}`,
      date: {
        $date: {
          $numberLong: `${new Date().getTime()}`,
        },
      },
      listing_id: _id,
      reviewer_id,
      reviewer_name,
      comments,
    };
    listing.reviews.push(newReview);
    return listing;
  },
};
