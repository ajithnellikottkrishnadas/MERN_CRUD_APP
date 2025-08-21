import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Db connected succesfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);

        });
    })
    .catch((error) => console.log(error));


app.use("/api", authRoutes);
app.use("/api/customers", customerRoutes);

