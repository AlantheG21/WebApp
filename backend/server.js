import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.post("/api/products", async (req, res) => {
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

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});