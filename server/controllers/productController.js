
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";

//addProduct: /api/product/add
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;

    const imageUrls = [];

    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      );

      imageUrls.push(result.secure_url);
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      images: imageUrls,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





//getProducts: /api/product/list
export const productList = async (req, res) => {
  try {

    const products = await Product.find({});

    res.json({
      success: true,
      products
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};



//productById: /api/product/id
export const productById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Error fetching product"});
    }

}



//change product inStock : /api/product/stock
//change product inStock : /api/product/stock/:id
export const changeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { inStock: stock },   // ✅ FIXED
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing stock" });
  }
};
