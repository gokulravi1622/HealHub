const express = require('express');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const Product = require('../Models/productModels');

const router = express.Router();

// Multer configuration to store images in the 'Images' folder with unique filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by adding a timestamp to the original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage }).single('productImage');

// Route handler for creating a product
const createProduct = asyncHandler(async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer error:', err);
      return res.status(400).json({ message: 'Error uploading product image' });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const { productName, productDescription, productPrice, type } = req.body;
    const productImage = req.file;

    try {
      if (!productImage) {
        return res.status(400).json({ message: 'Product image is required' });
      }

      const newProduct = new Product({
        productName,
        productDescription,
        productPrice,
        type,
        productImage: productImage.filename // Using the generated filename instead of original filename
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Route handler for getting all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const productsByType = await Product.aggregate([
      { $group: { _id: "$type", products: { $push: "$$ROOT" } } }
    ]);
    res.status(200).json(productsByType);
  } catch (error) {
    console.error('Error fetching products by type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getAllTypeProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Export the route handlers
module.exports = {
  createProduct,
  getAllProducts,getAllTypeProduct
  
};
