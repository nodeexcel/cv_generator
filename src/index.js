import express from "express";
import cors from "cors";
import { dbConnection } from "./config/dbConnection.js";
import { constant } from "./config/constants.js";
import { userRoute } from "./routes/user.router.js";
import cookieParser from 'cookie-parser'

const app = express();

//global middleware
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(cookieParser());
app.use('/resumes', express.static('src/uploads'))


//routes
app.use("/api/v1/user", userRoute);

dbConnection()
.then(
  app.listen(process.env.SERVER_PORT, () =>
  console.log(`server is running on port: ${constant.SERVER_PORT}`)
  )
)
.catch(console.error());