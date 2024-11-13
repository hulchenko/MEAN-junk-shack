import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/config.js";
import productRoutes from "./routes/productRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Init
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

// Body parser
app.use(express.json());

// Get server status
app.get("/api/status", (req, res) => res.sendStatus(200));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/orders", orderRoutes);

// Static file serving and routing for production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendPath = path.join(__dirname, "../frontend/docs/browser");

  // Serve static files from the frontend build directory
  app.use(express.static(frontendPath));

  // Serve index.html for any non-API routes (rely on client's routing)
  app.get("*", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));
} else {
  app.get("/", (req, res) => res.send("Server is running in development."));
}

app.listen(port, () => console.log("App is listening on port", port));
