import express from "express";
import { addAddress, getAddresses } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/get", getAddresses);

export default addressRouter; // ✅ default export
