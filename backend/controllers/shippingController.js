import Shipping from "../db/schema/shippingSchema.js";

const getShippingPrices = async (req, res) => {
  try {
    const shipping = await Shipping.find();
    res.status(200).json({ ok: true, shipping });
  } catch (error) {
    console.error("Error getting shipping prices", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

export { getShippingPrices };
