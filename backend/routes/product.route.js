import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

// Endpoint to create a new product
router.post("/", async (req, res) => {
    const product = req.body; //user will send product data in request body

    // Validate product data
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    //Save product to database
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Endpoint to delete a product by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Deleting product with id: ", id);

    try {
        await Product.findByIdAndDelete(id);
        console.log("Product deleted successfully");
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    }catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }

});

// Endpoint to get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch(error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Endpoint to update a product by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates)
        res.status(200).json({ success: true, data: updatedProduct });
    }catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;