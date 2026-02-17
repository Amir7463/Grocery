import express from 'express';
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js"
import { getAllOrders, getUserOrder, placeOrderCOD } from '../controllers/ordersController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', getUserOrder)
orderRouter.get('/seller', authSeller, getAllOrders)

export default orderRouter;
