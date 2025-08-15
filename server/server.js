import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

import userRoute from "./routes/userRout.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()
app.use(cors());

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
app.use("/api/users", userRoute);

