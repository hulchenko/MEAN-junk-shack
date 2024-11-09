import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/config.js";
import productRoutes from "./routes/productRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";

// Init
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

// Body parser
app.use(express.json());

// Get server status
app.get("/api/status", (req, res) => res.status(200).json({ status: "up" }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/shipping", shippingRoutes);

app.listen(port, () => console.log("App is listening on port ", port));
