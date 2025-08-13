import express from "express";
import {create,getAllUser,getUserById,updateUser,deleteUser}from "../controller/userController.js";

const route= express.Router();

route.post("/userCreate",create);
route.get("/userGet",getAllUser);
route.get("/user/:id", getUserById);
route.put("/update/user/:id",updateUser);
route.delete("/delete/user/:id",deleteUser);

export default route;