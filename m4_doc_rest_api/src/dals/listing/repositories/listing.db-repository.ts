import { ListingRepository } from "./listing.repository.js";

export const dbRepository: ListingRepository = {
  getListOfHouses: async () => {
    throw new Error("Not implemented");
  },
  getHouse: async (id: string) => {
    throw new Error("Not implemented");
  },
  addReviewToListing: async (_id: string, reviewer_id: string, reviewer_name: string, comments: string) => {
    throw new Error("Not implemented");
  },
};
