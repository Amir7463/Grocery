import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.post("/update", addToCart);
cartRouter.get("/:id", getCart);

export default cartRouter;
