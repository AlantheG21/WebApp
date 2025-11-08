import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 5000;

// Endpoint to create a new product
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

// Endpoint to delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
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
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch(error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});