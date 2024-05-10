import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Listing } from "./index.js";

export interface DB {
  listings: Listing[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonPath = path.resolve(__dirname, "./repositories/mock-data/listingsAndReviews.json");
const listingsAndReviews = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Listing[];

export const db: DB = { listings: listingsAndReviews };
