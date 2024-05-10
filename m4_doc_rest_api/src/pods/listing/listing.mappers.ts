import * as model from "#dals/listing/listing.model.js";
import * as apiModel from "./listing.api-model.js";

const mapHouseSummaryFromModelToApi = (listing: model.Listing): apiModel.HouseSummary => ({
  id: listing._id,
  title: listing.name,
  pictureUrl: listing.images.picture_url,
  location: listing.address.country,
  bedrooms: listing.bedrooms,
  bathrooms: parseFloat(listing.bathrooms.$numberDecimal),
  maxGuests: listing.accommodates,
});

export const mapHouseListFromModelToApi = (listings: model.Listing[]): apiModel.HouseSummary[] => {
  return listings.map(mapHouseSummaryFromModelToApi);
};

export const mapHouseDetailFromModelToApi = (listing: model.Listing): apiModel.HouseDetail => {
  const sortedReviews = listing.reviews
    .sort((a, b) => new Date(b.date.$date.$numberLong).getTime() - new Date(a.date.$date.$numberLong).getTime())
    .slice(0, 5);

  const data = {
    id: listing._id,
    title: listing.name,
    description: listing.description,
    fullAddress: listing.address.street,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    bathrooms: parseFloat(listing.bathrooms.$numberDecimal),
    reviews: sortedReviews.map(mapReviewFromModelToApi),
  };

  return data;
};

export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  date: new Date(parseInt(review.date.$date.$numberLong)).toISOString().split("T")[0],
  reviewerName: review.reviewer_name,
  comments: review.comments,
});
