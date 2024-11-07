import express from "express";
import { getProducts, getProductById, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(deleteProduct);

export default router;
