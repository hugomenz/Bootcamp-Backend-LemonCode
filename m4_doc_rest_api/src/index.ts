import "#core/load-env.js";

import { listingsApi } from "#pods/listing/listings.rest-api.js";
import { createRestApiServer } from "#core/servers/index.js";
import { envConstants } from "#core/constants/index.js";
import { logErrorRequestMiddleware, logRequestMiddleware } from "#common/middlewares/index.js";

const restApiServer = createRestApiServer();

restApiServer.use(logRequestMiddleware);

restApiServer.use("/api/listings", listingsApi);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, () => {
  console.log(`Server ready at port ${envConstants.PORT}`);
});
