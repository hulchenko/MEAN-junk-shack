import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  purchasedAt: {
    type: Date,
    required: true,
  },
  purchasedBy: {
    type: String,
    required: true,
  },
  deliveryEstimate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalPaid: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
