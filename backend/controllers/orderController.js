import Order from "../db/schema/orderSchema.js";
import { markProductSold } from "./productController.js";

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    if (order) {
      const savedOrder = await order.save();

      // find products in the order and mark them as sold
      await Promise.all(order.products.map((product) => markProductSold(product)));

      res.status(200).json({ ok: true, message: "Order created", order: savedOrder });
    }
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await Order.find({ purchasedBy: email });
    res.status(200).json({ ok: true, orders });
  } catch (error) {
    console.error("Error getting orders", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.query;
    const filterParams = id && email ? { _id: id, purchasedBy: email } : {};
    const order = await Order.find({ ...filterParams });
    if (order.length) {
      res.status(200).json({ ok: true, order: order[0] });
    } else {
      res.status(404).json({ ok: false, message: "Order not found" });
    }
  } catch (error) {
    console.error("Error getting order", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

export { createOrder, getOrderById, getOrders };
