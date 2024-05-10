import { ListingRepository } from "./listing.repository.js";
import { db } from "../mock-data.js";
import { Listing } from "../index.js";

const paginateListingList = (listingList: Listing[], page: number, pageSize: number): Listing[] => {
  let paginatedListingList = [...listingList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedListingList.length);
    paginatedListingList = paginatedListingList.slice(startIndex, endIndex);
  }

  return paginatedListingList;
};

export const mockRepository: ListingRepository = {
  getListOfHouses: async (page?: number, pageSize?: number) => paginateListingList(db.listings, page, pageSize),
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
    return newReview;
  },
  updateHouseDetails: async (id: string, updateData: Partial<Listing>) => {
    const listingIndex = db.listings.findIndex((listing) => listing._id === id);
    if (listingIndex === -1) {
      throw new Error("Listing not found");
    }

    const listing = db.listings[listingIndex];
    const updatedListing = {
      ...listing,
      ...updateData,
      address: {
        ...listing.address,
        ...updateData.address,
      },
    };

    db.listings[listingIndex] = updatedListing;
    return updatedListing;
  },
};
