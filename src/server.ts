import express, { Application } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { db } from "./config/connection";
import cameraRouter from "./routes/cameraRouter"
import cameraNetworkRouter from "./routes/cameraNetworkRouter"

const app: Application = express();

//connect DB
db.connect(function (err) {
  if (err) {
    throw err
  }
  console.log("Connected to the MySQL server.");
});

app.use(express.json())

// Routes
app.use("/api/camera",cameraRouter)
app.use("/api/cameranetworks",cameraNetworkRouter)

const port = 5000;
app.listen(5000, () => {
  console.log(`server started on port ${port}`);
});
