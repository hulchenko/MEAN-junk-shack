import express from "express";
import connectDB from "./db/config.js";

import productRoutes from "./routes/productRoutes.js";

import dotenv from "dotenv";

// Init
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

// Body parser
app.use(express.json());

// Get server status
app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "up" });
});

// Routes
app.use("/api/products", productRoutes);

app.listen(port, () => console.log("App is listening on port ", port));
