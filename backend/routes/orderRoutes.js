import express from "express";
import { getOrders, getOrderById, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrderById);

export default router;
