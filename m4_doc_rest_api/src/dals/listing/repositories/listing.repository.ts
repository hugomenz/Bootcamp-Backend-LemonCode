import { Listing, Review } from "../index.js";

export interface ListingRepository {
  getListOfHouses: (page?: number, pageSize?: number) => Promise<Listing[]>;
  getHouse: (id: string) => Promise<Listing>;
  addReviewToListing: (_id: string, reviewer_id: string, reviewer_name: string, comments: string) => Promise<Review>;
  updateHouseDetails: (id: string, updateData: Partial<Listing>) => Promise<Listing>;
}
