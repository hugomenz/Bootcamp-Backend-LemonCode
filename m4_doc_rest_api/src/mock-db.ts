import listingsAndReviews from "./data/listingsAndReviews.json" assert { type: "json" };
import { Bathrooms, Review } from "./mock-db.models.js";

type MockListing = {
  _id: string;
  name: string;
  description: string;
  accommodates: number;
  beds: number;
  bathrooms: Bathrooms;
  reviews: Review[];
};

let mockListingList: MockListing[] = listingsAndReviews.map((listing: MockListing) => ({
  _id: listing._id,
  name: listing.name,
  description: listing.description,
  accommodates: listing.accommodates,
  beds: listing.beds,
  bathrooms: listing.bathrooms,
  reviews: listing.reviews,
}));

export const getListOfHouses = async (): Promise<MockListing[]> => {
  return mockListingList;
};

export const getHouse = async (id: string): Promise<MockListing> => {
  return mockListingList.find((listing) => listing._id === id);
};

export const addReviewToListing = async (
  _id: string,
  reviewer_id: string,
  reviewer_name: string,
  comments: string
): Promise<Review> => {
  const listing = mockListingList.find((listing) => listing._id === _id);
  if (listing) {
    const newReview: Review = {
      _id: `rev-${listing.reviews.length + 1}`,
      date: {
        $date: {
          $numberLong: new Date().getTime().toString(),
        },
      },
      listing_id: _id,
      reviewer_id,
      reviewer_name,
      comments,
    };
    listing.reviews.push(newReview);
    return newReview;
  }
};
