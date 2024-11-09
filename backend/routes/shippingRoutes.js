import express from "express";
import { getShippingPrices } from "../controllers/shippingController.js";

const router = express.Router();

router.route("/").get(getShippingPrices);

export default router;
