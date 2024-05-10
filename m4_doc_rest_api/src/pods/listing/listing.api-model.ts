export interface HouseSummary {
  id: string;
  title: string;
  pictureUrl: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

export interface HouseDetail {
  id: string;
  title: string;
  description: string;
  fullAddress: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}

export interface Review {
  date: string;
  reviewerName: string;
  comments: string;
}
