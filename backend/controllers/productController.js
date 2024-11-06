import Product from "../db/schema/productSchema.js";

const getProducts = async (req, res) => {
  console.log(`GET PRODUCTS FIRED`, req);
  const products = await Product.find();
  console.log(`PRODUCTS: `, products);
  res.json({ products });
};

export { getProducts };
