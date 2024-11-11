import Product from "../db/schema/productSchema.js";

const getProducts = async (req, res) => {
  try {
    // current user filter
    const { email } = req.query;
    const filterParams = email ? { createdBy: email } : {};

    // pagination
    const pageSize = 34;
    const currPage = Number(req.query.currPage) || 0;
    const offset = Number(req.query.offset) || pageSize * currPage;

    const totalRecords = await Product.countDocuments();

    const products = await Product.find({ ...filterParams })
      .limit(pageSize) // rows per page
      .skip(offset); // offset (each step is equal to the current page size)

    res.status(200).json({ ok: true, products, currPage, totalRecords });
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({ ok: true, product });
    } else {
      res.status(404).json({ ok: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error getting product by id", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      await Product.deleteOne({ _id: id });
      res.status(200).json({ ok: true, message: "Product deleted" });
    } else {
      res.status(404).json({ ok: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    if (product) {
      const savedProduct = await product.save();
      res.status(200).json({ ok: true, message: "Product created", product: savedProduct });
    }
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};

const markProductSold = async (product) => {
  try {
    await Product.findByIdAndUpdate(product._id, { inStock: false });
    console.log("Product marked as sold.");
  } catch (error) {
    console.error("Error marking product as sold", error);
    throw error;
  }
};

export { getProducts, getProductById, deleteProduct, createProduct, markProductSold };
