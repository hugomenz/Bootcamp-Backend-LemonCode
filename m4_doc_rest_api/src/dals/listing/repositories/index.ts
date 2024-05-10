import { mockRepository } from "./listing.mock-repository.js";
import { dbRepository } from "./listing.db-repository.js";
import { envConstants } from "#core/constants/env.constants.js";

export const listingRepository = envConstants.isApiMock ? mockRepository : dbRepository;
