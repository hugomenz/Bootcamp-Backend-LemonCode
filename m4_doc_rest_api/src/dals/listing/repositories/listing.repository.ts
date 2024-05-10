import { Listing } from "../index.js";

export interface ListingRepository {
  getListOfHouses: () => Promise<Listing[]>;
  getHouse: (id: string) => Promise<Listing>;
  addReviewToListing: (_id: string, reviewer_id: string, reviewer_name: string, comments: string) => Promise<Listing>;
}
