import express from "express";
import { listingsApi } from "./listings.api.js";
import { createRestApiServer } from "./core/servers/index.js";
import { envConstants } from "./core/constants/index.js";
import "./core/load-env.js";

const restApiServer = createRestApiServer();

// middleware log  method and req url
restApiServer.use(async (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

restApiServer.use("/api/listings", listingsApi);

// middleware to  catch errors and log it by console
restApiServer.use(async (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

restApiServer.listen(envConstants.PORT, () => {
  console.log(`Server ready at port ${envConstants.PORT}`);
});
