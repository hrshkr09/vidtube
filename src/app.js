import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//this section contains all the common middlewares

app.use(express.json({ limit: "16kb" })); //so that all the json data is allowed to come in with limit of 16kb at a time

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // so that all the latest properties are available

app.use(express.static("public")); // to serve the static content

//import routes
app.use(cookieParser());

import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js"
// import { errorHandler } from "./middlewares/error.middleware.js";
//routes

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users",userRouter)





// app.use(errorHandler)
export { app };
