import express from "express";
import { listingsApi } from "./listings.api.js";

const app = express();
app.use(express.json());

// middleware log  req url
app.use(async (req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api/listings", listingsApi);

// middleware to  catch errors and log it by console
app.use(async (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log("Server ready at port 3000");
});
