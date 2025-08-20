import express from "express";
import {create,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer}from "../controller/customerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const route= express.Router();
route.use(authMiddleware)

route.post("/customerCreate",create);
route.get("/customerGet",getAllCustomers);
route.get("/customerGet/:id", getCustomerById);
route.put("/update/:id",updateCustomer);
route.delete("/delete/:id",deleteCustomer);

export default route;