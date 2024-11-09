import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  type: { type: String },
  price: { type: Number },
});

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;
