import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specs: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
